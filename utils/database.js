import mongoose from "mongoose";

let isConnected = false; //track the connection status

//Util function to connect to database with defined dbName
export const connectToDB = async () =>{
    mongoose.set('strictQuery', true)
    if(isConnected){
        console.log('MongoDB is already connected')
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "edesk",
            useUnifiedTopology: true,
        })
        isConnected = true;

        console.log('MongoDB connected')
    } catch (error) {
        console.log(error)
    }
}