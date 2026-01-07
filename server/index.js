#!/usr/bin/env node

import express from "express";
import path from "path";
import { initUploadTable, run } from "./config/sqlConfig.js";
import uploadRouter from "./routes/uploadRoutes.js";
import { cleanup } from "./utils/cleanUp.js";
import os from 'os';
import qrcode from "qrcode-terminal"
import chalk from "chalk";
import terminalLink from 'terminal-link';



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

export const SERVER_PATH = "C:/Users/Dell/Documents/projects/mx-send/server"

app.use(express.static(path.join(SERVER_PATH, "../client/dist")));

app.get("/app", async (_, res) => {
    res.sendFile(path.join(SERVER_PATH, "../client/dist/index.html"))
})

app.use("/api/upload", uploadRouter)

try {
    await initUploadTable()
    run("DELETE FROM uploads")
} catch (err) {
    console.error("Failed to init upload table", err)
    process.exit(1)
}



app.listen(3000, "0.0.0.0", ()=>{
    const {address} = os.networkInterfaces()['Wi-Fi'].find((networkInfo)=>networkInfo.family === "IPv4")
    console.log(chalk.cyan(`http://${address}:3000/app`))
    qrcode.generate(`http://${address}:3000/app`, {small: true})
}) 
