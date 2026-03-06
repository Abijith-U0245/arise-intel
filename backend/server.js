const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const blockchain = require('./blockchain/blockchain');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* TEST ROUTE */
app.get('/', (req, res) => {
  res.send('A.R.I.S.E Backend Running');
});

/* BLOCKCHAIN API */
app.post('/predict-risk', (req, res) => {
  const { studentId, riskScore } = req.body;
  const newBlock = blockchain.addBlock({ studentId, riskScore });
  console.log('New blockchain block created:', newBlock);
  res.json({ message: 'Prediction stored on blockchain', block: newBlock });
});

/* VIEW BLOCKCHAIN */
app.get('/chain', (req, res) => {
  res.json(blockchain.getChain());
});

// A.R.I.S.E API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/hod', require('./routes/hodRoutes'));
app.use('/api/faculty', require('./routes/facultyRoutes'));
app.use('/api/student', require('./routes/studentRoutes'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'A.R.I.S.E Backend is running' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err.message);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`=================================`);
  console.log(`A.R.I.S.E Backend Server`);
  console.log(`=================================`);
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Blockchain routes available at /predict-risk and /chain`);
  console.log(`=================================`);
});