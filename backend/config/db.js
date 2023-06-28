const mongoose=require("mongoose");

const connectDB=async()=>{
    try {
            const conn=await mongoose.connect("mongodb+srv://anudeeps352:Bmw528iestate@cluster0.hrexgow.mongodb.net/?retryWrites=true&w=majority",{
                useNewUrlParser:true,
                useUnifiedTopology:true,
                useFindAndModify: true,
            });

            console.log(`MONGODB connected:${conn.connection.host}`);
    } catch (error) {
        console.log(`Error is:${error.message}`);
        process.exit();
    }
};

module.exports = connectDB;
