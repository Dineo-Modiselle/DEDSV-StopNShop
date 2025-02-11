import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
});

const Product = mongoose.model('Product', productSchema);

const sampleProducts = [
  {
    _id: '1',
    name: 'Product 1',
    price: 29.99,
    description: 'Description for product 1',
    imageUrl: 'https://saint-laurent.dam.kering.com/m/10e560d061126eff/eCom-813942Y2J022104_A.jpg',
  },
  {
    _id: '2',
    name: 'Product 2',
    price: 49.99,
    description: 'Description for product 2',
    imageUrl: 'https://saint-laurent.dam.kering.com/m/2346d8c3a140d507/Medium2-817949Y2L822630_A.jpg',
  },
  {
    _id: '3',
    name: 'Product 3',
    price: 19.99,
    description: 'Description for product 3',
    imageUrl: 'https://saint-laurent.dam.kering.com/m/4441f7a6edc7962e/Medium2-821895Y405W7557_A.jpg',
  },
  {
    _id: '4',
    name: 'Product 4',
    price: 39.99,
    description: 'Description for product 4',
    imageUrl: 'https://saint-laurent.dam.kering.com/m/4441f7a6edc7962e/Medium2-821895Y405W7557_A.jpg',
  },
  {
    _id: '5',
    name: 'Product 5',
    price: 59.99,
    description: 'Description for product 5',
    imageUrl: 'https://saint-laurent.dam.kering.com/m/4441f7a6edc7962e/Medium2-821895Y405W7557_A.jpg',
  },
  {
    _id: '6',
    name: 'Product 6',
    price: 79.99,
    description: 'Description for product 6',
    imageUrl: 'https://saint-laurent.dam.kering.com/m/4441f7a6edc7962e/Medium2-821895Y405W7557_A.jpg',
  },
];

export { Product, sampleProducts };
