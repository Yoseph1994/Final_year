"use server";
import { revalidateTag } from "next/cache";
import connectDB from "../db/config";
import { bookTour } from "./book";
import { PDFDocument, rgb } from "pdf-lib";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import cloudinary from "../cloudinaryConfig";
import tourModel from "../db/model/tourModel";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import { verifyToken } from "../VerifyToken";
import { storage } from "../firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

//check if the object has falsy value
const checkForFalsyValues = (obj) => {
  for (const [key, value] of Object.entries(obj)) {
    console.log(key, value);
    if (value === "" || value === null || value === undefined) {
      return { error: true, message: `The ${key} field is required` };
    }
  }
  return { error: false, message: "Passed" };
};

const uploadImageToCloudinary = async (photo) => {
  try {
    const uploadedImage = await cloudinary.uploader.upload(photo, {
      folder: "",
    });
    return uploadedImage.secure_url;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllTours = async (page, price) => {
  const priceRegex =
    price == "100to2500"
      ? { price: { $gte: 100, $lte: 2500 } }
      : price == "2500to5000"
      ? { price: { $gte: 2500, $lte: 5000 } }
      : price == "over5000"
      ? { price: { $gt: 5000 } }
      : {};
  try {
    await connectDB();
    const totalTours = await tourModel.countDocuments(priceRegex);
    const tours = await tourModel
      .find(priceRegex)
      .limit(process.env.PAGINATION_MAX_TOUR)
      .skip(process.env.PAGINATION_MAX_TOUR * (page - 1))
      .lean();
    const totalPage = Math.ceil(
      Number(totalTours / process.env.PAGINATION_MAX_TOUR)
    );
    return { totalPage, tours };
  } catch (error) {
    console.log(error);
  }
};

export const fetchTourById = async (id) => {
  try {
    await connectDB();
    const tours = await tourModel
      .findById(id)
      .populate("guides", "name email photo role isActive")
      .populate("leadGuides", "name email photo")
      .lean();
    return tours ? JSON.stringify(tours) : false;
  } catch (error) {
    console.log(error);
  }
};

export const fetchTop5Cheap = async () => {
  try {
    await connectDB();
    const tours = await tourModel.find({}).sort({ price: 1 }).limit(5).lean();
    return tours ? JSON.stringify(tours) : false;
  } catch (error) {
    console.log(error);
  }
};

export const getAllTours = async ({ tours }) => {
  const { userInfo } = await verifyToken();
  try {
    const limitTours = tours && userInfo.role == "guide";

    if (limitTours) {
      await connectDB();
      const tour = await tourModel.find({ guides: userInfo.userId });
      return JSON.stringify(tour);
    } else {
      await connectDB();
      const tour = await tourModel.find({}).lean();
      if (tour) {
        return JSON.stringify(tour);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteTour = async (currentState, formData) => {
  const { id } = Object.fromEntries(formData);
  try {
    await tourModel.findByIdAndDelete(id);
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "something went wrong please try again" };
  }
};

export const createTour = async (currentState, formData) => {
  try {
    const {
      name,
      duration,
      maxGroupSize,
      difficulty,
      price,
      discount,
      summary,
      description,
      startingDate,
      startLong,
      startLat,
      startAddress,
      startDescription,
      landLong,
      landLat,
      landingAddress,
      landingDescription,
      guides,
      leadGuides,
      coverImage,
      images,
    } = Object.fromEntries(formData);
    const startCountry = startLat + "," + startLong;
    const landingCountry = landLat + "," + landLong;

    const tourInfo = {
      name,
      duration,
      maxGroupSize,
      difficulty,
      price,
      discount,
      summary,
      description,
      startingDate,
      isSecrete: false,
      startCountry: startCountry?.split(","),
      startAddress,
      startDescription,
      landingCountry: landingCountry?.split(","),
      landingAddress,
      landingDescription,
      guides: guides.split(","),
      leadGuides: leadGuides.split(","),
      coverImage,
      images: JSON.parse(images),
    };

    const dataToBeValidate = {
      name,
      duration,
      maxGroupSize,
      difficulty,
      price,
      summary,
      description,
      startingDate,
      startCountry: startCountry?.split(","),
      startAddress,
      startDescription,
      landingCountry: landingCountry?.split(","),
      landingAddress,
      landingDescription,
      guides: guides.split(","),
      leadGuides: leadGuides.split(","),
      coverImage,
      images: JSON.parse(images).length,
    };

    //check validation
    const { error, message } = checkForFalsyValues(dataToBeValidate);
    if (error) {
      return { error: message };
    }

    const existNameTour = await tourModel.findOne({ name });

    if (existNameTour) {
      return { error: "tour name already exists" };
    }

    //upload the images and update the fields
    let coverImageUrl = "";
    let imagesUrl = [];

    coverImageUrl = await uploadImageToCloudinary(coverImage);
    for (let i = 0; i < tourInfo.images.length; i++) {
      let url = await uploadImageToCloudinary(tourInfo.images[i]);
      imagesUrl.push(url);
    }

    const dataToBeSaved = {
      name,
      duration,
      maxGroupSize,
      difficulty,
      price,
      summary,
      description,
      secretTour: tourInfo.isSecrete,
      priceDiscount: tourInfo.discount,
      startDate: startingDate,
      startLocation: {
        coordinates: tourInfo.startCountry,
        address: tourInfo.startAddress,
        description: tourInfo.startDescription,
      },
      location: {
        coordinates: tourInfo.landingCountry,
        address: tourInfo.landingAddress,
        description: tourInfo.landingDescription,
      },
      guides: tourInfo.guides,
      leadGuides: tourInfo.leadGuides,
      imageCover: coverImageUrl,
      images: imagesUrl,
    };

    //save it to db

    await connectDB();
    const newTour = await tourModel.create(dataToBeSaved);
    if (newTour) {
      return { success: true, id: newTour._id };
    }
  } catch (error) {
    console.log(error);
    return { error: "something went wrong please try again." };
  }
};

export const fetchClosestTour = async (lat, long) => {
  try {
    await connectDB();
    const closeTours = await tourModel
      .find({
        startLocation: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [Number(lat), Number(long)],
            },
            $maxDistance: 500000,
          },
        },
      })
      .lean();

    if (closeTours.length > 0) {
      return { success: closeTours };
    }
    if (closeTours.length == 0) {
      return { error: "No close tour has been found." };
    }
  } catch (error) {
    console.log(error);
    return { error: "something went wrong please try again." };
  }
};

export const fetchAllTourFromStripe = async () => {
  const checkTours = await stripe.products.list();
  return checkTours.data;
};

export const payWithStripe = async (currentState, formData) => {
  const { userId, tourId, image, name, price, quantity } =
    Object.fromEntries(formData);
  try {
    const savedTour = await bookTour({ tourId, userId, price });

    if (savedTour) {
      let activeTours = await fetchAllTourFromStripe();
      const stripeTour = activeTours?.find(
        (item) => item?.name?.toLowerCase() == name?.toLowerCase()
      );
      if (stripeTour == undefined) {
        await stripe.products.create({
          name: name,
          default_price_data: {
            unit_amount: Number(price) * 100,
            currency: "etb",
          },
          images: [image],
        });
      }

      //depending on the quantity generate the session
      const existStripeTour = activeTours?.find(
        (item) => item?.name?.toLowerCase() == name?.toLowerCase()
      );

      const bookingTour = {
        price: existStripeTour?.default_price,
        quantity: Number(quantity),
      };

      const session = await stripe.checkout.sessions.create({
        line_items: [bookingTour],
        mode: "payment",
        success_url: `${process.env.FRONTEND_DOMAIN}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_DOMAIN}/checkout/cancel?id=${savedTour?._id}`,
        metadata: { bookedTourId: savedTour?._id.toString() },
      });
      return { url: session?.url };
    } else {
      return { error: "Something went wrong please try again." };
    }
  } catch (error) {
    console.log(
      `error occurred here at the product registering to stripe ${error}`
    );
  }
};

export const generateInvoicePdf = async ({ dataForReceipt }) => {
  try {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([800, 350]);
    const footerImgUrl =
      "https://res.cloudinary.com/dg6ck04nm/image/upload/v1717909940/recieptFooter_sexepj.png";
    const imgUrl =
      "https://res.cloudinary.com/dg6ck04nm/image/upload/v1717909941/recieptHeading_y2zbcv.png";

    // Fetch images
    const [footerImgBytes, imgBytes] = await Promise.all([
      fetch(footerImgUrl).then((res) => res.arrayBuffer()),
      fetch(imgUrl).then((res) => res.arrayBuffer()),
    ]);

    // Embed images
    const footerImg = await pdfDoc.embedPng(footerImgBytes);
    const img = await pdfDoc.embedPng(imgBytes);

    const fontSize = 12;
    const fontBig = 18;
    const { height } = page.getSize();

    page.drawImage(img, {
      x: 0,
      y: height - 50,
    });

    page.drawImage(footerImg, {
      x: 0,
      y: 0,
    });
    //support
    page.drawText("Support: joshrde2002@gmail.com", {
      x: 550,
      y: 50,
      size: fontSize,
      color: rgb(0, 0, 0),
    });

    //user title
    page.drawText("Users", {
      x: 50,
      y: height - 5.5 * fontSize,
      size: fontBig,
      color: rgb(0, 0, 0),
    });

    //name
    page.drawText(`Name: ${dataForReceipt.username}`, {
      x: 50,
      y: height - 7 * fontSize,
      size: fontSize,
      color: rgb(0, 0, 0),
    });

    //email
    page.drawText(`Email: ${dataForReceipt.userEmail}`, {
      x: 50,
      y: height - 8.5 * fontSize,
      size: fontSize,
      color: rgb(0, 0, 0),
    });

    //date
    page.drawText(`Date: ${dataForReceipt.date}`, {
      x: 50,
      y: height - 10 * fontSize,
      size: fontSize,
      color: rgb(0, 0, 0),
    });

    //userId
    page.drawText(`UserId: ${dataForReceipt.userId}`, {
      x: 50,
      y: height - 11.5 * fontSize,
      size: fontSize,
      color: rgb(0, 0, 0),
    });

    ///////////////////////////////////////////////////////////////////////////////////////////
    //transaction title
    page.drawText("Transaction Detail", {
      x: 50,
      y: height - 14 * fontSize,
      size: fontBig,
      color: rgb(0, 0, 0),
    });

    //transaction id
    page.drawText(`Status: ${dataForReceipt.transactionStatus}`, {
      x: 50,
      y: height - 15.5 * fontSize,
      size: fontSize,
      color: rgb(0, 0, 0),
    });

    //date
    page.drawText(`Date: ${dataForReceipt.date}`, {
      x: 50,
      y: height - 17 * fontSize,
      size: fontSize,
      color: rgb(0, 0, 0),
    });

    //paid amount
    page.drawText(`Amount: ${dataForReceipt.amountPaid}`, {
      x: 50,
      y: height - 18.5 * fontSize,
      size: fontSize,
      color: rgb(0, 0, 0),
    });

    //payment status
    page.drawText(`TransactionId: ${dataForReceipt.transactionId}`, {
      x: 50,
      y: height - 20 * fontSize,
      size: fontSize,
      color: rgb(0, 0, 0),
    });

    //currency
    page.drawText(`Currency: ${dataForReceipt.currency}`, {
      x: 50,
      y: height - 21.5 * fontSize,
      size: fontSize,
      color: rgb(0, 0, 0),
    });

    //PAYMENT INTENT
    page.drawText(`Payment Intent: ${dataForReceipt.paymentIntent}`, {
      x: 50,
      y: height - 23 * fontSize,
      size: fontSize,
      color: rgb(0, 0, 0),
    });

    ///////////////////////////////////////////////////////////////////////////////////////////
    //Tour title
    page.drawText("Tour Detail", {
      x: 400,
      y: height - 5.5 * fontSize,
      size: fontBig,
      color: rgb(0, 0, 0),
    });

    //tour id
    page.drawText(`Tour Id: ${dataForReceipt.tourId}`, {
      x: 400,
      y: height - 7 * fontSize,
      size: fontSize,
      color: rgb(0, 0, 0),
    });

    //tour is Active
    page.drawText(`Tour Status: ${dataForReceipt.tourStatus}`, {
      x: 400,
      y: height - 8.5 * fontSize,
      size: fontSize,
      color: rgb(0, 0, 0),
    });

    //start address
    page.drawText(`Staring Address: ${dataForReceipt.startingAddress}`, {
      x: 400,
      y: height - 10 * fontSize,
      size: fontSize,
      color: rgb(0, 0, 0),
    });

    //end address
    page.drawText(`End Address: ${dataForReceipt.endAddress}`, {
      x: 400,
      y: height - 11.5 * fontSize,
      size: fontSize,
      color: rgb(0, 0, 0),
    });

    //Price
    page.drawText(`Price: $${dataForReceipt.tourPrice}`, {
      x: 400,
      y: height - 13 * fontSize,
      size: fontSize,
      color: rgb(0, 0, 0),
    });

    //qty
    page.drawText(`Quantity: ${dataForReceipt.quantity}`, {
      x: 400,
      y: height - 14.5 * fontSize,
      size: fontSize,
      color: rgb(0, 0, 0),
    });

    const pdfBlob = await pdfDoc.save();

    const uid = uuidv4();

    const storageRef = ref(storage, `${uid}-receipt.pdf`);

    const snapshot = await uploadBytes(storageRef, pdfBlob);

    const downloadUrl = await getDownloadURL(snapshot.ref);

    return downloadUrl;
  } catch (error) {
    console.log(error);
  }
};

export const updateTour = async (currentState, formData) => {
  const {
    tourId,
    name,
    duration,
    maxGroupSize,
    difficulty,
    price,
    discount,
    summary,
    description,
    startingDate,
    startLong,
    startLat,
    startAddress,
    startDescription,
    landLong,
    landLat,
    landingAddress,
    landingDescription,
    guides,
    leadGuides,
    coverImage,
    images,
  } = Object.fromEntries(formData);

  try {
    //find tour by id
    await connectDB();
    const existTour = await tourModel.findById(tourId).lean();

    if (name) {
      const existNameTour = await tourModel.findOne({ name });

      if (existNameTour) {
        return { error: "tour name already exists" };
      }
    }

    // upload the images if they exist
    let primaryImage;
    let secondaryImages = [];
    if (coverImage) {
      const uploadResult = await cloudinary.uploader.upload(coverImage);
      primaryImage = uploadResult.secure_url;
    }

    const imagesList = images ? JSON.parse(images) : null;
    if (imagesList) {
      for (let i = 0; i < imagesList.length; i++) {
        const uploadResult = await cloudinary.uploader.upload(imagesList[i]);
        secondaryImages.push(uploadResult.secure_url);
      }
    }

    let startCountry;
    let landingCountry;

    if (startLat && startLong) {
      startCountry = startLat + "," + startLong;
    }

    if (landLat && landLong) {
      landingCountry = landLat + "," + landLong;
    }

    //give each fields value if that is sent through req if not give it existing value

    const dataToBeSaved = {
      name: name || existTour.name,
      duration: duration || existTour.duration,
      maxGroupSize: maxGroupSize || existTour.maxGroupSize,
      difficulty: difficulty || existTour.difficulty,
      price: price || existTour.price,
      summary: summary || existTour.summary,
      description: description || existTour.description,
      secretTour: false,
      priceDiscount: discount || existTour.priceDiscount,
      startDate: startingDate || existTour.startDate,
      startLocation: {
        type: "Point",
        coordinates:
          startCountry?.split(",") ||
          existTour.startLocation.coordinates ||
          existTour.startLocation[0].coordinates,
        address:
          startAddress ||
          existTour.startLocation.address ||
          existTour.startLocation[0].address,
        description:
          startDescription ||
          existTour.startLocation.description ||
          existTour.startLocation[0].description,
      },
      location: {
        type: "Point",
        coordinates:
          landingCountry?.split(",") ||
          existTour.location.coordinates ||
          existTour.location[0].coordinates,
        address:
          landingAddress ||
          existTour.location.address ||
          existTour.location[0].address,
        description:
          landingDescription ||
          existTour.location.description ||
          existTour.location[0].description,
      },
      guides: guides || existTour.guides,
      leadGuides: leadGuides || existTour?.leadGuides,
      imageCover: primaryImage || existTour.imageCover,
      images: secondaryImages.length > 0 ? secondaryImages : existTour.images,
    };
    //save it to db

    await connectDB();
    const updatedValue = await tourModel.findByIdAndUpdate(
      tourId,
      dataToBeSaved
    );

    revalidateTag("tours");

    // return the message with success and let the user redirect to tours list

    if (updatedValue) {
      return { success: "Tour successfully updated." };
    } else {
      return { error: "error occurred at updating tour please try again" };
    }
  } catch (error) {
    console.log(error);
    return { error: "error occurred at updating tour please try again" };
  }
};

export const fetchRelatedTours = async (difficulty) => {
  try {
    await connectDB();
    const tours = await tourModel
      .find({ difficulty })
      .select("_id imageCover price name")
      .lean();
    return JSON.stringify(tours);
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllToursToSearch = async () => {
  try {
    await connectDB();
    const tours = await tourModel.find({}).select("_id name imageCover").lean();
    return tours ? JSON.stringify(tours) : false;
  } catch (error) {
    console.log(error);
  }
};
