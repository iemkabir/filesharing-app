const router = require("express").Router();
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const Files = require("../databse/mydb");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./image");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("myfile"), (req, res) => {
  if (!req.file) {
    return res.json({ errorr: "file not found" });
  }

  let expireDate = new Date();
  expireDate.setDate(expireDate.getDate() + 7);

  const myFile = new Files({
    filename: req.file.filename,
    path: req.file.path,
    uuid: uuidv4(),
    size: req.file.size,
    ExpiryDate: expireDate
  });
  
  myFile.save().then((data)=>{
    res.json({file: `${process.env.APP_URL}files/${data.uuid}`,
       file2: `${process.env.APP_URL}files/share/${data.uuid}`});

}).catch((err)=> {
  console.log(err)
  res.json({"error": err});
});
});

module.exports = router;
