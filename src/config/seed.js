const mongoose = require('mongoose');
const User = require('../models/user.model');
const Lead = require('../models/lead.model');
const dotenv = require('dotenv');

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/crm-app');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Lead.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    });
    console.log('Created admin user');

    // Create telecaller users
    const telecallers = await User.create([
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'telecaller123',
        role: 'telecaller'
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'telecaller123',
        role: 'telecaller'
      }
    ]);
    console.log('Created telecaller users');

    // Create test leads
    const leads = await Lead.create([
      {
        name: 'Customer One',
        email: 'customer1@example.com',
        phoneNumber: '1234567890',
        address: '123 Main St, City One',
        status: 'connected',
        callResponse: 'interested',
        assignedTo: telecallers[0]._id,
        lastCallDate: new Date()
      },
      {
        name: 'Customer Two',
        email: 'customer2@example.com',
        phoneNumber: '0987654321',
        address: '456 Oak St, City Two',
        status: 'not_connected',
        callResponse: 'busy',
        assignedTo: telecallers[0]._id,
        lastCallDate: new Date()
      },
      {
        name: 'Customer Three',
        email: 'customer3@example.com',
        phoneNumber: '5555555555',
        address: '789 Pine St, City Three',
        status: 'pending',
        assignedTo: telecallers[1]._id
      },
      {
        name: 'Customer Four',
        email: 'customer4@example.com',
        phoneNumber: '4444444444',
        address: '321 Elm St, City Four',
        status: 'connected',
        callResponse: 'callback',
        assignedTo: telecallers[1]._id,
        lastCallDate: new Date()
      }
    ]);
    console.log('Created test leads');

    console.log('\nTest Data Summary:');
    console.log('------------------');
    console.log('Admin User:', admin.email);
    console.log('Telecallers:', telecallers.length);
    console.log('Leads:', leads.length);
    console.log('\nYou can now login with:');
    console.log('Admin:', { email: 'admin@example.com', password: 'admin123' });
    console.log('Telecaller:', { email: 'john@example.com', password: 'telecaller123' });

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
};

// Run the seed function
seedDatabase(); 