require('dotenv').config()
const router = require("express").Router();
const Files = require("../databse/mydb");
const path = require("path");

router.get("/:uuid", async (req, res)=>{
 const uuid = req.params.uuid;

 try{
         const file = await Files.findOne({uuid:uuid})
 
        const fileName = `./${file.path}`;
                res.download(fileName);
                if(res.headersSent){
                   res.redirect(process.env.APP_URL);
                   console.log("done");
               }
 }catch(err){
         console.log(err);
   }
})

module.exports = router;