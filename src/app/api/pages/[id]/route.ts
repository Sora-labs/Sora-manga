import Manga from "@/lib/models/manga";
import { NextRequest, NextResponse } from "next/server"
import fs from "fs/promises";
import Page from "@/lib/models/page";
import dbConnect from "@/lib/db";

function formatFormData(formData: FormData) {
  const pages: { pageNum: number; image: File }[] = [];
  let index = 0;
  while (formData.has(`pages[${index}].pageNum`)) {
    pages.push({
      pageNum: Number(formData.get(`pages[${index}].pageNum`)),
      image: formData.get(`pages[${index}].image`) as File,
    });
    index++;
  }
  return pages;
}

export const GET = async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    await dbConnect()
    const { id } = await params

    const result = await Page.findById(id)

    return NextResponse.json({ data: { is_success: true, data: result }, message: "success" })

  } catch (error) {
    console.log("Error fetching pages:", error);

    return NextResponse.json({ is_success: false, message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect()
    const formData = await request.formData()
    const pages = formatFormData(formData);
    console.log(pages)

    const { id } = await params

    // check if valid manga id
    const manga = await Manga.findById(id)
    if (!manga) {
      return NextResponse.json({ is_success: false, message: "Manga not found" }, { status: 404 });
    }

    pages.forEach(async (page) => {

      // save page image
      await fs.mkdir("public/manga/pages", { recursive: true });
      const coverImagePath = `/manga/pages/${crypto.randomUUID()}-${page.image.name}`;
      await fs.writeFile(`public${coverImagePath}`, Buffer.from(await page.image.arrayBuffer()));

      // save data into db
      const pageData = {
        pageNum: page.pageNum.toString(),
        mangaId: id,
        image: coverImagePath,
      }

      const newPage = new Page(pageData)
      await newPage.save();
    })

    return NextResponse.json({ data: { is_success: true, message: "success" } })
  } catch (error) {
    console.error("Error creating page:", error);
    return NextResponse.json({ is_success: false, message: "Internal server error" }, { status: 500 });
  }
}

export const PUT = async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    await dbConnect()
    const { id } = await params
    const body = await request.json()

    // check if valid manga id
    const manga = await Manga.findById(id)
    if (!manga) {
      return NextResponse.json({ is_success: false, message: "Manga not found" }, { status: 404 });
    }
  }
  catch (error) {
    console.error("Error updating page:", error);
    return NextResponse.json({ is_success: false, message: "Internal server error" }, { status: 500 });
  }
}