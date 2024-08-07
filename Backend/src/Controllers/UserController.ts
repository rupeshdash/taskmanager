import User from "../Models/User";
import { LoginSchema, SignupSchema } from "../ZodSchema/validation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
const jwt_secret = process.env.JWT_SECRET || "";

export const login = async (req:any, res:any) => {
  const { email, password } = req.body;
  try {
    const result = LoginSchema.safeParse({ email, password });
    if (!result.success) {
      return res.json({
        message: "Invalid inputs",
      });
    }
    const existingUser = await User.findOne({
      email: email,
    });
    if (!existingUser) {
      return res.json({
        message: "invalid credentials",
      });
    }
    const match = await bcrypt.compare(password, existingUser.password);

    if (!match) {
      return res.json({
        message: "invalid credentials",
      });
    }
    if (existingUser) {
      const token = jwt.sign({ email }, jwt_secret, (err: any, token: any) => {
        if (err) throw err;
        return res.json({
          token: token,
          user: {
            email: existingUser.email,
            name: existingUser.name,
            teamsMember: existingUser.teamsMember,
            teamsAdmin: existingUser.teamsAdmin,
            tasks: existingUser.tasks,
          },
        });
      });
    }
  } catch (err) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const signup = async (req:any, res:any) => {
  const { email, password, name } = req.body;

  const result = SignupSchema.safeParse({ email, password, name });

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
  const salt = await bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hashSync(password, salt);
  try {
    const user: any = await User.create({
      email,
      name,
      password: hashedPassword,
    });

    const token = jwt.sign({ email }, jwt_secret);

    return res.status(200).json({
      message: "Signup Successfully",
      user: user,
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};