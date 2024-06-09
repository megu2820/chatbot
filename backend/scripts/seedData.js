const pool = require('../db'); 

const seedData = async () => {
  try {
    console.log('Truncating tables...');
    await pool.query('TRUNCATE TABLE messages, conversations, users RESTART IDENTITY CASCADE;');
    console.log('Tables truncated.');

    console.log('Inserting into users table...');
    await pool.query(`
      INSERT INTO users (user_id, first_name, last_name, email) 
      VALUES (12345, 'John', 'Doe', 'john.doe@example.com');
    `);
    console.log('Users table seeded.');

    console.log('Inserting into conversations table...');
    await pool.query(`
      INSERT INTO conversations (conversation_id, user_id, case_id, product_id, product_name, status)
      VALUES (54321, 12345, 'C102345', 'P54321', 'Widget Pro', 'Open');
    `);
    console.log('Conversations table seeded.');

    console.log('Inserting into messages table...');
    await pool.query(`
    INSERT INTO messages (direction, content, sequence_number)
    VALUES
    ('out', 'Hello John, have you tried checking the memory allocated for your site?', 1),
    ('out', 'Thanks for confirming. Can you please check if there are any error messages in your browser console?', 2),
    ('out', 'Alright. Let''s try resetting the Widget Pro. Can you please go to the plugin settings and click on ''Reset to Default''?', 3)
    `);
    console.log('Messages table seeded.');

    console.log('Data seeded successfully');
  } catch (err) {
    console.error('Error seeding data', err);
  } finally {
    pool.end();
  }
};

seedData();
