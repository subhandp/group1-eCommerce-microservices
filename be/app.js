require("dotenv").config();

const express = require("express");
// untuk upload ke cloudinary
const fileUpload = require("express-fileupload");

const app = express();

const port = process.env.PORT || 3000;

const authRoute = require("./src/routes/auth");
const userRoute = require('./src/routes/user')
const productRoute = require('./src/routes/product')
// const auth = require("./middleware/AuthMiddleware");
// const taskScheduler = require("./helpers/taskScheduler");

// untuk cloudinary
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ hello: "world" });
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use('/api/v1/product', productRoute)

// taskScheduler();

app.listen(port, () => console.log("Listened on port " + port));
