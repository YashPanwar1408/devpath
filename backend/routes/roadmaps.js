const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// GET /api/roadmaps - Get all roadmaps (overview)
router.get('/', async (req, res) => {
  try {
    const roadmaps = await prisma.roadmap.findMany({
      where: {
        isActive: true
      },
      orderBy: {
        order: 'asc'
      },
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        icon: true,
        level: true,
        duration: true,
        gradient: true,
        skills: true,
        popularity: true
      }
    });

    res.json({
      categories: roadmaps
    });
  } catch (error) {
    console.error('Error fetching roadmaps:', error);
    res.status(500).json({ error: 'Failed to fetch roadmaps' });
  }
});

// GET /api/roadmaps/:slug - Get specific roadmap with all phases and steps
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    const roadmap = await prisma.roadmap.findUnique({
      where: {
        slug: slug
      },
      include: {
        phases: {
          orderBy: {
            order: 'asc'
          },
          include: {
            steps: {
              orderBy: {
                order: 'asc'
              }
            }
          }
        }
      }
    });

    if (!roadmap) {
      return res.status(404).json({ error: 'Roadmap not found' });
    }

    res.json(roadmap);
  } catch (error) {
    console.error('Error fetching roadmap:', error);
    res.status(500).json({ error: 'Failed to fetch roadmap' });
  }
});

// GET /api/roadmaps/:slug/progress - Get user progress for a roadmap
router.get('/:slug/progress', async (req, res) => {
  try {
    const { slug } = req.params;
    const userId = req.query.userId; // In production, get from auth token

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const roadmap = await prisma.roadmap.findUnique({
      where: { slug }
    });

    if (!roadmap) {
      return res.status(404).json({ error: 'Roadmap not found' });
    }

    const progress = await prisma.roadmapProgress.findMany({
      where: {
        userId: userId,
        roadmapId: roadmap.id
      },
      include: {
        step: true
      }
    });

    res.json({
      progress: progress.map(p => ({
        stepId: p.stepId,
        completed: p.completed,
        completedAt: p.completedAt,
        notes: p.notes
      }))
    });
  } catch (error) {
    console.error('Error fetching progress:', error);
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
});

// POST /api/roadmaps/:slug/progress - Update step progress
router.post('/:slug/progress', async (req, res) => {
  try {
    const { slug } = req.params;
    const { userId, stepId, completed, notes } = req.body;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const roadmap = await prisma.roadmap.findUnique({
      where: { slug }
    });

    if (!roadmap) {
      return res.status(404).json({ error: 'Roadmap not found' });
    }

    const progress = await prisma.roadmapProgress.upsert({
      where: {
        userId_stepId: {
          userId,
          stepId
        }
      },
      update: {
        completed,
        completedAt: completed ? new Date() : null,
        notes
      },
      create: {
        userId,
        roadmapId: roadmap.id,
        stepId,
        completed,
        completedAt: completed ? new Date() : null,
        notes
      }
    });

    res.json(progress);
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({ error: 'Failed to update progress' });
  }
});

module.exports = router;
