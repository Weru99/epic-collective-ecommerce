const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const mpesaRoute = require("./routes/mpesaStkPush");
const cors = require("cors");


mongoose
  .connect("mongodb+srv://EuniceWeru:project001@cluster0.jinoxp4.mongodb.net/epiccollective?retryWrites=true&w=majority")
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json()); //to enable json files to be passed from postman

app.use("/public/images", express.static('public/images'));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);
app.use("/api/mpesa", mpesaRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}!`);
});
