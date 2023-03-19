import dayjs from "dayjs";
import randomstring from "randomstring";
import prisma from "../prisma/prisma";
import { Request, Response } from "express";
import cryptr from "../utils/cryptr";

export default async function create(req: Request, res: Response) {
  try {
    const { text, length, password, isProtected } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    if (isProtected && !password) {
      return res.status(400).json({
        message: "Password is require for protected content",
      });
    }

    const expiry = dayjs()
      .add(length || 15, length < 2 ? "minute" : "minutes")
      .toDate();
    const created = dayjs().toDate();

    const encryptedString = cryptr.encrypt(text);

    const Text = await prisma.text.create({
      data: {
        text: encryptedString,
        sharing_code: randomstring.generate(4).toLowerCase(),
        created,
        expiry,
        password: cryptr.encrypt(password),
        isProtected,
      },
    });

    await prisma.create.create({
      data: {
        created,
      },
    });

    return res.status(201).json({ message: "Success", Text });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong", error });
  }
}
