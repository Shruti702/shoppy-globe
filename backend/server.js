import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import authRoutes from './routes/authRoutes.js';
import Product from './models/Product.js';

const app = express();
const PORT = 5000;
const MONGO_URI = "mongodb://127.0.0.1:27017/shoppyglobe";

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Data Seeding (Fetch from DummyJSON if DB is empty)
const seedDatabase = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      console.log("Seeding database from DummyJSON...");
      const response = await fetch('https://dummyjson.com/products?limit=100');
      const data = await response.json();
      
      // Map external data to our schema if necessary, or just insert
      const productsToInsert = data.products.map(p => ({
        id: p.id, // Keep original ID for consistency
        title: p.title,
        price: p.price,
        description: p.description,
        category: p.category,
        thumbnail: p.thumbnail,
        stock: p.stock
      }));
      
      await Product.insertMany(productsToInsert);
      console.log("Database seeded successfully!");
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};
seedDatabase();

// Routes
app.use('/api', authRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);

// Global Error Handler (Requirement: API Error Handling)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});