import mongoose from "mongoose";

const queueItemSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  url: {
    type:String,
    required: true
  }
},{timestamps:true});

const queueSchema = new mongoose.Schema({
  queue: {
    type: [queueItemSchema]
  }
});

const Queue = mongoose.models.Queue || mongoose.model("Queue", queueSchema);

export default Queue;