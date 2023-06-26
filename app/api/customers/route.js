import { connectToDB } from "/utils/database";
import Customers from "/models/customers";

export const GET = async () =>{
    //Router to connect to database and get all customers.
    try {
        await connectToDB();

        const customers =  await Customers.find({}).populate('name');

        return new Response(JSON.stringify(customers), {status:200})
    } catch (error) {
        return new Response("Failed to fetch all customers", {status:500})
    }
}