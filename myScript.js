const Files = require("./databse/mydb");
const fs = require('fs');
const connectDB = require("./databse/dbconnect");
     connectDB();




async function fetchAndDelete(){
    try{
        const checkDate = new Date();
        const files = await Files.find({ExpiryDate: {$lt : checkDate}});
        if(files.length){
            for(let file of files){
                fs.unlinkSync(file.path);
                await file.remove();
                console.log("file deleted");
            }
        }
    }catch(err){
        console.log("Some thing happened", err);
    }
}

fetchAndDelete().then((data)=>{
    console.log("job done")
});