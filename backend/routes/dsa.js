const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Get sidebar data (topics + lessons for navigation)
router.get('/sidebar', async (req, res) => {
  try {
    const topics = await prisma.dSATopic.findMany({
      orderBy: { order: 'asc' },
      include: {
        lessons: {
          select: {
            id: true,
            slug: true,
            title: true,
            difficulty: true,
            order: true,
          },
          orderBy: { order: 'asc' },
        },
      },
    });
    res.json(topics);
  } catch (error) {
    console.error('Error fetching sidebar:', error);
    res.status(500).json({ error: 'Failed to fetch sidebar data' });
  }
});

// Get lesson by slug with prev/next navigation
router.get('/lesson/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    
    // Fetch current lesson
    const lesson = await prisma.dSALesson.findUnique({
      where: { slug },
      include: {
        topic: {
          select: {
            id: true,
            slug: true,
            title: true,
          },
        },
      },
    });
    
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }
    
    // Fetch all lessons to determine prev/next
    const allLessons = await prisma.dSALesson.findMany({
      orderBy: [
        { topic: { order: 'asc' } },
        { order: 'asc' },
      ],
      select: {
        id: true,
        slug: true,
        title: true,
        order: true,
        topic: {
          select: {
            order: true,
          },
        },
      },
    });
    
    // Find current index and determine prev/next
    const currentIndex = allLessons.findIndex(l => l.id === lesson.id);
    const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
    const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
    
    res.json({
      lesson: {
        id: lesson.id,
        slug: lesson.slug,
        title: lesson.title,
        content: lesson.content,
        difficulty: lesson.difficulty,
        order: lesson.order,
        topic: lesson.topic,
      },
      navigation: {
        prev: prevLesson ? { slug: prevLesson.slug, title: prevLesson.title } : null,
        next: nextLesson ? { slug: nextLesson.slug, title: nextLesson.title } : null,
      },
    });
  } catch (error) {
    console.error('Error fetching lesson:', error);
    res.status(500).json({ error: 'Failed to fetch lesson' });
  }
});

// Get single lesson by ID
router.get('/lessons/:id', async (req, res) => {
  try {
    const lesson = await prisma.dSALesson.findUnique({
      where: { id: req.params.id },
      include: {
        topic: {
          select: {
            slug: true,
            title: true,
          },
        },
      },
    });
    
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }
    
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch lesson' });
  }
});

// Get all lessons for a topic
router.get('/topics/:slug/lessons', async (req, res) => {
  try {
    const topic = await prisma.dSATopic.findUnique({
      where: { slug: req.params.slug },
    });
    
    if (!topic) {
      return res.status(404).json({ error: 'Topic not found' });
    }
    
    const lessons = await prisma.dSALesson.findMany({
      where: { topicId: topic.id },
      orderBy: { order: 'asc' },
    });
    
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch lessons' });
  }
});

// Get problems with filters
router.get('/problems', async (req, res) => {
  try {
    const { sheet, difficulty, pattern, search, status, userId } = req.query;
    
    // Build where clause
    const where = {};
    
    // Sheet filter - check if problem's sheets array contains the requested sheet
    if (sheet) {
      where.sheets = {
        has: sheet
      };
    }
    
    if (difficulty && difficulty !== 'All') {
      where.difficulty = difficulty;
    }
    
    if (pattern && pattern !== 'All') {
      where.pattern = pattern;
    }
    
    if (search) {
      where.title = {
        contains: search,
        mode: 'insensitive',
      };
    }
    
    // Fetch problems
    const problems = await prisma.problem.findMany({
      where,
      orderBy: { order: 'asc' },
      select: {
        id: true,
        title: true,
        slug: true,
        difficulty: true,
        pattern: true,
        sheets: true,
        order: true,
        progress: userId ? {
          where: { userId },
          select: {
            status: true,
            starred: true,
            lastAttempt: true,
          },
        } : false,
      },
    });
    
    // Filter by status if requested
    let filteredProblems = problems;
    if (status && status !== 'All' && userId) {
      if (status === 'Solved') {
        filteredProblems = problems.filter(p => p.progress && p.progress.length > 0 && p.progress[0].status === 'solved');
      } else if (status === 'Unsolved') {
        filteredProblems = problems.filter(p => !p.progress || p.progress.length === 0 || p.progress[0].status !== 'solved');
      }
    }
    
    // Transform progress to simpler format
    const transformedProblems = filteredProblems.map(p => ({
      ...p,
      progress: p.progress && p.progress.length > 0 ? p.progress[0] : null,
    }));
    
    res.json(transformedProblems);
  } catch (error) {
    console.error('Error fetching problems:', error);
    res.status(500).json({ error: 'Failed to fetch problems' });
  }
});

// Get single problem by slug
router.get('/problems/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const { userId } = req.query;
    
    const problem = await prisma.problem.findUnique({
      where: { slug },
      include: userId ? {
        progress: {
          where: { userId },
        },
      } : undefined,
    });
    
    if (!problem) {
      return res.status(404).json({ error: 'Problem not found' });
    }
    
    res.json({
      ...problem,
      progress: problem.progress && problem.progress.length > 0 ? problem.progress[0] : null,
    });
  } catch (error) {
    console.error('Error fetching problem:', error);
    res.status(500).json({ error: 'Failed to fetch problem' });
  }
});

// Get DSA patterns with metadata
router.get('/patterns', async (req, res) => {
  try {
    const patterns = await prisma.dSATopic.findMany({
      where: {
        slug: {
          startsWith: 'dsa-pattern-'
        }
      },
      orderBy: { order: 'asc' },
      select: {
        id: true,
        slug: true,
        title: true,
        category: true,
        order: true,
        targetCount: true,
      },
    });
    
    res.json(patterns);
  } catch (error) {
    console.error('Error fetching patterns:', error);
    res.status(500).json({ error: 'Failed to fetch patterns' });
  }
});

// Update problem progress
router.post('/problems/:slug/progress', async (req, res) => {
  try {
    const { slug } = req.params;
    const { userId, status } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }
    
    const problem = await prisma.problem.findUnique({
      where: { slug },
    });
    
    if (!problem) {
      return res.status(404).json({ error: 'Problem not found' });
    }
    
    const progress = await prisma.userProgress.upsert({
      where: {
        userId_problemId: {
          userId,
          problemId: problem.id,
        },
      },
      update: {
        status,
        lastAttempt: new Date(),
      },
      create: {
        userId,
        problemId: problem.id,
        status,
      },
    });
    
    res.json(progress);
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({ error: 'Failed to update progress' });
  }
});

// Get problem by slug for solution view
router.get('/problem/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    
    const problem = await prisma.problem.findUnique({
      where: { slug },
      select: {
        id: true,
        title: true,
        slug: true,
        difficulty: true,
        description: true,
        solutions: true,
      },
    });
    
    if (!problem) {
      return res.status(404).json({ error: 'Problem not found' });
    }
    
    res.json(problem);
  } catch (error) {
    console.error('Error fetching problem solution:', error);
    res.status(500).json({ error: 'Failed to fetch problem solution' });
  }
});

module.exports = router;
