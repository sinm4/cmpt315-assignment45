import mongoose from "mongoose";

/**
 * TODO: Data validation:
 * TODO: - Include input validation for create and update operations.
 * TODO: - Check for missing or incorrect data and respond with appropriate messages.
 */

const MonsterSchema = new mongoose.Schema({
  id: { type: Number, required: true }, // auto-increment based on last indexed monster id
  name: { type: String, required: true },
  username: { type: String, required: false },
  email: { type: String, required: false },
  address: {
    street: { type: String, required: false },
    suite: { type: String, required: false },
    city: { type: String, required: false },
    zipcode: { type: String, required: false },
    geo: {
      lat: { type: String, required: false },
      lng: { type: String, required: false },
    },
  },
  phone: { type: String, required: false },
  website: { type: String, required: false },
  company: {
    name: { type: String, required: false },
    catchPhrase: { type: String, required: false },
    bs: { type: String, required: false },
  },
  image_url: { type: String, required: true }, // concatenates id to url
});

const Monster = mongoose.model("monsters", MonsterSchema);

export default Monster;
