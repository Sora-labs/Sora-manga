import { imageSchema } from "@/app/_utils/validationSchema";
import { KB, MB } from "@/constant";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import fs from "fs/promises";
import MangaModel from "@/lib/models/manga";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import dbConnect from "@/lib/db";

const createSchema = z.object({
  name: z.string().min(1, "Manga name is required"),
  description: z.string().optional(),
  cover_image: imageSchema.refine(
    (file) => file.size < 2 * MB,
    {
      message: "Cover image must be less than 800KB",
    }),
  background_image: imageSchema.refine(file => file.size < 10 * MB, { message: "Background cover must be less than 10MB" }).optional(),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  type: z.enum(["series", "oneshot"]),
})

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const formData = await request.formData();

    // handle format form data
    const _formData = {
      ...Object.fromEntries(formData.entries()),
      tags: formData.getAll("tags"),
    }
    const parsed = createSchema.safeParse(_formData);

    // validate form data
    if (!parsed.success) {
      console.error("Validation error:", parsed.error.issues);
      return NextResponse.json({
        message: "Validation error",
        errors: parsed.error.issues,
      }, { status: 400 });
    }

    // handle saving images
    const payload = parsed.data;
    console.log("Parsed data:", payload);

    await fs.mkdir("public/manga/covers", { recursive: true });
    const coverImagePath = `/manga/covers/${crypto.randomUUID()}-${payload.cover_image.name}`;
    await fs.writeFile(`public${coverImagePath}`, Buffer.from(await payload.cover_image.arrayBuffer()));

    let bgImagePath = null;
    if (payload.background_image) {
      await fs.mkdir("public/manga/backgrounds", { recursive: true });
      bgImagePath = `/manga/backgrounds/${crypto.randomUUID()}-${payload.background_image.name}`;
      await fs.writeFile(`public${bgImagePath}`, Buffer.from(await payload.background_image.arrayBuffer()));
    }

    // get userId from request headers
    const token = request.headers.get("authorization")?.split(" ")[1];
    const jwtPayload = jwt.decode(token ?? "") as any;
    console.log("Decoded JWT payload:", jwtPayload);
    const userId = jwtPayload.userId;

    // save manga
    const mangaData = {
      name: payload.name,
      description: payload.description,
      cover_url: coverImagePath,
      background_url: bgImagePath ?? null,
      tags: payload.tags,
      type: payload.type,
      uploaderId: userId,
    };
    console.log("Manga data to save:", mangaData);

    const newManga = new MangaModel(mangaData)
    await newManga.save();

    return NextResponse.json({
      message: "Manga uploaded",
      data: {
        is_success: true,
        message: "Manga uploaded",
      },
    }, { status: 200 });
  } catch (error) {
    console.error("Error uploading manga:", error);
    return NextResponse.json({
      message: "Internal server error"
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const bodyData = await request.json();
    console.log("Received data for update:", bodyData);

    // Here you would typically update the manga in your database

    return NextResponse.json({
      message: "Manga updated",
      data: {
        is_success: true,
        message: "Manga updated",
      },
    });
  } catch (error) {
    console.error("Error processing update request:", error);
    return NextResponse.json({
      message: "Internal server error"
    }, { status: 500 });
  }
}