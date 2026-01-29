const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Create temp user if not exists (for demo purposes)
async function ensureTempUser(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    // Create temp user
    await prisma.user.create({
      data: {
        id: userId,
        email: `${userId}@temp.com`,
        password: 'temp-password-hash',
        name: 'Demo User'
      }
    });
  }
}

// Toggle problem solved status
router.post('/toggle', async (req, res) => {
  try {
    const { userId, problemId, status } = req.body;

    if (!userId || !problemId) {
      return res.status(400).json({ error: 'userId and problemId required' });
    }

    // Ensure user exists
    await ensureTempUser(userId);

    // Check if problem exists first
    const problemExists = await prisma.problem.findUnique({
      where: { id: problemId },
      select: { id: true }
    });

    if (!problemExists) {
      return res.status(404).json({ error: 'Problem not found' });
    }

    const progress = await prisma.userProgress.upsert({
      where: {
        userId_problemId: {
          userId,
          problemId,
        },
      },
      update: {
        status: status || 'solved',
        lastAttempt: new Date(),
      },
      create: {
        userId,
        problemId,
        status: status || 'solved',
      },
    });

    res.json(progress);
  } catch (error) {
    console.error('Toggle status error:', error.message || error);
    res.status(500).json({ 
      error: 'Failed to toggle status',
      details: error.message 
    });
  }
});

// Toggle star
router.post('/star', async (req, res) => {
  try {
    const { userId, problemId, starred } = req.body;

    if (!userId || !problemId) {
      return res.status(400).json({ error: 'userId and problemId required' });
    }

    // Ensure user exists
    await ensureTempUser(userId);

    // Check if problem exists first
    const problemExists = await prisma.problem.findUnique({
      where: { id: problemId },
      select: { id: true }
    });

    if (!problemExists) {
      return res.status(404).json({ error: 'Problem not found' });
    }

    const progress = await prisma.userProgress.upsert({
      where: {
        userId_problemId: {
          userId,
          problemId,
        },
      },
      update: {
        starred: starred !== undefined ? starred : true,
        lastAttempt: new Date(),
      },
      create: {
        userId,
        problemId,
        status: 'unsolved',
        starred: starred !== undefined ? starred : true,
      },
    });

    res.json(progress);
  } catch (error) {
    console.error('Toggle star error:', error.message || error);
    res.status(500).json({ 
      error: 'Failed to toggle star',
      details: error.message 
    });
  }
});

// Get user progress
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const progress = await prisma.userProgress.findMany({
      where: { userId },
      include: {
        problem: {
          select: {
            id: true,
            title: true,
            slug: true,
            difficulty: true,
            pattern: true,
          },
        },
      },
    });

    res.json(progress);
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
});

// Get progress for specific problem
router.get('/:userId/:problemId', async (req, res) => {
  try {
    const { userId, problemId } = req.params;

    const progress = await prisma.userProgress.findUnique({
      where: {
        userId_problemId: {
          userId,
          problemId,
        },
      },
    });

    res.json(progress);
  } catch (error) {
    console.error('Get problem progress error:', error);
    res.status(500).json({ error: 'Failed to fetch problem progress' });
  }
});

module.exports = router;
