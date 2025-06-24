import { Schema } from "mongoose";

const planSchema = new Schema({
  id: {
    type: String,
    required: [true, "required: id plan: mongoose squema"],
  },
  name: {
    type: String,
    required: [true, "required: name plan: mongoose squema"],
  },
  price: {
    type: Number,
    required: [true, "required: price plan: mongoose squema"],
  },
});

export { planSchema };
