import fs from "fs";
import path from "path";

export async function POST(req, res) {
  try {
    const publicPath = path.join(
      process.cwd(),
      "public",
      "daily_parcel_report.pdf"
    );
    const pdfData = req.body.pdfData;
    fs.writeFile(publicPath, pdfData, (err) => {
      if (err) {
        return res.status(500).json({ error: "Error writing file" });
      }
      res.status(200).json({ message: "File saved successfully" });
    });
  } catch (err) {
    res.status(405).json({ message: "Method not allowed" });
  }
}
