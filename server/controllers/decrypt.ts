import { query, Request, Response } from "express";
import prisma from "../prisma/prisma";
import cryptr from "../utils/cryptr";

export default async function decrypt(req: Request, res: Response) {
  try {
    const { code, password }: any = req.query;
    if (!code || !password) {
      return res.status(400).json({
        message: "Sharing code and password are required",
      });
    }
    const text = await prisma.text.findUnique({
      where: {
        sharing_code: code,
      },
    });
    if (!text) {
      return res.status(400).json({
        message: "Invalid decryption payload",
      });
    }
    const isPasswordCorrect = password === cryptr.decrypt(text.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid decryption payload",
      });
    }
    return res.status(200).json({
      text: cryptr.decrypt(text.text),
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Something went wrong" });
  }
}
