const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Get all domains (e.g., Full Stack Development)
router.get('/domains', async (req, res) => {
  try {
    const domains = await prisma.learnDomain.findMany({
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        slug: true,
        title: true,
      },
    });
    res.json(domains);
  } catch (error) {
    console.error('Error fetching domains:', error);
    res.status(500).json({ error: 'Failed to fetch domains' });
  }
});

// Get sidebar data for a specific domain (categories + topics for navigation)
router.get('/:domainSlug/sidebar', async (req, res) => {
  try {
    const { domainSlug } = req.params;
    
    const domain = await prisma.learnDomain.findUnique({
      where: { slug: domainSlug },
      include: {
        categories: {
          orderBy: { order: 'asc' },
          select: {
            id: true,
            title: true,
            order: true,
            topics: {
              select: {
                id: true,
                slug: true,
                title: true,
                order: true,
              },
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    });
    
    if (!domain) {
      return res.status(404).json({ error: 'Domain not found' });
    }
    
    res.json(domain);
  } catch (error) {
    console.error('Error fetching sidebar:', error);
    res.status(500).json({ error: 'Failed to fetch sidebar data' });
  }
});

// Get topic by slug with prev/next navigation
router.get('/:domainSlug/topic/:slug', async (req, res) => {
  try {
    const { domainSlug, slug } = req.params;
    
    // Fetch current topic
    const topic = await prisma.learnTopic.findUnique({
      where: { slug },
      include: {
        category: {
          select: {
            id: true,
            title: true,
            order: true,
          },
        },
      },
    });
    
    if (!topic) {
      return res.status(404).json({ error: 'Topic not found' });
    }
    
    // Fetch all topics in the domain to determine prev/next
    const domain = await prisma.learnDomain.findUnique({
      where: { slug: domainSlug },
      include: {
        categories: {
          orderBy: { order: 'asc' },
          include: {
            topics: {
              orderBy: { order: 'asc' },
              select: {
                id: true,
                slug: true,
                title: true,
                order: true,
              },
            },
          },
        },
      },
    });
    
    if (!domain) {
      return res.status(404).json({ error: 'Domain not found' });
    }
    
    // Flatten all topics across categories
    const allTopics = domain.categories.flatMap(cat => cat.topics);
    
    // Find current index and determine prev/next
    const currentIndex = allTopics.findIndex(t => t.id === topic.id);
    const prevTopic = currentIndex > 0 ? allTopics[currentIndex - 1] : null;
    const nextTopic = currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null;
    
    res.json({
      topic: {
        id: topic.id,
        slug: topic.slug,
        title: topic.title,
        content: topic.content,
        order: topic.order,
        category: topic.category,
      },
      navigation: {
        prev: prevTopic ? { slug: prevTopic.slug, title: prevTopic.title } : null,
        next: nextTopic ? { slug: nextTopic.slug, title: nextTopic.title } : null,
      },
    });
  } catch (error) {
    console.error('Error fetching topic:', error);
    res.status(500).json({ error: 'Failed to fetch topic' });
  }
});

// Get all topics in a category
router.get('/:domainSlug/category/:categoryId/topics', async (req, res) => {
  try {
    const { categoryId } = req.params;
    
    const topics = await prisma.learnTopic.findMany({
      where: { categoryId },
      orderBy: { order: 'asc' },
      select: {
        id: true,
        slug: true,
        title: true,
        order: true,
      },
    });
    
    res.json(topics);
  } catch (error) {
    console.error('Error fetching category topics:', error);
    res.status(500).json({ error: 'Failed to fetch topics' });
  }
});

module.exports = router;
