import express from "express";
import path from "path";
import { initUploadTable } from "./config/sqlConfig.js";
import uploadRouter from "./routes/uploadRoutes.js";
import { cleanup } from "./utils/cleanUp.js";


const app = express()


// Register cleanup handlers for different termination signals
process.on('SIGINT', () => {
    cleanup();
    process.exit(0);
});

process.on('SIGTERM', () => {
    cleanup();
    process.exit(0);
});

process.on('exit', () => {
    console.log("Server stopped");
});

app.use(express.static(path.join(process.cwd(), "../client/dist")));

app.get("/app", async (_, res) => {
    res.sendFile(path.join(process.cwd(), "../client/dist/index.html"))
})

app.use("/api/upload", uploadRouter)

try {
    await initUploadTable()
} catch (err) {
    console.error("Failed to init upload table", err)
    process.exit(1)
}



app.listen(3000, "0.0.0.0", ()=>{
    console.log("Server running on port 3000")
}) 
