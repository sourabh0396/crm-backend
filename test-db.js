const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/crm-app';
console.log('Attempting to connect to MongoDB at:', mongoUri);

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
  family: 4
})
.then(() => {
  console.log('Connected to MongoDB successfully');
  
  // Try to create a simple schema and model
  const TestSchema = new mongoose.Schema({
    name: String
  });
  
  const Test = mongoose.model('Test', TestSchema);
  
  // Try to save a document
  return Test.create({ name: 'test' });
})
.then(() => {
  console.log('Successfully created a test document');
  process.exit(0);
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
}); 