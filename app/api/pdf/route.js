// pages/api/save-pdf.js
import fs from "fs";
import path from "path";

export default async function POST(req, res) {
  try {
    // Extract PDF data from the request body
    const { pdfData, filename } = req.body;

    // Convert base64 data to binary buffer
    const buffer = Buffer.from(pdfData, "base64");

    // Define the path where the PDF should be saved in the public directory
    const filePath = path.join(process.cwd(), "public", filename);

    // Save the file
    fs.writeFileSync(filePath, buffer);

    // Return the public URL of the saved PDF
    res.status(200).json({ url: `/public/${filename}` });
  } catch (error) {
    console.error("Error saving PDF:", error);
    res.status(500).json({ error: "Failed to save PDF" });
  }
}
