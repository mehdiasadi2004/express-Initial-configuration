import mongoose, { model, Schema } from "mongoose";

const productsSchema = new Schema({
  title: String,
    description: String,
    price: Number,
    createAt:{
      type: Date,
      default: Date.now,
    },
    updateAt:{
      type: Date,
      default: Date.now,
    },
    tags:{
      type: [String],
      default: [],
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    }
});


export default model("Products", productsSchema);