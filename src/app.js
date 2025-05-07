require('dotenv').config();
const express    = require('express');
const sequelize  = require('./config/database');

// 1. Register models so sync() sees them
require('./models/Book');

const bookRoutes = require('./routes/bookRoutes');

const app = express();
app.use(express.json());              // parse JSON bodies

// 2. Mount the Book routes
app.use('/books', bookRoutes);

// 3. Central error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || 'Something went wrong' });
});

// 4. Connect, sync, and start
sequelize.authenticate()
  .then(() => {
    console.log('✅ DB connected');
    return sequelize.sync();
  })
  .then(() => console.log('✅ Tables synced'))
  .catch(err => console.error('❌ DB error:', err));

app.listen(5000, () => console.log('🚀 Server on port 5000'));
