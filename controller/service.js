const jwt = require('jsonwebtoken');
const md5 = require('md5');
const User = require('../model/User');
const Product = require('../model/Product');

const userRegister = async (req, res) => {
    const { name, email, phone, password } = req.body;
    const user = new User({
        name: name, email: email, phone: phone
    });
    user.password = md5(password);

    try {
        await user.save();
        res.send(user);
    }
    catch (err) {
        console.log(err);
    }
};

const userLogin = async (req, res) => {

    const { email, password } = req.body;
    const decodedpassword = md5(password);

    if (!(email && password)) {
        res.send('Fill all the required felds');
    } else {
        const response = await User.findOne({ email, password: decodedpassword });
        if (response) {
            const token = jwt.sign({ _id: response._id, name: response.name, email: response.email }, 'avgfuefgoiwgayyg34gjsdfvg');
            res.send(token);
        } else {
            res.send('Invalid credentails');
        }
    }
};

const uploadProduct = async (req, res) => {
    const { name, email, _id } = req.user;
    const response = await Product.findOne({ u_id: _id });
    if (response) {
        response.image = req.file.originalname
        await response.save();
        res.send(req.file.originalname);
    }
    else {
        res.send('No product found ');
    }
};

const createProduct = async (req, res) => {
    const { name, categories, description,price } = req.body;
    const product = new Product({
        u_id: req.user._id, name: name, categories: categories, description: description,price:price
    });

    try {
        await product.save();
        res.send(product);
    } catch (e) {
        console.log(e)
    }
};

const editProductDetails = async (req, res) => {
    const { Id } = req.params;
    const { description,price } = req.body;

    const filter = [];

    if (description) {
        filter.push({ description: description })
    }if(price){
        filter.push({price:price})
    }

    const response = await Product.findOne({ _id: Id });
    if (response) {
      const updatedResponse=  await Product.updateOne({ _id: Id }, filter[0]);
        res.send(updatedResponse);
    } else {
        res.send('invalid id');
    }

};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const response = await Product.findOne({ _id: id });

    if (response) {
        await response.remove();
        res.send('Product deleted successfully')
    }
    else {
        res.send('No product ')
    }
};

const getProducts = async (req, res) => {
    const { userId } = req.query;
    const filter = [];
    if (userId) {
        filter.push({ u_id: userId })
    }
    const response = await Product.find(filter[0]);
    res.send(response);
};

module.exports = { 
    userRegister,
     userLogin,
      createProduct,
       uploadProduct,
        getProducts,
         deleteProduct,
         editProductDetails
         };