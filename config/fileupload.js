const multer = require('multer');
const path = require('path');

const uploads = path.join('uploads');

// File upload start

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploads);
    },
    filename: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname);

        const uniqueNumber = Date.now(); 

        const newFileName = `${uniqueNumber}-${file.originalname}${fileExtension}`;

        cb(null, newFileName);
    }
});

const fileUpload = multer({ storage: storage }).single('image');

module.exports = fileUpload;
