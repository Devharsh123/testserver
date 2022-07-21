const { userRegister, userLogin,createProduct,uploadProduct,getProducts,deleteProduct } = require('./controller/service');
const auth = require('./middleware/authentication');
const upload =require('./middleware/multer');
const router = require('express').Router();
//user
router.post("/register", userRegister);
router.post("/login", userLogin);

//product
router.post("/upload",auth,upload.single('image'),uploadProduct);
router.post("/create",auth,createProduct);
router.delete("/delete/:Id",auth,deleteProduct);
router.get("/getProducts",getProducts);

module.exports = router;