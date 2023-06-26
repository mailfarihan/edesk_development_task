import {Schema, model, models} from "mongoose";

const customerSchema = new Schema({
    name:{
        type: String,
    },
    address:{
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    country: {
        type: String,
    },
    pincode: {
        type: String,
    }

})

const Customers = models.Customers || model("Customers", customerSchema);

export default Customers;