const mongoose = require('mongoose');

const mongoURI = "mongodb://127.0.0.1:27017/PointOfSale"


async function getconnection(){
    await mongoose.connect(mongoURI).then(
        ()=>{
            console.log(`connected to DB `)
        }
    ).catch(
        (err)=>{
            console.log(err)

        }
    )
}
module.exports=getconnection;