import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import jwt from "jsonwebtoken";

export const singup = async (req: Request, res: Response) => {
  // Saving a New User
  const user: IUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  user.password = await user.encryptPassword(user.password);
  const saveUser = await user.save();
  // Create a New Token
  const token: string = jwt.sign(
    { _id: saveUser._id },
    process.env.TOKEN_SECRET || "tokentests"
  );
  res.header("auth-token", token).json(saveUser);
  // encript password || set req.body.password
  // console.log(saveUser);
};

export const singin = async (req: Request, res: Response) => {
  // console.log(req.body);
  const user = await User.findOne({ email: req.body.email });
  // const password = await User.findOne({ password: req.body.password });

  // validate email
  if (!user) {
    return res.status(400).json("Email  is wrong");
  }
  console.log(user);

  // validate password
  const correctPassword = await user.validatePassword(req.body.password);
  console.log(correctPassword);

  if (!correctPassword) {
    return res.status(400).json("Invalid Password");
  }
  const token: string = jwt.sign(
    { _id: user._id },
    process.env.TOKEN_SECRET || "tokentest",
    {
      expiresIn: 60 * 60,
    }
  );
  res.header("authtoken", token).json(user);
  // res.send("Profile");
};
export const profile = async (req: Request, res: Response) => {
  const user = await User.findById(req.userId, { password: 0 });
  // valida si no existe un usuario y arroja un mensaje
  if (!user) return res.status(404).json("No User found");
  res.json(user);
};
