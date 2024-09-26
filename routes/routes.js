// routes/routes.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql2');

// MySQL database connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'villaverde_alvin'
});

// Connect to MySQL
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database.');
});

// File upload configuration using Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads'); // Upload files to 'public/uploads'
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename the file to avoid conflicts
    }
});

const upload = multer({ storage: storage });

// Function to retrieve songs from the database
function getUploadedSongs(callback) {
    const query = 'SELECT * FROM tonapsongs ORDER BY uploaded_at DESC';
    db.query(query, (err, results) => {
        if (err) throw err;
        callback(results);
    });
}

// Route to display homepage with uploaded songs
router.get('/', (req, res) => {
    getUploadedSongs((songs) => {
        res.render('index', { songs }); // Render the index.ejs file with songs data
    });
});

// Route for upload page
router.get('/upload', (req, res) => {
    getUploadedSongs((songs) => {
        res.render('upload', { songs }); // Render upload.ejs with songs data
    });
});

// About page route
router.get('/about', (req, res) => {
    res.render('about'); // Render the about.ejs page
});

// Handle MP3 and album cover uploads
router.post('/upload', upload.fields([{ name: 'mp3file', maxCount: 1 }, { name: 'albumCover', maxCount: 1 }]), (req, res) => {
    const uploaderName = req.body.uploaderName; // Get the uploader's name
    const mp3File = req.files['mp3file'] ? req.files['mp3file'][0] : null;
    const albumCover = req.files['albumCover'] ? req.files['albumCover'][0] : null;

    // Check if the MP3 file was uploaded
    if (!mp3File) {
        return res.status(400).send('MP3 file is required.');
    }

    const filename = mp3File.filename;
    const filepath = `/uploads/${filename}`;
    const albumCoverPath = albumCover ? `/uploads/${albumCover.filename}` : null;

    // Save file information to the database
    const query = 'INSERT INTO tonapsongs (filename, filepath, album_cover, uploader_name) VALUES (?, ?, ?, ?)';
    db.query(query, [filename, filepath, albumCoverPath, uploaderName], (err) => {
        if (err) {
            console.error(`Failed to insert into database: ${err}`);
            return res.status(500).send('Database error');
        }
        console.log('File information saved to database');
        res.redirect('/upload'); // Redirect to the upload page after successful upload
    });
});

// Handle song deletion
router.post('/delete', (req, res) => {
    const songId = req.body.song_id;

    // Find the file path in the database
    const query = 'SELECT filepath, album_cover FROM tonapsongs WHERE id = ?';
    db.query(query, [songId], (err, results) => {
        if (err || results.length === 0) {
            console.error(`Song not found: ${err}`);
            return res.status(404).send('Song not found');
        }

        const filepath = path.join(__dirname, '..', 'public', results[0].filepath);
        const albumCoverPath = results[0].album_cover ? path.join(__dirname, '..', 'public', results[0].album_cover) : null;

        // Delete the MP3 file and album cover from the filesystem
        fs.unlink(filepath, (err) => {
            if (err) {
                console.error(`Failed to delete file: ${err}`);
                return res.status(500).send('File deletion error');
            }

            if (albumCoverPath) {
                fs.unlink(albumCoverPath, (err) => {
                    if (err) {
                        console.error(`Failed to delete album cover: ${err}`);
                    }
                });
            }

            // Remove the song record from the database
            const deleteQuery = 'DELETE FROM tonapsongs WHERE id = ?';
            db.query(deleteQuery, [songId], (err) => {
                if (err) {
                    console.error(`Failed to delete from database: ${err}`);
                    return res.status(500).send('Database deletion error');
                }
                console.log('File and database entry deleted successfully.');
                res.redirect('/upload'); // Redirect to the upload page after deletion
            });
        });
    });
});

module.exports = router;
