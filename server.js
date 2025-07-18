require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/product-routes');
const bookRoutes = require('./routes/book-routes');


const app = express();

//connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

//use JSON middleware
app.use(express.json());

app.use('/products', productRoutes);
app.use('/reference', bookRoutes);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});