const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/placement';

async function fixDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Get the database instance
    const db = mongoose.connection.db;
    
    // List all indexes on the users collection
    console.log('📋 Current indexes on users collection:');
    const indexes = await db.collection('users').indexes();
    indexes.forEach(index => {
      console.log(`  - ${index.name}: ${JSON.stringify(index.key)}`);
    });

    // Check if the problematic username index exists
    const usernameIndex = indexes.find(index => 
      index.name === 'username_1' || 
      Object.keys(index.key).includes('username')
    );

    if (usernameIndex) {
      console.log('🔧 Found problematic username index, removing it...');
      await db.collection('users').dropIndex(usernameIndex.name);
      console.log('✅ Username index removed successfully');
    } else {
      console.log('✅ No problematic username index found');
    }

    // List indexes again to confirm
    console.log('📋 Updated indexes on users collection:');
    const updatedIndexes = await db.collection('users').indexes();
    updatedIndexes.forEach(index => {
      console.log(`  - ${index.name}: ${JSON.stringify(index.key)}`);
    });

    // Clean up any users with null username (if they exist)
    console.log('🧹 Cleaning up any users with null username...');
    const result = await db.collection('users').deleteMany({ username: null });
    console.log(`✅ Removed ${result.deletedCount} users with null username`);

    console.log('🎉 Database fix completed successfully!');

  } catch (error) {
    console.error('❌ Error fixing database:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

fixDatabase();
