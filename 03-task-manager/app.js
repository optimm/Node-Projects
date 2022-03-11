//database
const express = require("express");
const app = express();
const task = require("./routes/tasks");
const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found");
const erroHandlerMiddleware = require("./middleware/error-handler");
require("dotenv").config();
const port = process.env.PORT || 5000; // port

//* middleware
app.use(express.json());
// *static files
app.use(express.static(__dirname + "/public"));

//* routes
app.get("/hello", (req, res) => res.send("Hello from task manager"));
app.use("/api/v1/tasks", task);
//* not found route
app.use(notFound);
app.use(erroHandlerMiddleware);

// middleware tests
// ? agar kisi route se call karunga next to jisme error parameter hoga uske paas hi jaega or dono ke paas hua to agar pehle me call kardia next to next pe or agar response bhej dia to first ka hi response chala jaega
// app.use((req, res, next) => {
//   console.log("hello error");
//   next(err);
// });
// app.use((err, req, res, next) => {
//   console.log("hello error 2");
//   res.status(404).json({ err: err.message });
// });

// connecting database
const database = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("data base connected..");
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`)
    );
  } catch (error) {
    console.log(error);
  }
};

database();
