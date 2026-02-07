import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: { type: Number, unique: true }, // External ID reference
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: String,
  thumbnail: String,
  stock: { type: Number, default: 0 }
});

export default mongoose.model('Product', productSchema);