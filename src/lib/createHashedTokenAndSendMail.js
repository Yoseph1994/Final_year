import nodemailer from "nodemailer";
import userModel from "./db/model/userModel";
import bcrypt from "bcrypt";
import ejs from "ejs";
import path from "path";

export const sendMail = async ({ emailType, userId, email }) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);
    const twentyFourHoursInMillis = 24 * 60 * 60 * 1000;
    if (emailType == "verifyEmail") {
      await userModel.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + Number(twentyFourHoursInMillis),
      });
    } else if (emailType == "forgotPassword") {
      await userModel.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + Number(twentyFourHoursInMillis),
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail", // or another service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_BASED_PASS,
      },
    });

    const templatePath = path.join(process.cwd(), "views", "emailTemplate.ejs");
    const forgotPasswordPath = path.join(
      process.cwd(),
      "views",
      "forgotPasswordTemplate.ejs"
    );
    const domain = process.env.FRONTEND_DOMAIN;
    const emailTemplate = await ejs.renderFile(templatePath, {
      domain,
      hashedToken,
    });
    const forgotPasswordTemplate = await ejs.renderFile(forgotPasswordPath, {
      domain,
      hashedToken,
    });

    const mailOptions = {
      from: "AdventureHub Team <joshrde2002@gmail.com>",
      to: email,
      subject:
        emailType == "verifyEmail"
          ? "Verify Your Password"
          : "Reset Your Password",
      html: emailType == "verifyEmail" ? emailTemplate : forgotPasswordTemplate,
    };

    const mailRes = await transporter.sendMail(mailOptions);
    return mailRes;
  } catch (error) {
    throw new Error(error?.message);
  }
};
