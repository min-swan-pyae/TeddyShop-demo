import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

function checkFileType(file, cb) {
    //  regular expression of what we want to allow
    const fileTypes = /jpg|jpeg|png/;    
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase()); //return a boolean value
    const mimetype = fileTypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    }
    else {
        return cb("Images only"); //return an error
    }
}

const upload = multer({
    storage,
})

router.post("/", upload.single('image'), (req, res) => {
   const imagePath = req.file.path.replace(/\\/g, '/'); // Replace backslashes with forward slashes
    res.send({
        message: "Image uploaded",
        image: imagePath,
    });
});

export default router;