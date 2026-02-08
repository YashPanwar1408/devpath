const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// ============================================================================
// GET /api/cheatsheets - Get all categories with cheatsheet counts
// ============================================================================
router.get('/', async (req, res) => {
  try {
    const categories = await prisma.cheatsheetCategory.findMany({
      orderBy: { order: 'asc' },
      include: {
        _count: {
          select: { cheatsheets: true }
        }
      }
    });

    const categoriesWithCount = categories.map(cat => ({
      id: cat.id,
      slug: cat.slug,
      title: cat.title,
      description: cat.description,
      icon: cat.icon,
      color: cat.color,
      order: cat.order,
      cheatsheetCount: cat._count.cheatsheets
    }));

    res.json(categoriesWithCount);
  } catch (error) {
    console.error('Error fetching cheatsheet categories:', error);
    res.status(500).json({ error: 'Failed to fetch cheatsheet categories' });
  }
});

// ============================================================================
// GET /api/cheatsheets/:categorySlug - Get category with all cheatsheets list
// ============================================================================
router.get('/:categorySlug', async (req, res) => {
  try {
    const { categorySlug } = req.params;

    const category = await prisma.cheatsheetCategory.findUnique({
      where: { slug: categorySlug },
      include: {
        cheatsheets: {
          select: {
            id: true,
            slug: true,
            title: true,
            subtitle: true,
            description: true,
            icon: true,
            difficulty: true,
            tags: true,
            popularity: true
          },
          orderBy: { popularity: 'desc' }
        }
      }
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    console.error('Error fetching cheatsheets for category:', error);
    res.status(500).json({ error: 'Failed to fetch cheatsheets' });
  }
});

// ============================================================================
// GET /api/cheatsheets/:categorySlug/:cheatsheetSlug - Get full cheatsheet
// ============================================================================
router.get('/:categorySlug/:cheatsheetSlug', async (req, res) => {
  try {
    const { categorySlug, cheatsheetSlug } = req.params;

    // First, find the category
    const category = await prisma.cheatsheetCategory.findUnique({
      where: { slug: categorySlug }
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Then find the cheatsheet
    const cheatsheet = await prisma.cheatsheet.findFirst({
      where: {
        slug: cheatsheetSlug,
        categoryId: category.id
      },
      include: {
        category: {
          select: {
            slug: true,
            title: true,
            icon: true,
            color: true
          }
        }
      }
    });

    if (!cheatsheet) {
      return res.status(404).json({ error: 'Cheatsheet not found' });
    }

    // Increment popularity (view count)
    await prisma.cheatsheet.update({
      where: { id: cheatsheet.id },
      data: { popularity: cheatsheet.popularity + 1 }
    });

    res.json(cheatsheet);
  } catch (error) {
    console.error('Error fetching cheatsheet:', error);
    res.status(500).json({ error: 'Failed to fetch cheatsheet' });
  }
});

// ============================================================================
// GET /api/cheatsheets/search?q=query - Search cheatsheets
// ============================================================================
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim().length < 2) {
      return res.status(400).json({ error: 'Search query must be at least 2 characters' });
    }

    const searchTerm = q.trim().toLowerCase();

    const results = await prisma.cheatsheet.findMany({
      where: {
        OR: [
          { title: { contains: searchTerm, mode: 'insensitive' } },
          { subtitle: { contains: searchTerm, mode: 'insensitive' } },
          { description: { contains: searchTerm, mode: 'insensitive' } },
          { tags: { has: searchTerm } }
        ]
      },
      include: {
        category: {
          select: {
            slug: true,
            title: true,
            icon: true,
            color: true
          }
        }
      },
      orderBy: { popularity: 'desc' },
      take: 20
    });

    res.json(results);
  } catch (error) {
    console.error('Error searching cheatsheets:', error);
    res.status(500).json({ error: 'Failed to search cheatsheets' });
  }
});

// ============================================================================
// GET /api/cheatsheets/popular - Get most popular cheatsheets
// ============================================================================
router.get('/popular', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6;

    const popular = await prisma.cheatsheet.findMany({
      orderBy: { popularity: 'desc' },
      take: limit,
      include: {
        category: {
          select: {
            slug: true,
            title: true,
            icon: true,
            color: true
          }
        }
      }
    });

    res.json(popular);
  } catch (error) {
    console.error('Error fetching popular cheatsheets:', error);
    res.status(500).json({ error: 'Failed to fetch popular cheatsheets' });
  }
});

// ============================================================================
// GET /api/cheatsheets/difficulty/:level - Get cheatsheets by difficulty
// ============================================================================
router.get('/difficulty/:level', async (req, res) => {
  try {
    const { level } = req.params;
    const validLevels = ['Beginner', 'Intermediate', 'Advanced'];

    if (!validLevels.includes(level)) {
      return res.status(400).json({ error: 'Invalid difficulty level' });
    }

    const cheatsheets = await prisma.cheatsheet.findMany({
      where: { difficulty: level },
      include: {
        category: {
          select: {
            slug: true,
            title: true,
            icon: true,
            color: true
          }
        }
      },
      orderBy: { popularity: 'desc' }
    });

    res.json(cheatsheets);
  } catch (error) {
    console.error('Error fetching cheatsheets by difficulty:', error);
    res.status(500).json({ error: 'Failed to fetch cheatsheets' });
  }
});

module.exports = router;
