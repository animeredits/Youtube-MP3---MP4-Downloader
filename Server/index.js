const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const ytdl = require("ytdl-core");
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");

const app = express();

dotenv.config();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

// Function to download video stream
async function downloadVideo(url, format, filepath) {
  return new Promise((resolve, reject) => {
    const videoStream = ytdl(url, { format: format })
      .on("error", (err) => reject(err))
      .pipe(fs.createWriteStream(filepath));

    videoStream.on("finish", () => resolve());
  });
}

// Function to merge audio and video using ffmpeg
async function mergeAudioAndVideo(videoPath, audioPath, outputPath) {
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(videoPath)
      .input(audioPath)
      .outputOptions("-c:v copy")
      .outputOptions("-c:a aac")
      .save(outputPath)
      .on("end", () => resolve())
      .on("error", (err) => reject(err));
  });
}

// Endpoint to handle MP3 download
app.post("/api/mp3", async (req, res) => {
  const { url } = req.body;

  try {
    const info = await ytdl.getInfo(url);
    const format = ytdl.chooseFormat(info.formats, { quality: "highestaudio" });

    const thumbnails = info.videoDetails.thumbnails;
    const thumbnailURL = thumbnails[thumbnails.length - 1].url;

    const videoDetails = {
      title: info.videoDetails.title,
      thumbnail: thumbnailURL,
      duration: parseInt(info.videoDetails.lengthSeconds),
    };

    const filename = `${sanitizeFilename(info.videoDetails.title)}.mp3`;
    const filepath = path.join(__dirname, "downloads", filename);

    const stream = ffmpeg(ytdl(url, { format: format }))
      .audioBitrate(320)
      .save(filepath);

    stream.on("end", () => {
      res.json({
        downloadLink: `https://${req.headers.host}/download/${filename}`,
        videoDetails,
      });
    });

    stream.on("error", (err) => {
      console.error("FFmpeg error:", err);
      if (!res.headersSent) {
        res.status(500).json({ error: "Failed to convert to MP3" });
      }
    });
  } catch (error) {
    console.error("Error fetching download link:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: error.message });
    }
  }
});

// Endpoint to handle MP4 download
app.post("/api/mp4", async (req, res) => {
  const { url } = req.body;

  try {
    const info = await ytdl.getInfo(url);
    const videoFormat = ytdl.chooseFormat(info.formats, {
      quality: "highestvideo",
    });
    const audioFormat = ytdl.chooseFormat(info.formats, {
      quality: "highestaudio",
    });

    const videoTitle = sanitizeFilename(info.videoDetails.title);
    const videoFilename = `${videoTitle}_${uuidv4()}.mp4`;
    const videoPath = path.join(__dirname, "downloads", videoFilename);

    const audioFilename = `${videoTitle}_${uuidv4()}.mp3`;
    const audioPath = path.join(__dirname, "downloads", audioFilename);

    const finalFilename = `${videoTitle}_${uuidv4()}_final.mp4`;
    const finalPath = path.join(__dirname, "downloads", finalFilename);

    const thumbnails = info.videoDetails.thumbnails;
    const thumbnailURL = thumbnails[thumbnails.length - 1].url;

    // Download video and audio streams concurrently
    await Promise.all([
      downloadVideo(url, videoFormat, videoPath),
      downloadVideo(url, audioFormat, audioPath),
    ]);

    // Merge audio and video using ffmpeg
    await mergeAudioAndVideo(videoPath, audioPath, finalPath);

    // Cleanup temporary files
    fs.unlinkSync(videoPath);
    fs.unlinkSync(audioPath);

    // Send response with download link and video details
    res.json({
      downloadLink: `https://${req.headers.host}/download/${finalFilename}`,
      videoDetails: {
        title: info.videoDetails.title,
        thumbnail: thumbnailURL,
        duration: parseInt(info.videoDetails.lengthSeconds),
      },
    });
  } catch (error) {
    console.error("Error downloading or merging video:", error);
    res.status(500).json({ error: "Failed to download and merge MP4" });
  }
});

const downloadsDir = path.join(__dirname, "downloads");
if (!fs.existsSync(downloadsDir)) {
  fs.mkdirSync(downloadsDir);
}

// Endpoint to handle file downloads
app.get("/download/:filename", (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, "downloads", filename);

  res.download(filepath, (err) => {
    if (err) {
      console.error("Download error:", err);
      if (!res.headersSent) {
        return res.status(404).json({ error: "File not found" });
      }
    } else {
      fs.unlink(filepath, (err) => {
        if (err) {
          console.error("File deletion error:", err);
        }
      });
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🟢`);
});

// Function to sanitize filename
function sanitizeFilename(filename) {
  return filename.replace(/[^a-zA-Z0-9\s.-]/g, "").replace(/\s+/g, "_");
}
