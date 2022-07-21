const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    u_id:{
        type:mongoose.Schema.Types.ObjectId,
    },
    name: {
        type: String,   
        required: true
    },
    categories: {
        type: String,
        enum:['BEVERAGE','CROCKERY','FOOD'],
        default:'BEVERAGE'
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    }
});
module.exports = mongoose.model("products", ProductSchema);