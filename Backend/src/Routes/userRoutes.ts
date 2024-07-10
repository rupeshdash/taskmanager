import { Router } from "express";
import {z} from 'zod'
import { SignupSchema } from "../ZodSchema/validation";
import User from "../Models/User";
import jwt from "jsonwebtoken";

const jwt_secret = process.env.JWT_SECRET || "";

export const userRouter = Router();


userRouter.post("/signup",async(req,res)=>{
  const {email,password,name} = req.body;

  const result = SignupSchema.safeParse({email,password,name});

  if(!result.success){
    return res.status(401).json({
      message:"invalid inputs"
    })
  }

  const existingUser = await User.findOne({
    email:email
  })

  if(existingUser){
    return res.status(400).json({
      message:"user already exists"
    })
  }

  try{
    const user = await User.create({
      email,
      name,
      password
  })

  const token = jwt.sign({email},jwt_secret);
  
    return res.status(200).json({
      message:"Signup Successfully",
      user:user,
      token:token
    })
  }catch(error){
    console.log(error)
    return res.status(500).json({
      message:"Internal server error"
    })
  }

})


