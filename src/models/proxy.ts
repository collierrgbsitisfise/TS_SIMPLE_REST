
import * as mongoose from "mongoose";



const  proxySchema = new mongoose.Schema({
  time: {
    type: String,
    default: new Date(),
  },
  ip: {
    type: String,
    required: true,
  },
  port: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const Proxy = mongoose.model('proxy', proxySchema);

export default Proxy;
