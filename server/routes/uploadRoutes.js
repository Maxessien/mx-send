import { Router } from "express";
import multer from "multer";
import { getAllFiles, getFileById, uploadFile } from "../controllers/uploadControllers.js";


const upload = multer({ dest: 'tempUploads/' })

const uploadRouter = Router()

uploadRouter.get("/", getAllFiles)
uploadRouter.post("/", upload.single("file"), uploadFile)
uploadRouter.get("/:id", getFileById)


export default uploadRouter