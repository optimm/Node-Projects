const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();
// for reading normal data//
// const upload = multer();
// app.use(upload.array());

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/uploads"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//? Post requests with fetch and axios
// using multer.array to parse the form data
app.post("/api", multer().array(), function (req, res) {
  const { name } = req.body; // with multer formdata can be acessed and
  // req.body.name for json type
  //   const name = req.body.name;
  console.log(name);
  res.status(201).json({ name: name, sucess: true });
});

//-----------------------------------------------------------------------------------------
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Uploads is the Upload_folder_name
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
// defining max size
const maxSize = 1 * 1000 * 1000;

var upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

// ? file upload to server
app.post("/uploadd", function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      res.send(err);
    } else {
      let fileinfo = req.file;
      let title = req.body.title;
      console.log(fileinfo);
      res.status(201).json(fileinfo);
    }
  });
});

//ipv4 address of wifi added so u can connect same wifi in phone and then run website on ipv4:5000 and acess from phone too
// app.listen(5000, "192.168.1.45", () => {
//   console.log("server running by ayush on port 5000..");
// });

app.listen(5000, () => {
  console.log("server running by ayush on port 5000..");
});
