const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function createSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

const patterns = [
  { name: 'Arrays', category: 'Arrays & Strings', order: 1, targetCount: 10 },
  { name: 'Strings', category: 'Arrays & Strings', order: 2, targetCount: 8 },
  { name: 'Prefix Sum', category: 'Arrays & Strings', order: 3, targetCount: 6 },
  { name: 'Two Pointers', category: 'Arrays & Strings', order: 4, targetCount: 6 },
  { name: 'Sliding Window', category: 'Arrays & Strings', order: 5, targetCount: 6 },
  { name: 'Matrix', category: 'Arrays & Strings', order: 6, targetCount: 4 },
  { name: 'Hash Tables', category: 'Hash + Bit', order: 7, targetCount: 10 },
  { name: 'Bit Manipulation', category: 'Hash + Bit', order: 8, targetCount: 5 },
  { name: 'Linked List Basics', category: 'Linked List', order: 9, targetCount: 7 },
  { name: 'Fast & Slow Pointers', category: 'Linked List', order: 10, targetCount: 4 },
  { name: 'In-place Reversal', category: 'Linked List', order: 11, targetCount: 4 },
  { name: 'Stack', category: 'Stack / Queue', order: 12, targetCount: 7 },
  { name: 'Monotonic Stack', category: 'Stack / Queue', order: 13, targetCount: 5 },
  { name: 'Monotonic Queue', category: 'Stack / Queue', order: 14, targetCount: 3 },
  { name: 'Binary Search', category: 'Searching / Sorting', order: 15, targetCount: 7 },
  { name: 'Merge / Quick / Divide', category: 'Searching / Sorting', order: 16, targetCount: 8 },
  { name: 'Tree Traversal', category: 'Trees', order: 17, targetCount: 10 },
  { name: 'BST', category: 'Trees', order: 18, targetCount: 7 },
  { name: 'Tree Hard', category: 'Trees', order: 19, targetCount: 8 },
  { name: 'Heap', category: 'Heaps', order: 20, targetCount: 6 },
  { name: 'Two Heaps', category: 'Heaps', order: 21, targetCount: 3 },
  { name: 'Top K', category: 'Heaps', order: 22, targetCount: 3 },
  { name: 'Backtracking', category: 'Backtracking', order: 23, targetCount: 12 },
  { name: 'Tries', category: 'Tries', order: 24, targetCount: 6 },
  { name: 'DFS', category: 'Graphs', order: 25, targetCount: 6 },
  { name: 'BFS', category: 'Graphs', order: 26, targetCount: 6 },
  { name: 'Topological Sort', category: 'Graphs', order: 27, targetCount: 4 },
  { name: 'Union Find', category: 'Graphs', order: 28, targetCount: 4 },
  { name: 'Cycle Detection', category: 'Graphs', order: 29, targetCount: 5 },
  { name: 'MST', category: 'Advanced Graphs', order: 30, targetCount: 4 },
  { name: 'Shortest Path', category: 'Advanced Graphs', order: 31, targetCount: 4 },
  { name: 'Max Flow', category: 'Advanced Graphs', order: 32, targetCount: 2 },
  { name: '1D DP', category: 'Dynamic Programming', order: 33, targetCount: 8 },
  { name: 'Knapsack DP', category: 'Dynamic Programming', order: 34, targetCount: 6 },
  { name: 'LIS DP', category: 'Dynamic Programming', order: 35, targetCount: 4 },
  { name: '2D DP', category: 'Dynamic Programming', order: 36, targetCount: 6 },
  { name: 'String DP', category: 'Dynamic Programming', order: 37, targetCount: 4 },
  { name: 'Tree DP', category: 'Dynamic Programming', order: 38, targetCount: 4 },
  { name: 'Bitmask / State DP', category: 'Dynamic Programming', order: 39, targetCount: 3 },
  { name: 'Greedy', category: 'Greedy + Intervals', order: 40, targetCount: 8 },
  { name: 'Intervals', category: 'Greedy + Intervals', order: 41, targetCount: 7 },
  { name: 'Maths', category: 'Maths', order: 42, targetCount: 5 },
  { name: 'Design', category: 'Design', order: 43, targetCount: 5 },
];

async function main() {
  await prisma.dSATopic.deleteMany({
    where: { slug: { startsWith: 'dsa-pattern-' } }
  });

  for (const pattern of patterns) {
    await prisma.dSATopic.create({
      data: {
        slug: `dsa-pattern-${createSlug(pattern.name)}`,
        title: pattern.name,
        category: pattern.category,
        order: pattern.order,
        targetCount: pattern.targetCount,
      }
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
