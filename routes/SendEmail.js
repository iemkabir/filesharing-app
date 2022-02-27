require('dotenv').config()
const router = require("express").Router();
const Files = require("../databse/mydb");
const sendMail = require("./nodeMailer");
router.post("/", async (req,res)=>{
    const { uuid, from, to} = req.body;
    try{
        if(!uuid && !from && !to){
            return res.send("All fields Are required")
        }
        const user = await Files.findOne({uuid: uuid});
            user.emailTo = to;
            user.emailFrom = from;
            let response = await user.save();
            let htmlFile = require("./EmailTemplate");
            let html = htmlFile(from, to, `${process.env.APP_URL}files/share/${user.uuid}`)
            const subject = "file from TrueShare"
            sendMail({to,
                from,
                subject,
                html})
            res.status(200).send({"success":"successfully recieved"});
    }
    catch(err){
        console.log(err)
        res.send("eroor")
    }
})

module.exports = router;