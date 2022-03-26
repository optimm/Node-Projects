require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
//built in middeware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// error handler middlewares
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//extra middlewares
const helemt = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimitter = require("express-rate-limit");

//other security middlwlewares
app.set("trust proxy", 1);
app.use(
  rateLimitter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  })
);
app.use(helemt());
app.use(cors());
app.use(xss());

//authentication middleware
const authMiddleware = require("./middleware/authentication");

//db
const connectDb = require("./db/connect");

//routers
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");

//routes
app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authMiddleware, jobsRouter);

// error handler
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    console.log("data base is connected");
    app.listen(port, () => {
      console.log(`Server for jobs is running on port ${port} `);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
