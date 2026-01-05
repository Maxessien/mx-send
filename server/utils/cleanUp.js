import path from "path";
import fs from "fs"
import { run } from "../config/sqlConfig.js";

/**
 * Cleanup function to delete database and uploaded files on server shutdown
 */
export const cleanup = () => {
    console.log("\nCleaning up before shutdown...");
    
    try {
        // Delete upload.db file
        run("DELETE FROM uploads")
        
        // Delete all files in uploads folder
        const uploadsPath = path.join(process.cwd(), "uploads");
        if (fs.existsSync(uploadsPath)) {
            const uploadFiles = fs.readdirSync(uploadsPath);
            uploadFiles.forEach(file => {
                fs.unlinkSync(path.join(uploadsPath, file));
            });
            console.log(`Deleted ${uploadFiles.length} file(s) from uploads folder`);
        }
        
        // Delete all files in tempUploads folder
        const tempUploadsPath = path.join(process.cwd(), "tempUploads");
        if (fs.existsSync(tempUploadsPath)) {
            const tempFiles = fs.readdirSync(tempUploadsPath);
            tempFiles.forEach(file => {
                fs.unlinkSync(path.join(tempUploadsPath, file));
            });
            console.log(`Deleted ${tempFiles.length} file(s) from tempUploads folder`);
        }
        
        console.log("Cleanup completed successfully");
    } catch (err) {
        console.error("Error during cleanup:", err);
    }
}