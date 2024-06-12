"use server";
import connectDB from "../db/config";
import userModel from "../db/model/userModel";
import bcrypt from "bcrypt";
import z from "zod";
import { sendMail } from "../createHashedTokenAndSendMail";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import cloudinary from "../cloudinaryConfig";
import { revalidateTag } from "next/cache";
import { SignJWT } from "jose";
import { verifyToken } from "../VerifyToken";

const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const passwordSchema = z
  .string()
  .refine((password) => passwordRegex.test(password), {
    message:
      "Password must contain at least one uppercase letter, one number, one special character, and be at least 8 characters long.",
  });

export const fetchAllUsers = async () => {
  try {
    await connectDB();
    const users = await userModel.find({}).lean();
    return users ? JSON.stringify(users) : false;
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (info) => {
  const { email, password } = info;
  try {
    await connectDB();
    const user = await userModel.findOne({ email }).lean();

    if (user) {
      if (user.isEmailVerified === false) {
        return { error: "Email not verified" };
      }
      const correctPassword = await bcrypt.compare(password, user?.password);
      if (correctPassword) {
        const userInfo = {
          userId: user?._id,
          name: user?.name,
          email: user?.email,
          role: user?.role,
        };
        if (!user.isAdmin) {
          await userModel.findByIdAndUpdate(user?._id, { isActive: true });
        }

        const key = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

        const token = await new SignJWT(userInfo)
          .setProtectedHeader({ alg: "HS256" })
          .setIssuedAt()
          .setExpirationTime("3d")
          .sign(key);

        const millisecondsInADay = 24 * 60 * 60 * 1000;
        const millisecondsInThreeDays = 3 * millisecondsInADay;
        const expires = new Date(Date.now() + millisecondsInThreeDays);

        cookies().set("adventure_hub_jwt", token, {
          expires,
          httpOnly: true,
        });

        return { success: "logged in successfully" };
      } else {
        return { error: "invalid email or password" };
      }
    } else {
      return { error: "email not registered." };
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllUserAdmin = async () => {
  try {
    await connectDB();
    const users = await userModel.find({}).lean();
    return users;
  } catch (error) {
    console.log(error);
  }
};

export const registerUser = async (currentState, formData) => {
  const { name, email, password, confirmPassword } =
    Object.fromEntries(formData);

  if (password !== confirmPassword) {
    return { error: "password doesn't match to confirm password." };
  }

  if (!emailRegex.test(email)) {
    return { error: "Invalid email" };
  }
  try {
    passwordSchema.parse(password);
    await connectDB();
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return { error: "Email already registered" };
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = await userModel.create({
        name,
        email,
        password: hashedPassword,
      });
      //send verifcation email to the user mail

      await sendMail({
        emailType: "verifyEmail",
        userId: newUser?._id,
        email: newUser?.email,
      });
      return { success: "Verification email has been sent to your email." };
    }
  } catch (error) {
    if (error?.name == "ZodError") {
      return { error: error?.issues[0].message };
    }
    console.log(error);
  }
};

export const verifyEmail = async (token) => {
  try {
    const user = await userModel.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user)
      return { error: "Email verification token is invalid or has expired" };
    user.isEmailVerified = true;
    user.verifyTokenExpiry = undefined;
    user.verifyToken = undefined;
    await user.save({ validateBeforeSave: false });

    return { success: "Email has been verified." };
  } catch (error) {
    console.log(error);
  }
};

export const findUserById = async () => {
  const { userInfo } = await verifyToken();
  try {
    await connectDB();
    const user = await userModel.findById(userInfo.userId).lean();
    if (user) {
      return JSON.stringify(user);
    }
  } catch (error) {
    console.log(error);
  }
};

export const signUserOut = () => {
  const existToken = cookies().get("adventure_hub_jwt");
  if (existToken) {
    cookies().delete("adventure_hub_jwt");
    redirect("/auth/signin");
  } else {
    return true;
  }
};

export const getAllUsers = async () => {
  try {
    await connectDB();
    const user = await userModel.find({}).lean();
    if (user) {
      return JSON.stringify(user);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getActiveUsers = async () => {
  try {
    await connectDB();
    const users = await userModel.find({ isActive: true }).lean();
    if (users) {
      return JSON.stringify(users);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getInactiveUsers = async () => {
  try {
    await connectDB();
    const users = await userModel.find({ isActive: false }).lean();
    if (users) {
      return JSON.stringify(users);
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (currentState, formData) => {
  const { userInfo } = await verifyToken();
  const { name, photo, currentPassword, newPassword } =
    Object.fromEntries(formData);
  const id = userInfo.userId;

  // atleast one field exist
  if (!name && !JSON.parse(photo) && !newPassword && !currentPassword) {
    return { error: "Atleast on field is required." };
  }

  // check if the user didn't specify a one field only regarding password
  if ((currentPassword && !newPassword) || (!currentPassword && newPassword)) {
    return {
      error: "Please Provide both a password and confirm Password",
    };
  }

  if (currentPassword !== newPassword) {
    return { error: "both password and confirm Password must be the same" };
  }

  try {
    if (newPassword) {
      passwordSchema.parse(newPassword);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(currentPassword, salt);

    const userInfo = {
      name,
      photo: JSON.parse(photo),
      password: hashedPassword,
    };

    if (JSON.parse(photo)) {
      const uploadedImage = await cloudinary.uploader.upload(userInfo.photo, {
        folder: "",
      });
      userInfo.photo = uploadedImage.secure_url;
    }

    Object.keys(userInfo).forEach(
      (key) =>
        (userInfo[key] == "" || undefined || null) && delete userInfo[key]
    );

    await connectDB();
    const user = await userModel.findById(id).lean();
    if (user) {
      const updatedUser = await userModel.findByIdAndUpdate(id, userInfo);
      if (updatedUser) {
        return { success: "Your account has updated successfully." };
      }
      return { error: "something went wrong please try again." };
    }
  } catch (error) {
    if (error?.name == "ZodError") {
      return { error: error?.issues[0].message };
    }
    console.log(error);
  }
};

export const deleteAccount = async (currentState, formData) => {
  const { userInfo } = await verifyToken();
  const id = userInfo?.userId;
  try {
    await connectDB();
    await userModel.findByIdAndUpdate(id, { isActive: false });
    return { success: true };
  } catch (error) {
    console.log(error);
  }
};

export const fetchGuides = async () => {
  try {
    await connectDB();
    const guides = await userModel.find({ role: "guide" }).lean();
    if (guides) {
      return JSON.stringify(guides);
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchLeadGuides = async () => {
  try {
    await connectDB();
    const guides = await userModel.find({ role: "lead-guide" }).lean();
    if (guides) {
      return JSON.stringify(guides);
    }
  } catch (error) {
    console.log(error);
  }
};

export const adminCreateAccount = async (currentState, formData) => {
  const { name, email, role, password, confirmPassword, photo } =
    Object.fromEntries(formData);

  if (password !== confirmPassword) {
    return { error: "password doesn't match to confirm password." };
  }

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (!emailRegex.test(email)) {
    return { error: "Invalid email" };
  }

  try {
    passwordSchema.parse(password);
    await connectDB();
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return { error: "Email already registered" };
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      //upload image if it exists
      let image;
      if (photo) {
        const uploadRes = await cloudinary.uploader.upload(photo);
        image = uploadRes.secure_url;
      }
      await userModel.create({
        name,
        email,
        password: hashedPassword,
        isEmailVerified: true,
        role,
        photo:
          image || "https://staging.svgrepo.com/show/213788/avatar-user.svg",
      });
      return { success: `${role} successfully created.` };
    }
  } catch (error) {
    console.log(error);
    if (error?.name == "ZodError") {
      return { error: error?.issues[0].message };
    } else {
      return { error: "Something went wrong please try again." };
    }
  }
};

export const forgotPassword = async (currentStatus, formData) => {
  const email = formData.get("email");
  try {
    await connectDB();
    const existUser = await userModel.findOne({ email }).lean();
    if (!existUser) {
      return { error: "User doesn't exist with this email please register" };
    } else {
      if (!emailRegex.test(email)) {
        return { error: "Invalid email" };
      } else {
        await sendMail({
          emailType: "forgotPassword",
          userId: existUser?._id,
          email: existUser?.email,
        });

        return { success: "Verification email has been sent to your email." };
      }
    }
  } catch (error) {
    console.log(error);
    return {
      error: "something went wrong please check your connection and try again",
    };
  }
};

export const changePassword = async (currentStatus, formData) => {
  const { token, password, confirmPassword } = Object.fromEntries(formData);

  if (password !== confirmPassword) {
    return { error: "Password must match." };
  }

  try {
    passwordSchema.parse(password);
    const user = await userModel.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user)
      return { error: "Email verification token is invalid or has expired" };
    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    user.isEmailVerified = true;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();
    return { success: "password has successfully changed." };
  } catch (error) {
    if (error?.name == "ZodError") {
      return { error: error?.issues[0].message };
    } else {
      return {
        error:
          "Something went wrong please check you connection and try again.",
      };
    }
  }
};

export const adminDeleteAccount = async (currentStatus, formData) => {
  try {
    const id = formData.get("id");
    await connectDB();
    await userModel.findByIdAndDelete(id);
    revalidateTag("users");
    return { success: "user deleted" };
  } catch (error) {
    console.log(error);
    return { error: "something went wrong please check your connection" };
  }
};
