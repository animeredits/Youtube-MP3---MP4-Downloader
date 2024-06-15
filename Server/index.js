const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const axios = require('axios');
const dotenv = require("dotenv");
const ytdl = require("ytdl-core");
const { v4: uuidv4 } = require("uuid");
const ffmpeg = require("fluent-ffmpeg");
const bodyParser = require("body-parser");

const app = express();
dotenv.config();

const PORT = process.env.PORT
const Domain =  process.env.Domain

app.use(bodyParser.json());
app.use(cors());

// Endpoint to handle MP3 download

app.post("/download", async (req, res) => {
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
        downloadLink: `${Domain}/download/${filename}`,
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
const downloadVideo = (url, format, outputPath) => {
  return new Promise((resolve, reject) => {
    ytdl(url, { format })
      .pipe(fs.createWriteStream(outputPath))
      .on('finish', resolve)
      .on('error', reject);
  });
};

const downloadThumbnail = async (url, outputPath) => {
  const response = await axios({ url, responseType: 'stream' });
  return new Promise((resolve, reject) => {
    response.data
      .pipe(fs.createWriteStream(outputPath))
      .on('finish', resolve)
      .on('error', reject);
  });
};

const mergeAudioAndVideo = (videoPath, audioPath, thumbnailPath, outputPath) => {
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(videoPath)
      .input(audioPath)
      .input(thumbnailPath)
      .outputOptions('-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac')
      .outputOptions('-map', '2', '-c', 'copy', '-disposition:v:0', 'attached_pic')
      .outputOptions('-metadata:s:v', 'title="Thumbnail"', '-metadata:s:v', 'comment="Cover (Front)"')
      .save(outputPath)
      .on('end', resolve)
      .on('error', reject);
  });
};

app.post('/download-mp4', async (req, res) => {
  const { url } = req.body;

  try {
    const info = await ytdl.getInfo(url);
    const videoFormat = ytdl.chooseFormat(info.formats, { quality: 'highestvideo' });
    const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });

    const videoTitle = sanitizeFilename(info.videoDetails.title);
    const videoFilename = `${videoTitle}_${uuidv4()}.mp4`;
    const videoPath = path.join(__dirname, 'downloads', videoFilename);

    const audioFilename = `${videoTitle}_${uuidv4()}.mp3`;
    const audioPath = path.join(__dirname, 'downloads', audioFilename);

    const thumbnailFilename = `${videoTitle}_${uuidv4()}.jpg`;
    const thumbnailPath = path.join(__dirname, 'downloads', thumbnailFilename);

    const finalFilename = `${videoTitle}_${uuidv4()}_final.mp4`;
    const finalPath = path.join(__dirname, 'downloads', finalFilename);

    const thumbnails = info.videoDetails.thumbnails;
    const thumbnailURL = thumbnails[thumbnails.length - 1].url;

    // Download video, audio, and thumbnail concurrently
    await Promise.all([
      downloadVideo(url, videoFormat, videoPath),
      downloadVideo(url, audioFormat, audioPath),
      downloadThumbnail(thumbnailURL, thumbnailPath),
    ]);

    // Merge audio, video, and thumbnail
    await mergeAudioAndVideo(videoPath, audioPath, thumbnailPath, finalPath);

    // Cleanup temporary files
    fs.unlinkSync(videoPath);
    fs.unlinkSync(audioPath);
    fs.unlinkSync(thumbnailPath);

    // Send response with download link and video details
    res.json({
      downloadLink: `${req.protocol}://${req.get('host')}/download/${finalFilename}`,
      videoDetails: {
        title: info.videoDetails.title,
        thumbnail: thumbnailURL,
        duration: parseInt(info.videoDetails.lengthSeconds),
      },
    });
  } catch (error) {
    console.error('Error downloading or merging video:', error);
    res.status(500).json({ error: 'Failed to download and merge MP4' });
  }
});


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
      // Delete the file after successful download
      fs.unlink(filepath, (err) => {
        if (err) {
          console.error("File deletion error:", err);
        } else {
          console.log(`File ${filename} has been deleted successfully.`);
        }
      });
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} 🟢`);
});

// Function to sanitize filename
function sanitizeFilename(filename) {
  return filename.replace(/[^a-zA-Z0-9\s.-]/g, "").replace(/\s+/g, "_");
}
