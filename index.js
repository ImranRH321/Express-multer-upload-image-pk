 // Dependency
const express = require("express");
const multer = require("multer");
   

const port = 5000;
// // App Object
const app = express();

app.get("/", (req, res) => {
  // res.sendFile(__dirname + '/views/index.html')
  res.sendFile(`${__dirname}/views/index.html`);
});

/* Destination */
// what file upload now
// const upload = multer({ dest: __dirname + "/uploadFile" });

/*
// one file //
 app.post('/handleForm',upload.single('profile'), (req, res) => {
   console.log( req.file);
   console.log( req.body);
    res.send('uploaded post data')
}) 
*/

/* client side form under input file multiple add then file 4 added*/

/* 
  app.post("/handleForm", upload.array('profile', 4), (req, res) => {
  console.log(req.files);
  res.send("uploaded post data");
}) 
 */

// const cpUpload = upload.fields([{ name: 'profile', maxCount: 1 }, { name: 'cover', maxCount: 3 }])
/* variable declare and call cpUpload */

// app.post('/handleForm', upload.fields([{ name: 'profile', maxCount: 1 }, { name: 'cover', maxCount: 3 }]), function (req, res, next) {
// req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
//
//  console.log(req.files);
// e.g.
//  req.files['avatar'][0] -> File
//  req.files['gallery'] -> Array
//
// req.body will contain the text fields, if there were any

// })

/* just form text data--- */
// const upload = multer()
// app.post('/handleForm', upload.none(), function (req, res, next) {
//   // req.body contains the text fields
//   console.log(req.body);
//   res.send("form data upload")
// })
// /**/

/* all file and text upload now  */
/* 
app.post("/handleForm", upload.any(), function (req, res, next) {
  console.log(req.files);
  console.log(req.body);
  res.send("any file text all uploaded data");
});

*/

/* Advance file Checking ===================================== */

/*
 const upload = multer({
  dest: __dirname + "/uploadFile",
  limits: {
    fileSize: 1000000,
  },
  fileFilter: (req, file, cb) => {
    // file type name valid and check then accepts
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype==='jpeg'){
      cb(null, true)
    }
    else{
      // cb(null, false)  ---> Not simple  error 
      cb( new Error('File type is not accepted '))   //---> error
    }
  },
});

app.post("/handleForm", upload.single('profile'), function (req, res, next) {
  res.send("any file text all uploaded data");
});

*/

// Storage=========================>
const path = require('path');

  
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // cb(null, ' __dirname + "/uploadFile')
    cb(null, `${__dirname}/uploadFile`)
  },
  filename: (req, file, cb) => {
    console.log(file);
    const fileExt = path.extname(file.originalname)    //--> .jpg 
    const  filename = file.originalname.replace(fileExt, "")
               .toLowerCase()
               .split(' ')
               .join('-') + '-' + Date.now() + fileExt 
               console.log(filename); 
      cb(null, filename) 
  }
})

const upload = multer({
   storage, 
  limits: {
    fileSize: 1000000,
  },
  fileFilter: (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype==='jpeg'){
      cb(null, true)
    }
    else{
      cb( new Error('File type is not accepted '))   //---> error
    }
  },
});

app.post("/handleForm", upload.single('profile'), function (req, res, next) {
  console.log(req.file,'--------->');
  res.send("any file text all uploaded data");
});



app.listen(port, () => {
  console.log(`server is running http://Localhost:${port}`);
});















// ==================================================================================
/* 
.single(filename) -->  one file -- console--> file

.array(fieldname[, maxCount]) --> 
ফাইলের একটি অ্যারে গ্রহণ করুন, সমস্ত নাম ফিল্ডের নাম সহ। ঐচ্ছিকভাবে maxCount ফাইল আপলোড করা হলে ত্রুটি আউট. ফাইলের অ্যারে req.files এ সংরক্ষণ করা হবে।


.fields(fields) --->
ক্ষেত্র দ্বারা নির্দিষ্ট করা ফাইলগুলির একটি মিশ্রণ গ্রহণ করুন। ফাইলের অ্যারে সহ একটি বস্তু req.files এ সংরক্ষণ করা হবে।

ক্ষেত্রগুলি নাম সহ বস্তুর একটি অ্যারে এবং ঐচ্ছিকভাবে একটি maxCount হওয়া উচিত। উদাহরণ:


.none() ---> 
শুধুমাত্র টেক্সট ক্ষেত্র গ্রহণ করুন. কোনো ফাইল আপলোড করা হলে, কোড সহ ত্রুটি 

.any()   ---> all file and text upload  
তারের উপরে আসা সমস্ত ফাইল গ্রহণ করে। ফাইলের একটি অ্যারে req.files এ সংরক্ষণ করা হবে।

*/
