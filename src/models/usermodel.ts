import { model, Schema } from "mongoose";

const userSchema = new Schema({
  name: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: "user",
    }
});


export default model("Users", userSchema);