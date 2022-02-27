require('dotenv').config()
const router = require("express").Router();
const Files = require("../databse/mydb");

router.get("/:uuid", async (req, res)=>{
    try{
        const files = await Files.find({uuid : req.params.uuid});
     if(!files){
        return res.render("Download",{error:"Link is not valid anymore"})
     }

    res.render('Download', {
        uuid : files[0].uuid,
        fileName : files[0].filename,
        size: `Size: ${files[0].size}kb`,
        expiry: `Expires In ${files[0].createdAt.toDateString()}`,
        Upload: `Uploaded At ${new Date(files[0].createdAt).toDateString()}`,
        download: `${process.env.APP_URL}files/${files[0].uuid}`
         });


    }catch(error){
        console.log(error, "error found")
        res.render("Download", {error: "Ooops! Something went wrong"});
    }

});

module.exports = router;