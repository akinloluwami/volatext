import dayjs from "dayjs";
import { Request, Response } from "express";
import prisma from "../prisma/prisma";
import cryptr from "../utils/cryptr";

export default async function get(req: Request, res: Response) {
  const code: any = req.params.code;

  const text = await prisma.text.findUnique({
    where: {
      sharing_code: code,
    },
  });

  if (!text) {
    return res.status(404).json({ message: "Text not found" });
  }

  const now = dayjs();
  const expiry = dayjs(text.expiry);

  const diff = expiry.diff(now, "m");

  if (diff < 1) {
    await prisma.text.delete({
      where: { sharing_code: code },
    });
    return res.status(404).json({ message: "Text not found" });
  }

  if (text.isProtected) {
    return res.status(200).json({
      text: text.text.replaceAll("a", "@"),
      sharing_code: text.sharing_code,
      diff,
      isProtected: text.isProtected,
    });
  }

  return res.status(200).json({
    text: cryptr.decrypt(text.text),
    sharing_code: text.sharing_code,
    diff,
    isProtected: text.isProtected,
  });
}
