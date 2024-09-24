import User from "../Models/User";
import { LoginSchema, SignupSchema } from "../ZodSchema/validation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { uploadOnCloudinary } from "../config/cloudinary";

const jwt_secret = process.env.JWT_SECRET || "";

export const login = async (req: any, res: any) => {
  const { email, password } = req.body;
  console.log(email, password);
  
  try {
    const result = LoginSchema.safeParse({ email, password });
    console.log(result);
    
    if (!result.success) {
      return res.json({
        errors: [{ message: "Invalid inputs" }],
      });
    }
    const existingUser = await User.findOne({
      email: email,
    });
    console.log("existingUser", existingUser);
    
    if (!existingUser) {
      return res.json({
        errors: [{ message: "Invalid inputs" }],
      });
    }
    const match = await bcrypt.compare(password, existingUser.password);
    console.log("match", match);
    
    if (!match) {
      return res.json({
        errors: [{ message: "Invalid inputs" }],
      });
    }
    const loggedinUser = await User.findOne({ _id: existingUser._id }).select(
      "-password"
    );
    const token = jwt.sign({ email }, jwt_secret);
    if (token) {
      return res.json({
        token: token,
        user: loggedinUser,
      });
    }
  } catch (err) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const signup = async (req: any, res: any) => {
  const { email, password, name, organization } = req.body;
  const { avatar } = req?.files;
  console.log(email, password, name, organization, avatar);

  const result = SignupSchema.safeParse({
    email: email.trim(),
    password: password.trim(),
    name: name.trim(),
    organization: name.trim(),
  });
  console.log(result);

  if (!result.success) {
    return res.status(401).json({
      message: "invalid inputs",
    });
  }

  const existingUser = await User.findOne({
    email: email,
  });

  if (existingUser) {
    return res.status(400).json({
      message: "user already exists",
    });
  }

  console.log(avatar);
  let avatarUploadResult: any = {
    url: "https://res.cloudinary.com/task-manager-0/image/upload/v1727164454/ayiuesrjbipxj1cxqbdm.jpg",
  };
  if (avatar) {
    const avatarLocalPath = avatar[0]?.path;

    avatarUploadResult = await uploadOnCloudinary(avatarLocalPath);
    if (!avatarUploadResult || !avatarUploadResult?.url) {
      return res.status(400).json({
        message: "Avatar image is required",
      });
    }
  }

  const salt = await bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hashSync(password, salt);
  try {
    const user: any = await User.create({
      email,
      name,
      password: hashedPassword,
      organization,
      avatar: avatarUploadResult?.url,
    });
    const createdUser = await User.findOne({ _id: user._id }).select(
      "-password"
    );
    const token = jwt.sign({ email }, jwt_secret);

    return res.status(200).json({
      message: "Signup Successfully",
      user: createdUser,
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getUserDetails = async (req: any, res: any) => {
  const userId = req.header("userId");
  try {
    const user = await User.findOne({ _id: userId }).select("-password");
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    return res.status(200).json({
      user: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
