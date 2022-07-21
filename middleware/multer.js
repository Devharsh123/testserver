const multer = require('multer');

const imgStorage = multer.diskStorage({
    destination: 'images',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});


const upload=multer({
storage:imgStorage
});

module.exports=upload;