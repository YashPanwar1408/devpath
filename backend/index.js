const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const judgeRoutes = require('./routes/judge');
const interviewRoutes = require('./routes/interview');
const atsRoutes = require('./routes/ats');
const dsaRoutes = require('./routes/dsa');
const progressRoutes = require('./routes/progress');
const learnRoutes = require('./routes/learn');
const resumeRoutes = require('./routes/resume');
const roadmapsRoutes = require('./routes/roadmaps');
const cheatsheetsRoutes = require('./routes/cheatsheets');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/judge', judgeRoutes);
app.use('/api/interview', interviewRoutes);
app.use('/api/ats', atsRoutes);
app.use('/api/dsa', dsaRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/learn', learnRoutes);
app.use('/api/roadmaps', roadmapsRoutes);
app.use('/api/cheatsheets', cheatsheetsRoutes);
app.use('/api', resumeRoutes);
// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'Interview Platform API' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
