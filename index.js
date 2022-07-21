const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const router = require('./router');
const cors = require('cors');

const PORT = 8000;
const app = express();

mongoose.connect(`mongodb://localhost:27017/shopping_mart`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to mongodb');
}).catch((err) => {
    console.log(err);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

app.listen(PORT, async () => {
    console.log(`Server started at ${PORT}`);
})