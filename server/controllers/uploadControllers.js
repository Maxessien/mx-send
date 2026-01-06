import fs from "fs/promises";
import pth from "path";
import { v4 as uuidv4 } from "uuid";
import { all, get, run } from "../config/sqlConfig.js";
import { SERVER_PATH } from "../index.js";

const uploadFile = async (req, res) => {
  try {
    console.log("uplljdndn")
    const id = uuidv4();
    const { size, path, originalname } = req.file;
    const ext = pth.extname(originalname);
    await fs.rename(path, pth.join(SERVER_PATH, `uploads/${originalname}`));
    const query = `INSERT INTO uploads (upload_id, path, file_name, size, ext) VALUES (?, ?, ?, ?, ?)`;
    await run(query, [id, pth.join(SERVER_PATH, `uploads/${originalname}`), originalname, size, ext]);
    return res.status(201).json({ message: "File uploaded successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "File upload failed" });
  }
};

const getFileById = async (req, res) => {
  try {
    const fileData = await get(
      "SELECT path, file_name FROM uploads WHERE upload_id = ?",
      [req.params.id]
    );
    if (!fileData) throw new Error("File not found");
    return res.download(fileData.path, fileData.file_name);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Couldn't get file" });
  }
};

const getAllFiles = async (req, res) => {
  try {
    console.log("getting all")
    const filesData = await all("SELECT file_name, ext, upload_id, size, date_added FROM uploads");
    return res.status(200).json(filesData);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Couldn't get any file" });
  }
};

export { getAllFiles, getFileById, uploadFile };

