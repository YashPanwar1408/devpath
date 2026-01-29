const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Complete DSA Topics and Lessons Structure
const topicsWithLessons = [
  {
    title: 'DSA Tutorial',
    lessons: [
      'DSA HOME',
      'DSA Intro',
      'DSA Simple Algorithm'
    ]
  },
  {
    title: 'Arrays',
    lessons: [
      'DSA Arrays',
      'DSA Bubble Sort',
      'DSA Selection Sort',
      'DSA Insertion Sort',
      'DSA Quick Sort',
      'DSA Counting Sort',
      'DSA Radix Sort',
      'DSA Merge Sort',
      'DSA Linear Search',
      'DSA Binary Search'
    ]
  },
  {
    title: 'Linked Lists',
    lessons: [
      'DSA Linked Lists',
      'DSA Linked Lists in Memory',
      'DSA Linked Lists Types',
      'Linked Lists Operations'
    ]
  },
  {
    title: 'Stacks & Queues',
    lessons: [
      'DSA Stacks',
      'DSA Queues'
    ]
  },
  {
    title: 'Hash Tables',
    lessons: [
      'DSA Hash Tables',
      'DSA Hash Sets',
      'DSA Hash Maps'
    ]
  },
  {
    title: 'Trees',
    lessons: [
      'DSA Trees',
      'DSA Binary Trees',
      'DSA Pre-order Traversal',
      'DSA In-order Traversal',
      'DSA Post-order Traversal',
      'DSA Array Implementation',
      'DSA Binary Search Trees',
      'DSA AVL Trees'
    ]
  },
  {
    title: 'Graphs',
    lessons: [
      'DSA Graphs',
      'Graphs Implementation',
      'DSA Graphs Traversal',
      'DSA Cycle Detection'
    ]
  },
  {
    title: 'Shortest Path',
    lessons: [
      'DSA Shortest Path',
      'DSA Dijkstra\'s',
      'DSA Bellman-Ford'
    ]
  },
  {
    title: 'Minimum Spanning Tree',
    lessons: [
      'Minimum Spanning Tree',
      'DSA Prim\'s',
      'DSA Kruskal\'s'
    ]
  },
  {
    title: 'Maximum Flow',
    lessons: [
      'DSA Maximum Flow',
      'DSA Ford-Fulkerson',
      'DSA Edmonds-Karp'
    ]
  },
  {
    title: 'Time Complexity',
    lessons: [
      'Introduction',
      'Bubble Sort',
      'Selection Sort',
      'Insertion Sort',
      'Quick Sort',
      'Counting Sort',
      'Radix Sort',
      'Merge Sort',
      'Linear Search',
      'Binary Search'
    ]
  },
  {
    title: 'DSA Reference',
    lessons: [
      'DSA Euclidean Algorithm',
      'DSA Huffman Coding',
      'DSA The Traveling Salesman',
      'DSA 0/1 Knapsack',
      'DSA Memoization',
      'DSA Tabulation',
      'DSA Dynamic Programming',
      'DSA Greedy Algorithms'
    ]
  }
];

// Lesson content mapping
function getLessonContent(slug) {
  const content = {
    'dsa-home': `# DSA Home

## What is Data Structures and Algorithms (DSA)?

**Data Structures and Algorithms** form the backbone of computer science and software development. Think of them as the building blocks and blueprints for solving computational problems efficiently.

**Data Structures** are specialized formats for organizing, storing, and managing data in a computer's memory. Just like you organize books on a shelf by category or alphabetically, data structures help organize information in ways that make it easy to access and modify. Examples include arrays, linked lists, trees, and hash tables.

**Algorithms** are step-by-step procedures or formulas for solving specific problems. They're like cooking recipes—a sequence of instructions that, when followed correctly, produce the desired result. Algorithms define how to manipulate data structures to perform tasks like searching, sorting, or finding the shortest path.

The key difference: **Data structures tell you how to store data**, while **algorithms tell you how to process that data**.

## Why DSA is Important

### For Problem Solving
DSA provides you with a toolkit of proven techniques to break down complex problems into manageable steps. Instead of reinventing the wheel, you learn time-tested patterns that work across different scenarios.

### For Technical Interviews
Major tech companies like Google, Amazon, Microsoft, and Facebook heavily focus on DSA during interviews. They use DSA questions to evaluate your:
- Logical thinking ability
- Code optimization skills
- Understanding of trade-offs between time and space complexity

### For Writing Optimized Code
Choosing the right data structure and algorithm can mean the difference between an application that runs in seconds versus one that takes hours. Understanding DSA helps you write code that scales efficiently with increasing data size.

### Real-World Applications
- **Google Maps**: Uses graph algorithms (Dijkstra's, A*) to find the shortest route between locations
- **Search Engines**: Employ hash tables and tries for lightning-fast keyword searches
- **Social Media**: Leverage graph structures to suggest friends and display news feeds
- **E-commerce**: Use sorting algorithms to rank products by price, rating, or relevance
- **Operating Systems**: Implement queue and stack structures for process scheduling and memory management

## What You Will Learn in This Tutorial

This comprehensive tutorial covers all essential DSA topics needed for interviews and real-world development:

**Arrays**: Master the fundamental data structure for storing sequential elements. Learn sorting techniques like bubble sort, merge sort, and quick sort. Understand searching algorithms including linear and binary search.

**Linked Lists**: Discover dynamic data structures that efficiently handle insertions and deletions. Explore singly, doubly, and circular linked lists.

**Stacks & Queues**: Learn LIFO (Last In First Out) and FIFO (First In First Out) structures used in function calls, browser history, and task scheduling.

**Hash Tables**: Understand how hash maps and hash sets provide O(1) average-case lookup time for lightning-fast data retrieval.

**Trees**: Study hierarchical structures including binary trees, binary search trees, and AVL trees. Master traversal techniques (inorder, preorder, postorder).

**Graphs**: Explore complex networks and relationships. Learn traversal algorithms (BFS, DFS), shortest path algorithms (Dijkstra's, Bellman-Ford), and minimum spanning trees (Prim's, Kruskal's).

**Sorting Algorithms**: Compare different sorting techniques and understand when to use each based on time complexity, space complexity, and stability requirements.

**Searching Algorithms**: Master efficient search techniques for both sorted and unsorted data.

**Dynamic Programming**: Learn optimization techniques for solving complex problems by breaking them into simpler subproblems and storing results to avoid redundant calculations.

## Who Should Learn DSA?

**Computer Science Students**: DSA forms the core of your curriculum. Mastering these concepts will help you excel in academics and build a strong foundation for your career.

**Interview Candidates**: Whether you're a fresh graduate or experienced developer, DSA proficiency is crucial for cracking technical interviews at top tech companies.

**Software Developers**: Enhance your problem-solving skills and write more efficient, scalable code. Understanding DSA helps you make better architectural decisions.

**Competitive Programmers**: DSA knowledge is essential for participating in coding competitions on platforms like Codeforces, LeetCode, and HackerRank.

**Career Switchers**: If you're transitioning into software development, DSA will help you think like a programmer and solve problems systematically.

## Prerequisites

Before diving into this tutorial, you should have:

**Basic Programming Knowledge**: Familiarity with at least one programming language (Python, Java, C++, or JavaScript). You should understand:
- Variables and data types
- Control structures (if-else, loops)
- Functions or methods
- Basic input/output operations

\`\`\`python
# Example: Basic programming concepts you should know
def find_sum(numbers):
    total = 0
    for num in numbers:
        total += num
    return total

result = find_sum([1, 2, 3, 4, 5])
print(result)  # Output: 15
\`\`\`

**Logical Thinking**: The ability to break problems into smaller steps and think through solutions systematically.

**No Advanced Math Required**: While some algorithms use mathematical concepts, we'll explain them in simple terms. You don't need calculus or advanced mathematics—basic arithmetic and logic are sufficient.

## How to Use This Tutorial

**Navigate Using the Sidebar**: The left sidebar contains all topics organized in a logical learning sequence. Start from the top and work your way down, or jump to specific topics you want to review.

**Learn Mode**: Each lesson includes:
- Clear explanations with real-world analogies
- Visual diagrams and examples
- Code implementations with line-by-line explanations
- Time and space complexity analysis
- Common use cases and applications

**Search Functionality**: Use the search bar in the sidebar to quickly find specific topics or lessons.

**Sequential Learning Path**: Topics are arranged from fundamental to advanced. We recommend following the order if you're new to DSA:
1. Start with Arrays and basic sorting/searching
2. Move to Linked Lists, Stacks, and Queues
3. Progress to Trees and Graphs
4. Conclude with advanced topics like Dynamic Programming

**Practice Regularly**: Understanding concepts is the first step; applying them through practice solidifies your knowledge. Try implementing each data structure and algorithm yourself.

## Key Takeaways

- **DSA is essential** for technical interviews at major tech companies and competitive programming
- **Data structures organize data** efficiently, while **algorithms process that data** to solve problems
- **Real-world applications** include navigation systems, search engines, social networks, and operating systems
- **This tutorial covers** all fundamental topics: Arrays, Linked Lists, Stacks, Queues, Trees, Graphs, Sorting, Searching, and Dynamic Programming
- **Prerequisites are minimal**: basic programming knowledge in any language is sufficient
- **Follow the structured path** in the sidebar for optimal learning, starting with fundamentals and progressing to advanced topics
- **Practice is crucial**: implement concepts yourself to truly master DSA

Start your DSA journey now by clicking on the first lesson in the sidebar. Remember, every expert was once a beginner—consistency and practice will make you proficient in Data Structures and Algorithms!`,

    'dsa-intro': `# DSA Introduction

## What is Data Structures?

**Data structures** are specialized ways of organizing and storing information in a computer so that it can be used efficiently. Think of them as containers with specific rules for how data is arranged and accessed.

Imagine a **library**: Books aren't just thrown randomly on the floor. They're organized on shelves, categorized by genre, author, or subject. This organization makes it easy to find a specific book quickly. Similarly, data structures organize information in memory according to specific patterns that make operations like searching, inserting, or deleting data more efficient.

### Why Data Structures Exist

Computers handle massive amounts of information—from social media posts to financial transactions to video streams. Without proper organization, finding or modifying this data would be impossibly slow. Data structures solve this by providing structured ways to:

- **Store data efficiently** in memory
- **Access data quickly** when needed
- **Manage relationships** between different pieces of data
- **Optimize operations** like searching, sorting, and updating

### Common Data Structures

Different data structures excel at different tasks:

**Arrays**: A sequential collection of elements stored in contiguous memory locations. Like a row of numbered mailboxes where you can instantly access any box by its number.

**Linked Lists**: A chain of nodes where each element points to the next. Like a treasure hunt where each clue leads to the next location.

**Stacks**: A collection that follows "Last In, First Out" (LIFO). Think of a stack of plates—you add and remove plates from the top only.

**Queues**: A collection that follows "First In, First Out" (FIFO). Like a line at a coffee shop—the first person in line gets served first.

**Trees**: A hierarchical structure with a root node branching into child nodes. Like a family tree or an organization chart.

**Graphs**: A network of nodes connected by edges. Like a map of cities connected by roads, or a social network of friends.

**Hash Tables**: A structure that maps keys to values using a hash function. Like a dictionary where you can instantly look up a word to find its definition.

## What is an Algorithm?

An **algorithm** is a finite sequence of well-defined instructions designed to solve a specific problem or perform a particular task. It's a step-by-step procedure that takes input, processes it, and produces output.

Think of an algorithm as a **recipe for cooking**: 
1. Gather ingredients (input)
2. Follow specific steps in order (process)
3. Get the finished dish (output)

Or consider **GPS navigation directions**:
1. Know your starting point and destination (input)
2. Follow turn-by-turn instructions (algorithm steps)
3. Arrive at your destination (output)

### Key Characteristics of Algorithms

**Well-defined steps**: Each instruction must be clear and unambiguous. There should be no confusion about what needs to be done at each step.

**Finite**: An algorithm must eventually terminate. It can't run forever—it needs to complete in a reasonable amount of time.

**Input**: An algorithm takes zero or more inputs. These are the values provided before the algorithm starts.

**Output**: An algorithm produces at least one output. This is the result of the computation.

**Effective**: Each step must be basic enough to be executed, and the algorithm must actually solve the problem it's designed for.

### Why Correctness and Efficiency Matter

**Correctness** ensures the algorithm produces the right answer for all valid inputs. An algorithm that gives wrong results 10% of the time is useless, no matter how fast it runs.

**Efficiency** determines how well an algorithm performs as the input size grows. Two algorithms might both solve the same problem correctly, but one might take seconds while the other takes hours on large datasets. We measure efficiency using:

- **Time Complexity**: How execution time increases with input size
- **Space Complexity**: How memory usage increases with input size

## Relationship Between Data Structures and Algorithms

Data structures and algorithms are inseparable—they work together to solve problems efficiently. **Algorithms operate on data structures** to manipulate and process information.

Consider searching for a name in a phone directory:

**Using an Array (Unsorted List)**:
- Algorithm: Linear Search (check each name one by one)
- Time taken: Could check all entries in worst case
- Efficiency: Slow for large directories

**Using a Binary Search Tree**:
- Algorithm: Binary Search (eliminate half the possibilities each step)
- Time taken: Much faster, logarithmic growth
- Efficiency: Excellent even for millions of entries

The same search operation yields drastically different performance based on the chosen data structure. This is why **choosing the right data structure is crucial**—it directly impacts which algorithms you can use and how efficiently they'll perform.

### The Golden Rule

> The best algorithm using a poor data structure will often be slower than a mediocre algorithm using the optimal data structure.

Understanding this relationship helps you:
- Design systems that scale to millions of users
- Optimize code bottlenecks in existing applications
- Make informed trade-offs between memory and speed
- Pass technical interviews where this knowledge is tested

## Why Learn DSA?

### Interview Importance

Nearly every major tech company—Google, Amazon, Microsoft, Meta, Netflix—uses DSA questions in their technical interviews. These companies need to assess your:

- **Problem-solving ability**: Can you break down complex problems?
- **Code optimization skills**: Can you improve naive solutions?
- **Computer science fundamentals**: Do you understand how computers work at a deeper level?

DSA knowledge separates candidates who can code from candidates who can architect scalable systems.

### Performance Optimization

In production systems, the difference between O(n²) and O(n log n) can mean:
- **Web pages** loading in 100ms instead of 10 seconds
- **Database queries** returning instantly instead of timing out
- **Mobile apps** running smoothly instead of draining battery

Understanding DSA helps you identify performance bottlenecks and fix them before they become critical issues.

### Scalability

An algorithm that works fine with 100 records might crash with 1 million records if poorly designed. DSA teaches you to think about:
- How performance degrades as data grows
- When to use caching, indexing, or preprocessing
- Memory constraints and trade-offs

This is essential for building systems that handle real-world scale.

### Competitive Programming

Platforms like LeetCode, Codeforces, HackerRank, and CodeChef host programming competitions where DSA mastery is essential. Competitive programming:
- Sharpens problem-solving skills rapidly
- Prepares you for timed interview scenarios
- Builds pattern recognition for common problem types
- Connects you with a global community of programmers

### Real-World Systems

DSA isn't just theoretical—it powers the technology you use daily:

**Search Engines (Google, Bing)**: Use inverted indexes (hash tables), ranking algorithms, and tree structures to return relevant results in milliseconds from billions of web pages.

**Navigation Systems (Google Maps, Waze)**: Employ graph algorithms (Dijkstra's, A*) to calculate the fastest route considering real-time traffic.

**Social Networks (Facebook, Instagram)**: Utilize graph structures to represent connections, recommend friends, and generate personalized feeds.

**Databases (MySQL, PostgreSQL)**: Use B-trees and hash indexes to retrieve records efficiently from tables with millions of rows.

**Streaming Services (Netflix, YouTube)**: Apply recommendation algorithms and caching strategies to suggest content and minimize buffering.

**Operating Systems**: Implement scheduling algorithms (queues), memory management (trees), and file systems (graphs).

## Example: Simple Algorithm in Python

Let's explore a fundamental algorithm: **finding the minimum value in a list**. This demonstrates algorithmic thinking—solving a problem through clear, logical steps.

### The Problem

Given a list of numbers, identify the smallest value.

### The Solution

\`\`\`python
# List of numbers
numbers = [5, 3, 8, 1, 2]

# Assume the first element is the minimum
min_value = numbers[0]

# Check each number in the list
for num in numbers:
    if num < min_value:
        min_value = num

print("Minimum value:", min_value)
\`\`\`

**Output:**
\`\`\`
Minimum value: 1
\`\`\`

### How This Algorithm Works

**Step 1**: We start by assuming the first number (\`5\`) is the minimum. This gives us a baseline to compare against.

**Step 2**: We iterate through each number in the list:
- Compare \`3\` with current minimum \`5\` → \`3\` is smaller, so update \`min_value = 3\`
- Compare \`8\` with current minimum \`3\` → \`8\` is larger, keep \`min_value = 3\`
- Compare \`1\` with current minimum \`3\` → \`1\` is smaller, so update \`min_value = 1\`
- Compare \`2\` with current minimum \`1\` → \`2\` is larger, keep \`min_value = 1\`

**Step 3**: After checking all numbers, \`min_value\` holds the smallest number, which is \`1\`.

### Algorithm Analysis

**Time Complexity**: O(n) — We visit each element exactly once, where n is the list length.

**Space Complexity**: O(1) — We only use a single variable \`min_value\` regardless of input size.

**Correctness**: This algorithm is guaranteed to find the minimum because it checks every element and keeps track of the smallest one encountered.

### Alternative Approaches

Python provides a built-in function that does this more concisely:

\`\`\`python
numbers = [5, 3, 8, 1, 2]
min_value = min(numbers)
print("Minimum value:", min_value)
\`\`\`

However, understanding the manual approach helps you:
- Grasp how built-in functions work internally
- Solve problems where no built-in solution exists
- Optimize algorithms for specific constraints
- Demonstrate algorithmic thinking in interviews

### Extending the Concept

You can modify this basic pattern to solve related problems:

\`\`\`python
# Find maximum value
numbers = [5, 3, 8, 1, 2]
max_value = numbers[0]

for num in numbers:
    if num > max_value:  # Changed comparison operator
        max_value = num

print("Maximum value:", max_value)  # Output: 8
\`\`\`

\`\`\`python
# Find both minimum and maximum in a single pass
numbers = [5, 3, 8, 1, 2]
min_value = max_value = numbers[0]

for num in numbers:
    if num < min_value:
        min_value = num
    if num > max_value:
        max_value = num

print(f"Min: {min_value}, Max: {max_value}")  # Output: Min: 1, Max: 8
\`\`\`

This simple example illustrates the essence of algorithms: **breaking problems into logical steps that a computer can execute to produce correct results efficiently**. As you progress through this tutorial, you'll encounter more sophisticated algorithms, but the core principles remain the same.`,

    'dsa-simple-algorithm': `# DSA Simple Algorithm

## What is a Simple Algorithm?

A **simple algorithm** is a straightforward, easy-to-understand sequence of instructions designed to solve a specific problem. These algorithms typically involve basic operations like loops, conditionals, and variable assignments without complex data structures or advanced techniques.

Think of a simple algorithm like following a **recipe to make tea**:
1. Boil water
2. Add tea leaves
3. Wait for 3 minutes
4. Add sugar and milk
5. Serve

Each step is clear, sequential, and achievable. Similarly, simple algorithms break down problems into elementary steps that anyone with basic programming knowledge can understand and implement.

### Why Algorithms are Written Step-by-Step

**Clarity**: Step-by-step instructions eliminate ambiguity. Anyone reading your code should understand exactly what happens at each stage.

**Debugging**: When something goes wrong, you can trace through each step to identify where the logic fails.

**Optimization**: Once you have a working solution, you can analyze each step to find inefficiencies and improve performance.

**Communication**: In technical interviews and team collaborations, explaining your approach step-by-step demonstrates clear thinking.

### Importance of the Three Pillars

**Correctness**: The algorithm must produce accurate results for all valid inputs. An incorrect algorithm is worthless regardless of speed.

**Clarity**: Code is read far more often than it's written. Simple, readable algorithms reduce maintenance costs and prevent bugs.

**Efficiency**: As data scales, inefficient algorithms become bottlenecks. Understanding time and space complexity helps you write code that performs well at scale.

### Real-World Analogy

Consider your **morning routine**:
1. Wake up (input: alarm rings)
2. Brush teeth
3. Take a shower
4. Get dressed
5. Eat breakfast
6. Leave for work (output: ready for the day)

This is an algorithm you execute daily. It's sequential, has clear steps, and produces a predictable outcome. Programming algorithms work the same way—they transform input into output through a series of well-defined operations.

## Characteristics of a Good Algorithm

A well-designed algorithm possesses five essential characteristics:

### Input

An algorithm should have **zero or more well-defined inputs**. These are the values or data provided before the algorithm begins execution.

\`\`\`python
# Example: Algorithm with two inputs
def add_numbers(a, b):  # 'a' and 'b' are inputs
    return a + b
\`\`\`

Some algorithms require no external input if they generate data internally or use constants.

### Output

An algorithm must produce **at least one output**. This is the result of the computation—the problem's solution.

\`\`\`python
# Example: Output is the sum
result = add_numbers(5, 3)
print(result)  # Output: 8
\`\`\`

Without output, an algorithm serves no purpose.

### Definiteness

Every step must be **clear, unambiguous, and precisely defined**. There should be no room for interpretation—the same input must always produce the same output.

\`\`\`python
# Definite: Clear what happens
if x > 0:
    print("Positive")
else:
    print("Non-positive")

# Not definite: Vague instruction
# "Print something based on x" - What exactly?
\`\`\`

### Finiteness

An algorithm must **terminate after a finite number of steps**. It cannot run indefinitely.

\`\`\`python
# Finite: Loop ends after 5 iterations
for i in range(5):
    print(i)

# Infinite: Never terminates (BAD)
# while True:
#     print("Running forever")
\`\`\`

Infinite loops indicate a flawed algorithm unless intentionally designed for continuous processes (like servers).

### Effectiveness

Each operation must be **basic enough to be performed** manually or by a machine. The steps should be feasible and implementable.

\`\`\`python
# Effective: Uses basic operations
total = a + b  # Addition is a basic operation

# Not effective: "Magically find the answer"
# This is not an implementable instruction
\`\`\`

## Example 1: Sum of Numbers (Python)

**Problem**: Calculate the sum of all numbers in a list.

\`\`\`python
numbers = [1, 2, 3, 4, 5]
total = 0

for num in numbers:
    total += num

print("Sum:", total)
\`\`\`

**Output:**
\`\`\`
Sum: 15
\`\`\`

### Step-by-Step Execution

**Initialization**: We start with \`total = 0\`. This accumulator variable will store our running sum.

**Iteration 1**: \`num = 1\` → \`total = 0 + 1 = 1\`

**Iteration 2**: \`num = 2\` → \`total = 1 + 2 = 3\`

**Iteration 3**: \`num = 3\` → \`total = 3 + 3 = 6\`

**Iteration 4**: \`num = 4\` → \`total = 6 + 4 = 10\`

**Iteration 5**: \`num = 5\` → \`total = 10 + 5 = 15\`

**Result**: After all iterations, \`total = 15\`

### Loop Behavior

The \`for\` loop iterates through each element in the \`numbers\` list exactly once. In each iteration:
1. The current element is assigned to \`num\`
2. \`num\` is added to \`total\`
3. Move to the next element

This continues until all elements are processed.

### Time Complexity: O(n)

We visit each element in the list exactly once. If the list has \`n\` elements, the loop runs \`n\` times. This is **linear time complexity** denoted as **O(n)**.

- 5 elements → 5 operations
- 100 elements → 100 operations
- 1,000,000 elements → 1,000,000 operations

The execution time grows proportionally with input size.

### Space Complexity: O(1)

We use only one extra variable (\`total\`) regardless of how large the input list is. This is **constant space complexity** denoted as **O(1)**.

- 5 elements → 1 variable
- 1,000,000 elements → still 1 variable

The memory used doesn't grow with input size.

## Example 2: Find Maximum Element

**Problem**: Identify the largest number in a list.

\`\`\`python
numbers = [10, 45, 23, 89, 2]
max_value = numbers[0]

for num in numbers:
    if num > max_value:
        max_value = num

print("Maximum value:", max_value)
\`\`\`

**Output:**
\`\`\`
Maximum value: 89
\`\`\`

### Comparison Logic

We use a **comparison-based approach**:

**Initialization**: Assume the first element (\`10\`) is the maximum. This gives us a baseline.

**Iteration 1**: Compare \`45\` with current max \`10\` → \`45 > 10\` → Update \`max_value = 45\`

**Iteration 2**: Compare \`23\` with current max \`45\` → \`23 < 45\` → No change

**Iteration 3**: Compare \`89\` with current max \`45\` → \`89 > 45\` → Update \`max_value = 89\`

**Iteration 4**: Compare \`2\` with current max \`89\` → \`2 < 89\` → No change

**Result**: \`max_value = 89\`

### Why Initialization Matters

**Correct Initialization**:
\`\`\`python
max_value = numbers[0]  # Use first element
\`\`\`

This ensures we have a valid starting point from the actual data.

**Wrong Initialization**:
\`\`\`python
max_value = 0  # What if all numbers are negative?
\`\`\`

If the list is \`[-5, -3, -10, -1]\`, this approach would incorrectly return \`0\` instead of \`-1\`.

**Another Wrong Approach**:
\`\`\`python
max_value = float('-inf')  # Works but less intuitive
\`\`\`

While technically correct, using the first element is more natural and doesn't require knowledge of infinity constants.

### Complexity Analysis

**Time Complexity: O(n)** — We examine each element once.

**Space Complexity: O(1)** — We use only one variable (\`max_value\`) regardless of list size.

This algorithm is optimal for unsorted data. You cannot find the maximum without checking all elements at least once.

## Example 3: Linear Search Algorithm

**Problem**: Determine whether a target value exists in a list.

\`\`\`python
numbers = [4, 8, 15, 16, 23, 42]
target = 15
found = False

for num in numbers:
    if num == target:
        found = True
        break

if found:
    print("Element found")
else:
    print("Element not found")
\`\`\`

**Output:**
\`\`\`
Element found
\`\`\`

### Why Linear Search is Simple

**Linear search** is the most straightforward searching technique—check each element sequentially until you find the target or reach the end of the list.

**How it works**:
1. Start at the first element
2. Compare it with the target
3. If match found, return success
4. If not, move to the next element
5. Repeat until element is found or list ends

**The \`break\` statement**: Once we find the target, there's no need to continue searching. The \`break\` statement exits the loop immediately, saving unnecessary comparisons.

### Best, Worst, and Average Cases

**Best Case: O(1)**
- Target is the **first element**
- Example: Searching for \`4\` in \`[4, 8, 15, 16, 23, 42]\`
- Only 1 comparison needed

**Worst Case: O(n)**
- Target is the **last element** or **not present**
- Example: Searching for \`42\` in \`[4, 8, 15, 16, 23, 42]\`
- All \`n\` comparisons needed

**Average Case: O(n)**
- Target is somewhere in the **middle**
- On average, we check half the elements: n/2 comparisons
- In Big-O notation, constants are dropped, so O(n/2) = O(n)

### Real-World Usage

Linear search is used when:

**Unsorted data**: If data isn't sorted, you have no choice but to check every element.

**Small datasets**: For lists with 10-100 elements, linear search is perfectly fine and simpler than more complex algorithms.

**One-time searches**: If you only search once, the overhead of sorting data first isn't worth it.

**Linked lists**: Unlike arrays, linked lists don't support fast random access, making linear search the natural choice.

**Example**: Searching for a name in an unsorted contact list, checking if an item exists in a shopping cart, or verifying if a username is taken.

## Algorithm Dry Run (Important)

A **dry run** means manually executing an algorithm step-by-step to verify correctness before running code. This is crucial for debugging and understanding logic.

Let's dry run the maximum-finding algorithm:

**Input**: \`numbers = [10, 45, 23, 89, 2]\`

**Initial State**:
- \`max_value = 10\` (first element)
- Loop hasn't started yet

**Iteration 1**:
- Current element: \`10\`
- Comparison: \`10 > 10\`? No
- \`max_value\` remains: \`10\`

**Iteration 2**:
- Current element: \`45\`
- Comparison: \`45 > 10\`? Yes
- Update \`max_value = 45\`

**Iteration 3**:
- Current element: \`23\`
- Comparison: \`23 > 45\`? No
- \`max_value\` remains: \`45\`

**Iteration 4**:
- Current element: \`89\`
- Comparison: \`89 > 45\`? Yes
- Update \`max_value = 89\`

**Iteration 5**:
- Current element: \`2\`
- Comparison: \`2 > 89\`? No
- \`max_value\` remains: \`89\`

**Final State**:
- Loop terminates
- \`max_value = 89\`
- Output: "Maximum value: 89"

### Why Dry Runs Matter

- **Catch logic errors** before running code
- **Understand variable states** at each step
- **Essential for interviews** — interviewers often ask you to trace through your code
- **Builds debugging skills** — you learn to think like the computer

## Time Complexity Basics

**Time complexity** measures how the runtime of an algorithm grows as the input size increases. It helps you predict performance and compare different solutions.

### What Time Complexity Means

Instead of measuring exact seconds (which vary by hardware), we count **fundamental operations** like comparisons, assignments, or arithmetic operations.

Time complexity answers: "If I double the input size, how much longer will my algorithm take?"

### Why Big-O Notation Exists

**Big-O notation** expresses the **upper bound** of growth rate, ignoring constants and lower-order terms. It focuses on what matters most: how the algorithm scales.

\`\`\`python
# Both loops are O(n), even though one is slower
for i in range(n):
    print(i)  # n operations

for i in range(n):
    print(i)
    print(i * 2)
    print(i * 3)  # 3n operations
\`\`\`

We ignore the constant \`3\` because as \`n\` grows large, the difference becomes negligible.

### Common Complexities with Examples

**O(1) — Constant Time**

Execution time doesn't depend on input size. Always takes the same time.

\`\`\`python
# Accessing array element by index
numbers = [1, 2, 3, 4, 5]
first = numbers[0]  # O(1)
\`\`\`

**O(n) — Linear Time**

Execution time grows proportionally with input size.

\`\`\`python
# Sum of numbers (from Example 1)
total = 0
for num in numbers:  # O(n)
    total += num
\`\`\`

Doubling input size doubles execution time.

**O(n²) — Quadratic Time**

Execution time grows with the square of input size. Common with nested loops.

\`\`\`python
# Print all pairs
numbers = [1, 2, 3, 4]
for i in numbers:       # n times
    for j in numbers:   # n times for each i
        print(i, j)     # n × n = n² operations
\`\`\`

Doubling input size quadruples execution time. Becomes extremely slow for large inputs.

**Comparison**:
- Input size 10: O(1) = 1, O(n) = 10, O(n²) = 100
- Input size 100: O(1) = 1, O(n) = 100, O(n²) = 10,000
- Input size 1000: O(1) = 1, O(n) = 1,000, O(n²) = 1,000,000

## Space Complexity Basics

**Space complexity** measures how much memory an algorithm uses as input size grows.

### What Space Complexity Is

Just like time complexity measures operations, space complexity measures memory usage. It helps you understand memory requirements and optimize for resource-constrained environments.

### Difference Between Input Space and Auxiliary Space

**Input Space**: Memory used to store the input data itself.

\`\`\`python
numbers = [1, 2, 3, 4, 5]  # This array is input space
\`\`\`

**Auxiliary Space**: Extra memory used by the algorithm beyond the input.

\`\`\`python
# Finding sum
total = 0  # This variable is auxiliary space
for num in numbers:
    total += num
\`\`\`

When we say an algorithm has **O(1) space complexity**, we mean auxiliary space is constant—we don't count the input.

### Examples

**O(1) — Constant Space**

Uses fixed amount of extra memory regardless of input size.

\`\`\`python
# Maximum value algorithm
max_value = numbers[0]  # Only 1 extra variable
for num in numbers:
    if num > max_value:
        max_value = num
# Space: O(1) auxiliary
\`\`\`

**O(n) — Linear Space**

Extra memory grows with input size.

\`\`\`python
# Creating a copy of the list
numbers = [1, 2, 3, 4, 5]
doubled = []
for num in numbers:
    doubled.append(num * 2)
# Space: O(n) — new list has n elements
\`\`\`

**Trade-offs**: Sometimes you can reduce time complexity by using more space (caching, memoization) or reduce space complexity by accepting slower execution.

## Common Beginner Mistakes

### Wrong Initialization

**Problem**: Starting with incorrect initial values.

\`\`\`python
# WRONG: Finding minimum of positive numbers
numbers = [5, 8, 2, 9, 1]
min_value = 0  # Wrong! What if all numbers > 0?

# CORRECT
min_value = numbers[0]
\`\`\`

**Problem**: Using the wrong data type.

\`\`\`python
# WRONG: Checking if element exists
found = 0  # Should be boolean

# CORRECT
found = False
\`\`\`

### Infinite Loops

**Problem**: Forgetting to update loop conditions.

\`\`\`python
# WRONG: Infinite loop
i = 0
while i < 10:
    print(i)
    # Forgot to increment i

# CORRECT
i = 0
while i < 10:
    print(i)
    i += 1
\`\`\`

### Incorrect Conditions

**Problem**: Using wrong comparison operators.

\`\`\`python
# WRONG: Finding maximum
if num < max_value:  # Should be >
    max_value = num

# CORRECT
if num > max_value:
    max_value = num
\`\`\`

**Problem**: Off-by-one errors.

\`\`\`python
# WRONG: Missing last element
for i in range(len(numbers) - 1):  # Missing last index

# CORRECT
for i in range(len(numbers)):
\`\`\`

### Forgetting Edge Cases

**Problem**: Not testing with empty or single-element inputs.

\`\`\`python
# WRONG: Crashes with empty list
numbers = []
max_value = numbers[0]  # IndexError!

# CORRECT: Handle edge case
if len(numbers) == 0:
    print("Empty list")
else:
    max_value = numbers[0]
\`\`\`

**Common edge cases to test**:
- Empty input
- Single element
- All elements identical
- Negative numbers
- Very large numbers

## When to Use Simple Algorithms

### Small Input Size

For datasets with fewer than 10,000 elements, simple O(n) or O(n²) algorithms often perform well enough. The overhead of complex algorithms isn't justified.

\`\`\`python
# For 100 elements, bubble sort (O(n²)) is fine
numbers = [64, 34, 25, 12, 22, 11, 90]
# Simple bubble sort works great here
\`\`\`

### Prototyping

When building a proof-of-concept or MVP, prioritize getting something working quickly. You can optimize later if needed.

**Development philosophy**: "Make it work, make it right, make it fast" — in that order.

### Learning Fundamentals

Simple algorithms teach core programming concepts:
- Loop structures
- Conditional logic
- Variable manipulation
- Complexity analysis

Master simple algorithms before tackling advanced ones.

### Foundation for Advanced Algorithms

Complex algorithms often build upon simple ones:
- **Merge sort** uses the simple merge operation
- **Dijkstra's algorithm** uses simple min-finding repeatedly
- **Dynamic programming** combines simple subproblem solutions

Understanding simple algorithms makes advanced techniques easier to grasp.

### Real-World Scenarios

- **Small business applications**: Customer lists with 500 entries don't need binary search trees
- **Configuration files**: Parsing 20 lines of config doesn't require optimization
- **User interfaces**: Filtering 50 search results happens instantly with linear search

## What's Next?

Now that you understand simple algorithms, you're ready to dive deeper into specific data structures and techniques:

### Arrays

Learn about:
- Array operations (insert, delete, search)
- Two-pointer techniques
- Sliding window algorithms
- Subarrays and subsequences

Arrays are the foundation of most DSA problems in interviews.

### Sorting Algorithms

Explore different sorting techniques:
- Bubble Sort, Selection Sort, Insertion Sort (O(n²))
- Merge Sort, Quick Sort (O(n log n))
- Counting Sort, Radix Sort (specialized cases)

Understanding sorting helps with optimization and teaches divide-and-conquer thinking.

### Searching Algorithms

Master efficient searching:
- Binary Search (O(log n)) for sorted arrays
- Search in rotated arrays
- Finding elements in 2D matrices

These techniques appear frequently in technical interviews.

### Time Complexity in Depth

Deep dive into:
- Best, worst, and average case analysis
- Amortized complexity
- Recursive time complexity (Master Theorem)
- Space-time trade-offs

This knowledge helps you optimize algorithms and make informed design decisions.

## Key Takeaways

- **Simple algorithms** are straightforward, sequential solutions using basic programming constructs like loops and conditionals
- **Good algorithms** possess five characteristics: Input, Output, Definiteness, Finiteness, and Effectiveness
- **Sum, maximum finding, and linear search** are fundamental algorithms every programmer should master
- **Dry running** algorithms manually helps catch logic errors and builds debugging intuition
- **Time complexity** measures how runtime grows with input size; common complexities are O(1), O(n), O(n²)
- **Space complexity** measures memory usage; distinguish between input space and auxiliary space
- **Common mistakes** include wrong initialization, infinite loops, incorrect conditions, and forgetting edge cases
- **Simple algorithms** are perfect for small datasets, prototyping, learning fundamentals, and building toward advanced techniques
- **Master the basics** before moving to complex data structures and algorithms—they form the foundation of all problem-solving

Practice implementing these simple algorithms in different scenarios. Variation builds pattern recognition, and pattern recognition is the key to solving interview problems efficiently.`,

    'dsa-arrays': `# Arrays in Data Structures

## What is an Array?

An **array** is a fundamental data structure that stores a collection of elements in a sequential, ordered manner. Each element in an array occupies a specific position identified by an index, allowing direct access to any element.

### Why Arrays Are Used

Arrays provide an efficient way to store and organize multiple values of the same type under a single variable name. Instead of creating separate variables for each piece of data, arrays let you manage collections systematically.

**Example without arrays:**
\`\`\`python
student1 = 85
student2 = 92
student3 = 78
student4 = 88
# Becomes unmanageable with hundreds of students
\`\`\`

**Example with arrays:**
\`\`\`python
students = [85, 92, 78, 88]  # Clean and scalable
\`\`\`

### Fixed Size vs Dynamic Arrays

**Fixed-size arrays** have a predetermined capacity that cannot change after creation. Languages like C and Java require you to specify array size upfront. If you need more space, you must create a new, larger array and copy elements over.

**Dynamic arrays** can grow and shrink automatically as elements are added or removed. They handle memory reallocation behind the scenes, making them more flexible for applications where data size is unpredictable.

Python's **list** is a dynamic array implementation that automatically resizes itself when needed, abstracting away the complexity of manual memory management.

### Contiguous Memory Storage

Arrays store elements in **contiguous memory locations**—meaning elements are placed next to each other in a continuous block of memory. This adjacency has important implications:

**Direct Access**: If the array starts at memory address 1000, and each element takes 4 bytes, the 5th element is at address 1000 + (4 × 4) = 1016. The system can calculate any element's location instantly using: \`base_address + (index × element_size)\`

**Cache Efficiency**: Modern CPUs fetch data in chunks (cache lines). Since array elements sit together, accessing one element often loads nearby elements into cache automatically, speeding up subsequent accesses.

**Memory Overhead**: Requesting contiguous space means the system must find a continuous free block. For large arrays, this can be challenging if memory is fragmented.

## Real-Life Analogy of Arrays

Understanding arrays becomes intuitive when you relate them to everyday objects:

### Books on a Shelf

Imagine a bookshelf where books are arranged in order from left to right. Each book occupies a specific position:

- **Position 0**: "Harry Potter"
- **Position 1**: "The Hobbit"
- **Position 2**: "1984"
- **Position 3**: "Pride and Prejudice"

If someone asks for the book at position 2, you can directly reach to that spot without checking positions 0 and 1. This is exactly how arrays work—direct access using an index.

### Student Roll Numbers

In a classroom, students are assigned roll numbers: 1, 2, 3, 4, and so on. The attendance register lists students sequentially:

\`\`\`python
attendance = ["Alice", "Bob", "Charlie", "Diana", "Eve"]
\`\`\`

To mark student at roll number 3 (0-indexed as position 2) present, you go directly to that position. You don't need to scan through Alice and Bob first.

### Parking Slots

A parking lot has numbered slots: P1, P2, P3, P4, etc. Each slot can hold one vehicle. When you're told your car is in slot P5, you walk directly there. The parking lot layout (contiguous slots) allows quick access to any specific slot by its number.

Similarly, arrays organize data in numbered positions, enabling instant retrieval when you know the index.

## Array Declaration in Python

In Python, arrays are implemented using **lists**, which function as dynamic arrays with built-in methods for manipulation.

### Creating an Array

\`\`\`python
numbers = [10, 20, 30, 40, 50]
\`\`\`

This creates an array (list) containing five integer elements.

### Understanding Zero-Based Indexing

Array indices start from **0**, not 1. This is a fundamental concept in most programming languages:

- First element: \`index 0\`
- Second element: \`index 1\`
- Third element: \`index 2\`
- ...and so on

**Visualization:**
\`\`\`
Array:   [10,  20,  30,  40,  50]
Index:    0    1    2    3    4
\`\`\`

### Accessing Elements by Index

You can retrieve any element directly using its index inside square brackets:

\`\`\`python
numbers = [10, 20, 30, 40, 50]

print(numbers[0])   # Output: 10 (first element)
print(numbers[3])   # Output: 40 (fourth element)
print(numbers[4])   # Output: 50 (last element)
\`\`\`

**Negative Indexing** (Python feature):
\`\`\`python
print(numbers[-1])  # Output: 50 (last element)
print(numbers[-2])  # Output: 40 (second to last)
\`\`\`

Negative indices count backward from the end, with \`-1\` representing the last element.

### Finding Array Length

\`\`\`python
length = len(numbers)
print(length)  # Output: 5
\`\`\`

The \`len()\` function returns the number of elements in the array.

## Traversing an Array

**Traversal** means visiting each element in an array sequentially to perform an operation—like printing, modifying, or calculating a sum.

### Basic Traversal Using For Loop

\`\`\`python
numbers = [10, 20, 30, 40, 50]

for num in numbers:
    print(num)
\`\`\`

**Output:**
\`\`\`
10
20
30
40
50
\`\`\`

### What Traversal Means

During traversal, the loop variable (\`num\`) takes on the value of each element one at a time. The loop continues until all elements have been visited. This is the most common operation for processing array data.

### Traversal with Index

Sometimes you need both the element and its position:

\`\`\`python
for i in range(len(numbers)):
    print(f"Index {i}: {numbers[i]}")
\`\`\`

**Output:**
\`\`\`
Index 0: 10
Index 1: 20
Index 2: 30
Index 3: 40
Index 4: 50
\`\`\`

### Using enumerate()

Python provides a cleaner way to get both index and value:

\`\`\`python
for index, value in enumerate(numbers):
    print(f"Index {index}: {value}")
\`\`\`

### Time Complexity: O(n)

Traversing an array requires visiting each of the \`n\` elements exactly once. Therefore, traversal has **linear time complexity** denoted as **O(n)**.

- 5 elements → 5 visits
- 1000 elements → 1000 visits
- 1,000,000 elements → 1,000,000 visits

The time taken grows proportionally with the number of elements.

## Inserting Elements in an Array

Insertion adds new elements to an array. In Python lists, there are multiple ways to insert data depending on where you want to place the new element.

### Append: Adding to the End

The \`append()\` method adds an element to the end of the array:

\`\`\`python
numbers = [10, 20, 30, 40, 50]
numbers.append(60)

print(numbers)  # Output: [10, 20, 30, 40, 50, 60]
\`\`\`

**How append works:**
1. Check if there's available capacity in the underlying storage
2. If yes, place the new element in the next available slot
3. If no, allocate a larger memory block, copy existing elements, then add the new one
4. Update the array's size counter

### Insert: Adding at a Specific Position

The \`insert()\` method places an element at a specified index, shifting subsequent elements to the right:

\`\`\`python
numbers = [10, 20, 30, 40, 50]
numbers.insert(2, 25)  # Insert 25 at index 2

print(numbers)  # Output: [10, 20, 25, 30, 40, 50]
\`\`\`

**How insert works:**
1. Elements from the insertion point onward shift one position right
2. Original \`index 2\` (value 30) moves to \`index 3\`
3. Original \`index 3\` (value 40) moves to \`index 4\`
4. And so on...
5. The new element (25) occupies \`index 2\`

### Time Complexity Impact

**Append: O(1) amortized**

Adding to the end typically takes constant time. Occasionally, when the array needs resizing, it takes O(n) to copy all elements to the new space. However, this happens infrequently enough that the average (amortized) time is O(1).

**Insert at specific position: O(n)**

Inserting at index \`i\` requires shifting all elements from position \`i\` to the end, which takes linear time. The worst case is inserting at index 0, which shifts all \`n\` elements.

**Insertion at beginning:**
\`\`\`python
numbers.insert(0, 5)  # Shifts all elements → O(n)
\`\`\`

**Insertion at end (using insert):**
\`\`\`python
numbers.insert(len(numbers), 60)  # No shifting needed → O(1)
# append() is preferred for this
\`\`\`

## Deleting Elements from an Array

Deletion removes elements from an array, potentially requiring elements to shift positions to fill gaps.

### Remove: Delete by Value

The \`remove()\` method deletes the **first occurrence** of a specified value:

\`\`\`python
numbers = [10, 20, 30, 40, 50]
numbers.remove(30)

print(numbers)  # Output: [10, 20, 40, 50]
\`\`\`

**How remove works:**
1. Search for the target value (30) → found at index 2
2. Delete the element at index 2
3. Shift all elements after index 2 one position left
4. Original \`index 3\` (value 40) moves to \`index 2\`
5. Original \`index 4\` (value 50) moves to \`index 3\`
6. Decrease the array's size counter

**If value doesn't exist:**
\`\`\`python
numbers.remove(100)  # Raises ValueError
\`\`\`

### Pop: Delete by Index

The \`pop()\` method removes and returns an element at a specified index. If no index is provided, it removes the last element:

\`\`\`python
numbers = [10, 20, 30, 40, 50]

removed = numbers.pop(1)  # Remove element at index 1
print(removed)   # Output: 20
print(numbers)   # Output: [10, 30, 40, 50]

last = numbers.pop()  # Remove last element
print(last)      # Output: 50
print(numbers)   # Output: [10, 30, 40]
\`\`\`

### Shifting of Elements Explained

When you delete an element from position \`i\`, all elements from position \`i+1\` to the end must shift left by one position to maintain contiguity:

**Before deletion:**
\`\`\`
Index: 0   1   2   3   4
Value: 10  20  30  40  50
\`\`\`

**After \`numbers.pop(1)\` (remove index 1):**
\`\`\`
Index: 0   1   2   3
Value: 10  30  40  50
\`\`\`

Element at index 2 (30) moves to index 1, element at index 3 (40) moves to index 2, and so on.

### Time Complexity

**Remove by value: O(n)**

Two operations occur:
1. Search for the value: O(n) in worst case
2. Shift elements after deletion: O(n) in worst case

Total: O(n)

**Pop from end: O(1)**

No shifting required. Simply decrease the size counter and return the last element.

**Pop from specific index: O(n)**

Removing from index \`i\` requires shifting all elements after \`i\`, which takes O(n) time in the worst case (deleting from index 0).

## Searching in an Array

Searching determines whether a target element exists in an array and, optionally, returns its position.

### Linear Search Concept

**Linear search** (or sequential search) checks each element one by one until the target is found or the array ends. It's the simplest searching algorithm and works on both sorted and unsorted arrays.

### Implementing Linear Search

\`\`\`python
numbers = [10, 20, 30, 40, 50]
target = 40
found = False

for num in numbers:
    if num == target:
        found = True
        break

if found:
    print("Found")
else:
    print("Not Found")
\`\`\`

**Output:**
\`\`\`
Found
\`\`\`

### Getting the Index

Often, you need to know **where** the element is located:

\`\`\`python
numbers = [10, 20, 30, 40, 50]
target = 40
index = -1

for i in range(len(numbers)):
    if numbers[i] == target:
        index = i
        break

if index != -1:
    print(f"Found at index {index}")
else:
    print("Not Found")
\`\`\`

**Output:**
\`\`\`
Found at index 3
\`\`\`

### Using Python's Built-in Methods

Python provides convenient methods for searching:

\`\`\`python
# Check if element exists
if 40 in numbers:
    print("Found")

# Get index of element
try:
    idx = numbers.index(40)
    print(f"Found at index {idx}")
except ValueError:
    print("Not Found")
\`\`\`

### Sequential Checking

Linear search examines elements in order from left to right (or right to left). For each element, it performs a comparison with the target. This sequential nature makes it straightforward but potentially slow for large datasets.

### Best and Worst Cases

**Best Case: O(1)**
- Target is the **first element**
- Only 1 comparison needed
- Example: Searching for 10 in [10, 20, 30, 40, 50]

**Worst Case: O(n)**
- Target is the **last element** or **doesn't exist**
- All \`n\` comparisons needed
- Example: Searching for 50 or 100 in [10, 20, 30, 40, 50]

**Average Case: O(n)**
- Target is somewhere in the middle
- On average, check half the elements: n/2 comparisons
- Still considered O(n) because constants are dropped in Big-O notation

### When Linear Search is Appropriate

Linear search is suitable when:
- Array is **unsorted** (no better option exists)
- Array is **small** (overhead of advanced algorithms isn't worth it)
- You're searching **only once** (sorting first would waste time)
- Working with **linked lists** (random access isn't available)

For sorted arrays, **binary search** (O(log n)) is much more efficient.

## Advantages of Arrays

### Fast Access Time

**Direct indexing** allows O(1) access to any element. If you know the index, retrieval is instantaneous regardless of array size:

\`\`\`python
numbers = [10, 20, 30, 40, 50]
value = numbers[3]  # Instant access to 40
\`\`\`

This makes arrays ideal for scenarios requiring frequent random access.

### Simple Implementation

Arrays are conceptually straightforward and easy to understand. Their simplicity makes them:
- **Easy to learn** for beginners
- **Easy to implement** in any programming language
- **Easy to debug** due to predictable behavior
- **Universal** across all programming paradigms

### Memory Efficiency

Compared to linked structures (linked lists, trees), arrays have:
- **No pointer overhead**: Don't waste memory storing references to next elements
- **Compact storage**: Elements are tightly packed with minimal gaps
- **Predictable memory usage**: Size × element_size = total memory

### Cache Friendliness

Modern CPUs use cache memory to speed up data access. Arrays benefit from **spatial locality**—since elements are contiguous, accessing one element often loads nearby elements into cache automatically. This dramatically improves performance for sequential operations like traversal.

### Foundation for Other Structures

Many complex data structures use arrays internally:
- **Stacks and Queues**: Can be implemented using arrays
- **Hash Tables**: Use arrays for bucket storage
- **Heaps**: Often implemented as arrays
- **Graphs**: Adjacency matrix representation uses 2D arrays

Understanding arrays is essential for mastering these advanced structures.

## Disadvantages of Arrays

### Fixed Size (Conceptual Limitation)

Traditional arrays have predetermined capacity. Once full, you cannot add more elements without creating a new, larger array and copying data over. This makes them inflexible for applications with unpredictable data growth.

**Note**: Python lists handle this automatically, but the underlying mechanism still involves periodic reallocation and copying.

### Costly Insertion and Deletion

Inserting or deleting elements (except at the end) requires shifting multiple elements:

\`\`\`python
# Inserting at index 0 shifts ALL elements right → O(n)
numbers.insert(0, 5)

# Deleting at index 0 shifts ALL elements left → O(n)
numbers.pop(0)
\`\`\`

For applications with frequent insertions/deletions at arbitrary positions, linked lists are more efficient.

### Memory Wastage

If you allocate an array with 1000 slots but only use 200, the remaining 800 slots waste memory. Underestimating size requires reallocation; overestimating wastes resources.

### Not Suitable for Dynamic Operations

Arrays struggle with:
- **Unpredictable size changes**: Frequent resizing degrades performance
- **Frequent insertions/deletions in middle**: Too much element shifting
- **Memory-constrained environments**: Requiring contiguous blocks can fail even when total free memory is sufficient (fragmentation)

For such scenarios, consider:
- **Linked Lists**: O(1) insertion/deletion when you have a reference to the position
- **Dynamic arrays with better growth strategies**: Balance between memory and speed
- **Trees or hash tables**: For specialized access patterns

## Time Complexity Summary

Understanding time complexity helps you choose the right operations and optimize your code. Here's a comprehensive breakdown:

**Access by Index: O(1)**
- Directly calculate memory address
- Instant retrieval regardless of array size
- Example: \`numbers[5]\` takes the same time whether array has 10 or 10,000 elements

**Search (Linear): O(n)**
- Must check each element sequentially
- Worst case: element doesn't exist or is at the end
- Best case: O(1) if element is first
- Average case: O(n/2) ≈ O(n)

**Insert at End (append): O(1) amortized**
- Usually constant time
- Occasionally O(n) during resizing
- Amortized over many operations: O(1)

**Insert at Arbitrary Position: O(n)**
- Requires shifting elements
- Worst case: inserting at index 0 shifts all n elements
- Example: \`numbers.insert(0, value)\` → O(n)

**Delete from End (pop): O(1)**
- No shifting required
- Simply reduce size counter
- Example: \`numbers.pop()\` → O(1)

**Delete from Arbitrary Position: O(n)**
- Requires shifting elements to fill gap
- Worst case: deleting index 0 shifts all n elements
- Also includes O(n) search if deleting by value

**Traversal: O(n)**
- Must visit each element once
- Common for printing, summing, or applying operations

**Summary Table:**

| Operation | Time Complexity |
|-----------|----------------|
| Access | O(1) |
| Search | O(n) |
| Insert (end) | O(1)* |
| Insert (middle/start) | O(n) |
| Delete (end) | O(1) |
| Delete (middle/start) | O(n) |
| Traversal | O(n) |

*Amortized time complexity

## Common Mistakes with Arrays

### Index Out of Range

Accessing an index that doesn't exist causes an **IndexError**:

\`\`\`python
numbers = [10, 20, 30]
print(numbers[5])  # IndexError: list index out of range
\`\`\`

**How to avoid:**
- Always check array length before accessing
- Use negative indices carefully (-1 is last, -len(arr) is first)
- Validate index bounds in loops

\`\`\`python
# Safe access
if 0 <= index < len(numbers):
    value = numbers[index]
else:
    print("Invalid index")
\`\`\`

### Off-by-One Errors

Forgetting that arrays use zero-based indexing leads to accessing wrong elements:

\`\`\`python
# WRONG: Trying to access "last" element
numbers = [10, 20, 30, 40, 50]
last = numbers[5]  # Error! Valid indices are 0-4

# CORRECT
last = numbers[4]
# OR
last = numbers[-1]
# OR
last = numbers[len(numbers) - 1]
\`\`\`

**Common in loops:**
\`\`\`python
# WRONG: Skips last element
for i in range(len(numbers) - 1):
    print(numbers[i])

# CORRECT
for i in range(len(numbers)):
    print(numbers[i])
\`\`\`

### Modifying Array During Iteration

Changing an array's size while iterating over it causes unexpected behavior:

\`\`\`python
# WRONG: Removing elements while iterating
numbers = [10, 20, 30, 40, 50]
for num in numbers:
    if num % 20 == 0:
        numbers.remove(num)  # Skips elements!
# Result might be [10, 30, 40] instead of [10, 30, 50]
\`\`\`

**Why this fails**: Removing an element shifts remaining elements left, but the iterator continues forward, skipping elements.

**Correct approaches:**

\`\`\`python
# Option 1: Create new list
numbers = [10, 20, 30, 40, 50]
filtered = [num for num in numbers if num % 20 != 0]

# Option 2: Iterate backwards
for i in range(len(numbers) - 1, -1, -1):
    if numbers[i] % 20 == 0:
        numbers.pop(i)

# Option 3: Use filter
numbers = list(filter(lambda x: x % 20 != 0, numbers))
\`\`\`

### Shallow vs Deep Copy Issues

Copying arrays incorrectly can lead to unintended modifications:

\`\`\`python
# WRONG: Both variables point to same array
original = [1, 2, 3]
copy = original
copy[0] = 99
print(original)  # [99, 2, 3] - modified unintentionally!

# CORRECT: Create actual copy
import copy
original = [1, 2, 3]
deep_copy = copy.deepcopy(original)
# OR for simple lists
shallow_copy = original.copy()
# OR
shallow_copy = original[:]
\`\`\`

### Confusing Append vs Extend

\`\`\`python
numbers = [1, 2, 3]

# append adds the entire list as a single element
numbers.append([4, 5])
print(numbers)  # [1, 2, 3, [4, 5]]

# extend adds each element individually
numbers = [1, 2, 3]
numbers.extend([4, 5])
print(numbers)  # [1, 2, 3, 4, 5]
\`\`\`

## Interview Tips

### When to Choose Arrays

Arrays are optimal when:

**Fast random access is required**: If you frequently need to access elements by index (e.g., \`get element at position 1000\`), arrays are unbeatable with O(1) access.

**Size is known or predictable**: When you know approximately how many elements you'll store, arrays avoid the overhead of dynamic structures.

**Memory efficiency matters**: Arrays have minimal overhead compared to linked structures that store pointers alongside data.

**Cache performance is critical**: For computationally intensive operations (image processing, numerical simulations), array locality improves cache hit rates.

**Sequential access patterns dominate**: If most operations involve traversing elements in order, arrays excel due to contiguous storage.

### Common Array Interview Patterns

Mastering these patterns helps solve many interview problems:

**Two Pointer Technique**: Use two indices moving toward/away from each other
\`\`\`python
# Check if array is palindrome
left, right = 0, len(arr) - 1
while left < right:
    if arr[left] != arr[right]:
        return False
    left += 1
    right -= 1
return True
\`\`\`

**Sliding Window**: Maintain a window of elements and slide it across array
\`\`\`python
# Maximum sum of k consecutive elements
max_sum = sum(arr[:k])
current_sum = max_sum
for i in range(k, len(arr)):
    current_sum += arr[i] - arr[i - k]
    max_sum = max(max_sum, current_sum)
\`\`\`

**Kadane's Algorithm**: Find maximum subarray sum
\`\`\`python
max_sum = current_sum = arr[0]
for num in arr[1:]:
    current_sum = max(num, current_sum + num)
    max_sum = max(max_sum, current_sum)
\`\`\`

**Prefix Sum**: Precompute cumulative sums for range queries
\`\`\`python
prefix = [0]
for num in arr:
    prefix.append(prefix[-1] + num)
# Sum from index i to j: prefix[j+1] - prefix[i]
\`\`\`

### Why Arrays are the Base for Other Data Structures

Understanding arrays deeply helps you master:

**Stacks**: Can be implemented using arrays with a top pointer
**Queues**: Circular array implementation with front and rear pointers
**Heaps**: Complete binary trees stored as arrays
**Hash Tables**: Array of buckets/slots
**Dynamic Programming tables**: Often stored as 1D or 2D arrays

Interview questions frequently combine arrays with these structures, so array proficiency is foundational.

### Practice Strategy

- **Start simple**: Master traversal, searching, basic operations
- **Learn patterns**: Two pointers, sliding window, prefix sum
- **Solve problems**: LeetCode Easy → Medium problems on arrays
- **Analyze complexity**: Always determine time/space complexity
- **Edge cases**: Empty arrays, single elements, duplicates, negatives

## What's Next?

Now that you understand arrays fundamentally, it's time to explore algorithms that operate on arrays:

### Bubble Sort

Learn the simplest sorting algorithm that repeatedly swaps adjacent elements if they're in wrong order. While not efficient (O(n²)), it teaches fundamental sorting concepts and is often asked in interviews to test basic understanding.

### Selection Sort

Discover how to sort by repeatedly finding the minimum element and placing it at the beginning. Selection sort helps you understand the concept of maintaining sorted and unsorted portions.

### Insertion Sort

Master the technique of building a sorted array one element at a time. Insertion sort is efficient for small datasets and nearly sorted arrays—important for real-world scenarios.

### Merge Sort

Progress to divide-and-conquer sorting with O(n log n) complexity. Merge sort introduces recursion and optimal sorting performance, essential for handling large datasets.

### Quick Sort

Learn the most commonly used sorting algorithm in practice. Quick sort combines efficiency with in-place sorting, making it the default choice in many programming libraries.

### Searching Algorithms

Beyond linear search, explore **binary search** for sorted arrays, achieving O(log n) complexity. Understanding binary search opens doors to advanced problem-solving techniques.

### Advanced Array Techniques

- **Subarray problems**: Maximum sum, longest increasing subsequence
- **Array rotations**: Rotate elements efficiently
- **Merge intervals**: Working with ranges
- **Product except self**: Clever mathematical techniques

Each topic builds on your array knowledge, gradually increasing in complexity and interview relevance.

## Key Takeaways

- **Arrays store elements sequentially** in contiguous memory locations, enabling O(1) direct access by index
- **Python lists are dynamic arrays** that automatically resize, abstracting memory management complexities
- **Zero-based indexing** means the first element is at index 0, and the last is at index n-1
- **Traversal visits each element** sequentially and has O(n) time complexity
- **Insertion at the end (append)** is O(1) amortized, but insertion at arbitrary positions is O(n) due to shifting
- **Deletion from the end (pop)** is O(1), but deletion from arbitrary positions is O(n) due to shifting
- **Linear search checks elements sequentially** with O(n) time complexity; best case is O(1), worst case is O(n)
- **Arrays excel at random access, simplicity, and cache performance** but struggle with dynamic size changes and frequent insertions/deletions
- **Common mistakes include** index out of range errors, off-by-one errors, and modifying arrays during iteration
- **Arrays are foundational** for understanding stacks, queues, heaps, hash tables, and sorting algorithms
- **Time complexity summary**: Access O(1), Search O(n), Insert/Delete O(n), Traversal O(n)
- **Master array fundamentals** before progressing to sorting algorithms, searching techniques, and advanced patterns

Arrays are the cornerstone of data structures—mastering them unlocks deeper understanding of algorithms and problem-solving strategies essential for technical interviews and real-world development.`,

    'dsa-bubble-sort': `# Bubble Sort Algorithm

## What is Bubble Sort?

**Bubble Sort** is one of the simplest sorting algorithms that works by repeatedly stepping through a list, comparing adjacent elements, and swapping them if they're in the wrong order. This process continues until the entire list is sorted.

### Definition of Bubble Sort

Bubble Sort is a **comparison-based sorting algorithm** that sorts an array by making multiple passes through it. During each pass, it compares neighboring elements and swaps them if they're out of order. After each complete pass, the largest unsorted element "bubbles up" to its correct position at the end of the array.

### Why is it Called "Bubble" Sort?

The algorithm gets its name from the way elements move through the array during sorting. Just like bubbles in water rise to the surface, larger elements gradually "bubble up" to their correct positions at the end of the array with each pass. After the first pass, the largest element reaches the last position. After the second pass, the second-largest element reaches the second-to-last position, and so on.

### Basic Idea of Repeatedly Swapping Adjacent Elements

The core concept is straightforward:
1. **Compare two adjacent elements** (side-by-side)
2. **If they're in the wrong order**, swap them
3. **Move to the next pair** and repeat
4. **Continue until no more swaps are needed**

This simple approach, while not the most efficient, is easy to understand and implement, making it an excellent introduction to sorting algorithms.

## Real-Life Analogy

### Sorting Books by Height

Imagine you have a row of books of different heights on a shelf, and you want to arrange them from shortest to tallest (left to right).

**Your strategy:**
1. Start at the left end of the shelf
2. Compare the first two books
3. If the left book is taller than the right book, swap them
4. Move one position right and compare the next pair
5. Continue until you reach the end of the shelf
6. Repeat the entire process multiple times

After each complete pass through the shelf, you'll notice that the tallest book among the unsorted books moves to its correct position at the right end. Eventually, all books will be arranged from shortest to tallest.

### Bubbles Rising to the Top in Water

Picture a glass of carbonated water with bubbles of different sizes at the bottom. When you shake the glass:

- **Larger bubbles rise faster** than smaller ones
- Each bubble compares itself with the bubble above it
- If a larger bubble is below a smaller one, they exchange positions
- **The process repeats** until all bubbles are arranged by size
- **Eventually**, the largest bubbles reach the top first

This natural phenomenon mirrors exactly how Bubble Sort works—heavier elements "sink" while lighter elements "rise" through successive comparisons and swaps.

## How Bubble Sort Works

Let's break down the Bubble Sort algorithm step-by-step:

### Compare Adjacent Elements

The algorithm starts at the beginning of the array and compares the first two elements. It then moves to the second and third elements, then third and fourth, and continues this pattern throughout the array.

**Example:**
\`\`\`
Array: [5, 1, 4, 2, 8]
Compare: 5 and 1, then 1 and 4, then 4 and 2, then 2 and 8
\`\`\`

### Swap if They Are in the Wrong Order

Whenever two adjacent elements are compared, if the left element is greater than the right element (for ascending order), they are swapped.

**Example:**
\`\`\`
Compare 5 and 1: 5 > 1, so swap → [1, 5, 4, 2, 8]
Compare 5 and 4: 5 > 4, so swap → [1, 4, 5, 2, 8]
Compare 5 and 2: 5 > 2, so swap → [1, 4, 2, 5, 8]
Compare 5 and 8: 5 < 8, no swap → [1, 4, 2, 5, 8]
\`\`\`

### Repeat for Multiple Passes

A single pass through the array doesn't guarantee it's sorted. The algorithm must make multiple passes, continuing until no swaps occur during a complete pass (meaning the array is sorted).

**Key insight:** Each pass guarantees that at least one element (the largest unsorted one) reaches its final position.

### Largest Element Moves to the End After Each Pass

This is the most important characteristic of Bubble Sort:

- **After Pass 1:** The largest element is in its correct position (last index)
- **After Pass 2:** The second-largest element is in its correct position (second-to-last index)
- **After Pass 3:** The third-largest element is in its correct position
- **And so on...**

Because of this property, we can optimize by reducing the number of comparisons in each subsequent pass—we don't need to check elements that are already in their final positions.

## Bubble Sort Algorithm (Plain English)

Here's the Bubble Sort algorithm explained in simple steps:

1. **Start with the unsorted array**
   - Set a variable for the array length
   - Prepare to make multiple passes through the array

2. **For each pass through the array:**
   - Start at the first element (index 0)
   - Set a flag to track if any swaps occur

3. **For each pair of adjacent elements:**
   - Compare the current element with the next element
   - If the current element is greater than the next element:
     - Swap them
     - Mark that a swap occurred
   - Move to the next pair

4. **After completing a pass:**
   - Check if any swaps were made
   - If no swaps occurred, the array is sorted—stop
   - If swaps occurred, start a new pass
   - Each new pass can ignore the last elements (already sorted)

5. **Repeat until no swaps occur**
   - This indicates all elements are in their correct positions
   - The array is now completely sorted

6. **Return the sorted array**

## Bubble Sort Implementation in Python

Here's a clean, straightforward implementation of Bubble Sort:

\`\`\`python
def bubble_sort(arr):
    n = len(arr)
    
    # Outer loop for number of passes
    for i in range(n):
        # Inner loop for comparisons in each pass
        for j in range(0, n - i - 1):
            # Compare adjacent elements
            if arr[j] > arr[j + 1]:
                # Swap if they're in wrong order
                arr[j], arr[j + 1] = arr[j + 1], arr[j]

# Example usage
numbers = [5, 1, 4, 2, 8]
bubble_sort(numbers)
print(numbers)  # Output: [1, 2, 4, 5, 8]
\`\`\`

### Explanation of Each Component

**Outer Loop (\`for i in range(n)\`):**

The outer loop controls the number of passes through the array. In the worst case, we need \`n-1\` passes for an array of size \`n\`. Each pass ensures at least one element reaches its correct position.

- **Pass 1 (i=0):** Largest element moves to the end
- **Pass 2 (i=1):** Second-largest element moves to correct position
- **Pass 3 (i=2):** Third-largest element moves to correct position
- And so on...

**Inner Loop (\`for j in range(0, n - i - 1)\`):**

The inner loop handles the actual comparisons and swaps within a single pass. It compares adjacent elements and swaps them if needed.

- **j** represents the current index being compared with \`j+1\`
- We compare \`arr[j]\` with \`arr[j+1]\`
- Each iteration moves one position to the right

**Swap Logic (\`arr[j], arr[j + 1] = arr[j + 1], arr[j]\`):**

Python's elegant tuple unpacking allows us to swap two elements in a single line:

\`\`\`python
# Traditional swap (requires temporary variable)
temp = arr[j]
arr[j] = arr[j + 1]
arr[j + 1] = temp

# Python's swap (no temporary variable needed)
arr[j], arr[j + 1] = arr[j + 1], arr[j]
\`\`\`

The condition \`if arr[j] > arr[j + 1]\` ensures we only swap when the left element is greater than the right element (for ascending order).

**Why \`n - i - 1\` is Used:**

This is a crucial optimization that prevents unnecessary comparisons:

- **\`n\`**: Total number of elements
- **\`i\`**: Current pass number (how many elements are already sorted)
- **\`-1\`**: Prevents going out of bounds (we compare \`j\` with \`j+1\`)

**Breakdown:**
- **Pass 1 (i=0):** Compare up to index \`n-0-1 = n-1\` (all elements)
- **Pass 2 (i=1):** Compare up to index \`n-1-1 = n-2\` (largest already sorted)
- **Pass 3 (i=2):** Compare up to index \`n-2-1 = n-3\` (two largest already sorted)

Each pass can ignore more elements because they're already in their final positions.

## Dry Run of Bubble Sort

Let's manually execute Bubble Sort step-by-step on the array \`[5, 1, 4, 2, 8]\` to understand how it works.

### Initial Array
\`\`\`
[5, 1, 4, 2, 8]
\`\`\`

### Pass 1 (i=0)

**Comparing indices 0 and 1:**
- Compare 5 and 1: 5 > 1, **swap**
- Array becomes: \`[1, 5, 4, 2, 8]\`

**Comparing indices 1 and 2:**
- Compare 5 and 4: 5 > 4, **swap**
- Array becomes: \`[1, 4, 5, 2, 8]\`

**Comparing indices 2 and 3:**
- Compare 5 and 2: 5 > 2, **swap**
- Array becomes: \`[1, 4, 2, 5, 8]\`

**Comparing indices 3 and 4:**
- Compare 5 and 8: 5 < 8, **no swap**
- Array remains: \`[1, 4, 2, 5, 8]\`

**Result after Pass 1:** \`[1, 4, 2, 5, 8]\`

**Key observation:** The largest element (8) is now in its correct final position at the end. We don't need to touch it again.

### Pass 2 (i=1)

**Comparing indices 0 and 1:**
- Compare 1 and 4: 1 < 4, **no swap**
- Array remains: \`[1, 4, 2, 5, 8]\`

**Comparing indices 1 and 2:**
- Compare 4 and 2: 4 > 2, **swap**
- Array becomes: \`[1, 2, 4, 5, 8]\`

**Comparing indices 2 and 3:**
- Compare 4 and 5: 4 < 5, **no swap**
- Array remains: \`[1, 2, 4, 5, 8]\`

**Note:** We only compare up to index 3 (n-i-1 = 5-1-1 = 3) because index 4 (value 8) is already sorted.

**Result after Pass 2:** \`[1, 2, 4, 5, 8]\`

**Key observation:** The second-largest element (5) is now in its correct position. Both 5 and 8 are sorted.

### Pass 3 (i=2)

**Comparing indices 0 and 1:**
- Compare 1 and 2: 1 < 2, **no swap**
- Array remains: \`[1, 2, 4, 5, 8]\`

**Comparing indices 1 and 2:**
- Compare 2 and 4: 2 < 4, **no swap**
- Array remains: \`[1, 2, 4, 5, 8]\`

**Note:** We only compare up to index 2 (n-i-1 = 5-2-1 = 2) because indices 3 and 4 are already sorted.

**Result after Pass 3:** \`[1, 2, 4, 5, 8]\`

**Key observation:** No swaps occurred during this pass! The array is completely sorted. In an optimized version, we would stop here.

### Pass 4 (i=3)

**Comparing indices 0 and 1:**
- Compare 1 and 2: 1 < 2, **no swap**
- Array remains: \`[1, 2, 4, 5, 8]\`

**Result after Pass 4:** \`[1, 2, 4, 5, 8]\`

### Pass 5 (i=4)

No comparisons are made because \`n - i - 1 = 5 - 4 - 1 = 0\`, so the inner loop doesn't execute.

### Final Sorted Array
\`\`\`
[1, 2, 4, 5, 8]
\`\`\`

### How the Largest Element Moves to the End

Let's track the largest element (8) specifically:

**Initial position:** Index 4
**Pass 1:** 
- 8 is already at the end, so it doesn't move
- But conceptually, any large element would "bubble" to the right through swaps

Let's track element 5 instead:

**Initial position:** Index 0
**Pass 1:**
- Position 0: Swapped with 1 → moves to position 1
- Position 1: Swapped with 4 → moves to position 2
- Position 2: Swapped with 2 → moves to position 3
- Position 3: Compared with 8 → stays at position 3

The larger elements consistently move rightward through comparisons and swaps, eventually settling in their correct positions.

## Optimized Bubble Sort

The basic Bubble Sort implementation has a significant inefficiency: it continues making passes even after the array is sorted. We can optimize this using an **early stopping mechanism**.

### Optimized Implementation

\`\`\`python
def bubble_sort_optimized(arr):
    n = len(arr)
    
    for i in range(n):
        swapped = False  # Flag to track if any swap occurred
        
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True  # Mark that a swap occurred
        
        # If no swaps occurred, array is sorted
        if not swapped:
            break

# Example usage
numbers = [5, 1, 4, 2, 8]
bubble_sort_optimized(numbers)
print(numbers)  # Output: [1, 2, 4, 5, 8]
\`\`\`

### Purpose of the \`swapped\` Flag

The \`swapped\` variable is a boolean flag that tracks whether any swaps occurred during a pass:

**Before each pass:**
- Initialize \`swapped = False\`
- Assume the array might already be sorted

**During the pass:**
- If any swap occurs, set \`swapped = True\`
- This indicates the array wasn't sorted yet

**After the pass:**
- Check the \`swapped\` flag
- If \`swapped\` is still \`False\`, no swaps were made
- This means the array is completely sorted
- We can **break out early** and avoid unnecessary passes

### Why Optimization Improves Best-Case Performance

**Unoptimized Version:**
- Always makes \`n-1\` passes regardless of whether the array is sorted
- Even for an already sorted array, it checks every pair multiple times
- **Best-case time complexity:** O(n²)

**Optimized Version:**
- If the array is already sorted or becomes sorted early:
  - Makes only **one pass** without any swaps
  - Detects the sorted state and stops immediately
- **Best-case time complexity:** O(n)

**Example with a nearly sorted array:**

\`\`\`python
arr = [1, 2, 3, 5, 4]  # Only last two elements need swapping
\`\`\`

**Unoptimized:** Makes all 4 passes (n-1 = 4)

**Optimized:**
- **Pass 1:** Swaps 5 and 4 → \`[1, 2, 3, 4, 5]\`
- **Pass 2:** No swaps occur → detects sorted state and stops

The optimized version completes in just 2 passes instead of 4, significantly reducing unnecessary work.

### Real-World Impact

The optimization is particularly effective for:
- **Already sorted arrays:** O(n) instead of O(n²)
- **Nearly sorted arrays:** Fewer passes needed
- **Large datasets with few elements out of place:** Dramatic speedup

However, even with this optimization, Bubble Sort remains inefficient for large, randomly ordered datasets compared to algorithms like Quick Sort or Merge Sort.

## Time and Space Complexity

Understanding the performance characteristics of Bubble Sort helps you make informed decisions about when to use it.

### Best Case: O(n)

**Scenario:** The array is already sorted.

**What happens:**
- The optimized version makes one complete pass through the array
- No swaps occur during this pass
- The algorithm detects the sorted state and terminates
- Total comparisons: \`n-1\` (one comparison between each adjacent pair)

**Example:**
\`\`\`python
arr = [1, 2, 3, 4, 5]  # Already sorted
# One pass with n-1 comparisons → O(n)
\`\`\`

**Note:** The unoptimized version has a best case of O(n²) because it doesn't stop early.

### Average Case: O(n²)

**Scenario:** Elements are in random order.

**What happens:**
- Multiple passes are required
- Each pass involves multiple comparisons and swaps
- On average, we need approximately \`n/2\` passes
- Each pass does approximately \`n\` comparisons

**Mathematical breakdown:**
- Total comparisons ≈ \`n × n/2 = n²/2\`
- Dropping constants: O(n²)

**Example:**
\`\`\`python
arr = [3, 1, 4, 2, 5]  # Random order
# Multiple passes with n² operations → O(n²)
\`\`\`

### Worst Case: O(n²)

**Scenario:** The array is in reverse order (descending when you want ascending).

**What happens:**
- Each element must move from its starting position to the opposite end
- Maximum number of swaps required
- Need \`n-1\` passes
- Each pass requires many comparisons

**Mathematical breakdown:**
- **Pass 1:** \`n-1\` comparisons
- **Pass 2:** \`n-2\` comparisons
- **Pass 3:** \`n-3\` comparisons
- ...
- **Total:** \`(n-1) + (n-2) + ... + 1 = n(n-1)/2 = O(n²)\`

**Example:**
\`\`\`python
arr = [5, 4, 3, 2, 1]  # Reverse sorted
# Maximum passes and swaps → O(n²)
\`\`\`

### Space Complexity: O(1)

**Bubble Sort is an in-place sorting algorithm:**

- **Auxiliary space:** Only a constant amount of extra memory is used
- **Variables:** \`i\`, \`j\`, \`swapped\`, and temporary variables for swapping
- **No additional arrays:** Sorting happens within the original array
- **Memory usage:** Does not depend on input size

**Comparison with other algorithms:**
- **Merge Sort:** O(n) space (needs additional arrays)
- **Quick Sort:** O(log n) space (recursive call stack)
- **Bubble Sort:** O(1) space (only a few variables)

This makes Bubble Sort memory-efficient, though its time complexity usually outweighs this advantage.

### Complexity Summary Table

| Scenario | Time Complexity | Explanation |
|----------|----------------|-------------|
| Best Case | O(n) | Already sorted array (optimized version) |
| Average Case | O(n²) | Random order array |
| Worst Case | O(n²) | Reverse sorted array |
| Space | O(1) | In-place sorting, constant extra space |

## Is Bubble Sort Stable?

**Yes, Bubble Sort is a stable sorting algorithm.**

### What Stability Means

**Stability** in sorting refers to maintaining the relative order of elements with equal values. If two elements have the same value, a stable sort ensures they appear in the same order in the sorted output as they did in the input.

**Example:**

Consider an array of students with their grades:
\`\`\`python
[(Alice, 90), (Bob, 85), (Charlie, 90), (Diana, 85)]
\`\`\`

When sorting by grade (ascending), a stable sort produces:
\`\`\`python
[(Bob, 85), (Diana, 85), (Alice, 90), (Charlie, 90)]
\`\`\`

Notice:
- Among students with grade 85: Bob appears before Diana (same as input)
- Among students with grade 90: Alice appears before Charlie (same as input)

An **unstable sort** might produce:
\`\`\`python
[(Diana, 85), (Bob, 85), (Charlie, 90), (Alice, 90)]
# Order changed among equal elements!
\`\`\`

### Why Bubble Sort is Stable

Bubble Sort maintains stability because of its comparison condition:

\`\`\`python
if arr[j] > arr[j + 1]:  # Only swap if strictly greater
    arr[j], arr[j + 1] = arr[j + 1], arr[j]
\`\`\`

**Key points:**

**Strict inequality (\`>\`):** 
- Swaps occur only when \`arr[j]\` is **strictly greater than** \`arr[j + 1]\`
- When elements are equal (\`arr[j] == arr[j + 1]\`), **no swap happens**
- Equal elements remain in their original relative positions

**Adjacent comparisons:**
- Only adjacent elements are compared and swapped
- This prevents any element from "jumping over" an equal element
- The relative order of equal elements is preserved throughout

**Example demonstrating stability:**

\`\`\`python
# Array with duplicate values (marked with subscripts for tracking)
arr = [3₁, 2, 3₂, 1]

# After sorting:
arr = [1, 2, 3₁, 3₂]
# Notice: 3₁ still comes before 3₂ (stable)
\`\`\`

### When Stability Matters

Stability is crucial in scenarios like:

**Multi-level sorting:**
- Sort by name, then by age
- Stability preserves the name order within each age group

**Data with timestamps:**
- Sort events by priority
- Among same-priority events, maintain chronological order

**Database queries:**
- \`ORDER BY priority, timestamp\`
- Stability ensures secondary sort order is preserved

## When Should You Use Bubble Sort?

While Bubble Sort is rarely used in production code, there are specific scenarios where it's appropriate:

### Educational Purposes

**Best use case for Bubble Sort:**

**Teaching sorting concepts:**
- Simplest sorting algorithm to understand
- Clear visualization of how sorting works
- Introduces comparison-based sorting
- Demonstrates the concept of passes and swaps

**Introduction to algorithm analysis:**
- Easy to analyze time and space complexity
- Shows difference between best, average, and worst cases
- Demonstrates the importance of optimizations

**First algorithm for beginners:**
- Minimal code complexity
- No recursion or advanced concepts needed
- Builds confidence before tackling harder algorithms

### Small Datasets

For arrays with **fewer than 10-20 elements**, Bubble Sort performs adequately:

**Why it's acceptable:**
- O(n²) complexity doesn't significantly impact small inputs
- Simple code means less chance of bugs
- No overhead from complex algorithms

**Example scenario:**
\`\`\`python
# Sorting user input of 5 numbers
user_numbers = [3, 1, 4, 1, 5]
bubble_sort(user_numbers)  # Fast enough for 5 elements
\`\`\`

**Performance comparison:**
- **5 elements:** Bubble Sort ≈ Quick Sort (both very fast)
- **100 elements:** Quick Sort starts winning noticeably
- **10,000 elements:** Quick Sort is dramatically faster

### Nearly Sorted Arrays

When an array is **almost sorted** with only a few elements out of place:

**Why Bubble Sort excels here:**
- Optimized version detects sorted state quickly
- Requires very few passes
- Can achieve close to O(n) performance

**Example scenarios:**

**Real-time data stream:**
\`\`\`python
# Most data arrives in order, occasional outliers
data = [1, 2, 3, 5, 4, 6, 7, 8]  # Only 5 and 4 swapped
# Bubble sort completes in 2-3 passes
\`\`\`

**Maintaining sorted order:**
\`\`\`python
# Adding new elements to an already sorted list
sorted_list = [1, 2, 4, 5, 6]
sorted_list.append(3)  # Now [1, 2, 4, 5, 6, 3]
bubble_sort_optimized(sorted_list)  # Quick fix
\`\`\`

**Live sorting:**
- Updating a leaderboard with new scores
- Minor changes to a mostly sorted list
- Incremental sorting during data entry

### When Simplicity Matters Most

**Embedded systems with memory constraints:**
- O(1) space complexity is crucial
- Code size matters more than speed
- Simple logic reduces bugs in critical systems

**Prototyping and quick scripts:**
- Need a working sort immediately
- Performance isn't critical for the task
- Clarity is more important than optimization

## Why Bubble Sort is NOT Used in Real Projects

Despite its simplicity, Bubble Sort is rarely used in production code for several compelling reasons:

### Inefficiency for Large Inputs

**The quadratic time complexity becomes prohibitive:**

**Performance degradation:**

| Array Size | Bubble Sort Operations | Quick Sort Operations | Time Ratio |
|------------|----------------------|---------------------|------------|
| 100 | ~10,000 | ~700 | 14x slower |
| 1,000 | ~1,000,000 | ~10,000 | 100x slower |
| 10,000 | ~100,000,000 | ~130,000 | 770x slower |
| 100,000 | ~10,000,000,000 | ~1,660,000 | 6000x slower |

**Real-world impact:**
- **Small dataset (100 elements):** Bubble Sort takes milliseconds → acceptable
- **Medium dataset (10,000 elements):** Bubble Sort takes seconds → noticeable lag
- **Large dataset (100,000+ elements):** Bubble Sort takes minutes → unacceptable

**Example scenario:**
\`\`\`python
# Sorting a user database
users = load_users()  # 100,000 users

# Bubble Sort: ~30 minutes ❌
bubble_sort(users)

# Quick Sort: ~0.3 seconds ✅
quick_sort(users)
\`\`\`

### Better Alternatives Exist

Modern applications use significantly more efficient algorithms:

**Quick Sort:**
- **Average case:** O(n log n)
- **Space:** O(log n) for recursion
- **Usage:** Default in many languages (Python's \`sorted()\`, Java's \`Arrays.sort()\` for primitives)
- **Performance:** 100-1000x faster than Bubble Sort on large datasets

**Merge Sort:**
- **Time complexity:** O(n log n) guaranteed
- **Stable:** Maintains relative order of equal elements
- **Usage:** Python's \`sorted()\` uses Timsort (hybrid of Merge Sort and Insertion Sort)
- **Advantage:** Predictable performance, no worst-case O(n²)

**Heap Sort:**
- **Time complexity:** O(n log n)
- **Space:** O(1) in-place sorting
- **Usage:** When guaranteed performance and minimal memory are both needed

**Insertion Sort:**
- **Better for small/nearly sorted:** More efficient than Bubble Sort even in simple cases
- **Practical:** Used in Timsort for small subarrays
- **Performance:** Fewer comparisons and swaps than Bubble Sort

**Why professionals don't use Bubble Sort:**
- Library implementations are highly optimized
- O(n log n) algorithms are battle-tested and reliable
- No benefit to implementing Bubble Sort yourself
- Maintenance burden for no performance gain

### Industry Standards

**Production code expectations:**
- **Performance:** Must handle large datasets efficiently
- **Reliability:** Must have predictable behavior
- **Maintainability:** Team members understand standard algorithms
- **Testing:** Well-tested library implementations are preferred

**Code review red flag:**
\`\`\`python
# This would be questioned in code review:
def sort_transactions(transactions):
    bubble_sort(transactions)  # Why not use sorted()?
\`\`\`

**Professional approach:**
\`\`\`python
def sort_transactions(transactions):
    return sorted(transactions, key=lambda t: t.amount)
# Uses Timsort: O(n log n), stable, optimized
\`\`\`

## Interview Tips

Bubble Sort frequently appears in technical interviews, not because it's practical, but because it tests fundamental understanding.

### Why Interviewers Still Ask Bubble Sort

**Testing core programming concepts:**

**Understanding of loops:**
- Can you write nested loops correctly?
- Do you understand loop boundaries?
- Can you avoid off-by-one errors?

**Array manipulation:**
- Comfortable accessing array elements by index
- Understanding of array indexing and bounds
- Ability to swap elements correctly

**Algorithm thinking:**
- Can you explain your approach clearly?
- Do you understand what the algorithm does?
- Can you trace through code execution?

**Optimization awareness:**
- Do you recognize opportunities for improvement?
- Can you implement the early-stopping optimization?
- Do you think about best vs. worst cases?

**Communication skills:**
- Can you explain the algorithm to a non-technical person?
- Do you use clear analogies and examples?
- Can you walk through a dry run step-by-step?

### What Concepts They Test

**Interviewers use Bubble Sort to evaluate:**

**Problem decomposition:**
- Breaking down the sorting problem into smaller steps
- Understanding the relationship between passes and comparisons
- Recognizing when the algorithm should terminate

**Complexity analysis:**
- Calculating time complexity for nested loops
- Explaining best, average, and worst cases
- Understanding space complexity

**Attention to detail:**
- Correct loop bounds (\`n - i - 1\`)
- Proper comparison operators (\`>\` vs \`>=\`)
- Edge cases (empty array, single element, already sorted)

**Optimization thinking:**
- Recognizing unnecessary work
- Implementing the swapped flag optimization
- Explaining the performance improvement

### How to Explain It Confidently in Interviews

**Step 1: Start with a clear definition**

"Bubble Sort is a simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they're in the wrong order. It's called Bubble Sort because larger elements 'bubble up' to the end with each pass."

**Step 2: Use a visual example**

"Let me walk through an example with [5, 1, 4, 2, 8]:
- First pass: compare and swap adjacent elements, largest (8) moves to the end
- Second pass: second-largest (5) moves to its position
- Continue until sorted"

**Step 3: Explain the code structure**

"The algorithm uses two nested loops:
- Outer loop controls the number of passes
- Inner loop handles comparisons within each pass
- We use \`n - i - 1\` because elements at the end are already sorted"

**Step 4: Discuss complexity**

"Time complexity is O(n²) in average and worst cases because of nested loops. Best case can be O(n) with optimization. Space complexity is O(1) since we sort in-place."

**Step 5: Mention the optimization**

"We can optimize by adding a flag to detect if the array is already sorted. If no swaps occur during a pass, we can stop early. This improves best-case performance to O(n)."

**Step 6: Acknowledge limitations**

"While Bubble Sort is great for learning, it's rarely used in practice due to O(n²) complexity. Algorithms like Quick Sort or Merge Sort are preferred for larger datasets."

**Pro tip:** Draw the array and show swaps visually if you have a whiteboard. Interviewers appreciate visual explanations.

## Common Mistakes

### Incorrect Loop Bounds

**Mistake 1: Going out of bounds**

\`\`\`python
# WRONG: j goes up to n-1, but we access j+1
for j in range(n - i):  # When j = n-i-1, j+1 = n-i (out of bounds!)
    if arr[j] > arr[j + 1]:
        # Error when j+1 exceeds array length
\`\`\`

**Correct:**
\`\`\`python
# RIGHT: Stop at n-i-1 so j+1 is always valid
for j in range(n - i - 1):
    if arr[j] > arr[j + 1]:
        arr[j], arr[j + 1] = arr[j + 1], arr[j]
\`\`\`

**Mistake 2: Not accounting for sorted elements**

\`\`\`python
# WRONG: Checking already sorted elements
for i in range(n):
    for j in range(n - 1):  # Should be n-i-1
        if arr[j] > arr[j + 1]:
            arr[j], arr[j + 1] = arr[j + 1], arr[j]
# Works but wastes time on sorted elements
\`\`\`

**Mistake 3: Off-by-one in outer loop**

\`\`\`python
# WRONG: One extra unnecessary pass
for i in range(n + 1):  # Should be n or n-1
    for j in range(n - i - 1):
        # ...
\`\`\`

### Forgetting Optimization

**Mistake: Not implementing early stopping**

\`\`\`python
# INEFFICIENT: Always makes n passes
def bubble_sort_slow(arr):
    n = len(arr)
    for i in range(n):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]

# If array is already sorted, still does O(n²) work
arr = [1, 2, 3, 4, 5]
bubble_sort_slow(arr)  # Wastes time!
\`\`\`

**Better: Add the swapped flag**

\`\`\`python
def bubble_sort_optimized(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:  # Stop early if sorted
            break
\`\`\`

### Confusing Passes and Swaps

**Mistake: Misunderstanding what each loop does**

**Wrong thinking:**
"The inner loop does passes, the outer loop does swaps"

**Correct understanding:**
- **Outer loop:** Controls the number of **passes** through the array
- **Inner loop:** Performs **comparisons and swaps** within a single pass
- Each **pass** involves multiple **swaps**

**Example clarification:**

\`\`\`python
def bubble_sort(arr):
    n = len(arr)
    
    # This is ONE PASS per iteration
    for i in range(n):
        print(f"Starting pass {i + 1}")
        
        # This does MULTIPLE SWAPS per pass
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                print(f"  Swapping {arr[j]} and {arr[j + 1]}")
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
\`\`\`

**Another confusion: Thinking one swap sorts the array**

Remember: Each pass only guarantees one element reaches its final position. Multiple passes are needed for complete sorting.

### Other Common Errors

**Mistake 4: Wrong comparison operator**

\`\`\`python
# WRONG: >= instead of >
if arr[j] >= arr[j + 1]:  # Makes algorithm unstable
    arr[j], arr[j + 1] = arr[j + 1], arr[j]
# Equal elements get swapped, breaking stability
\`\`\`

**Mistake 5: Not handling edge cases**

\`\`\`python
# PROBLEM: Doesn't handle empty or single-element arrays
def bubble_sort(arr):
    n = len(arr)  # Could be 0 or 1
    # For n=0 or n=1, the loops work fine (no iterations)
    # But good to be explicit:
    if n <= 1:
        return  # Already "sorted"
\`\`\`

## Key Takeaways

- **Bubble Sort** is a simple comparison-based sorting algorithm that repeatedly compares adjacent elements and swaps them if they're in the wrong order
- **Named "Bubble"** because larger elements gradually "bubble up" to their correct positions at the end of the array
- **Algorithm uses nested loops**: outer loop for passes, inner loop for comparisons and swaps within each pass
- **Time complexity** is O(n²) for average and worst cases, but can be optimized to O(n) for best case (already sorted)
- **Space complexity** is O(1) since it sorts in-place with only constant extra memory
- **Stable sorting algorithm**: maintains relative order of equal elements due to strict \`>\` comparison
- **Optimization** with a \`swapped\` flag enables early termination when the array becomes sorted
- **Best for**: educational purposes, very small datasets (< 20 elements), and nearly sorted arrays
- **Not used in production**: O(n²) complexity makes it too slow for large datasets compared to O(n log n) algorithms
- **Common mistakes**: incorrect loop bounds (\`n-i-1\`), forgetting optimization, confusing passes with swaps
- **Interview importance**: tests understanding of loops, arrays, algorithm analysis, and optimization thinking
- **Practical alternatives**: Quick Sort, Merge Sort, Heap Sort, or language built-ins (Python's \`sorted()\`) are preferred for real applications

## What's Next?

Now that you understand Bubble Sort, you're ready to learn more efficient sorting algorithms:

### Selection Sort

**What it is:**
- Another simple sorting algorithm that divides the array into sorted and unsorted portions
- Repeatedly finds the minimum element from the unsorted portion and places it at the beginning

**How it improves over Bubble Sort:**
- **Fewer swaps**: Selection Sort performs O(n) swaps compared to Bubble Sort's O(n²) swaps
- **More predictable**: Always makes the same number of comparisons regardless of input order
- **Still O(n²)**: Time complexity remains quadratic, but fewer writes make it faster on some hardware

**Key difference:**
- **Bubble Sort**: Moves elements one position at a time through adjacent swaps
- **Selection Sort**: Finds the correct element and places it directly in position (fewer swaps)

**When you'll use Selection Sort:**
- When write operations are expensive (e.g., writing to flash memory)
- When you want predictable behavior regardless of input
- As another fundamental algorithm for learning purposes

**What you'll learn:**
- How to maintain sorted and unsorted portions
- The concept of finding and selecting minimum elements
- Comparing simple sorting algorithms
- Understanding trade-offs between comparisons and swaps

Continue to the next lesson to master Selection Sort and build toward understanding more advanced O(n log n) algorithms like Merge Sort and Quick Sort!`,

    'dsa-selection-sort': `# DSA Selection Sort

## What is Selection Sort?

**Selection Sort** is a simple comparison-based sorting algorithm that divides the input array into two parts: a sorted portion and an unsorted portion. It repeatedly selects the smallest (or largest) element from the unsorted portion and moves it to the end of the sorted portion.

The algorithm maintains two subarrays:
1. **Sorted subarray**: Built up from left to right at the beginning of the array
2. **Unsorted subarray**: The remaining elements that need to be sorted

In each iteration, Selection Sort finds the minimum element from the unsorted portion and swaps it with the first unsorted element, effectively growing the sorted portion by one element.

## Real Life Example

### Sorting Playing Cards

Imagine you have a hand of unsorted playing cards spread face-up on a table:

1. **Scan all cards** to find the smallest one
2. **Pick it up** and place it at the leftmost position
3. **Scan the remaining cards** to find the next smallest
4. **Place it next** to the first card
5. **Repeat** until all cards are sorted

You're essentially "selecting" the minimum card each time and building a sorted pile from left to right.

### Arranging Students by Height

A teacher wants to arrange students in a line from shortest to tallest:

1. **Look at all students**, find the shortest one
2. **Move them** to the first position in line
3. **Look at remaining students**, find the next shortest
4. **Move them** to the second position
5. **Continue** until everyone is in order

The teacher is "selecting" the next shortest student each time.

## How it Works

### Step-by-Step Process

1. **Start with the entire array as unsorted**
2. **Find the minimum element** in the unsorted portion
3. **Swap it** with the first element of the unsorted portion
4. **Move the boundary** between sorted and unsorted portions one position right
5. **Repeat** until the entire array is sorted

### Visual Representation

\`\`\`
Initial: [64, 25, 12, 22, 11]
         |__________________|
              unsorted

Pass 1: Find min (11), swap with first
        [11, 25, 12, 22, 64]
         |   |_____________|
       sorted   unsorted

Pass 2: Find min (12), swap with first unsorted
        [11, 12, 25, 22, 64]
         |_____|  |________|
         sorted   unsorted

Pass 3: Find min (22), swap with first unsorted
        [11, 12, 22, 25, 64]
         |________|  |_____|
          sorted    unsorted

Pass 4: Find min (25), already in position
        [11, 12, 22, 25, 64]
         |____________|  |_|
             sorted    unsorted

Final:  [11, 12, 22, 25, 64]
         |__________________|
              sorted
\`\`\`

## Python Implementation

### Basic Implementation

\`\`\`python
def selection_sort(arr):
    n = len(arr)
    
    # Traverse through all array elements
    for i in range(n):
        # Find the minimum element in unsorted portion
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        
        # Swap the found minimum with the first unsorted element
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    
    return arr

# Example usage
numbers = [64, 25, 12, 22, 11]
selection_sort(numbers)
print(numbers)  # Output: [11, 12, 22, 25, 64]
\`\`\`

### Implementation with Step Tracking

\`\`\`python
def selection_sort_verbose(arr):
    n = len(arr)
    
    for i in range(n):
        print(f"Pass {i + 1}: Looking for minimum in {arr[i:]}")
        
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        
        if min_idx != i:
            print(f"  Swapping {arr[i]} with {arr[min_idx]}")
            arr[i], arr[min_idx] = arr[min_idx], arr[i]
        else:
            print(f"  {arr[i]} is already in correct position")
        
        print(f"  Array after pass: {arr}")
        print(f"  Sorted portion: {arr[:i+1]}")
        print()
    
    return arr

# Example
numbers = [64, 25, 12, 22, 11]
selection_sort_verbose(numbers)
\`\`\`

## Dry Run

Let's trace through Selection Sort with array \`[64, 25, 12, 22, 11]\`:

### Pass 1 (i = 0)

**Unsorted portion**: \`[64, 25, 12, 22, 11]\`

- Compare 25 < 64? Yes → min_idx = 1
- Compare 12 < 25? Yes → min_idx = 2
- Compare 22 < 12? No → min_idx = 2
- Compare 11 < 12? Yes → min_idx = 4

**Minimum found**: 11 at index 4
**Swap**: arr[0] ↔ arr[4]
**Result**: \`[11, 25, 12, 22, 64]\`

### Pass 2 (i = 1)

**Unsorted portion**: \`[25, 12, 22, 64]\`

- Compare 12 < 25? Yes → min_idx = 2
- Compare 22 < 12? No → min_idx = 2
- Compare 64 < 12? No → min_idx = 2

**Minimum found**: 12 at index 2
**Swap**: arr[1] ↔ arr[2]
**Result**: \`[11, 12, 25, 22, 64]\`

### Pass 3 (i = 2)

**Unsorted portion**: \`[25, 22, 64]\`

- Compare 22 < 25? Yes → min_idx = 3
- Compare 64 < 22? No → min_idx = 3

**Minimum found**: 22 at index 3
**Swap**: arr[2] ↔ arr[3]
**Result**: \`[11, 12, 22, 25, 64]\`

### Pass 4 (i = 3)

**Unsorted portion**: \`[25, 64]\`

- Compare 64 < 25? No → min_idx = 3

**Minimum found**: 25 at index 3 (already in position)
**No swap needed**
**Result**: \`[11, 12, 22, 25, 64]\`

### Final Result

\`\`\`
[11, 12, 22, 25, 64]
\`\`\`

## Time & Space Complexity

### Time Complexity

| Case | Complexity | Explanation |
|------|------------|-------------|
| Best | O(n²) | Always scans entire unsorted portion |
| Average | O(n²) | Same number of comparisons |
| Worst | O(n²) | Same number of comparisons |

**Why O(n²)?**

The number of comparisons:
- Pass 1: n-1 comparisons
- Pass 2: n-2 comparisons
- Pass 3: n-3 comparisons
- ...
- Pass n-1: 1 comparison

Total: (n-1) + (n-2) + ... + 1 = n(n-1)/2 = O(n²)

**Key insight**: Unlike Bubble Sort, Selection Sort has **no best case optimization**. It always makes the same number of comparisons regardless of input order.

### Space Complexity

**O(1)** — Selection Sort is an in-place algorithm that only uses a constant amount of extra memory for:
- Loop variables (i, j)
- min_idx variable
- Temporary swap variable

### Number of Swaps

Selection Sort makes at most **n-1 swaps** (one per pass), compared to Bubble Sort which can make up to O(n²) swaps. This makes Selection Sort preferable when **write operations are expensive**.

## Interview Notes

### Why Interviewers Ask About Selection Sort

1. **Tests understanding** of maintaining sorted/unsorted portions
2. **Compares** with other O(n²) algorithms
3. **Evaluates** understanding of swap efficiency
4. **Checks** knowledge of stability in sorting

### Key Points to Mention

**Advantages:**
- Simple to understand and implement
- Makes minimum number of swaps: O(n)
- Performs well when memory writes are costly
- Works in-place with O(1) extra space

**Disadvantages:**
- O(n²) time complexity even for sorted arrays
- Not stable (can change relative order of equal elements)
- Not adaptive (doesn't benefit from partially sorted input)

### When to Use Selection Sort

✅ **Use when:**
- Memory writes are expensive (flash memory, EEPROM)
- You need guaranteed O(n) swaps
- Working with very small datasets (n < 20)
- Teaching/learning sorting concepts

❌ **Avoid when:**
- Dataset is large
- Array might be partially sorted
- Stability is required

### Selection Sort vs Bubble Sort

| Aspect | Selection Sort | Bubble Sort |
|--------|---------------|-------------|
| Swaps | O(n) | O(n²) |
| Comparisons | O(n²) | O(n²) |
| Best Case | O(n²) | O(n) optimized |
| Stable | No | Yes |
| Adaptive | No | Yes (with flag) |

## Common Mistakes

### 1. Wrong Inner Loop Range

\`\`\`python
# WRONG: Starting inner loop at i instead of i + 1
for j in range(i, n):  # Compares element with itself
    if arr[j] < arr[min_idx]:
        min_idx = j

# CORRECT: Start from i + 1
for j in range(i + 1, n):
    if arr[j] < arr[min_idx]:
        min_idx = j
\`\`\`

### 2. Swapping Inside Inner Loop

\`\`\`python
# WRONG: Swapping every time we find a smaller element
for j in range(i + 1, n):
    if arr[j] < arr[min_idx]:
        min_idx = j
        arr[i], arr[j] = arr[j], arr[i]  # Wrong!

# CORRECT: Swap only after finding minimum
for j in range(i + 1, n):
    if arr[j] < arr[min_idx]:
        min_idx = j
arr[i], arr[min_idx] = arr[min_idx], arr[i]  # Swap once
\`\`\`

### 3. Unnecessary Swap

\`\`\`python
# INEFFICIENT: Always swapping even when element is in place
arr[i], arr[min_idx] = arr[min_idx], arr[i]

# OPTIMIZED: Skip swap if element is already in position
if min_idx != i:
    arr[i], arr[min_idx] = arr[min_idx], arr[i]
\`\`\`

### 4. Assuming Selection Sort is Stable

\`\`\`python
# Selection Sort is NOT stable!
# Example: [(5, 'a'), (3, 'b'), (5, 'c'), (2, 'd')]
# After sorting by first element:
# Could become: [(2, 'd'), (3, 'b'), (5, 'c'), (5, 'a')]
# Notice: (5, 'a') and (5, 'c') changed relative order
\`\`\`

## Key Takeaways

- **Selection Sort** divides array into sorted and unsorted portions, repeatedly finding the minimum from unsorted and placing it at the end of sorted
- **Time Complexity** is O(n²) for all cases — no optimization possible like Bubble Sort
- **Space Complexity** is O(1) — sorts in-place with constant extra memory
- **Makes only O(n) swaps** — significantly fewer than Bubble Sort's O(n²)
- **Not stable** — relative order of equal elements may change
- **Not adaptive** — doesn't benefit from partially sorted input
- **Best use case**: when memory writes are expensive (flash memory, EEPROM)
- **Simple to implement** — good for educational purposes and small datasets
- **Interview tip**: Compare with Bubble Sort and explain the swap efficiency trade-off`,

    'dsa-insertion-sort': `# DSA Insertion Sort

## What is Insertion Sort?

**Insertion Sort** is a simple, intuitive sorting algorithm that builds the final sorted array one element at a time. It works similarly to how you might sort a hand of playing cards — picking up one card at a time and inserting it into its correct position among the cards already in your hand.

The algorithm maintains a sorted portion at the beginning of the array and repeatedly takes the next unsorted element, finding its correct position in the sorted portion and inserting it there by shifting elements as needed.

## Real Life Example

### Sorting Playing Cards in Hand

When you're dealt cards one at a time:

1. **First card**: Just hold it — it's sorted by itself
2. **Second card**: Compare with first, insert before or after
3. **Third card**: Find correct position among first two, insert there
4. **Continue**: Each new card gets inserted in the right spot

You're constantly maintaining a sorted hand by "inserting" each new card in its proper place.

### Arranging Books on a Shelf

You have a stack of books to shelve alphabetically:

1. **Place first book** — it's in order by itself
2. **Take second book** — compare with first, shift if needed, insert
3. **Take third book** — find where it belongs, shift books right, insert
4. **Continue** — each book gets inserted in alphabetical order

## How it Works

### Step-by-Step Process

1. **Start with second element** (first element is already "sorted")
2. **Save the current element** (key) to be inserted
3. **Compare key with elements** in the sorted portion (moving right to left)
4. **Shift elements** greater than key one position right
5. **Insert key** in its correct position
6. **Repeat** for all remaining elements

### Visual Representation

\`\`\`
Initial: [12, 11, 13, 5, 6]
          |   |__________|
       sorted  unsorted

Pass 1: key = 11
        Compare 11 < 12? Yes, shift 12 right
        Insert 11
        [11, 12, 13, 5, 6]
         |_____|  |______|
         sorted   unsorted

Pass 2: key = 13
        Compare 13 < 12? No, stop
        13 stays in place
        [11, 12, 13, 5, 6]
         |________|  |___|
          sorted    unsorted

Pass 3: key = 5
        Compare 5 < 13? Yes, shift 13 right
        Compare 5 < 12? Yes, shift 12 right
        Compare 5 < 11? Yes, shift 11 right
        Insert 5 at position 0
        [5, 11, 12, 13, 6]
         |___________|  |
            sorted    unsorted

Pass 4: key = 6
        Compare 6 < 13? Yes, shift 13 right
        Compare 6 < 12? Yes, shift 12 right
        Compare 6 < 11? Yes, shift 11 right
        Compare 6 < 5? No, stop
        Insert 6 at position 1
        [5, 6, 11, 12, 13]
         |_______________|
              sorted
\`\`\`

## Python Implementation

### Basic Implementation

\`\`\`python
def insertion_sort(arr):
    # Start from the second element
    for i in range(1, len(arr)):
        key = arr[i]  # Element to be inserted
        j = i - 1     # Last index of sorted portion
        
        # Shift elements greater than key to the right
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        
        # Insert key at correct position
        arr[j + 1] = key
    
    return arr

# Example usage
numbers = [12, 11, 13, 5, 6]
insertion_sort(numbers)
print(numbers)  # Output: [5, 6, 11, 12, 13]
\`\`\`

### Implementation with Step Tracking

\`\`\`python
def insertion_sort_verbose(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        
        print(f"Pass {i}: Inserting {key}")
        print(f"  Current array: {arr}")
        print(f"  Sorted portion: {arr[:i]}")
        
        shifts = 0
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            print(f"  Shifting {arr[j]} to the right")
            j -= 1
            shifts += 1
        
        arr[j + 1] = key
        print(f"  Inserted {key} at index {j + 1}")
        print(f"  Total shifts: {shifts}")
        print(f"  Result: {arr}")
        print()
    
    return arr

# Example
numbers = [12, 11, 13, 5, 6]
insertion_sort_verbose(numbers)
\`\`\`

### Optimized with Binary Search (for finding insertion position)

\`\`\`python
import bisect

def insertion_sort_binary(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        # Find insertion position using binary search
        pos = bisect.bisect_left(arr, key, 0, i)
        # Shift elements and insert
        arr.pop(i)
        arr.insert(pos, key)
    
    return arr

# Note: This reduces comparisons to O(n log n) but shifts remain O(n²)
\`\`\`

## Dry Run

Let's trace through Insertion Sort with array \`[12, 11, 13, 5, 6]\`:

### Initial State
\`\`\`
Array: [12, 11, 13, 5, 6]
Sorted portion: [12] (first element)
\`\`\`

### Pass 1 (i = 1, key = 11)

- j = 0 (pointing to 12)
- Compare: 12 > 11? Yes
  - Shift: arr[1] = arr[0] → \`[12, 12, 13, 5, 6]\`
  - j = -1
- Insert: arr[0] = 11 → \`[11, 12, 13, 5, 6]\`

**Result**: \`[11, 12, 13, 5, 6]\`

### Pass 2 (i = 2, key = 13)

- j = 1 (pointing to 12)
- Compare: 12 > 13? No
- No shifting needed
- Insert: arr[2] = 13 (stays in place)

**Result**: \`[11, 12, 13, 5, 6]\`

### Pass 3 (i = 3, key = 5)

- j = 2 (pointing to 13)
- Compare: 13 > 5? Yes
  - Shift: arr[4] = arr[3] → \`[11, 12, 13, 13, 6]\`
  - j = 1
- Compare: 12 > 5? Yes
  - Shift: arr[3] = arr[2] → \`[11, 12, 12, 13, 6]\`
  - j = 0
- Compare: 11 > 5? Yes
  - Shift: arr[2] = arr[1] → \`[11, 11, 12, 13, 6]\`
  - j = -1
- Insert: arr[0] = 5 → \`[5, 11, 12, 13, 6]\`

**Result**: \`[5, 11, 12, 13, 6]\`

### Pass 4 (i = 4, key = 6)

- j = 3 (pointing to 13)
- Compare: 13 > 6? Yes
  - Shift: arr[5] = arr[4] → \`[5, 11, 12, 13, 13]\`
  - j = 2
- Compare: 12 > 6? Yes
  - Shift: arr[4] = arr[3] → \`[5, 11, 12, 12, 13]\`
  - j = 1
- Compare: 11 > 6? Yes
  - Shift: arr[3] = arr[2] → \`[5, 11, 11, 12, 13]\`
  - j = 0
- Compare: 5 > 6? No
- Insert: arr[1] = 6 → \`[5, 6, 11, 12, 13]\`

**Final Result**: \`[5, 6, 11, 12, 13]\`

## Time & Space Complexity

### Time Complexity

| Case | Complexity | Scenario |
|------|------------|----------|
| Best | O(n) | Array already sorted |
| Average | O(n²) | Random order |
| Worst | O(n²) | Reverse sorted |

**Best Case O(n)**: When the array is already sorted, the inner while loop never executes. We only make n-1 comparisons (one per element).

\`\`\`python
# Best case: Already sorted
[1, 2, 3, 4, 5]
# Each element is already in position
# Inner loop condition fails immediately
\`\`\`

**Worst Case O(n²)**: When the array is reverse sorted, every element must be compared with all previous elements and shifted.

\`\`\`python
# Worst case: Reverse sorted
[5, 4, 3, 2, 1]
# Each element needs maximum shifts
# Total shifts: 1 + 2 + 3 + 4 = 10 = n(n-1)/2
\`\`\`

### Space Complexity

**O(1)** — Insertion Sort is an in-place algorithm. It only uses:
- A few variables (i, j, key)
- No additional arrays or data structures

## Interview Notes

### Why Insertion Sort is Important

1. **Best O(n) for nearly sorted data** — outperforms all O(n log n) algorithms in this case
2. **Online algorithm** — can sort data as it arrives
3. **Stable** — maintains relative order of equal elements
4. **Used in practice** — Python's Timsort uses Insertion Sort for small subarrays

### When to Use Insertion Sort

✅ **Use when:**
- Array is small (n ≤ 20-50)
- Array is nearly sorted
- You need an online algorithm (sorting stream of data)
- Stability is required
- Memory is limited (O(1) space)

❌ **Avoid when:**
- Dataset is large and randomly ordered
- You need guaranteed O(n log n) performance

### Comparison with Other O(n²) Sorts

| Algorithm | Best | Average | Worst | Stable | Adaptive |
|-----------|------|---------|-------|--------|----------|
| Insertion Sort | O(n) | O(n²) | O(n²) | Yes | Yes |
| Selection Sort | O(n²) | O(n²) | O(n²) | No | No |
| Bubble Sort | O(n) | O(n²) | O(n²) | Yes | Yes |

**Key insight**: Insertion Sort is often the best choice among O(n²) algorithms because:
- It's adaptive (fast on nearly sorted data)
- It's stable
- It's online
- It has low overhead

### Real-World Usage

**Python's Timsort** (used by \`sorted()\` and \`list.sort()\`):
- Uses Insertion Sort for small subarrays (typically n < 64)
- Falls back to Merge Sort for larger arrays
- Combines the efficiency of both algorithms

## Common Mistakes

### 1. Wrong Loop Start

\`\`\`python
# WRONG: Starting from index 0
for i in range(0, len(arr)):  # First element has nothing to compare!

# CORRECT: Start from index 1
for i in range(1, len(arr)):
\`\`\`

### 2. Using Wrong Comparison

\`\`\`python
# WRONG: Using >= instead of >
while j >= 0 and arr[j] >= key:  # Makes algorithm unstable!
    arr[j + 1] = arr[j]
    j -= 1

# CORRECT: Use strict > for stability
while j >= 0 and arr[j] > key:
    arr[j + 1] = arr[j]
    j -= 1
\`\`\`

### 3. Forgetting to Insert Key

\`\`\`python
# WRONG: Missing the insertion step
while j >= 0 and arr[j] > key:
    arr[j + 1] = arr[j]
    j -= 1
# Forgot: arr[j + 1] = key

# CORRECT: Always insert key after shifting
while j >= 0 and arr[j] > key:
    arr[j + 1] = arr[j]
    j -= 1
arr[j + 1] = key  # Don't forget this!
\`\`\`

### 4. Swapping Instead of Shifting

\`\`\`python
# INEFFICIENT: Using swaps (3 operations per element)
while j >= 0 and arr[j] > key:
    arr[j], arr[j + 1] = arr[j + 1], arr[j]
    j -= 1

# EFFICIENT: Using shifts (1 operation per element)
while j >= 0 and arr[j] > key:
    arr[j + 1] = arr[j]  # Single assignment
    j -= 1
arr[j + 1] = key
\`\`\`

### 5. Off-by-One Error in Insertion

\`\`\`python
# WRONG: Inserting at wrong position
arr[j] = key  # j points to last element smaller than key

# CORRECT: Insert at j + 1
arr[j + 1] = key  # j + 1 is the correct position
\`\`\`

## Key Takeaways

- **Insertion Sort** builds the sorted array by inserting one element at a time into its correct position
- **Best case O(n)** when array is nearly sorted — makes it adaptive
- **Worst case O(n²)** when array is reverse sorted
- **Stable algorithm** — maintains relative order of equal elements
- **Online algorithm** — can sort data as it arrives
- **In-place sorting** — uses O(1) extra space
- **Simple implementation** — easy to code correctly
- **Used in practice** — Timsort uses Insertion Sort for small subarrays
- **Better than Selection/Bubble** for nearly sorted data
- **Key insight**: Shifting is more efficient than swapping
- **Interview tip**: Explain why it's adaptive and when to use it over O(n log n) algorithms`,

    'dsa-quick-sort': `# DSA Quick Sort

## Why Quick Sort Exists

Quick Sort was developed by Tony Hoare in 1959 and remains one of the most widely used sorting algorithms today. It was created to address the need for a fast, efficient, general-purpose sorting algorithm that could handle large datasets effectively.

**Problems with earlier algorithms:**
- **Bubble Sort, Selection Sort, Insertion Sort**: O(n²) — too slow for large datasets
- **Merge Sort**: O(n log n) but requires O(n) extra space

**Quick Sort's solution:**
- O(n log n) average case like Merge Sort
- In-place sorting with only O(log n) space for recursion
- Excellent cache performance due to sequential memory access
- Often 2-3x faster than Merge Sort in practice

## Core Idea

Quick Sort uses the **divide and conquer** strategy with a clever twist:

1. **Choose a pivot element** from the array
2. **Partition the array**: 
   - Elements smaller than pivot go to the left
   - Elements greater than pivot go to the right
   - Pivot ends up in its final sorted position
3. **Recursively sort** the left and right subarrays
4. **No merge step needed** — the array is sorted in place!

**The key insight**: After partitioning, the pivot is in its correct final position. We never need to move it again. This is what makes Quick Sort efficient.

\`\`\`
[5, 2, 8, 1, 9, 3]    Choose pivot = 3
       ↓
[2, 1, 3, 5, 9, 8]    After partition: 3 is in correct position
 |___|   |______|
  <3       >3
   ↓         ↓
Recursively sort both sides
\`\`\`

## Step-by-Step Working

### The Partition Process (Lomuto Scheme)

The Lomuto partition scheme is simpler to understand:

1. Choose the **last element** as the pivot
2. Maintain a pointer \`i\` for the "boundary" of smaller elements
3. Scan through the array with pointer \`j\`
4. If \`arr[j] < pivot\`, swap \`arr[i+1]\` with \`arr[j]\` and increment \`i\`
5. Finally, swap the pivot to position \`i+1\`

### Visual Walkthrough

\`\`\`
Array: [10, 7, 8, 9, 1, 5]  Pivot = 5

Initial: i = -1, j = 0

j=0: 10 < 5? No  → [10, 7, 8, 9, 1, 5]  i=-1
j=1: 7 < 5? No   → [10, 7, 8, 9, 1, 5]  i=-1
j=2: 8 < 5? No   → [10, 7, 8, 9, 1, 5]  i=-1
j=3: 9 < 5? No   → [10, 7, 8, 9, 1, 5]  i=-1
j=4: 1 < 5? Yes  → swap arr[0] with arr[4]
                   [1, 7, 8, 9, 10, 5]  i=0

Swap pivot with arr[i+1]:
     [1, 5, 8, 9, 10, 7]  ← WRONG! Let me redo...

Actually:
j=4: 1 < 5? Yes  → i becomes 0, swap arr[0] with arr[4]
                   [1, 7, 8, 9, 10, 5]  i=0

Final: Swap pivot (arr[5]) with arr[i+1] = arr[1]:
       [1, 5, 8, 9, 10, 7]
       
Pivot 5 is now at index 1 (its correct position among values seen)
\`\`\`

## Python Implementation

### Basic Quick Sort with Lomuto Partition

\`\`\`python
def quick_sort(arr, low, high):
    if low < high:
        # Partition and get pivot index
        pivot_idx = partition(arr, low, high)
        
        # Recursively sort left and right subarrays
        quick_sort(arr, low, pivot_idx - 1)   # Left of pivot
        quick_sort(arr, pivot_idx + 1, high)  # Right of pivot

def partition(arr, low, high):
    pivot = arr[high]  # Choose last element as pivot
    i = low - 1        # Index of smaller element boundary
    
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    # Place pivot in correct position
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

# Example usage
numbers = [10, 7, 8, 9, 1, 5]
quick_sort(numbers, 0, len(numbers) - 1)
print(numbers)  # Output: [1, 5, 7, 8, 9, 10]
\`\`\`

### Quick Sort with Random Pivot (Optimized)

\`\`\`python
import random

def quick_sort_random(arr, low, high):
    if low < high:
        pivot_idx = randomized_partition(arr, low, high)
        quick_sort_random(arr, low, pivot_idx - 1)
        quick_sort_random(arr, pivot_idx + 1, high)

def randomized_partition(arr, low, high):
    # Choose random pivot and swap with last element
    random_idx = random.randint(low, high)
    arr[random_idx], arr[high] = arr[high], arr[random_idx]
    return partition(arr, low, high)

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

# Example
numbers = [10, 7, 8, 9, 1, 5]
quick_sort_random(numbers, 0, len(numbers) - 1)
print(numbers)  # Output: [1, 5, 7, 8, 9, 10]
\`\`\`

### Pythonic One-liner (Not In-Place)

\`\`\`python
def quick_sort_simple(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort_simple(left) + middle + quick_sort_simple(right)

# Example
numbers = [10, 7, 8, 9, 1, 5]
sorted_numbers = quick_sort_simple(numbers)
print(sorted_numbers)  # [1, 5, 7, 8, 9, 10]
\`\`\`

## Dry Run with Example

Let's trace Quick Sort on \`[10, 7, 8, 9, 1, 5]\`:

### Level 0: Full Array

\`\`\`
quick_sort([10, 7, 8, 9, 1, 5], 0, 5)
Pivot = 5 (last element)

Partition:
  i=-1, j=0: 10 <= 5? No
  i=-1, j=1: 7 <= 5? No
  i=-1, j=2: 8 <= 5? No
  i=-1, j=3: 9 <= 5? No
  i=-1, j=4: 1 <= 5? Yes → i=0, swap arr[0]↔arr[4]
             Array: [1, 7, 8, 9, 10, 5]
  
  Swap pivot: arr[1] ↔ arr[5]
  Array: [1, 5, 8, 9, 10, 7]
  
  Pivot index = 1 (5 is in correct position)
\`\`\`

### Level 1: Left Subarray

\`\`\`
quick_sort([1], 0, 0)
Base case: single element, return
\`\`\`

### Level 1: Right Subarray

\`\`\`
quick_sort([8, 9, 10, 7], 2, 5)
Pivot = 7

Partition:
  i=1, j=2: 8 <= 7? No
  i=1, j=3: 9 <= 7? No
  i=1, j=4: 10 <= 7? No
  
  Swap pivot: arr[2] ↔ arr[5]
  Array: [1, 5, 7, 9, 10, 8]
  
  Pivot index = 2
\`\`\`

### Continuing Recursively...

The process continues until all subarrays have size ≤ 1.

**Final sorted array**: \`[1, 5, 7, 8, 9, 10]\`

### Recursion Call Stack

\`\`\`
quick_sort(0, 5)
├── partition → pivot_idx = 1
├── quick_sort(0, 0)  ← base case
└── quick_sort(2, 5)
    ├── partition → pivot_idx = 2
    ├── quick_sort(2, 1)  ← low > high, return
    └── quick_sort(3, 5)
        ├── partition → pivot_idx = 4
        ├── quick_sort(3, 3)  ← base case
        └── quick_sort(5, 5)  ← base case
\`\`\`

## Time & Space Complexity

### Time Complexity

| Case | Complexity | Scenario |
|------|------------|----------|
| Best | O(n log n) | Pivot always divides array in half |
| Average | O(n log n) | Random data, good pivot choices |
| Worst | O(n²) | Already sorted + always pick first/last as pivot |

**Best/Average Case Analysis:**
- Each partition takes O(n)
- Tree depth is O(log n) when balanced
- Total: O(n) × O(log n) = O(n log n)

**Worst Case Analysis:**
- Occurs when pivot is always smallest or largest
- Tree becomes a linked list of depth n
- Total: O(n) × O(n) = O(n²)

\`\`\`
Worst case partition tree:
[1, 2, 3, 4, 5] with pivot = last element

Level 0: [1, 2, 3, 4, 5] → pivot = 5
Level 1: [1, 2, 3, 4] → pivot = 4
Level 2: [1, 2, 3] → pivot = 3
Level 3: [1, 2] → pivot = 2
Level 4: [1]

Depth = n instead of log n!
\`\`\`

### Space Complexity

| Case | Space | Reason |
|------|-------|--------|
| Best/Average | O(log n) | Recursion stack depth |
| Worst | O(n) | Unbalanced recursion |

**In-place**: Quick Sort doesn't need extra arrays for merging. The O(log n) space is only for the recursion call stack.

## Stability & In-place Analysis

### Is Quick Sort Stable?

**No**, Quick Sort is **not stable** in its standard form.

\`\`\`python
# Example showing instability
data = [(4, 'a'), (2, 'b'), (4, 'c'), (1, 'd')]
# After sorting by first element:
# Could become: [(1, 'd'), (2, 'b'), (4, 'c'), (4, 'a')]
# The relative order of (4, 'a') and (4, 'c') changed!
\`\`\`

**Why unstable?** The partition swaps elements across the pivot, potentially changing the relative order of equal elements.

### Is Quick Sort In-place?

**Yes**, Quick Sort is **in-place**.

- It only uses the original array
- No additional arrays needed for merging
- Only O(log n) space for recursion stack
- This is a major advantage over Merge Sort

## When to Use / When NOT to Use

### ✅ Use Quick Sort When:

1. **Average-case performance matters** — O(n log n) average
2. **Memory is limited** — Only O(log n) extra space
3. **Working with arrays** — Great cache locality
4. **Data is random** — Unlikely to hit worst case
5. **Stability is not required**

### ❌ Avoid Quick Sort When:

1. **Data is already sorted** — Could hit O(n²) worst case
2. **Stability is required** — Use Merge Sort instead
3. **Guaranteed O(n log n) needed** — Use Merge Sort or Heap Sort
4. **Working with linked lists** — Merge Sort is better
5. **Many duplicate elements** — Three-way partition needed

### Quick Sort vs Merge Sort

| Aspect | Quick Sort | Merge Sort |
|--------|-----------|------------|
| Average Time | O(n log n) | O(n log n) |
| Worst Time | O(n²) | O(n log n) |
| Space | O(log n) | O(n) |
| Stable | No | Yes |
| Cache | Excellent | Good |
| Practical Speed | Often faster | Predictable |

## Interview Tips

### Common Interview Questions

1. **Implement Quick Sort** — Know Lomuto partition by heart
2. **Why O(n²) worst case?** — Explain sorted array + bad pivot
3. **How to avoid worst case?** — Random pivot, median-of-three
4. **Quick Sort vs Merge Sort?** — Space, stability, worst case
5. **Find kth smallest element** — QuickSelect algorithm

### Key Points to Mention

1. **Pivot selection strategies:**
   - Last element (simple but worst case on sorted data)
   - Random element (avoids worst case probabilistically)
   - Median-of-three (first, middle, last)

2. **Partition schemes:**
   - Lomuto (simpler, slightly slower)
   - Hoare (faster, harder to implement)

3. **Three-way partition** for many duplicates

4. **Tail recursion optimization** to limit stack depth

### Code to Memorize

\`\`\`python
def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1
\`\`\`

## Common Mistakes

### 1. Wrong Base Case

\`\`\`python
# WRONG: Missing base case
def quick_sort(arr, low, high):
    pivot_idx = partition(arr, low, high)  # No check!
    quick_sort(arr, low, pivot_idx - 1)
    quick_sort(arr, pivot_idx + 1, high)

# CORRECT: Check if subarray has more than 1 element
def quick_sort(arr, low, high):
    if low < high:  # Essential check!
        pivot_idx = partition(arr, low, high)
        quick_sort(arr, low, pivot_idx - 1)
        quick_sort(arr, pivot_idx + 1, high)
\`\`\`

### 2. Including Pivot in Recursive Call

\`\`\`python
# WRONG: Including pivot in recursion
quick_sort(arr, low, pivot_idx)      # Includes pivot!
quick_sort(arr, pivot_idx, high)     # Includes pivot again!

# CORRECT: Exclude pivot (it's already in place)
quick_sort(arr, low, pivot_idx - 1)  # Left of pivot
quick_sort(arr, pivot_idx + 1, high) # Right of pivot
\`\`\`

### 3. Wrong Partition Boundary

\`\`\`python
# WRONG: Starting i at low instead of low - 1
i = low  # Wrong initialization

# CORRECT: Start i before the first element
i = low - 1
\`\`\`

### 4. Not Handling Edge Cases

\`\`\`python
# WRONG: Not handling empty or single element
quick_sort([], 0, -1)  # Could crash

# CORRECT: Handle edge cases
def quick_sort(arr, low, high):
    if low < high:  # Handles empty and single element
        # ... rest of code
\`\`\`

## Key Takeaways

- **Quick Sort** uses divide and conquer with in-place partitioning around a pivot
- **Average case O(n log n)**, worst case O(n²) — but worst case is rare with good pivot selection
- **O(log n) space** for recursion — much better than Merge Sort's O(n)
- **Not stable** — relative order of equal elements may change
- **Excellent cache performance** — elements are processed in contiguous memory
- **Pivot selection is crucial** — random or median-of-three avoids worst case
- **Lomuto partition** is simpler; Hoare partition is faster
- **Used in practice** — many language standard libraries use Quick Sort variants
- **Interview favorite** — know partition by heart, explain worst case, compare with Merge Sort`,

    'dsa-merge-sort': `# DSA Merge Sort

## Why Merge Sort Exists

Merge Sort was invented by John von Neumann in 1945. It was designed to solve a fundamental problem: **how to sort data too large to fit in memory** (external sorting).

**Key motivations:**
- Need for **guaranteed O(n log n)** performance (no O(n²) worst case)
- Need for a **stable** sorting algorithm
- Need to sort data stored on external devices (tape drives, hard disks)
- Need for a **parallelizable** sorting algorithm

**What makes Merge Sort special:**
- Consistent O(n log n) regardless of input order
- Stable — preserves relative order of equal elements
- Works efficiently with linked lists
- Naturally suited for external sorting and parallel processing

## Core Idea

Merge Sort is based on the **divide and conquer** paradigm:

1. **Divide**: Split the array into two halves
2. **Conquer**: Recursively sort each half
3. **Combine**: Merge the two sorted halves into one sorted array

**The key insight**: Merging two already-sorted arrays is easy and takes O(n) time. We just compare elements from both arrays and pick the smaller one.

\`\`\`
[38, 27, 43, 3, 9, 82, 10]
           ↓ Divide
[38, 27, 43, 3]    [9, 82, 10]
      ↓                 ↓
  (recurse)         (recurse)
      ↓                 ↓
[3, 27, 38, 43]    [9, 10, 82]
           ↓ Merge
[3, 9, 10, 27, 38, 43, 82]
\`\`\`

## Step-by-Step Working

### The Divide Phase

1. Find the middle point: \`mid = (left + right) // 2\`
2. Recursively divide the left half: \`[left...mid]\`
3. Recursively divide the right half: \`[mid+1...right]\`
4. Continue until subarrays have only 1 element (base case)

### The Merge Phase

Merging two sorted arrays \`[2, 5, 8]\` and \`[1, 4, 6]\`:

\`\`\`
Left:  [2, 5, 8]    Right: [1, 4, 6]    Result: []
        ↑                   ↑
        i                   j

Step 1: 1 < 2 → pick 1     Result: [1]
Step 2: 2 < 4 → pick 2     Result: [1, 2]
Step 3: 4 < 5 → pick 4     Result: [1, 2, 4]
Step 4: 5 < 6 → pick 5     Result: [1, 2, 4, 5]
Step 5: 6 < 8 → pick 6     Result: [1, 2, 4, 5, 6]
Step 6: 8 remaining → pick 8  Result: [1, 2, 4, 5, 6, 8]
\`\`\`

### Visual Representation

\`\`\`
                [38, 27, 43, 3, 9, 82, 10]
                          ↓ split
          [38, 27, 43, 3]       [9, 82, 10]
               ↓ split              ↓ split
      [38, 27]    [43, 3]      [9, 82]    [10]
        ↓ split    ↓ split      ↓ split
    [38] [27]   [43] [3]    [9] [82]    [10]
        ↓ merge    ↓ merge      ↓ merge
      [27, 38]    [3, 43]      [9, 82]   [10]
           ↓ merge                 ↓ merge
      [3, 27, 38, 43]          [9, 10, 82]
                  ↓ merge
          [3, 9, 10, 27, 38, 43, 82]
\`\`\`

## Python Implementation

### Basic Merge Sort

\`\`\`python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    # Divide
    mid = len(arr) // 2
    left_half = merge_sort(arr[:mid])
    right_half = merge_sort(arr[mid:])
    
    # Conquer (merge)
    return merge(left_half, right_half)

def merge(left, right):
    result = []
    i = j = 0
    
    # Compare elements from both arrays
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    # Add remaining elements
    result.extend(left[i:])
    result.extend(right[j:])
    
    return result

# Example usage
numbers = [38, 27, 43, 3, 9, 82, 10]
sorted_numbers = merge_sort(numbers)
print(sorted_numbers)  # [3, 9, 10, 27, 38, 43, 82]
\`\`\`

### In-Place Merge Sort (Space Optimized)

\`\`\`python
def merge_sort_inplace(arr, left, right):
    if left < right:
        mid = (left + right) // 2
        
        # Sort first and second halves
        merge_sort_inplace(arr, left, mid)
        merge_sort_inplace(arr, mid + 1, right)
        
        # Merge the sorted halves
        merge_inplace(arr, left, mid, right)

def merge_inplace(arr, left, mid, right):
    # Create temporary arrays
    left_arr = arr[left:mid + 1]
    right_arr = arr[mid + 1:right + 1]
    
    i = j = 0
    k = left
    
    while i < len(left_arr) and j < len(right_arr):
        if left_arr[i] <= right_arr[j]:
            arr[k] = left_arr[i]
            i += 1
        else:
            arr[k] = right_arr[j]
            j += 1
        k += 1
    
    # Copy remaining elements
    while i < len(left_arr):
        arr[k] = left_arr[i]
        i += 1
        k += 1
    
    while j < len(right_arr):
        arr[k] = right_arr[j]
        j += 1
        k += 1

# Example usage
numbers = [38, 27, 43, 3, 9, 82, 10]
merge_sort_inplace(numbers, 0, len(numbers) - 1)
print(numbers)  # [3, 9, 10, 27, 38, 43, 82]
\`\`\`

### Bottom-Up Merge Sort (Iterative)

\`\`\`python
def merge_sort_iterative(arr):
    n = len(arr)
    size = 1  # Start with subarrays of size 1
    
    while size < n:
        for left in range(0, n, 2 * size):
            mid = min(left + size - 1, n - 1)
            right = min(left + 2 * size - 1, n - 1)
            
            if mid < right:
                merge_inplace(arr, left, mid, right)
        
        size *= 2  # Double the subarray size
    
    return arr
\`\`\`

## Dry Run with Example

Let's trace Merge Sort on \`[38, 27, 43, 3]\`:

### Division Phase

\`\`\`
Level 0: merge_sort([38, 27, 43, 3])
         mid = 2
         ↓
Level 1: merge_sort([38, 27])    merge_sort([43, 3])
         mid = 1                  mid = 1
         ↓                        ↓
Level 2: merge_sort([38])        merge_sort([43])
         merge_sort([27])        merge_sort([3])
         (base cases)            (base cases)
\`\`\`

### Merge Phase

\`\`\`
Level 2 → Level 1:
  merge([38], [27]):
    38 > 27 → pick 27
    pick remaining 38
    Result: [27, 38]
    
  merge([43], [3]):
    43 > 3 → pick 3
    pick remaining 43
    Result: [3, 43]

Level 1 → Level 0:
  merge([27, 38], [3, 43]):
    27 > 3 → pick 3
    27 < 43 → pick 27
    38 < 43 → pick 38
    pick remaining 43
    Result: [3, 27, 38, 43]
\`\`\`

### Final Result
\`\`\`
[3, 27, 38, 43]
\`\`\`

## Time & Space Complexity

### Time Complexity

| Case | Complexity | Explanation |
|------|------------|-------------|
| Best | O(n log n) | Always divides in half |
| Average | O(n log n) | Always divides in half |
| Worst | O(n log n) | Always divides in half |

**Why O(n log n)?**
- **Division**: Array is split log n times (halving each time)
- **Merge**: Each level processes all n elements
- **Total**: n elements × log n levels = O(n log n)

\`\`\`
Level 0: 1 array of size n        → n work
Level 1: 2 arrays of size n/2     → n work
Level 2: 4 arrays of size n/4     → n work
...
Level log n: n arrays of size 1   → n work

Total: n × log n = O(n log n)
\`\`\`

**Key advantage**: Unlike Quick Sort, Merge Sort has **no O(n²) worst case**.

### Space Complexity

| Implementation | Space | Reason |
|----------------|-------|--------|
| Standard | O(n) | Temporary arrays for merging |
| Linked List | O(log n) | Only recursion stack |

**Why O(n) space?**
The merge step requires temporary arrays to hold the merged result before copying back. At any point, we need O(n) extra space for the merge operation.

## Stability & In-place Analysis

### Is Merge Sort Stable?

**Yes**, Merge Sort is **stable** — it preserves the relative order of equal elements.

**How stability is maintained:**

\`\`\`python
# In the merge step:
if left[i] <= right[j]:  # Using <= (not <)
    result.append(left[i])
    i += 1
\`\`\`

When elements are equal, we pick from the **left array first**. Since the left array contains elements that appeared earlier in the original array, their relative order is preserved.

\`\`\`
Example: [(4, 'a'), (2, 'b'), (4, 'c'), (1, 'd')]
After sorting by first element:
[(1, 'd'), (2, 'b'), (4, 'a'), (4, 'c')]
# (4, 'a') still comes before (4, 'c') ✓
\`\`\`

### Is Merge Sort In-place?

**No**, standard Merge Sort is **not in-place**.

- Requires O(n) additional space for merging
- This is its main disadvantage compared to Quick Sort
- In-place merge is possible but complex and slower

## When to Use / When NOT to Use

### ✅ Use Merge Sort When:

1. **Stability is required** — Merge Sort is stable
2. **Guaranteed O(n log n) needed** — No worst case O(n²)
3. **Sorting linked lists** — Merge is efficient without extra space
4. **External sorting** — Large files that don't fit in memory
5. **Parallel processing** — Naturally parallelizable
6. **Predictable performance** — Consistent regardless of input

### ❌ Avoid Merge Sort When:

1. **Memory is limited** — Requires O(n) extra space
2. **Sorting small arrays** — Overhead not worth it
3. **In-place sorting needed** — Use Quick Sort or Heap Sort
4. **Random access is expensive** — Bad for tape/sequential storage

### Merge Sort vs Quick Sort

| Aspect | Merge Sort | Quick Sort |
|--------|-----------|------------|
| Worst Case | O(n log n) ✓ | O(n²) |
| Space | O(n) | O(log n) ✓ |
| Stable | Yes ✓ | No |
| Cache | Good | Excellent ✓ |
| Linked Lists | Excellent ✓ | Poor |
| Practical Speed | Predictable | Often faster ✓ |

## Interview Tips

### Common Interview Questions

1. **Implement Merge Sort** — Know both recursive and merge function
2. **Why is it stable?** — Explain the \`<=\` comparison in merge
3. **External sorting** — How to sort 100GB file with 1GB RAM
4. **Count inversions** — Modified merge sort application
5. **Merge k sorted arrays** — Heap + merge concept

### Key Points to Mention

1. **Divide and conquer** — split, recurse, merge
2. **O(n log n) guaranteed** — no bad pivot issues like Quick Sort
3. **Stable** — uses \`<=\` in merge comparison
4. **O(n) space** — main disadvantage
5. **Used in Timsort** — Python's built-in sort

### Applications of Merge Sort

1. **External sorting**: Sorting files larger than RAM
2. **Counting inversions**: Modified merge to count out-of-order pairs
3. **Merge k sorted lists**: Foundation for this common problem
4. **Stable sorting needs**: When relative order matters
5. **Parallel sorting**: Natural division for multi-threading

## Common Mistakes

### 1. Wrong Base Case

\`\`\`python
# WRONG: Not handling single element
def merge_sort(arr):
    mid = len(arr) // 2  # Crashes if len(arr) == 1
    
# CORRECT: Return early for base case
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
\`\`\`

### 2. Incorrect Merge Comparison

\`\`\`python
# WRONG: Using < instead of <= breaks stability
if left[i] < right[j]:
    result.append(left[i])
    
# CORRECT: Use <= to maintain stability
if left[i] <= right[j]:
    result.append(left[i])
\`\`\`

### 3. Forgetting Remaining Elements

\`\`\`python
# WRONG: Not adding remaining elements
while i < len(left) and j < len(right):
    # merge logic
return result  # Missing remaining elements!

# CORRECT: Add remaining elements
while i < len(left) and j < len(right):
    # merge logic
result.extend(left[i:])   # Add remaining from left
result.extend(right[j:])  # Add remaining from right
return result
\`\`\`

### 4. Wrong Middle Calculation

\`\`\`python
# WRONG: Can cause infinite recursion
mid = (left + right) // 2
merge_sort(arr, left, mid)     # Includes mid
merge_sort(arr, mid, right)    # Includes mid again!

# CORRECT: Proper split
mid = (left + right) // 2
merge_sort(arr, left, mid)      # left to mid
merge_sort(arr, mid + 1, right) # mid+1 to right
\`\`\`

## Key Takeaways

- **Merge Sort** uses divide and conquer: split, recursively sort, then merge
- **O(n log n) guaranteed** — no O(n²) worst case unlike Quick Sort
- **Stable** — preserves relative order of equal elements (uses \`<=\`)
- **O(n) extra space** — main disadvantage, needs temporary arrays for merge
- **Excellent for linked lists** — merge can be done without extra space
- **Foundation for Timsort** — Python's built-in sort is a hybrid
- **Best for external sorting** — designed for data larger than memory
- **Parallelizable** — divide step naturally suits multi-threading
- **Interview essential** — know the merge logic, stability reason, and trade-offs with Quick Sort`,

    'dsa-counting-sort': `# DSA Counting Sort

## Why Counting Sort Exists

Counting Sort was designed to break the **O(n log n) barrier** that limits comparison-based sorting algorithms. It achieves this by not comparing elements at all!

**The fundamental limit:**
- Any comparison-based sort (Quick Sort, Merge Sort, etc.) requires Ω(n log n) comparisons in the worst case
- This is proven mathematically — you can't do better with comparisons

**Counting Sort's solution:**
- Don't compare elements — count them instead!
- If you know the range of values, you can sort in O(n + k) time
- Where k is the range of input values

**Perfect for:**
- Sorting integers within a known, small range
- Sorting characters (ASCII values 0-127)
- When k ≈ n or k < n

## Core Idea

Counting Sort works by **counting occurrences** of each distinct element:

1. **Count**: Create a frequency array and count how many times each value appears
2. **Accumulate**: Convert counts to positions (cumulative sum)
3. **Place**: Put each element in its correct position based on cumulative count

\`\`\`
Input: [4, 2, 2, 8, 3, 3, 1]
Range: 1 to 8

Count frequencies:
1 → 1 time
2 → 2 times
3 → 2 times
4 → 1 time
8 → 1 time

Output: [1, 2, 2, 3, 3, 4, 8]
\`\`\`

**Key insight**: If we know there are 3 elements ≤ 5, then the next element with value 5 goes at position 4 (index 3).

## Step-by-Step Working

### Step 1: Find Range

Determine minimum and maximum values to know the count array size.

\`\`\`python
arr = [4, 2, 2, 8, 3, 3, 1]
min_val = 1
max_val = 8
range_size = max_val - min_val + 1  # = 8
\`\`\`

### Step 2: Count Frequencies

Create count array and tally each element:

\`\`\`
Index:   0  1  2  3  4  5  6  7  (representing values 1-8)
         ↓  ↓  ↓  ↓  ↓  ↓  ↓  ↓
Count:  [1, 2, 2, 1, 0, 0, 0, 1]
         ↑  ↑  ↑  ↑           ↑
         1  2  3  4           8
        (1x)(2x)(2x)(1x)     (1x)
\`\`\`

### Step 3: Cumulative Sum (for stable version)

Convert counts to cumulative positions:

\`\`\`
Count:      [1, 2, 2, 1, 0, 0, 0, 1]
Cumulative: [1, 3, 5, 6, 6, 6, 6, 7]

This tells us:
- 1 element ≤ value 1
- 3 elements ≤ value 2
- 5 elements ≤ value 3
- etc.
\`\`\`

### Step 4: Build Output Array

Place elements in correct positions (traverse input right-to-left for stability):

\`\`\`
Input: [4, 2, 2, 8, 3, 3, 1]

Process from right to left:
1: cumulative[0] = 1 → position 0, decrement to 0
3: cumulative[2] = 5 → position 4, decrement to 4
3: cumulative[2] = 4 → position 3, decrement to 3
8: cumulative[7] = 7 → position 6, decrement to 6
2: cumulative[1] = 3 → position 2, decrement to 2
2: cumulative[1] = 2 → position 1, decrement to 1
4: cumulative[3] = 6 → position 5, decrement to 5

Output: [1, 2, 2, 3, 3, 4, 8]
\`\`\`

## Python Implementation

### Simple Version (Non-Stable)

\`\`\`python
def counting_sort_simple(arr):
    if not arr:
        return arr
    
    # Find range
    min_val = min(arr)
    max_val = max(arr)
    range_size = max_val - min_val + 1
    
    # Count occurrences
    count = [0] * range_size
    for num in arr:
        count[num - min_val] += 1
    
    # Reconstruct sorted array
    result = []
    for i in range(range_size):
        result.extend([i + min_val] * count[i])
    
    return result

# Example
numbers = [4, 2, 2, 8, 3, 3, 1]
sorted_numbers = counting_sort_simple(numbers)
print(sorted_numbers)  # [1, 2, 2, 3, 3, 4, 8]
\`\`\`

### Stable Version

\`\`\`python
def counting_sort_stable(arr):
    if not arr:
        return arr
    
    # Find range
    min_val = min(arr)
    max_val = max(arr)
    range_size = max_val - min_val + 1
    
    # Count occurrences
    count = [0] * range_size
    for num in arr:
        count[num - min_val] += 1
    
    # Cumulative count (positions)
    for i in range(1, range_size):
        count[i] += count[i - 1]
    
    # Build output array (traverse right-to-left for stability)
    output = [0] * len(arr)
    for i in range(len(arr) - 1, -1, -1):
        num = arr[i]
        count[num - min_val] -= 1
        output[count[num - min_val]] = num
    
    return output

# Example
numbers = [4, 2, 2, 8, 3, 3, 1]
sorted_numbers = counting_sort_stable(numbers)
print(sorted_numbers)  # [1, 2, 2, 3, 3, 4, 8]
\`\`\`

### In-Place Version (Modifies Original)

\`\`\`python
def counting_sort_inplace(arr):
    if not arr:
        return
    
    min_val = min(arr)
    max_val = max(arr)
    range_size = max_val - min_val + 1
    
    count = [0] * range_size
    for num in arr:
        count[num - min_val] += 1
    
    idx = 0
    for i in range(range_size):
        while count[i] > 0:
            arr[idx] = i + min_val
            idx += 1
            count[i] -= 1

# Example
numbers = [4, 2, 2, 8, 3, 3, 1]
counting_sort_inplace(numbers)
print(numbers)  # [1, 2, 2, 3, 3, 4, 8]
\`\`\`

## Dry Run with Example

Let's trace Counting Sort on \`[4, 2, 2, 8, 3, 3, 1]\`:

### Step 1: Initialize

\`\`\`
Input: [4, 2, 2, 8, 3, 3, 1]
min_val = 1, max_val = 8
range_size = 8

Count array (size 8): [0, 0, 0, 0, 0, 0, 0, 0]
                       1  2  3  4  5  6  7  8
\`\`\`

### Step 2: Count Frequencies

\`\`\`
Process 4: count[3]++ → [0, 0, 0, 1, 0, 0, 0, 0]
Process 2: count[1]++ → [0, 1, 0, 1, 0, 0, 0, 0]
Process 2: count[1]++ → [0, 2, 0, 1, 0, 0, 0, 0]
Process 8: count[7]++ → [0, 2, 0, 1, 0, 0, 0, 1]
Process 3: count[2]++ → [0, 2, 1, 1, 0, 0, 0, 1]
Process 3: count[2]++ → [0, 2, 2, 1, 0, 0, 0, 1]
Process 1: count[0]++ → [1, 2, 2, 1, 0, 0, 0, 1]

Final count: [1, 2, 2, 1, 0, 0, 0, 1]
\`\`\`

### Step 3: Cumulative Sum

\`\`\`
count[0] = 1
count[1] = 1 + 2 = 3
count[2] = 3 + 2 = 5
count[3] = 5 + 1 = 6
count[4] = 6 + 0 = 6
count[5] = 6 + 0 = 6
count[6] = 6 + 0 = 6
count[7] = 6 + 1 = 7

Cumulative: [1, 3, 5, 6, 6, 6, 6, 7]
\`\`\`

### Step 4: Build Output (Right to Left)

\`\`\`
Output: [_, _, _, _, _, _, _]  (7 slots)

Process arr[6]=1: count[0]=1-1=0, output[0]=1 → [1, _, _, _, _, _, _]
Process arr[5]=3: count[2]=5-1=4, output[4]=3 → [1, _, _, _, 3, _, _]
Process arr[4]=3: count[2]=4-1=3, output[3]=3 → [1, _, _, 3, 3, _, _]
Process arr[3]=8: count[7]=7-1=6, output[6]=8 → [1, _, _, 3, 3, _, 8]
Process arr[2]=2: count[1]=3-1=2, output[2]=2 → [1, _, 2, 3, 3, _, 8]
Process arr[1]=2: count[1]=2-1=1, output[1]=2 → [1, 2, 2, 3, 3, _, 8]
Process arr[0]=4: count[3]=6-1=5, output[5]=4 → [1, 2, 2, 3, 3, 4, 8]
\`\`\`

### Final Result

\`\`\`
[1, 2, 2, 3, 3, 4, 8]
\`\`\`

## Time & Space Complexity

### Time Complexity

| Operation | Complexity |
|-----------|------------|
| Find min/max | O(n) |
| Count frequencies | O(n) |
| Cumulative sum | O(k) |
| Build output | O(n) |
| **Total** | **O(n + k)** |

Where:
- n = number of elements
- k = range of values (max - min + 1)

**When is this efficient?**
- If k ≤ n: O(n) — linear time!
- If k ≈ n: O(n) — still linear
- If k >> n: O(k) — could be worse than O(n log n)

### Space Complexity

| Component | Space |
|-----------|-------|
| Count array | O(k) |
| Output array | O(n) |
| **Total** | **O(n + k)** |

## Stability & In-place Analysis

### Is Counting Sort Stable?

**Yes, when implemented correctly** (traversing right-to-left in build phase).

**Why right-to-left?**
\`\`\`python
# Stable: Process from right to left
for i in range(len(arr) - 1, -1, -1):
    # Elements appearing later get placed later among equals
    
# Unstable: Process from left to right
for i in range(len(arr)):
    # Would reverse the order of equal elements
\`\`\`

**Stability is crucial** for using Counting Sort as a subroutine in Radix Sort.

### Is Counting Sort In-place?

**No**, Counting Sort requires:
- O(k) space for count array
- O(n) space for output array (in stable version)

The simple reconstruction version can be "sort of" in-place but is not stable.

## When to Use / When NOT to Use

### ✅ Use Counting Sort When:

1. **Elements are integers** in a known range
2. **Range k is small** (k ≈ n or k < n)
3. **Stability is needed** and k is small
4. **Sorting characters** (ASCII 0-127)
5. **As subroutine for Radix Sort**

**Ideal scenarios:**
- Sorting exam scores (0-100)
- Sorting ages (0-150)
- Sorting characters in a string
- Sorting pixels by intensity (0-255)

### ❌ Avoid Counting Sort When:

1. **Range k is very large** — O(k) space becomes prohibitive
2. **Elements are floating-point** — can't use as array indices
3. **Elements are strings or objects** — not directly indexable
4. **Memory is limited** — needs O(n + k) extra space

**Bad scenarios:**
- Sorting arbitrary integers (range could be billions)
- Sorting floating-point numbers
- Sorting objects by complex keys

### Why Counting Sort Fails for Large Ranges

\`\`\`python
# Example: Sorting [1, 1000000000, 2]
# Range = 1,000,000,000

# Would need an array of size 1 billion!
count = [0] * 1000000000  # ~4GB of memory for just 3 elements!
\`\`\`

**Comparison:**
| Array | n | k | Better Algorithm |
|-------|---|---|------------------|
| [1, 2, 3] | 3 | 3 | Counting Sort O(6) |
| [1, 1000, 2] | 3 | 1000 | Quick Sort O(5) |
| [1, 10⁹, 2] | 3 | 10⁹ | Quick Sort O(5) |

## Interview Tips

### Common Interview Questions

1. **Implement Counting Sort** — Know both simple and stable versions
2. **When to use over comparison sorts?** — k < n log n
3. **Why is it O(n + k)?** — Break down each step
4. **How to make it stable?** — Cumulative sum + right-to-left
5. **Use in Radix Sort** — Counting Sort on each digit

### Key Points to Mention

1. **Non-comparison sort** — breaks O(n log n) barrier
2. **O(n + k) time** — linear when k is small
3. **O(n + k) space** — main limitation
4. **Stable** — when implemented correctly
5. **Building block** — used in Radix Sort

### When to Suggest Counting Sort

**Interviewer**: "Sort an array of 1 million student grades (0-100)"

**You**: "Since the range is only 0-100 (k=101) and we have n=1 million elements, Counting Sort would be O(n + k) ≈ O(n), which is better than Quick Sort's O(n log n). The O(k) extra space is negligible."

## Common Mistakes

### 1. Not Handling Negative Numbers

\`\`\`python
# WRONG: Assumes all positive
count = [0] * (max(arr) + 1)
count[arr[i]] += 1  # Fails for negative!

# CORRECT: Use offset
min_val = min(arr)
count = [0] * (max(arr) - min_val + 1)
count[arr[i] - min_val] += 1
\`\`\`

### 2. Unstable Implementation

\`\`\`python
# WRONG: Left-to-right is unstable
for i in range(len(arr)):
    output[count[arr[i] - min_val] - 1] = arr[i]
    count[arr[i] - min_val] -= 1

# CORRECT: Right-to-left for stability
for i in range(len(arr) - 1, -1, -1):
    output[count[arr[i] - min_val] - 1] = arr[i]
    count[arr[i] - min_val] -= 1
\`\`\`

### 3. Off-by-One Errors

\`\`\`python
# WRONG: Forgetting +1 for range
range_size = max_val - min_val  # Missing +1

# CORRECT: Include both endpoints
range_size = max_val - min_val + 1
\`\`\`

### 4. Using for Large Ranges

\`\`\`python
# BAD IDEA: Range is too large
arr = [1, 1000000, 2]
counting_sort(arr)  # Creates array of size 1,000,000

# BETTER: Use comparison-based sort
arr.sort()
\`\`\`

## Key Takeaways

- **Counting Sort** is a non-comparison sort that counts occurrences of each value
- **O(n + k) time** — linear when range k is small relative to n
- **O(n + k) space** — needs count array and output array
- **Stable** when implemented correctly (right-to-left placement)
- **Not in-place** — requires extra space proportional to range
- **Best for** — integers with small range (grades, ages, characters)
- **Fails for** — large ranges, floating-point, or complex objects
- **Foundation for Radix Sort** — sorts digits one at a time
- **Key insight** — works by calculating final positions, not comparing elements`,

    'dsa-radix-sort': `# DSA Radix Sort

## Why Radix Sort Exists

Radix Sort was developed to efficiently sort large collections of fixed-length data like:
- Phone numbers
- Social Security numbers
- Credit card numbers
- Dates in YYYYMMDD format
- Fixed-width strings

**The key insight**: Instead of comparing entire numbers, we can sort by individual digits, one position at a time.

**Historical note**: Radix Sort was used on mechanical card-sorting machines as early as the 1890s for census data processing!

**Advantages over comparison sorts:**
- O(d × n) where d is the number of digits — can be faster than O(n log n)
- No comparisons between elements
- Works well for fixed-length integers or strings

## Core Idea

Radix Sort processes digits from least significant to most significant (LSD approach):

1. **Sort by 1s place** using a stable sort (Counting Sort)
2. **Sort by 10s place** using a stable sort
3. **Sort by 100s place** using a stable sort
4. **Continue** for all digit positions

**Why Least Significant Digit (LSD) first?**
- By starting with the least significant digit, stability ensures that previous orderings are preserved
- After sorting by the last digit, equal values stay in order from the previous sort

\`\`\`
Input: [170, 45, 75, 90, 802, 24, 2, 66]

Sort by 1s:  [170, 90, 802, 2, 24, 45, 75, 66]
             (0,0,2,2,4,5,5,6 in 1s place)

Sort by 10s: [802, 2, 24, 45, 66, 170, 75, 90]
             (0,0,2,4,6,7,7,9 in 10s place)

Sort by 100s: [2, 24, 45, 66, 75, 90, 170, 802]
              (0,0,0,0,0,0,1,8 in 100s place)
\`\`\`

## Step-by-Step Working

### Step 1: Find Maximum Digits

Determine the maximum number to find how many digit passes are needed.

\`\`\`python
arr = [170, 45, 75, 90, 802, 24, 2, 66]
max_val = 802
digits = 3  # Need 3 passes (1s, 10s, 100s)
\`\`\`

### Step 2: Sort by Each Digit Position

Use Counting Sort as a stable subroutine to sort by each digit.

**Why Counting Sort?**
- It's stable (required for Radix Sort to work)
- It's O(n + k) where k = 10 (for decimal digits)
- Perfect for sorting digits 0-9

### Step 3: LSD to MSD Processing

\`\`\`
Pass 1 (1s place, exp=1):
  Extract digits: [0, 5, 5, 0, 2, 4, 2, 6]
  Sort by these digits (stable)
  Result: [170, 90, 802, 2, 24, 45, 75, 66]

Pass 2 (10s place, exp=10):
  Extract digits: [7, 9, 0, 0, 2, 4, 7, 6]
  Sort by these digits (stable)
  Result: [802, 2, 24, 45, 66, 170, 75, 90]

Pass 3 (100s place, exp=100):
  Extract digits: [8, 0, 0, 0, 0, 1, 0, 0]
  Sort by these digits (stable)
  Result: [2, 24, 45, 66, 75, 90, 170, 802]
\`\`\`

## Python Implementation

### Basic Radix Sort (LSD)

\`\`\`python
def radix_sort(arr):
    if not arr:
        return arr
    
    # Find the maximum number to determine digits
    max_val = max(arr)
    
    # Process each digit position
    exp = 1  # 1s, 10s, 100s, ...
    while max_val // exp > 0:
        counting_sort_by_digit(arr, exp)
        exp *= 10
    
    return arr

def counting_sort_by_digit(arr, exp):
    n = len(arr)
    output = [0] * n
    count = [0] * 10  # Digits 0-9
    
    # Count occurrences of each digit
    for num in arr:
        digit = (num // exp) % 10
        count[digit] += 1
    
    # Cumulative count
    for i in range(1, 10):
        count[i] += count[i - 1]
    
    # Build output array (right-to-left for stability)
    for i in range(n - 1, -1, -1):
        digit = (arr[i] // exp) % 10
        count[digit] -= 1
        output[count[digit]] = arr[i]
    
    # Copy back to original array
    for i in range(n):
        arr[i] = output[i]

# Example
numbers = [170, 45, 75, 90, 802, 24, 2, 66]
radix_sort(numbers)
print(numbers)  # [2, 24, 45, 66, 75, 90, 170, 802]
\`\`\`

### Radix Sort with Verbose Output

\`\`\`python
def radix_sort_verbose(arr):
    if not arr:
        return arr
    
    max_val = max(arr)
    exp = 1
    pass_num = 1
    
    print(f"Original: {arr}")
    print(f"Max value: {max_val}")
    print()
    
    while max_val // exp > 0:
        digits = [(num // exp) % 10 for num in arr]
        print(f"Pass {pass_num} (exp={exp}):")
        print(f"  Digits: {digits}")
        
        counting_sort_by_digit(arr, exp)
        print(f"  Result: {arr}")
        print()
        
        exp *= 10
        pass_num += 1
    
    return arr

# Example
numbers = [170, 45, 75, 90, 802, 24, 2, 66]
radix_sort_verbose(numbers)
\`\`\`

### Radix Sort for Negative Numbers

\`\`\`python
def radix_sort_with_negatives(arr):
    if not arr:
        return arr
    
    # Separate positive and negative numbers
    negatives = [-x for x in arr if x < 0]
    positives = [x for x in arr if x >= 0]
    
    # Sort both parts
    if negatives:
        radix_sort(negatives)
        negatives = [-x for x in reversed(negatives)]
    if positives:
        radix_sort(positives)
    
    # Combine: negatives first, then positives
    return negatives + positives

# Example
numbers = [-5, 170, -45, 75, -90, 802]
sorted_numbers = radix_sort_with_negatives(numbers)
print(sorted_numbers)  # [-90, -45, -5, 75, 170, 802]
\`\`\`

## Dry Run with Example

Let's trace Radix Sort on \`[170, 45, 75, 90, 802, 24, 2, 66]\`:

### Initial State

\`\`\`
Array: [170, 45, 75, 90, 802, 24, 2, 66]
Max value: 802 (3 digits)
Passes needed: 3
\`\`\`

### Pass 1: Sort by 1s Place (exp = 1)

\`\`\`
Extract 1s digits:
170 → 0    45 → 5    75 → 5    90 → 0
802 → 2    24 → 4     2 → 2    66 → 6

Digits: [0, 5, 5, 0, 2, 4, 2, 6]

Counting Sort on digits:
Count: [2, 0, 2, 0, 1, 2, 1, 0, 0, 0]  (digit 0-9)
       0  1  2  3  4  5  6  7  8  9

Cumulative: [2, 2, 4, 4, 5, 7, 8, 8, 8, 8]

Build output (right-to-left):
  66(6): pos 7   →  [_, _, _, _, _, _, _, 66]
   2(2): pos 3   →  [_, _, _, 2, _, _, _, 66]
  24(4): pos 4   →  [_, _, _, 2, 24, _, _, 66]
 802(2): pos 2   →  [_, _, 802, 2, 24, _, _, 66]
  90(0): pos 1   →  [_, 90, 802, 2, 24, _, _, 66]
  75(5): pos 6   →  [_, 90, 802, 2, 24, _, 75, 66]
  45(5): pos 5   →  [_, 90, 802, 2, 24, 45, 75, 66]
 170(0): pos 0   →  [170, 90, 802, 2, 24, 45, 75, 66]

Result: [170, 90, 802, 2, 24, 45, 75, 66]
\`\`\`

### Pass 2: Sort by 10s Place (exp = 10)

\`\`\`
Array: [170, 90, 802, 2, 24, 45, 75, 66]

Extract 10s digits:
170 → 7    90 → 9   802 → 0     2 → 0
 24 → 2    45 → 4    75 → 7    66 → 6

Digits: [7, 9, 0, 0, 2, 4, 7, 6]

Counting Sort result:
[802, 2, 24, 45, 66, 170, 75, 90]
\`\`\`

### Pass 3: Sort by 100s Place (exp = 100)

\`\`\`
Array: [802, 2, 24, 45, 66, 170, 75, 90]

Extract 100s digits:
802 → 8     2 → 0    24 → 0    45 → 0
 66 → 0   170 → 1    75 → 0    90 → 0

Digits: [8, 0, 0, 0, 0, 1, 0, 0]

Counting Sort result:
[2, 24, 45, 66, 75, 90, 170, 802]
\`\`\`

### Final Result

\`\`\`
[2, 24, 45, 66, 75, 90, 170, 802]
\`\`\`

## Time & Space Complexity

### Time Complexity

| Component | Complexity |
|-----------|------------|
| Find max | O(n) |
| Per digit pass | O(n + k) where k=10 |
| Total passes | d (number of digits) |
| **Total** | **O(d × (n + k))** = **O(d × n)** |

**For fixed-width integers with d digits:**
- If d is constant (e.g., 32-bit integers have d ≤ 10)
- Time becomes O(n) — linear!

**Comparison with O(n log n):**
| n | O(n log n) | O(d × n) with d=10 |
|---|------------|-------------------|
| 1,000 | ~10,000 | 10,000 |
| 1,000,000 | ~20,000,000 | 10,000,000 ✓ |
| 1,000,000,000 | ~30,000,000,000 | 10,000,000,000 ✓ |

Radix Sort wins for very large n when d is small!

### Space Complexity

| Component | Space |
|-----------|-------|
| Count array | O(k) = O(10) |
| Output array | O(n) |
| **Total** | **O(n + k)** = **O(n)** |

## Stability & In-place Analysis

### Is Radix Sort Stable?

**Yes**, Radix Sort is stable **because it uses a stable subroutine** (Counting Sort).

**Why stability is crucial:**
\`\`\`
After sorting by 1s: [170, 90, 802, 2, ...]
                           ↑       ↑
                           90 comes before 802

After sorting by 10s: [802, 2, 24, 45, 66, 170, 75, 90]

If unstable, 90 and 170 (both have 10s digit 7 and 9) could get reordered incorrectly!
\`\`\`

### Is Radix Sort In-place?

**No**, Radix Sort requires:
- O(n) space for output array (in Counting Sort)
- O(k) space for count array

Some in-place variants exist but are complex and rarely used.

### Why Radix Sort is Non-Comparison Based

Radix Sort never compares two elements directly:
- It extracts digits and uses Counting Sort
- Counting Sort counts occurrences, doesn't compare
- This is why it can beat the O(n log n) comparison lower bound

## When to Use / When NOT to Use

### ✅ Use Radix Sort When:

1. **Sorting fixed-length integers** — phone numbers, IDs
2. **d (digits) << log n** — when it beats O(n log n)
3. **Many elements, small range of keys** — efficient passes
4. **Sorting strings of equal length** — character by character
5. **Stability is important**

**Ideal scenarios:**
- Sorting 1 million 32-bit integers: d=10, O(10n) < O(n log n)
- Sorting fixed-length strings like postal codes
- Sorting dates in YYYYMMDD format

### ❌ Avoid Radix Sort When:

1. **Variable-length data** — complicates digit extraction
2. **Floating-point numbers** — needs special handling
3. **d is large** — when d ≥ log n, use comparison sort
4. **Small n** — overhead not worth it
5. **Memory is limited** — needs O(n) extra space

**Bad scenarios:**
- Sorting 10 elements — overhead too high
- Sorting arbitrary floating-point numbers
- When keys have many digits (UUIDs, hashes)

## Interview Tips

### Common Interview Questions

1. **Implement Radix Sort** — Know the LSD approach
2. **Why use Counting Sort as subroutine?** — It's stable and O(n+k)
3. **When is Radix Sort better than Quick Sort?** — When d × n < n log n
4. **How to handle negative numbers?** — Separate or use offset
5. **LSD vs MSD approach** — Trade-offs between them

### Key Points to Mention

1. **Non-comparison based** — doesn't compare elements directly
2. **Uses Counting Sort** — must be stable for correctness
3. **O(d × n) time** — d is number of digits
4. **LSD approach** — least significant digit first
5. **Beats O(n log n)** — when d is small relative to log n

### MSD vs LSD Radix Sort

| Aspect | LSD (Least Significant) | MSD (Most Significant) |
|--------|------------------------|------------------------|
| Direction | Right to left | Left to right |
| Stability | Naturally stable | Requires care |
| Recursion | Iterative | Recursive |
| Variable length | Harder | Easier |
| Use case | Fixed-length integers | Strings |

## Common Mistakes

### 1. Using Unstable Subroutine

\`\`\`python
# WRONG: Using unstable sort
def radix_sort(arr):
    for exp in [1, 10, 100]:
        arr.sort(key=lambda x: (x // exp) % 10)
        # Python's sort is stable, but other sorts might not be!

# CORRECT: Use explicitly stable Counting Sort
def radix_sort(arr):
    for exp in [1, 10, 100]:
        counting_sort_by_digit(arr, exp)  # Guaranteed stable
\`\`\`

### 2. Wrong Digit Extraction

\`\`\`python
# WRONG: Integer division issues
digit = num / exp % 10  # Float division!

# CORRECT: Use integer division
digit = (num // exp) % 10
\`\`\`

### 3. Not Handling Zero

\`\`\`python
# WRONG: Forgetting that max_val // exp can be 0
while max_val // exp > 0:  # Correctly handles this

# Make sure first pass runs even for single-digit numbers
\`\`\`

### 4. Forgetting to Copy Back

\`\`\`python
# WRONG: Output array not copied back
output = counting_sort_by_digit(arr, exp)
# arr is unchanged!

# CORRECT: Copy output back to arr
for i in range(n):
    arr[i] = output[i]
\`\`\`

## Key Takeaways

- **Radix Sort** processes digits from least to most significant (LSD)
- **O(d × n) time** — can beat O(n log n) when d is small
- **O(n) space** — needs output array for stable counting sort
- **Stable** — because it uses stable Counting Sort as subroutine
- **Not comparison-based** — extracts and counts digits
- **Depends on Counting Sort** — stability is crucial for correctness
- **Best for** — fixed-length integers, phone numbers, postal codes
- **LSD approach** — simpler and naturally stable for fixed-width data
- **Interview tip** — explain when it beats comparison sorts (d < log n)`,

    'dsa-linear-search': `# DSA Linear Search

## Why Linear Search Exists

Linear Search is the **simplest and most intuitive** searching algorithm. It's the way humans naturally search — check each item one by one until you find what you're looking for.

**Key characteristics:**
- Works on **any collection** — sorted or unsorted
- No preprocessing required
- **O(n) time complexity** — simple but not always efficient
- The baseline against which other search algorithms are compared

**When it's the best choice:**
- Small datasets (n < 100)
- Unsorted data (no other option)
- Single search on data that won't be searched again
- Linked lists where random access is O(n) anyway

## Core Idea

Linear Search examines each element **sequentially** from start to end:

1. Start at the first element
2. Compare with target value
3. If match → return the index
4. If no match → move to next element
5. If end reached → element not found

\`\`\`
Array: [5, 2, 8, 1, 9, 3]
Target: 8

Step 1: Check 5 → Not 8
Step 2: Check 2 → Not 8
Step 3: Check 8 → Found! Return index 2
\`\`\`

## Step-by-Step Working

### Successful Search

\`\`\`
Array: [10, 25, 30, 45, 50]
Target: 30

i=0: arr[0]=10 == 30? No  → continue
i=1: arr[1]=25 == 30? No  → continue
i=2: arr[2]=30 == 30? Yes → return 2

Result: Found at index 2
\`\`\`

### Unsuccessful Search

\`\`\`
Array: [10, 25, 30, 45, 50]
Target: 100

i=0: arr[0]=10 == 100? No  → continue
i=1: arr[1]=25 == 100? No  → continue
i=2: arr[2]=30 == 100? No  → continue
i=3: arr[3]=45 == 100? No  → continue
i=4: arr[4]=50 == 100? No  → continue

End of array reached.
Result: Not found (-1)
\`\`\`

## Python Implementation

### Basic Linear Search

\`\`\`python
def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1

# Example
numbers = [10, 25, 30, 45, 50]
result = linear_search(numbers, 30)
print(f"Found at index: {result}")  # Found at index: 2
\`\`\`

### Pythonic Version (using enumerate)

\`\`\`python
def linear_search(arr, target):
    for index, value in enumerate(arr):
        if value == target:
            return index
    return -1

# Example
numbers = [10, 25, 30, 45, 50]
print(linear_search(numbers, 45))  # 3
print(linear_search(numbers, 100)) # -1
\`\`\`

### Find All Occurrences

\`\`\`python
def linear_search_all(arr, target):
    indices = []
    for i, value in enumerate(arr):
        if value == target:
            indices.append(i)
    return indices

# Example
numbers = [5, 2, 8, 2, 9, 2, 3]
result = linear_search_all(numbers, 2)
print(f"Found at indices: {result}")  # Found at indices: [1, 3, 5]
\`\`\`

### Search in Linked List

\`\`\`python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

def linear_search_linked_list(head, target):
    current = head
    index = 0
    
    while current:
        if current.data == target:
            return index
        current = current.next
        index += 1
    
    return -1
\`\`\`

### Search with Sentinel (Optimization)

\`\`\`python
def linear_search_sentinel(arr, target):
    n = len(arr)
    if n == 0:
        return -1
    
    # Save last element and replace with target
    last = arr[n - 1]
    arr[n - 1] = target
    
    i = 0
    while arr[i] != target:
        i += 1
    
    # Restore last element
    arr[n - 1] = last
    
    # Check if found (not the sentinel)
    if i < n - 1 or arr[n - 1] == target:
        return i
    return -1

# This eliminates the bounds check in each iteration
\`\`\`

## Dry Run with Example

Let's trace Linear Search on \`[7, 2, 9, 4, 1, 5]\` searching for \`4\`:

\`\`\`
Array: [7, 2, 9, 4, 1, 5]
Target: 4

Iteration 1:
  i = 0
  arr[0] = 7
  7 == 4? No
  Continue...

Iteration 2:
  i = 1
  arr[1] = 2
  2 == 4? No
  Continue...

Iteration 3:
  i = 2
  arr[2] = 9
  9 == 4? No
  Continue...

Iteration 4:
  i = 3
  arr[3] = 4
  4 == 4? Yes!
  Return 3

Result: Target 4 found at index 3
Comparisons made: 4
\`\`\`

## Time & Space Complexity

### Time Complexity

| Case | Complexity | Scenario |
|------|------------|----------|
| Best | O(1) | Element found at first position |
| Average | O(n/2) = O(n) | Element in middle (on average) |
| Worst | O(n) | Element at end or not present |

**Analysis:**
- Best case: Target is arr[0] → 1 comparison
- Worst case: Target is arr[n-1] or not found → n comparisons
- Average case: (1 + 2 + ... + n) / n = (n+1)/2 ≈ O(n)

### Space Complexity

| Component | Space |
|-----------|-------|
| Input array | O(n) — not counted |
| Variables | O(1) |
| **Total auxiliary** | **O(1)** |

Linear Search uses only a constant amount of extra space (loop counter).

## When to Use / When NOT to Use

### ✅ Use Linear Search When:

1. **Data is unsorted** — only option without sorting first
2. **Small dataset** — overhead of other methods not worth it
3. **Single search** — no benefit from preprocessing
4. **Linked lists** — random access is O(n) anyway
5. **Finding all occurrences** — need to check everything anyway

### ❌ Avoid Linear Search When:

1. **Large sorted dataset** — use Binary Search (O(log n))
2. **Multiple searches** — consider building a hash table
3. **Sorted array with many searches** — Binary Search wins
4. **Need fast repeated lookups** — use hash map O(1)

### Comparison with Binary Search

| Aspect | Linear Search | Binary Search |
|--------|--------------|---------------|
| Time | O(n) | O(log n) |
| Data requirement | Any | Must be sorted |
| Data structure | Any | Random access needed |
| Implementation | Very simple | Slightly complex |
| Small data | Efficient | Overhead not worth it |
| Large data | Slow | Very fast |

## Interview Tips

### Common Interview Questions

1. **Implement Linear Search** — Basic implementation
2. **Find all occurrences** — Return all indices
3. **Search in 2D matrix** — Row by row linear search
4. **Find first/last occurrence** — Variations
5. **Search in rotated array** — When to fall back to linear

### Key Points to Mention

1. **O(n) time, O(1) space** — simple complexity
2. **Works on unsorted data** — main advantage
3. **No preprocessing** — good for one-time search
4. **Baseline algorithm** — compare others against it
5. **Use case awareness** — know when it's appropriate

### Common Variations

\`\`\`python
# 1. Find minimum/maximum
def find_min(arr):
    min_val = arr[0]
    for val in arr[1:]:
        if val < min_val:
            min_val = val
    return min_val

# 2. Check if exists (boolean)
def contains(arr, target):
    for val in arr:
        if val == target:
            return True
    return False

# 3. Count occurrences
def count_occurrences(arr, target):
    count = 0
    for val in arr:
        if val == target:
            count += 1
    return count
\`\`\`

## Common Mistakes

### 1. Off-by-One Errors

\`\`\`python
# WRONG: Missing last element
for i in range(len(arr) - 1):  # Excludes last element!
    if arr[i] == target:
        return i

# CORRECT: Include all elements
for i in range(len(arr)):
    if arr[i] == target:
        return i
\`\`\`

### 2. Not Handling Empty Array

\`\`\`python
# WRONG: Crashes on empty array
def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1  # This is actually fine, but explicit check is clearer

# BETTER: Explicit empty check
def linear_search(arr, target):
    if not arr:
        return -1
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1
\`\`\`

### 3. Using Linear Search on Sorted Data

\`\`\`python
# INEFFICIENT: Data is sorted, use Binary Search!
sorted_arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
linear_search(sorted_arr, 10)  # 10 comparisons

# EFFICIENT: Use Binary Search
binary_search(sorted_arr, 10)  # 4 comparisons
\`\`\`

### 4. Returning Wrong Value Type

\`\`\`python
# WRONG: Inconsistent return types
def linear_search(arr, target):
    for i, val in enumerate(arr):
        if val == target:
            return i
    return None  # Mixing int and None

# CORRECT: Consistent return type
def linear_search(arr, target):
    for i, val in enumerate(arr):
        if val == target:
            return i
    return -1  # Always return int
\`\`\`

## Key Takeaways

- **Linear Search** checks each element sequentially until target is found
- **O(n) time complexity** — examines each element once
- **O(1) space complexity** — no extra space needed
- **Works on any data** — sorted or unsorted, any data structure
- **No preprocessing required** — start searching immediately
- **Best for small or unsorted data** — simple and effective
- **Use Binary Search** when data is sorted and searched repeatedly
- **Foundation for understanding** — baseline for comparing other algorithms
- **Interview tip** — know when to use it vs. Binary Search or hash tables`,

    'dsa-binary-search': `# DSA Binary Search

## Why Binary Search Exists

Binary Search was developed to solve a fundamental problem: **how to find an element in a sorted collection efficiently**.

**The limitation of Linear Search:**
- O(n) time — too slow for large datasets
- Searching 1 billion elements = 1 billion comparisons (worst case)

**Binary Search's breakthrough:**
- O(log n) time — dramatically faster
- Searching 1 billion elements = only ~30 comparisons!

**The key requirement:** Data must be **sorted**.

## Core Idea

Binary Search uses the **divide and conquer** strategy:

1. Look at the **middle element**
2. If it's the target → done!
3. If target is **smaller** → search left half
4. If target is **larger** → search right half
5. Repeat until found or search space is empty

\`\`\`
Sorted Array: [1, 3, 5, 7, 9, 11, 13, 15]
Target: 9

Step 1: Middle = 7, Target > 7 → search right half [9, 11, 13, 15]
Step 2: Middle = 11, Target < 11 → search left half [9]
Step 3: Middle = 9, Target = 9 → Found!

Only 3 comparisons instead of 5 (Linear Search)
\`\`\`

**Why it's called "Binary":** Each step divides the search space in half (binary = two parts).

## Step-by-Step Working

### Visual Walkthrough

\`\`\`
Array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
Target: 23

Step 1:
  left=0, right=9
  mid = (0+9)//2 = 4
  arr[4] = 16
  23 > 16 → search right
  [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
                   ↑mid      ↑search here

Step 2:
  left=5, right=9
  mid = (5+9)//2 = 7
  arr[7] = 56
  23 < 56 → search left
  [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
                       ↑←  ↑mid

Step 3:
  left=5, right=6
  mid = (5+6)//2 = 5
  arr[5] = 23
  23 == 23 → Found!

Result: Found at index 5
Comparisons: 3 (vs 6 for Linear Search)
\`\`\`

### Unsuccessful Search

\`\`\`
Array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
Target: 20

Step 1: mid=4, arr[4]=16, 20>16 → right (left=5)
Step 2: mid=7, arr[7]=56, 20<56 → left (right=6)
Step 3: mid=5, arr[5]=23, 20<23 → left (right=4)

left=5 > right=4 → Search space empty
Result: Not found (-1)
\`\`\`

## Python Implementation

### Iterative Binary Search

\`\`\`python
def binary_search(arr, target):
    left = 0
    right = len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1

# Example
numbers = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
result = binary_search(numbers, 23)
print(f"Found at index: {result}")  # Found at index: 5
\`\`\`

### Recursive Binary Search

\`\`\`python
def binary_search_recursive(arr, target, left, right):
    if left > right:
        return -1
    
    mid = (left + right) // 2
    
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search_recursive(arr, target, mid + 1, right)
    else:
        return binary_search_recursive(arr, target, left, mid - 1)

# Example
numbers = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
result = binary_search_recursive(numbers, 23, 0, len(numbers) - 1)
print(f"Found at index: {result}")  # Found at index: 5
\`\`\`

### Find First Occurrence

\`\`\`python
def find_first(arr, target):
    left, right = 0, len(arr) - 1
    result = -1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            result = mid       # Record position
            right = mid - 1    # Keep searching left
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return result

# Example
numbers = [1, 2, 2, 2, 3, 4, 5]
print(find_first(numbers, 2))  # 1 (first occurrence)
\`\`\`

### Find Last Occurrence

\`\`\`python
def find_last(arr, target):
    left, right = 0, len(arr) - 1
    result = -1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            result = mid       # Record position
            left = mid + 1     # Keep searching right
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return result

# Example
numbers = [1, 2, 2, 2, 3, 4, 5]
print(find_last(numbers, 2))  # 3 (last occurrence)
\`\`\`

### Count Occurrences

\`\`\`python
def count_occurrences(arr, target):
    first = find_first(arr, target)
    if first == -1:
        return 0
    last = find_last(arr, target)
    return last - first + 1

# Example
numbers = [1, 2, 2, 2, 3, 4, 5]
print(count_occurrences(numbers, 2))  # 3
\`\`\`

### Find Insert Position (Lower Bound)

\`\`\`python
def lower_bound(arr, target):
    """Find first position where target could be inserted."""
    left, right = 0, len(arr)
    
    while left < right:
        mid = (left + right) // 2
        if arr[mid] < target:
            left = mid + 1
        else:
            right = mid
    
    return left

# Example
numbers = [1, 3, 5, 7, 9]
print(lower_bound(numbers, 5))  # 2 (position of 5)
print(lower_bound(numbers, 6))  # 3 (where 6 would be inserted)
\`\`\`

## Dry Run with Example

Let's trace Binary Search on \`[1, 3, 5, 7, 9, 11, 13]\` searching for \`9\`:

\`\`\`
Array: [1, 3, 5, 7, 9, 11, 13]
Indices: 0  1  2  3  4   5   6
Target: 9

Iteration 1:
  left = 0, right = 6
  mid = (0 + 6) // 2 = 3
  arr[3] = 7
  9 > 7 → search right half
  Update: left = mid + 1 = 4

Iteration 2:
  left = 4, right = 6
  mid = (4 + 6) // 2 = 5
  arr[5] = 11
  9 < 11 → search left half
  Update: right = mid - 1 = 4

Iteration 3:
  left = 4, right = 4
  mid = (4 + 4) // 2 = 4
  arr[4] = 9
  9 == 9 → Found!

Result: Target 9 found at index 4
Comparisons: 3

Linear Search would need: 5 comparisons
\`\`\`

### Trace Table

| Iteration | left | right | mid | arr[mid] | Action |
|-----------|------|-------|-----|----------|--------|
| 1 | 0 | 6 | 3 | 7 | 9 > 7, go right |
| 2 | 4 | 6 | 5 | 11 | 9 < 11, go left |
| 3 | 4 | 4 | 4 | 9 | Found! |

## Time & Space Complexity

### Time Complexity

| Case | Complexity | Scenario |
|------|------------|----------|
| Best | O(1) | Target is at middle |
| Average | O(log n) | Target anywhere |
| Worst | O(log n) | Target at ends or not found |

**Why O(log n)?**
- Each comparison eliminates **half** of remaining elements
- Starting with n elements: n → n/2 → n/4 → ... → 1
- Number of halvings = log₂(n)

\`\`\`
n = 1,000,000 elements
log₂(1,000,000) ≈ 20 comparisons

n = 1,000,000,000 elements
log₂(1,000,000,000) ≈ 30 comparisons
\`\`\`

### Space Complexity

| Implementation | Space | Reason |
|----------------|-------|--------|
| Iterative | O(1) | Only loop variables |
| Recursive | O(log n) | Call stack depth |

**Recommendation:** Use iterative version to avoid stack overflow on large arrays.

## Stability & Variations

### Binary Search Variations

| Variation | Purpose | Modification |
|-----------|---------|--------------|
| Standard | Find any occurrence | Return on match |
| First occurrence | Find leftmost | Continue left after match |
| Last occurrence | Find rightmost | Continue right after match |
| Lower bound | Insert position | Return left pointer |
| Upper bound | First greater | Skip equals, go right |

### Common Binary Search Patterns

\`\`\`python
# Pattern 1: Search for exact value
while left <= right:
    mid = (left + right) // 2
    if arr[mid] == target:
        return mid
    # ...

# Pattern 2: Search for boundary
while left < right:
    mid = (left + right) // 2
    if condition(mid):
        right = mid
    else:
        left = mid + 1
return left

# Pattern 3: Search in infinite/unknown size
def exponential_search(arr, target):
    if arr[0] == target:
        return 0
    i = 1
    while i < len(arr) and arr[i] <= target:
        i *= 2
    return binary_search(arr, target, i // 2, min(i, len(arr) - 1))
\`\`\`

## When to Use / When NOT to Use

### ✅ Use Binary Search When:

1. **Data is sorted** — fundamental requirement
2. **Random access available** — arrays, not linked lists
3. **Multiple searches** — preprocessing (sorting) is worth it
4. **Large dataset** — O(log n) benefit is significant
5. **Finding boundaries** — first/last occurrence, insert position

### ❌ Avoid Binary Search When:

1. **Data is unsorted** — would need O(n log n) to sort first
2. **Single search on unsorted data** — Linear Search is O(n) vs O(n log n) + O(log n)
3. **Linked lists** — no random access, mid finding is O(n)
4. **Small dataset** — overhead not worth it
5. **Frequent insertions** — maintaining sorted order is expensive

### Binary Search vs Linear Search

| Scenario | Best Choice | Reason |
|----------|------------|--------|
| Unsorted, single search | Linear | No sorting needed |
| Unsorted, multiple searches | Sort + Binary | Amortized cost |
| Sorted, any number of searches | Binary | Always faster |
| Small n (< 50) | Either | Difference negligible |
| Large n (> 1000) | Binary | Huge time savings |

## Interview Tips

### Common Interview Questions

1. **Implement Binary Search** — Know iterative and recursive
2. **Find first/last occurrence** — Very common variation
3. **Search in rotated sorted array** — Modified binary search
4. **Find peak element** — Binary search on conditions
5. **Search in 2D sorted matrix** — Binary search in 2D
6. **Find square root** — Binary search on answer

### Key Points to Mention

1. **O(log n) time** — halving search space each step
2. **Requires sorted data** — fundamental prerequisite
3. **Iterative vs recursive** — iterative is space-efficient
4. **Integer overflow** — use \`left + (right - left) // 2\`
5. **Boundary conditions** — \`left <= right\` vs \`left < right\`

### Advanced Applications

\`\`\`python
# 1. Search in Rotated Sorted Array
def search_rotated(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid
        
        # Left half is sorted
        if arr[left] <= arr[mid]:
            if arr[left] <= target < arr[mid]:
                right = mid - 1
            else:
                left = mid + 1
        # Right half is sorted
        else:
            if arr[mid] < target <= arr[right]:
                left = mid + 1
            else:
                right = mid - 1
    
    return -1

# 2. Find Peak Element
def find_peak(arr):
    left, right = 0, len(arr) - 1
    
    while left < right:
        mid = (left + right) // 2
        if arr[mid] < arr[mid + 1]:
            left = mid + 1
        else:
            right = mid
    
    return left

# 3. Binary Search on Answer (Square Root)
def sqrt(n):
    if n < 2:
        return n
    
    left, right = 1, n // 2
    
    while left <= right:
        mid = (left + right) // 2
        if mid * mid == n:
            return mid
        elif mid * mid < n:
            left = mid + 1
        else:
            right = mid - 1
    
    return right  # Floor of sqrt
\`\`\`

## Common Mistakes

### 1. Integer Overflow in Mid Calculation

\`\`\`python
# WRONG: Can overflow in some languages
mid = (left + right) // 2  # If left + right > MAX_INT

# CORRECT: Prevents overflow
mid = left + (right - left) // 2
\`\`\`

### 2. Wrong Loop Condition

\`\`\`python
# WRONG: Misses single element
while left < right:  # When left == right, element is skipped!

# CORRECT: Include the case when left == right
while left <= right:
\`\`\`

### 3. Infinite Loop

\`\`\`python
# WRONG: Not updating boundaries correctly
while left <= right:
    mid = (left + right) // 2
    if arr[mid] < target:
        left = mid  # Should be mid + 1!
    else:
        right = mid  # Should be mid - 1!

# CORRECT: Proper boundary updates
left = mid + 1   # Skip current mid when going right
right = mid - 1  # Skip current mid when going left
\`\`\`

### 4. Wrong Return Value

\`\`\`python
# WRONG: Returning mid after loop (it's stale)
while left <= right:
    # ...search logic...
return mid  # mid hasn't been updated!

# CORRECT: Return -1 after loop (not found)
return -1
\`\`\`

### 5. Using on Unsorted Data

\`\`\`python
# WRONG: Binary search on unsorted array
arr = [5, 2, 8, 1, 9]
binary_search(arr, 8)  # Undefined behavior!

# CORRECT: Sort first or use linear search
arr.sort()  # [1, 2, 5, 8, 9]
binary_search(arr, 8)  # Now works correctly
\`\`\`

## Key Takeaways

- **Binary Search** finds elements in O(log n) by halving the search space
- **Requires sorted data** — fundamental prerequisite
- **O(log n) time** — 30 comparisons for 1 billion elements
- **O(1) space** — iterative version uses constant extra space
- **Integer overflow** — use \`left + (right - left) // 2\`
- **Boundary conditions** — most common source of bugs
- **Variations are important** — first/last occurrence, lower/upper bound
- **Works on answer space** — can search for conditions, not just values
- **Foundation for many algorithms** — rotated array, peak finding, sqrt
- **Interview essential** — know it perfectly, including all variations`,

    'dsa-linked-lists': `# DSA Linked Lists

## What is a Linked List?

A **Linked List** is a linear data structure where elements (called **nodes**) are stored in non-contiguous memory locations and connected through **pointers** (references).

Unlike arrays where elements sit next to each other in memory, linked list nodes can be scattered anywhere in memory, with each node "pointing" to the next one.

\`\`\`
Array:     [10][20][30][40][50]  ← Contiguous memory
            ↓   ↓   ↓   ↓   ↓
Addresses: 100 104 108 112 116

Linked List: [10|→] → [20|→] → [30|→] → [40|→] → [50|∅]
              ↓         ↓         ↓         ↓         ↓
Addresses:   500       108       300       756       200
             (scattered in memory)
\`\`\`

## Why Linked Lists Exist

### Problems with Arrays:

1. **Fixed size** (in many languages) — can't grow dynamically
2. **Expensive insertions/deletions** — shifting elements is O(n)
3. **Memory waste** — may allocate more than needed
4. **Contiguous memory required** — large arrays may fail to allocate

### Linked Lists Solve These:

1. **Dynamic size** — grows and shrinks as needed
2. **Efficient insertions/deletions** — O(1) at known positions
3. **No wasted space** — uses exactly what's needed
4. **No contiguous memory needed** — nodes can be anywhere

## Real-World Analogies

### 🚂 Train Carriages
Each carriage (node) connects to the next via a coupling (pointer). You can add or remove carriages without rebuilding the entire train.

### 📿 Beads on a String
Each bead knows which bead comes next. The string (pointer) connects them, not physical proximity.

### 🔗 Chain Links
Each link holds onto the next link. Breaking one link doesn't destroy the others — you just reconnect.

### 📝 Scavenger Hunt
Each clue tells you where to find the next clue. The clues don't need to be in order physically.

## Linked List vs Array Comparison

| Operation | Array | Linked List |
|-----------|-------|-------------|
| Access by index | O(1) ✓ | O(n) |
| Insert at beginning | O(n) | O(1) ✓ |
| Insert at end | O(1)* | O(n) or O(1)** |
| Insert at middle | O(n) | O(1)*** |
| Delete at beginning | O(n) | O(1) ✓ |
| Delete at end | O(1) | O(n) or O(1)** |
| Search | O(n) | O(n) |
| Memory | Contiguous | Non-contiguous ✓ |
| Cache performance | Excellent ✓ | Poor |

\\* O(1) amortized for dynamic arrays
\\** O(1) with tail pointer
\\*** O(1) if you have reference to the position

## Time & Space Complexity Overview

### Time Complexity

| Operation | Best Case | Average Case | Worst Case |
|-----------|-----------|--------------|------------|
| Access | O(1) | O(n) | O(n) |
| Search | O(1) | O(n) | O(n) |
| Insertion | O(1) | O(1) | O(1) |
| Deletion | O(1) | O(1) | O(1) |

**Note**: Insertion/deletion are O(1) once you have the position. Finding the position is O(n).

### Space Complexity

- **Per node**: O(1) for data + O(1) for pointer = O(1)
- **Total**: O(n) for n nodes
- **Extra overhead**: Each node needs pointer space (8 bytes on 64-bit systems)

## Python Implementation

### Node Class

\`\`\`python
class Node:
    def __init__(self, data):
        self.data = data  # Store the value
        self.next = None  # Pointer to next node (initially None)

# Creating individual nodes
node1 = Node(10)
node2 = Node(20)
node3 = Node(30)

print(node1.data)  # Output: 10
print(node1.next)  # Output: None
\`\`\`

### Creating a Simple Linked List

\`\`\`python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None  # Initially empty
    
    def append(self, data):
        new_node = Node(data)
        
        # If list is empty, new node becomes head
        if self.head is None:
            self.head = new_node
            return
        
        # Otherwise, traverse to the end
        current = self.head
        while current.next:
            current = current.next
        
        # Link the last node to new node
        current.next = new_node
    
    def display(self):
        elements = []
        current = self.head
        while current:
            elements.append(current.data)
            current = current.next
        print(" -> ".join(map(str, elements)) + " -> None")

# Example usage
my_list = LinkedList()
my_list.append(10)
my_list.append(20)
my_list.append(30)
my_list.display()
# Output: 10 -> 20 -> 30 -> None
\`\`\`

### Traversing the List

\`\`\`python
def traverse(self):
    current = self.head
    while current is not None:
        print(f"Node data: {current.data}")
        current = current.next  # Move to next node

def count_nodes(self):
    count = 0
    current = self.head
    while current:
        count += 1
        current = current.next
    return count

def find(self, target):
    current = self.head
    index = 0
    while current:
        if current.data == target:
            return index
        current = current.next
        index += 1
    return -1  # Not found

# Example
my_list = LinkedList()
my_list.append(10)
my_list.append(20)
my_list.append(30)

my_list.traverse()
# Node data: 10
# Node data: 20
# Node data: 30

print(f"Total nodes: {my_list.count_nodes()}")  # 3
print(f"Index of 20: {my_list.find(20)}")       # 1
\`\`\`

## When to Use Linked Lists

### ✅ Use Linked Lists When:

1. **Frequent insertions/deletions** at the beginning
2. **Unknown size** — data grows/shrinks unpredictably
3. **No random access needed** — sequential processing is fine
4. **Implementing stacks/queues** — efficient push/pop
5. **Memory fragmentation concerns** — can't get contiguous block

### ❌ Avoid Linked Lists When:

1. **Random access is frequent** — arrays are O(1)
2. **Cache performance matters** — arrays have better locality
3. **Memory is tight** — pointers add overhead
4. **Simple iteration** — arrays are faster and simpler

## Key Takeaways

- **Linked List** = nodes connected by pointers, scattered in memory
- **Dynamic size** — grows and shrinks efficiently
- **O(1) insertion/deletion** — at known positions (head, or with reference)
- **O(n) access** — must traverse from head to find elements
- **Extra memory** — each node needs pointer storage
- **Foundation** for stacks, queues, graphs, and more
- **Interview essential** — understand trade-offs with arrays`,

    'dsa-linked-lists-in-memory': `# DSA Linked Lists in Memory

## How Nodes are Stored in Memory

Unlike arrays where elements occupy consecutive memory addresses, linked list nodes can exist **anywhere in memory**. Each node contains two parts:

1. **Data field** — stores the actual value
2. **Pointer/Reference field** — stores the memory address of the next node

\`\`\`
Memory Layout:

Address   | Content
----------|------------------
0x1000    | Node A: data=10, next=0x2048
0x1004    | (other data)
...       | ...
0x2048    | Node B: data=20, next=0x1500
...       | ...
0x1500    | Node C: data=30, next=NULL

Visualization:
[10|0x2048] ──→ [20|0x1500] ──→ [30|NULL]
   0x1000          0x2048          0x1500
\`\`\`

## Understanding Pointers/References

### What is a Pointer?

A **pointer** (or **reference** in Python) is a variable that stores the memory address of another variable or object.

\`\`\`
Think of it like a home address:
- The house = the actual data (Node)
- The address written on paper = the pointer (reference to Node)
- You can have multiple papers with the same address
- The address tells you WHERE to find the house, not the house itself
\`\`\`

### In Python: References

Python doesn't have explicit pointers like C/C++, but it uses **references**. When you assign an object to a variable, the variable holds a reference to that object in memory.

\`\`\`python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

# Create a node
node_a = Node(10)

# node_a holds a REFERENCE to the Node object
# It doesn't hold the Node itself, just the "address"

# Create another reference to the SAME object
node_b = node_a

# Both point to the SAME node in memory
node_b.data = 99
print(node_a.data)  # Output: 99 (same object!)
\`\`\`

## Why Linked Lists are Non-Contiguous

### Memory Allocation

When you create nodes, they're allocated wherever the memory manager finds space:

\`\`\`python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

# Creating nodes at different times
node1 = Node(10)  # Allocated at some address, say 0x1000
print(f"Node 1 address: {id(node1)}")

# Some other operations might allocate memory here...

node2 = Node(20)  # Allocated at another address, say 0x5000
print(f"Node 2 address: {id(node2)}")

node3 = Node(30)  # Allocated somewhere else, say 0x2500
print(f"Node 3 address: {id(node3)}")

# Link them together
node1.next = node2
node2.next = node3

# Now they form a chain, despite being scattered in memory
\`\`\`

**Output (addresses will vary):**
\`\`\`
Node 1 address: 140234567890
Node 2 address: 140234568120  
Node 3 address: 140234567950
\`\`\`

Notice the addresses aren't sequential!

### Comparison with Arrays

\`\`\`
ARRAY in Memory:
┌────┬────┬────┬────┬────┐
│ 10 │ 20 │ 30 │ 40 │ 50 │
└────┴────┴────┴────┴────┘
 100  104  108  112  116   ← Consecutive addresses (4 bytes apart)

LINKED LIST in Memory:
[10|→]     [20|→]     [30|→]     [40|→]     [50|∅]
  ↓          ↓          ↓          ↓          ↓
 500        1200       350        890        2100  ← Random addresses
\`\`\`

## Memory Diagram Explanation

### Textual Diagram of a 3-Node Linked List

\`\`\`
HEAP MEMORY
═══════════════════════════════════════════════════════════════

Address: 0x1000                Address: 0x2500
┌─────────────────────┐        ┌─────────────────────┐
│     NODE A          │        │     NODE B          │
├─────────────────────┤        ├─────────────────────┤
│  data: 10           │        │  data: 20           │
│  next: 0x2500 ──────┼───────→│  next: 0x1800 ──────┼───┐
└─────────────────────┘        └─────────────────────┘   │
        ↑                                                │
        │                                                │
      HEAD                                               │
                                                         │
Address: 0x1800                                          │
┌─────────────────────┐                                  │
│     NODE C          │←─────────────────────────────────┘
├─────────────────────┤
│  data: 30           │
│  next: None (NULL)  │
└─────────────────────┘

═══════════════════════════════════════════════════════════════

Logical View: HEAD → [10] → [20] → [30] → None
\`\`\`

## Python Examples with id()

### Demonstrating Memory Addresses

\`\`\`python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None
    
    def __repr__(self):
        return f"Node({self.data}) at {hex(id(self))}"

# Create nodes
node1 = Node(10)
node2 = Node(20)
node3 = Node(30)

print("Before linking:")
print(f"Node 1: {node1}")
print(f"Node 2: {node2}")
print(f"Node 3: {node3}")
print()

# Link them
node1.next = node2
node2.next = node3

print("After linking:")
print(f"Node 1 -> next points to: {hex(id(node1.next))}")
print(f"Node 2 -> next points to: {hex(id(node2.next))}")
print(f"Node 3 -> next points to: {node3.next}")
print()

# Verify the chain
print("Traversing the chain:")
current = node1
while current:
    print(f"  At {hex(id(current))}: data={current.data}, next={hex(id(current.next)) if current.next else 'None'}")
    current = current.next
\`\`\`

**Sample Output:**
\`\`\`
Before linking:
Node 1: Node(10) at 0x7f8b8c0a1a90
Node 2: Node(20) at 0x7f8b8c0a1b10
Node 3: Node(30) at 0x7f8b8c0a1b50

After linking:
Node 1 -> next points to: 0x7f8b8c0a1b10
Node 2 -> next points to: 0x7f8b8c0a1b50
Node 3 -> next points to: None

Traversing the chain:
  At 0x7f8b8c0a1a90: data=10, next=0x7f8b8c0a1b10
  At 0x7f8b8c0a1b10: data=20, next=0x7f8b8c0a1b50
  At 0x7f8b8c0a1b50: data=30, next=None
\`\`\`

### Demonstrating Reference Linking

\`\`\`python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

# Create a linked list step by step
head = Node(10)
print(f"Step 1: Created head node")
print(f"  head = Node(10) at {hex(id(head))}")
print(f"  head.next = {head.next}")
print()

# Add second node
second = Node(20)
head.next = second  # head now REFERENCES second
print(f"Step 2: Created second node and linked")
print(f"  second = Node(20) at {hex(id(second))}")
print(f"  head.next = {hex(id(head.next))}")
print(f"  Are they same object? {head.next is second}")  # True!
print()

# Add third node
third = Node(30)
second.next = third
print(f"Step 3: Created third node and linked")
print(f"  third = Node(30) at {hex(id(third))}")
print(f"  second.next = {hex(id(second.next))}")
print()

# Demonstrate that references point to SAME object
print("Proof that references point to same objects:")
head.next.data = 999  # Modify through head.next
print(f"  Changed head.next.data to 999")
print(f"  second.data = {second.data}")  # Also 999!
\`\`\`

**Output:**
\`\`\`
Step 1: Created head node
  head = Node(10) at 0x7f1234567890
  head.next = None

Step 2: Created second node and linked
  second = Node(20) at 0x7f1234567910
  head.next = 0x7f1234567910
  Are they same object? True

Step 3: Created third node and linked
  third = Node(30) at 0x7f1234567930
  second.next = 0x7f1234567930

Proof that references point to same objects:
  Changed head.next.data to 999
  second.data = 999
\`\`\`

## How Traversal Works in Memory

\`\`\`python
def traverse_with_memory_info(head):
    """Traverse and show memory addresses"""
    current = head
    step = 1
    
    while current is not None:
        next_addr = hex(id(current.next)) if current.next else "None"
        print(f"Step {step}:")
        print(f"  Current address: {hex(id(current))}")
        print(f"  Current data: {current.data}")
        print(f"  Next pointer: {next_addr}")
        print()
        
        # Follow the pointer to next node
        current = current.next
        step += 1
    
    print("Reached end of list (None)")

# Example
node1 = Node(10)
node2 = Node(20)
node3 = Node(30)
node1.next = node2
node2.next = node3

traverse_with_memory_info(node1)
\`\`\`

## Why This Matters

### Advantages of Non-Contiguous Storage:

1. **Dynamic allocation** — No need to pre-allocate large blocks
2. **No memory shifting** — Insert/delete without moving other elements
3. **Efficient memory usage** — Allocate exactly what's needed
4. **No fragmentation issues** — Can use scattered free memory

### Disadvantages:

1. **Poor cache performance** — CPU cache prefers contiguous data
2. **Extra memory per node** — Pointer overhead (8 bytes on 64-bit)
3. **No random access** — Must traverse from head
4. **Memory overhead** — Object metadata in Python

## Key Takeaways

- Linked list nodes are **scattered in memory**, connected by pointers
- Each node stores **data + reference** to the next node
- Python uses **references** (similar to pointers) for linking
- **id()** function shows the memory address of an object
- Non-contiguous storage enables **efficient insertion/deletion**
- Trade-off: **Poor cache performance** compared to arrays
- Understanding memory layout is crucial for **debugging and optimization**`,

    'dsa-linked-lists-types': `# DSA Linked List Types

## Overview of Linked List Types

There are three main types of linked lists, each with different node structures and use cases:

| Type | Structure | Traversal | Memory per Node |
|------|-----------|-----------|-----------------|
| Singly Linked List | One pointer (next) | Forward only | Data + 1 pointer |
| Doubly Linked List | Two pointers (next, prev) | Both directions | Data + 2 pointers |
| Circular Linked List | Last node points to head | Endless loop | Data + 1 or 2 pointers |

---

## 1️⃣ Singly Linked List

### Definition

A **Singly Linked List** is the simplest form where each node contains:
- **Data** — the stored value
- **Next pointer** — reference to the next node

The last node's next pointer is **None** (null).

\`\`\`
HEAD → [10|→] → [20|→] → [30|→] → [40|∅]
                                      ↑
                                    NULL
\`\`\`

### Python Implementation

\`\`\`python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class SinglyLinkedList:
    def __init__(self):
        self.head = None
    
    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        
        current = self.head
        while current.next:
            current = current.next
        current.next = new_node
    
    def prepend(self, data):
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node
    
    def display(self):
        elements = []
        current = self.head
        while current:
            elements.append(str(current.data))
            current = current.next
        print(" -> ".join(elements) + " -> None")

# Example usage
sll = SinglyLinkedList()
sll.append(10)
sll.append(20)
sll.append(30)
sll.prepend(5)
sll.display()
# Output: 5 -> 10 -> 20 -> 30 -> None
\`\`\`

### Pros & Cons

| Pros | Cons |
|------|------|
| Simple implementation | Can only traverse forward |
| Less memory per node | Cannot access previous node |
| Easy insertion at head | Deletion requires previous node reference |
| Good for stacks/queues | Finding tail is O(n) |

### Use Cases

- **Implementing stacks** — push/pop at head
- **Undo functionality** — single direction history
- **Hash table chaining** — collision handling
- **Simple sequential data** — when reverse traversal isn't needed

---

## 2️⃣ Doubly Linked List

### Definition

A **Doubly Linked List** has nodes with two pointers:
- **Data** — the stored value
- **Next pointer** — reference to the next node
- **Prev pointer** — reference to the previous node

\`\`\`
NULL ← [∅|10|→] ⟷ [←|20|→] ⟷ [←|30|→] ⟷ [←|40|∅] → NULL
          ↑                                    ↑
        HEAD                                 TAIL
\`\`\`

### Python Implementation

\`\`\`python
class DoublyNode:
    def __init__(self, data):
        self.data = data
        self.next = None
        self.prev = None

class DoublyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None
    
    def append(self, data):
        new_node = DoublyNode(data)
        
        if not self.head:
            self.head = new_node
            self.tail = new_node
            return
        
        new_node.prev = self.tail
        self.tail.next = new_node
        self.tail = new_node
    
    def prepend(self, data):
        new_node = DoublyNode(data)
        
        if not self.head:
            self.head = new_node
            self.tail = new_node
            return
        
        new_node.next = self.head
        self.head.prev = new_node
        self.head = new_node
    
    def display_forward(self):
        elements = []
        current = self.head
        while current:
            elements.append(str(current.data))
            current = current.next
        print("Forward:  None <-> " + " <-> ".join(elements) + " <-> None")
    
    def display_backward(self):
        elements = []
        current = self.tail
        while current:
            elements.append(str(current.data))
            current = current.prev
        print("Backward: None <-> " + " <-> ".join(elements) + " <-> None")
    
    def delete(self, data):
        current = self.head
        
        while current:
            if current.data == data:
                # Update previous node's next
                if current.prev:
                    current.prev.next = current.next
                else:
                    self.head = current.next  # Deleting head
                
                # Update next node's prev
                if current.next:
                    current.next.prev = current.prev
                else:
                    self.tail = current.prev  # Deleting tail
                
                return True
            current = current.next
        return False

# Example usage
dll = DoublyLinkedList()
dll.append(10)
dll.append(20)
dll.append(30)
dll.prepend(5)

dll.display_forward()
# Output: Forward:  None <-> 5 <-> 10 <-> 20 <-> 30 <-> None

dll.display_backward()
# Output: Backward: None <-> 30 <-> 20 <-> 10 <-> 5 <-> None

dll.delete(20)
dll.display_forward()
# Output: Forward:  None <-> 5 <-> 10 <-> 30 <-> None
\`\`\`

### Pros & Cons

| Pros | Cons |
|------|------|
| Bidirectional traversal | More memory per node |
| Easy deletion (have prev reference) | More complex implementation |
| O(1) access to tail | More pointers to maintain |
| Reverse traversal is efficient | Higher chance of bugs |

### Use Cases

- **Browser history** — forward and back buttons
- **Music playlists** — next and previous song
- **Undo/Redo** — bidirectional history
- **LRU Cache** — efficient removal from middle
- **Text editors** — cursor movement in both directions

---

## 3️⃣ Circular Linked List

### Definition

A **Circular Linked List** is a linked list where the last node points back to the first node, forming a circle.

Can be **Singly Circular** or **Doubly Circular**.

\`\`\`
Singly Circular:
    ┌────────────────────────────────┐
    ↓                                │
[10|→] → [20|→] → [30|→] → [40|→] ──┘
  ↑
HEAD

Doubly Circular:
    ┌────────────────────────────────────────┐
    ↓                                        │
[⟷|10|→] ⟷ [←|20|→] ⟷ [←|30|→] ⟷ [←|40|⟷] ──┘
    ↑                                        │
    └────────────────────────────────────────┘
\`\`\`

### Python Implementation (Singly Circular)

\`\`\`python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class CircularLinkedList:
    def __init__(self):
        self.head = None
    
    def append(self, data):
        new_node = Node(data)
        
        if not self.head:
            self.head = new_node
            new_node.next = self.head  # Points to itself
            return
        
        # Traverse to find the last node
        current = self.head
        while current.next != self.head:
            current = current.next
        
        current.next = new_node
        new_node.next = self.head  # Complete the circle
    
    def prepend(self, data):
        new_node = Node(data)
        
        if not self.head:
            self.head = new_node
            new_node.next = self.head
            return
        
        # Find the last node
        current = self.head
        while current.next != self.head:
            current = current.next
        
        new_node.next = self.head
        current.next = new_node
        self.head = new_node
    
    def display(self):
        if not self.head:
            print("Empty list")
            return
        
        elements = []
        current = self.head
        
        while True:
            elements.append(str(current.data))
            current = current.next
            if current == self.head:
                break
        
        print(" -> ".join(elements) + " -> (back to head)")
    
    def traverse_n_times(self, n):
        """Traverse the circular list n times"""
        if not self.head:
            return
        
        current = self.head
        count = 0
        
        while count < n:
            print(f"Visit {count + 1}: {current.data}")
            current = current.next
            count += 1

# Example usage
cll = CircularLinkedList()
cll.append(10)
cll.append(20)
cll.append(30)
cll.display()
# Output: 10 -> 20 -> 30 -> (back to head)

print("\\nTraversing 7 times:")
cll.traverse_n_times(7)
# Output shows it loops back!
\`\`\`

### Python Implementation (Doubly Circular)

\`\`\`python
class DoublyNode:
    def __init__(self, data):
        self.data = data
        self.next = None
        self.prev = None

class DoublyCircularLinkedList:
    def __init__(self):
        self.head = None
    
    def append(self, data):
        new_node = DoublyNode(data)
        
        if not self.head:
            self.head = new_node
            new_node.next = new_node
            new_node.prev = new_node
            return
        
        tail = self.head.prev  # Last node
        
        tail.next = new_node
        new_node.prev = tail
        new_node.next = self.head
        self.head.prev = new_node
    
    def display(self):
        if not self.head:
            print("Empty list")
            return
        
        elements = []
        current = self.head
        
        while True:
            elements.append(str(current.data))
            current = current.next
            if current == self.head:
                break
        
        print(" <-> ".join(elements) + " <-> (circular)")

# Example
dcll = DoublyCircularLinkedList()
dcll.append(10)
dcll.append(20)
dcll.append(30)
dcll.display()
# Output: 10 <-> 20 <-> 30 <-> (circular)
\`\`\`

### Pros & Cons

| Pros | Cons |
|------|------|
| No null pointers | More complex termination |
| Any node can be starting point | Infinite loop risk |
| Efficient for round-robin | Harder to detect end |
| Good for cycling data | Deletion is complex |

### Use Cases

- **Round-robin scheduling** — OS process scheduling
- **Circular buffers** — audio/video streaming
- **Multiplayer games** — turn rotation
- **Music/photo slideshows** — endless looping
- **Token ring networks** — network protocols

---

## Comparison Summary

| Feature | Singly | Doubly | Circular |
|---------|--------|--------|----------|
| Memory per node | 1 pointer | 2 pointers | 1 or 2 pointers |
| Traversal | Forward only | Both ways | Endless loop |
| Insert at head | O(1) | O(1) | O(1) or O(n) |
| Insert at tail | O(n) | O(1)* | O(n) or O(1)* |
| Delete with ref | Need prev | O(1) | Need prev |
| Implementation | Simple | Moderate | Moderate |
| Use case | Basic lists | Bidirectional | Cycling/looping |

\\* With tail pointer

## When to Use Each Type

\`\`\`
Decision Flow:

Need bidirectional traversal?
├── Yes → Doubly Linked List
└── No
    └── Need cycling/looping?
        ├── Yes → Circular Linked List
        └── No → Singly Linked List
\`\`\`

## Key Takeaways

- **Singly Linked List**: Simplest, forward-only, good for stacks/queues
- **Doubly Linked List**: Bidirectional, more memory, good for browsers/editors
- **Circular Linked List**: No end, good for round-robin and cycling
- Choose based on **traversal needs** and **memory constraints**
- All types can be combined (e.g., doubly circular)`,

    'linked-lists-operations': `# DSA Linked List Operations

## Overview

This lesson covers the essential operations for linked lists:

| Operation | Description | Time Complexity |
|-----------|-------------|-----------------|
| Insert at Head | Add node at beginning | O(1) |
| Insert at Tail | Add node at end | O(n) or O(1)* |
| Insert at Position | Add node at index | O(n) |
| Delete Head | Remove first node | O(1) |
| Delete by Value | Remove node with value | O(n) |
| Search | Find node with value | O(n) |
| Get Length | Count all nodes | O(n) |

\\* O(1) with tail pointer

---

## Complete LinkedList Class

\`\`\`python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None
    
    def __repr__(self):
        return f"Node({self.data})"

class LinkedList:
    def __init__(self):
        self.head = None
        self.size = 0
    
    def __len__(self):
        return self.size
    
    def is_empty(self):
        return self.head is None
    
    def display(self):
        if self.is_empty():
            print("Empty List")
            return
        
        elements = []
        current = self.head
        while current:
            elements.append(str(current.data))
            current = current.next
        print(" -> ".join(elements) + " -> None")
\`\`\`

---

## 1️⃣ Insertion Operations

### Insert at Head (Beginning)

**Step-by-step:**
1. Create a new node
2. Set new node's next to current head
3. Update head to point to new node
4. Increment size

\`\`\`
Before: HEAD -> [10] -> [20] -> [30] -> None
Insert 5 at head

Step 1: Create [5]
Step 2: [5].next = HEAD (which is [10])
Step 3: HEAD = [5]

After:  HEAD -> [5] -> [10] -> [20] -> [30] -> None
\`\`\`

\`\`\`python
def insert_at_head(self, data):
    """Insert a new node at the beginning. Time: O(1)"""
    new_node = Node(data)
    new_node.next = self.head
    self.head = new_node
    self.size += 1

# Example
ll = LinkedList()
ll.insert_at_head(30)
ll.insert_at_head(20)
ll.insert_at_head(10)
ll.display()
# Output: 10 -> 20 -> 30 -> None
\`\`\`

### Insert at Tail (End)

**Step-by-step:**
1. Create a new node
2. If list is empty, new node becomes head
3. Otherwise, traverse to the last node
4. Set last node's next to new node
5. Increment size

\`\`\`
Before: HEAD -> [10] -> [20] -> [30] -> None
Insert 40 at tail

Step 1: Create [40]
Step 2: Traverse to [30] (last node)
Step 3: [30].next = [40]
Step 4: [40].next = None

After:  HEAD -> [10] -> [20] -> [30] -> [40] -> None
\`\`\`

\`\`\`python
def insert_at_tail(self, data):
    """Insert a new node at the end. Time: O(n)"""
    new_node = Node(data)
    
    if self.is_empty():
        self.head = new_node
        self.size += 1
        return
    
    # Traverse to the last node
    current = self.head
    while current.next:
        current = current.next
    
    current.next = new_node
    self.size += 1

# Example
ll = LinkedList()
ll.insert_at_tail(10)
ll.insert_at_tail(20)
ll.insert_at_tail(30)
ll.display()
# Output: 10 -> 20 -> 30 -> None
\`\`\`

### Insert at Position

**Step-by-step:**
1. Validate position (0 to size)
2. If position is 0, insert at head
3. Otherwise, traverse to node at position-1
4. Insert new node after it
5. Increment size

\`\`\`
Before: HEAD -> [10] -> [20] -> [40] -> None
Insert 30 at position 2

Step 1: Traverse to position 1 (node [20])
Step 2: Create [30]
Step 3: [30].next = [20].next (which is [40])
Step 4: [20].next = [30]

After:  HEAD -> [10] -> [20] -> [30] -> [40] -> None
\`\`\`

\`\`\`python
def insert_at_position(self, position, data):
    """Insert at specific position (0-indexed). Time: O(n)"""
    # Validate position
    if position < 0 or position > self.size:
        raise IndexError(f"Position {position} out of range [0, {self.size}]")
    
    # Insert at head
    if position == 0:
        self.insert_at_head(data)
        return
    
    new_node = Node(data)
    
    # Traverse to node before the position
    current = self.head
    for _ in range(position - 1):
        current = current.next
    
    # Insert new node
    new_node.next = current.next
    current.next = new_node
    self.size += 1

# Example
ll = LinkedList()
ll.insert_at_tail(10)
ll.insert_at_tail(20)
ll.insert_at_tail(40)
ll.display()  # 10 -> 20 -> 40 -> None

ll.insert_at_position(2, 30)
ll.display()  # 10 -> 20 -> 30 -> 40 -> None

ll.insert_at_position(0, 5)
ll.display()  # 5 -> 10 -> 20 -> 30 -> 40 -> None
\`\`\`

---

## 2️⃣ Deletion Operations

### Delete Head

**Step-by-step:**
1. Check if list is empty
2. Store reference to current head
3. Update head to head.next
4. Decrement size
5. Return deleted node's data

\`\`\`
Before: HEAD -> [10] -> [20] -> [30] -> None
Delete head

Step 1: temp = HEAD (which is [10])
Step 2: HEAD = HEAD.next (which is [20])
Step 3: Return temp.data (10)

After:  HEAD -> [20] -> [30] -> None
\`\`\`

\`\`\`python
def delete_head(self):
    """Remove and return the first node. Time: O(1)"""
    if self.is_empty():
        raise IndexError("Cannot delete from empty list")
    
    deleted_data = self.head.data
    self.head = self.head.next
    self.size -= 1
    
    return deleted_data

# Example
ll = LinkedList()
ll.insert_at_tail(10)
ll.insert_at_tail(20)
ll.insert_at_tail(30)
ll.display()  # 10 -> 20 -> 30 -> None

deleted = ll.delete_head()
print(f"Deleted: {deleted}")  # Deleted: 10
ll.display()  # 20 -> 30 -> None
\`\`\`

### Delete by Value

**Step-by-step:**
1. Check if list is empty
2. If head has the value, delete head
3. Otherwise, traverse to find the node BEFORE the target
4. Update pointers to skip the target node
5. Decrement size

\`\`\`
Before: HEAD -> [10] -> [20] -> [30] -> [40] -> None
Delete node with value 30

Step 1: Traverse to find node before [30] (which is [20])
Step 2: [20].next = [30].next (which is [40])

After:  HEAD -> [10] -> [20] -> [40] -> None
\`\`\`

\`\`\`python
def delete_by_value(self, value):
    """Remove first node with given value. Time: O(n)"""
    if self.is_empty():
        raise ValueError(f"Value {value} not found in empty list")
    
    # Special case: deleting head
    if self.head.data == value:
        self.head = self.head.next
        self.size -= 1
        return True
    
    # Find the node BEFORE the target
    current = self.head
    while current.next:
        if current.next.data == value:
            current.next = current.next.next
            self.size -= 1
            return True
        current = current.next
    
    raise ValueError(f"Value {value} not found in list")

# Example
ll = LinkedList()
ll.insert_at_tail(10)
ll.insert_at_tail(20)
ll.insert_at_tail(30)
ll.insert_at_tail(40)
ll.display()  # 10 -> 20 -> 30 -> 40 -> None

ll.delete_by_value(30)
ll.display()  # 10 -> 20 -> 40 -> None

ll.delete_by_value(10)  # Delete head
ll.display()  # 20 -> 40 -> None
\`\`\`

### Delete at Position

\`\`\`python
def delete_at_position(self, position):
    """Remove node at specific position. Time: O(n)"""
    if position < 0 or position >= self.size:
        raise IndexError(f"Position {position} out of range [0, {self.size - 1}]")
    
    # Delete head
    if position == 0:
        return self.delete_head()
    
    # Traverse to node before the position
    current = self.head
    for _ in range(position - 1):
        current = current.next
    
    deleted_data = current.next.data
    current.next = current.next.next
    self.size -= 1
    
    return deleted_data

# Example
ll = LinkedList()
for i in [10, 20, 30, 40, 50]:
    ll.insert_at_tail(i)
ll.display()  # 10 -> 20 -> 30 -> 40 -> 50 -> None

ll.delete_at_position(2)  # Delete 30
ll.display()  # 10 -> 20 -> 40 -> 50 -> None
\`\`\`

---

## 3️⃣ Search Operation

**Step-by-step:**
1. Start from head
2. Traverse each node
3. Compare node data with target
4. If found, return index
5. If end reached, return -1

\`\`\`python
def search(self, value):
    """Find index of first occurrence. Time: O(n)"""
    current = self.head
    index = 0
    
    while current:
        if current.data == value:
            return index
        current = current.next
        index += 1
    
    return -1  # Not found

def contains(self, value):
    """Check if value exists. Time: O(n)"""
    return self.search(value) != -1

def get(self, index):
    """Get data at index. Time: O(n)"""
    if index < 0 or index >= self.size:
        raise IndexError(f"Index {index} out of range")
    
    current = self.head
    for _ in range(index):
        current = current.next
    
    return current.data

# Example
ll = LinkedList()
for i in [10, 20, 30, 40, 50]:
    ll.insert_at_tail(i)

print(ll.search(30))     # 2
print(ll.search(100))    # -1
print(ll.contains(20))   # True
print(ll.get(3))         # 40
\`\`\`

---

## 4️⃣ Length Calculation

\`\`\`python
def length(self):
    """Calculate length by traversing. Time: O(n)"""
    count = 0
    current = self.head
    
    while current:
        count += 1
        current = current.next
    
    return count

def length_recursive(self, node=None, first_call=True):
    """Calculate length recursively. Time: O(n)"""
    if first_call:
        node = self.head
    
    if node is None:
        return 0
    
    return 1 + self.length_recursive(node.next, False)

# Note: Our LinkedList class tracks size, so len() is O(1)
# But this shows how to calculate without tracking

# Example
ll = LinkedList()
for i in [10, 20, 30, 40, 50]:
    ll.insert_at_tail(i)

print(len(ll))           # 5 (using __len__, O(1))
print(ll.length())       # 5 (traversal, O(n))
\`\`\`

---

## 5️⃣ Complete Implementation

\`\`\`python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None
    
    def __repr__(self):
        return f"Node({self.data})"

class LinkedList:
    def __init__(self):
        self.head = None
        self.size = 0
    
    def __len__(self):
        return self.size
    
    def is_empty(self):
        return self.head is None
    
    # ========== INSERTION ==========
    
    def insert_at_head(self, data):
        """O(1)"""
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node
        self.size += 1
    
    def insert_at_tail(self, data):
        """O(n)"""
        new_node = Node(data)
        
        if self.is_empty():
            self.head = new_node
        else:
            current = self.head
            while current.next:
                current = current.next
            current.next = new_node
        
        self.size += 1
    
    def insert_at_position(self, position, data):
        """O(n)"""
        if position < 0 or position > self.size:
            raise IndexError(f"Invalid position {position}")
        
        if position == 0:
            self.insert_at_head(data)
            return
        
        new_node = Node(data)
        current = self.head
        
        for _ in range(position - 1):
            current = current.next
        
        new_node.next = current.next
        current.next = new_node
        self.size += 1
    
    # ========== DELETION ==========
    
    def delete_head(self):
        """O(1)"""
        if self.is_empty():
            raise IndexError("Empty list")
        
        data = self.head.data
        self.head = self.head.next
        self.size -= 1
        return data
    
    def delete_by_value(self, value):
        """O(n)"""
        if self.is_empty():
            return False
        
        if self.head.data == value:
            self.head = self.head.next
            self.size -= 1
            return True
        
        current = self.head
        while current.next:
            if current.next.data == value:
                current.next = current.next.next
                self.size -= 1
                return True
            current = current.next
        
        return False
    
    def delete_at_position(self, position):
        """O(n)"""
        if position < 0 or position >= self.size:
            raise IndexError(f"Invalid position {position}")
        
        if position == 0:
            return self.delete_head()
        
        current = self.head
        for _ in range(position - 1):
            current = current.next
        
        data = current.next.data
        current.next = current.next.next
        self.size -= 1
        return data
    
    # ========== SEARCH ==========
    
    def search(self, value):
        """O(n) - Returns index or -1"""
        current = self.head
        index = 0
        
        while current:
            if current.data == value:
                return index
            current = current.next
            index += 1
        
        return -1
    
    def contains(self, value):
        """O(n)"""
        return self.search(value) != -1
    
    def get(self, index):
        """O(n)"""
        if index < 0 or index >= self.size:
            raise IndexError(f"Invalid index {index}")
        
        current = self.head
        for _ in range(index):
            current = current.next
        
        return current.data
    
    # ========== UTILITY ==========
    
    def display(self):
        elements = []
        current = self.head
        while current:
            elements.append(str(current.data))
            current = current.next
        print(" -> ".join(elements) + " -> None" if elements else "Empty List")
    
    def to_list(self):
        """Convert to Python list"""
        result = []
        current = self.head
        while current:
            result.append(current.data)
            current = current.next
        return result
    
    def reverse(self):
        """Reverse the list in-place. O(n)"""
        prev = None
        current = self.head
        
        while current:
            next_node = current.next
            current.next = prev
            prev = current
            current = next_node
        
        self.head = prev
    
    def clear(self):
        """Remove all nodes. O(1)"""
        self.head = None
        self.size = 0

# ========== EXAMPLE USAGE ==========

if __name__ == "__main__":
    ll = LinkedList()
    
    # Insertions
    ll.insert_at_tail(10)
    ll.insert_at_tail(20)
    ll.insert_at_tail(30)
    ll.insert_at_head(5)
    ll.insert_at_position(2, 15)
    
    print("After insertions:")
    ll.display()  # 5 -> 10 -> 15 -> 20 -> 30 -> None
    
    # Search
    print(f"Index of 20: {ll.search(20)}")  # 3
    print(f"Contains 100: {ll.contains(100)}")  # False
    
    # Get
    print(f"Element at index 2: {ll.get(2)}")  # 15
    
    # Deletions
    ll.delete_head()
    ll.delete_by_value(20)
    print("After deletions:")
    ll.display()  # 10 -> 15 -> 30 -> None
    
    # Reverse
    ll.reverse()
    print("After reverse:")
    ll.display()  # 30 -> 15 -> 10 -> None
    
    # Length
    print(f"Length: {len(ll)}")  # 3
\`\`\`

---

## Time Complexity Summary

| Operation | Time | Space |
|-----------|------|-------|
| Insert at head | O(1) | O(1) |
| Insert at tail | O(n) | O(1) |
| Insert at position | O(n) | O(1) |
| Delete head | O(1) | O(1) |
| Delete by value | O(n) | O(1) |
| Delete at position | O(n) | O(1) |
| Search | O(n) | O(1) |
| Get by index | O(n) | O(1) |
| Length (tracked) | O(1) | O(1) |
| Length (traverse) | O(n) | O(1) |
| Reverse | O(n) | O(1) |

## Key Takeaways

- **Insert at head** is always O(1) — just update pointers
- **Insert at tail** is O(n) without tail pointer, O(1) with
- **Deletion** requires finding the previous node
- **Search** must traverse from head — no random access
- **Track size** in the class to avoid O(n) length calculation
- **Reverse** can be done in-place with three pointers
- Understanding these operations is **essential for interviews**`,

    'dsa-stacks': `# DSA Stacks

## What is a Stack?

A **Stack** is a linear data structure that follows the **LIFO** (Last In, First Out) principle. The last element added is the first one to be removed.

Think of a stack of plates — you can only add or remove plates from the top!

\`\`\`
Stack Visualization:

    ┌─────────┐
    │    4    │ ← TOP (last added, first out)
    ├─────────┤
    │    3    │
    ├─────────┤
    │    2    │
    ├─────────┤
    │    1    │ ← BOTTOM (first added, last out)
    └─────────┘

Push 5:        Pop:
    ┌─────────┐     ┌─────────┐
    │    5    │ ←   │    X    │ → Returns 4
    ├─────────┤     ├─────────┤
    │    4    │     │    3    │ ← New TOP
    ├─────────┤     ├─────────┤
    │   ...   │     │   ...   │
\`\`\`

## LIFO Principle

**LIFO = Last In, First Out**

- The element that is added **last** is removed **first**
- The element that is added **first** is removed **last**
- Only the **top** element is accessible at any time

\`\`\`
Order of operations:
Push: 1, 2, 3, 4
Pop:  4, 3, 2, 1  ← Reverse order!
\`\`\`

## Real-World Examples

### 🍽️ Stack of Plates
You add plates to the top and remove from the top. The plate you put last is the one you'll use first.

### ↩️ Undo Operation
In text editors, Ctrl+Z undoes the **most recent** action first. Each action is pushed onto a stack, and undo pops from it.

\`\`\`
Action Stack:
[Type "Hello"] → Push
[Type " World"] → Push
[Delete "World"] → Undo pops this first!
\`\`\`

### 📞 Function Call Stack
When functions call other functions, each call is pushed onto the call stack. When a function returns, it's popped off.

\`\`\`python
def a():
    b()     # Push b() onto call stack
    
def b():
    c()     # Push c() onto call stack
    
def c():
    print("In c")  # c() completes, pop
    # Return to b(), b() completes, pop
    # Return to a(), a() completes, pop
\`\`\`

### 🌐 Browser History
The back button works like a stack — it goes to the most recently visited page.

### ✅ Other Examples
- Recursion implementation
- Expression evaluation (parentheses matching)
- Backtracking algorithms (maze solving)
- Syntax parsing in compilers

## Stack Operations

| Operation | Description | Time Complexity |
|-----------|-------------|-----------------|
| push(item) | Add item to top | O(1) |
| pop() | Remove and return top item | O(1) |
| peek() / top() | View top item without removing | O(1) |
| isEmpty() | Check if stack is empty | O(1) |
| size() | Get number of elements | O(1) |

### Visual Representation of Operations

\`\`\`
Initial: [1, 2, 3]  (3 is top)

push(4):   [1, 2, 3, 4]  → 4 added to top
pop():     [1, 2, 3] → returns 4
peek():    [1, 2, 3] → returns 3 (no change)
isEmpty(): returns False
size():    returns 3
\`\`\`

## Python Implementation Using List

Python lists can be used directly as stacks since \`append()\` and \`pop()\` are O(1).

\`\`\`python
# Using Python list as a stack

stack = []

# Push - O(1)
stack.append(10)
stack.append(20)
stack.append(30)
print(f"Stack: {stack}")  # [10, 20, 30]

# Peek - O(1)
if stack:
    top = stack[-1]
    print(f"Top element: {top}")  # 30

# Pop - O(1)
if stack:
    popped = stack.pop()
    print(f"Popped: {popped}")  # 30
print(f"Stack after pop: {stack}")  # [10, 20]

# isEmpty - O(1)
is_empty = len(stack) == 0
print(f"Is empty: {is_empty}")  # False

# Size - O(1)
print(f"Size: {len(stack)}")  # 2

# Pop all elements
while stack:
    print(f"Popping: {stack.pop()}")
# Popping: 20
# Popping: 10
\`\`\`

## Python Implementation Using Class

A proper Stack class with encapsulation and error handling:

\`\`\`python
class Stack:
    def __init__(self):
        self._items = []
    
    def push(self, item):
        """Add item to top of stack. O(1)"""
        self._items.append(item)
    
    def pop(self):
        """Remove and return top item. O(1)"""
        if self.is_empty():
            raise IndexError("Pop from empty stack")
        return self._items.pop()
    
    def peek(self):
        """Return top item without removing. O(1)"""
        if self.is_empty():
            raise IndexError("Peek from empty stack")
        return self._items[-1]
    
    def is_empty(self):
        """Check if stack is empty. O(1)"""
        return len(self._items) == 0
    
    def size(self):
        """Return number of items. O(1)"""
        return len(self._items)
    
    def clear(self):
        """Remove all items. O(1)"""
        self._items = []
    
    def __str__(self):
        return f"Stack({self._items})"
    
    def __len__(self):
        return len(self._items)
    
    def __bool__(self):
        return not self.is_empty()

# Example usage
stack = Stack()

# Push elements
stack.push(10)
stack.push(20)
stack.push(30)
print(stack)  # Stack([10, 20, 30])

# Peek
print(f"Top: {stack.peek()}")  # Top: 30

# Pop
print(f"Popped: {stack.pop()}")  # Popped: 30
print(stack)  # Stack([10, 20])

# Size and isEmpty
print(f"Size: {stack.size()}")  # Size: 2
print(f"Empty: {stack.is_empty()}")  # Empty: False

# Using in boolean context
if stack:
    print("Stack has elements")

# Pop all
while stack:
    print(f"Pop: {stack.pop()}")
\`\`\`

## Stack Implementation Using Linked List

\`\`\`python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedStack:
    def __init__(self):
        self.top = None
        self._size = 0
    
    def push(self, item):
        """Add to top. O(1)"""
        new_node = Node(item)
        new_node.next = self.top
        self.top = new_node
        self._size += 1
    
    def pop(self):
        """Remove from top. O(1)"""
        if self.is_empty():
            raise IndexError("Pop from empty stack")
        data = self.top.data
        self.top = self.top.next
        self._size -= 1
        return data
    
    def peek(self):
        """View top. O(1)"""
        if self.is_empty():
            raise IndexError("Peek from empty stack")
        return self.top.data
    
    def is_empty(self):
        return self.top is None
    
    def size(self):
        return self._size

# Usage
stack = LinkedStack()
stack.push(1)
stack.push(2)
stack.push(3)
print(stack.pop())  # 3
print(stack.peek())  # 2
\`\`\`

## Time & Space Complexity

| Operation | Array/List | Linked List |
|-----------|------------|-------------|
| push | O(1)* | O(1) |
| pop | O(1) | O(1) |
| peek | O(1) | O(1) |
| isEmpty | O(1) | O(1) |
| size | O(1) | O(1) |
| Space | O(n) | O(n) |

\\* O(1) amortized — occasionally O(n) when resizing

## Stack Overflow & Underflow

### Stack Overflow

Occurs when you try to **push** onto a stack that is **full** (in fixed-size implementations).

\`\`\`python
class FixedStack:
    def __init__(self, max_size):
        self.max_size = max_size
        self.items = []
    
    def push(self, item):
        if len(self.items) >= self.max_size:
            raise OverflowError("Stack overflow: stack is full")
        self.items.append(item)

# Example
stack = FixedStack(3)
stack.push(1)
stack.push(2)
stack.push(3)
# stack.push(4)  # Raises OverflowError!
\`\`\`

**Real-world example**: Infinite recursion causes call stack overflow:

\`\`\`python
def infinite_recursion():
    return infinite_recursion()  # Never ends!

# Python raises: RecursionError: maximum recursion depth exceeded
\`\`\`

### Stack Underflow

Occurs when you try to **pop** from an **empty** stack.

\`\`\`python
stack = []
# stack.pop()  # Raises IndexError: pop from empty list

# Proper handling:
def safe_pop(stack):
    if not stack:
        raise IndexError("Stack underflow: stack is empty")
    return stack.pop()
\`\`\`

## Common Stack Applications

### 1. Balanced Parentheses Checker

\`\`\`python
def is_balanced(expression):
    stack = []
    pairs = {')': '(', ']': '[', '}': '{'}
    
    for char in expression:
        if char in '([{':
            stack.append(char)
        elif char in ')]}':
            if not stack or stack[-1] != pairs[char]:
                return False
            stack.pop()
    
    return len(stack) == 0

# Examples
print(is_balanced("((()))"))      # True
print(is_balanced("([{}])"))      # True
print(is_balanced("((()"))        # False
print(is_balanced("([)]"))        # False
\`\`\`

### 2. Reverse a String

\`\`\`python
def reverse_string(s):
    stack = list(s)
    result = ""
    while stack:
        result += stack.pop()
    return result

print(reverse_string("hello"))  # "olleh"
\`\`\`

### 3. Evaluate Postfix Expression

\`\`\`python
def evaluate_postfix(expression):
    stack = []
    
    for token in expression.split():
        if token.isdigit():
            stack.append(int(token))
        else:
            b = stack.pop()
            a = stack.pop()
            if token == '+':
                stack.append(a + b)
            elif token == '-':
                stack.append(a - b)
            elif token == '*':
                stack.append(a * b)
            elif token == '/':
                stack.append(a // b)
    
    return stack[0]

# "3 4 + 5 *" = (3 + 4) * 5 = 35
print(evaluate_postfix("3 4 + 5 *"))  # 35
\`\`\`

## Interview Tips

### Common Interview Questions

1. **Implement a stack** — know both list and linked list versions
2. **Balanced parentheses** — classic stack problem
3. **Min stack** — O(1) getMin operation
4. **Evaluate expressions** — postfix, infix conversion
5. **Two stacks in one array** — space optimization
6. **Stack using queues** — understand the trade-offs

### Key Points to Remember

- Stack = LIFO (Last In, First Out)
- All operations are O(1)
- Used for backtracking, undo, recursion
- Call stack in programming uses this concept
- Watch for overflow/underflow

## Key Takeaways

- **Stack** follows LIFO — last in, first out
- **Core operations**: push, pop, peek, isEmpty — all O(1)
- **Python list** works as a stack with append() and pop()
- **Use cases**: undo, backtracking, expression evaluation, function calls
- **Overflow** = pushing to full stack; **Underflow** = popping from empty
- **Foundational** for recursion, DFS, and many algorithms`,

    'dsa-queues': `# DSA Queues

## What is a Queue?

A **Queue** is a linear data structure that follows the **FIFO** (First In, First Out) principle. The first element added is the first one to be removed.

Think of a line at a ticket counter — the first person in line gets served first!

\`\`\`
Queue Visualization:

FRONT                                    REAR
  ↓                                        ↓
┌─────┬─────┬─────┬─────┬─────┐
│  1  │  2  │  3  │  4  │  5  │
└─────┴─────┴─────┴─────┴─────┘
  ↑                           ↑
Dequeue                    Enqueue
(remove)                    (add)

Enqueue 6:
┌─────┬─────┬─────┬─────┬─────┬─────┐
│  1  │  2  │  3  │  4  │  5  │  6  │
└─────┴─────┴─────┴─────┴─────┴─────┘

Dequeue:
┌─────┬─────┬─────┬─────┬─────┐
│  2  │  3  │  4  │  5  │  6  │ → Returns 1
└─────┴─────┴─────┴─────┴─────┘
\`\`\`

## FIFO Principle

**FIFO = First In, First Out**

- The element added **first** is removed **first**
- The element added **last** is removed **last**
- Elements enter at the **rear** and leave from the **front**

\`\`\`
Order of operations:
Enqueue: 1, 2, 3, 4
Dequeue: 1, 2, 3, 4  ← Same order!
\`\`\`

## Real-World Examples

### 🎫 Ticket Line / Checkout Queue
First person in line gets served first. New people join at the back.

### 🖨️ Printer Queue
Print jobs are processed in the order they were submitted.

### 💻 CPU Task Scheduling
Operating systems use queues to manage processes waiting for CPU time.

### 📨 Message Queues
Email servers, chat applications process messages in order received.

### 🚗 Traffic Flow
Cars at a traffic light proceed in the order they arrived.

### ✅ Other Examples
- Breadth-First Search (BFS) in graphs
- Buffer for data streams
- Call center phone systems
- Order processing systems

## Queue Operations

| Operation | Description | Time Complexity |
|-----------|-------------|-----------------|
| enqueue(item) | Add item to rear | O(1) |
| dequeue() | Remove and return front item | O(1)* |
| front() / peek() | View front item without removing | O(1) |
| isEmpty() | Check if queue is empty | O(1) |
| size() | Get number of elements | O(1) |

\\* O(1) with deque, O(n) with list

### Visual Representation of Operations

\`\`\`
Initial: [1, 2, 3]  (1 is front, 3 is rear)

enqueue(4):  [1, 2, 3, 4]  → 4 added to rear
dequeue():   [2, 3, 4] → returns 1
front():     [2, 3, 4] → returns 2 (no change)
isEmpty():   returns False
size():      returns 3
\`\`\`

## Python Implementation Using List

⚠️ **Warning**: Using list for queue has O(n) dequeue because removing from front shifts all elements!

\`\`\`python
# Using Python list as a queue (NOT RECOMMENDED for large queues)

queue = []

# Enqueue - O(1)
queue.append(10)
queue.append(20)
queue.append(30)
print(f"Queue: {queue}")  # [10, 20, 30]

# Front/Peek - O(1)
if queue:
    front = queue[0]
    print(f"Front element: {front}")  # 10

# Dequeue - O(n) ⚠️ SLOW!
if queue:
    dequeued = queue.pop(0)  # Shifts all elements!
    print(f"Dequeued: {dequeued}")  # 10
print(f"Queue after dequeue: {queue}")  # [20, 30]

# isEmpty - O(1)
is_empty = len(queue) == 0
print(f"Is empty: {is_empty}")  # False

# Size - O(1)
print(f"Size: {len(queue)}")  # 2
\`\`\`

## Python Implementation Using collections.deque

**Recommended!** \`deque\` provides O(1) operations for both ends.

\`\`\`python
from collections import deque

# Using deque as a queue (RECOMMENDED)

queue = deque()

# Enqueue - O(1)
queue.append(10)
queue.append(20)
queue.append(30)
print(f"Queue: {list(queue)}")  # [10, 20, 30]

# Front/Peek - O(1)
if queue:
    front = queue[0]
    print(f"Front element: {front}")  # 10

# Rear - O(1)
if queue:
    rear = queue[-1]
    print(f"Rear element: {rear}")  # 30

# Dequeue - O(1) ✓ FAST!
if queue:
    dequeued = queue.popleft()
    print(f"Dequeued: {dequeued}")  # 10
print(f"Queue after dequeue: {list(queue)}")  # [20, 30]

# isEmpty - O(1)
is_empty = len(queue) == 0
print(f"Is empty: {is_empty}")  # False

# Size - O(1)
print(f"Size: {len(queue)}")  # 2
\`\`\`

## Queue Class Implementation

\`\`\`python
from collections import deque

class Queue:
    def __init__(self):
        self._items = deque()
    
    def enqueue(self, item):
        """Add item to rear. O(1)"""
        self._items.append(item)
    
    def dequeue(self):
        """Remove and return front item. O(1)"""
        if self.is_empty():
            raise IndexError("Dequeue from empty queue")
        return self._items.popleft()
    
    def front(self):
        """Return front item without removing. O(1)"""
        if self.is_empty():
            raise IndexError("Front from empty queue")
        return self._items[0]
    
    def rear(self):
        """Return rear item without removing. O(1)"""
        if self.is_empty():
            raise IndexError("Rear from empty queue")
        return self._items[-1]
    
    def is_empty(self):
        """Check if queue is empty. O(1)"""
        return len(self._items) == 0
    
    def size(self):
        """Return number of items. O(1)"""
        return len(self._items)
    
    def clear(self):
        """Remove all items. O(1)"""
        self._items.clear()
    
    def __str__(self):
        return f"Queue({list(self._items)})"
    
    def __len__(self):
        return len(self._items)
    
    def __bool__(self):
        return not self.is_empty()

# Example usage
queue = Queue()

queue.enqueue(10)
queue.enqueue(20)
queue.enqueue(30)
print(queue)  # Queue([10, 20, 30])

print(f"Front: {queue.front()}")  # Front: 10
print(f"Rear: {queue.rear()}")    # Rear: 30

print(f"Dequeued: {queue.dequeue()}")  # Dequeued: 10
print(queue)  # Queue([20, 30])

print(f"Size: {queue.size()}")  # Size: 2

while queue:
    print(f"Dequeue: {queue.dequeue()}")
\`\`\`

## Queue Using Linked List

\`\`\`python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedQueue:
    def __init__(self):
        self.front = None
        self.rear = None
        self._size = 0
    
    def enqueue(self, item):
        """Add to rear. O(1)"""
        new_node = Node(item)
        
        if self.is_empty():
            self.front = new_node
            self.rear = new_node
        else:
            self.rear.next = new_node
            self.rear = new_node
        
        self._size += 1
    
    def dequeue(self):
        """Remove from front. O(1)"""
        if self.is_empty():
            raise IndexError("Dequeue from empty queue")
        
        data = self.front.data
        self.front = self.front.next
        
        if self.front is None:
            self.rear = None
        
        self._size -= 1
        return data
    
    def peek(self):
        """View front. O(1)"""
        if self.is_empty():
            raise IndexError("Peek from empty queue")
        return self.front.data
    
    def is_empty(self):
        return self.front is None
    
    def size(self):
        return self._size

# Usage
queue = LinkedQueue()
queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3)
print(queue.dequeue())  # 1
print(queue.peek())     # 2
\`\`\`

---

## Types of Queues

### 1. Simple Queue (Linear Queue)

The basic queue where elements enter at rear and exit from front.

\`\`\`
[1] → [2] → [3] → [4]
 ↑                  ↑
FRONT              REAR
\`\`\`

**Limitation**: In array implementation, space at front is wasted after dequeue.

### 2. Circular Queue

The rear connects back to the front, forming a circle. Efficiently reuses space.

\`\`\`
        ┌────────────────┐
        ↓                │
    [3] [4] [_] [_] [1] [2]
         ↑           ↑
       REAR        FRONT
        
When rear reaches end, it wraps to beginning
\`\`\`

\`\`\`python
class CircularQueue:
    def __init__(self, capacity):
        self.capacity = capacity
        self.queue = [None] * capacity
        self.front = -1
        self.rear = -1
        self.size = 0
    
    def is_full(self):
        return self.size == self.capacity
    
    def is_empty(self):
        return self.size == 0
    
    def enqueue(self, item):
        if self.is_full():
            raise OverflowError("Queue is full")
        
        if self.is_empty():
            self.front = 0
        
        self.rear = (self.rear + 1) % self.capacity
        self.queue[self.rear] = item
        self.size += 1
    
    def dequeue(self):
        if self.is_empty():
            raise IndexError("Queue is empty")
        
        item = self.queue[self.front]
        
        if self.front == self.rear:
            self.front = -1
            self.rear = -1
        else:
            self.front = (self.front + 1) % self.capacity
        
        self.size -= 1
        return item
    
    def peek(self):
        if self.is_empty():
            raise IndexError("Queue is empty")
        return self.queue[self.front]

# Example
cq = CircularQueue(5)
cq.enqueue(1)
cq.enqueue(2)
cq.enqueue(3)
print(cq.dequeue())  # 1
cq.enqueue(4)
cq.enqueue(5)
cq.enqueue(6)  # Wraps around to reuse space!
\`\`\`

### 3. Deque (Double-Ended Queue)

Allows insertion and deletion at **both ends**.

\`\`\`
Add/Remove ← [1] [2] [3] [4] [5] → Add/Remove
            FRONT            REAR
\`\`\`

\`\`\`python
from collections import deque

# Python's deque IS a double-ended queue!
dq = deque()

# Add to both ends
dq.append(2)       # Add to rear: [2]
dq.append(3)       # Add to rear: [2, 3]
dq.appendleft(1)   # Add to front: [1, 2, 3]

print(list(dq))    # [1, 2, 3]

# Remove from both ends
dq.pop()           # Remove from rear: returns 3
dq.popleft()       # Remove from front: returns 1

print(list(dq))    # [2]
\`\`\`

**Use cases**:
- Sliding window problems
- Implementing both stack and queue
- Palindrome checking

### 4. Priority Queue

Elements are dequeued based on **priority**, not insertion order.

\`\`\`
Insert (2, "B"), (1, "A"), (3, "C")
Dequeue order: "A" (priority 1), "B" (priority 2), "C" (priority 3)
\`\`\`

\`\`\`python
import heapq

# Using heapq (min-heap)
priority_queue = []

# Enqueue with priority (lower number = higher priority)
heapq.heappush(priority_queue, (2, "Task B"))
heapq.heappush(priority_queue, (1, "Task A"))  # Higher priority
heapq.heappush(priority_queue, (3, "Task C"))

print(priority_queue)  # [(1, 'Task A'), (2, 'Task B'), (3, 'Task C')]

# Dequeue by priority
while priority_queue:
    priority, task = heapq.heappop(priority_queue)
    print(f"Processing: {task} (priority {priority})")

# Output:
# Processing: Task A (priority 1)
# Processing: Task B (priority 2)
# Processing: Task C (priority 3)
\`\`\`

\`\`\`python
# Using queue.PriorityQueue (thread-safe)
from queue import PriorityQueue

pq = PriorityQueue()
pq.put((2, "Medium priority"))
pq.put((1, "High priority"))
pq.put((3, "Low priority"))

while not pq.empty():
    print(pq.get())
# (1, 'High priority')
# (2, 'Medium priority')
# (3, 'Low priority')
\`\`\`

**Use cases**:
- Dijkstra's algorithm
- Task scheduling by priority
- Event-driven simulation
- Huffman coding

---

## Time Complexity Comparison

| Operation | List | deque | Circular Array | Priority Queue |
|-----------|------|-------|----------------|----------------|
| Enqueue | O(1) | O(1) | O(1) | O(log n) |
| Dequeue | O(n) ⚠️ | O(1) | O(1) | O(log n) |
| Peek | O(1) | O(1) | O(1) | O(1) |
| isEmpty | O(1) | O(1) | O(1) | O(1) |

**Key insight**: Always use \`deque\` for queues in Python, not lists!

---

## Stack vs Queue Comparison

| Feature | Stack | Queue |
|---------|-------|-------|
| Principle | LIFO | FIFO |
| Insert | push (top) | enqueue (rear) |
| Remove | pop (top) | dequeue (front) |
| Access | Top only | Front only |
| Real example | Undo/Redo | Waiting line |
| Algorithm use | DFS, recursion | BFS, scheduling |

\`\`\`
Stack:              Queue:
Push → [TOP]        Enqueue → [REAR]
Pop  ← [TOP]        Dequeue ← [FRONT]

Stack: 1,2,3 → Pop: 3,2,1 (reversed)
Queue: 1,2,3 → Dequeue: 1,2,3 (same order)
\`\`\`

---

## Common Queue Applications

### 1. BFS (Breadth-First Search)

\`\`\`python
from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    result = []
    
    while queue:
        node = queue.popleft()
        if node not in visited:
            visited.add(node)
            result.append(node)
            queue.extend(graph[node])
    
    return result

graph = {
    'A': ['B', 'C'],
    'B': ['D', 'E'],
    'C': ['F'],
    'D': [], 'E': [], 'F': []
}
print(bfs(graph, 'A'))  # ['A', 'B', 'C', 'D', 'E', 'F']
\`\`\`

### 2. Level Order Tree Traversal

\`\`\`python
from collections import deque

def level_order(root):
    if not root:
        return []
    
    result = []
    queue = deque([root])
    
    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.popleft()
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        result.append(level)
    
    return result
\`\`\`

### 3. Task Scheduler Simulation

\`\`\`python
from collections import deque

def process_tasks(tasks):
    queue = deque(tasks)
    
    while queue:
        task = queue.popleft()
        print(f"Processing: {task}")
        # Task completed

process_tasks(["Email", "Report", "Meeting", "Code Review"])
\`\`\`

---

## Interview Tips

### Common Interview Questions

1. **Implement a queue using two stacks**
2. **Implement a stack using two queues**
3. **Circular queue implementation**
4. **Design a recent calls counter**
5. **Sliding window maximum** (using deque)
6. **First non-repeating character in stream**

### Implement Queue Using Two Stacks

\`\`\`python
class QueueUsingStacks:
    def __init__(self):
        self.stack1 = []  # For enqueue
        self.stack2 = []  # For dequeue
    
    def enqueue(self, item):
        self.stack1.append(item)
    
    def dequeue(self):
        if not self.stack2:
            while self.stack1:
                self.stack2.append(self.stack1.pop())
        
        if not self.stack2:
            raise IndexError("Queue is empty")
        
        return self.stack2.pop()

# Usage
q = QueueUsingStacks()
q.enqueue(1)
q.enqueue(2)
q.enqueue(3)
print(q.dequeue())  # 1 (FIFO!)
print(q.dequeue())  # 2
\`\`\`

### Key Points to Remember

- Queue = FIFO (First In, First Out)
- Use \`collections.deque\` in Python (O(1) operations)
- Never use \`list.pop(0)\` for large queues (O(n))
- Know circular queue for fixed-size scenarios
- Priority queue uses heap internally
- BFS uses queue; DFS uses stack

## Key Takeaways

- **Queue** follows FIFO — first in, first out
- **Core operations**: enqueue, dequeue, front, isEmpty — all O(1) with deque
- Use **collections.deque**, not list, for efficient queues
- **Circular Queue** efficiently reuses array space
- **Deque** allows operations at both ends
- **Priority Queue** processes by priority, not order
- **Use cases**: BFS, scheduling, buffering, order processing
- **Stack = LIFO, Queue = FIFO** — fundamental difference`,

    'dsa-hash-tables': `# DSA Hash Tables

## What is a Hash Table?

A **Hash Table** (also called a Hash Map or Dictionary) is a data structure that stores **key-value pairs** and provides extremely fast access to values based on their keys.

Think of it like a **dictionary** — you look up a word (key) and instantly find its definition (value), without reading through every page!

\`\`\`
Hash Table Visualization:

Key       Hash Function      Index      Value
─────     ─────────────      ─────      ─────
"apple"   → hash("apple")    →  2   →   10
"banana"  → hash("banana")   →  5   →   5
"cherry"  → hash("cherry")   →  1   →   15

Array (internal storage):
Index:  0      1       2       3      4       5
      [   ] [cherry] [apple] [   ] [   ] [banana]
             (15)    (10)                  (5)
\`\`\`

## Why Are Hash Tables So Fast?

Hash tables achieve **O(1) average time** for insert, delete, and lookup!

### The Magic: Direct Access

Instead of searching through elements one by one:
- **Array search**: Check each element → O(n)
- **Hash table**: Calculate index directly → O(1)

\`\`\`python
# Without hash table: O(n) search
names = ["Alice", "Bob", "Charlie", "David"]
for name in names:
    if name == "Charlie":  # Found after 3 iterations
        print("Found!")

# With hash table: O(1) lookup
ages = {"Alice": 25, "Bob": 30, "Charlie": 28, "David": 35}
print(ages["Charlie"])  # Instant access!
\`\`\`

## Real-World Analogies

### 📖 Dictionary / Phone Book
Looking up a word's definition — you don't read every page, you jump directly to the right section using the first letter.

### 🔢 Library Card Catalog
Each book has a unique call number. You use the number to find the exact shelf location instantly.

### 🏠 Address Lookup
Given a person's name, find their address. The name is the key, address is the value.

### 🎫 Ticket System
Ticket number (key) → Seat assignment (value)

## How Hash Tables Work

### Step 1: Hash Function

A **hash function** converts a key into an array index.

\`\`\`
hash("apple") → 798234 → 798234 % 10 = 4  (index 4)
hash("banana") → 523847 → 523847 % 10 = 7 (index 7)
\`\`\`

Properties of a good hash function:
- **Deterministic**: Same input → same output
- **Uniform distribution**: Spreads keys evenly
- **Fast to compute**: O(1)

\`\`\`python
# Simple hash function example
def simple_hash(key, table_size):
    hash_value = 0
    for char in str(key):
        hash_value += ord(char)  # Sum of ASCII values
    return hash_value % table_size

print(simple_hash("apple", 10))   # → 0
print(simple_hash("banana", 10))  # → 9
\`\`\`

### Step 2: Store at Index

The hash function's output determines where to store the value.

\`\`\`python
# Conceptual storage
table_size = 10
table = [None] * table_size

key = "apple"
index = simple_hash(key, table_size)  # → 0
table[index] = ("apple", 10)  # Store key-value pair
\`\`\`

### Step 3: Retrieve Value

To get a value, hash the key again to find its index.

\`\`\`python
key = "apple"
index = simple_hash(key, table_size)  # Same hash → same index
value = table[index][1]  # Get the value: 10
\`\`\`

## Collision Handling

A **collision** occurs when two different keys hash to the same index.

\`\`\`
hash("apple") % 10 = 4
hash("papel") % 10 = 4  ← Same index! Collision!
\`\`\`

### Method 1: Chaining (Separate Chaining)

Each index stores a **linked list** of all key-value pairs that hash to that index.

\`\`\`
Index 4: [("apple", 10)] → [("papel", 20)] → None

When looking up "papel":
1. hash("papel") → index 4
2. Search the linked list at index 4
3. Find key "papel", return value 20
\`\`\`

\`\`\`python
class HashTableChaining:
    def __init__(self, size=10):
        self.size = size
        self.table = [[] for _ in range(size)]
    
    def _hash(self, key):
        return hash(key) % self.size
    
    def put(self, key, value):
        index = self._hash(key)
        # Check if key exists, update if so
        for i, (k, v) in enumerate(self.table[index]):
            if k == key:
                self.table[index][i] = (key, value)
                return
        # Key doesn't exist, append
        self.table[index].append((key, value))
    
    def get(self, key):
        index = self._hash(key)
        for k, v in self.table[index]:
            if k == key:
                return v
        raise KeyError(key)
    
    def remove(self, key):
        index = self._hash(key)
        for i, (k, v) in enumerate(self.table[index]):
            if k == key:
                del self.table[index][i]
                return
        raise KeyError(key)

# Usage
ht = HashTableChaining()
ht.put("apple", 10)
ht.put("banana", 20)
ht.put("cherry", 30)
print(ht.get("banana"))  # 20
\`\`\`

### Method 2: Open Addressing

When a collision occurs, find the **next available slot** in the array.

**Linear Probing**: Check the next index, then the next, etc.

\`\`\`
Insert "apple" at index 4 → Success
Insert "papel" at index 4 → Collision!
  → Try index 5 → Empty → Insert here

Table: [_, _, _, _, "apple", "papel", _, _, _, _]
                      4        5
\`\`\`

\`\`\`python
class HashTableOpenAddressing:
    def __init__(self, size=10):
        self.size = size
        self.keys = [None] * size
        self.values = [None] * size
    
    def _hash(self, key):
        return hash(key) % self.size
    
    def put(self, key, value):
        index = self._hash(key)
        
        # Linear probing
        while self.keys[index] is not None:
            if self.keys[index] == key:
                self.values[index] = value  # Update
                return
            index = (index + 1) % self.size  # Next slot
        
        self.keys[index] = key
        self.values[index] = value
    
    def get(self, key):
        index = self._hash(key)
        
        while self.keys[index] is not None:
            if self.keys[index] == key:
                return self.values[index]
            index = (index + 1) % self.size
        
        raise KeyError(key)

# Usage
ht = HashTableOpenAddressing()
ht.put("apple", 10)
ht.put("banana", 20)
print(ht.get("apple"))  # 10
\`\`\`

### Chaining vs Open Addressing

| Aspect | Chaining | Open Addressing |
|--------|----------|-----------------|
| Extra space | Uses linked lists | No extra pointers |
| Cache performance | Poor (pointers) | Good (contiguous) |
| Load factor | Can exceed 1 | Must be < 1 |
| Deletion | Easy | Complex (tombstones) |

## Python Dictionary (Built-in Hash Table)

Python's \`dict\` is a highly optimized hash table. **Always use it!**

\`\`\`python
# Creating a hash table (dictionary)
hash_table = {}

# Insert: O(1) average
hash_table["apple"] = 10
hash_table["banana"] = 5
hash_table["cherry"] = 15

print(hash_table)  # {'apple': 10, 'banana': 5, 'cherry': 15}

# Access: O(1) average
print(hash_table["apple"])  # 10

# Update: O(1) average
hash_table["apple"] = 12
print(hash_table["apple"])  # 12

# Check if key exists: O(1) average
if "banana" in hash_table:
    print("Banana exists!")

# Safe access with .get()
print(hash_table.get("grape", 0))  # 0 (default if not found)

# Delete: O(1) average
del hash_table["cherry"]
print(hash_table)  # {'apple': 12, 'banana': 5}

# Iterate through keys
for key in hash_table:
    print(f"{key}: {hash_table[key]}")

# Iterate through key-value pairs
for key, value in hash_table.items():
    print(f"{key} = {value}")

# Get all keys and values
print(list(hash_table.keys()))    # ['apple', 'banana']
print(list(hash_table.values()))  # [12, 5]
\`\`\`

## Time Complexity

| Operation | Average Case | Worst Case |
|-----------|--------------|------------|
| Insert | O(1) | O(n) |
| Delete | O(1) | O(n) |
| Search | O(1) | O(n) |
| Access by key | O(1) | O(n) |

**Why O(n) worst case?**
When all keys hash to the same index (extreme collision), we must search through all elements.

**In practice**: With a good hash function and reasonable load factor, operations are effectively O(1).

## Load Factor

**Load Factor = (Number of entries) / (Table size)**

- Low load factor (< 0.5): Fast but wastes space
- High load factor (> 0.75): Slower due to more collisions
- Python dicts resize when load factor reaches ~0.67

\`\`\`
Load Factor 0.3:  [X] [_] [X] [_] [_] [_] [_] [X] [_] [_]
                   Fast lookups, some wasted space

Load Factor 0.9:  [X] [X] [X] [X] [_] [X] [X] [X] [X] [X]
                   More collisions, slower
\`\`\`

## Common Interview Applications

### 1. Two Sum Problem

\`\`\`python
def two_sum(nums, target):
    seen = {}  # value → index
    
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    
    return []

print(two_sum([2, 7, 11, 15], 9))  # [0, 1]
\`\`\`

### 2. Check for Duplicates

\`\`\`python
def has_duplicates(nums):
    seen = set()  # Hash set
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    return False

print(has_duplicates([1, 2, 3, 1]))  # True
\`\`\`

### 3. Group Anagrams

\`\`\`python
def group_anagrams(strs):
    groups = {}
    
    for s in strs:
        key = tuple(sorted(s))  # Sorted chars as key
        if key not in groups:
            groups[key] = []
        groups[key].append(s)
    
    return list(groups.values())

print(group_anagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))
# [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]
\`\`\`

## Key Takeaways

- **Hash Table** stores key-value pairs with O(1) average operations
- **Hash function** converts keys to array indices
- **Collisions** are handled by chaining or open addressing
- **Python dict** is a built-in, optimized hash table
- **Load factor** affects performance — resize when needed
- **Essential** for interviews: Two Sum, duplicates, frequency counting`,

    'dsa-hash-sets': `# DSA Hash Sets

## What is a Hash Set?

A **Hash Set** is a data structure that stores **unique elements** with no duplicates. It uses a hash table internally, providing O(1) average time for add, remove, and membership checking.

Think of it as a bag where you can only put one of each item!

\`\`\`
Hash Set vs List:

List: [1, 2, 2, 3, 3, 3]  ← Duplicates allowed
Set:  {1, 2, 3}           ← No duplicates!

Adding 2 to set {1, 2, 3}:
→ 2 already exists → Set stays {1, 2, 3}
\`\`\`

## Set vs List

| Feature | Set | List |
|---------|-----|------|
| Duplicates | ❌ Not allowed | ✅ Allowed |
| Order | ❌ Unordered* | ✅ Ordered |
| Indexing | ❌ No index access | ✅ list[0] works |
| Membership check | O(1) ⚡ | O(n) 🐢 |
| Use case | Unique items, fast lookup | Ordered collection |

\\* Python 3.7+ maintains insertion order, but sets are conceptually unordered.

\`\`\`python
# List: duplicates allowed, ordered
my_list = [1, 2, 2, 3]
print(my_list)      # [1, 2, 2, 3]
print(my_list[0])   # 1 (indexing works)
print(2 in my_list) # True (but O(n) search!)

# Set: no duplicates, unordered
my_set = {1, 2, 2, 3}
print(my_set)       # {1, 2, 3} (duplicate removed!)
# print(my_set[0])  # ❌ TypeError! No indexing
print(2 in my_set)  # True (O(1) search!)
\`\`\`

## Why No Duplicates?

Sets use hashing internally. When you add an element:

1. Calculate hash of the element
2. Check if element exists at that hash location
3. If exists → ignore (no duplicate)
4. If not exists → add it

\`\`\`
Adding 5 to set {1, 3, 5, 7}:
hash(5) → index 2 → already has 5 → SKIP

Adding 4 to set {1, 3, 5, 7}:
hash(4) → index 4 → empty → ADD
Result: {1, 3, 4, 5, 7}
\`\`\`

## Python Set Basics

\`\`\`python
# Creating sets
empty_set = set()           # Empty set (NOT {} which is empty dict!)
numbers = {1, 2, 3, 4, 5}   # Set literal
from_list = set([1, 2, 2, 3, 3, 3])  # From list → {1, 2, 3}

print(from_list)  # {1, 2, 3} (duplicates removed)

# Set from string (each character)
chars = set("hello")
print(chars)  # {'h', 'e', 'l', 'o'} (unique chars only)
\`\`\`

## Core Set Operations

### add(element) — O(1)

Add an element to the set. Ignored if already exists.

\`\`\`python
visited = set()

visited.add(1)
visited.add(2)
visited.add(1)  # Duplicate, ignored!

print(visited)  # {1, 2}
\`\`\`

### remove(element) — O(1)

Remove an element. **Raises KeyError if not found.**

\`\`\`python
numbers = {1, 2, 3}
numbers.remove(2)
print(numbers)  # {1, 3}

# numbers.remove(10)  # ❌ KeyError: 10
\`\`\`

### discard(element) — O(1)

Remove an element. **No error if not found.** (Safer than remove)

\`\`\`python
numbers = {1, 2, 3}
numbers.discard(2)   # Removes 2
numbers.discard(10)  # No error, does nothing
print(numbers)  # {1, 3}
\`\`\`

### in keyword — O(1) ⚡

Check if element exists. **This is the main reason to use sets!**

\`\`\`python
visited = {1, 2, 3}

print(1 in visited)   # True  — O(1)
print(10 in visited)  # False — O(1)

# Compare to list:
visited_list = [1, 2, 3]
print(1 in visited_list)  # True — but O(n)!
\`\`\`

### Other Operations

\`\`\`python
numbers = {1, 2, 3, 4, 5}

# Length
print(len(numbers))  # 5

# Pop (remove and return arbitrary element)
popped = numbers.pop()
print(f"Popped: {popped}")

# Clear all elements
numbers.clear()
print(numbers)  # set()

# Copy
original = {1, 2, 3}
copy = original.copy()
\`\`\`

## Set Operations (Math)

\`\`\`python
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

# Union: all elements from both sets
print(a | b)           # {1, 2, 3, 4, 5, 6}
print(a.union(b))      # {1, 2, 3, 4, 5, 6}

# Intersection: elements in BOTH sets
print(a & b)           # {3, 4}
print(a.intersection(b))  # {3, 4}

# Difference: elements in a but NOT in b
print(a - b)           # {1, 2}
print(a.difference(b)) # {1, 2}

# Symmetric difference: elements in either, but NOT both
print(a ^ b)           # {1, 2, 5, 6}
print(a.symmetric_difference(b))  # {1, 2, 5, 6}

# Subset/Superset
print({1, 2}.issubset({1, 2, 3}))    # True
print({1, 2, 3}.issuperset({1, 2}))  # True
\`\`\`

\`\`\`
Visual:
A = {1, 2, 3, 4}    B = {3, 4, 5, 6}

Union (A | B):          ●●●●●●    {1,2,3,4,5,6}
Intersection (A & B):     ●●      {3,4}
Difference (A - B):     ●●        {1,2}
Symmetric Diff (A ^ B): ●●  ●●    {1,2,5,6}
\`\`\`

## Time Complexity

| Operation | Average | Worst |
|-----------|---------|-------|
| add | O(1) | O(n) |
| remove | O(1) | O(n) |
| discard | O(1) | O(n) |
| in (membership) | O(1) | O(n) |
| len | O(1) | O(1) |
| union | O(n+m) | O(n+m) |
| intersection | O(min(n,m)) | O(n*m) |

**Key insight**: Membership checking (\`in\`) is O(1) — the primary advantage!

## Common Use Cases

### 1. Track Visited Elements

\`\`\`python
def has_cycle(nodes):
    visited = set()
    
    for node in nodes:
        if node in visited:
            return True  # Already seen = cycle!
        visited.add(node)
    
    return False

print(has_cycle([1, 2, 3, 4, 2]))  # True (2 appears twice)
\`\`\`

### 2. Remove Duplicates from List

\`\`\`python
numbers = [1, 2, 2, 3, 3, 3, 4]
unique = list(set(numbers))
print(unique)  # [1, 2, 3, 4]

# Preserve order (Python 3.7+)
def remove_duplicates_ordered(lst):
    seen = set()
    result = []
    for item in lst:
        if item not in seen:
            seen.add(item)
            result.append(item)
    return result

print(remove_duplicates_ordered([3, 1, 2, 1, 3]))  # [3, 1, 2]
\`\`\`

### 3. Find Common Elements

\`\`\`python
list1 = [1, 2, 3, 4, 5]
list2 = [4, 5, 6, 7, 8]

common = set(list1) & set(list2)
print(common)  # {4, 5}
\`\`\`

### 4. Check for Duplicates (Interview Classic)

\`\`\`python
def contains_duplicate(nums):
    return len(nums) != len(set(nums))

# Or more efficient (early exit):
def contains_duplicate_fast(nums):
    seen = set()
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    return False

print(contains_duplicate([1, 2, 3, 1]))  # True
print(contains_duplicate([1, 2, 3, 4]))  # False
\`\`\`

### 5. First Unique Character

\`\`\`python
def first_unique_char(s):
    seen = set()
    duplicates = set()
    
    for ch in s:
        if ch in seen:
            duplicates.add(ch)
        seen.add(ch)
    
    for i, ch in enumerate(s):
        if ch not in duplicates:
            return i
    
    return -1

print(first_unique_char("leetcode"))  # 0 ('l')
print(first_unique_char("loveleetcode"))  # 2 ('v')
\`\`\`

## Frozen Sets (Immutable)

\`\`\`python
# Regular set is mutable
regular = {1, 2, 3}
regular.add(4)  # Works

# Frozen set is immutable
frozen = frozenset([1, 2, 3])
# frozen.add(4)  # ❌ AttributeError!

# Can be used as dictionary key or in another set
set_of_sets = {frozenset([1, 2]), frozenset([3, 4])}
\`\`\`

## Interview Tips

### Common Interview Questions

1. **Contains Duplicate** — check if array has duplicates
2. **Intersection of Two Arrays** — find common elements
3. **Happy Number** — detect cycles using set
4. **Longest Consecutive Sequence** — O(n) with set
5. **Valid Sudoku** — use sets for row/col/box validation

### Longest Consecutive Sequence

\`\`\`python
def longest_consecutive(nums):
    num_set = set(nums)
    longest = 0
    
    for num in num_set:
        # Only start counting from sequence start
        if num - 1 not in num_set:
            current = num
            streak = 1
            
            while current + 1 in num_set:
                current += 1
                streak += 1
            
            longest = max(longest, streak)
    
    return longest

print(longest_consecutive([100, 4, 200, 1, 3, 2]))  # 4 (1,2,3,4)
\`\`\`

### Key Points to Remember

- Set = unique elements only
- O(1) membership check — main advantage
- Use when you need fast lookup, not order
- \`discard()\` is safer than \`remove()\`
- \`set()\` for empty set, \`{}\` is empty dict!

## Key Takeaways

- **Hash Set** stores unique elements with O(1) operations
- **Membership check** (\`in\`) is O(1) — the key advantage over lists
- **No duplicates** — automatically filtered out
- **Core operations**: add, remove, discard, in
- **Set math**: union (|), intersection (&), difference (-)
- **Use cases**: tracking visited, removing duplicates, fast lookup
- **Interview essential**: Many problems rely on O(1) set lookup`,

    'dsa-hash-maps': `# DSA Hash Maps

## What is a Hash Map?

A **Hash Map** (also called Dictionary or Associative Array) is a data structure that stores **key-value pairs**, allowing you to quickly retrieve a value using its key.

\`\`\`
Hash Map Structure:

Key         →       Value
─────────────────────────
"name"      →      "Alice"
"age"       →       25
"city"      →      "NYC"

Access: map["name"] → "Alice"  (O(1))
\`\`\`

In Python, the built-in \`dict\` is a hash map.

## Key-Value Pairs

Each entry in a hash map consists of:
- **Key**: A unique identifier (must be hashable)
- **Value**: The data associated with that key (can be anything)

\`\`\`python
# Key-Value pairs
student = {
    "name": "Alice",      # key: "name", value: "Alice"
    "age": 20,            # key: "age", value: 20
    "grades": [85, 90, 88] # key: "grades", value: [85, 90, 88]
}

# Access by key
print(student["name"])   # "Alice"
print(student["grades"]) # [85, 90, 88]
\`\`\`

### Valid Keys

Keys must be **hashable** (immutable):
- ✅ Strings, numbers, tuples
- ❌ Lists, dicts, sets

\`\`\`python
valid = {
    "string_key": 1,
    42: "number key",
    (1, 2): "tuple key"
}

# invalid = {[1, 2]: "list key"}  # ❌ TypeError: unhashable type
\`\`\`

## Hash Map vs Hash Set

| Feature | Hash Map (dict) | Hash Set (set) |
|---------|-----------------|----------------|
| Stores | Key-Value pairs | Values only |
| Access | By key | By membership |
| Syntax | \`{"a": 1}\` | \`{"a"}\` or \`{1}\` |
| Use case | Associate data | Track unique items |
| Example | Word → Count | Visited nodes |

\`\`\`python
# Hash Set: just values (unique)
visited = {1, 2, 3}
print(2 in visited)  # True

# Hash Map: key-value pairs
scores = {"Alice": 95, "Bob": 87}
print(scores["Alice"])  # 95
\`\`\`

## Python Dictionary Operations

### Creating a Dictionary

\`\`\`python
# Empty dict
empty = {}
empty = dict()

# With initial values
ages = {"Alice": 25, "Bob": 30, "Charlie": 35}

# From list of tuples
pairs = [("a", 1), ("b", 2)]
from_pairs = dict(pairs)  # {"a": 1, "b": 2}

# Dict comprehension
squares = {x: x**2 for x in range(5)}
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}
\`\`\`

### Insert / Update — O(1)

\`\`\`python
scores = {}

# Insert
scores["Alice"] = 95
scores["Bob"] = 87

# Update (same syntax)
scores["Alice"] = 98  # Updated from 95 to 98

print(scores)  # {'Alice': 98, 'Bob': 87}
\`\`\`

### Access — O(1)

\`\`\`python
scores = {"Alice": 95, "Bob": 87}

# Direct access (raises KeyError if missing)
print(scores["Alice"])  # 95
# print(scores["Charlie"])  # ❌ KeyError!

# Safe access with .get()
print(scores.get("Alice"))    # 95
print(scores.get("Charlie"))  # None (no error!)
print(scores.get("Charlie", 0))  # 0 (custom default)
\`\`\`

### Check if Key Exists — O(1)

\`\`\`python
scores = {"Alice": 95, "Bob": 87}

if "Alice" in scores:
    print("Alice found!")

if "Charlie" not in scores:
    print("Charlie not found!")
\`\`\`

### Delete — O(1)

\`\`\`python
scores = {"Alice": 95, "Bob": 87, "Charlie": 90}

# Using del
del scores["Charlie"]

# Using pop (returns the value)
bob_score = scores.pop("Bob")
print(bob_score)  # 87

# pop with default (no error if missing)
dave_score = scores.pop("Dave", 0)
print(dave_score)  # 0

print(scores)  # {'Alice': 95}
\`\`\`

## Looping Through Hash Maps

\`\`\`python
person = {"name": "Alice", "age": 25, "city": "NYC"}

# Loop through keys (default)
for key in person:
    print(key)  # name, age, city

# Explicit .keys()
for key in person.keys():
    print(key)

# Loop through values
for value in person.values():
    print(value)  # Alice, 25, NYC

# Loop through key-value pairs ⭐ Most common
for key, value in person.items():
    print(f"{key}: {value}")
# name: Alice
# age: 25
# city: NYC
\`\`\`

## Time Complexity

| Operation | Average | Worst |
|-----------|---------|-------|
| Insert | O(1) | O(n) |
| Access | O(1) | O(n) |
| Delete | O(1) | O(n) |
| Search (by key) | O(1) | O(n) |
| Iterate | O(n) | O(n) |

## Frequency Counter Pattern ⭐

The most common interview pattern using hash maps!

\`\`\`python
# Count character frequency
freq = {}
for ch in "banana":
    freq[ch] = freq.get(ch, 0) + 1

print(freq)  # {'b': 1, 'a': 3, 'n': 2}
\`\`\`

### Using collections.Counter

\`\`\`python
from collections import Counter

# One-liner frequency count
freq = Counter("banana")
print(freq)  # Counter({'a': 3, 'n': 2, 'b': 1})

# Most common elements
print(freq.most_common(2))  # [('a', 3), ('n', 2)]

# Works with any iterable
nums = [1, 2, 2, 3, 3, 3]
count = Counter(nums)
print(count)  # Counter({3: 3, 2: 2, 1: 1})
\`\`\`

## When to Use Hash Maps

### ✅ Use Hash Maps When:

1. **Counting frequencies** — character count, word count
2. **Caching/Memoization** — store computed results
3. **Two Sum pattern** — track complement values
4. **Grouping** — group anagrams, group by key
5. **Fast lookup by key** — O(1) access
6. **Mapping relationships** — graph adjacency list

### ❌ Don't Use When:

1. Need ordered data → use list
2. Need to find min/max quickly → use heap
3. Simple unique tracking → use set
4. Sorted access → use sorted list or BST

## Common Interview Patterns

### 1. Two Sum (Classic!)

\`\`\`python
def two_sum(nums, target):
    """Find two indices that add up to target."""
    seen = {}  # value → index
    
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    
    return []

print(two_sum([2, 7, 11, 15], 9))  # [0, 1]
print(two_sum([3, 2, 4], 6))      # [1, 2]
\`\`\`

### 2. Valid Anagram

\`\`\`python
def is_anagram(s, t):
    """Check if t is an anagram of s."""
    if len(s) != len(t):
        return False
    
    freq = {}
    
    # Count characters in s
    for ch in s:
        freq[ch] = freq.get(ch, 0) + 1
    
    # Subtract characters in t
    for ch in t:
        if ch not in freq:
            return False
        freq[ch] -= 1
        if freq[ch] < 0:
            return False
    
    return True

# Or simply:
def is_anagram_simple(s, t):
    from collections import Counter
    return Counter(s) == Counter(t)

print(is_anagram("anagram", "nagaram"))  # True
print(is_anagram("rat", "car"))          # False
\`\`\`

### 3. Group Anagrams

\`\`\`python
def group_anagrams(strs):
    """Group strings that are anagrams of each other."""
    groups = {}
    
    for s in strs:
        # Use sorted string as key
        key = tuple(sorted(s))
        if key not in groups:
            groups[key] = []
        groups[key].append(s)
    
    return list(groups.values())

result = group_anagrams(["eat", "tea", "tan", "ate", "nat", "bat"])
print(result)  # [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]
\`\`\`

### 4. First Non-Repeating Character

\`\`\`python
def first_unique(s):
    """Find index of first non-repeating character."""
    freq = {}
    
    # Count all characters
    for ch in s:
        freq[ch] = freq.get(ch, 0) + 1
    
    # Find first with count 1
    for i, ch in enumerate(s):
        if freq[ch] == 1:
            return i
    
    return -1

print(first_unique("leetcode"))     # 0 ('l')
print(first_unique("loveleetcode")) # 2 ('v')
\`\`\`

### 5. Subarray Sum Equals K

\`\`\`python
def subarray_sum(nums, k):
    """Count subarrays that sum to k."""
    count = 0
    prefix_sum = 0
    prefix_counts = {0: 1}  # Important: sum 0 occurs once
    
    for num in nums:
        prefix_sum += num
        
        # If (prefix_sum - k) exists, we found subarrays
        if prefix_sum - k in prefix_counts:
            count += prefix_counts[prefix_sum - k]
        
        # Record current prefix sum
        prefix_counts[prefix_sum] = prefix_counts.get(prefix_sum, 0) + 1
    
    return count

print(subarray_sum([1, 1, 1], 2))     # 2
print(subarray_sum([1, 2, 3], 3))     # 2 ([1,2] and [3])
\`\`\`

### 6. LRU Cache (Advanced)

\`\`\`python
from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = OrderedDict()
    
    def get(self, key):
        if key not in self.cache:
            return -1
        # Move to end (most recently used)
        self.cache.move_to_end(key)
        return self.cache[key]
    
    def put(self, key, value):
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)  # Remove oldest

cache = LRUCache(2)
cache.put(1, 1)
cache.put(2, 2)
print(cache.get(1))  # 1
cache.put(3, 3)      # Evicts key 2
print(cache.get(2))  # -1 (not found)
\`\`\`

## Default Dict

\`\`\`python
from collections import defaultdict

# Regular dict: KeyError if key missing
# regular = {}
# regular["missing"] += 1  # ❌ KeyError

# defaultdict: auto-creates missing keys
freq = defaultdict(int)  # Default value: 0
freq["a"] += 1
freq["b"] += 1
freq["a"] += 1
print(dict(freq))  # {'a': 2, 'b': 1}

# defaultdict with list
groups = defaultdict(list)
groups["fruits"].append("apple")
groups["fruits"].append("banana")
groups["veggies"].append("carrot")
print(dict(groups))
# {'fruits': ['apple', 'banana'], 'veggies': ['carrot']}
\`\`\`

## Interview Tips

### Key Points to Remember

1. **Hash map = O(1) key access** — core advantage
2. **Use .get()** for safe access without KeyError
3. **Frequency counter** — most common pattern
4. **defaultdict** — cleaner than checking key existence
5. **Counter** — one-liner for counting
6. **.items()** — loop through key-value pairs

### Common Mistakes

\`\`\`python
# ❌ Wrong: Checking before accessing
if key in dict:
    value = dict[key]

# ✅ Better: Use .get()
value = dict.get(key, default)

# ❌ Wrong: Verbose counting
if key not in freq:
    freq[key] = 0
freq[key] += 1

# ✅ Better: Use .get()
freq[key] = freq.get(key, 0) + 1

# ✅ Best: Use defaultdict
from collections import defaultdict
freq = defaultdict(int)
freq[key] += 1
\`\`\`

## Key Takeaways

- **Hash Map** stores key-value pairs with O(1) average access
- **Keys must be hashable** (strings, numbers, tuples)
- **Frequency counting** is the most common interview pattern
- Use **.get()** for safe access, **defaultdict** for cleaner code
- **Counter** is perfect for counting elements
- **Interview classics**: Two Sum, Anagrams, Subarray Sum
- **Essential skill** — hash maps appear in 50%+ of coding interviews!`,

    'dsa-trees': `# DSA Trees

## What is a Tree?

A **Tree** is a hierarchical data structure consisting of **nodes** connected by **edges**. Unlike linear structures (arrays, linked lists), trees organize data in a parent-child relationship.

\`\`\`
Tree Visualization:

            A          ← Root (top node)
          / | \\
         B  C  D       ← Children of A
        /\\     |
       E  F    G       ← Leaves (no children)

- A is the ROOT (no parent)
- B, C, D are CHILDREN of A
- A is the PARENT of B, C, D
- E, F, G are LEAF nodes (no children)
- B is an INTERNAL node (has children)
\`\`\`

## Tree Terminology

| Term | Definition |
|------|------------|
| **Root** | Top node with no parent |
| **Parent** | Node with children below it |
| **Child** | Node connected below a parent |
| **Leaf** | Node with no children |
| **Sibling** | Nodes sharing the same parent |
| **Edge** | Connection between two nodes |
| **Subtree** | A node and all its descendants |
| **Internal Node** | Node with at least one child |

### Height vs Depth

\`\`\`
            A        Depth 0, Height 2
          / | \\
         B  C  D     Depth 1, Height 1 (for B)
        /\\
       E  F          Depth 2, Height 0 (leaves)

DEPTH: Distance from ROOT (top-down)
  - Root has depth 0
  - Goes DOWN from root

HEIGHT: Distance to farthest LEAF (bottom-up)
  - Leaves have height 0
  - Goes UP to the node

Tree Height = Height of root = 2
\`\`\`

| Concept | Definition | Direction |
|---------|------------|-----------|
| Depth | Distance from root to node | Top → Down |
| Height | Distance from node to deepest leaf | Bottom → Up |
| Tree Height | Height of root node | - |

## Why Are Trees Important?

### 1. Hierarchical Data
Trees naturally represent hierarchical relationships:
- File systems (folders and files)
- Organization charts
- HTML DOM structure
- Family trees

### 2. Efficient Operations
- **Binary Search Trees**: O(log n) search
- **Heaps**: O(log n) priority operations
- **Tries**: Fast string operations

### 3. Ubiquitous in Interviews
Trees appear in 30%+ of coding interviews!

## Real-World Examples

### 📁 File System
\`\`\`
C:/
├── Users/
│   ├── Alice/
│   │   ├── Documents/
│   │   └── Pictures/
│   └── Bob/
└── Program Files/
    ├── Chrome/
    └── VSCode/
\`\`\`

### 🏢 Organization Hierarchy
\`\`\`
        CEO
       / | \\
     VP   VP  VP
    /|\\   |   |\\
   Mgr   Mgr Mgr Mgr
\`\`\`

### 🌐 HTML DOM
\`\`\`
<html>
├── <head>
│   └── <title>
└── <body>
    ├── <div>
    └── <p>
\`\`\`

### 🎮 Game Decision Trees
\`\`\`
        Start
       /     \\
    Attack  Defend
    /  \\      |
  Hit  Miss  Block
\`\`\`

## Python Implementation

### General Tree Node

\`\`\`python
class TreeNode:
    def __init__(self, val):
        self.val = val
        self.children = []  # List of child nodes
    
    def add_child(self, child_node):
        self.children.append(child_node)
    
    def __repr__(self):
        return f"TreeNode({self.val})"

# Create a tree
#       A
#      /|\\
#     B C D
#    /\\
#   E F

root = TreeNode("A")
b = TreeNode("B")
c = TreeNode("C")
d = TreeNode("D")
e = TreeNode("E")
f = TreeNode("F")

root.add_child(b)
root.add_child(c)
root.add_child(d)
b.add_child(e)
b.add_child(f)

print(root.val)           # A
print(root.children)      # [TreeNode(B), TreeNode(C), TreeNode(D)]
print(b.children)         # [TreeNode(E), TreeNode(F)]
\`\`\`

### Tree Traversal (General)

\`\`\`python
def print_tree(node, level=0):
    """Print tree with indentation."""
    print("  " * level + str(node.val))
    for child in node.children:
        print_tree(child, level + 1)

print_tree(root)
# A
#   B
#     E
#     F
#   C
#   D
\`\`\`

### Count Nodes

\`\`\`python
def count_nodes(root):
    if root is None:
        return 0
    count = 1  # Count this node
    for child in root.children:
        count += count_nodes(child)
    return count

print(count_nodes(root))  # 6
\`\`\`

### Find Height

\`\`\`python
def tree_height(root):
    if root is None or len(root.children) == 0:
        return 0
    
    max_child_height = 0
    for child in root.children:
        max_child_height = max(max_child_height, tree_height(child))
    
    return 1 + max_child_height

print(tree_height(root))  # 2
\`\`\`

## Tree Properties

| Property | Formula/Description |
|----------|---------------------|
| Nodes in full binary tree | 2^(h+1) - 1 max |
| Edges | N - 1 (for N nodes) |
| Leaf nodes (full binary) | 2^h |
| Min height (n nodes) | ⌊log₂(n)⌋ |

## Time Complexity Overview

| Operation | Average | Worst |
|-----------|---------|-------|
| Search | O(n) | O(n) |
| Insert | O(1)* | O(n)* |
| Delete | O(n) | O(n) |
| Traversal | O(n) | O(n) |

\\* Finding position is O(n), insertion itself is O(1)

## Types of Trees

1. **Binary Tree** — max 2 children per node
2. **Binary Search Tree (BST)** — ordered binary tree
3. **AVL Tree** — self-balancing BST
4. **Red-Black Tree** — self-balancing BST
5. **B-Tree** — used in databases
6. **Trie** — for strings/prefixes
7. **Heap** — complete binary tree with heap property

## Key Takeaways

- **Tree** = hierarchical structure with parent-child relationships
- **Root** = top node, **Leaf** = node with no children
- **Depth** = distance from root (top-down)
- **Height** = distance to deepest leaf (bottom-up)
- Trees represent: file systems, DOM, org charts, decisions
- **Foundation** for BST, heaps, tries, and more`,

    'dsa-binary-trees': `# DSA Binary Trees

## What is a Binary Tree?

A **Binary Tree** is a tree where each node has **at most two children**: a left child and a right child.

\`\`\`
Binary Tree:

        1          ← Root
       / \\
      2   3        ← Each node has at most 2 children
     / \\   \\
    4   5   6      ← Leaves

Node 1: left=2, right=3
Node 2: left=4, right=5
Node 3: left=None, right=6
\`\`\`

## Key Properties

- **Maximum 2 children** per node (left and right)
- **Ordered**: left vs right matters (unlike general trees)
- **Recursive structure**: each subtree is also a binary tree

\`\`\`
Each node:
┌─────────────┐
│    value    │
├──────┬──────┤
│ left │ right│
└──────┴──────┘
\`\`\`

## Python Implementation

\`\`\`python
class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None
    
    def __repr__(self):
        return f"TreeNode({self.val})"

# Create a binary tree
#        1
#       / \\
#      2   3
#     / \\
#    4   5

root = TreeNode(1)
root.left = TreeNode(2)
root.right = TreeNode(3)
root.left.left = TreeNode(4)
root.left.right = TreeNode(5)

print(root.val)           # 1
print(root.left.val)      # 2
print(root.right.val)     # 3
print(root.left.left.val) # 4
\`\`\`

## Types of Binary Trees

### 1. Full Binary Tree

Every node has **0 or 2 children** (no nodes with only 1 child).

\`\`\`
Full Binary Tree:      NOT Full:
       1                   1
      / \\                 / \\
     2   3               2   3
    / \\                 /
   4   5               4     ← Only 1 child!
\`\`\`

\`\`\`python
def is_full_binary_tree(root):
    if root is None:
        return True
    
    # Leaf node (0 children)
    if root.left is None and root.right is None:
        return True
    
    # Must have exactly 2 children
    if root.left and root.right:
        return is_full_binary_tree(root.left) and is_full_binary_tree(root.right)
    
    return False  # Has only 1 child
\`\`\`

### 2. Complete Binary Tree

All levels are **completely filled** except possibly the last, which is filled **left to right**.

\`\`\`
Complete:              NOT Complete:
       1                    1
      / \\                  / \\
     2   3                2   3
    / \\  /                  / \\
   4  5 6                  4   5
                               ← Gap on left!
\`\`\`

**Used in**: Heaps (binary heaps are complete binary trees)

\`\`\`python
def is_complete(root):
    if not root:
        return True
    
    from collections import deque
    queue = deque([root])
    found_null = False
    
    while queue:
        node = queue.popleft()
        
        if node is None:
            found_null = True
        else:
            if found_null:
                return False  # Non-null after null = not complete
            queue.append(node.left)
            queue.append(node.right)
    
    return True
\`\`\`

### 3. Perfect Binary Tree

All internal nodes have **2 children** AND all leaves are at the **same level**.

\`\`\`
Perfect (h=2):
       1           Level 0: 1 node
      / \\
     2   3         Level 1: 2 nodes
    /\\ /\\
   4 5 6 7         Level 2: 4 nodes (2^2)

Total nodes = 2^(h+1) - 1 = 2^3 - 1 = 7
\`\`\`

**Properties**:
- Total nodes = 2^(h+1) - 1
- Leaf nodes = 2^h
- All leaves at same depth

\`\`\`python
def is_perfect(root):
    def get_depth(node):
        d = 0
        while node:
            d += 1
            node = node.left
        return d
    
    def check(node, depth, level=0):
        if node is None:
            return True
        
        # Leaf node
        if not node.left and not node.right:
            return depth == level + 1
        
        # Internal node must have 2 children
        if not node.left or not node.right:
            return False
        
        return check(node.left, depth, level + 1) and check(node.right, depth, level + 1)
    
    depth = get_depth(root)
    return check(root, depth)
\`\`\`

### 4. Balanced Binary Tree

The height difference between left and right subtrees is **at most 1** for every node.

\`\`\`
Balanced:              NOT Balanced:
       1                    1
      / \\                  /
     2   3                2
    /                    /
   4                    3     ← Difference > 1
                       /
                      4
\`\`\`

\`\`\`python
def is_balanced(root):
    def check(node):
        if not node:
            return 0
        
        left_height = check(node.left)
        right_height = check(node.right)
        
        if left_height == -1 or right_height == -1:
            return -1  # Already unbalanced
        
        if abs(left_height - right_height) > 1:
            return -1  # Unbalanced here
        
        return 1 + max(left_height, right_height)
    
    return check(root) != -1

# Example
root = TreeNode(1)
root.left = TreeNode(2)
root.right = TreeNode(3)
root.left.left = TreeNode(4)
print(is_balanced(root))  # True
\`\`\`

### 5. Degenerate (Skewed) Tree

Each node has **only one child** — essentially a linked list!

\`\`\`
Left Skewed:    Right Skewed:
    1               1
   /                 \\
  2                   2
 /                     \\
3                       3
\`\`\`

**Problem**: All operations become O(n) instead of O(log n).

## Comparison Table

| Type | Definition | Example Use |
|------|------------|-------------|
| Full | 0 or 2 children only | Expression trees |
| Complete | Filled left-to-right | Binary heaps |
| Perfect | Full + all leaves same level | Theoretical ideal |
| Balanced | Height diff ≤ 1 | AVL, Red-Black trees |
| Degenerate | Only 1 child per node | Worst case BST |

## Common Binary Tree Operations

### Count Nodes

\`\`\`python
def count_nodes(root):
    if not root:
        return 0
    return 1 + count_nodes(root.left) + count_nodes(root.right)

print(count_nodes(root))  # 5
\`\`\`

### Find Height

\`\`\`python
def height(root):
    if not root:
        return -1  # or 0 depending on definition
    return 1 + max(height(root.left), height(root.right))

print(height(root))  # 2
\`\`\`

### Find Maximum Value

\`\`\`python
def find_max(root):
    if not root:
        return float('-inf')
    
    left_max = find_max(root.left)
    right_max = find_max(root.right)
    
    return max(root.val, left_max, right_max)
\`\`\`

### Level Order Traversal (BFS)

\`\`\`python
from collections import deque

def level_order(root):
    if not root:
        return []
    
    result = []
    queue = deque([root])
    
    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.popleft()
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        result.append(level)
    
    return result

print(level_order(root))  # [[1], [2, 3], [4, 5]]
\`\`\`

## Time & Space Complexity

| Operation | Time | Space |
|-----------|------|-------|
| Search | O(n) | O(h) |
| Insert | O(n) | O(h) |
| Delete | O(n) | O(h) |
| Traversal | O(n) | O(h) |
| Height | O(n) | O(h) |

Where h = height of tree (log n for balanced, n for skewed)

## Key Takeaways

- **Binary Tree** = each node has at most 2 children
- **Full**: 0 or 2 children only
- **Complete**: filled left-to-right (used in heaps)
- **Perfect**: full + all leaves at same level
- **Balanced**: height diff ≤ 1 (key for efficiency)
- **Degenerate**: essentially a linked list (bad!)
- **Height** determines efficiency: O(log n) vs O(n)`,

    'dsa-pre-order-traversal': `# DSA Pre-order Traversal

## What is Pre-order Traversal?

**Pre-order traversal** visits nodes in this order:

1. **Root** (current node)
2. **Left** subtree
3. **Right** subtree

**Memory aid**: Pre = "before" — visit root **before** children.

\`\`\`
Tree:           Pre-order: 1, 2, 4, 5, 3, 6

        1       Step 1: Visit 1 (root)
       / \\      Step 2: Go left, visit 2
      2   3     Step 3: Go left, visit 4
     / \\   \\    Step 4: Backtrack, go right, visit 5
    4   5   6   Step 5: Backtrack to 1, go right, visit 3
                Step 6: Go right, visit 6

Visit order: 1 → 2 → 4 → 5 → 3 → 6
\`\`\`

## Visual Step-by-Step

\`\`\`
        1           Visit: [1]
       / \\
      2   3

        1           Visit: [1, 2]
       / \\
     [2]  3
     / \\
    4   5

        1           Visit: [1, 2, 4]
       / \\
      2   3
     / \\
   [4]  5

        1           Visit: [1, 2, 4, 5]
       / \\
      2   3
     / \\
    4  [5]

        1           Visit: [1, 2, 4, 5, 3]
       / \\
      2  [3]
     / \\   \\
    4   5   6

        1           Visit: [1, 2, 4, 5, 3, 6]
       / \\
      2   3
     / \\   \\
    4   5  [6]

Final: [1, 2, 4, 5, 3, 6]
\`\`\`

## Python Implementation

### Recursive (Simple)

\`\`\`python
class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

def preorder(root):
    """Pre-order traversal: Root → Left → Right"""
    if not root:
        return
    
    print(root.val, end=" ")  # 1. Visit root
    preorder(root.left)        # 2. Traverse left
    preorder(root.right)       # 3. Traverse right

# Create tree
#       1
#      / \\
#     2   3
#    / \\
#   4   5

root = TreeNode(1)
root.left = TreeNode(2)
root.right = TreeNode(3)
root.left.left = TreeNode(4)
root.left.right = TreeNode(5)

preorder(root)  # Output: 1 2 4 5 3
\`\`\`

### Recursive (Return List)

\`\`\`python
def preorder_list(root):
    """Return list of values in pre-order."""
    result = []
    
    def traverse(node):
        if not node:
            return
        result.append(node.val)    # Root
        traverse(node.left)         # Left
        traverse(node.right)        # Right
    
    traverse(root)
    return result

print(preorder_list(root))  # [1, 2, 4, 5, 3]
\`\`\`

### Iterative (Using Stack)

\`\`\`python
def preorder_iterative(root):
    """Pre-order traversal using explicit stack."""
    if not root:
        return []
    
    result = []
    stack = [root]
    
    while stack:
        node = stack.pop()
        result.append(node.val)
        
        # Push right first so left is processed first (LIFO)
        if node.right:
            stack.append(node.right)
        if node.left:
            stack.append(node.left)
    
    return result

print(preorder_iterative(root))  # [1, 2, 4, 5, 3]
\`\`\`

**Why push right before left?**
Stack is LIFO (Last In, First Out). We want to process left first, so we push it last.

\`\`\`
Stack trace:
[1]           → pop 1, push right(3), left(2)
[3, 2]        → pop 2, push right(5), left(4)
[3, 5, 4]     → pop 4
[3, 5]        → pop 5
[3]           → pop 3
[]            → done

Output: [1, 2, 4, 5, 3]
\`\`\`

## Why Use Pre-order?

### 1. Copying/Cloning a Tree

Pre-order visits the root first, making it ideal for recreating a tree.

\`\`\`python
def clone_tree(root):
    if not root:
        return None
    
    # Create new node (root first = pre-order)
    new_node = TreeNode(root.val)
    new_node.left = clone_tree(root.left)
    new_node.right = clone_tree(root.right)
    
    return new_node

cloned = clone_tree(root)
print(preorder_list(cloned))  # [1, 2, 4, 5, 3]
\`\`\`

### 2. Prefix Expression (Polish Notation)

Expression trees use pre-order for prefix notation.

\`\`\`
Expression: (2 + 3) * 4

Tree:        *
           /   \\
          +     4
         / \\
        2   3

Pre-order: * + 2 3 4  (Prefix: operator before operands)
\`\`\`

### 3. Serialization

Pre-order is commonly used to serialize/deserialize trees.

\`\`\`python
def serialize(root):
    """Serialize tree to string using pre-order."""
    if not root:
        return "null"
    
    return f"{root.val},{serialize(root.left)},{serialize(root.right)}"

print(serialize(root))  # "1,2,4,null,null,5,null,null,3,null,null"
\`\`\`

### 4. Print Tree Structure

\`\`\`python
def print_tree(root, level=0, prefix="Root: "):
    if root:
        print(" " * (level * 4) + prefix + str(root.val))
        print_tree(root.left, level + 1, "L--- ")
        print_tree(root.right, level + 1, "R--- ")

print_tree(root)
# Root: 1
#     L--- 2
#         L--- 4
#         R--- 5
#     R--- 3
\`\`\`

## Comparison: Pre, In, Post

| Traversal | Order | Mnemonic |
|-----------|-------|----------|
| Pre-order | Root → Left → Right | "Root first" |
| In-order | Left → Root → Right | "Root in middle" |
| Post-order | Left → Right → Root | "Root last" |

\`\`\`
Tree:        1
           /   \\
          2     3
         / \\
        4   5

Pre-order:  1, 2, 4, 5, 3  (Root first)
In-order:   4, 2, 5, 1, 3  (Root in middle)
Post-order: 4, 5, 2, 3, 1  (Root last)
\`\`\`

## Time & Space Complexity

| Aspect | Complexity |
|--------|------------|
| Time | O(n) — visit every node once |
| Space (recursive) | O(h) — call stack depth |
| Space (iterative) | O(h) — explicit stack |

Where h = height of tree:
- Balanced tree: h = O(log n)
- Skewed tree: h = O(n)

## Interview Tips

### Common Interview Uses

1. **Clone/copy a tree** — pre-order creates root before children
2. **Serialize/deserialize** — pre-order + null markers
3. **Path problems** — process node before going deeper
4. **Expression evaluation** — prefix notation

### Key Points

- Pre-order = **Root, Left, Right**
- Use **stack** for iterative (push right before left)
- Time O(n), Space O(h)
- Best for: copying, serializing, prefix expressions

## Key Takeaways

- **Pre-order**: Root → Left → Right
- **Visit root before children** — "pre" means before
- **Recursive**: simple and clean
- **Iterative**: use stack, push right then left
- **Use cases**: cloning, serialization, prefix expressions
- **Time**: O(n), **Space**: O(h)`,

    'dsa-in-order-traversal': `# DSA In-order Traversal

## What is In-order Traversal?

**In-order traversal** visits nodes in this order:

1. **Left** subtree
2. **Root** (current node)
3. **Right** subtree

**Memory aid**: Root is visited "in" the middle.

\`\`\`
Tree:           In-order: 4, 2, 5, 1, 3, 6

        1       Step 1: Go left to 2
       / \\      Step 2: Go left to 4, visit 4
      2   3     Step 3: Backtrack, visit 2
     / \\   \\    Step 4: Go right, visit 5
    4   5   6   Step 5: Backtrack, visit 1
                Step 6: Go right to 3, visit 3
                Step 7: Go right, visit 6

Visit order: 4 → 2 → 5 → 1 → 3 → 6
\`\`\`

## The Magic: Sorted Order in BST!

In a **Binary Search Tree**, in-order traversal gives elements in **sorted order**!

\`\`\`
BST:           In-order: 1, 2, 3, 4, 5, 6, 7

        4              Sorted!
       / \\
      2   6
     / \\ / \\
    1  3 5  7

In-order: 1 → 2 → 3 → 4 → 5 → 6 → 7
\`\`\`

This is because in a BST:
- All left descendants < current node
- All right descendants > current node
- So: smaller values → current → larger values = sorted!

## Visual Step-by-Step

\`\`\`
        1           
       / \\
      2   3
     / \\   \\
    4   5   6

Step 1: Go left from 1
        Go left from 2
        Go left from 4 → NULL, visit 4
        Visit: [4]

Step 2: Backtrack to 2, visit 2
        Visit: [4, 2]

Step 3: Go right from 2, visit 5
        Visit: [4, 2, 5]

Step 4: Backtrack to 1, visit 1
        Visit: [4, 2, 5, 1]

Step 5: Go right from 1
        Go left from 3 → NULL, visit 3
        Visit: [4, 2, 5, 1, 3]

Step 6: Go right from 3, visit 6
        Visit: [4, 2, 5, 1, 3, 6]

Final: [4, 2, 5, 1, 3, 6]
\`\`\`

## Python Implementation

### Recursive (Simple)

\`\`\`python
class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

def inorder(root):
    """In-order traversal: Left → Root → Right"""
    if not root:
        return
    
    inorder(root.left)         # 1. Traverse left
    print(root.val, end=" ")   # 2. Visit root
    inorder(root.right)        # 3. Traverse right

# Create tree
#       1
#      / \\
#     2   3
#    / \\
#   4   5

root = TreeNode(1)
root.left = TreeNode(2)
root.right = TreeNode(3)
root.left.left = TreeNode(4)
root.left.right = TreeNode(5)

inorder(root)  # Output: 4 2 5 1 3
\`\`\`

### Recursive (Return List)

\`\`\`python
def inorder_list(root):
    """Return list of values in in-order."""
    result = []
    
    def traverse(node):
        if not node:
            return
        traverse(node.left)         # Left
        result.append(node.val)     # Root
        traverse(node.right)        # Right
    
    traverse(root)
    return result

print(inorder_list(root))  # [4, 2, 5, 1, 3]
\`\`\`

### Iterative (Using Stack)

\`\`\`python
def inorder_iterative(root):
    """In-order traversal using explicit stack."""
    result = []
    stack = []
    current = root
    
    while current or stack:
        # Go left as far as possible
        while current:
            stack.append(current)
            current = current.left
        
        # Process current node
        current = stack.pop()
        result.append(current.val)
        
        # Move to right subtree
        current = current.right
    
    return result

print(inorder_iterative(root))  # [4, 2, 5, 1, 3]
\`\`\`

**Stack trace:**
\`\`\`
Push 1, Push 2, Push 4  → Stack: [1, 2, 4]
Pop 4, add to result    → Result: [4], current = None
Pop 2, add to result    → Result: [4, 2], current = 5
Push 5                  → Stack: [1, 5]
Pop 5, add to result    → Result: [4, 2, 5], current = None
Pop 1, add to result    → Result: [4, 2, 5, 1], current = 3
Push 3                  → Stack: [3]
Pop 3, add to result    → Result: [4, 2, 5, 1, 3], current = None
Done!
\`\`\`

## Why Use In-order?

### 1. Get Sorted Elements from BST

\`\`\`python
def get_sorted_elements(bst_root):
    """Get all BST elements in sorted order."""
    return inorder_list(bst_root)

# BST example
#       4
#      / \\
#     2   6
#    / \\
#   1   3

bst = TreeNode(4)
bst.left = TreeNode(2)
bst.right = TreeNode(6)
bst.left.left = TreeNode(1)
bst.left.right = TreeNode(3)

print(get_sorted_elements(bst))  # [1, 2, 3, 4, 6]
\`\`\`

### 2. Validate BST

\`\`\`python
def is_valid_bst(root):
    """Check if tree is a valid BST using in-order."""
    prev = [float('-inf')]  # Use list to modify in nested function
    
    def validate(node):
        if not node:
            return True
        
        # Check left subtree
        if not validate(node.left):
            return False
        
        # Current node must be greater than previous
        if node.val <= prev[0]:
            return False
        prev[0] = node.val
        
        # Check right subtree
        return validate(node.right)
    
    return validate(root)

print(is_valid_bst(bst))  # True
\`\`\`

### 3. Find Kth Smallest Element

\`\`\`python
def kth_smallest(root, k):
    """Find kth smallest element in BST."""
    stack = []
    current = root
    count = 0
    
    while current or stack:
        while current:
            stack.append(current)
            current = current.left
        
        current = stack.pop()
        count += 1
        
        if count == k:
            return current.val
        
        current = current.right
    
    return None

print(kth_smallest(bst, 2))  # 2 (second smallest)
print(kth_smallest(bst, 4))  # 4 (fourth smallest)
\`\`\`

### 4. Infix Expression

Expression trees use in-order for infix notation (normal math).

\`\`\`
Expression: (2 + 3) * 4

Tree:        *
           /   \\
          +     4
         / \\
        2   3

In-order: 2 + 3 * 4  (needs parentheses for correct order)
          ((2 + 3) * 4) with proper parentheses
\`\`\`

### 5. Convert BST to Sorted Array

\`\`\`python
def bst_to_sorted_array(root):
    return inorder_list(root)

# Already sorted!
print(bst_to_sorted_array(bst))  # [1, 2, 3, 4, 6]
\`\`\`

## Morris Traversal (O(1) Space)

\`\`\`python
def inorder_morris(root):
    """In-order traversal with O(1) space."""
    result = []
    current = root
    
    while current:
        if not current.left:
            result.append(current.val)
            current = current.right
        else:
            # Find predecessor
            predecessor = current.left
            while predecessor.right and predecessor.right != current:
                predecessor = predecessor.right
            
            if not predecessor.right:
                # Make current the right child of predecessor
                predecessor.right = current
                current = current.left
            else:
                # Revert the changes
                predecessor.right = None
                result.append(current.val)
                current = current.right
    
    return result

print(inorder_morris(bst))  # [1, 2, 3, 4, 6]
\`\`\`

## Comparison: All Traversals

| Traversal | Order | BST Result | Use Case |
|-----------|-------|------------|----------|
| Pre-order | Root → Left → Right | Not sorted | Copy tree, serialize |
| **In-order** | Left → Root → Right | **Sorted!** | BST operations |
| Post-order | Left → Right → Root | Not sorted | Delete tree |

\`\`\`
BST:         4
           /   \\
          2     6
         / \\
        1   3

Pre-order:  4, 2, 1, 3, 6
In-order:   1, 2, 3, 4, 6  ← Sorted!
Post-order: 1, 3, 2, 6, 4
\`\`\`

## Time & Space Complexity

| Aspect | Complexity |
|--------|------------|
| Time | O(n) — visit every node once |
| Space (recursive) | O(h) — call stack |
| Space (iterative) | O(h) — explicit stack |
| Space (Morris) | O(1) — no extra space |

## Interview Tips

### Common Interview Uses

1. **Validate BST** — values must be in increasing order
2. **Kth smallest in BST** — stop at kth element
3. **BST to sorted array** — trivial with in-order
4. **Find successor/predecessor** — in-order relationships
5. **Recover BST** — find swapped nodes

### Key Points

- In-order = **Left, Root, Right**
- **Produces sorted output in BST** — most important property!
- Time O(n), Space O(h)
- Morris traversal for O(1) space

## Key Takeaways

- **In-order**: Left → Root → Right
- **Sorted output from BST** — the key property!
- **Recursive**: clean and simple
- **Iterative**: stack + go left first
- **Morris**: O(1) space but modifies tree temporarily
- **Use cases**: BST validation, kth smallest, sorted conversion`,

    'dsa-post-order-traversal': `# DSA Post-order Traversal

## What is Post-order Traversal?

**Post-order traversal** visits nodes in this order:

1. **Left** subtree
2. **Right** subtree
3. **Root** (current node)

**Memory aid**: Post = "after" — visit root **after** children.

\`\`\`
Tree:           Post-order: 4, 5, 2, 3, 6, 1

        1       Step 1: Go left to 2, then left to 4
       / \\      Step 2: Visit 4 (leaf)
      2   3     Step 3: Go right to 5, visit 5 (leaf)
     / \\   \\    Step 4: Visit 2 (after both children)
    4   5   6   Step 5: Go right to 3, then right to 6
                Step 6: Visit 6 (leaf)
                Step 7: Visit 3, then visit 1

Visit order: 4 → 5 → 2 → 6 → 3 → 1
\`\`\`

## Visual Step-by-Step

\`\`\`
        1           
       / \\
      2   3
     / \\   \\
    4   5   6

Step 1: Go all the way left-bottom
        Visit 4 (leaf)
        Visit: [4]

Step 2: Go right from 2
        Visit 5 (leaf)
        Visit: [4, 5]

Step 3: Now visit 2 (after both children done)
        Visit: [4, 5, 2]

Step 4: Go right from 1
        Go right from 3
        Visit 6 (leaf)
        Visit: [4, 5, 2, 6]

Step 5: Visit 3 (after right child done)
        Visit: [4, 5, 2, 6, 3]

Step 6: Finally visit 1 (after both subtrees done)
        Visit: [4, 5, 2, 6, 3, 1]

Final: [4, 5, 2, 6, 3, 1]
\`\`\`

## Python Implementation

### Recursive (Simple)

\`\`\`python
class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

def postorder(root):
    """Post-order traversal: Left → Right → Root"""
    if not root:
        return
    
    postorder(root.left)        # 1. Traverse left
    postorder(root.right)       # 2. Traverse right
    print(root.val, end=" ")    # 3. Visit root

# Create tree
#       1
#      / \\
#     2   3
#    / \\
#   4   5

root = TreeNode(1)
root.left = TreeNode(2)
root.right = TreeNode(3)
root.left.left = TreeNode(4)
root.left.right = TreeNode(5)

postorder(root)  # Output: 4 5 2 3 1
\`\`\`

### Recursive (Return List)

\`\`\`python
def postorder_list(root):
    """Return list of values in post-order."""
    result = []
    
    def traverse(node):
        if not node:
            return
        traverse(node.left)         # Left
        traverse(node.right)        # Right
        result.append(node.val)     # Root
    
    traverse(root)
    return result

print(postorder_list(root))  # [4, 5, 2, 3, 1]
\`\`\`

### Iterative (Using Two Stacks)

\`\`\`python
def postorder_two_stacks(root):
    """Post-order using two stacks."""
    if not root:
        return []
    
    stack1 = [root]
    stack2 = []
    
    while stack1:
        node = stack1.pop()
        stack2.append(node.val)
        
        # Push left first, then right
        if node.left:
            stack1.append(node.left)
        if node.right:
            stack1.append(node.right)
    
    # Reverse stack2 to get post-order
    return stack2[::-1]

print(postorder_two_stacks(root))  # [4, 5, 2, 3, 1]
\`\`\`

### Iterative (Using One Stack)

\`\`\`python
def postorder_one_stack(root):
    """Post-order using one stack."""
    if not root:
        return []
    
    result = []
    stack = [root]
    
    while stack:
        node = stack.pop()
        result.append(node.val)
        
        # Push left first (will be processed after right)
        if node.left:
            stack.append(node.left)
        if node.right:
            stack.append(node.right)
    
    return result[::-1]  # Reverse for correct order

print(postorder_one_stack(root))  # [4, 5, 2, 3, 1]
\`\`\`

**How it works:**
This is essentially pre-order (Root → Right → Left) reversed to get post-order (Left → Right → Root).

\`\`\`
Pre-order (R→Right→Left): 1 → 3 → 2 → 5 → 4
Reversed:                 4 → 5 → 2 → 3 → 1 ✓ Post-order!
\`\`\`

## Why Use Post-order?

### 1. Deleting a Tree

You must delete children **before** the parent (can't delete parent with dangling children).

\`\`\`python
def delete_tree(root):
    """Delete all nodes in post-order."""
    if not root:
        return
    
    # Delete children first
    delete_tree(root.left)
    delete_tree(root.right)
    
    # Then delete current node
    print(f"Deleting node: {root.val}")
    del root

delete_tree(root)
# Deleting node: 4
# Deleting node: 5
# Deleting node: 2
# Deleting node: 3
# Deleting node: 1
\`\`\`

### 2. Calculate Tree Height/Size (Bottom-Up)

Many tree problems require processing children before the parent.

\`\`\`python
def tree_height(root):
    """Calculate height using post-order logic."""
    if not root:
        return -1
    
    # Get children heights first (post-order thinking)
    left_height = tree_height(root.left)
    right_height = tree_height(root.right)
    
    # Then calculate for this node
    return 1 + max(left_height, right_height)

print(tree_height(root))  # 2
\`\`\`

\`\`\`python
def tree_size(root):
    """Count nodes using post-order logic."""
    if not root:
        return 0
    
    # Count children first
    left_count = tree_size(root.left)
    right_count = tree_size(root.right)
    
    # Then add this node
    return 1 + left_count + right_count

print(tree_size(root))  # 5
\`\`\`

### 3. Evaluate Expression Trees

Operators need operands (children) evaluated first.

\`\`\`
Expression: (2 + 3) * 4

Tree:        *
           /   \\
          +     4
         / \\
        2   3

Post-order evaluation:
1. Evaluate 2 → 2
2. Evaluate 3 → 3
3. Evaluate + → 2 + 3 = 5
4. Evaluate 4 → 4
5. Evaluate * → 5 * 4 = 20
\`\`\`

\`\`\`python
def evaluate_expression_tree(root):
    """Evaluate expression tree using post-order."""
    if not root:
        return 0
    
    # Leaf node (operand)
    if not root.left and not root.right:
        return int(root.val)
    
    # Evaluate children first (post-order)
    left_val = evaluate_expression_tree(root.left)
    right_val = evaluate_expression_tree(root.right)
    
    # Then apply operator
    if root.val == '+':
        return left_val + right_val
    elif root.val == '-':
        return left_val - right_val
    elif root.val == '*':
        return left_val * right_val
    elif root.val == '/':
        return left_val // right_val

# Create expression tree for (2 + 3) * 4
expr = TreeNode('*')
expr.left = TreeNode('+')
expr.right = TreeNode('4')
expr.left.left = TreeNode('2')
expr.left.right = TreeNode('3')

print(evaluate_expression_tree(expr))  # 20
\`\`\`

### 4. Postfix Expression (Reverse Polish Notation)

\`\`\`
Tree:        *
           /   \\
          +     4
         / \\
        2   3

Post-order: 2 3 + 4 *  (Postfix notation)
\`\`\`

### 5. Check if Trees are Identical

\`\`\`python
def is_same_tree(p, q):
    """Check if two trees are identical."""
    if not p and not q:
        return True
    if not p or not q:
        return False
    
    # Check children first (post-order thinking)
    left_same = is_same_tree(p.left, q.left)
    right_same = is_same_tree(p.right, q.right)
    
    # Then check this node
    return left_same and right_same and p.val == q.val
\`\`\`

### 6. Find Maximum Path Sum

\`\`\`python
def max_path_sum(root):
    """Find maximum path sum in binary tree."""
    max_sum = [float('-inf')]
    
    def postorder(node):
        if not node:
            return 0
        
        # Get max from children first
        left_gain = max(postorder(node.left), 0)
        right_gain = max(postorder(node.right), 0)
        
        # Path through this node
        path_sum = node.val + left_gain + right_gain
        max_sum[0] = max(max_sum[0], path_sum)
        
        # Return max gain through this node
        return node.val + max(left_gain, right_gain)
    
    postorder(root)
    return max_sum[0]
\`\`\`

## Comparison: All Traversals

| Traversal | Order | When to Use |
|-----------|-------|-------------|
| Pre-order | Root → Left → Right | Copy tree, serialize |
| In-order | Left → Root → Right | BST sorted output |
| **Post-order** | Left → Right → Root | Delete tree, bottom-up |

\`\`\`
Tree:        1
           /   \\
          2     3
         / \\
        4   5

Pre-order:  1, 2, 4, 5, 3  (Root first)
In-order:   4, 2, 5, 1, 3  (Root middle)
Post-order: 4, 5, 2, 3, 1  (Root last)
\`\`\`

## Time & Space Complexity

| Aspect | Complexity |
|--------|------------|
| Time | O(n) — visit every node once |
| Space (recursive) | O(h) — call stack |
| Space (iterative) | O(h) — explicit stack |

## Interview Tips

### Common Interview Uses

1. **Delete/free a tree** — children before parent
2. **Calculate height/size** — need children info first
3. **Evaluate expressions** — operands before operators
4. **Check subtree** — compare children first
5. **Maximum path sum** — classic LeetCode problem

### Key Points

- Post-order = **Left, Right, Root**
- Root is processed **last** — after all descendants
- Use for **bottom-up** calculations
- Time O(n), Space O(h)

## Key Takeaways

- **Post-order**: Left → Right → Root
- **Root processed after children** — "post" means after
- **Bottom-up approach** — calculate children first
- **Use cases**: delete tree, evaluate expressions, calculate height
- **Iterative**: use reverse of modified pre-order
- **Time**: O(n), **Space**: O(h)`,

    'dsa-array-implementation': `# DSA Array Implementation of Trees

## Overview

Trees can be represented using **arrays** instead of linked nodes. This is especially useful for **complete binary trees** like heaps.

\`\`\`
Tree:                 Array representation:
        1             Index:  0   1   2   3   4   5   6
       / \\            Value: [1] [2] [3] [4] [5] [6] [7]
      2   3
     / \\ / \\
    4  5 6  7
\`\`\`

## Index Relationships

For a node at index \`i\` (0-based indexing):

| Relationship | Formula |
|--------------|---------|
| Left child | \`2 * i + 1\` |
| Right child | \`2 * i + 2\` |
| Parent | \`(i - 1) // 2\` |

\`\`\`
Example: Node at index 1 (value = 2)

        [1]          Array: [1, 2, 3, 4, 5, 6, 7]
        / \\                  0  1  2  3  4  5  6
      [2]  [3]
      / \\  / \\
    [4][5][6][7]

Parent of index 1:      (1-1) // 2 = 0   → value 1 ✓
Left child of index 1:  2*1 + 1 = 3      → value 4 ✓
Right child of index 1: 2*1 + 2 = 4      → value 5 ✓
\`\`\`

## Python Implementation

### Basic Structure

\`\`\`python
class ArrayTree:
    def __init__(self, capacity=100):
        self.tree = [None] * capacity
        self.size = 0
    
    def left(self, i):
        """Get left child index."""
        return 2 * i + 1
    
    def right(self, i):
        """Get right child index."""
        return 2 * i + 2
    
    def parent(self, i):
        """Get parent index."""
        return (i - 1) // 2
    
    def get_left_child(self, i):
        """Get left child value."""
        left_idx = self.left(i)
        if left_idx < self.size:
            return self.tree[left_idx]
        return None
    
    def get_right_child(self, i):
        """Get right child value."""
        right_idx = self.right(i)
        if right_idx < self.size:
            return self.tree[right_idx]
        return None
    
    def get_parent(self, i):
        """Get parent value."""
        if i == 0:
            return None
        return self.tree[self.parent(i)]
\`\`\`

### Simple Array as Tree

\`\`\`python
# Using a simple list as a tree
tree = [1, 2, 3, 4, 5, 6, 7]

def left(i):
    """Left child index."""
    return 2 * i + 1

def right(i):
    """Right child index."""
    return 2 * i + 2

def parent(i):
    """Parent index."""
    return (i - 1) // 2

# Example usage
print(f"Root: {tree[0]}")                    # 1
print(f"Left of root: {tree[left(0)]}")      # 2
print(f"Right of root: {tree[right(0)]}")    # 3
print(f"Parent of index 3: {tree[parent(3)]}")  # 2

# Verify relationships
for i in range(len(tree)):
    left_idx = left(i)
    right_idx = right(i)
    left_val = tree[left_idx] if left_idx < len(tree) else None
    right_val = tree[right_idx] if right_idx < len(tree) else None
    print(f"Node {tree[i]}: left={left_val}, right={right_val}")
\`\`\`

Output:
\`\`\`
Node 1: left=2, right=3
Node 2: left=4, right=5
Node 3: left=6, right=7
Node 4: left=None, right=None
Node 5: left=None, right=None
Node 6: left=None, right=None
Node 7: left=None, right=None
\`\`\`

## Tree Traversals with Array

### Level-Order (Natural for Arrays)

\`\`\`python
def level_order(tree):
    """Level-order is just iterating through array!"""
    return [val for val in tree if val is not None]

tree = [1, 2, 3, 4, 5, 6, 7]
print(level_order(tree))  # [1, 2, 3, 4, 5, 6, 7]
\`\`\`

### Pre-Order

\`\`\`python
def preorder_array(tree, i=0):
    """Pre-order traversal on array tree."""
    if i >= len(tree) or tree[i] is None:
        return []
    
    result = [tree[i]]                      # Root
    result += preorder_array(tree, 2*i+1)   # Left
    result += preorder_array(tree, 2*i+2)   # Right
    return result

tree = [1, 2, 3, 4, 5, 6, 7]
print(preorder_array(tree))  # [1, 2, 4, 5, 3, 6, 7]
\`\`\`

### In-Order

\`\`\`python
def inorder_array(tree, i=0):
    """In-order traversal on array tree."""
    if i >= len(tree) or tree[i] is None:
        return []
    
    result = inorder_array(tree, 2*i+1)     # Left
    result += [tree[i]]                     # Root
    result += inorder_array(tree, 2*i+2)    # Right
    return result

tree = [1, 2, 3, 4, 5, 6, 7]
print(inorder_array(tree))  # [4, 2, 5, 1, 6, 3, 7]
\`\`\`

### Post-Order

\`\`\`python
def postorder_array(tree, i=0):
    """Post-order traversal on array tree."""
    if i >= len(tree) or tree[i] is None:
        return []
    
    result = postorder_array(tree, 2*i+1)   # Left
    result += postorder_array(tree, 2*i+2)  # Right
    result += [tree[i]]                     # Root
    return result

tree = [1, 2, 3, 4, 5, 6, 7]
print(postorder_array(tree))  # [4, 5, 2, 6, 7, 3, 1]
\`\`\`

## Heap Implementation (Classic Use Case)

The array representation is **perfect** for heaps!

\`\`\`python
class MinHeap:
    def __init__(self):
        self.heap = []
    
    def parent(self, i):
        return (i - 1) // 2
    
    def left(self, i):
        return 2 * i + 1
    
    def right(self, i):
        return 2 * i + 2
    
    def swap(self, i, j):
        self.heap[i], self.heap[j] = self.heap[j], self.heap[i]
    
    def insert(self, val):
        """Add element and bubble up."""
        self.heap.append(val)
        self._bubble_up(len(self.heap) - 1)
    
    def _bubble_up(self, i):
        """Move element up until heap property satisfied."""
        while i > 0 and self.heap[i] < self.heap[self.parent(i)]:
            self.swap(i, self.parent(i))
            i = self.parent(i)
    
    def extract_min(self):
        """Remove and return minimum element."""
        if not self.heap:
            return None
        
        min_val = self.heap[0]
        
        # Move last element to root
        self.heap[0] = self.heap[-1]
        self.heap.pop()
        
        # Bubble down
        if self.heap:
            self._bubble_down(0)
        
        return min_val
    
    def _bubble_down(self, i):
        """Move element down until heap property satisfied."""
        min_idx = i
        left_idx = self.left(i)
        right_idx = self.right(i)
        
        if left_idx < len(self.heap) and self.heap[left_idx] < self.heap[min_idx]:
            min_idx = left_idx
        
        if right_idx < len(self.heap) and self.heap[right_idx] < self.heap[min_idx]:
            min_idx = right_idx
        
        if min_idx != i:
            self.swap(i, min_idx)
            self._bubble_down(min_idx)
    
    def peek(self):
        return self.heap[0] if self.heap else None

# Usage
heap = MinHeap()
for val in [5, 3, 8, 1, 2]:
    heap.insert(val)

print(heap.heap)  # [1, 2, 8, 5, 3]

while heap.heap:
    print(heap.extract_min(), end=" ")  # 1 2 3 5 8
\`\`\`

## Using Python's heapq

\`\`\`python
import heapq

# Min-heap operations
heap = []
heapq.heappush(heap, 5)
heapq.heappush(heap, 3)
heapq.heappush(heap, 8)
heapq.heappush(heap, 1)

print(heap)              # [1, 3, 8, 5]
print(heapq.heappop(heap))  # 1 (minimum)

# Heapify existing list
nums = [5, 3, 8, 1, 2]
heapq.heapify(nums)
print(nums)  # [1, 2, 8, 5, 3]
\`\`\`

## Handling Incomplete Trees

For incomplete trees, use \`None\` for missing nodes.

\`\`\`python
# Incomplete tree:
#        1
#       / \\
#      2   3
#     /
#    4

tree = [1, 2, 3, 4, None, None, None]

#  Index:  0  1  2  3     4     5     6
#  Value: [1, 2, 3, 4, None, None, None]

def get_value(tree, i):
    if i < len(tree):
        return tree[i]
    return None

print(get_value(tree, 0))  # 1 (root)
print(get_value(tree, 3))  # 4 (left child of 2)
print(get_value(tree, 4))  # None (right child of 2 missing)
\`\`\`

## Advantages & Disadvantages

### Advantages ✅

| Advantage | Explanation |
|-----------|-------------|
| Cache-friendly | Contiguous memory access |
| No pointers | Less memory overhead |
| Fast parent access | Simple formula O(1) |
| Ideal for heaps | Complete binary tree guarantee |
| Level-order natural | Just iterate through array |

### Disadvantages ❌

| Disadvantage | Explanation |
|--------------|-------------|
| Wasted space | Sparse trees waste memory |
| Fixed size | Need to resize array |
| Insertion/deletion | May require shifting |
| Non-complete trees | Lots of None values |

## When to Use Array vs Linked

| Use Array When | Use Linked Nodes When |
|----------------|----------------------|
| Complete binary tree | Sparse or unbalanced tree |
| Heap implementation | BST with frequent modifications |
| Known maximum size | Unknown or dynamic size |
| Cache performance matters | Tree structure changes often |

## Time Complexity

| Operation | Array Tree | Linked Tree |
|-----------|------------|-------------|
| Access parent | O(1) | O(1)* |
| Access child | O(1) | O(1) |
| Insert (heap) | O(log n) | O(log n) |
| Delete (heap) | O(log n) | O(log n) |
| Space | O(2^h) | O(n) |

\\* With parent pointer

## Key Takeaways

- **Array trees** use formulas: left = 2i+1, right = 2i+2, parent = (i-1)//2
- **Perfect for heaps** — complete binary tree guarantee
- **Cache-efficient** — contiguous memory
- **Trade-off**: wastes space for sparse trees
- **Python heapq** — built-in heap using arrays
- Use **linked nodes** for BST and unbalanced trees`,

    'dsa-binary-search-trees': `# DSA Binary Search Trees

## What is a Binary Search Tree (BST)?

A **Binary Search Tree** is a binary tree with a special ordering property:

- All nodes in the **left subtree** are **less than** the current node
- All nodes in the **right subtree** are **greater than** the current node
- This property applies to **every node** in the tree

\`\`\`
Valid BST:              NOT a BST:
        8                     8
       / \\                   / \\
      3   10                3   10
     / \\    \\              / \\    \\
    1   6    14           1   9    14
       / \\                     ↑
      4   7               9 > 8, but in left subtree!
\`\`\`

## BST Property

For every node with value V:
- **All left descendants** < V
- **All right descendants** > V

\`\`\`
At node 8:
- Left subtree: 3, 1, 6, 4, 7  → All < 8 ✓
- Right subtree: 10, 14       → All > 8 ✓

At node 3:
- Left subtree: 1             → All < 3 ✓
- Right subtree: 6, 4, 7      → All > 3 ✓
\`\`\`

## Why BSTs Are Efficient

The BST property enables **binary search** on a tree!

\`\`\`
Searching for 6 in BST:
        8       → 6 < 8, go left
       / \\
      3   10    → 6 > 3, go right
     / \\
    1   6       → Found!

Only 3 comparisons instead of checking all nodes!
\`\`\`

## Python Implementation

### Node Class

\`\`\`python
class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None
\`\`\`

### Insert

\`\`\`python
def insert(root, val):
    """Insert value into BST. Returns root."""
    if not root:
        return TreeNode(val)
    
    if val < root.val:
        root.left = insert(root.left, val)
    else:
        root.right = insert(root.right, val)
    
    return root

# Build a BST
root = None
for val in [8, 3, 10, 1, 6, 14, 4, 7]:
    root = insert(root, val)

#         8
#        / \\
#       3   10
#      / \\    \\
#     1   6    14
#        / \\
#       4   7
\`\`\`

### Search

\`\`\`python
def search(root, val):
    """Search for value in BST. Returns node or None."""
    if not root:
        return None
    
    if val == root.val:
        return root
    elif val < root.val:
        return search(root.left, val)
    else:
        return search(root.right, val)

# Example
result = search(root, 6)
print(result.val if result else "Not found")  # 6

result = search(root, 5)
print(result.val if result else "Not found")  # Not found
\`\`\`

### Iterative Search

\`\`\`python
def search_iterative(root, val):
    """Iterative BST search."""
    current = root
    
    while current:
        if val == current.val:
            return current
        elif val < current.val:
            current = current.left
        else:
            current = current.right
    
    return None
\`\`\`

### Find Minimum and Maximum

\`\`\`python
def find_min(root):
    """Find minimum value (leftmost node)."""
    if not root:
        return None
    
    current = root
    while current.left:
        current = current.left
    
    return current.val

def find_max(root):
    """Find maximum value (rightmost node)."""
    if not root:
        return None
    
    current = root
    while current.right:
        current = current.right
    
    return current.val

print(find_min(root))  # 1
print(find_max(root))  # 14
\`\`\`

### Delete

\`\`\`python
def delete(root, val):
    """Delete value from BST. Returns root."""
    if not root:
        return None
    
    # Find the node
    if val < root.val:
        root.left = delete(root.left, val)
    elif val > root.val:
        root.right = delete(root.right, val)
    else:
        # Found node to delete
        
        # Case 1: Leaf node
        if not root.left and not root.right:
            return None
        
        # Case 2: One child
        if not root.left:
            return root.right
        if not root.right:
            return root.left
        
        # Case 3: Two children
        # Find in-order successor (smallest in right subtree)
        successor = root.right
        while successor.left:
            successor = successor.left
        
        # Replace value with successor
        root.val = successor.val
        
        # Delete successor
        root.right = delete(root.right, successor.val)
    
    return root

# Delete node with value 3
root = delete(root, 3)
\`\`\`

### Deletion Cases Explained

\`\`\`
Case 1: Leaf node (no children)
Delete 4:
    6           6
   / \\    →      \\
  4   7          7

Case 2: One child
Delete 10:
    8            8
   / \\    →     / \\
  3   10       3   14
        \\
        14

Case 3: Two children
Delete 3:
      8                  8
     / \\                / \\
    3   10      →      4   10
   / \\                / \\
  1   6              1   6
     / \\                  \\
    4   7                  7

Replace 3 with in-order successor (4), then delete 4
\`\`\`

## In-Order Traversal = Sorted!

\`\`\`python
def inorder(root):
    """In-order traversal gives sorted order!"""
    if not root:
        return []
    return inorder(root.left) + [root.val] + inorder(root.right)

print(inorder(root))  # [1, 3, 4, 6, 7, 8, 10, 14]
\`\`\`

## Time Complexity

| Operation | Average Case | Worst Case |
|-----------|--------------|------------|
| Search | O(log n) | O(n) |
| Insert | O(log n) | O(n) |
| Delete | O(log n) | O(n) |
| Find Min/Max | O(log n) | O(n) |

### Why O(n) Worst Case?

When BST becomes **skewed** (like a linked list):

\`\`\`
Insert: 1, 2, 3, 4, 5 in order

    1
     \\
      2
       \\
        3
         \\
          4
           \\
            5

Search for 5: Visit all 5 nodes → O(n)
\`\`\`

**Solution**: Use self-balancing BSTs (AVL, Red-Black)

## Complete BST Class

\`\`\`python
class BST:
    def __init__(self):
        self.root = None
    
    def insert(self, val):
        self.root = self._insert(self.root, val)
    
    def _insert(self, node, val):
        if not node:
            return TreeNode(val)
        if val < node.val:
            node.left = self._insert(node.left, val)
        else:
            node.right = self._insert(node.right, val)
        return node
    
    def search(self, val):
        return self._search(self.root, val)
    
    def _search(self, node, val):
        if not node or node.val == val:
            return node
        if val < node.val:
            return self._search(node.left, val)
        return self._search(node.right, val)
    
    def delete(self, val):
        self.root = self._delete(self.root, val)
    
    def _delete(self, node, val):
        if not node:
            return None
        
        if val < node.val:
            node.left = self._delete(node.left, val)
        elif val > node.val:
            node.right = self._delete(node.right, val)
        else:
            if not node.left:
                return node.right
            if not node.right:
                return node.left
            
            # Find successor
            successor = node.right
            while successor.left:
                successor = successor.left
            node.val = successor.val
            node.right = self._delete(node.right, successor.val)
        
        return node
    
    def inorder(self):
        result = []
        self._inorder(self.root, result)
        return result
    
    def _inorder(self, node, result):
        if node:
            self._inorder(node.left, result)
            result.append(node.val)
            self._inorder(node.right, result)

# Usage
bst = BST()
for val in [8, 3, 10, 1, 6, 14]:
    bst.insert(val)

print(bst.inorder())      # [1, 3, 6, 8, 10, 14]
print(bst.search(6).val)  # 6
bst.delete(3)
print(bst.inorder())      # [1, 6, 8, 10, 14]
\`\`\`

## Common Interview Problems

### Validate BST

\`\`\`python
def is_valid_bst(root, min_val=float('-inf'), max_val=float('inf')):
    """Check if tree is valid BST."""
    if not root:
        return True
    
    if root.val <= min_val or root.val >= max_val:
        return False
    
    return (is_valid_bst(root.left, min_val, root.val) and
            is_valid_bst(root.right, root.val, max_val))
\`\`\`

### Lowest Common Ancestor

\`\`\`python
def lca(root, p, q):
    """Find lowest common ancestor in BST."""
    if root.val > p.val and root.val > q.val:
        return lca(root.left, p, q)
    elif root.val < p.val and root.val < q.val:
        return lca(root.right, p, q)
    else:
        return root
\`\`\`

### Kth Smallest Element

\`\`\`python
def kth_smallest(root, k):
    """Find kth smallest element."""
    stack = []
    current = root
    count = 0
    
    while current or stack:
        while current:
            stack.append(current)
            current = current.left
        
        current = stack.pop()
        count += 1
        if count == k:
            return current.val
        
        current = current.right
    
    return None
\`\`\`

## Key Takeaways

- **BST property**: left < root < right for all nodes
- **Search**: O(log n) average, O(n) worst (skewed)
- **In-order traversal** gives **sorted output**
- **Delete** has 3 cases: leaf, one child, two children
- **Skewed trees** degrade to O(n) — use balanced BSTs
- **Interview favorites**: validate BST, LCA, kth smallest`,

    'dsa-avl-trees': `# DSA AVL Trees

## What is an AVL Tree?

An **AVL Tree** is a **self-balancing Binary Search Tree** where the height difference between left and right subtrees is at most 1 for every node.

Named after inventors **A**delson-**V**elsky and **L**andis (1962).

\`\`\`
AVL Tree (balanced):        NOT AVL (unbalanced):
        8                          8
       / \\                        / \\
      4   10                     4   10
     / \\    \\                   /
    2   6    12                2
                              /
                             1    ← Height diff > 1!
\`\`\`

## Balance Factor

The **balance factor** of a node is:

**Balance Factor = Height(left subtree) - Height(right subtree)**

For an AVL tree, balance factor must be: **-1, 0, or +1**

\`\`\`
        8 (BF=0)
       / \\
  (BF=0)4  10(BF=-1)
     / \\    \\
    2   6    12
(BF=0)(BF=0)(BF=0)

Calculating for node 10:
- Left height = 0 (no left child, height = -1 convention)
- Right height = 1 (has child 12, which is leaf at height 0)
Actually: height(left)=0, height(right)=1
BF = 0 - 1 = -1 ✓ (Valid)
\`\`\`

## Height Calculation

\`\`\`python
def height(node):
    """Get height of node. None has height -1."""
    if not node:
        return -1
    return node.height

def update_height(node):
    """Update height based on children."""
    node.height = 1 + max(height(node.left), height(node.right))

def balance_factor(node):
    """Calculate balance factor."""
    if not node:
        return 0
    return height(node.left) - height(node.right)
\`\`\`

## Why AVL Trees?

Regular BST can become **skewed**, resulting in O(n) operations:

\`\`\`
BST (worst case):       AVL Tree (guaranteed):
    1                        4
     \\                      / \\
      2                    2   6
       \\                  / \\  / \\
        3                1  3 5  7
         \\
          4               Height: O(log n)
           ...            All ops: O(log n)
Height: O(n)
Search: O(n)
\`\`\`

| Structure | Search | Insert | Delete |
|-----------|--------|--------|--------|
| BST (avg) | O(log n) | O(log n) | O(log n) |
| BST (worst) | O(n) | O(n) | O(n) |
| AVL Tree | O(log n) | O(log n) | O(log n) |

**AVL guarantees O(log n) for all operations!**

## Rotations

When balance factor becomes -2 or +2, we need to **rotate** to restore balance.

### Right Rotation (LL Case)

Used when: Left subtree is too tall (BF = +2) and left child has BF ≥ 0

\`\`\`
Before (BF=+2):          After (BF=0):
      z                       y
     /                       / \\
    y          →            x   z
   /
  x

Right rotation at z:
- y becomes new root
- z becomes right child of y
- y's right child becomes z's left child
\`\`\`

\`\`\`python
def rotate_right(z):
    """Perform right rotation."""
    y = z.left
    T3 = y.right
    
    # Perform rotation
    y.right = z
    z.left = T3
    
    # Update heights
    update_height(z)
    update_height(y)
    
    return y  # New root
\`\`\`

### Left Rotation (RR Case)

Used when: Right subtree is too tall (BF = -2) and right child has BF ≤ 0

\`\`\`
Before (BF=-2):          After (BF=0):
  z                           y
   \\                         / \\
    y        →              z   x
     \\
      x

Left rotation at z:
- y becomes new root
- z becomes left child of y
- y's left child becomes z's right child
\`\`\`

\`\`\`python
def rotate_left(z):
    """Perform left rotation."""
    y = z.right
    T2 = y.left
    
    # Perform rotation
    y.left = z
    z.right = T2
    
    # Update heights
    update_height(z)
    update_height(y)
    
    return y  # New root
\`\`\`

### Left-Right Rotation (LR Case)

Used when: Left subtree too tall (BF = +2) but left child leans right (BF < 0)

\`\`\`
Before:                 After Left at y:       After Right at z:
    z                       z                       x
   /                       /                       / \\
  y          →            x          →            y   z
   \\                     /
    x                   y

1. Left rotate at y
2. Right rotate at z
\`\`\`

### Right-Left Rotation (RL Case)

Used when: Right subtree too tall (BF = -2) but right child leans left (BF > 0)

\`\`\`
Before:                 After Right at y:      After Left at z:
  z                       z                        x
   \\                       \\                      / \\
    y        →              x        →           z   y
   /                         \\
  x                           y

1. Right rotate at y
2. Left rotate at z
\`\`\`

## Rotation Summary

| Case | Balance Factor | Rotation |
|------|---------------|----------|
| LL | BF(z) = +2, BF(y) ≥ 0 | Right rotate z |
| RR | BF(z) = -2, BF(y) ≤ 0 | Left rotate z |
| LR | BF(z) = +2, BF(y) < 0 | Left rotate y, Right rotate z |
| RL | BF(z) = -2, BF(y) > 0 | Right rotate y, Left rotate z |

## Python Implementation

### AVL Node

\`\`\`python
class AVLNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None
        self.height = 0  # Height of node

def height(node):
    return node.height if node else -1

def update_height(node):
    node.height = 1 + max(height(node.left), height(node.right))

def balance_factor(node):
    return height(node.left) - height(node.right) if node else 0
\`\`\`

### Rotations

\`\`\`python
def rotate_right(z):
    y = z.left
    T3 = y.right
    
    y.right = z
    z.left = T3
    
    update_height(z)
    update_height(y)
    
    return y

def rotate_left(z):
    y = z.right
    T2 = y.left
    
    y.left = z
    z.right = T2
    
    update_height(z)
    update_height(y)
    
    return y
\`\`\`

### Rebalance

\`\`\`python
def rebalance(node):
    """Rebalance node if needed."""
    update_height(node)
    bf = balance_factor(node)
    
    # Left heavy
    if bf > 1:
        if balance_factor(node.left) < 0:  # LR case
            node.left = rotate_left(node.left)
        return rotate_right(node)  # LL case
    
    # Right heavy
    if bf < -1:
        if balance_factor(node.right) > 0:  # RL case
            node.right = rotate_right(node.right)
        return rotate_left(node)  # RR case
    
    return node  # Already balanced
\`\`\`

### Insert

\`\`\`python
def insert(root, val):
    """Insert value and rebalance."""
    # Standard BST insert
    if not root:
        return AVLNode(val)
    
    if val < root.val:
        root.left = insert(root.left, val)
    else:
        root.right = insert(root.right, val)
    
    # Rebalance this node
    return rebalance(root)
\`\`\`

### Delete

\`\`\`python
def delete(root, val):
    """Delete value and rebalance."""
    if not root:
        return None
    
    # Standard BST delete
    if val < root.val:
        root.left = delete(root.left, val)
    elif val > root.val:
        root.right = delete(root.right, val)
    else:
        # Node to delete found
        if not root.left:
            return root.right
        if not root.right:
            return root.left
        
        # Two children: find successor
        successor = root.right
        while successor.left:
            successor = successor.left
        root.val = successor.val
        root.right = delete(root.right, successor.val)
    
    # Rebalance this node
    return rebalance(root)
\`\`\`

## Complete AVL Tree Class

\`\`\`python
class AVLTree:
    def __init__(self):
        self.root = None
    
    def insert(self, val):
        self.root = self._insert(self.root, val)
    
    def _insert(self, node, val):
        if not node:
            return AVLNode(val)
        
        if val < node.val:
            node.left = self._insert(node.left, val)
        else:
            node.right = self._insert(node.right, val)
        
        return self._rebalance(node)
    
    def delete(self, val):
        self.root = self._delete(self.root, val)
    
    def _delete(self, node, val):
        if not node:
            return None
        
        if val < node.val:
            node.left = self._delete(node.left, val)
        elif val > node.val:
            node.right = self._delete(node.right, val)
        else:
            if not node.left:
                return node.right
            if not node.right:
                return node.left
            
            successor = node.right
            while successor.left:
                successor = successor.left
            node.val = successor.val
            node.right = self._delete(node.right, successor.val)
        
        return self._rebalance(node)
    
    def _rebalance(self, node):
        update_height(node)
        bf = balance_factor(node)
        
        if bf > 1:
            if balance_factor(node.left) < 0:
                node.left = rotate_left(node.left)
            return rotate_right(node)
        
        if bf < -1:
            if balance_factor(node.right) > 0:
                node.right = rotate_right(node.right)
            return rotate_left(node)
        
        return node
    
    def search(self, val):
        return self._search(self.root, val)
    
    def _search(self, node, val):
        if not node or node.val == val:
            return node
        if val < node.val:
            return self._search(node.left, val)
        return self._search(node.right, val)
    
    def inorder(self):
        result = []
        self._inorder(self.root, result)
        return result
    
    def _inorder(self, node, result):
        if node:
            self._inorder(node.left, result)
            result.append(node.val)
            self._inorder(node.right, result)

# Usage
avl = AVLTree()
for val in [10, 20, 30, 40, 50, 25]:
    avl.insert(val)
    print(f"Inserted {val}: {avl.inorder()}")

# Inserted 10: [10]
# Inserted 20: [10, 20]
# Inserted 30: [10, 20, 30]  ← Rotation happened!
# Inserted 40: [10, 20, 30, 40]
# Inserted 50: [10, 20, 30, 40, 50]
# Inserted 25: [10, 20, 25, 30, 40, 50]
\`\`\`

## AVL vs Other Self-Balancing Trees

| Tree | Balance Criteria | Rotation Types | Use Case |
|------|------------------|----------------|----------|
| AVL | Height diff ≤ 1 | 4 (LL, RR, LR, RL) | Read-heavy |
| Red-Black | Color properties | 2 + recoloring | Write-heavy |
| B-Tree | Multi-way balance | Split/merge | Databases |

**AVL trees** are more strictly balanced:
- Better for read-heavy workloads (fewer levels)
- More rotations on insert/delete than Red-Black

## Time Complexity

| Operation | Time Complexity |
|-----------|----------------|
| Search | O(log n) |
| Insert | O(log n) |
| Delete | O(log n) |
| Space | O(n) |

**Guaranteed O(log n)** because height is always O(log n).

## Interview Tips

### Key Points to Remember

1. AVL = self-balancing BST with balance factor -1, 0, +1
2. Four rotation cases: LL, RR, LR, RL
3. Insert/delete always end with rebalance check
4. Guarantees O(log n) for all operations
5. More balanced than Red-Black (stricter)

### Common Interview Topics

- Explain balance factor and when rotations occur
- Implement single rotations (LL, RR)
- Trace through insertion with rotations
- Compare AVL vs Red-Black trees
- When to use self-balancing trees

## Key Takeaways

- **AVL Tree** = self-balancing BST, height diff ≤ 1
- **Balance factor** = height(left) - height(right)
- **Four rotations**: LL, RR, LR, RL
- **Guarantees O(log n)** for search, insert, delete
- More **strictly balanced** than Red-Black trees
- Use when **reads are more frequent** than writes`,

    'dsa-graphs': `# DSA Graphs

## What is a Graph?

A **Graph** is a non-linear data structure consisting of **vertices (nodes)** connected by **edges**. Unlike trees, graphs can have cycles and any node can connect to any other node.

\`\`\`
Graph Visualization:

    A -------- B
    |\\        /|
    | \\      / |
    |  \\    /  |
    |   \\  /   |
    |    \\/    |
    C -------- D

Vertices: A, B, C, D
Edges: A-B, A-C, A-D, B-D, C-D
\`\`\`

## Graph Terminology

| Term | Definition |
|------|------------|
| **Vertex (Node)** | A point in the graph |
| **Edge** | Connection between two vertices |
| **Adjacent** | Two vertices connected by an edge |
| **Degree** | Number of edges connected to a vertex |
| **Path** | Sequence of vertices connected by edges |
| **Cycle** | Path that starts and ends at same vertex |
| **Connected** | Path exists between every pair of vertices |

## Directed vs Undirected Graphs

### Undirected Graph

Edges have **no direction** — connection goes both ways.

\`\`\`
Undirected:
    A --- B      A connects to B
    |     |      B connects to A
    C --- D      (bidirectional)

If A-B exists, you can go A→B or B→A
\`\`\`

**Examples**: Facebook friendships, road networks (two-way streets)

### Directed Graph (Digraph)

Edges have **direction** — one-way connections.

\`\`\`
Directed:
    A --→ B      A points to B
    ↓     ↓      But B does NOT point to A
    C --→ D

A→B means you can go from A to B only
\`\`\`

**Examples**: Twitter followers, web page links, prerequisites

\`\`\`python
# Undirected: add edge both ways
def add_undirected_edge(graph, u, v):
    graph[u].append(v)
    graph[v].append(u)

# Directed: add edge one way
def add_directed_edge(graph, u, v):
    graph[u].append(v)  # Only u → v
\`\`\`

## Weighted vs Unweighted Graphs

### Unweighted Graph

All edges are equal — no associated values.

\`\`\`
Unweighted:
    A --- B
    |     |
    C --- D

All edges have same "cost" (typically 1)
\`\`\`

### Weighted Graph

Edges have **weights** (costs, distances, values).

\`\`\`
Weighted:
    A --5-- B
    |       |
    3       7
    |       |
    C --2-- D

Edge A-B has weight 5
Edge C-D has weight 2
\`\`\`

**Examples**: Road distances, flight costs, network latency

\`\`\`python
# Weighted graph representation
graph = {
    'A': [('B', 5), ('C', 3)],
    'B': [('A', 5), ('D', 7)],
    'C': [('A', 3), ('D', 2)],
    'D': [('B', 7), ('C', 2)]
}
# Each entry: (neighbor, weight)
\`\`\`

## Graph Types Summary

| Type | Direction | Weights | Example |
|------|-----------|---------|---------|
| Undirected, Unweighted | No | No | Facebook friends |
| Directed, Unweighted | Yes | No | Twitter follows |
| Undirected, Weighted | No | Yes | Road map (distances) |
| Directed, Weighted | Yes | Yes | Flight routes (costs) |

## Real-World Examples

### 📱 Social Networks

\`\`\`
Facebook (undirected):
    Alice --- Bob
      |        |
    Carol --- Dave

If Alice is friends with Bob,
Bob is also friends with Alice.
\`\`\`

### 🗺️ Road Maps

\`\`\`
Cities with distances (weighted, undirected):

    NYC --225-- Boston
     |           |
    200         150
     |           |
    Philly ---- Hartford
          160

Distance from NYC to Boston = 225 miles
\`\`\`

### 🌐 Internet / Web

\`\`\`
Web pages (directed):
    
    Homepage → About
       ↓         ↓
    Products → Contact

Links are one-way (directed edges)
\`\`\`

### 🎓 Course Prerequisites

\`\`\`
Directed graph:
    
    Math101 → Calc1 → Calc2
                ↓
              Physics1

Must take Math101 before Calc1
\`\`\`

### ✅ Other Examples

- Flight routes between airports
- Computer networks
- Dependency graphs (packages, tasks)
- Game maps (nodes = locations)
- Neural networks

## Graph Properties

### Sparse vs Dense

| Type | Edge Count | Best Representation |
|------|------------|---------------------|
| Sparse | E ≈ V | Adjacency List |
| Dense | E ≈ V² | Adjacency Matrix |

\`\`\`
Sparse (like social networks):
    A --- B
    |
    C --- D --- E

Many vertices, few edges

Dense (like complete graph):
    A --- B
    |\\   /|
    | \\ / |
    |  X  |
    | / \\ |
    C --- D

Almost all vertices connected
\`\`\`

### Connected vs Disconnected

\`\`\`
Connected:              Disconnected:
    A --- B                 A --- B
    |     |
    C --- D                 C --- D

Path exists between      No path from A to C
any two vertices
\`\`\`

### Cyclic vs Acyclic

\`\`\`
Cyclic:                 Acyclic (DAG):
    A → B                   A → B
    ↑   ↓                   ↓   ↓
    D ← C                   C   D

Has cycle A→B→C→D→A     No cycles (Directed Acyclic Graph)
\`\`\`

## Time Complexity Overview

| Operation | Adjacency List | Adjacency Matrix |
|-----------|----------------|------------------|
| Add Vertex | O(1) | O(V²) |
| Add Edge | O(1) | O(1) |
| Remove Edge | O(E) | O(1) |
| Check Edge | O(V) | O(1) |
| Find Neighbors | O(V) | O(V) |
| Space | O(V + E) | O(V²) |
| BFS/DFS | O(V + E) | O(V²) |

## When to Use Graphs

### ✅ Use Graphs When:

1. **Relationships** between entities (social, network)
2. **Pathfinding** (shortest route, navigation)
3. **Dependencies** (task scheduling, prerequisites)
4. **Connectivity** (network topology)
5. **Cycle detection** (deadlocks, circular deps)

### Common Graph Algorithms

| Algorithm | Purpose |
|-----------|---------|
| BFS | Shortest path (unweighted), level-order |
| DFS | Connectivity, cycle detection, topological sort |
| Dijkstra | Shortest path (weighted, positive) |
| Bellman-Ford | Shortest path (negative weights) |
| Floyd-Warshall | All pairs shortest path |
| Kruskal/Prim | Minimum spanning tree |
| Topological Sort | Task ordering (DAG) |

## Key Takeaways

- **Graph** = vertices + edges connecting them
- **Directed**: edges have direction (one-way)
- **Undirected**: edges are bidirectional
- **Weighted**: edges have associated costs
- **Real uses**: social networks, maps, web, dependencies
- **Representation**: adjacency list (sparse) vs matrix (dense)
- **Foundation** for BFS, DFS, Dijkstra, and many algorithms`,

    'graphs-implementation': `# Graphs Implementation

## Overview

There are two main ways to represent graphs in code:

1. **Adjacency List** — list of neighbors for each vertex
2. **Adjacency Matrix** — 2D array showing all connections

\`\`\`
Graph:
    0 --- 1
    |     |
    2 --- 3

Adjacency List:          Adjacency Matrix:
0: [1, 2]                    0  1  2  3
1: [0, 3]                0 [ 0, 1, 1, 0 ]
2: [0, 3]                1 [ 1, 0, 0, 1 ]
3: [1, 2]                2 [ 1, 0, 0, 1 ]
                         3 [ 0, 1, 1, 0 ]
\`\`\`

---

## Adjacency List (Preferred)

Each vertex stores a **list of its neighbors**.

### Basic Implementation

\`\`\`python
# Using dictionary with lists
graph = {
    0: [1, 2],
    1: [0, 3],
    2: [0, 3],
    3: [1, 2]
}

# Access neighbors of vertex 0
print(graph[0])  # [1, 2]

# Check if edge exists
print(3 in graph[1])  # True (edge 1-3 exists)
\`\`\`

### Using defaultdict

\`\`\`python
from collections import defaultdict

graph = defaultdict(list)

# Add edges
graph[0].append(1)
graph[0].append(2)
graph[1].append(0)
graph[1].append(3)
graph[2].append(0)
graph[2].append(3)
graph[3].append(1)
graph[3].append(2)

print(dict(graph))
# {0: [1, 2], 1: [0, 3], 2: [0, 3], 3: [1, 2]}
\`\`\`

### Graph Class (Adjacency List)

\`\`\`python
class Graph:
    def __init__(self, directed=False):
        self.graph = defaultdict(list)
        self.directed = directed
    
    def add_edge(self, u, v):
        """Add edge between u and v."""
        self.graph[u].append(v)
        if not self.directed:
            self.graph[v].append(u)
    
    def remove_edge(self, u, v):
        """Remove edge between u and v."""
        if v in self.graph[u]:
            self.graph[u].remove(v)
        if not self.directed and u in self.graph[v]:
            self.graph[v].remove(u)
    
    def has_edge(self, u, v):
        """Check if edge exists."""
        return v in self.graph[u]
    
    def get_neighbors(self, u):
        """Get all neighbors of u."""
        return self.graph[u]
    
    def get_vertices(self):
        """Get all vertices."""
        return list(self.graph.keys())
    
    def __str__(self):
        result = []
        for vertex in self.graph:
            result.append(f"{vertex}: {self.graph[vertex]}")
        return "\\n".join(result)

# Usage
g = Graph(directed=False)
g.add_edge(0, 1)
g.add_edge(0, 2)
g.add_edge(1, 3)
g.add_edge(2, 3)

print(g)
# 0: [1, 2]
# 1: [0, 3]
# 2: [0, 3]
# 3: [1, 2]

print(g.has_edge(0, 1))  # True
print(g.get_neighbors(0))  # [1, 2]
\`\`\`

### Weighted Graph (Adjacency List)

\`\`\`python
class WeightedGraph:
    def __init__(self, directed=False):
        self.graph = defaultdict(list)
        self.directed = directed
    
    def add_edge(self, u, v, weight):
        """Add weighted edge."""
        self.graph[u].append((v, weight))
        if not self.directed:
            self.graph[v].append((u, weight))
    
    def get_neighbors(self, u):
        """Returns list of (neighbor, weight) tuples."""
        return self.graph[u]
    
    def __str__(self):
        result = []
        for vertex in self.graph:
            edges = [(n, w) for n, w in self.graph[vertex]]
            result.append(f"{vertex}: {edges}")
        return "\\n".join(result)

# Usage
wg = WeightedGraph()
wg.add_edge('A', 'B', 5)
wg.add_edge('A', 'C', 3)
wg.add_edge('B', 'D', 7)
wg.add_edge('C', 'D', 2)

print(wg)
# A: [('B', 5), ('C', 3)]
# B: [('A', 5), ('D', 7)]
# C: [('A', 3), ('D', 2)]
# D: [('B', 7), ('C', 2)]

# Get neighbors with weights
for neighbor, weight in wg.get_neighbors('A'):
    print(f"A → {neighbor}, weight: {weight}")
# A → B, weight: 5
# A → C, weight: 3
\`\`\`

---

## Adjacency Matrix

A 2D array where \`matrix[i][j] = 1\` if edge exists between i and j.

### Basic Implementation

\`\`\`python
# 4 vertices: 0, 1, 2, 3
# Edges: 0-1, 0-2, 1-3, 2-3

graph = [
    [0, 1, 1, 0],  # Vertex 0 connects to 1, 2
    [1, 0, 0, 1],  # Vertex 1 connects to 0, 3
    [1, 0, 0, 1],  # Vertex 2 connects to 0, 3
    [0, 1, 1, 0]   # Vertex 3 connects to 1, 2
]

# Check if edge exists between 0 and 1
print(graph[0][1])  # 1 (True)

# Check if edge exists between 0 and 3
print(graph[0][3])  # 0 (False)

# Get neighbors of vertex 0
neighbors = [i for i, connected in enumerate(graph[0]) if connected]
print(neighbors)  # [1, 2]
\`\`\`

### Graph Class (Adjacency Matrix)

\`\`\`python
class GraphMatrix:
    def __init__(self, num_vertices):
        self.V = num_vertices
        self.matrix = [[0] * num_vertices for _ in range(num_vertices)]
    
    def add_edge(self, u, v, directed=False):
        """Add edge between u and v."""
        self.matrix[u][v] = 1
        if not directed:
            self.matrix[v][u] = 1
    
    def remove_edge(self, u, v, directed=False):
        """Remove edge between u and v."""
        self.matrix[u][v] = 0
        if not directed:
            self.matrix[v][u] = 0
    
    def has_edge(self, u, v):
        """Check if edge exists."""
        return self.matrix[u][v] == 1
    
    def get_neighbors(self, u):
        """Get all neighbors of u."""
        return [v for v in range(self.V) if self.matrix[u][v] == 1]
    
    def display(self):
        """Print the matrix."""
        print("  ", end="")
        for i in range(self.V):
            print(f"{i} ", end="")
        print()
        for i in range(self.V):
            print(f"{i} ", end="")
            for j in range(self.V):
                print(f"{self.matrix[i][j]} ", end="")
            print()

# Usage
gm = GraphMatrix(4)
gm.add_edge(0, 1)
gm.add_edge(0, 2)
gm.add_edge(1, 3)
gm.add_edge(2, 3)

gm.display()
#   0 1 2 3
# 0 0 1 1 0
# 1 1 0 0 1
# 2 1 0 0 1
# 3 0 1 1 0

print(gm.has_edge(0, 1))  # True
print(gm.get_neighbors(0))  # [1, 2]
\`\`\`

### Weighted Matrix

\`\`\`python
# Use weights instead of 1, 0 for no edge or infinity
import math

class WeightedGraphMatrix:
    def __init__(self, num_vertices):
        self.V = num_vertices
        # Initialize with infinity (no connection)
        self.matrix = [[math.inf] * num_vertices for _ in range(num_vertices)]
        # Distance to self is 0
        for i in range(num_vertices):
            self.matrix[i][i] = 0
    
    def add_edge(self, u, v, weight, directed=False):
        self.matrix[u][v] = weight
        if not directed:
            self.matrix[v][u] = weight
    
    def get_weight(self, u, v):
        return self.matrix[u][v]

# Usage
wgm = WeightedGraphMatrix(4)
wgm.add_edge(0, 1, 5)
wgm.add_edge(0, 2, 3)
wgm.add_edge(1, 3, 7)
wgm.add_edge(2, 3, 2)

print(wgm.get_weight(0, 1))  # 5
print(wgm.get_weight(0, 3))  # inf (no direct edge)
\`\`\`

---

## Comparison: List vs Matrix

| Aspect | Adjacency List | Adjacency Matrix |
|--------|----------------|------------------|
| **Space** | O(V + E) | O(V²) |
| **Add Edge** | O(1) | O(1) |
| **Remove Edge** | O(E) | O(1) |
| **Check Edge** | O(degree) | O(1) |
| **Get Neighbors** | O(degree) | O(V) |
| **Sparse Graphs** | ✅ Efficient | ❌ Wastes space |
| **Dense Graphs** | ❌ Slow lookups | ✅ Efficient |

### When to Use Which?

| Use Case | Best Choice |
|----------|-------------|
| Social networks | Adjacency List |
| Sparse graphs (E << V²) | Adjacency List |
| Dense graphs (E ≈ V²) | Adjacency Matrix |
| Quick edge lookups | Adjacency Matrix |
| Memory constrained | Adjacency List |
| Floyd-Warshall algorithm | Adjacency Matrix |

---

## Building Graph from Edge List

\`\`\`python
def build_graph(edges, directed=False):
    """Build adjacency list from edge list."""
    graph = defaultdict(list)
    
    for u, v in edges:
        graph[u].append(v)
        if not directed:
            graph[v].append(u)
    
    return graph

# Edge list
edges = [(0, 1), (0, 2), (1, 3), (2, 3)]

graph = build_graph(edges)
print(dict(graph))
# {0: [1, 2], 1: [0, 3], 2: [0, 3], 3: [1, 2]}
\`\`\`

## Building from Number of Nodes + Edges

\`\`\`python
def build_graph_n(n, edges, directed=False):
    """Build graph with n nodes (0 to n-1)."""
    graph = {i: [] for i in range(n)}
    
    for u, v in edges:
        graph[u].append(v)
        if not directed:
            graph[v].append(u)
    
    return graph

# 5 nodes, some edges
graph = build_graph_n(5, [(0, 1), (1, 2), (3, 4)])
print(graph)
# {0: [1], 1: [0, 2], 2: [1], 3: [4], 4: [3]}
\`\`\`

---

## Interview Tips

### Common Patterns

1. **Edge list to adjacency list** — most common in interviews
2. **Handle directed vs undirected** — add edge both ways for undirected
3. **Handle weighted edges** — use tuples (neighbor, weight)
4. **0-indexed vs 1-indexed** — clarify with interviewer

### Quick Template

\`\`\`python
from collections import defaultdict

# Most versatile template
def solve(n, edges):
    # Build graph
    graph = defaultdict(list)
    for u, v in edges:
        graph[u].append(v)
        graph[v].append(u)  # Remove for directed
    
    # Now use BFS/DFS
    visited = set()
    # ... algorithm here
\`\`\`

## Key Takeaways

- **Adjacency List**: O(V + E) space, best for sparse graphs
- **Adjacency Matrix**: O(V²) space, best for dense graphs
- **defaultdict(list)** is your friend for quick implementation
- **Edge list → Adjacency list** is the most common interview pattern
- Always clarify: directed/undirected, weighted/unweighted, 0/1-indexed`,

    'dsa-graphs-traversal': `# DSA Graph Traversal

## Overview

Graph traversal means **visiting all vertices** in a graph. There are two fundamental approaches:

1. **BFS (Breadth-First Search)** — explore neighbors first, then their neighbors
2. **DFS (Depth-First Search)** — explore as deep as possible, then backtrack

\`\`\`
Graph:
    0 --- 1
    |     |
    2 --- 3 --- 4

BFS from 0: 0 → 1 → 2 → 3 → 4 (level by level)
DFS from 0: 0 → 1 → 3 → 2 → 4 (go deep, backtrack)
\`\`\`

---

## BFS (Breadth-First Search)

**BFS** explores all neighbors at the current depth before moving to the next level.

Uses a **Queue** (FIFO) to process nodes.

### Visual Example

\`\`\`
Graph:           BFS from 0:
    0 --- 1      
    |     |      Level 0: 0
    2 --- 3      Level 1: 1, 2
          |      Level 2: 3
          4      Level 3: 4

Visit order: 0 → 1 → 2 → 3 → 4
\`\`\`

### BFS Implementation

\`\`\`python
from collections import deque

def bfs(graph, start):
    """Breadth-First Search traversal."""
    visited = set()
    queue = deque([start])
    result = []
    
    while queue:
        node = queue.popleft()
        
        if node not in visited:
            visited.add(node)
            result.append(node)
            
            # Add all unvisited neighbors to queue
            for neighbor in graph[node]:
                if neighbor not in visited:
                    queue.append(neighbor)
    
    return result

# Example graph
graph = {
    0: [1, 2],
    1: [0, 3],
    2: [0, 3],
    3: [1, 2, 4],
    4: [3]
}

print(bfs(graph, 0))  # [0, 1, 2, 3, 4]
\`\`\`

### BFS with Level Tracking

\`\`\`python
from collections import deque

def bfs_levels(graph, start):
    """BFS that tracks levels (distance from start)."""
    visited = set([start])
    queue = deque([start])
    levels = {start: 0}
    
    while queue:
        node = queue.popleft()
        
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
                levels[neighbor] = levels[node] + 1
    
    return levels

print(bfs_levels(graph, 0))
# {0: 0, 1: 1, 2: 1, 3: 2, 4: 3}
\`\`\`

### BFS Shortest Path (Unweighted)

\`\`\`python
from collections import deque

def shortest_path_bfs(graph, start, end):
    """Find shortest path in unweighted graph."""
    if start == end:
        return [start]
    
    visited = set([start])
    queue = deque([(start, [start])])  # (node, path)
    
    while queue:
        node, path = queue.popleft()
        
        for neighbor in graph[node]:
            if neighbor == end:
                return path + [neighbor]
            
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, path + [neighbor]))
    
    return []  # No path found

print(shortest_path_bfs(graph, 0, 4))  # [0, 1, 3, 4] or [0, 2, 3, 4]
\`\`\`

### BFS Use Cases

| Use Case | Why BFS? |
|----------|----------|
| Shortest path (unweighted) | Finds minimum edges path |
| Level-order traversal | Natural level-by-level exploration |
| Finding all nodes at distance K | Processes by distance |
| Web crawling | Explore nearby pages first |
| Social network (degrees of separation) | Find connection distance |

---

## DFS (Depth-First Search)

**DFS** explores as deep as possible along each branch before backtracking.

Uses a **Stack** (LIFO) or **recursion**.

### Visual Example

\`\`\`
Graph:           DFS from 0:
    0 --- 1      
    |     |      0 → 1 → 3 → 2 → 4
    2 --- 3      (go deep, backtrack, continue)
          |      
          4      

Path: 0 → 1 (go deep)
      1 → 3 (go deep)
      3 → 2 (go deep, skip 1-visited)
      3 → 4 (go deep)
      Done!
\`\`\`

### DFS Recursive Implementation

\`\`\`python
def dfs(graph, node, visited=None):
    """Depth-First Search using recursion."""
    if visited is None:
        visited = set()
    
    if node in visited:
        return []
    
    visited.add(node)
    result = [node]
    
    for neighbor in graph[node]:
        result += dfs(graph, neighbor, visited)
    
    return result

# Example graph
graph = {
    0: [1, 2],
    1: [0, 3],
    2: [0, 3],
    3: [1, 2, 4],
    4: [3]
}

print(dfs(graph, 0))  # [0, 1, 3, 2, 4]
\`\`\`

### DFS Iterative Implementation

\`\`\`python
def dfs_iterative(graph, start):
    """DFS using explicit stack."""
    visited = set()
    stack = [start]
    result = []
    
    while stack:
        node = stack.pop()
        
        if node not in visited:
            visited.add(node)
            result.append(node)
            
            # Add neighbors to stack (reverse for left-to-right order)
            for neighbor in reversed(graph[node]):
                if neighbor not in visited:
                    stack.append(neighbor)
    
    return result

print(dfs_iterative(graph, 0))  # [0, 1, 3, 2, 4]
\`\`\`

### DFS for Connected Components

\`\`\`python
def count_components(n, edges):
    """Count connected components in undirected graph."""
    # Build adjacency list
    graph = {i: [] for i in range(n)}
    for u, v in edges:
        graph[u].append(v)
        graph[v].append(u)
    
    visited = set()
    count = 0
    
    def dfs(node):
        visited.add(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                dfs(neighbor)
    
    for node in range(n):
        if node not in visited:
            dfs(node)
            count += 1
    
    return count

# Example: 5 nodes, 2 components
edges = [(0, 1), (1, 2), (3, 4)]
print(count_components(5, edges))  # 2
\`\`\`

### DFS Path Finding

\`\`\`python
def find_path_dfs(graph, start, end, path=None):
    """Find any path from start to end using DFS."""
    if path is None:
        path = []
    
    path = path + [start]
    
    if start == end:
        return path
    
    for neighbor in graph[start]:
        if neighbor not in path:
            new_path = find_path_dfs(graph, neighbor, end, path)
            if new_path:
                return new_path
    
    return None

print(find_path_dfs(graph, 0, 4))  # [0, 1, 3, 4]
\`\`\`

### DFS Use Cases

| Use Case | Why DFS? |
|----------|----------|
| Detecting cycles | Natural backtracking |
| Topological sort | Process dependencies |
| Connected components | Explore full component |
| Path finding (any path) | Quick to find a path |
| Maze solving | Explore all branches |
| Solving puzzles | Backtracking approach |

---

## BFS vs DFS Comparison

| Aspect | BFS | DFS |
|--------|-----|-----|
| Data Structure | Queue | Stack / Recursion |
| Order | Level by level | Deep then backtrack |
| Shortest Path | ✅ Yes (unweighted) | ❌ No |
| Space | O(V) worst | O(V) worst |
| Time | O(V + E) | O(V + E) |
| When target is close | ✅ Better | ❌ May go deep first |
| When target is far | ❌ Explores wide first | ✅ May find faster |

\`\`\`
Graph:            BFS: 0 → 1 → 2 → 3 → 4 → 5
    0                 (level order)
   / \\
  1   2           DFS: 0 → 1 → 3 → 4 → 2 → 5
 / \\   \\               (depth first)
3   4   5
\`\`\`

---

## Time Complexity: O(V + E)

Both BFS and DFS visit:
- Every **vertex** once → O(V)
- Every **edge** once → O(E)

Total: **O(V + E)**

\`\`\`
For graph with:
V = 1000 vertices
E = 5000 edges

Time = O(1000 + 5000) = O(6000) = O(V + E)
\`\`\`

---

## Traversal for Disconnected Graphs

\`\`\`python
def traverse_all(graph, traverse_func):
    """Traverse all components of a graph."""
    visited = set()
    result = []
    
    for node in graph:
        if node not in visited:
            component = traverse_func(graph, node, visited)
            result.extend(component)
    
    return result

# BFS for disconnected graph
def bfs_component(graph, start, global_visited):
    visited = set()
    queue = deque([start])
    result = []
    
    while queue:
        node = queue.popleft()
        if node not in visited:
            visited.add(node)
            global_visited.add(node)
            result.append(node)
            for neighbor in graph[node]:
                if neighbor not in visited:
                    queue.append(neighbor)
    
    return result
\`\`\`

---

## Interview Tips

### Common Patterns

1. **BFS for shortest path** in unweighted graphs
2. **DFS for cycle detection** and topological sort
3. **Both for connected components**
4. **DFS is simpler** to implement recursively

### Quick Templates

\`\`\`python
# BFS Template
from collections import deque

def bfs(graph, start):
    visited = set([start])
    queue = deque([start])
    
    while queue:
        node = queue.popleft()
        # Process node here
        
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

# DFS Template
def dfs(graph, node, visited):
    if node in visited:
        return
    visited.add(node)
    # Process node here
    
    for neighbor in graph[node]:
        dfs(graph, neighbor, visited)
\`\`\`

## Key Takeaways

- **BFS**: Queue-based, level-order, shortest path (unweighted)
- **DFS**: Stack/recursion, go deep, backtrack
- **Time**: Both O(V + E)
- **BFS** for shortest path, **DFS** for cycles and topology
- Handle **disconnected graphs** by iterating all nodes
- **Visited set** prevents infinite loops`,

    'dsa-cycle-detection': `# DSA Cycle Detection

## What is a Cycle?

A **cycle** is a path in a graph that starts and ends at the same vertex, with at least one edge.

\`\`\`
Cycle:                  No Cycle:
  0 → 1                   0 → 1
  ↑   ↓                       ↓
  3 ← 2                   2 → 3

0→1→2→3→0 is a cycle     No path returns to start
\`\`\`

## Why Detect Cycles?

| Problem | Why Cycles Matter |
|---------|-------------------|
| Task scheduling | Circular dependencies = impossible |
| Deadlock detection | Processes waiting for each other |
| Course prerequisites | Circular prereqs = can't complete |
| Compiler dependencies | Import cycles break builds |
| Transaction processing | Cycle = potential infinite loop |

---

## Cycle Detection in Undirected Graphs

In undirected graphs, a cycle exists if we reach an already-visited node that **isn't the parent**.

### DFS Approach

\`\`\`python
def has_cycle_undirected(graph):
    """Detect cycle in undirected graph using DFS."""
    visited = set()
    
    def dfs(node, parent):
        visited.add(node)
        
        for neighbor in graph[node]:
            if neighbor not in visited:
                if dfs(neighbor, node):
                    return True
            elif neighbor != parent:
                # Found a visited node that isn't parent = cycle!
                return True
        
        return False
    
    # Check all components
    for node in graph:
        if node not in visited:
            if dfs(node, -1):
                return True
    
    return False

# Example with cycle
graph_cycle = {
    0: [1, 2],
    1: [0, 2],
    2: [0, 1]
}
print(has_cycle_undirected(graph_cycle))  # True

# Example without cycle
graph_no_cycle = {
    0: [1, 2],
    1: [0],
    2: [0]
}
print(has_cycle_undirected(graph_no_cycle))  # False
\`\`\`

### Why Check "neighbor != parent"?

\`\`\`
Undirected edge 0-1 is stored as:
graph[0] = [1]
graph[1] = [0]

When DFS goes 0 → 1:
- At node 1, neighbor 0 is visited
- But 0 is the parent (we came from 0)
- This is NOT a cycle!

Cycle example:
graph[0] = [1, 2]
graph[1] = [0, 2]
graph[2] = [0, 1]

DFS: 0 → 1 → 2
At 2: neighbor 0 is visited AND 0 ≠ parent(1)
This IS a cycle! (0-1-2-0)
\`\`\`

### Union-Find Approach

\`\`\`python
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
    
    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]
    
    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py:
            return False  # Already connected = cycle!
        if self.rank[px] < self.rank[py]:
            px, py = py, px
        self.parent[py] = px
        if self.rank[px] == self.rank[py]:
            self.rank[px] += 1
        return True

def has_cycle_union_find(n, edges):
    """Detect cycle using Union-Find."""
    uf = UnionFind(n)
    
    for u, v in edges:
        if not uf.union(u, v):
            return True  # Cycle found
    
    return False

# Example
edges = [(0, 1), (1, 2), (2, 0)]
print(has_cycle_union_find(3, edges))  # True

edges = [(0, 1), (1, 2)]
print(has_cycle_union_find(3, edges))  # False
\`\`\`

---

## Cycle Detection in Directed Graphs

For directed graphs, we need to track the **recursion stack** (current DFS path).

### DFS with Recursion Stack

\`\`\`python
def has_cycle_directed(graph):
    """Detect cycle in directed graph using DFS."""
    WHITE = 0  # Unvisited
    GRAY = 1   # In current path (recursion stack)
    BLACK = 2  # Fully processed
    
    color = {node: WHITE for node in graph}
    
    def dfs(node):
        color[node] = GRAY  # Mark as in-progress
        
        for neighbor in graph[node]:
            if color[neighbor] == GRAY:
                # Found node in current path = cycle!
                return True
            if color[neighbor] == WHITE:
                if dfs(neighbor):
                    return True
        
        color[node] = BLACK  # Mark as done
        return False
    
    # Check all components
    for node in graph:
        if color[node] == WHITE:
            if dfs(node):
                return True
    
    return False

# Example with cycle
graph_cycle = {
    0: [1],
    1: [2],
    2: [0]  # Back edge to 0
}
print(has_cycle_directed(graph_cycle))  # True

# Example without cycle (DAG)
graph_dag = {
    0: [1, 2],
    1: [3],
    2: [3],
    3: []
}
print(has_cycle_directed(graph_dag))  # False
\`\`\`

### Three Colors Explained

\`\`\`
WHITE (unvisited):  Node not yet discovered
GRAY (in progress): Node is in current DFS path
BLACK (done):       Node and all descendants processed

Cycle detection:
- If we visit a GRAY node → cycle (back edge in current path)
- If we visit a BLACK node → no cycle (already fully explored)

Example: 0 → 1 → 2 → 0

DFS at 0: color[0] = GRAY
DFS at 1: color[1] = GRAY
DFS at 2: color[2] = GRAY
From 2, neighbor 0 is GRAY → CYCLE!
\`\`\`

### Using visited + recursion_stack

\`\`\`python
def has_cycle_directed_v2(graph):
    """Alternative using two sets."""
    visited = set()
    rec_stack = set()  # Nodes in current DFS path
    
    def dfs(node):
        visited.add(node)
        rec_stack.add(node)
        
        for neighbor in graph[node]:
            if neighbor not in visited:
                if dfs(neighbor):
                    return True
            elif neighbor in rec_stack:
                # In current path = cycle!
                return True
        
        rec_stack.remove(node)  # Backtrack
        return False
    
    for node in graph:
        if node not in visited:
            if dfs(node):
                return True
    
    return False
\`\`\`

---

## Finding the Cycle

### Find Cycle in Directed Graph

\`\`\`python
def find_cycle_directed(graph):
    """Find and return the cycle if exists."""
    WHITE, GRAY, BLACK = 0, 1, 2
    color = {node: WHITE for node in graph}
    parent = {node: None for node in graph}
    cycle_start = None
    
    def dfs(node):
        nonlocal cycle_start
        color[node] = GRAY
        
        for neighbor in graph[node]:
            if color[neighbor] == GRAY:
                # Found cycle
                parent[neighbor] = node
                cycle_start = neighbor
                return True
            if color[neighbor] == WHITE:
                parent[neighbor] = node
                if dfs(neighbor):
                    return True
        
        color[node] = BLACK
        return False
    
    for node in graph:
        if color[node] == WHITE:
            if dfs(node):
                # Reconstruct cycle
                cycle = [cycle_start]
                current = parent[cycle_start]
                while current != cycle_start:
                    cycle.append(current)
                    current = parent[current]
                cycle.append(cycle_start)
                return cycle[::-1]
    
    return []

# Example
graph = {0: [1], 1: [2], 2: [0]}
print(find_cycle_directed(graph))  # [0, 1, 2, 0]
\`\`\`

---

## Topological Sort (Cycle Detection)

If topological sort is impossible, graph has a cycle.

\`\`\`python
from collections import deque

def topological_sort_kahn(graph, n):
    """Kahn's algorithm - returns empty if cycle exists."""
    # Calculate in-degrees
    in_degree = {i: 0 for i in range(n)}
    for node in graph:
        for neighbor in graph[node]:
            in_degree[neighbor] += 1
    
    # Start with nodes having no incoming edges
    queue = deque([node for node in in_degree if in_degree[node] == 0])
    result = []
    
    while queue:
        node = queue.popleft()
        result.append(node)
        
        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # If we couldn't process all nodes, there's a cycle
    if len(result) != n:
        return []  # Cycle exists!
    
    return result

# DAG - no cycle
dag = {0: [1, 2], 1: [3], 2: [3], 3: []}
print(topological_sort_kahn(dag, 4))  # [0, 1, 2, 3] or [0, 2, 1, 3]

# Has cycle
cycle_graph = {0: [1], 1: [2], 2: [0], 3: []}
print(topological_sort_kahn(cycle_graph, 4))  # [] (cycle detected)
\`\`\`

---

## Course Schedule Problem (LeetCode Classic)

\`\`\`python
def can_finish(num_courses, prerequisites):
    """
    Can we finish all courses? (No cycle in prerequisites)
    prerequisites[i] = [a, b] means b must be taken before a
    """
    graph = {i: [] for i in range(num_courses)}
    for course, prereq in prerequisites:
        graph[prereq].append(course)
    
    WHITE, GRAY, BLACK = 0, 1, 2
    color = [WHITE] * num_courses
    
    def has_cycle(node):
        color[node] = GRAY
        
        for neighbor in graph[node]:
            if color[neighbor] == GRAY:
                return True
            if color[neighbor] == WHITE and has_cycle(neighbor):
                return True
        
        color[node] = BLACK
        return False
    
    for i in range(num_courses):
        if color[i] == WHITE:
            if has_cycle(i):
                return False  # Can't finish - cycle!
    
    return True  # No cycle - can finish!

# Example
prereqs = [[1,0], [2,1], [3,2]]  # 0→1→2→3
print(can_finish(4, prereqs))  # True

prereqs = [[1,0], [0,1]]  # 0↔1 (cycle)
print(can_finish(2, prereqs))  # False
\`\`\`

---

## Time Complexity

| Algorithm | Time | Space |
|-----------|------|-------|
| DFS (undirected) | O(V + E) | O(V) |
| DFS (directed) | O(V + E) | O(V) |
| Union-Find | O(E × α(V)) | O(V) |
| Kahn's (topological) | O(V + E) | O(V) |

Where α(V) is the inverse Ackermann function (nearly constant).

---

## Summary: When to Use Which?

| Graph Type | Best Approach | Key Insight |
|------------|---------------|-------------|
| Undirected | DFS with parent | Cycle if visited ≠ parent |
| Undirected | Union-Find | Cycle if same component |
| Directed | DFS with colors | Cycle if GRAY → GRAY |
| Directed | Topological sort | Cycle if can't process all |

---

## Interview Tips

### Common Mistakes

1. **Undirected**: Forgetting to check parent
2. **Directed**: Using just "visited" instead of colors
3. **Disconnected**: Not checking all components
4. **Edge cases**: Empty graph, single node

### Key Points

- **Undirected**: visited neighbor ≠ parent → cycle
- **Directed**: need to track recursion stack (GRAY nodes)
- **Topological sort failure** = cycle exists
- Both use **DFS** with O(V + E) time

## Key Takeaways

- **Undirected cycle**: check if visited node isn't the parent
- **Directed cycle**: use 3 colors (WHITE/GRAY/BLACK)
- **Union-Find** is elegant for undirected cycle detection
- **Topological sort** fails if directed graph has cycle
- **Real applications**: deadlock, dependencies, scheduling
- **Time**: O(V + E) for all DFS-based approaches`,

    'dsa-shortest-path': `# DSA Shortest Path

## What is the Shortest Path Problem?

The **shortest path problem** is finding the path between two vertices in a graph such that the sum of edge weights is minimized.

\`\`\`
Weighted Graph:
    A --5-- B
    |       |
    3       7
    |       |
    C --2-- D

Shortest path from A to D:
  A → C → D = 3 + 2 = 5 ✓
  A → B → D = 5 + 7 = 12 ✗

Shortest path = 5
\`\`\`

## Why Shortest Path Matters

The shortest path is one of the **most practical algorithms** in computer science:

| Application | What's Being Minimized |
|-------------|------------------------|
| Google Maps | Travel time/distance |
| Network routing | Latency/hops |
| GPS navigation | Distance |
| Game AI | Movement cost |
| Flight booking | Cost/time |
| Social networks | Degrees of separation |

## Types of Shortest Path Problems

### 1. Single Source Shortest Path (SSSP)

Find shortest paths from **one source** to **all other vertices**.

\`\`\`
Source: A

A → B: 5
A → C: 3
A → D: 5 (via C)

Algorithms: Dijkstra, Bellman-Ford, BFS (unweighted)
\`\`\`

### 2. Single Destination Shortest Path

Find shortest paths from **all vertices** to **one destination**.

Same as SSSP with reversed edge directions!

### 3. Single Pair Shortest Path

Find shortest path from **source A** to **destination B**.

Usually solved using SSSP (stop when destination found).

### 4. All Pairs Shortest Path (APSP)

Find shortest paths between **every pair** of vertices.

\`\`\`
    A   B   C   D
A   0   5   3   5
B   5   0   8   7
C   3   8   0   2
D   5   7   2   0

Algorithm: Floyd-Warshall
\`\`\`

## Weighted vs Unweighted

### Unweighted Graph

All edges have equal weight (typically 1). Use **BFS**.

\`\`\`python
from collections import deque

def shortest_path_bfs(graph, start, end):
    """Shortest path in unweighted graph using BFS."""
    visited = {start}
    queue = deque([(start, [start])])
    
    while queue:
        node, path = queue.popleft()
        
        if node == end:
            return path
        
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, path + [neighbor]))
    
    return None  # No path

# Example
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D'],
    'C': ['A', 'D'],
    'D': ['B', 'C']
}
print(shortest_path_bfs(graph, 'A', 'D'))  # ['A', 'B', 'D'] or ['A', 'C', 'D']
\`\`\`

### Weighted Graph

Edges have different weights. Use **Dijkstra** or **Bellman-Ford**.

## Real-World Examples

### 🗺️ Google Maps / GPS Navigation

\`\`\`
Cities as vertices, roads as weighted edges:

    NYC --225mi-- Boston
     |              |
   200mi          150mi
     |              |
   Philly --160mi-- Hartford

Finding fastest route = shortest path
considering traffic = dynamic weights
\`\`\`

### 🌐 Network Routing

\`\`\`
Routers as vertices, connections as edges:

   Router1 --10ms-- Router2
      |               |
     5ms            15ms
      |               |
   Router3 --8ms--- Router4

Minimize latency = shortest path
\`\`\`

### 🎮 Game AI Navigation

\`\`\`
Grid cells as vertices, movement costs as weights:

  [1] [1] [5] [1]
  [1] [9] [9] [1]   9 = wall/obstacle
  [1] [1] [1] [1]

AI finds path avoiding high-cost areas
\`\`\`

## Algorithm Selection Guide

| Algorithm | Weights | Negative? | Time Complexity |
|-----------|---------|-----------|-----------------|
| BFS | Unweighted | N/A | O(V + E) |
| Dijkstra | Weighted | ❌ No | O((V + E) log V) |
| Bellman-Ford | Weighted | ✅ Yes | O(V × E) |
| Floyd-Warshall | All pairs | ✅ Yes | O(V³) |

## When to Use Which?

\`\`\`
Is graph weighted?
├── No → Use BFS
└── Yes
    ├── Any negative weights?
    │   ├── No → Use Dijkstra (faster)
    │   └── Yes → Use Bellman-Ford
    └── Need all pairs?
        └── Yes → Use Floyd-Warshall
\`\`\`

## Negative Weights

**Why do negative weights matter?**

\`\`\`
With negative weight:
    A --5-- B
     \\     /
      -10
        C

A → B: 5
A → C → B: -10 + ??? 

Negative edges can create shorter "detours"
that Dijkstra's greedy approach misses!
\`\`\`

**Negative cycle** = cycle where total weight is negative:
\`\`\`
    A --5-- B
    ↑       ↓
    -3      -4
     \\     /
       C

A → B → C → A = 5 + (-4) + (-3) = -2

Going around this cycle forever = infinitely negative path!
No valid shortest path exists.
\`\`\`

## Shortest Path with Path Reconstruction

\`\`\`python
import heapq

def dijkstra_with_path(graph, start, end):
    """Find shortest path and return both distance and path."""
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    previous = {node: None for node in graph}
    pq = [(0, start)]
    
    while pq:
        curr_dist, node = heapq.heappop(pq)
        
        if node == end:
            break
            
        if curr_dist > distances[node]:
            continue
        
        for neighbor, weight in graph[node]:
            dist = curr_dist + weight
            if dist < distances[neighbor]:
                distances[neighbor] = dist
                previous[neighbor] = node
                heapq.heappush(pq, (dist, neighbor))
    
    # Reconstruct path
    path = []
    current = end
    while current is not None:
        path.append(current)
        current = previous[current]
    path.reverse()
    
    return distances[end], path

# Example
graph = {
    'A': [('B', 5), ('C', 3)],
    'B': [('A', 5), ('D', 7)],
    'C': [('A', 3), ('D', 2)],
    'D': [('B', 7), ('C', 2)]
}
distance, path = dijkstra_with_path(graph, 'A', 'D')
print(f"Distance: {distance}")  # 5
print(f"Path: {path}")          # ['A', 'C', 'D']
\`\`\`

## Key Takeaways

- **Shortest path** = minimize total edge weight
- **Unweighted** → BFS (O(V + E))
- **Weighted, no negatives** → Dijkstra (O((V+E) log V))
- **Weighted, with negatives** → Bellman-Ford (O(V × E))
- **All pairs** → Floyd-Warshall (O(V³))
- **Real uses**: maps, routing, games, networks
- **Negative cycles** = no valid shortest path exists`,

    'dsa-dijkstra-s': `# DSA Dijkstra's Algorithm

## What is Dijkstra's Algorithm?

**Dijkstra's Algorithm** finds the shortest path from a source vertex to all other vertices in a weighted graph with **non-negative weights**.

Invented by Edsger Dijkstra in 1956, it's one of the most famous algorithms in computer science.

\`\`\`
Graph:
    A --4-- B
    |\\      |
    2  1    5
    |   \\   |
    C --3-- D

Dijkstra from A:
A → A: 0
A → C: 2
A → D: 1
A → B: 4
\`\`\`

## How It Works (Greedy Approach)

Dijkstra's is a **greedy algorithm** — it always picks the unvisited vertex with the smallest known distance.

### Step-by-Step

\`\`\`
Graph:
    A --4-- B
    |       |
    2       5
    |       |
    C --3-- D

Initial: dist = {A: 0, B: ∞, C: ∞, D: ∞}

Step 1: Pick A (smallest = 0)
  Check neighbors: B(4), C(2)
  Update: dist = {A: 0, B: 4, C: 2, D: ∞}

Step 2: Pick C (smallest unvisited = 2)
  Check neighbors: D(2+3=5)
  Update: dist = {A: 0, B: 4, C: 2, D: 5}

Step 3: Pick B (smallest unvisited = 4)
  Check neighbors: D(4+5=9) — but 9 > 5, no update
  Update: dist = {A: 0, B: 4, C: 2, D: 5}

Step 4: Pick D (smallest unvisited = 5)
  No unvisited neighbors

Done! Shortest distances from A:
A: 0, B: 4, C: 2, D: 5
\`\`\`

## Why Non-Negative Weights Only?

Dijkstra's greedy approach assumes once a vertex is "finalized," its distance won't improve. Negative weights can break this!

\`\`\`
Graph with negative weight:
    A --1-- B
     \\     /
      4  -5
       \\ /
        C

Dijkstra from A:
1. Pick A, update: B=1, C=4
2. Pick B (finalized at 1!)
3. Pick C

But A → C → B = 4 + (-5) = -1 < 1!
Dijkstra missed the shorter path because B was already finalized.
\`\`\`

## Python Implementation

### Using Priority Queue (Heap)

\`\`\`python
import heapq

def dijkstra(graph, start):
    """
    Dijkstra's algorithm using min-heap.
    graph: {node: [(neighbor, weight), ...]}
    Returns: dictionary of shortest distances
    """
    # Initialize distances
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    
    # Priority queue: (distance, node)
    pq = [(0, start)]
    
    while pq:
        curr_dist, node = heapq.heappop(pq)
        
        # Skip if we've found a better path already
        if curr_dist > distances[node]:
            continue
        
        # Check all neighbors
        for neighbor, weight in graph[node]:
            distance = curr_dist + weight
            
            # If found shorter path, update
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))
    
    return distances

# Example usage
graph = {
    'A': [('B', 4), ('C', 2)],
    'B': [('A', 4), ('D', 5)],
    'C': [('A', 2), ('D', 3)],
    'D': [('B', 5), ('C', 3)]
}

result = dijkstra(graph, 'A')
print(result)  # {'A': 0, 'B': 4, 'C': 2, 'D': 5}
\`\`\`

### With Path Reconstruction

\`\`\`python
import heapq

def dijkstra_with_path(graph, start):
    """Dijkstra's with path tracking."""
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    previous = {node: None for node in graph}
    pq = [(0, start)]
    
    while pq:
        curr_dist, node = heapq.heappop(pq)
        
        if curr_dist > distances[node]:
            continue
        
        for neighbor, weight in graph[node]:
            distance = curr_dist + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                previous[neighbor] = node
                heapq.heappush(pq, (distance, neighbor))
    
    return distances, previous

def get_path(previous, start, end):
    """Reconstruct path from previous pointers."""
    path = []
    current = end
    
    while current is not None:
        path.append(current)
        current = previous[current]
    
    path.reverse()
    return path if path[0] == start else []

# Usage
distances, previous = dijkstra_with_path(graph, 'A')
path = get_path(previous, 'A', 'D')
print(f"Distance A to D: {distances['D']}")  # 5
print(f"Path: {' → '.join(path)}")           # A → C → D
\`\`\`

### Single Destination (Early Exit)

\`\`\`python
import heapq

def dijkstra_to(graph, start, end):
    """Find shortest path to specific destination."""
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    pq = [(0, start)]
    
    while pq:
        curr_dist, node = heapq.heappop(pq)
        
        # Early exit when destination reached
        if node == end:
            return curr_dist
        
        if curr_dist > distances[node]:
            continue
        
        for neighbor, weight in graph[node]:
            distance = curr_dist + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))
    
    return float('inf')  # No path found

print(dijkstra_to(graph, 'A', 'D'))  # 5
\`\`\`

## Visual Walkthrough

\`\`\`
Graph:
        B
      / | \\
     4  |  2
    /   3   \\
   A    |    E
    \\   |   /
     1  |  6
      \\ | /
        C ---5--- D

Step-by-step from A:

Initial:
  dist = {A:0, B:∞, C:∞, D:∞, E:∞}
  pq = [(0,A)]

Pop (0,A):
  → B: 0+4=4, C: 0+1=1
  dist = {A:0, B:4, C:1, D:∞, E:∞}
  pq = [(1,C), (4,B)]

Pop (1,C):
  → B: 1+3=4 (same), D: 1+5=6
  dist = {A:0, B:4, C:1, D:6, E:∞}
  pq = [(4,B), (6,D)]

Pop (4,B):
  → E: 4+2=6
  dist = {A:0, B:4, C:1, D:6, E:6}
  pq = [(6,D), (6,E)]

Pop (6,D):
  No better paths

Pop (6,E):
  No unvisited neighbors

Final: {A:0, B:4, C:1, D:6, E:6}
\`\`\`

## Time Complexity

| Implementation | Time Complexity |
|----------------|-----------------|
| Array (naive) | O(V²) |
| Binary Heap | O((V + E) log V) |
| Fibonacci Heap | O(E + V log V) |

**With binary heap (heapq):** O((V + E) log V)
- Each vertex extracted once: O(V log V)
- Each edge relaxed once: O(E log V)

**Space Complexity:** O(V + E)

## Common Mistakes

### 1. Not Checking for Outdated Entries

\`\`\`python
# ❌ Wrong: Process outdated distances
while pq:
    curr_dist, node = heapq.heappop(pq)
    # Missing check! May process old, larger distance

# ✅ Correct: Skip outdated entries
while pq:
    curr_dist, node = heapq.heappop(pq)
    if curr_dist > distances[node]:
        continue  # Skip - we have a better path
\`\`\`

### 2. Using with Negative Weights

\`\`\`python
# ❌ Wrong: Dijkstra with negative weights
graph = {
    'A': [('B', 1), ('C', 4)],
    'B': [('C', -5)],  # Negative weight!
    'C': []
}
# Dijkstra will give wrong answer!

# ✅ Correct: Use Bellman-Ford for negative weights
\`\`\`

### 3. Missing Nodes in Graph

\`\`\`python
# ❌ Wrong: Node D has no entry
graph = {
    'A': [('B', 1)],
    'B': [('C', 2), ('D', 3)],
    'C': []
    # D missing!
}

# ✅ Correct: All nodes should have entries
graph = {
    'A': [('B', 1)],
    'B': [('C', 2), ('D', 3)],
    'C': [],
    'D': []
}
\`\`\`

## Grid-Based Dijkstra

\`\`\`python
import heapq

def dijkstra_grid(grid):
    """Shortest path in weighted grid from top-left to bottom-right."""
    rows, cols = len(grid), len(grid[0])
    distances = [[float('inf')] * cols for _ in range(rows)]
    distances[0][0] = grid[0][0]
    
    pq = [(grid[0][0], 0, 0)]  # (distance, row, col)
    directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]
    
    while pq:
        dist, r, c = heapq.heappop(pq)
        
        if dist > distances[r][c]:
            continue
        
        for dr, dc in directions:
            nr, nc = r + dr, c + dc
            
            if 0 <= nr < rows and 0 <= nc < cols:
                new_dist = dist + grid[nr][nc]
                
                if new_dist < distances[nr][nc]:
                    distances[nr][nc] = new_dist
                    heapq.heappush(pq, (new_dist, nr, nc))
    
    return distances[rows-1][cols-1]

# Example: minimum path sum
grid = [
    [1, 3, 1],
    [1, 5, 1],
    [4, 2, 1]
]
print(dijkstra_grid(grid))  # 7 (1→3→1→1→1)
\`\`\`

## Dijkstra vs BFS vs DFS

| Aspect | BFS | DFS | Dijkstra |
|--------|-----|-----|----------|
| Weights | Unweighted | Unweighted | Weighted (≥0) |
| Shortest path? | ✅ Yes | ❌ No | ✅ Yes |
| Data structure | Queue | Stack | Priority Queue |
| Time | O(V+E) | O(V+E) | O((V+E)logV) |

## Interview Tips

### Common Interview Problems

1. **Network Delay Time** — Dijkstra from source
2. **Cheapest Flights Within K Stops** — Modified Dijkstra
3. **Path with Minimum Effort** — Binary search + BFS or Dijkstra
4. **Swim in Rising Water** — Dijkstra on grid
5. **Shortest Path in Binary Matrix** — BFS (unweighted)

### Key Points

- Dijkstra = **greedy** shortest path algorithm
- Only works with **non-negative** weights
- Uses **min-heap (priority queue)**
- Time: O((V + E) log V) with binary heap
- Check for **outdated entries** when popping from heap
- Use **Bellman-Ford** if negative weights exist

## Key Takeaways

- **Dijkstra's** finds shortest paths from source to all vertices
- **Greedy**: always process closest unvisited vertex
- **Non-negative weights only** — fails with negative edges
- **Priority queue** (heap) is essential for efficiency
- **O((V + E) log V)** with binary heap
- **Skip outdated entries** in the priority queue
- **Path reconstruction**: track previous vertex for each node`,

    'dsa-bellman-ford': `# DSA Bellman-Ford Algorithm

## What is Bellman-Ford Algorithm?

**Bellman-Ford Algorithm** finds shortest paths from a source vertex to all other vertices, and it works with **negative edge weights**.

Unlike Dijkstra's, it can also **detect negative cycles** (cycles where total weight is negative).

\`\`\`
Graph with negative edge:
    A --4-- B
    |       |
    2      -5
    |       |
    C --3-- D

Bellman-Ford from A:
A → A: 0
A → C: 2
A → B: 4
A → D: 4 + (-5) = -1 ✓ (handles negative!)
Actually: A → B → D = -1, then D → C = 2, better than A → C
\`\`\`

## How It Works

Bellman-Ford uses **relaxation** — repeatedly trying to improve distance estimates.

### Key Insight

- In a graph with V vertices, the shortest path has at most V-1 edges
- So we need at most V-1 relaxation rounds to find all shortest paths
- If distances still improve after V-1 rounds → negative cycle!

### Algorithm Steps

1. Initialize distance to source = 0, all others = ∞
2. Repeat V-1 times:
   - For each edge (u, v, w): if dist[u] + w < dist[v], update dist[v]
3. Check for negative cycles:
   - If any edge can still be relaxed → negative cycle exists

## Visual Walkthrough

\`\`\`
Edges: (A,B,4), (A,C,2), (B,D,-5), (C,D,3)
V = 4 vertices, need V-1 = 3 iterations

Initial:
  dist = {A:0, B:∞, C:∞, D:∞}

Iteration 1 (relax all edges):
  (A,B,4): dist[B] = min(∞, 0+4) = 4
  (A,C,2): dist[C] = min(∞, 0+2) = 2
  (B,D,-5): dist[D] = min(∞, 4+(-5)) = -1
  (C,D,3): dist[D] = min(-1, 2+3) = -1 (no change)
  
  dist = {A:0, B:4, C:2, D:-1}

Iteration 2:
  (A,B,4): dist[B] = min(4, 0+4) = 4 (no change)
  (A,C,2): dist[C] = min(2, 0+2) = 2 (no change)
  (B,D,-5): dist[D] = min(-1, 4+(-5)) = -1 (no change)
  (C,D,3): dist[D] = min(-1, 2+3) = -1 (no change)

Iteration 3: No changes

Final: {A:0, B:4, C:2, D:-1}

No negative cycle (no improvements in extra iteration)
\`\`\`

## Python Implementation

### Basic Implementation

\`\`\`python
def bellman_ford(edges, vertices, start):
    """
    Bellman-Ford algorithm.
    edges: list of (u, v, weight) tuples
    vertices: number of vertices (0 to vertices-1)
    start: source vertex
    Returns: distances dict or None if negative cycle
    """
    # Initialize distances
    dist = [float('inf')] * vertices
    dist[start] = 0
    
    # Relax all edges V-1 times
    for _ in range(vertices - 1):
        for u, v, w in edges:
            if dist[u] != float('inf') and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
    
    # Check for negative cycles
    for u, v, w in edges:
        if dist[u] != float('inf') and dist[u] + w < dist[v]:
            print("Negative cycle detected!")
            return None
    
    return dist

# Example
edges = [
    (0, 1, 4),   # A → B, weight 4
    (0, 2, 2),   # A → C, weight 2
    (1, 3, -5),  # B → D, weight -5
    (2, 3, 3)    # C → D, weight 3
]
result = bellman_ford(edges, 4, 0)
print(result)  # [0, 4, 2, -1]
\`\`\`

### With Path Reconstruction

\`\`\`python
def bellman_ford_with_path(edges, vertices, start):
    """Bellman-Ford with path tracking."""
    dist = [float('inf')] * vertices
    dist[start] = 0
    predecessor = [-1] * vertices
    
    # Relax all edges V-1 times
    for _ in range(vertices - 1):
        for u, v, w in edges:
            if dist[u] != float('inf') and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                predecessor[v] = u
    
    # Check for negative cycles
    for u, v, w in edges:
        if dist[u] != float('inf') and dist[u] + w < dist[v]:
            return None, None  # Negative cycle
    
    return dist, predecessor

def get_path(predecessor, start, end):
    """Reconstruct path from predecessor array."""
    path = []
    current = end
    
    while current != -1:
        path.append(current)
        current = predecessor[current]
    
    path.reverse()
    return path if path and path[0] == start else []

# Usage
dist, pred = bellman_ford_with_path(edges, 4, 0)
if dist:
    print(f"Distances: {dist}")       # [0, 4, 2, -1]
    print(f"Path to 3: {get_path(pred, 0, 3)}")  # [0, 1, 3]
\`\`\`

### Using Dictionary (Named Vertices)

\`\`\`python
def bellman_ford_dict(edges, vertices, start):
    """Bellman-Ford with named vertices."""
    dist = {v: float('inf') for v in vertices}
    dist[start] = 0
    
    for _ in range(len(vertices) - 1):
        for u, v, w in edges:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
    
    # Check for negative cycle
    for u, v, w in edges:
        if dist[u] + w < dist[v]:
            return None
    
    return dist

# Example with named vertices
vertices = ['A', 'B', 'C', 'D']
edges = [
    ('A', 'B', 4),
    ('A', 'C', 2),
    ('B', 'D', -5),
    ('C', 'D', 3)
]
result = bellman_ford_dict(edges, vertices, 'A')
print(result)  # {'A': 0, 'B': 4, 'C': 2, 'D': -1}
\`\`\`

## Negative Cycle Detection

A **negative cycle** is a cycle where the sum of edge weights is negative.

\`\`\`
Negative cycle:
    A --1-- B
    ↑       ↓
   -5       2
    |       |
    D ←-3-- C

Cycle: B → C → D → A → B
Weight: 2 + (-3) + (-5) + 1 = -5 < 0

Going around this cycle infinitely → -∞ distance!
\`\`\`

### Finding Vertices in Negative Cycle

\`\`\`python
def find_negative_cycle(edges, vertices, start):
    """Find vertices affected by negative cycle."""
    dist = [float('inf')] * vertices
    dist[start] = 0
    predecessor = [-1] * vertices
    
    # Relax V-1 times
    for _ in range(vertices - 1):
        for u, v, w in edges:
            if dist[u] != float('inf') and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                predecessor[v] = u
    
    # Find vertices that can still be relaxed
    in_cycle = set()
    for u, v, w in edges:
        if dist[u] != float('inf') and dist[u] + w < dist[v]:
            # v is in or reachable from negative cycle
            # Trace back to find cycle
            visited = set()
            current = v
            while current not in visited and current != -1:
                visited.add(current)
                current = predecessor[current]
            
            if current != -1:
                # Found cycle, collect all vertices in it
                cycle_vertex = current
                in_cycle.add(cycle_vertex)
                current = predecessor[cycle_vertex]
                while current != cycle_vertex:
                    in_cycle.add(current)
                    current = predecessor[current]
    
    return in_cycle if in_cycle else None

# Example with negative cycle
edges = [
    (0, 1, 1),
    (1, 2, 2),
    (2, 3, -3),
    (3, 0, -5)
]
cycle = find_negative_cycle(edges, 4, 0)
print(f"Negative cycle vertices: {cycle}")  # {0, 1, 2, 3}
\`\`\`

## Time Complexity

| Aspect | Complexity |
|--------|------------|
| Time | O(V × E) |
| Space | O(V) |

**Why O(V × E)?**
- V-1 iterations (outer loop)
- Each iteration processes E edges
- Total: O(V × E)

## Bellman-Ford vs Dijkstra

| Aspect | Dijkstra | Bellman-Ford |
|--------|----------|--------------|
| Negative weights | ❌ No | ✅ Yes |
| Negative cycle detection | ❌ No | ✅ Yes |
| Time complexity | O((V+E) log V) | O(V × E) |
| When to use | Non-negative weights | Negative weights possible |
| Approach | Greedy | Dynamic Programming |

\`\`\`
Decision tree:

Has negative weights?
├── No → Use Dijkstra (faster)
└── Yes
    ├── Need to detect negative cycles? → Bellman-Ford
    └── Just shortest paths? → Bellman-Ford (or SPFA)
\`\`\`

## Optimized Version: Early Termination

\`\`\`python
def bellman_ford_optimized(edges, vertices, start):
    """Bellman-Ford with early termination."""
    dist = [float('inf')] * vertices
    dist[start] = 0
    
    for i in range(vertices - 1):
        updated = False
        
        for u, v, w in edges:
            if dist[u] != float('inf') and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                updated = True
        
        # Early termination if no updates
        if not updated:
            break
    
    # Check for negative cycle
    for u, v, w in edges:
        if dist[u] != float('inf') and dist[u] + w < dist[v]:
            return None
    
    return dist
\`\`\`

## SPFA (Shortest Path Faster Algorithm)

An optimization of Bellman-Ford using a queue:

\`\`\`python
from collections import deque

def spfa(graph, vertices, start):
    """SPFA - optimized Bellman-Ford."""
    dist = [float('inf')] * vertices
    dist[start] = 0
    in_queue = [False] * vertices
    count = [0] * vertices  # For negative cycle detection
    
    queue = deque([start])
    in_queue[start] = True
    
    while queue:
        u = queue.popleft()
        in_queue[u] = False
        
        for v, w in graph[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                
                if not in_queue[v]:
                    queue.append(v)
                    in_queue[v] = True
                    count[v] += 1
                    
                    if count[v] >= vertices:
                        return None  # Negative cycle
    
    return dist

# Graph as adjacency list
graph = {
    0: [(1, 4), (2, 2)],
    1: [(3, -5)],
    2: [(3, 3)],
    3: []
}
print(spfa(graph, 4, 0))  # [0, 4, 2, -1]
\`\`\`

## Common Applications

| Application | Why Bellman-Ford? |
|-------------|-------------------|
| Currency arbitrage | Detect negative cycles in exchange rates |
| Network routing | RIP protocol uses distance-vector (similar concept) |
| Constraint systems | Difference constraints can have negative edges |
| Game economics | Prices can have negative effects |

### Currency Arbitrage Example

\`\`\`python
def detect_arbitrage(rates):
    """
    Detect arbitrage opportunity in currency exchange.
    rates[i][j] = exchange rate from currency i to j
    """
    n = len(rates)
    
    # Convert to negative log (multiplication → addition)
    import math
    edges = []
    for i in range(n):
        for j in range(n):
            if i != j and rates[i][j] > 0:
                edges.append((i, j, -math.log(rates[i][j])))
    
    # Run Bellman-Ford
    dist = [float('inf')] * n
    dist[0] = 0
    
    for _ in range(n - 1):
        for u, v, w in edges:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
    
    # Check for negative cycle (= arbitrage opportunity)
    for u, v, w in edges:
        if dist[u] + w < dist[v]:
            return True  # Arbitrage exists!
    
    return False

# Example: USD, EUR, GBP
# rates[i][j] = how many units of j you get for 1 unit of i
rates = [
    [1.0, 0.9, 0.8],   # 1 USD = 0.9 EUR, 0.8 GBP
    [1.1, 1.0, 0.9],   # 1 EUR = 1.1 USD, 0.9 GBP
    [1.3, 1.1, 1.0]    # 1 GBP = 1.3 USD, 1.1 EUR
]
print(detect_arbitrage(rates))  # True/False
\`\`\`

## Interview Tips

### Common Interview Problems

1. **Cheapest Flights Within K Stops** — Modified Bellman-Ford
2. **Negative cycle detection** — Direct application
3. **Currency exchange arbitrage** — Classic problem
4. **Network routing** — Distributed Bellman-Ford

### Key Points

- Bellman-Ford handles **negative weights**
- Detects **negative cycles** (extra iteration check)
- **O(V × E)** time — slower than Dijkstra
- Use when **negative weights possible**
- V-1 iterations guarantee shortest path (if no negative cycle)

## Key Takeaways

- **Bellman-Ford** finds shortest paths with negative weights
- **V-1 relaxation iterations** guarantee correctness
- **Negative cycle detection**: if V-th iteration still improves, cycle exists
- **Time**: O(V × E) — slower than Dijkstra's O((V+E) log V)
- Use Dijkstra if no negative weights (faster)
- **Real applications**: currency arbitrage, routing protocols
- **SPFA** is a faster variant using a queue`,

    'minimum-spanning-tree': `# Minimum Spanning Tree (MST)

## What is a Minimum Spanning Tree?

A **Minimum Spanning Tree** is a subset of edges in a connected, undirected, weighted graph that:
- **Connects all vertices** together
- Has **no cycles**
- Has the **minimum possible total edge weight**

\`\`\`
Original Graph:              MST (total weight = 9):
    A                            A
   /|\\                          /
  4 2 6                        2
 /  |  \\                      /
B---C---D                    B---C---D
  3   5                        3   4

MST edges: A-C (2), B-C (3), C-D (4) = 9
\`\`\`

## Key Requirements

For a graph to have an MST:

| Requirement | Description |
|-------------|-------------|
| **Connected** | Must be able to reach any vertex from any other |
| **Undirected** | Edges have no direction |
| **Weighted** | Edges have costs/weights |

\`\`\`
✅ Valid for MST:          ❌ Cannot have MST:
    A---B                      A → B (directed)
    |   |                      
    C---D (connected,          A   B
          undirected)          C   D (disconnected)
\`\`\`

## MST Properties

### Property 1: V-1 Edges

An MST with **V vertices** always has exactly **V-1 edges**.

\`\`\`
V = 4 vertices → V-1 = 3 edges

    A           A
   /|\\         / \\
  B C D  →    B   C
               \\
                D

4 vertices, 3 edges
\`\`\`

### Property 2: No Cycles

MST is a **tree** — adding any edge would create a cycle.

\`\`\`
MST:            Adding edge B-D creates cycle:
    A               A
   / \\             / \\
  B   C           B---C
   \\               \\ /
    D               D  ← Cycle B-C-D-B!
\`\`\`

### Property 3: Uniqueness

If **all edge weights are unique**, the MST is **unique**.

If some edges have equal weights, there may be multiple valid MSTs.

\`\`\`
Unique weights → One MST:     Equal weights → Multiple MSTs:
    A                             A
   /|\\                           /|\\
  1 2 3                         2 2 2
 /  |  \\                       /  |  \\
B   C   D                     B   C   D

Only one MST possible        Multiple valid MSTs
\`\`\`

## Why MST Matters

### Real-World Applications

| Application | Vertices | Edges | Weight |
|-------------|----------|-------|--------|
| Network cables | Computers | Cable routes | Cable length |
| Road construction | Cities | Roads | Construction cost |
| Power grids | Houses | Power lines | Wire length |
| Pipeline networks | Facilities | Pipes | Pipe cost |
| Circuit design | Components | Wires | Wire length |

### 🔌 Network Cable Layout

\`\`\`
Office layout (minimize cable):

  Server
    |
  +-+-+
  |   |
 PC1 PC2
  |
 PC3

MST connects all with minimum total cable length
\`\`\`

### 🛣️ Road Construction

\`\`\`
Cities and road costs (in millions):

    NYC
   / | \\
  5  3  7
 /   |   \\
LA--CHI--MIA
  4     6

MST: NYC-CHI (3) + LA-CHI (4) + CHI-MIA (6) = 13 million
Connects all cities with minimum road construction cost
\`\`\`

### ⚡ Power Grid

\`\`\`
Houses and power line distances:

  Power Plant
      |
   +--+--+
   |     |
House1  House2
   |
House3

MST minimizes total power line length
\`\`\`

## MST vs Shortest Path

| Aspect | MST | Shortest Path |
|--------|-----|---------------|
| Goal | Connect ALL vertices | Connect TWO vertices |
| Output | Tree (V-1 edges) | Single path |
| Algorithm | Prim's, Kruskal's | Dijkstra, BFS |
| Minimizes | Total edge weight | Path weight |

\`\`\`
Graph:
    A --3-- B
    |       |
    2       4
    |       |
    C --5-- D

MST: A-C (2), A-B (3), B-D (4) = 9
(Connects ALL vertices)

Shortest A to D: A-B-D = 7
(Only connects A and D)
\`\`\`

## Cut Property

The **cut property** is the foundation of MST algorithms:

> For any cut of the graph, the minimum weight edge crossing the cut belongs to the MST.

\`\`\`
Cut separating {A, B} from {C, D}:

    A---B  |  C---D
           |
Edges crossing cut:
  A-C (2) ← minimum, must be in MST
  A-D (5)
  B-C (4)
  B-D (6)
\`\`\`

## MST Algorithms Overview

| Algorithm | Approach | Time Complexity | Best For |
|-----------|----------|-----------------|----------|
| **Prim's** | Grow from one vertex | O(E log V) | Dense graphs |
| **Kruskal's** | Sort edges, add smallest | O(E log E) | Sparse graphs |

\`\`\`
Prim's: Grow tree from a starting vertex
        Add closest vertex to tree

Kruskal's: Sort all edges by weight
           Add edges that don't create cycles
\`\`\`

## Basic MST Verification

\`\`\`python
def is_valid_mst(vertices, mst_edges):
    """Check if edges form a valid MST."""
    n = len(vertices)
    
    # Must have V-1 edges
    if len(mst_edges) != n - 1:
        return False, "Wrong number of edges"
    
    # Must connect all vertices (no cycles)
    parent = {v: v for v in vertices}
    
    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]
    
    for u, v, _ in mst_edges:
        root_u, root_v = find(u), find(v)
        if root_u == root_v:
            return False, "Cycle detected"
        parent[root_u] = root_v
    
    # Check all connected
    roots = set(find(v) for v in vertices)
    if len(roots) > 1:
        return False, "Graph not connected"
    
    return True, "Valid MST"

# Example
vertices = ['A', 'B', 'C', 'D']
mst_edges = [('A', 'C', 2), ('A', 'B', 3), ('B', 'D', 4)]
valid, msg = is_valid_mst(vertices, mst_edges)
print(f"{msg}")  # Valid MST
\`\`\`

## Key Takeaways

- **MST** = tree connecting all vertices with minimum total weight
- Graph must be **connected** and **undirected**
- MST has exactly **V-1 edges** (no cycles)
- **Unique MST** if all edge weights are different
- **Real uses**: network cables, roads, power grids, pipelines
- **Two main algorithms**: Prim's (vertex-based) and Kruskal's (edge-based)
- **Cut property**: minimum edge crossing any cut is in MST`,

    'dsa-prim-s': `# DSA Prim's Algorithm

## What is Prim's Algorithm?

**Prim's Algorithm** is a greedy algorithm that builds the Minimum Spanning Tree by:
- Starting from any vertex
- Repeatedly adding the **cheapest edge** that connects the tree to a new vertex
- Until all vertices are included

\`\`\`
Build MST step by step:

Graph:                    Step 1: Start at A
    A                         A           
   /|\\                       (in MST)
  4 2 6                   
 /  |  \\                  
B---C---D                 
  3   5                   

Step 2: Add cheapest     Step 3: Add cheapest     Step 4: Add cheapest
edge from A               edge from {A,C}          edge from {A,C,B}
    A                         A                        A
    |                        /                        /
    2                       2                        2
    |                      /                        /
    C                    B---C                    B---C
                           3                        3   4
                                                        D

MST complete: A-C (2), C-B (3), C-D (5) → Wait, let's check...
Actually: A-C (2), B-C (3), C-D (5) = 10
\`\`\`

## How It Works

### The Greedy Choice

At each step, pick the **minimum weight edge** that:
1. Has one endpoint in the MST
2. Has one endpoint NOT in the MST

\`\`\`
MST vertices: {A, C}
Non-MST vertices: {B, D}

Candidate edges:
  A-B: 4 (A in MST, B not)
  C-B: 3 (C in MST, B not) ← MINIMUM
  C-D: 5 (C in MST, D not)

Pick C-B (weight 3)
\`\`\`

### Algorithm Steps

1. Initialize: pick any starting vertex
2. Add starting vertex to MST
3. While MST doesn't include all vertices:
   - Find minimum weight edge connecting MST to non-MST vertex
   - Add that edge and vertex to MST
4. Return MST edges

## Visual Walkthrough

\`\`\`
Graph:
    A --4-- B
    |\\      |\\
    2  6    1  3
    |   \\   |   \\
    C --5-- D --2-- E

Step-by-step from A:

Step 0: Start at A
  MST = {A}
  Candidates: A-B(4), A-C(2), A-D(6)
  Pick: A-C (2)

Step 1: 
  MST = {A, C}
  Candidates: A-B(4), A-D(6), C-D(5)
  Pick: A-B (4)

Step 2:
  MST = {A, C, B}
  Candidates: A-D(6), C-D(5), B-D(1), B-E(3)
  Pick: B-D (1)

Step 3:
  MST = {A, C, B, D}
  Candidates: A-D(6)✗, C-D(5)✗, B-E(3), D-E(2)
  (Edges within MST ignored)
  Pick: D-E (2)

Step 4:
  MST = {A, C, B, D, E} - All vertices included!

MST edges: A-C(2), A-B(4), B-D(1), D-E(2)
Total weight: 2 + 4 + 1 + 2 = 9
\`\`\`

## Python Implementation

### Using Priority Queue (Min-Heap)

\`\`\`python
import heapq

def prims(graph, start):
    """
    Prim's algorithm using min-heap.
    graph: {node: [(neighbor, weight), ...]}
    Returns: total MST cost
    """
    visited = set()
    min_heap = [(0, start)]  # (weight, node)
    total_cost = 0
    
    while min_heap:
        cost, node = heapq.heappop(min_heap)
        
        # Skip if already in MST
        if node in visited:
            continue
        
        # Add to MST
        visited.add(node)
        total_cost += cost
        
        # Add edges to unvisited neighbors
        for neighbor, weight in graph[node]:
            if neighbor not in visited:
                heapq.heappush(min_heap, (weight, neighbor))
    
    return total_cost

# Example
graph = {
    'A': [('B', 4), ('C', 2)],
    'B': [('A', 4), ('C', 3), ('D', 5)],
    'C': [('A', 2), ('B', 3), ('D', 4)],
    'D': [('B', 5), ('C', 4)]
}

result = prims(graph, 'A')
print(f"MST total cost: {result}")  # 9
\`\`\`

### With Edge Tracking

\`\`\`python
import heapq

def prims_with_edges(graph, start):
    """Prim's algorithm returning MST edges."""
    visited = set()
    # (weight, current_node, parent_node)
    min_heap = [(0, start, None)]
    total_cost = 0
    mst_edges = []
    
    while min_heap:
        cost, node, parent = heapq.heappop(min_heap)
        
        if node in visited:
            continue
        
        visited.add(node)
        total_cost += cost
        
        if parent is not None:
            mst_edges.append((parent, node, cost))
        
        for neighbor, weight in graph[node]:
            if neighbor not in visited:
                heapq.heappush(min_heap, (weight, neighbor, node))
    
    return total_cost, mst_edges

# Example
cost, edges = prims_with_edges(graph, 'A')
print(f"Total cost: {cost}")
print("MST edges:")
for u, v, w in edges:
    print(f"  {u} -- {v}: {w}")
\`\`\`

**Output:**
\`\`\`
Total cost: 9
MST edges:
  A -- C: 2
  C -- B: 3
  C -- D: 4
\`\`\`

### Using Adjacency Matrix

\`\`\`python
import heapq

def prims_matrix(adj_matrix, n):
    """
    Prim's algorithm with adjacency matrix.
    adj_matrix[i][j] = weight (0 or inf if no edge)
    n = number of vertices
    """
    INF = float('inf')
    visited = [False] * n
    min_heap = [(0, 0)]  # (weight, vertex)
    total_cost = 0
    
    while min_heap:
        cost, u = heapq.heappop(min_heap)
        
        if visited[u]:
            continue
        
        visited[u] = True
        total_cost += cost
        
        for v in range(n):
            if not visited[v] and adj_matrix[u][v] != INF:
                heapq.heappush(min_heap, (adj_matrix[u][v], v))
    
    return total_cost

# Example
INF = float('inf')
matrix = [
    [0, 4, 2, INF],    # A
    [4, 0, 3, 5],      # B
    [2, 3, 0, 4],      # C
    [INF, 5, 4, 0]     # D
]
print(prims_matrix(matrix, 4))  # 9
\`\`\`

## Time Complexity

| Implementation | Time Complexity |
|----------------|-----------------|
| Adjacency matrix (naive) | O(V²) |
| Binary heap + adjacency list | O(E log V) |
| Fibonacci heap | O(E + V log V) |

**With binary heap:** O(E log V)
- Each edge considered once: O(E)
- Each heap operation: O(log V)

**Space Complexity:** O(V + E)

## Why It Works

Prim's algorithm is correct because of the **Cut Property**:

> For any cut, the minimum weight edge crossing the cut is in the MST.

\`\`\`
At each step:
- MST vertices form one side of cut
- Non-MST vertices form other side
- We pick minimum edge crossing this cut
- By cut property, this edge is in MST!
\`\`\`

## Handling Disconnected Graphs

\`\`\`python
import heapq

def prims_forest(graph):
    """Handle disconnected graphs - returns MST forest."""
    all_nodes = set(graph.keys())
    visited = set()
    total_cost = 0
    forests = []
    
    for start in all_nodes:
        if start in visited:
            continue
        
        # Run Prim's for this component
        min_heap = [(0, start)]
        component_cost = 0
        component_edges = []
        
        while min_heap:
            cost, node = heapq.heappop(min_heap)
            
            if node in visited:
                continue
            
            visited.add(node)
            component_cost += cost
            
            for neighbor, weight in graph[node]:
                if neighbor not in visited:
                    heapq.heappush(min_heap, (weight, neighbor))
        
        total_cost += component_cost
        forests.append(component_cost)
    
    return total_cost, forests

# Disconnected graph
graph = {
    'A': [('B', 1)],
    'B': [('A', 1)],
    'C': [('D', 2)],
    'D': [('C', 2)]
}
cost, components = prims_forest(graph)
print(f"Total: {cost}, Components: {components}")  # Total: 3, Components: [1, 2]
\`\`\`

## Common Mistakes

### 1. Not Checking Visited Before Processing

\`\`\`python
# ❌ Wrong: Process same node multiple times
while min_heap:
    cost, node = heapq.heappop(min_heap)
    visited.add(node)  # Should check BEFORE adding!

# ✅ Correct: Skip if already visited
while min_heap:
    cost, node = heapq.heappop(min_heap)
    if node in visited:
        continue
    visited.add(node)
\`\`\`

### 2. Adding Edges to Visited Neighbors

\`\`\`python
# ❌ Wrong: Add all edges
for neighbor, weight in graph[node]:
    heapq.heappush(min_heap, (weight, neighbor))

# ✅ Correct: Only add edges to unvisited
for neighbor, weight in graph[node]:
    if neighbor not in visited:
        heapq.heappush(min_heap, (weight, neighbor))
\`\`\`

## Prim's vs Dijkstra's

They look similar but have different goals:

| Aspect | Prim's | Dijkstra's |
|--------|--------|------------|
| Goal | Minimum spanning tree | Shortest paths |
| Updates | Edge weight | Path distance |
| Output | Tree (V-1 edges) | Distances to all vertices |

\`\`\`python
# Prim's: add edge weight
heapq.heappush(min_heap, (weight, neighbor))

# Dijkstra's: add total distance
heapq.heappush(pq, (curr_dist + weight, neighbor))
\`\`\`

## Interview Tips

### Common Interview Problems

1. **Min Cost to Connect All Points** — Direct Prim's application
2. **Connecting Cities With Minimum Cost** — Classic MST
3. **Minimum Cost to Make All Points Connected** — Prim's or Kruskal's

### Key Points

- Prim's is **greedy** — always picks minimum edge to expand MST
- Uses **priority queue** for efficiency
- Time: **O(E log V)** with binary heap
- Best for **dense graphs** (many edges)
- Start from **any vertex** — result is same
- **Similar to Dijkstra's** but tracks edge weights, not path distances

## Key Takeaways

- **Prim's** builds MST by growing from one vertex
- **Greedy**: always add cheapest edge to a new vertex
- **Priority queue** (min-heap) for efficiency
- **O(E log V)** time with binary heap
- Works on **connected, undirected, weighted** graphs
- Best for **dense graphs** (E close to V²)
- **Cut property** guarantees correctness`,

    'dsa-kruskal-s': `# DSA Kruskal's Algorithm

## What is Kruskal's Algorithm?

**Kruskal's Algorithm** is a greedy algorithm that builds the Minimum Spanning Tree by:
- Sorting all edges by weight
- Adding edges in order (smallest first)
- Skipping edges that would create a cycle
- Until V-1 edges are added

\`\`\`
Graph edges sorted by weight:
  B-D: 1
  A-C: 2
  D-E: 2
  B-C: 3
  A-B: 4
  C-D: 5
  A-D: 6

Add edges avoiding cycles:
  ✓ B-D: 1 (no cycle)
  ✓ A-C: 2 (no cycle)
  ✓ D-E: 2 (no cycle)
  ✓ B-C: 3 (no cycle)
  ✗ A-B: 4 (creates cycle A-B-C-A)
  ...

MST: B-D(1), A-C(2), D-E(2), B-C(3) = 8
\`\`\`

## How It Works

### The Key Idea

1. **Sort** all edges by weight (ascending)
2. **Process** edges one by one
3. **Add** edge if it doesn't create a cycle
4. **Stop** when MST has V-1 edges

### Cycle Detection with Union-Find

The key challenge is **detecting cycles efficiently**. We use **Union-Find (Disjoint Set)**.

\`\`\`
Edge B-D: Are B and D in same component?
  - B's root: B
  - D's root: D
  - Different! No cycle. Add edge, union B and D.

Edge A-C: Are A and C in same component?
  - A's root: A
  - C's root: C
  - Different! No cycle. Add edge, union A and C.

Edge A-B: Are A and B in same component?
  - A's root: A (connected to C)
  - B's root: B (connected to D, E)
  - Different? Let's check after more unions...
\`\`\`

## Visual Walkthrough

\`\`\`
Graph:
    A --4-- B
    |\\      |\\
    2  6    1  3
    |   \\   |   \\
    C --5-- D --2-- E

Edges sorted: (B,D,1), (A,C,2), (D,E,2), (B,E,3), (A,B,4), (C,D,5), (A,D,6)

Initial: Each vertex is its own component
  Components: {A}, {B}, {C}, {D}, {E}

Step 1: Process (B,D,1)
  B and D in different components → Add edge
  Components: {A}, {B,D}, {C}, {E}
  MST edges: [(B,D,1)]

Step 2: Process (A,C,2)
  A and C in different components → Add edge
  Components: {A,C}, {B,D}, {E}
  MST edges: [(B,D,1), (A,C,2)]

Step 3: Process (D,E,2)
  D and E in different components → Add edge
  Components: {A,C}, {B,D,E}
  MST edges: [(B,D,1), (A,C,2), (D,E,2)]

Step 4: Process (B,E,3)
  B and E in SAME component {B,D,E} → Skip (would create cycle)

Step 5: Process (A,B,4)
  A in {A,C}, B in {B,D,E} → Different → Add edge
  Components: {A,C,B,D,E}
  MST edges: [(B,D,1), (A,C,2), (D,E,2), (A,B,4)]

V-1 = 4 edges added. Done!
Total weight: 1 + 2 + 2 + 4 = 9
\`\`\`

## Union-Find (Disjoint Set)

### Basic Operations

\`\`\`python
def find(parent, x):
    """Find root of x with path compression."""
    if parent[x] != x:
        parent[x] = find(parent, parent[x])  # Path compression
    return parent[x]

def union(parent, rank, x, y):
    """Union two sets by rank."""
    root_x = find(parent, x)
    root_y = find(parent, y)
    
    if root_x != root_y:
        # Union by rank
        if rank[root_x] < rank[root_y]:
            parent[root_x] = root_y
        elif rank[root_x] > rank[root_y]:
            parent[root_y] = root_x
        else:
            parent[root_y] = root_x
            rank[root_x] += 1
\`\`\`

### Why Path Compression?

\`\`\`
Without path compression:     With path compression:
       A                            A
       |                          / | \\
       B                         B  C  D
       |
       C
       |
       D

find(D) = 4 hops              find(D) = 1 hop (after first find)
\`\`\`

## Python Implementation

### Complete Kruskal's Algorithm

\`\`\`python
def find(parent, x):
    """Find with path compression."""
    if parent[x] != x:
        parent[x] = find(parent, parent[x])
    return parent[x]

def union(parent, rank, x, y):
    """Union by rank."""
    root_x = find(parent, x)
    root_y = find(parent, y)
    
    if root_x != root_y:
        if rank[root_x] < rank[root_y]:
            parent[root_x] = root_y
        elif rank[root_x] > rank[root_y]:
            parent[root_y] = root_x
        else:
            parent[root_y] = root_x
            rank[root_x] += 1

def kruskal(edges, n):
    """
    Kruskal's algorithm.
    edges: list of (u, v, weight) tuples
    n: number of vertices (0 to n-1)
    Returns: total MST cost
    """
    # Sort edges by weight
    edges.sort(key=lambda x: x[2])
    
    # Initialize Union-Find
    parent = [i for i in range(n)]
    rank = [0] * n
    
    mst_cost = 0
    edges_added = 0
    
    for u, v, w in edges:
        # Check if adding edge creates cycle
        if find(parent, u) != find(parent, v):
            union(parent, rank, u, v)
            mst_cost += w
            edges_added += 1
            
            # MST complete when V-1 edges added
            if edges_added == n - 1:
                break
    
    return mst_cost

# Example
edges = [
    (0, 1, 4),  # A-B
    (0, 2, 2),  # A-C
    (1, 2, 3),  # B-C
    (1, 3, 5),  # B-D
    (2, 3, 4)   # C-D
]
print(kruskal(edges, 4))  # 9
\`\`\`

### With Edge Tracking

\`\`\`python
def kruskal_with_edges(edges, n):
    """Kruskal's returning MST edges."""
    edges.sort(key=lambda x: x[2])
    
    parent = [i for i in range(n)]
    rank = [0] * n
    
    mst_edges = []
    mst_cost = 0
    
    for u, v, w in edges:
        if find(parent, u) != find(parent, v):
            union(parent, rank, u, v)
            mst_edges.append((u, v, w))
            mst_cost += w
            
            if len(mst_edges) == n - 1:
                break
    
    return mst_cost, mst_edges

# Example
cost, mst = kruskal_with_edges(edges, 4)
print(f"Cost: {cost}")
print("MST edges:")
for u, v, w in mst:
    print(f"  {u} -- {v}: {w}")
\`\`\`

### With Named Vertices

\`\`\`python
def kruskal_named(edges, vertices):
    """Kruskal's with named vertices."""
    # Create vertex to index mapping
    vertex_idx = {v: i for i, v in enumerate(vertices)}
    n = len(vertices)
    
    # Convert edges to indices
    indexed_edges = [(vertex_idx[u], vertex_idx[v], w) for u, v, w in edges]
    indexed_edges.sort(key=lambda x: x[2])
    
    parent = [i for i in range(n)]
    rank = [0] * n
    
    mst_cost = 0
    mst_edges = []
    
    for u, v, w in indexed_edges:
        if find(parent, u) != find(parent, v):
            union(parent, rank, u, v)
            mst_cost += w
            mst_edges.append((vertices[u], vertices[v], w))
            
            if len(mst_edges) == n - 1:
                break
    
    return mst_cost, mst_edges

# Example
vertices = ['A', 'B', 'C', 'D']
edges = [
    ('A', 'B', 4),
    ('A', 'C', 2),
    ('B', 'C', 3),
    ('B', 'D', 5),
    ('C', 'D', 4)
]
cost, mst = kruskal_named(edges, vertices)
print(f"Cost: {cost}, Edges: {mst}")
# Cost: 9, Edges: [('A', 'C', 2), ('B', 'C', 3), ('C', 'D', 4)]
\`\`\`

## Time Complexity

| Operation | Complexity |
|-----------|------------|
| Sort edges | O(E log E) |
| Union-Find operations | O(E × α(V)) ≈ O(E) |
| **Total** | **O(E log E)** |

Note: α(V) is the inverse Ackermann function, practically constant.

Since E ≤ V², we have log E ≤ 2 log V, so O(E log E) = O(E log V).

**Space Complexity:** O(V) for Union-Find

## Kruskal's vs Prim's

| Aspect | Kruskal's | Prim's |
|--------|-----------|--------|
| Approach | Edge-based | Vertex-based |
| Data structure | Union-Find | Priority Queue |
| Time | O(E log E) | O(E log V) |
| Best for | Sparse graphs | Dense graphs |
| Edge list | Yes | No (needs adjacency) |

### When to Use Which?

\`\`\`
Sparse graph (E ≈ V):
  Kruskal's: O(V log V)
  Prim's: O(V log V)
  → Either works

Dense graph (E ≈ V²):
  Kruskal's: O(V² log V)
  Prim's: O(V² log V) or O(V²) with matrix
  → Prim's slightly better

Edge list given:
  → Kruskal's (no conversion needed)

Adjacency list given:
  → Prim's (no edge extraction needed)
\`\`\`

## Handling Disconnected Graphs

\`\`\`python
def kruskal_forest(edges, n):
    """Kruskal's for possibly disconnected graph."""
    edges.sort(key=lambda x: x[2])
    
    parent = [i for i in range(n)]
    rank = [0] * n
    
    mst_cost = 0
    mst_edges = []
    
    for u, v, w in edges:
        if find(parent, u) != find(parent, v):
            union(parent, rank, u, v)
            mst_edges.append((u, v, w))
            mst_cost += w
    
    # Check if graph is connected
    roots = set(find(parent, i) for i in range(n))
    is_connected = len(roots) == 1
    
    return mst_cost, mst_edges, is_connected

# Example: disconnected graph
edges = [
    (0, 1, 1),  # Component 1
    (2, 3, 2)   # Component 2
]
cost, mst, connected = kruskal_forest(edges, 4)
print(f"Cost: {cost}, Connected: {connected}")  # Cost: 3, Connected: False
\`\`\`

## Common Mistakes

### 1. Forgetting Path Compression

\`\`\`python
# ❌ Wrong: No path compression (slow)
def find(parent, x):
    while parent[x] != x:
        x = parent[x]
    return x

# ✅ Correct: With path compression
def find(parent, x):
    if parent[x] != x:
        parent[x] = find(parent, parent[x])
    return parent[x]
\`\`\`

### 2. Not Using Union by Rank

\`\`\`python
# ❌ Wrong: Simple union (can create long chains)
def union(parent, x, y):
    parent[find(parent, x)] = find(parent, y)

# ✅ Correct: Union by rank
def union(parent, rank, x, y):
    root_x, root_y = find(parent, x), find(parent, y)
    if root_x != root_y:
        if rank[root_x] < rank[root_y]:
            parent[root_x] = root_y
        elif rank[root_x] > rank[root_y]:
            parent[root_y] = root_x
        else:
            parent[root_y] = root_x
            rank[root_x] += 1
\`\`\`

### 3. Not Checking if Graph is Connected

\`\`\`python
# ❌ Wrong: Assume graph is always connected
return mst_cost

# ✅ Correct: Verify MST has V-1 edges
if len(mst_edges) != n - 1:
    return -1  # Graph is not connected
return mst_cost
\`\`\`

## Union-Find Class Implementation

\`\`\`python
class UnionFind:
    """Disjoint Set with path compression and union by rank."""
    
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
        self.components = n
    
    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]
    
    def union(self, x, y):
        root_x, root_y = self.find(x), self.find(y)
        
        if root_x == root_y:
            return False  # Already in same component
        
        if self.rank[root_x] < self.rank[root_y]:
            self.parent[root_x] = root_y
        elif self.rank[root_x] > self.rank[root_y]:
            self.parent[root_y] = root_x
        else:
            self.parent[root_y] = root_x
            self.rank[root_x] += 1
        
        self.components -= 1
        return True
    
    def connected(self, x, y):
        return self.find(x) == self.find(y)

def kruskal_uf_class(edges, n):
    """Kruskal's using UnionFind class."""
    edges.sort(key=lambda x: x[2])
    uf = UnionFind(n)
    
    mst_cost = 0
    mst_edges = []
    
    for u, v, w in edges:
        if uf.union(u, v):
            mst_cost += w
            mst_edges.append((u, v, w))
            
            if uf.components == 1:
                break
    
    return mst_cost, mst_edges
\`\`\`

## Interview Tips

### Common Interview Problems

1. **Min Cost to Connect All Points** — Kruskal's with edge generation
2. **Connecting Cities With Minimum Cost** — Direct application
3. **Number of Operations to Make Network Connected** — Union-Find + counting
4. **Redundant Connection** — Find cycle-creating edge

### Key Points

- Kruskal's is **edge-based** greedy algorithm
- **Sort edges** by weight first
- Use **Union-Find** for O(1) cycle detection
- **Path compression + union by rank** for efficiency
- Time: **O(E log E)**
- Best for **sparse graphs** or when edges given as list
- Returns **MST forest** if graph disconnected

## Key Takeaways

- **Kruskal's** builds MST by adding edges in sorted order
- **Skip edges** that would create a cycle
- **Union-Find** enables efficient cycle detection
- **Path compression** + **union by rank** = nearly O(1) operations
- **O(E log E)** time, dominated by sorting
- Best for **sparse graphs** (E much less than V²)
- Works with **disconnected graphs** (returns MST forest)`,

    'dsa-maximum-flow': `# DSA Maximum Flow

## What is a Flow Network?

A **flow network** is a directed graph where:
- Each edge has a **capacity** (maximum flow it can carry)
- There's a **source** vertex (where flow originates)
- There's a **sink** vertex (where flow terminates)
- Flow must respect capacity constraints

\`\`\`
Flow Network:
      capacity
  S ----10---→ A
  |            |
  5            8
  ↓            ↓
  B ----7----→ T

S = Source (flow starts here)
T = Sink (flow ends here)
Numbers = edge capacities
\`\`\`

## Flow Properties

### 1. Capacity Constraint

Flow on each edge cannot exceed its capacity.

\`\`\`
Edge (A, B) with capacity 10:
  - Flow can be 0, 5, 10 ✓
  - Flow cannot be 15 ✗
  
0 ≤ flow(u,v) ≤ capacity(u,v)
\`\`\`

### 2. Flow Conservation

For every vertex (except source and sink):
**Flow in = Flow out**

\`\`\`
      5              5
  A ----→ B ----→ C
          ↑
          3
          |
          D

At B: Flow in (5 + 3) = Flow out (8)
But we only have edge B→C with capacity...
So: Total in = Total out at each internal node
\`\`\`

### 3. Skew Symmetry

flow(u, v) = -flow(v, u)

If we send 5 units from A to B, it's like sending -5 from B to A.

## Maximum Flow Problem

**Goal:** Find the maximum amount of flow that can be sent from source to sink while respecting all capacity constraints.

\`\`\`
Flow Network:              Maximum Flow = 15
       10                      10
   S ----→ A                S ----→ A
   |       |                |       |
   5       8                5       8
   ↓       ↓                ↓       ↓
   B --7-→ T                B --7-→ T

Paths used:
  S → A → T: 8 units
  S → B → T: 5 units (limited by S→B)
  S → A → T: already saturated
  
But wait, we can send 2 more via S→A:
  S → A: 10 capacity, using 8 = 2 remaining
  Need path from A to T...

Max flow = 8 + 5 + 2 = 15? Let's calculate properly.
\`\`\`

## Real-World Applications

| Application | Source | Sink | Capacity |
|-------------|--------|------|----------|
| Water pipelines | Reservoir | City | Pipe diameter |
| Traffic systems | Entry point | Exit point | Road lanes |
| Data routing | Server | Client | Bandwidth |
| Supply chains | Factory | Store | Truck capacity |
| Airline scheduling | Origin | Destination | Seat count |

### 🚰 Water Pipeline Network

\`\`\`
Reservoir (Source)
       |
    [100 L/s]
       ↓
   Pump Station
      / \\
 [40]   [60]
    ↓     ↓
 City A  City B
    ↓     ↓
 [30]   [50]
    ↓     ↓
   Main Tank (Sink)

Maximum flow = How much water can reach main tank?
\`\`\`

### 🚗 Traffic Flow

\`\`\`
Highway Entry (Source)
        |
    [1000 cars/hr]
        ↓
    Intersection
       / | \\
   [400][300][300]
     ↓   ↓   ↓
   Route A B C
     ↓   ↓   ↓
   [350][250][400]
     ↓   ↓   ↓
    Downtown (Sink)

Max flow = Maximum throughput the road network supports
\`\`\`

### 💻 Network Bandwidth

\`\`\`
Data Center (Source)
        |
    [1 Gbps]
        ↓
      Router
       / \\
[500Mb] [600Mb]
    ↓     ↓
 ISP A   ISP B
    ↓     ↓
[400Mb] [500Mb]
    ↓     ↓
   User (Sink)

Max flow = Maximum download speed user can achieve
\`\`\`

## Key Concepts

### Residual Graph

The **residual graph** shows remaining capacity on each edge after some flow.

\`\`\`
Original:                After sending 5 units S→A→T:
     10                       5 (remaining)
 S ----→ A                S ----→ A
         |                     ↑   |
         8                     5   3 (remaining)
         ↓                (back)   ↓
         T                         T

Residual capacity = original capacity - current flow
Back edge = allows "undoing" flow
\`\`\`

### Augmenting Path

A path from source to sink in the residual graph with positive capacity on all edges.

\`\`\`
Residual Graph:
       5
   S ----→ A
   |       |
   5       3
   ↓       ↓
   B --7-→ T

Augmenting paths:
  S → A → T (capacity: min(5,3) = 3)
  S → B → T (capacity: min(5,7) = 5)
\`\`\`

### Min-Cut Max-Flow Theorem

> The maximum flow equals the minimum cut capacity.

A **cut** separates source from sink. The minimum cut is the bottleneck.

\`\`\`
      10        8
  S ----→ A ----→ T
  |              ↑
  5              |
  ↓              7
  B -------------┘

Cut 1: {S} | {A,B,T} — capacity = 10 + 5 = 15
Cut 2: {S,A} | {B,T} — capacity = 8 + 5 = 13
Cut 3: {S,B} | {A,T} — capacity = 10 + 7 = 17

Minimum cut = 13, so maximum flow = 13
\`\`\`

## Flow Network Representation

\`\`\`python
# Adjacency matrix representation
# capacity[u][v] = capacity from u to v

def create_flow_network():
    """Example flow network with 4 nodes."""
    # Nodes: 0=S, 1=A, 2=B, 3=T
    n = 4
    capacity = [[0] * n for _ in range(n)]
    
    # Add edges with capacities
    capacity[0][1] = 10  # S → A
    capacity[0][2] = 5   # S → B
    capacity[1][3] = 8   # A → T
    capacity[2][3] = 7   # B → T
    capacity[1][2] = 3   # A → B
    
    return capacity

capacity = create_flow_network()
\`\`\`

## Simple Flow Calculation

\`\`\`python
def calculate_flow_value(capacity, flow, source):
    """Calculate total flow leaving source."""
    total = 0
    for v in range(len(capacity)):
        if flow[source][v] > 0:
            total += flow[source][v]
    return total

# Or equivalently, flow entering sink
def calculate_flow_at_sink(capacity, flow, sink):
    """Calculate total flow entering sink."""
    total = 0
    for u in range(len(capacity)):
        if flow[u][sink] > 0:
            total += flow[u][sink]
    return total
\`\`\`

## Algorithm Overview

| Algorithm | Path Finding | Time Complexity | Notes |
|-----------|--------------|-----------------|-------|
| Ford-Fulkerson | DFS | O(E × max_flow) | Can be slow |
| Edmonds-Karp | BFS | O(V × E²) | Polynomial |
| Dinic's | BFS + DFS | O(V² × E) | Faster |
| Push-Relabel | Local ops | O(V² × E) | Different approach |

## Key Takeaways

- **Flow network** = directed graph with capacities, source, and sink
- **Goal**: maximize flow from source to sink
- **Constraints**: capacity limits, flow conservation
- **Residual graph** shows remaining capacity
- **Augmenting path** = path with available capacity
- **Min-cut = Max-flow** (fundamental theorem)
- **Real uses**: water pipes, traffic, networks, supply chains`,

    'dsa-ford-fulkerson': `# DSA Ford-Fulkerson Algorithm

## What is Ford-Fulkerson?

**Ford-Fulkerson** is a method to find maximum flow in a flow network by:
1. Finding augmenting paths (source to sink with available capacity)
2. Pushing flow along these paths
3. Updating the residual graph
4. Repeating until no more augmenting paths exist

\`\`\`
Find path → Push flow → Update residual → Repeat

Initial:              After augmenting:
     10                    5 (residual)
 S ----→ A              S ----→ A
         |                  ↑   |
         8                  5   3 (residual)
         ↓               (back) ↓
         T                      T

Pushed 5 units via S→A→T
\`\`\`

## The Residual Graph

The **residual graph** tracks:
- **Forward edges**: remaining capacity
- **Back edges**: flow that can be "undone"

\`\`\`
Original edge: A → B with capacity 10

After pushing 6 units:
  Forward: A → B with residual 10 - 6 = 4
  Back:    B → A with residual 6 (can undo)

    A ----4---→ B    (can push 4 more)
    A ←---6---- B    (can "undo" up to 6)
\`\`\`

### Why Back Edges?

Back edges allow the algorithm to correct suboptimal choices.

\`\`\`
Graph:
     10        10
 S ----→ A ----→ T
 |       ↑       ↑
 |      10       |
 10      |       10
 |       |       |
 ↓       |       |
 B ------┘-------┘

If we first push S→A→T (10 units):
  - S→B→A path is blocked (A→T saturated)
  
With back edge A→S:
  - S→B→A (push 10)
  - But A→T saturated... 
  
Actually: Back edge from A lets us "redirect" flow.
  - Push S→B→T (10 units)
  - Residual A←B allows flow redistribution
\`\`\`

## Algorithm Steps

1. **Initialize** flow to 0 on all edges
2. **While** augmenting path exists (source → sink):
   - Find path using DFS
   - Find minimum residual capacity along path (bottleneck)
   - Push that much flow along path
   - Update residual capacities
3. **Return** total flow

## Visual Walkthrough

\`\`\`
Graph (capacities):
       10        8
   S ----→ A ----→ T
   |       |       ↑
   5       3       |
   ↓       ↓       7
   B ------+-------┘

Step 1: Find path S→A→T
  Bottleneck: min(10, 8) = 8
  Push 8 units
  
  Residual:
       2         0
   S ----→ A ----→ T
   ↑       |       ↑
   8       3       |
   |       ↓       7
   5       |       |
   ↓       ↓       |
   B ------+-------┘

Step 2: Find path S→A→B→T
  Wait, A→B has capacity 3, B→T has capacity 7
  S→A: 2 remaining
  Bottleneck: min(2, 3, 7) = 2
  Push 2 units
  
  Residual:
       0         0
   S ----→ A ----→ T
   ↑       |       ↑
  10       1       |
   |       ↓       5
   5       |       |
   ↓       ↓       |
   B ------+-------┘

Step 3: Find path S→B→T
  S→B: 5 remaining, B→T: 5 remaining
  Bottleneck: min(5, 5) = 5
  Push 5 units
  
  Residual: No more paths from S to T!

Total flow: 8 + 2 + 5 = 15
\`\`\`

## Python Implementation

### Using DFS

\`\`\`python
def dfs(capacity, visited, u, t, flow):
    """
    DFS to find augmenting path and push flow.
    Returns the flow pushed (0 if no path).
    """
    if u == t:
        return flow
    
    visited[u] = True
    
    for v in range(len(capacity)):
        if not visited[v] and capacity[u][v] > 0:
            # Try to push flow through this edge
            curr_flow = min(flow, capacity[u][v])
            result = dfs(capacity, visited, v, t, curr_flow)
            
            if result > 0:
                # Update residual capacities
                capacity[u][v] -= result  # Reduce forward capacity
                capacity[v][u] += result  # Increase back capacity
                return result
    
    return 0

def ford_fulkerson(capacity, s, t):
    """
    Ford-Fulkerson algorithm for maximum flow.
    capacity: adjacency matrix of capacities
    s: source vertex
    t: sink vertex
    Returns: maximum flow value
    """
    # Make a copy to preserve original
    n = len(capacity)
    residual = [row[:] for row in capacity]
    
    max_flow = 0
    
    while True:
        visited = [False] * n
        flow = dfs(residual, visited, s, t, float('inf'))
        
        if flow == 0:
            break  # No more augmenting paths
        
        max_flow += flow
    
    return max_flow

# Example
capacity = [
    [0, 10, 5, 0],   # S: to A(10), to B(5)
    [0, 0, 3, 8],    # A: to B(3), to T(8)
    [0, 0, 0, 7],    # B: to T(7)
    [0, 0, 0, 0]     # T: sink
]

print(f"Maximum flow: {ford_fulkerson(capacity, 0, 3)}")  # 15
\`\`\`

### With Path Tracking

\`\`\`python
def ford_fulkerson_with_paths(capacity, s, t):
    """Ford-Fulkerson with path information."""
    n = len(capacity)
    residual = [row[:] for row in capacity]
    max_flow = 0
    paths = []
    
    def dfs_path(u, t, flow, path):
        if u == t:
            return flow, path
        
        visited[u] = True
        
        for v in range(n):
            if not visited[v] and residual[u][v] > 0:
                curr_flow = min(flow, residual[u][v])
                result_flow, result_path = dfs_path(v, t, curr_flow, path + [v])
                
                if result_flow > 0:
                    residual[u][v] -= result_flow
                    residual[v][u] += result_flow
                    return result_flow, result_path
        
        return 0, []
    
    iteration = 0
    while True:
        visited = [False] * n
        flow, path = dfs_path(s, t, float('inf'), [s])
        
        if flow == 0:
            break
        
        iteration += 1
        max_flow += flow
        paths.append((flow, path))
        print(f"Iteration {iteration}: Path {path}, Flow {flow}")
    
    return max_flow, paths

# Example
max_flow, paths = ford_fulkerson_with_paths(capacity, 0, 3)
print(f"\\nMaximum flow: {max_flow}")
\`\`\`

**Output:**
\`\`\`
Iteration 1: Path [0, 1, 3], Flow 8
Iteration 2: Path [0, 1, 2, 3], Flow 2
Iteration 3: Path [0, 2, 3], Flow 5
Maximum flow: 15
\`\`\`

## Time Complexity

| Aspect | Complexity |
|--------|------------|
| Per augmenting path | O(E) |
| Number of iterations | O(max_flow) |
| **Total** | **O(E × max_flow)** |

### Why Can It Be Slow?

If capacities are large integers, there could be many iterations.

\`\`\`
Worst case:
       1000000
   S --------→ A
   |           |
   1           1
   ↓           ↓
   B --------→ T
       1000000

Bad DFS choices:
  Path 1: S→A→B→T (flow 1)
  Path 2: S→B→A→T (flow 1)
  ...
  
Could take 2,000,000 iterations!

With BFS (Edmonds-Karp): O(VE²) guaranteed
\`\`\`

## When DFS Path Selection Matters

\`\`\`python
# The order of edge exploration affects performance
# Consistent exploration order is important

def dfs_ordered(capacity, visited, u, t, flow):
    """DFS with consistent ordering."""
    if u == t:
        return flow
    
    visited[u] = True
    
    # Process edges in order (0, 1, 2, ...)
    for v in range(len(capacity)):
        if not visited[v] and capacity[u][v] > 0:
            curr_flow = min(flow, capacity[u][v])
            result = dfs_ordered(capacity, visited, v, t, curr_flow)
            
            if result > 0:
                capacity[u][v] -= result
                capacity[v][u] += result
                return result
    
    return 0
\`\`\`

## Iterative DFS Version

\`\`\`python
def ford_fulkerson_iterative(capacity, s, t):
    """Ford-Fulkerson with iterative DFS."""
    n = len(capacity)
    residual = [row[:] for row in capacity]
    max_flow = 0
    
    while True:
        # Find augmenting path using iterative DFS
        parent = [-1] * n
        visited = [False] * n
        stack = [s]
        visited[s] = True
        
        while stack:
            u = stack.pop()
            
            if u == t:
                break
            
            for v in range(n):
                if not visited[v] and residual[u][v] > 0:
                    visited[v] = True
                    parent[v] = u
                    stack.append(v)
        
        # No path found
        if not visited[t]:
            break
        
        # Find bottleneck
        path_flow = float('inf')
        v = t
        while v != s:
            u = parent[v]
            path_flow = min(path_flow, residual[u][v])
            v = u
        
        # Update residual graph
        v = t
        while v != s:
            u = parent[v]
            residual[u][v] -= path_flow
            residual[v][u] += path_flow
            v = u
        
        max_flow += path_flow
    
    return max_flow
\`\`\`

## Common Mistakes

### 1. Forgetting Back Edges

\`\`\`python
# ❌ Wrong: Only updating forward edge
capacity[u][v] -= flow

# ✅ Correct: Update both forward and back edges
capacity[u][v] -= flow
capacity[v][u] += flow
\`\`\`

### 2. Not Using Residual Graph

\`\`\`python
# ❌ Wrong: Modifying original capacity
def ford_fulkerson(capacity, s, t):
    # capacity is modified directly!
    
# ✅ Correct: Create copy for residual graph
def ford_fulkerson(capacity, s, t):
    residual = [row[:] for row in capacity]
    # Use residual instead
\`\`\`

### 3. Infinite Loop on Disconnected Graph

\`\`\`python
# ❌ Wrong: No path check
while True:
    flow = dfs(...)  # Always runs
    max_flow += flow

# ✅ Correct: Check if path found
while True:
    flow = dfs(...)
    if flow == 0:
        break  # No path, exit
    max_flow += flow
\`\`\`

## Finding the Min-Cut

\`\`\`python
def find_min_cut(capacity, s, t):
    """Find minimum cut edges after max flow."""
    n = len(capacity)
    residual = [row[:] for row in capacity]
    
    # Run Ford-Fulkerson
    max_flow = ford_fulkerson(residual, s, t)
    
    # BFS from source in residual graph
    visited = [False] * n
    queue = [s]
    visited[s] = True
    
    while queue:
        u = queue.pop(0)
        for v in range(n):
            if not visited[v] and residual[u][v] > 0:
                visited[v] = True
                queue.append(v)
    
    # Min-cut edges: from visited to non-visited in original graph
    min_cut = []
    for u in range(n):
        for v in range(n):
            if visited[u] and not visited[v] and capacity[u][v] > 0:
                min_cut.append((u, v, capacity[u][v]))
    
    return max_flow, min_cut
\`\`\`

## Key Takeaways

- **Ford-Fulkerson** finds max flow by augmenting paths
- Uses **DFS** to find source-to-sink paths
- **Residual graph** tracks remaining capacity
- **Back edges** allow flow redistribution
- Time: **O(E × max_flow)** — can be slow
- Works with **integer capacities** (terminates)
- May not terminate with **irrational capacities**
- Use **Edmonds-Karp** (BFS) for guaranteed polynomial time`,

    'dsa-edmonds-karp': `# DSA Edmonds-Karp Algorithm

## What is Edmonds-Karp?

**Edmonds-Karp** is an implementation of Ford-Fulkerson that uses **BFS** instead of DFS to find augmenting paths.

This guarantees **polynomial time complexity** regardless of capacity values.

\`\`\`
Ford-Fulkerson: Uses DFS → O(E × max_flow)
Edmonds-Karp:   Uses BFS → O(V × E²)

BFS finds SHORTEST augmenting path (fewest edges)
\`\`\`

## Why BFS is Better

BFS finds the **shortest augmenting path** (by number of edges), which:
- Limits the number of iterations
- Guarantees at most O(V × E) augmentations
- Makes time complexity independent of capacity values

\`\`\`
Graph:
       1000000
   S --------→ A
   |           |
   1           1
   ↓           ↓
   B --------→ T
       1000000

DFS might find: S→A→B→T repeatedly (1 unit each)
  = 2,000,000 iterations!

BFS finds: S→A→T (1,000,000) then S→B→T (1,000,000)
  = 2 iterations!
\`\`\`

## Algorithm Steps

1. **Initialize** flow to 0
2. **While** BFS finds path from source to sink:
   - Use BFS to find **shortest** augmenting path
   - Find **bottleneck** (minimum capacity along path)
   - **Augment** flow along path
   - **Update** residual graph
3. **Return** total flow

## Visual Walkthrough

\`\`\`
Graph:
       10        8
   S ----→ A ----→ T
   |       |       ↑
   5       3       |
   ↓       ↓       7
   B ------+-------┘

BFS from S:
  Level 0: {S}
  Level 1: {A, B}
  Level 2: {T} (via A→T or B→T)

Shortest path: S→A→T (2 edges) or S→B→T (2 edges)
BFS finds S→A→T first (lexicographic order)

Step 1: Path S→A→T
  Bottleneck: min(10, 8) = 8
  Push 8 units

Step 2: BFS again
  Shortest: S→B→T (2 edges)
  Bottleneck: min(5, 7) = 5
  Push 5 units

Step 3: BFS again
  Shortest: S→A→B→T (3 edges)
  Bottleneck: min(2, 3, 2) = 2
  Push 2 units

Step 4: BFS finds no path
  Done! Max flow = 8 + 5 + 2 = 15
\`\`\`

## Python Implementation

### Complete Edmonds-Karp

\`\`\`python
from collections import deque

def bfs(capacity, parent, s, t):
    """
    BFS to find shortest augmenting path.
    Returns True if path exists, False otherwise.
    Fills parent[] to reconstruct path.
    """
    n = len(capacity)
    visited = [False] * n
    queue = deque([s])
    visited[s] = True
    
    while queue:
        u = queue.popleft()
        
        for v in range(n):
            if not visited[v] and capacity[u][v] > 0:
                queue.append(v)
                visited[v] = True
                parent[v] = u
                
                if v == t:
                    return True  # Found path to sink
    
    return False  # No path to sink

def edmonds_karp(capacity, s, t):
    """
    Edmonds-Karp algorithm for maximum flow.
    capacity: adjacency matrix of capacities
    s: source vertex
    t: sink vertex
    Returns: maximum flow value
    """
    n = len(capacity)
    # Create residual graph
    residual = [row[:] for row in capacity]
    
    parent = [-1] * n
    max_flow = 0
    
    # Find augmenting paths using BFS
    while bfs(residual, parent, s, t):
        # Find bottleneck (minimum residual capacity along path)
        path_flow = float('inf')
        v = t
        while v != s:
            u = parent[v]
            path_flow = min(path_flow, residual[u][v])
            v = u
        
        # Update residual capacities
        v = t
        while v != s:
            u = parent[v]
            residual[u][v] -= path_flow  # Reduce forward
            residual[v][u] += path_flow  # Increase back
            v = u
        
        max_flow += path_flow
        parent = [-1] * n  # Reset parent for next BFS
    
    return max_flow

# Example
capacity = [
    [0, 10, 5, 0],   # S: to A(10), to B(5)
    [0, 0, 3, 8],    # A: to B(3), to T(8)
    [0, 0, 0, 7],    # B: to T(7)
    [0, 0, 0, 0]     # T: sink
]

print(f"Maximum flow: {edmonds_karp(capacity, 0, 3)}")  # 15
\`\`\`

### With Detailed Output

\`\`\`python
from collections import deque

def edmonds_karp_verbose(capacity, s, t):
    """Edmonds-Karp with step-by-step output."""
    n = len(capacity)
    residual = [row[:] for row in capacity]
    parent = [-1] * n
    max_flow = 0
    iteration = 0
    
    while True:
        # BFS
        visited = [False] * n
        queue = deque([s])
        visited[s] = True
        parent = [-1] * n
        
        while queue:
            u = queue.popleft()
            for v in range(n):
                if not visited[v] and residual[u][v] > 0:
                    queue.append(v)
                    visited[v] = True
                    parent[v] = u
        
        if not visited[t]:
            break
        
        # Find path and bottleneck
        path = []
        path_flow = float('inf')
        v = t
        while v != s:
            u = parent[v]
            path.append(v)
            path_flow = min(path_flow, residual[u][v])
            v = u
        path.append(s)
        path.reverse()
        
        # Update residual
        v = t
        while v != s:
            u = parent[v]
            residual[u][v] -= path_flow
            residual[v][u] += path_flow
            v = u
        
        iteration += 1
        max_flow += path_flow
        print(f"Iteration {iteration}: Path {path}, Flow {path_flow}, Total {max_flow}")
    
    return max_flow

max_flow = edmonds_karp_verbose(capacity, 0, 3)
print(f"\\nMaximum flow: {max_flow}")
\`\`\`

**Output:**
\`\`\`
Iteration 1: Path [0, 1, 3], Flow 8, Total 8
Iteration 2: Path [0, 2, 3], Flow 5, Total 13
Iteration 3: Path [0, 1, 2, 3], Flow 2, Total 15
Maximum flow: 15
\`\`\`

### With Flow Matrix

\`\`\`python
from collections import deque

def edmonds_karp_with_flow(capacity, s, t):
    """Return max flow and the flow on each edge."""
    n = len(capacity)
    residual = [row[:] for row in capacity]
    flow = [[0] * n for _ in range(n)]
    
    def bfs():
        visited = [False] * n
        parent = [-1] * n
        queue = deque([s])
        visited[s] = True
        
        while queue:
            u = queue.popleft()
            for v in range(n):
                if not visited[v] and residual[u][v] > 0:
                    visited[v] = True
                    parent[v] = u
                    queue.append(v)
        
        return parent if visited[t] else None
    
    max_flow = 0
    
    while True:
        parent = bfs()
        if parent is None:
            break
        
        # Find bottleneck
        path_flow = float('inf')
        v = t
        while v != s:
            u = parent[v]
            path_flow = min(path_flow, residual[u][v])
            v = u
        
        # Update residual and flow
        v = t
        while v != s:
            u = parent[v]
            residual[u][v] -= path_flow
            residual[v][u] += path_flow
            flow[u][v] += path_flow
            flow[v][u] -= path_flow  # Negative for back edge
            v = u
        
        max_flow += path_flow
    
    return max_flow, flow

max_flow, flow = edmonds_karp_with_flow(capacity, 0, 3)
print(f"Max flow: {max_flow}")
print("Flow matrix:")
for row in flow:
    print(row)
\`\`\`

## Time Complexity

| Aspect | Complexity |
|--------|------------|
| Each BFS | O(E) |
| Number of augmentations | O(V × E) |
| **Total** | **O(V × E²)** |

### Why O(V × E) Augmentations?

Key insight: After each augmentation, at least one edge becomes **saturated** (residual = 0).

The distance from source to any vertex can only **increase** (BFS property).

This limits total augmentations to O(V × E).

## Edmonds-Karp vs Ford-Fulkerson

| Aspect | Ford-Fulkerson | Edmonds-Karp |
|--------|----------------|--------------|
| Path finding | DFS | BFS |
| Time | O(E × max_flow) | O(V × E²) |
| Predictability | Depends on capacities | Always polynomial |
| Shortest path? | No | Yes (by edges) |
| Implementation | Slightly simpler | Slightly more complex |

\`\`\`
When to use which:

Small capacities + dense graph:
  → Ford-Fulkerson might be faster

Large/unknown capacities:
  → Edmonds-Karp guaranteed polynomial

Interview:
  → Know both, prefer Edmonds-Karp for reliability
\`\`\`

## Finding Min-Cut with Edmonds-Karp

\`\`\`python
from collections import deque

def find_min_cut(capacity, s, t):
    """Find min-cut after running Edmonds-Karp."""
    n = len(capacity)
    residual = [row[:] for row in capacity]
    
    # Run Edmonds-Karp
    max_flow = 0
    while True:
        parent = [-1] * n
        visited = [False] * n
        queue = deque([s])
        visited[s] = True
        
        while queue:
            u = queue.popleft()
            for v in range(n):
                if not visited[v] and residual[u][v] > 0:
                    visited[v] = True
                    parent[v] = u
                    queue.append(v)
        
        if not visited[t]:
            break
        
        path_flow = float('inf')
        v = t
        while v != s:
            u = parent[v]
            path_flow = min(path_flow, residual[u][v])
            v = u
        
        v = t
        while v != s:
            u = parent[v]
            residual[u][v] -= path_flow
            residual[v][u] += path_flow
            v = u
        
        max_flow += path_flow
    
    # Find vertices reachable from source in residual graph
    reachable = [False] * n
    queue = deque([s])
    reachable[s] = True
    
    while queue:
        u = queue.popleft()
        for v in range(n):
            if not reachable[v] and residual[u][v] > 0:
                reachable[v] = True
                queue.append(v)
    
    # Min-cut: edges from reachable to non-reachable
    min_cut_edges = []
    for u in range(n):
        for v in range(n):
            if reachable[u] and not reachable[v] and capacity[u][v] > 0:
                min_cut_edges.append((u, v, capacity[u][v]))
    
    return max_flow, min_cut_edges

# Example
max_flow, cut = find_min_cut(capacity, 0, 3)
print(f"Max flow: {max_flow}")
print(f"Min cut edges: {cut}")
\`\`\`

## Common Applications

### Bipartite Matching

\`\`\`python
def max_bipartite_matching(left, right, edges):
    """
    Find maximum matching in bipartite graph.
    left: number of left vertices
    right: number of right vertices
    edges: list of (left_idx, right_idx) pairs
    """
    # Create flow network
    # 0 = source, 1..left = left vertices
    # left+1..left+right = right vertices
    # left+right+1 = sink
    
    n = 1 + left + right + 1
    s = 0
    t = n - 1
    
    capacity = [[0] * n for _ in range(n)]
    
    # Source to left vertices (capacity 1)
    for i in range(left):
        capacity[s][1 + i] = 1
    
    # Left to right (capacity 1)
    for l, r in edges:
        capacity[1 + l][1 + left + r] = 1
    
    # Right vertices to sink (capacity 1)
    for i in range(right):
        capacity[1 + left + i][t] = 1
    
    return edmonds_karp(capacity, s, t)

# Example: 3 left, 3 right
edges = [(0, 0), (0, 1), (1, 1), (1, 2), (2, 2)]
print(f"Maximum matching: {max_bipartite_matching(3, 3, edges)}")
\`\`\`

## Interview Tips

### Common Interview Problems

1. **Maximum Bipartite Matching** — Classic application
2. **Minimum Cut** — Use max-flow min-cut theorem
3. **Edge-disjoint Paths** — Each edge capacity 1
4. **Vertex-disjoint Paths** — Split vertices

### Key Points

- Edmonds-Karp = Ford-Fulkerson + **BFS**
- BFS finds **shortest augmenting path**
- Time: **O(V × E²)** — polynomial, predictable
- Better than Ford-Fulkerson for **large capacities**
- Same result, different efficiency
- **Min-cut** found by BFS on final residual graph

## Key Takeaways

- **Edmonds-Karp** uses BFS for augmenting paths
- **O(V × E²)** guaranteed polynomial time
- BFS finds **shortest path** (by edge count)
- More **predictable** than DFS-based Ford-Fulkerson
- **Back edges** still needed for flow redistribution
- **Min-cut** = edges from reachable to unreachable after max flow
- **Preferred** in interviews for reliability`,

    'introduction': `# Time Complexity Introduction

## What is Time Complexity?

**Time complexity** describes how the runtime of an algorithm grows as the input size increases.

It doesn't measure actual time in seconds — it measures the **growth rate** of operations.

\`\`\`
Input size:    10    100    1000   10000
Operations:    ?     ?      ?      ?

Time complexity tells us how these scale!
\`\`\`

## Why Big-O Notation?

We use **Big-O notation** to express time complexity because:
- It's **hardware independent** (works on any computer)
- It focuses on **large inputs** (where efficiency matters)
- It gives a **common language** for comparing algorithms

\`\`\`
Algorithm A: 2n + 5 operations
Algorithm B: 3n + 2 operations

Both are O(n) — they grow linearly!
The constants don't matter for large n.
\`\`\`

## The Rules of Big-O

### Rule 1: Drop Constants

\`\`\`
2n → O(n)
100n → O(n)
0.5n → O(n)

Constants don't affect growth rate!
\`\`\`

### Rule 2: Drop Lower Order Terms

\`\`\`
n² + n → O(n²)
n³ + n² + n → O(n³)
n + log n → O(n)

The largest term dominates for large n!
\`\`\`

### Rule 3: Different Inputs = Different Variables

\`\`\`python
def process(arr1, arr2):
    for x in arr1:    # O(n)
        print(x)
    for y in arr2:    # O(m)
        print(y)
# Total: O(n + m), NOT O(n)
\`\`\`

## Common Time Complexities

| Notation | Name | Example |
|----------|------|---------|
| O(1) | Constant | Array access by index |
| O(log n) | Logarithmic | Binary search |
| O(n) | Linear | Single loop |
| O(n log n) | Linearithmic | Merge sort, Quick sort |
| O(n²) | Quadratic | Nested loops |
| O(n³) | Cubic | Triple nested loops |
| O(2ⁿ) | Exponential | Recursive fibonacci |
| O(n!) | Factorial | All permutations |

## Visual Comparison

\`\`\`
Operations
    ↑
    |                           * O(n²)
    |                      *
    |                 *
    |            *              * O(n log n)
    |       *              *
    |  *              *         * O(n)
    | *          *         *
    |*      *         *         * O(log n)
    |*  *        *         *    * O(1)
    +--------------------------------→ Input Size (n)
    
O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ)
\`\`\`

## Examples in Code

### O(1) — Constant Time

\`\`\`python
def get_first(arr):
    return arr[0]  # Always 1 operation

# O(1) examples:
# - Array index access
# - Hash table lookup
# - Push/pop on stack
\`\`\`

### O(log n) — Logarithmic Time

\`\`\`python
def count_divisions(n):
    count = 0
    while n > 1:
        n //= 2
        count += 1
    return count

# n = 16: 16 → 8 → 4 → 2 → 1 (4 steps)
# n = 32: 32 → 16 → 8 → 4 → 2 → 1 (5 steps)
# Doubling n adds only 1 step!
\`\`\`

### O(n) — Linear Time

\`\`\`python
def find_max(arr):
    max_val = arr[0]
    for x in arr:       # n iterations
        if x > max_val:
            max_val = x
    return max_val

# O(n) examples:
# - Single loop through array
# - Linear search
# - Counting elements
\`\`\`

### O(n log n) — Linearithmic Time

\`\`\`python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])    # log n levels
    right = merge_sort(arr[mid:])   # of recursion
    
    return merge(left, right)        # O(n) merge at each level

# log n levels × O(n) work per level = O(n log n)
\`\`\`

### O(n²) — Quadratic Time

\`\`\`python
def print_pairs(arr):
    for i in range(len(arr)):        # n iterations
        for j in range(len(arr)):    # × n iterations
            print(arr[i], arr[j])

# Total: n × n = n² operations

# O(n²) examples:
# - Nested loops
# - Bubble sort
# - Comparing all pairs
\`\`\`

### O(2ⁿ) — Exponential Time

\`\`\`python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Each call makes 2 more calls
# Tree doubles at each level
# Very slow for large n!
\`\`\`

## Analyzing Time Complexity

### Step-by-Step Method

1. **Count** basic operations
2. **Express** as function of input size
3. **Simplify** using Big-O rules

\`\`\`python
def example(arr):
    n = len(arr)
    total = 0                    # O(1)
    
    for i in range(n):           # O(n)
        total += arr[i]          #   O(1) × n = O(n)
    
    for i in range(n):           # O(n)
        for j in range(n):       #   O(n)
            print(i, j)          #     O(1) × n × n = O(n²)
    
    return total                 # O(1)

# Total: O(1) + O(n) + O(n²) + O(1)
# Simplified: O(n²)
\`\`\`

## Best, Average, Worst Case

| Case | Meaning | Example |
|------|---------|---------|
| Best | Minimum operations | Element at index 0 |
| Average | Expected operations | Element in middle |
| Worst | Maximum operations | Element at end or missing |

\`\`\`python
def linear_search(arr, target):
    for i, x in enumerate(arr):
        if x == target:
            return i
    return -1

# Best case: O(1) — target is first element
# Average case: O(n) — target is in middle
# Worst case: O(n) — target at end or not found
\`\`\`

## Space Complexity

Don't forget **space complexity** — memory used by algorithm!

\`\`\`python
# O(1) space — constant extra memory
def sum_array(arr):
    total = 0
    for x in arr:
        total += x
    return total

# O(n) space — creates new array
def double_array(arr):
    return [x * 2 for x in arr]
\`\`\`

## Quick Reference Table

| Complexity | n=10 | n=100 | n=1000 | n=10000 |
|------------|------|-------|--------|---------|
| O(1) | 1 | 1 | 1 | 1 |
| O(log n) | 3 | 7 | 10 | 13 |
| O(n) | 10 | 100 | 1,000 | 10,000 |
| O(n log n) | 33 | 664 | 9,966 | 132,877 |
| O(n²) | 100 | 10,000 | 1,000,000 | 100,000,000 |
| O(2ⁿ) | 1,024 | 10³⁰ | ∞ | ∞ |

## Key Takeaways

- **Time complexity** = growth rate, not actual time
- **Big-O** focuses on large inputs
- **Drop constants** and lower order terms
- **Common complexities**: O(1) < O(log n) < O(n) < O(n log n) < O(n²)
- Always consider **best, average, worst** cases
- Don't forget **space complexity**!`,

    'bubble-sort': `# Time Complexity: Bubble Sort

## How Bubble Sort Works

**Bubble Sort** repeatedly compares adjacent elements and swaps them if they're in the wrong order. The largest elements "bubble up" to the end.

\`\`\`
Pass 1: [5, 3, 8, 1] → compare 5,3 → swap
        [3, 5, 8, 1] → compare 5,8 → ok
        [3, 5, 8, 1] → compare 8,1 → swap
        [3, 5, 1, 8] ← 8 is in place!

Pass 2: [3, 5, 1, 8] → compare 3,5 → ok
        [3, 5, 1, 8] → compare 5,1 → swap
        [3, 1, 5, 8] ← 5 is in place!

Pass 3: [3, 1, 5, 8] → compare 3,1 → swap
        [1, 3, 5, 8] ← Sorted!
\`\`\`

## Python Implementation

\`\`\`python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):                    # Outer loop: n passes
        for j in range(0, n - i - 1):     # Inner loop: shrinking
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

# Example
arr = [64, 34, 25, 12, 22, 11, 90]
print(bubble_sort(arr))
# [11, 12, 22, 25, 34, 64, 90]
\`\`\`

## Time Complexity Analysis

### Counting Operations

\`\`\`
n = array length

Outer loop: i = 0, 1, 2, ..., n-1  (n iterations)

Inner loop (comparisons):
  i=0: n-1 comparisons
  i=1: n-2 comparisons
  i=2: n-3 comparisons
  ...
  i=n-1: 0 comparisons

Total = (n-1) + (n-2) + ... + 1 + 0
      = n(n-1)/2
      = (n² - n)/2
\`\`\`

### Big-O Simplification

\`\`\`
(n² - n)/2 = n²/2 - n/2

Drop constants: n² - n
Drop lower terms: n²

Time Complexity: O(n²)
\`\`\`

## Complexity Summary

| Case | Time | When |
|------|------|------|
| **Best** | O(n) | Already sorted (with optimization) |
| **Average** | O(n²) | Random order |
| **Worst** | O(n²) | Reverse sorted |

**Space Complexity:** O(1) — in-place sorting

## Why Worst Case is O(n²)

When array is **reverse sorted**, every comparison results in a swap:

\`\`\`
[5, 4, 3, 2, 1] — reverse sorted

Pass 1: 4 swaps → [4, 3, 2, 1, 5]
Pass 2: 3 swaps → [3, 2, 1, 4, 5]
Pass 3: 2 swaps → [2, 1, 3, 4, 5]
Pass 4: 1 swap  → [1, 2, 3, 4, 5]

Total: 4 + 3 + 2 + 1 = 10 swaps = n(n-1)/2
\`\`\`

## Optimized Version (Best Case O(n))

\`\`\`python
def bubble_sort_optimized(arr):
    n = len(arr)
    for i in range(n):
        swapped = False                    # Track if any swap happened
        
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        
        if not swapped:                    # No swaps = already sorted
            break
    
    return arr

# Already sorted: [1, 2, 3, 4, 5]
# Pass 1: 0 swaps, swapped = False
# Break! Only 1 pass = O(n)
\`\`\`

## Visual Complexity

\`\`\`
Array size (n)    Comparisons (n²)
     5                  10
    10                  45
    20                 190
   100               4,950
 1,000             499,500
10,000          49,995,000

Grows very fast! Not good for large arrays.
\`\`\`

## When to Use Bubble Sort

| ✅ Good for | ❌ Bad for |
|-------------|------------|
| Small arrays | Large datasets |
| Nearly sorted data | Random data |
| Teaching concepts | Production code |
| Checking if sorted | Performance critical |

## Key Takeaways

- **Nested loops** = O(n²) comparisons
- **Best case O(n)** only with early termination optimization
- **Very slow** for large datasets
- **Simple** but **inefficient**
- Uses **O(1) extra space** (in-place)`,

    'selection-sort': `# Time Complexity: Selection Sort

## How Selection Sort Works

**Selection Sort** finds the minimum element and puts it at the beginning, then finds the next minimum, and so on.

\`\`\`
[64, 25, 12, 22, 11]

Pass 1: Find min (11), swap with first
        [11, 25, 12, 22, 64]
            ↑ sorted

Pass 2: Find min in [25, 12, 22, 64], swap with second
        [11, 12, 25, 22, 64]
            ↑↑ sorted

Pass 3: Find min in [25, 22, 64], swap with third
        [11, 12, 22, 25, 64]
            ↑↑↑ sorted

Pass 4: Find min in [25, 64], swap with fourth
        [11, 12, 22, 25, 64]
            ↑↑↑↑ sorted

Done! [11, 12, 22, 25, 64]
\`\`\`

## Python Implementation

\`\`\`python
def selection_sort(arr):
    n = len(arr)
    
    for i in range(n):
        # Find minimum in unsorted portion
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        
        # Swap minimum with first unsorted element
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    
    return arr

# Example
arr = [64, 25, 12, 22, 11]
print(selection_sort(arr))  # [11, 12, 22, 25, 64]
\`\`\`

## Time Complexity Analysis

### Counting Comparisons

\`\`\`
Outer loop: i = 0 to n-1

Inner loop comparisons:
  i=0: compare n-1 elements (find min in whole array)
  i=1: compare n-2 elements
  i=2: compare n-3 elements
  ...
  i=n-2: compare 1 element
  i=n-1: compare 0 elements

Total = (n-1) + (n-2) + ... + 1 + 0
      = n(n-1)/2
      ≈ n²/2
\`\`\`

### Always O(n²)

Unlike Bubble Sort, Selection Sort **always** scans the entire unsorted portion:

\`\`\`python
# Even if array is sorted, we still scan everything!
[1, 2, 3, 4, 5]

Pass 1: Scan all 5 elements to find min (1)
Pass 2: Scan remaining 4 elements to find min (2)
Pass 3: Scan remaining 3 elements to find min (3)
...

No early termination possible!
\`\`\`

## Complexity Summary

| Case | Time | Reason |
|------|------|--------|
| **Best** | O(n²) | Still scans all |
| **Average** | O(n²) | Same scanning |
| **Worst** | O(n²) | Same scanning |

**Space Complexity:** O(1) — in-place

## Selection Sort vs Bubble Sort

| Aspect | Selection Sort | Bubble Sort |
|--------|---------------|-------------|
| Comparisons | O(n²) always | O(n²) worst |
| Swaps | O(n) — at most n | O(n²) — many |
| Best case | O(n²) | O(n) with optimization |
| Stable? | No | Yes |

### Key Difference: Fewer Swaps

\`\`\`
Selection Sort: Maximum n-1 swaps (one per pass)
Bubble Sort: Up to n(n-1)/2 swaps

For expensive swap operations, Selection Sort is better!
\`\`\`

## Why Always O(n²)?

\`\`\`python
def selection_sort(arr):
    n = len(arr)
    
    for i in range(n):           # Always n iterations
        min_idx = i
        for j in range(i + 1, n): # Always scans remaining
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]

# No condition to stop early
# Must find actual minimum each time
# Can't assume anything about remaining elements
\`\`\`

## Visual Complexity

\`\`\`
n        Comparisons    Swaps
5             10          5
10            45         10
100        4,950        100
1000     499,500      1,000

Comparisons grow as n², but swaps only as n!
\`\`\`

## When to Use Selection Sort

| ✅ Good for | ❌ Bad for |
|-------------|------------|
| Small arrays | Large datasets |
| Memory writes are expensive | Speed critical |
| Teaching concepts | Production code |
| Minimizing swaps | Any serious use |

## Key Takeaways

- **Always O(n²)** — no best case optimization
- **O(n) swaps** — fewer than Bubble Sort
- **Not stable** — equal elements may be reordered
- **Simple but slow** for large data
- **In-place** — O(1) extra space`,

    'insertion-sort': `# Time Complexity: Insertion Sort

## How Insertion Sort Works

**Insertion Sort** builds the sorted array one element at a time by inserting each element into its correct position.

\`\`\`
[5, 2, 4, 6, 1, 3]

Start: [5] is "sorted"

Insert 2: [2, 5]       (2 < 5, shift 5 right, insert 2)
Insert 4: [2, 4, 5]    (4 < 5, shift 5 right, insert 4)
Insert 6: [2, 4, 5, 6] (6 > 5, insert at end)
Insert 1: [1, 2, 4, 5, 6] (shift all, insert 1 at start)
Insert 3: [1, 2, 3, 4, 5, 6] (shift 4,5,6 right, insert 3)

Done!
\`\`\`

## Python Implementation

\`\`\`python
def insertion_sort(arr):
    n = len(arr)
    
    for i in range(1, n):
        key = arr[i]
        j = i - 1
        
        # Shift elements greater than key to the right
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        
        # Insert key at correct position
        arr[j + 1] = key
    
    return arr

# Example
arr = [5, 2, 4, 6, 1, 3]
print(insertion_sort(arr))  # [1, 2, 3, 4, 5, 6]
\`\`\`

## Time Complexity Analysis

### Best Case: Already Sorted

\`\`\`python
arr = [1, 2, 3, 4, 5]

i=1: key=2, compare with 1 → 2>1, no shift
i=2: key=3, compare with 2 → 3>2, no shift
i=3: key=4, compare with 3 → 4>3, no shift
i=4: key=5, compare with 4 → 5>4, no shift

Each iteration: 1 comparison, 0 shifts
Total: n-1 comparisons = O(n)
\`\`\`

### Worst Case: Reverse Sorted

\`\`\`python
arr = [5, 4, 3, 2, 1]

i=1: key=4, shift 5 → 1 comparison, 1 shift
i=2: key=3, shift 4,5 → 2 comparisons, 2 shifts
i=3: key=2, shift 3,4,5 → 3 comparisons, 3 shifts
i=4: key=1, shift 2,3,4,5 → 4 comparisons, 4 shifts

Total: 1+2+3+4 = 10 = n(n-1)/2 = O(n²)
\`\`\`

### Average Case

On average, each element is shifted halfway through the sorted portion:

\`\`\`
Average shifts per element ≈ i/2

Total ≈ (1 + 2 + 3 + ... + n-1) / 2
      = n(n-1)/4
      = O(n²)
\`\`\`

## Complexity Summary

| Case | Time | When |
|------|------|------|
| **Best** | O(n) | Already sorted |
| **Average** | O(n²) | Random order |
| **Worst** | O(n²) | Reverse sorted |

**Space Complexity:** O(1) — in-place

## Why Best Case is O(n)

\`\`\`python
def insertion_sort(arr):
    for i in range(1, n):
        key = arr[i]
        j = i - 1
        
        while j >= 0 and arr[j] > key:  # ← This while loop
            arr[j + 1] = arr[j]
            j -= 1
        
        arr[j + 1] = key

# If sorted: arr[j] > key is always FALSE
# While loop runs 0 times!
# Only outer loop runs: O(n)
\`\`\`

## Nearly Sorted Data

Insertion Sort excels when data is **almost sorted**:

\`\`\`
Nearly sorted: [1, 2, 4, 3, 5, 6, 8, 7]

Only 2 elements out of place!
Most insertions need 0-1 shifts.
Very close to O(n) performance.
\`\`\`

\`\`\`python
# k inversions = k elements out of place
# Time: O(n + k)

# If k is small (nearly sorted): O(n)
# If k is large (random): O(n²)
\`\`\`

## Comparison with Other O(n²) Sorts

| Algorithm | Best | Average | Worst | Nearly Sorted |
|-----------|------|---------|-------|---------------|
| Bubble | O(n) | O(n²) | O(n²) | O(n) |
| Selection | O(n²) | O(n²) | O(n²) | O(n²) |
| Insertion | O(n) | O(n²) | O(n²) | O(n) |

### Insertion Sort Advantages

1. **Best for nearly sorted** — O(n) when almost sorted
2. **Stable** — maintains relative order of equal elements
3. **Online** — can sort as elements arrive
4. **Adaptive** — fewer operations when less disorder

## Visualization

\`\`\`
Sorted portion grows left to right:

[|5] 2 4 6 1 3    | = boundary
[2 5|] 4 6 1 3
[2 4 5|] 6 1 3
[2 4 5 6|] 1 3
[1 2 4 5 6|] 3
[1 2 3 4 5 6|]    Done!

Left of | is always sorted
\`\`\`

## When to Use Insertion Sort

| ✅ Good for | ❌ Bad for |
|-------------|------------|
| Small arrays (n < 50) | Large datasets |
| Nearly sorted data | Random data |
| Online sorting | Batch processing |
| Stable sorting needed | Speed critical |

## Key Takeaways

- **Best case O(n)** for sorted/nearly sorted data
- **Worst case O(n²)** for reverse sorted
- **Adaptive** — performance depends on disorder
- **Stable** — preserves order of equal elements
- **Online** — can sort incrementally
- **Preferred** for small datasets in practice`,

    'quick-sort': `# Time Complexity: Quick Sort

## How Quick Sort Works

**Quick Sort** uses divide and conquer with a **pivot** element:
1. Choose a pivot
2. Partition: elements < pivot go left, > pivot go right
3. Recursively sort left and right partitions

\`\`\`
[3, 6, 2, 7, 1, 4]  pivot = 4

Partition: [3, 2, 1] [4] [6, 7]
            < 4       =   > 4

Recurse left:  [3, 2, 1] → [1, 2, 3]
Recurse right: [6, 7] → [6, 7]

Result: [1, 2, 3, 4, 6, 7]
\`\`\`

## Python Implementation

\`\`\`python
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quick_sort(left) + middle + quick_sort(right)

# Example
arr = [3, 6, 2, 7, 1, 4]
print(quick_sort(arr))  # [1, 2, 3, 4, 6, 7]
\`\`\`

## Time Complexity Analysis

### Best/Average Case: O(n log n)

When pivot divides array roughly in **half**:

\`\`\`
Level 0:     [........n........]     → n operations
            /                   \\
Level 1:   [..n/2..]     [..n/2..]   → n operations
           /    \\         /    \\
Level 2: [n/4] [n/4]   [n/4] [n/4]   → n operations
          ...                          ...

log n levels × n operations = O(n log n)
\`\`\`

### Worst Case: O(n²)

When pivot is always the **smallest or largest** element:

\`\`\`
[1, 2, 3, 4, 5]  pivot = 1 (always smallest)

Level 0: [] [1] [2, 3, 4, 5]    → n operations
Level 1: [] [2] [3, 4, 5]       → n-1 operations
Level 2: [] [3] [4, 5]          → n-2 operations
Level 3: [] [4] [5]             → n-3 operations
Level 4: [] [5] []              → 1 operation

n levels × ~n operations = O(n²)
\`\`\`

## Complexity Summary

| Case | Time | When |
|------|------|------|
| **Best** | O(n log n) | Pivot splits evenly |
| **Average** | O(n log n) | Random data |
| **Worst** | O(n²) | Already sorted + bad pivot |

**Space Complexity:** 
- O(log n) average (recursion stack)
- O(n) worst case

## Why Pivot Choice Matters

\`\`\`
Array: [1, 2, 3, 4, 5, 6, 7]

Bad pivot (first element = 1):
  → [empty] [1] [2,3,4,5,6,7]
  → Unbalanced! Leads to O(n²)

Good pivot (middle or random):
  → [1,2,3] [4] [5,6,7]
  → Balanced! Leads to O(n log n)
\`\`\`

### Pivot Selection Strategies

| Strategy | Worst Case Trigger | Average |
|----------|-------------------|---------|
| First element | Sorted array | O(n log n) |
| Last element | Sorted array | O(n log n) |
| Middle element | Rare | O(n log n) |
| Random | Very rare | O(n log n) |
| Median of three | Very rare | O(n log n) |

## In-Place Quick Sort

\`\`\`python
def quick_sort_inplace(arr, low, high):
    if low < high:
        # Partition and get pivot position
        pivot_idx = partition(arr, low, high)
        
        # Recursively sort partitions
        quick_sort_inplace(arr, low, pivot_idx - 1)
        quick_sort_inplace(arr, pivot_idx + 1, high)

def partition(arr, low, high):
    pivot = arr[high]  # Use last element as pivot
    i = low - 1
    
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

# Usage
arr = [3, 6, 2, 7, 1, 4]
quick_sort_inplace(arr, 0, len(arr) - 1)
print(arr)  # [1, 2, 3, 4, 6, 7]
\`\`\`

## Recursion Depth

\`\`\`
Best case:    O(log n) depth
              Balanced splits → shallow tree

Worst case:   O(n) depth
              Unbalanced splits → linear chain
              Can cause stack overflow!
\`\`\`

## Quick Sort vs Merge Sort

| Aspect | Quick Sort | Merge Sort |
|--------|------------|------------|
| Average | O(n log n) | O(n log n) |
| Worst | O(n²) | O(n log n) |
| Space | O(log n) | O(n) |
| In-place? | Yes | No |
| Stable? | No | Yes |
| Cache? | Better | Worse |

### Why Quick Sort is Often Faster

Despite same O(n log n) average:
- **Better cache performance** — accesses contiguous memory
- **In-place** — no extra array allocation
- **Smaller constants** — fewer actual operations

## Avoiding Worst Case

\`\`\`python
import random

def quick_sort_randomized(arr, low, high):
    if low < high:
        # Randomize pivot to avoid worst case
        random_idx = random.randint(low, high)
        arr[random_idx], arr[high] = arr[high], arr[random_idx]
        
        pivot_idx = partition(arr, low, high)
        quick_sort_randomized(arr, low, pivot_idx - 1)
        quick_sort_randomized(arr, pivot_idx + 1, high)
\`\`\`

## Key Takeaways

- **Average O(n log n)** — very fast in practice
- **Worst O(n²)** — when pivot choice is bad
- **Pivot matters** — random or median-of-three helps
- **In-place** — O(log n) space for recursion
- **Not stable** — equal elements may be reordered
- **Preferred** in practice for its speed and cache efficiency`,

    'counting-sort': `# Time Complexity: Counting Sort

## How Counting Sort Works

**Counting Sort** counts occurrences of each value, then reconstructs the sorted array. It's a **non-comparison** sort.

\`\`\`
Array: [4, 2, 2, 8, 3, 3, 1]
Range: 1 to 8

Step 1: Count occurrences
  Value:  1  2  3  4  5  6  7  8
  Count: [1, 2, 2, 1, 0, 0, 0, 1]

Step 2: Reconstruct array
  1 appears 1 time  → [1]
  2 appears 2 times → [1, 2, 2]
  3 appears 2 times → [1, 2, 2, 3, 3]
  4 appears 1 time  → [1, 2, 2, 3, 3, 4]
  8 appears 1 time  → [1, 2, 2, 3, 3, 4, 8]

Result: [1, 2, 2, 3, 3, 4, 8]
\`\`\`

## Python Implementation

\`\`\`python
def counting_sort(arr):
    if not arr:
        return arr
    
    # Find range
    min_val = min(arr)
    max_val = max(arr)
    range_size = max_val - min_val + 1
    
    # Count occurrences
    count = [0] * range_size
    for x in arr:
        count[x - min_val] += 1
    
    # Reconstruct sorted array
    result = []
    for i in range(range_size):
        result.extend([i + min_val] * count[i])
    
    return result

# Example
arr = [4, 2, 2, 8, 3, 3, 1]
print(counting_sort(arr))  # [1, 2, 2, 3, 3, 4, 8]
\`\`\`

## Time Complexity Analysis

### Breaking Down the Steps

\`\`\`python
def counting_sort(arr):
    # O(n) — find min and max
    min_val = min(arr)
    max_val = max(arr)
    
    k = max_val - min_val + 1
    
    # O(k) — initialize count array
    count = [0] * k
    
    # O(n) — count each element
    for x in arr:
        count[x - min_val] += 1
    
    # O(n + k) — reconstruct array
    result = []
    for i in range(k):           # O(k)
        result.extend([...])     # O(n) total elements
    
    return result

# Total: O(n) + O(k) + O(n) + O(n + k) = O(n + k)
\`\`\`

### Where n and k Come From

\`\`\`
n = number of elements in array
k = range of values (max - min + 1)

Example: [1, 5, 3, 2, 4, 100]
  n = 6
  k = 100 - 1 + 1 = 100

Time: O(n + k) = O(6 + 100) = O(106)
\`\`\`

## Complexity Summary

| Case | Time | Condition |
|------|------|-----------|
| **All cases** | O(n + k) | k = range of values |

**Space Complexity:** O(n + k)
- O(k) for count array
- O(n) for output array

## When is Counting Sort Efficient?

### Good: k ≈ n (small range)

\`\`\`
Array: [3, 1, 4, 1, 5, 9, 2, 6]
n = 8, k = 9

Time: O(8 + 9) = O(17) ≈ O(n)
Very fast!
\`\`\`

### Bad: k >> n (huge range)

\`\`\`
Array: [1, 1000000]
n = 2, k = 1000000

Time: O(2 + 1000000) = O(1000002)
Terrible! Just use comparison sort.
\`\`\`

## Counting Sort vs Comparison Sorts

| Aspect | Counting Sort | Quick/Merge Sort |
|--------|--------------|------------------|
| Time | O(n + k) | O(n log n) |
| Best for | Small k | Any data |
| Works on | Integers in range | Any comparable |
| Stable? | Yes | Depends |
| Extra space | O(k) | O(log n) to O(n) |

### When Counting Sort Wins

\`\`\`
For counting sort to beat O(n log n):
  n + k < n log n
  k < n log n - n
  k < n(log n - 1)

Example: n = 1000
  k < 1000 × (10 - 1) = 9000

If range ≤ 9000, counting sort wins!
\`\`\`

## Stable Counting Sort

\`\`\`python
def counting_sort_stable(arr):
    if not arr:
        return arr
    
    min_val = min(arr)
    max_val = max(arr)
    k = max_val - min_val + 1
    
    # Count occurrences
    count = [0] * k
    for x in arr:
        count[x - min_val] += 1
    
    # Cumulative count (positions)
    for i in range(1, k):
        count[i] += count[i - 1]
    
    # Build output (iterate backwards for stability)
    output = [0] * len(arr)
    for x in reversed(arr):
        idx = count[x - min_val] - 1
        output[idx] = x
        count[x - min_val] -= 1
    
    return output
\`\`\`

## Common Use Cases

| Application | Range (k) | Why Counting Sort |
|-------------|-----------|-------------------|
| Exam scores | 0-100 | k = 101, very small |
| Ages | 0-150 | k = 151, small |
| ASCII chars | 0-127 | k = 128, small |
| Sorting digits | 0-9 | k = 10, tiny |

## Key Takeaways

- **O(n + k)** time — faster than O(n log n) when k is small
- **Non-comparison** sort — counts, doesn't compare
- **Best for integers** in a known, small range
- **Stable** — preserves order of equal elements
- **O(k) extra space** for count array
- **Inefficient** when k >> n (large range)
- **Used by Radix Sort** for digit-by-digit sorting`,

    'radix-sort': `# Time Complexity: Radix Sort

## How Radix Sort Works

**Radix Sort** sorts numbers digit by digit, from least significant to most significant, using a stable sort (usually Counting Sort) for each digit.

\`\`\`
Array: [170, 45, 75, 90, 802, 24, 2, 66]

Sort by 1s digit:
  [170, 90, 802, 2, 24, 45, 75, 66]
       0   0   2  2  4   5   5   6

Sort by 10s digit:
  [802, 2, 24, 45, 66, 170, 75, 90]
       0  0   2   4   6   7    7   9

Sort by 100s digit:
  [2, 24, 45, 66, 75, 90, 170, 802]
   0   0   0   0   0   0   1    8

Result: [2, 24, 45, 66, 75, 90, 170, 802]
\`\`\`

## Python Implementation

\`\`\`python
def counting_sort_digit(arr, exp):
    """Sort array by digit at position exp (1, 10, 100, ...)"""
    n = len(arr)
    output = [0] * n
    count = [0] * 10  # Digits 0-9
    
    # Count occurrences of each digit
    for x in arr:
        digit = (x // exp) % 10
        count[digit] += 1
    
    # Cumulative count
    for i in range(1, 10):
        count[i] += count[i - 1]
    
    # Build output (backwards for stability)
    for x in reversed(arr):
        digit = (x // exp) % 10
        output[count[digit] - 1] = x
        count[digit] -= 1
    
    return output

def radix_sort(arr):
    if not arr:
        return arr
    
    # Find maximum to determine number of digits
    max_val = max(arr)
    
    # Sort by each digit
    exp = 1
    while max_val // exp > 0:
        arr = counting_sort_digit(arr, exp)
        exp *= 10
    
    return arr

# Example
arr = [170, 45, 75, 90, 802, 24, 2, 66]
print(radix_sort(arr))  # [2, 24, 45, 66, 75, 90, 170, 802]
\`\`\`

## Time Complexity Analysis

### Breaking Down the Complexity

\`\`\`
d = number of digits in maximum number
n = number of elements
k = range of each digit (10 for decimal)

For each digit (d iterations):
  - Counting sort: O(n + k)

Total: O(d × (n + k))
\`\`\`

### Simplified Analysis

For decimal numbers (k = 10):
\`\`\`
O(d × (n + 10)) = O(d × n)

Where d = number of digits
      d = log₁₀(max_value) + 1
\`\`\`

## Complexity Summary

| Case | Time | Variables |
|------|------|-----------|
| **All cases** | O(d × (n + k)) | d = digits, k = radix |

**Space Complexity:** O(n + k)
- O(n) for output array
- O(k) for count array

## Comparing d, n, and log n

\`\`\`
For n numbers with maximum value M:
  d = number of digits = O(log M)

If M ≈ nᶜ for some constant c:
  d = O(log n)
  Time = O(n × log n)

Same as comparison sorts! But with smaller constants.
\`\`\`

### When Radix Sort Wins

\`\`\`
Radix Sort: O(d × n)
Quick Sort: O(n × log n)

Radix wins when: d < log n

Example: n = 1,000,000 numbers, max = 999
  d = 3 digits
  log n ≈ 20

  Radix: O(3 × 1,000,000) = 3,000,000
  Quick: O(1,000,000 × 20) = 20,000,000

  Radix is ~7x faster!
\`\`\`

## Radix Sort for Different Bases

\`\`\`python
def radix_sort_base(arr, base=10):
    """Radix sort with configurable base."""
    if not arr:
        return arr
    
    max_val = max(arr)
    exp = 1
    
    while max_val // exp > 0:
        arr = counting_sort_base(arr, exp, base)
        exp *= base
    
    return arr

# Base 256: Sort by bytes (for 32-bit integers)
# Only 4 passes instead of up to 10!
\`\`\`

## LSD vs MSD Radix Sort

| Type | Direction | Stability | Use Case |
|------|-----------|-----------|----------|
| LSD | Least → Most significant | Required | Fixed-length integers |
| MSD | Most → Least significant | Not required | Variable-length strings |

### LSD (Least Significant Digit)

\`\`\`
Sort: 170, 45, 802

Pass 1 (ones):   170, 802, 45  → by 0, 2, 5
Pass 2 (tens):   802, 45, 170  → by 0, 4, 7
Pass 3 (hundreds): 45, 170, 802  → by 0, 1, 8

Must be stable to work correctly!
\`\`\`

## Radix Sort vs Other Sorts

| Algorithm | Time | Space | Stable? | Use Case |
|-----------|------|-------|---------|----------|
| Radix | O(d(n+k)) | O(n+k) | Yes | Fixed-range integers |
| Quick | O(n log n) | O(log n) | No | General purpose |
| Merge | O(n log n) | O(n) | Yes | When stability needed |
| Counting | O(n+k) | O(k) | Yes | Small range |

## Practical Considerations

### When to Use Radix Sort

| ✅ Good for | ❌ Bad for |
|-------------|------------|
| Large n, small d | Small n |
| Fixed-size integers | Floating point |
| Uniform length strings | Variable length |
| When k is small | Large digit range |

### Real-World Applications

\`\`\`
1. Sorting integers with bounded range
2. Sorting fixed-length strings
3. Sorting IP addresses
4. Database record sorting
5. Graphics/game engine sorting
\`\`\`

## Handling Negative Numbers

\`\`\`python
def radix_sort_with_negatives(arr):
    """Handle negative numbers by separating."""
    negatives = [-x for x in arr if x < 0]
    positives = [x for x in arr if x >= 0]
    
    # Sort both (negatives as positive values)
    sorted_neg = radix_sort(negatives)
    sorted_pos = radix_sort(positives)
    
    # Combine: negatives reversed, then positives
    return [-x for x in reversed(sorted_neg)] + sorted_pos
\`\`\`

## Key Takeaways

- **O(d × (n + k))** time — can beat O(n log n)
- **Non-comparison** sort — uses digit values
- **Stable sort required** for each digit pass
- **Best for** integers with few digits
- **LSD approach** — sort from least to most significant
- **Uses Counting Sort** internally for each digit
- **d = number of digits** determines efficiency`,

    'merge-sort': `# Time Complexity: Merge Sort

## How Merge Sort Works

**Merge Sort** uses divide and conquer:
1. **Divide**: Split array in half
2. **Conquer**: Recursively sort each half
3. **Combine**: Merge two sorted halves

\`\`\`
[38, 27, 43, 3, 9, 82, 10]

Divide:
[38, 27, 43, 3]     [9, 82, 10]
[38, 27] [43, 3]    [9, 82] [10]
[38] [27] [43] [3]  [9] [82] [10]

Merge:
[27, 38] [3, 43]    [9, 82] [10]
[3, 27, 38, 43]     [9, 10, 82]
[3, 9, 10, 27, 38, 43, 82]
\`\`\`

## Python Implementation

\`\`\`python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    # Divide
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    # Merge
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    result.extend(left[i:])
    result.extend(right[j:])
    return result

# Example
arr = [38, 27, 43, 3, 9, 82, 10]
print(merge_sort(arr))  # [3, 9, 10, 27, 38, 43, 82]
\`\`\`

## Time Complexity Analysis

### The Recursion Tree

\`\`\`
Level 0:     [........n........]     → n operations
                    /    \\
Level 1:   [..n/2..]    [..n/2..]    → n operations
              / \\          / \\
Level 2: [n/4] [n/4]   [n/4] [n/4]   → n operations
           ...             ...        
Level k:  [1] [1] ... [1] [1]        → n operations

How many levels? log₂(n)
Work per level? n (merging)

Total: n × log n = O(n log n)
\`\`\`

### Why Always O(n log n)?

Unlike Quick Sort, Merge Sort **always** splits in half:

\`\`\`python
mid = len(arr) // 2    # ALWAYS splits evenly
left = arr[:mid]
right = arr[mid:]

# No matter the input order, we get balanced splits
# This guarantees O(n log n) in ALL cases
\`\`\`

## Complexity Summary

| Case | Time | Reason |
|------|------|--------|
| **Best** | O(n log n) | Always splits evenly |
| **Average** | O(n log n) | Always splits evenly |
| **Worst** | O(n log n) | Always splits evenly |

**Space Complexity:** O(n)
- Temporary arrays for merging

## Merge Operation Analysis

\`\`\`python
def merge(left, right):
    # left has n/2 elements, right has n/2 elements
    result = []
    
    while i < len(left) and j < len(right):
        # Each comparison adds one element to result
        # Total: n comparisons and n copies
        
    # O(n) time for each merge
\`\`\`

## Counting Operations

\`\`\`
Merging at each level:

Level    Subarrays    Size Each    Total Work
0        1            n            n
1        2            n/2          n
2        4            n/4          n
...
k        n            1            n

log n levels × n work = O(n log n)
\`\`\`

## Space Complexity Deep Dive

\`\`\`python
def merge_sort(arr):
    # Recursion depth: O(log n)
    # But at each level, we create new arrays
    
    left = merge_sort(arr[:mid])   # O(n/2) space
    right = merge_sort(arr[mid:])  # O(n/2) space
    
    return merge(left, right)       # O(n) for result

# Total space at any time: O(n)
# (Previous level arrays are garbage collected)
\`\`\`

## Merge Sort vs Quick Sort

| Aspect | Merge Sort | Quick Sort |
|--------|------------|------------|
| Best | O(n log n) | O(n log n) |
| Worst | O(n log n) | O(n²) |
| Space | O(n) | O(log n) |
| Stable? | Yes | No |
| Cache | Poor | Good |
| In-place? | No | Yes |

### When to Use Merge Sort

| ✅ Use Merge Sort | ✅ Use Quick Sort |
|------------------|------------------|
| Need guaranteed O(n log n) | Memory constrained |
| Need stable sort | Cache performance matters |
| Sorting linked lists | Average case is fine |
| External sorting | In-place needed |

## In-Place Merge Sort (Complex)

\`\`\`python
# Standard merge sort needs O(n) extra space
# In-place versions exist but are complex and slower

# For interviews, know that:
# - Standard: O(n) space, simple
# - In-place: O(1) space, complex, slower
\`\`\`

## Merge Sort for Linked Lists

\`\`\`python
def merge_sort_linked(head):
    """O(1) space merge sort for linked lists!"""
    if not head or not head.next:
        return head
    
    # Find middle (slow-fast pointers)
    slow, fast = head, head.next
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    
    # Split
    mid = slow.next
    slow.next = None
    
    # Recursively sort and merge
    left = merge_sort_linked(head)
    right = merge_sort_linked(mid)
    return merge_linked(left, right)

# No extra array needed for linked lists!
\`\`\`

## External Sorting

Merge Sort is ideal for **external sorting** (data too large for RAM):

\`\`\`
1. Read chunks that fit in memory
2. Sort each chunk with any algorithm
3. Write sorted chunks to disk
4. Merge chunks using Merge Sort

Example: Sorting 1TB of data with 1GB RAM
- Create 1000 sorted chunks
- Merge in passes: 1000 → 500 → 250 → ... → 1
\`\`\`

## Visualization

\`\`\`
[38, 27, 43, 3, 9, 82, 10]
              |
      Divide (log n levels)
              |
[38,27,43,3]     [9,82,10]
    |                |
[38,27] [43,3]   [9,82] [10]
  |        |       |      |
[38][27] [43][3] [9][82] [10]
              |
      Merge (n work per level)
              |
[27,38] [3,43]   [9,82] [10]
    |                |
[3,27,38,43]    [9,10,82]
              |
    [3,9,10,27,38,43,82]
\`\`\`

## Key Takeaways

- **Always O(n log n)** — guaranteed performance
- **Divide in half** — unlike Quick Sort's variable pivot
- **O(n) extra space** — for temporary arrays
- **Stable sort** — preserves order of equal elements
- **Great for linked lists** — O(1) space possible
- **Ideal for external sorting** — when data doesn't fit in RAM
- **log n levels × n work** = O(n log n)`,

    'linear-search': `# Time Complexity: Linear Search

## How Linear Search Works

**Linear Search** checks each element one by one until finding the target or reaching the end.

\`\`\`
Find 7 in [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 7]

Index 0: 3 ≠ 7
Index 1: 1 ≠ 7
Index 2: 4 ≠ 7
Index 3: 1 ≠ 7
Index 4: 5 ≠ 7
Index 5: 9 ≠ 7
Index 6: 2 ≠ 7
Index 7: 6 ≠ 7
Index 8: 5 ≠ 7
Index 9: 3 ≠ 7
Index 10: 5 ≠ 7
Index 11: 7 = 7 ✓ Found at index 11!
\`\`\`

## Python Implementation

\`\`\`python
def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1

# Example
arr = [3, 1, 4, 1, 5, 9, 2, 6]
print(linear_search(arr, 5))   # 4
print(linear_search(arr, 7))   # -1 (not found)
\`\`\`

## Time Complexity Analysis

### Best Case: O(1)

\`\`\`
Target is the FIRST element

arr = [target, ?, ?, ?, ...]

Check index 0: Found!
Only 1 comparison = O(1)
\`\`\`

### Worst Case: O(n)

\`\`\`
Target is the LAST element or NOT in array

arr = [?, ?, ?, ..., ?, target]
arr = [?, ?, ?, ..., ?, ?] (target not present)

Check all n elements
n comparisons = O(n)
\`\`\`

### Average Case: O(n)

\`\`\`
On average, target is somewhere in the middle

Expected comparisons = n/2
Drop constant: O(n)
\`\`\`

## Complexity Summary

| Case | Time | When |
|------|------|------|
| **Best** | O(1) | Target at index 0 |
| **Average** | O(n) | Target in middle |
| **Worst** | O(n) | Target at end or missing |

**Space Complexity:** O(1) — no extra space needed

## Comparison Operations

\`\`\`python
def linear_search(arr, target):
    comparisons = 0
    for i in range(len(arr)):
        comparisons += 1
        if arr[i] == target:
            print(f"Found in {comparisons} comparisons")
            return i
    print(f"Not found after {comparisons} comparisons")
    return -1

# arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
# Search for 1:  1 comparison  (best)
# Search for 5:  5 comparisons (average)
# Search for 10: 10 comparisons (worst)
# Search for 11: 10 comparisons (not found)
\`\`\`

## Variants of Linear Search

### Search All Occurrences

\`\`\`python
def find_all(arr, target):
    """Find all indices of target. Still O(n)."""
    indices = []
    for i in range(len(arr)):
        if arr[i] == target:
            indices.append(i)
    return indices

arr = [1, 2, 3, 2, 4, 2, 5]
print(find_all(arr, 2))  # [1, 3, 5]
\`\`\`

### Search with Sentinel

\`\`\`python
def linear_search_sentinel(arr, target):
    """Slightly optimized - fewer comparisons in loop."""
    n = len(arr)
    if n == 0:
        return -1
    
    last = arr[n - 1]
    arr[n - 1] = target  # Sentinel
    
    i = 0
    while arr[i] != target:  # No bound check needed!
        i += 1
    
    arr[n - 1] = last  # Restore
    
    if i < n - 1 or arr[n - 1] == target:
        return i
    return -1

# Still O(n), but fewer comparisons per iteration
\`\`\`

## When to Use Linear Search

| ✅ Good for | ❌ Bad for |
|-------------|------------|
| Small arrays | Large arrays |
| Unsorted data | Sorted data (use binary) |
| Linked lists | Random access needed |
| Single search | Many searches |
| Simple implementation | Performance critical |

## Linear Search vs Binary Search

| Aspect | Linear | Binary |
|--------|--------|--------|
| Time | O(n) | O(log n) |
| Requires sorted? | No | Yes |
| Implementation | Simple | Moderate |
| Best for | Unsorted/small | Sorted/large |

\`\`\`
Array size: 1,000,000 elements

Linear Search: up to 1,000,000 comparisons
Binary Search: up to 20 comparisons

Binary is 50,000x faster for sorted data!
\`\`\`

## Linear Search on Linked Lists

\`\`\`python
def search_linked_list(head, target):
    """O(n) - must traverse sequentially."""
    current = head
    index = 0
    
    while current:
        if current.val == target:
            return index
        current = current.next
        index += 1
    
    return -1

# Linear search is the ONLY option for linked lists
# (Binary search requires random access)
\`\`\`

## Key Takeaways

- **O(n) average and worst** — checks each element
- **O(1) best case** — target at beginning
- **No sorting required** — works on any array
- **Simple to implement** — just loop and compare
- **Only option for linked lists** — no random access
- **Use Binary Search** for sorted arrays (O(log n))`,

    'binary-search': `# Time Complexity: Binary Search

## How Binary Search Works

**Binary Search** repeatedly divides the search space in half. It requires a **sorted array**.

\`\`\`
Find 7 in [1, 3, 5, 7, 9, 11, 13, 15]

Step 1: mid = 7 (value 7)
        arr[mid] = 7 = target ✓ Found!

Find 13:
Step 1: mid = 3 (value 7), 13 > 7 → search right
        [9, 11, 13, 15]
Step 2: mid = 5 (value 11), 13 > 11 → search right
        [13, 15]
Step 3: mid = 6 (value 13), 13 = 13 ✓ Found!
\`\`\`

## Python Implementation

\`\`\`python
def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    
    while low <= high:
        mid = (low + high) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1    # Search right half
        else:
            high = mid - 1   # Search left half
    
    return -1

# Example
arr = [1, 3, 5, 7, 9, 11, 13, 15]
print(binary_search(arr, 7))   # 3
print(binary_search(arr, 6))   # -1 (not found)
\`\`\`

## Time Complexity Analysis

### Why O(log n)?

Each comparison eliminates **half** of the remaining elements:

\`\`\`
n = 16 elements

Step 1: 16 → 8  (eliminate half)
Step 2: 8 → 4   (eliminate half)
Step 3: 4 → 2   (eliminate half)
Step 4: 2 → 1   (eliminate half)
Step 5: 1 → 0   (found or not found)

5 steps for 16 elements
log₂(16) = 4 ≈ 5 steps

In general: log₂(n) steps
\`\`\`

### Mathematical Proof

\`\`\`
After k comparisons, remaining elements = n / 2^k

We stop when remaining = 1:
  n / 2^k = 1
  n = 2^k
  k = log₂(n)

Time Complexity: O(log n)
\`\`\`

## Complexity Summary

| Case | Time | When |
|------|------|------|
| **Best** | O(1) | Target at middle |
| **Average** | O(log n) | Target anywhere |
| **Worst** | O(log n) | Target at end or missing |

**Space Complexity:**
- Iterative: O(1)
- Recursive: O(log n) for call stack

## Power of Logarithmic Time

\`\`\`
Array Size (n)    Linear O(n)    Binary O(log n)
         10              10                  4
        100             100                  7
      1,000           1,000                 10
     10,000          10,000                 14
    100,000         100,000                 17
  1,000,000       1,000,000                 20

1 million elements: 20 comparisons vs 1 million!
\`\`\`

## Recursive Implementation

\`\`\`python
def binary_search_recursive(arr, target, low, high):
    if low > high:
        return -1
    
    mid = (low + high) // 2
    
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search_recursive(arr, target, mid + 1, high)
    else:
        return binary_search_recursive(arr, target, low, mid - 1)

# Usage
arr = [1, 3, 5, 7, 9, 11, 13]
print(binary_search_recursive(arr, 7, 0, len(arr) - 1))  # 3
\`\`\`

## Common Variations

### Find First Occurrence

\`\`\`python
def find_first(arr, target):
    """Find leftmost occurrence of target."""
    low, high = 0, len(arr) - 1
    result = -1
    
    while low <= high:
        mid = (low + high) // 2
        
        if arr[mid] == target:
            result = mid       # Record and keep searching left
            high = mid - 1
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    
    return result

arr = [1, 2, 2, 2, 3, 4, 5]
print(find_first(arr, 2))  # 1 (first occurrence)
\`\`\`

### Find Last Occurrence

\`\`\`python
def find_last(arr, target):
    """Find rightmost occurrence of target."""
    low, high = 0, len(arr) - 1
    result = -1
    
    while low <= high:
        mid = (low + high) // 2
        
        if arr[mid] == target:
            result = mid       # Record and keep searching right
            low = mid + 1
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    
    return result

arr = [1, 2, 2, 2, 3, 4, 5]
print(find_last(arr, 2))  # 3 (last occurrence)
\`\`\`

### Find Insert Position

\`\`\`python
def search_insert(arr, target):
    """Find index where target should be inserted."""
    low, high = 0, len(arr)
    
    while low < high:
        mid = (low + high) // 2
        
        if arr[mid] < target:
            low = mid + 1
        else:
            high = mid
    
    return low

arr = [1, 3, 5, 7]
print(search_insert(arr, 4))  # 2 (insert between 3 and 5)
\`\`\`

## Common Mistakes

### Off-by-One Errors

\`\`\`python
# ❌ Wrong: infinite loop when low = high
while low < high:  # Should be <=

# ❌ Wrong: might skip elements
low = mid      # Should be mid + 1
high = mid     # Should be mid - 1

# ✅ Correct
while low <= high:
    mid = (low + high) // 2
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        low = mid + 1
    else:
        high = mid - 1
\`\`\`

### Integer Overflow (in other languages)

\`\`\`python
# In languages with fixed-size integers:
# mid = (low + high) / 2  ← Can overflow!

# Safe version:
mid = low + (high - low) // 2

# Python handles big integers, so not an issue
\`\`\`

## Binary Search Applications

| Problem | Technique |
|---------|-----------|
| Find element | Standard binary search |
| Find first/last | Modified binary search |
| Search in rotated array | Modified comparison |
| Find peak element | Compare with neighbors |
| Search in matrix | Treat as 1D or search rows/cols |
| Minimize/maximize answer | Binary search on answer |

## Binary Search on Answer

\`\`\`python
def min_days_to_make_bouquets(bloom, m, k):
    """Binary search on the answer (days)."""
    
    def can_make(days):
        # Check if we can make m bouquets in 'days' days
        bouquets = flowers = 0
        for b in bloom:
            if b <= days:
                flowers += 1
                if flowers == k:
                    bouquets += 1
                    flowers = 0
            else:
                flowers = 0
        return bouquets >= m
    
    low, high = min(bloom), max(bloom)
    result = -1
    
    while low <= high:
        mid = (low + high) // 2
        if can_make(mid):
            result = mid
            high = mid - 1
        else:
            low = mid + 1
    
    return result
\`\`\`

## Summary Table

| Algorithm | Best | Average | Worst | Requires Sorted |
|-----------|------|---------|-------|-----------------|
| Linear Search | O(1) | O(n) | O(n) | No |
| Binary Search | O(1) | O(log n) | O(log n) | Yes |

## Key Takeaways

- **O(log n)** — extremely efficient for large arrays
- **Requires sorted array** — must sort first if unsorted
- **Eliminates half** each step — exponential reduction
- **Many variations** — first/last occurrence, insert position
- **Binary search on answer** — powerful technique
- **Watch for off-by-one** errors in implementation
- **Use for sorted data** — always better than linear search`,

    'dsa-euclidean-algorithm': `# DSA Euclidean Algorithm

## What is the Euclidean Algorithm?

The **Euclidean Algorithm** is an efficient method to compute the **Greatest Common Divisor (GCD)** of two integers.

The GCD is the largest number that divides both integers without leaving a remainder.

\`\`\`
GCD(48, 18) = ?

48 = 2 × 2 × 2 × 2 × 3
18 = 2 × 3 × 3

Common factors: 2 × 3 = 6
GCD(48, 18) = 6
\`\`\`

## The Core Idea

> **GCD(a, b) = GCD(b, a % b)**

We repeatedly reduce the problem size until one number becomes zero.

\`\`\`
GCD(48, 18):
  48 % 18 = 12  →  GCD(18, 12)
  18 % 12 = 6   →  GCD(12, 6)
  12 % 6 = 0    →  GCD(6, 0)
  
When b = 0, answer is a
GCD(48, 18) = 6
\`\`\`

## Why Does It Work?

If **d** divides both **a** and **b**, then **d** also divides **(a - b)**.

More generally, **d** divides **(a % b)**.

\`\`\`
a = q × b + r    (where r = a % b)

If d divides a and d divides b:
  d divides (a - q × b)
  d divides r

So GCD(a, b) = GCD(b, r)
\`\`\`

## Python Implementation

### Iterative Version

\`\`\`python
def gcd(a, b):
    """Euclidean algorithm - iterative."""
    while b != 0:
        a, b = b, a % b
    return a

# Examples
print(gcd(48, 18))   # 6
print(gcd(56, 98))   # 14
print(gcd(101, 103)) # 1 (coprime)
\`\`\`

### Recursive Version

\`\`\`python
def gcd_recursive(a, b):
    """Euclidean algorithm - recursive."""
    if b == 0:
        return a
    return gcd_recursive(b, a % b)

print(gcd_recursive(48, 18))  # 6
\`\`\`

## Time Complexity

**O(log(min(a, b)))**

Each step reduces the larger number by at least half.

\`\`\`
Worst case: Fibonacci numbers

GCD(F(n), F(n-1)) requires n steps
F(n) ≈ 1.618^n

Steps ≈ log₁.₆₁₈(n) = O(log n)
\`\`\`

## Extended Euclidean Algorithm

Finds x and y such that: **ax + by = GCD(a, b)**

\`\`\`python
def extended_gcd(a, b):
    """Returns (gcd, x, y) where ax + by = gcd."""
    if b == 0:
        return a, 1, 0
    
    gcd, x1, y1 = extended_gcd(b, a % b)
    x = y1
    y = x1 - (a // b) * y1
    
    return gcd, x, y

# Example
gcd, x, y = extended_gcd(48, 18)
print(f"GCD: {gcd}")           # 6
print(f"x: {x}, y: {y}")       # x: -1, y: 3
print(f"48×{x} + 18×{y} = {48*x + 18*y}")  # 6
\`\`\`

## Least Common Multiple (LCM)

\`\`\`python
def lcm(a, b):
    """LCM using GCD."""
    return abs(a * b) // gcd(a, b)

print(lcm(4, 6))   # 12
print(lcm(21, 6))  # 42
\`\`\`

**Formula:** LCM(a, b) × GCD(a, b) = a × b

## Applications

| Application | How GCD is Used |
|-------------|-----------------|
| Simplifying fractions | Divide by GCD |
| RSA cryptography | Extended GCD for modular inverse |
| Reducing ratios | Find common factor |
| Scheduling | LCM for cycle alignment |

### Simplifying Fractions

\`\`\`python
def simplify_fraction(num, den):
    """Simplify fraction to lowest terms."""
    g = gcd(abs(num), abs(den))
    return num // g, den // g

print(simplify_fraction(48, 18))  # (8, 3)
print(simplify_fraction(100, 75)) # (4, 3)
\`\`\`

### Modular Multiplicative Inverse

\`\`\`python
def mod_inverse(a, m):
    """Find x such that (a × x) % m = 1."""
    g, x, _ = extended_gcd(a, m)
    if g != 1:
        return None  # No inverse exists
    return x % m

print(mod_inverse(3, 11))  # 4 (because 3×4 = 12 = 1 mod 11)
\`\`\`

## GCD of Multiple Numbers

\`\`\`python
from functools import reduce

def gcd_multiple(*args):
    """GCD of multiple numbers."""
    return reduce(gcd, args)

print(gcd_multiple(12, 18, 24))  # 6
print(gcd_multiple(100, 75, 50)) # 25
\`\`\`

## Interview Tips

### Common Problems

1. **Check if coprime** — GCD = 1
2. **Simplify fraction** — Divide by GCD
3. **Find LCM** — Use GCD formula
4. **Modular inverse** — Extended GCD

### Key Points

- **GCD(a, b) = GCD(b, a % b)** — core recurrence
- **O(log n)** — very efficient
- **Extended GCD** — finds linear combination
- **LCM × GCD = a × b** — important relationship

## Key Takeaways

- **Euclidean Algorithm** efficiently computes GCD
- **O(log(min(a, b)))** time complexity
- **Extended version** finds x, y for ax + by = GCD
- **Used in cryptography**, fractions, and number theory
- **Foundation** for many mathematical algorithms`,

    'dsa-huffman-coding': `# DSA Huffman Coding

## What is Huffman Coding?

**Huffman Coding** is a greedy compression algorithm that assigns **variable-length codes** to characters based on their frequency.

More frequent characters get **shorter codes**.

\`\`\`
Text: "AAAAABBBCC"

Fixed length (3 bits each):
  A=000, B=001, C=010
  Total: 10 × 3 = 30 bits

Huffman coding:
  A=0 (most frequent)
  B=10
  C=11
  Total: 5×1 + 3×2 + 2×2 = 15 bits

50% compression!
\`\`\`

## How It Works

### Step 1: Count Frequencies

\`\`\`
Text: "AAAAABBBCC"

A: 5
B: 3
C: 2
\`\`\`

### Step 2: Build Min-Heap

\`\`\`
Create nodes for each character:
  [C:2] [B:3] [A:5]
\`\`\`

### Step 3: Build Huffman Tree

Repeatedly merge the two lowest frequency nodes:

\`\`\`
Step 1: Merge C(2) and B(3) → Node(5)
        [A:5] [CB:5]

Step 2: Merge A(5) and CB(5) → Root(10)
              [Root:10]
              /        \\
           A:5        CB:5
                      /   \\
                    C:2   B:3
\`\`\`

### Step 4: Assign Codes

Left edge = 0, Right edge = 1

\`\`\`
         [10]
        0/   \\1
       A      [5]
            0/   \\1
           C      B

Codes:
  A = 0
  C = 10
  B = 11
\`\`\`

## Python Implementation

\`\`\`python
import heapq
from collections import Counter

class HuffmanNode:
    def __init__(self, char, freq):
        self.char = char
        self.freq = freq
        self.left = None
        self.right = None
    
    def __lt__(self, other):
        return self.freq < other.freq

def build_huffman_tree(text):
    """Build Huffman tree from text."""
    # Count frequencies
    freq = Counter(text)
    
    # Create min-heap of nodes
    heap = [HuffmanNode(char, f) for char, f in freq.items()]
    heapq.heapify(heap)
    
    # Build tree by merging nodes
    while len(heap) > 1:
        left = heapq.heappop(heap)
        right = heapq.heappop(heap)
        
        merged = HuffmanNode(None, left.freq + right.freq)
        merged.left = left
        merged.right = right
        
        heapq.heappush(heap, merged)
    
    return heap[0] if heap else None

def generate_codes(root, code="", codes=None):
    """Generate Huffman codes from tree."""
    if codes is None:
        codes = {}
    
    if root is None:
        return codes
    
    if root.char is not None:
        codes[root.char] = code if code else "0"
    
    generate_codes(root.left, code + "0", codes)
    generate_codes(root.right, code + "1", codes)
    
    return codes

def huffman_encode(text):
    """Encode text using Huffman coding."""
    root = build_huffman_tree(text)
    codes = generate_codes(root)
    encoded = "".join(codes[char] for char in text)
    return encoded, codes, root

# Example
text = "AAAAABBBCC"
encoded, codes, root = huffman_encode(text)

print("Codes:", codes)
# {'A': '0', 'C': '10', 'B': '11'}

print("Encoded:", encoded)
# 00000111111010

print(f"Original: {len(text) * 8} bits")
print(f"Compressed: {len(encoded)} bits")
\`\`\`

## Decoding

\`\`\`python
def huffman_decode(encoded, root):
    """Decode Huffman encoded string."""
    decoded = []
    current = root
    
    for bit in encoded:
        if bit == '0':
            current = current.left
        else:
            current = current.right
        
        if current.char is not None:
            decoded.append(current.char)
            current = root
    
    return "".join(decoded)

# Decode
decoded = huffman_decode(encoded, root)
print("Decoded:", decoded)  # AAAAABBBCC
\`\`\`

## Why Prefix Codes?

Huffman codes are **prefix-free** — no code is a prefix of another.

\`\`\`
Valid (prefix-free):     Invalid (not prefix-free):
  A = 0                    A = 1
  B = 10                   B = 11
  C = 11                   C = 111

With prefix-free codes:
  "010" = A, B (unambiguous)

Without:
  "111" = B,A? or C? (ambiguous!)
\`\`\`

## Time Complexity

| Operation | Complexity |
|-----------|------------|
| Count frequencies | O(n) |
| Build heap | O(k log k) |
| Build tree | O(k log k) |
| Encode | O(n) |
| **Total** | **O(n + k log k)** |

Where n = text length, k = unique characters

## Space Complexity

- **O(k)** for the tree (k unique characters)
- **O(n)** for encoded output

## Compression Ratio

\`\`\`
Original size: n × 8 bits (ASCII)
Compressed: sum of (freq[c] × len(code[c]))

Compression ratio = compressed / original

Example: "AAAAABBBCC"
  Original: 10 × 8 = 80 bits
  Huffman: 5×1 + 3×2 + 2×2 = 15 bits
  Ratio: 15/80 = 18.75%
\`\`\`

## Applications

| Application | Use Case |
|-------------|----------|
| ZIP files | File compression |
| JPEG images | Image compression |
| MP3 audio | Audio compression |
| Network protocols | Data transmission |
| Fax machines | Document transmission |

## Huffman vs Other Encoding

| Method | Type | Optimal? |
|--------|------|----------|
| Fixed-length | Equal codes | No |
| Huffman | Variable codes | Yes (for symbol-by-symbol) |
| Arithmetic | Fractional bits | Even better |
| LZW | Dictionary | Good for patterns |

## Interview Tips

### Common Problems

1. **Build Huffman tree** from frequencies
2. **Encode/decode** strings
3. **Calculate compression ratio**
4. **Prove prefix-free property**

### Key Points

- **Greedy** — always merge smallest frequencies
- **Prefix-free** — no ambiguity in decoding
- **Optimal** for symbol-by-symbol encoding
- **Min-heap** is essential for efficiency

## Key Takeaways

- **Variable-length codes** based on frequency
- **Greedy approach** — merge lowest frequencies
- **Prefix-free** — unambiguous decoding
- **O(n + k log k)** time complexity
- **Widely used** in compression (ZIP, JPEG, MP3)
- **Foundation** for understanding compression`,

    'dsa-the-traveling-salesman': `# DSA The Traveling Salesman Problem

## Problem Statement

The **Traveling Salesman Problem (TSP)** asks:

> Given a list of cities and distances between them, what is the shortest possible route that visits every city exactly once and returns to the starting city?

\`\`\`
Cities: A, B, C, D

Distances:
  A-B: 10    A-C: 15    A-D: 20
  B-C: 35    B-D: 25
  C-D: 30

Find shortest tour visiting all cities once and returning home.
\`\`\`

## Why It's Famous

TSP is one of the most studied problems in computer science because:
- It's **NP-Hard** — no known polynomial-time solution
- It has many **real-world applications**
- It's a benchmark for **optimization algorithms**

\`\`\`
Problem Type: NP-Hard
Best known exact: O(n² × 2ⁿ)
Brute force: O(n!)
\`\`\`

## Brute Force Approach

Try all possible routes and pick the shortest.

\`\`\`python
from itertools import permutations

def tsp_brute_force(distances):
    """
    Brute force TSP solution.
    distances: 2D matrix where distances[i][j] = distance from i to j
    Returns: (min_distance, best_path)
    """
    n = len(distances)
    cities = list(range(n))
    min_dist = float('inf')
    best_path = None
    
    # Try all permutations (fix starting city to avoid duplicates)
    for perm in permutations(cities[1:]):
        path = [0] + list(perm) + [0]  # Start and end at city 0
        
        dist = sum(distances[path[i]][path[i+1]] for i in range(n))
        
        if dist < min_dist:
            min_dist = dist
            best_path = path
    
    return min_dist, best_path

# Example
distances = [
    [0, 10, 15, 20],
    [10, 0, 35, 25],
    [15, 35, 0, 30],
    [20, 25, 30, 0]
]

dist, path = tsp_brute_force(distances)
print(f"Shortest distance: {dist}")
print(f"Path: {path}")
\`\`\`

**Time Complexity:** O(n!) — grows extremely fast!

\`\`\`
n=5:   120 routes
n=10:  3,628,800 routes
n=15:  1,307,674,368,000 routes
n=20:  2.4 × 10¹⁸ routes (impossible!)
\`\`\`

## Dynamic Programming Solution

Using **bitmask DP** to reduce complexity from O(n!) to O(n² × 2ⁿ).

\`\`\`python
def tsp_dp(distances):
    """
    TSP using dynamic programming with bitmask.
    Time: O(n² × 2ⁿ)
    Space: O(n × 2ⁿ)
    """
    n = len(distances)
    VISITED_ALL = (1 << n) - 1
    
    # dp[mask][i] = min distance to reach city i having visited cities in mask
    dp = [[float('inf')] * n for _ in range(1 << n)]
    dp[1][0] = 0  # Start at city 0
    
    for mask in range(1 << n):
        for last in range(n):
            if not (mask & (1 << last)):
                continue
            if dp[mask][last] == float('inf'):
                continue
            
            for next_city in range(n):
                if mask & (1 << next_city):
                    continue
                
                new_mask = mask | (1 << next_city)
                new_dist = dp[mask][last] + distances[last][next_city]
                dp[new_mask][next_city] = min(dp[new_mask][next_city], new_dist)
    
    # Find minimum cost to complete tour
    min_dist = float('inf')
    for last in range(n):
        min_dist = min(min_dist, dp[VISITED_ALL][last] + distances[last][0])
    
    return min_dist

# Example
print(tsp_dp(distances))  # Same answer, much faster for larger n
\`\`\`

## Understanding Bitmask

\`\`\`
4 cities: A(0), B(1), C(2), D(3)

Bitmask represents visited cities:
  0001 (1)  = only A visited
  0011 (3)  = A and B visited
  0111 (7)  = A, B, C visited
  1111 (15) = all visited

Check if city i visited: mask & (1 << i)
Add city i to mask: mask | (1 << i)
\`\`\`

## Approximation Algorithms

For large n, we use approximations:

### Nearest Neighbor (Greedy)

\`\`\`python
def tsp_nearest_neighbor(distances):
    """
    Greedy approximation - always go to nearest unvisited city.
    Not optimal, but fast: O(n²)
    """
    n = len(distances)
    visited = [False] * n
    path = [0]
    visited[0] = True
    total_dist = 0
    
    for _ in range(n - 1):
        last = path[-1]
        nearest = -1
        min_dist = float('inf')
        
        for city in range(n):
            if not visited[city] and distances[last][city] < min_dist:
                min_dist = distances[last][city]
                nearest = city
        
        path.append(nearest)
        visited[nearest] = True
        total_dist += min_dist
    
    # Return to start
    total_dist += distances[path[-1]][0]
    path.append(0)
    
    return total_dist, path

dist, path = tsp_nearest_neighbor(distances)
print(f"Nearest neighbor: {dist}, Path: {path}")
\`\`\`

### 2-Opt Improvement

\`\`\`python
def two_opt(path, distances):
    """Improve a tour by reversing segments."""
    improved = True
    best_path = path[:]
    
    while improved:
        improved = False
        for i in range(1, len(path) - 2):
            for j in range(i + 1, len(path) - 1):
                # Try reversing segment between i and j
                new_path = path[:i] + path[i:j+1][::-1] + path[j+1:]
                
                new_dist = sum(distances[new_path[k]][new_path[k+1]] 
                              for k in range(len(new_path)-1))
                old_dist = sum(distances[path[k]][path[k+1]] 
                              for k in range(len(path)-1))
                
                if new_dist < old_dist:
                    path = new_path
                    best_path = new_path
                    improved = True
    
    return best_path
\`\`\`

## Complexity Comparison

| Algorithm | Time | Quality |
|-----------|------|---------|
| Brute Force | O(n!) | Optimal |
| DP (Bitmask) | O(n² × 2ⁿ) | Optimal |
| Nearest Neighbor | O(n²) | ~25% worse |
| 2-Opt | O(n²) per iteration | Good |
| Christofides | O(n³) | ≤1.5× optimal |

## Real-World Applications

| Application | What's Optimized |
|-------------|------------------|
| Delivery routes | Fuel/time |
| Circuit board drilling | Drill head movement |
| DNA sequencing | Fragment ordering |
| Telescope scheduling | Slew time |
| Package pickup | Travel distance |

## Variations

| Variation | Description |
|-----------|-------------|
| Asymmetric TSP | Distance A→B ≠ B→A |
| TSP with time windows | Must visit at certain times |
| Multiple TSP | Multiple salesmen |
| Prize-collecting TSP | Collect value, minimize cost |

## Interview Tips

### Key Points

- **NP-Hard** — no polynomial solution known
- **Brute force** — O(n!), impractical for n > 10
- **DP with bitmask** — O(n² × 2ⁿ), practical for n ≤ 20
- **Approximations** — necessary for larger problems
- **Know nearest neighbor** — simple greedy approach

### Common Questions

1. Explain why TSP is NP-Hard
2. Implement DP solution with bitmask
3. Describe greedy approximation
4. When to use approximation vs exact

## Key Takeaways

- **TSP** finds shortest tour visiting all cities once
- **NP-Hard** — exponential time for exact solution
- **O(n² × 2ⁿ)** DP is best exact algorithm
- **Approximations** needed for large instances
- **Many real-world applications** in logistics and optimization`,

    'dsa-0-1-knapsack': `# DSA 0/1 Knapsack Problem

## Problem Statement

Given **n items** with weights and values, and a knapsack with **capacity W**, find the maximum value you can carry.

\`\`\`
Items:
  Item 1: weight=2, value=6
  Item 2: weight=2, value=10
  Item 3: weight=3, value=12

Knapsack capacity: W = 5

Best choice: Item 2 + Item 3
  Weight: 2 + 3 = 5 ✓ (within capacity)
  Value: 10 + 12 = 22 (maximum!)
\`\`\`

## Why "0/1"?

Each item can only be:
- **0** — not taken
- **1** — taken once

No fractions or duplicates allowed!

\`\`\`
0/1 Knapsack: Take item or don't (no fractions)
Fractional Knapsack: Can take partial items (greedy works)
Unbounded Knapsack: Can take unlimited copies
\`\`\`

## Recursive Solution (Intuition)

For each item, we have two choices:
1. **Include it** (if it fits)
2. **Exclude it**

\`\`\`python
def knapsack_recursive(weights, values, W, n):
    """
    Recursive solution - exponential time!
    """
    # Base case: no items left or no capacity
    if n == 0 or W == 0:
        return 0
    
    # If item too heavy, skip it
    if weights[n-1] > W:
        return knapsack_recursive(weights, values, W, n-1)
    
    # Max of: include item OR exclude item
    include = values[n-1] + knapsack_recursive(weights, values, 
                                                W - weights[n-1], n-1)
    exclude = knapsack_recursive(weights, values, W, n-1)
    
    return max(include, exclude)

# Example
weights = [2, 2, 3]
values = [6, 10, 12]
W = 5
print(knapsack_recursive(weights, values, W, len(weights)))  # 22
\`\`\`

**Time:** O(2ⁿ) — exponential!

## DP Solution (Bottom-Up)

### The DP State

\`\`\`
dp[i][w] = maximum value using first i items with capacity w
\`\`\`

### Recurrence

\`\`\`
If item i doesn't fit (weight[i] > w):
    dp[i][w] = dp[i-1][w]

If item i fits:
    dp[i][w] = max(
        dp[i-1][w],                    # Don't take item i
        values[i] + dp[i-1][w-weight[i]]  # Take item i
    )
\`\`\`

### Python Implementation

\`\`\`python
def knapsack(weights, values, W):
    """
    0/1 Knapsack using dynamic programming.
    Time: O(n × W)
    Space: O(n × W)
    """
    n = len(weights)
    
    # dp[i][w] = max value with first i items and capacity w
    dp = [[0] * (W + 1) for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        for w in range(W + 1):
            # Don't take item i
            dp[i][w] = dp[i-1][w]
            
            # Take item i (if it fits)
            if weights[i-1] <= w:
                dp[i][w] = max(
                    dp[i][w],
                    values[i-1] + dp[i-1][w - weights[i-1]]
                )
    
    return dp[n][W]

# Example
weights = [2, 2, 3]
values = [6, 10, 12]
W = 5
print(knapsack(weights, values, W))  # 22
\`\`\`

## Visualizing the DP Table

\`\`\`
Items: weight=[2,2,3], value=[6,10,12], W=5

        w=0  w=1  w=2  w=3  w=4  w=5
i=0       0    0    0    0    0    0
i=1       0    0    6    6    6    6   (item 1: w=2, v=6)
i=2       0    0   10   10   16   16   (item 2: w=2, v=10)
i=3       0    0   10   12   16   22   (item 3: w=3, v=12)

Answer: dp[3][5] = 22
\`\`\`

## Space Optimized Solution

Since we only need the previous row, we can use O(W) space:

\`\`\`python
def knapsack_optimized(weights, values, W):
    """
    Space-optimized 0/1 Knapsack.
    Time: O(n × W)
    Space: O(W)
    """
    n = len(weights)
    dp = [0] * (W + 1)
    
    for i in range(n):
        # Traverse RIGHT TO LEFT to avoid using updated values
        for w in range(W, weights[i] - 1, -1):
            dp[w] = max(dp[w], values[i] + dp[w - weights[i]])
    
    return dp[W]

print(knapsack_optimized(weights, values, W))  # 22
\`\`\`

**Why right to left?** To avoid using the same item twice!

## Finding Selected Items

\`\`\`python
def knapsack_with_items(weights, values, W):
    """Return max value AND selected items."""
    n = len(weights)
    dp = [[0] * (W + 1) for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        for w in range(W + 1):
            dp[i][w] = dp[i-1][w]
            if weights[i-1] <= w:
                dp[i][w] = max(dp[i][w], 
                              values[i-1] + dp[i-1][w - weights[i-1]])
    
    # Backtrack to find items
    selected = []
    w = W
    for i in range(n, 0, -1):
        if dp[i][w] != dp[i-1][w]:
            selected.append(i - 1)  # Item index (0-based)
            w -= weights[i-1]
    
    return dp[n][W], selected[::-1]

max_val, items = knapsack_with_items(weights, values, W)
print(f"Max value: {max_val}")       # 22
print(f"Selected items: {items}")    # [1, 2] (items 2 and 3, 0-indexed)
\`\`\`

## Complexity

| Aspect | Complexity |
|--------|------------|
| Time | O(n × W) |
| Space (2D) | O(n × W) |
| Space (1D) | O(W) |

**Note:** This is **pseudo-polynomial** — polynomial in n and W, but W could be exponential in input size.

## Variations

| Variation | Difference |
|-----------|------------|
| Unbounded | Can use each item multiple times |
| Fractional | Can take fractions (greedy works) |
| Bounded | Each item has a count limit |
| Multiple constraints | Multiple capacities |

## Common Mistakes

\`\`\`python
# ❌ Wrong: Using left-to-right in 1D DP
for w in range(weights[i], W + 1):  # Wrong direction!
    dp[w] = max(dp[w], values[i] + dp[w - weights[i]])
    # May count same item multiple times!

# ✅ Correct: Right-to-left
for w in range(W, weights[i] - 1, -1):
    dp[w] = max(dp[w], values[i] + dp[w - weights[i]])
\`\`\`

## Interview Tips

### Common Problems

1. **Basic 0/1 Knapsack** — direct application
2. **Subset Sum** — knapsack where value = weight
3. **Equal Partition** — can we split into equal sums?
4. **Target Sum** — count ways to reach target

### Key Points

- **Two choices per item**: take or leave
- **DP state**: dp[i][w] = max value
- **1D optimization**: traverse right-to-left
- **Backtracking** to find selected items

## Key Takeaways

- **0/1 Knapsack**: each item taken at most once
- **Recursive formula**: max(exclude, include)
- **DP Table**: O(n × W) time and space
- **Space optimization**: O(W) with right-to-left traversal
- **Pseudo-polynomial**: depends on W value
- **Foundation** for many DP problems`,

    'dsa-memoization': `# DSA Memoization

## What is Memoization?

**Memoization** is a top-down dynamic programming technique where we:
1. **Solve problems recursively**
2. **Cache results** to avoid recomputation

\`\`\`
Without memoization:        With memoization:
fib(5)                      fib(5)
├─fib(4)                    ├─fib(4)
│ ├─fib(3)                  │ ├─fib(3)
│ │ ├─fib(2)                │ │ ├─fib(2) → cache
│ │ └─fib(1)                │ │ └─fib(1)
│ └─fib(2)  ← recomputed!   │ └─fib(2) → from cache!
└─fib(3)    ← recomputed!   └─fib(3)   → from cache!

O(2ⁿ) calls                 O(n) calls
\`\`\`

## The Core Idea

> **If we've solved this subproblem before, return the cached result.**

\`\`\`python
# Basic pattern
memo = {}

def solve(problem):
    if problem in memo:
        return memo[problem]
    
    result = # ... compute result
    memo[problem] = result
    return result
\`\`\`

## Fibonacci Example

### Without Memoization (Slow)

\`\`\`python
def fib_slow(n):
    """Exponential time - O(2ⁿ)."""
    if n <= 1:
        return n
    return fib_slow(n-1) + fib_slow(n-2)

# fib_slow(40) takes seconds!
\`\`\`

### With Memoization (Fast)

\`\`\`python
memo = {}

def fib(n):
    """Linear time - O(n)."""
    if n <= 1:
        return n
    
    if n not in memo:
        memo[n] = fib(n-1) + fib(n-2)
    
    return memo[n]

# fib(40) is instant!
print(fib(40))  # 102334155
\`\`\`

### Using @lru_cache (Recommended)

\`\`\`python
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    """Automatic memoization with decorator."""
    if n <= 1:
        return n
    return fib(n-1) + fib(n-2)

print(fib(100))  # 354224848179261915075
\`\`\`

## Why Memoization Works

### Overlapping Subproblems

Many recursive problems solve the same subproblems multiple times:

\`\`\`
fib(5) call tree without memoization:
                    fib(5)
                   /      \\
              fib(4)      fib(3)
             /     \\      /    \\
         fib(3)  fib(2) fib(2) fib(1)
        /    \\
    fib(2) fib(1)

fib(3) computed 2 times
fib(2) computed 3 times

Total calls: 15

With memoization: Only 6 unique calls!
\`\`\`

## Memoization Template

\`\`\`python
# Template 1: Dictionary cache
def solve(args):
    # Check cache
    if args in memo:
        return memo[args]
    
    # Base case
    if base_condition:
        return base_value
    
    # Recursive case
    result = # ... recursive computation
    
    # Store in cache
    memo[args] = result
    return result

# Template 2: @lru_cache decorator
from functools import lru_cache

@lru_cache(maxsize=None)
def solve(args):
    if base_condition:
        return base_value
    return # ... recursive computation
\`\`\`

## More Examples

### Climbing Stairs

\`\`\`python
@lru_cache(maxsize=None)
def climb_stairs(n):
    """Number of ways to climb n stairs (1 or 2 steps at a time)."""
    if n <= 2:
        return n
    return climb_stairs(n-1) + climb_stairs(n-2)

print(climb_stairs(10))  # 89
\`\`\`

### Grid Paths

\`\`\`python
@lru_cache(maxsize=None)
def unique_paths(m, n):
    """Count paths from top-left to bottom-right in m×n grid."""
    if m == 1 or n == 1:
        return 1
    return unique_paths(m-1, n) + unique_paths(m, n-1)

print(unique_paths(3, 7))  # 28
\`\`\`

### Coin Change

\`\`\`python
@lru_cache(maxsize=None)
def min_coins(coins, amount):
    """Minimum coins needed to make amount."""
    if amount == 0:
        return 0
    if amount < 0:
        return float('inf')
    
    min_count = float('inf')
    for coin in coins:
        result = min_coins(coins, amount - coin)
        min_count = min(min_count, result + 1)
    
    return min_count

coins = (1, 5, 10, 25)  # Must be tuple for @lru_cache
print(min_coins(coins, 63))  # 6
\`\`\`

## Handling Mutable Arguments

\`\`\`python
# ❌ Wrong: Lists are mutable and unhashable
@lru_cache(maxsize=None)
def solve(arr):  # TypeError: unhashable type 'list'
    pass

# ✅ Correct: Convert to tuple
@lru_cache(maxsize=None)
def solve(arr):  # arr must be tuple
    pass

# Or use manual dictionary
memo = {}
def solve(arr):
    key = tuple(arr)  # Convert to hashable
    if key in memo:
        return memo[key]
    # ...
\`\`\`

## Memoization with Multiple Arguments

\`\`\`python
@lru_cache(maxsize=None)
def longest_common_subseq(s1, s2, i, j):
    """LCS of s1[i:] and s2[j:]."""
    if i >= len(s1) or j >= len(s2):
        return 0
    
    if s1[i] == s2[j]:
        return 1 + longest_common_subseq(s1, s2, i+1, j+1)
    
    return max(
        longest_common_subseq(s1, s2, i+1, j),
        longest_common_subseq(s1, s2, i, j+1)
    )

print(longest_common_subseq("abcde", "ace", 0, 0))  # 3
\`\`\`

## Clearing the Cache

\`\`\`python
# Clear @lru_cache
fib.cache_clear()

# Check cache stats
print(fib.cache_info())
# CacheInfo(hits=98, misses=101, maxsize=None, currsize=101)

# Manual cache - just reassign
memo = {}  # or memo.clear()
\`\`\`

## When to Use Memoization

| ✅ Good for | ❌ Not ideal for |
|-------------|------------------|
| Overlapping subproblems | Simple iterative problems |
| Recursive solutions | When order matters |
| Top-down thinking | Memory constrained |
| Quick implementation | Very deep recursion |

## Memoization vs Tabulation

| Aspect | Memoization | Tabulation |
|--------|-------------|------------|
| Direction | Top-down | Bottom-up |
| Implementation | Recursive + cache | Iterative + array |
| Computes | Only needed states | All states |
| Stack | Uses recursion stack | No recursion |
| Easier for | Complex state transitions | Simpler recurrences |

## Common Mistakes

\`\`\`python
# ❌ Wrong: Mutable default argument
def fib(n, memo={}):  # Shared across calls!
    pass

# ✅ Correct: Use None default
def fib(n, memo=None):
    if memo is None:
        memo = {}
    pass

# ❌ Wrong: Forgetting to check cache BEFORE computing
def fib(n):
    result = fib(n-1) + fib(n-2)  # Computed first!
    if n in memo:
        return memo[n]  # Too late!
    
# ✅ Correct: Check cache FIRST
def fib(n):
    if n in memo:
        return memo[n]
    result = fib(n-1) + fib(n-2)
    memo[n] = result
    return result
\`\`\`

## Key Takeaways

- **Memoization** = recursion + caching
- **@lru_cache** is the easiest way in Python
- **Check cache first**, then compute
- **Convert lists to tuples** for hashability
- **Reduces time** from exponential to polynomial
- **Trade-off**: memory for speed`,

    'dsa-tabulation': `# DSA Tabulation

## What is Tabulation?

**Tabulation** is a bottom-up dynamic programming technique where we:
1. **Build a table** of solutions to subproblems
2. **Start from smallest** subproblems
3. **Work up to** the original problem

\`\`\`
Fibonacci with tabulation:

Build table from bottom:
  dp[0] = 0
  dp[1] = 1
  dp[2] = dp[1] + dp[0] = 1
  dp[3] = dp[2] + dp[1] = 2
  dp[4] = dp[3] + dp[2] = 3
  dp[5] = dp[4] + dp[3] = 5

Answer: dp[5] = 5
\`\`\`

## The Core Idea

> **Solve subproblems in order, using previously computed results.**

\`\`\`python
# Basic pattern
def solve(n):
    # Initialize table
    dp = [0] * (n + 1)
    dp[base_case] = base_value
    
    # Fill table bottom-up
    for i in range(start, n + 1):
        dp[i] = # ... use dp[smaller values]
    
    return dp[n]
\`\`\`

## Fibonacci Example

### Tabulation Approach

\`\`\`python
def fib(n):
    """Fibonacci using tabulation - O(n) time, O(n) space."""
    if n <= 1:
        return n
    
    dp = [0] * (n + 1)
    dp[0] = 0
    dp[1] = 1
    
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    
    return dp[n]

print(fib(10))  # 55
\`\`\`

### Space Optimized

\`\`\`python
def fib_optimized(n):
    """Fibonacci - O(n) time, O(1) space."""
    if n <= 1:
        return n
    
    prev2, prev1 = 0, 1
    
    for i in range(2, n + 1):
        curr = prev1 + prev2
        prev2 = prev1
        prev1 = curr
    
    return prev1

print(fib_optimized(100))  # 354224848179261915075
\`\`\`

## Tabulation Template

\`\`\`python
def solve_dp(n):
    # Step 1: Define the table
    dp = [initial_value] * (n + 1)
    
    # Step 2: Set base cases
    dp[0] = base_case_0
    dp[1] = base_case_1
    
    # Step 3: Fill the table
    for i in range(2, n + 1):
        dp[i] = recurrence_relation(dp, i)
    
    # Step 4: Return answer
    return dp[n]
\`\`\`

## More Examples

### Climbing Stairs

\`\`\`python
def climb_stairs(n):
    """Number of ways to climb n stairs (1 or 2 steps at a time)."""
    if n <= 2:
        return n
    
    dp = [0] * (n + 1)
    dp[1] = 1
    dp[2] = 2
    
    for i in range(3, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    
    return dp[n]

print(climb_stairs(10))  # 89
\`\`\`

### Coin Change

\`\`\`python
def coin_change(coins, amount):
    """Minimum coins needed to make amount."""
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0  # 0 coins needed for amount 0
    
    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)
    
    return dp[amount] if dp[amount] != float('inf') else -1

print(coin_change([1, 5, 10, 25], 63))  # 6
\`\`\`

### Longest Increasing Subsequence

\`\`\`python
def length_of_lis(nums):
    """Length of longest increasing subsequence."""
    if not nums:
        return 0
    
    n = len(nums)
    dp = [1] * n  # Each element is a subsequence of length 1
    
    for i in range(1, n):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)
    
    return max(dp)

print(length_of_lis([10, 9, 2, 5, 3, 7, 101, 18]))  # 4
\`\`\`

### Unique Paths in Grid

\`\`\`python
def unique_paths(m, n):
    """Count paths from top-left to bottom-right."""
    dp = [[1] * n for _ in range(m)]
    
    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = dp[i-1][j] + dp[i][j-1]
    
    return dp[m-1][n-1]

print(unique_paths(3, 7))  # 28
\`\`\`

### 0/1 Knapsack

\`\`\`python
def knapsack(weights, values, W):
    """0/1 Knapsack using tabulation."""
    n = len(weights)
    dp = [[0] * (W + 1) for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        for w in range(W + 1):
            dp[i][w] = dp[i-1][w]  # Don't take item
            if weights[i-1] <= w:
                dp[i][w] = max(dp[i][w], 
                              values[i-1] + dp[i-1][w - weights[i-1]])
    
    return dp[n][W]

print(knapsack([2, 2, 3], [6, 10, 12], 5))  # 22
\`\`\`

## Memoization vs Tabulation

| Aspect | Memoization | Tabulation |
|--------|-------------|------------|
| **Direction** | Top-down | Bottom-up |
| **Style** | Recursive | Iterative |
| **What's computed** | Only needed states | All states |
| **Stack usage** | Recursion stack | No recursion |
| **When to use** | Complex dependencies | Clear order |
| **Speed** | Slightly slower | Slightly faster |
| **Debugging** | Harder | Easier |

### Converting Memoization to Tabulation

\`\`\`python
# Memoization (top-down)
@lru_cache(maxsize=None)
def fib_memo(n):
    if n <= 1:
        return n
    return fib_memo(n-1) + fib_memo(n-2)

# Tabulation (bottom-up) - same logic, different direction
def fib_tab(n):
    if n <= 1:
        return n
    dp = [0] * (n + 1)
    dp[0], dp[1] = 0, 1
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]
\`\`\`

## Space Optimization Patterns

### Pattern 1: Only Previous States Needed

\`\`\`python
# Before: O(n) space
dp = [0] * (n + 1)
for i in range(2, n + 1):
    dp[i] = dp[i-1] + dp[i-2]

# After: O(1) space
prev2, prev1 = 0, 1
for i in range(2, n + 1):
    curr = prev1 + prev2
    prev2, prev1 = prev1, curr
\`\`\`

### Pattern 2: Only Previous Row Needed

\`\`\`python
# Before: O(m×n) space
dp = [[0] * n for _ in range(m)]

# After: O(n) space
dp = [0] * n
for i in range(m):
    new_dp = [0] * n
    for j in range(n):
        new_dp[j] = # ... use dp[j-1] and dp[j]
    dp = new_dp
\`\`\`

## Common Mistakes

\`\`\`python
# ❌ Wrong: Off-by-one in table size
dp = [0] * n  # Should be n+1 if accessing dp[n]

# ❌ Wrong: Wrong iteration order
for i in range(n, -1, -1):  # May need forward order!
    dp[i] = dp[i+1] + dp[i+2]  # Out of bounds!

# ❌ Wrong: Forgetting base cases
dp = [0] * (n + 1)
for i in range(n + 1):  # Should start from 2
    dp[i] = dp[i-1] + dp[i-2]  # IndexError at i=0,1

# ✅ Correct
dp = [0] * (n + 1)
dp[0], dp[1] = 0, 1
for i in range(2, n + 1):
    dp[i] = dp[i-1] + dp[i-2]
\`\`\`

## When to Use Tabulation

| ✅ Good for | ❌ Not ideal for |
|-------------|------------------|
| Clear subproblem order | Complex state transitions |
| Need all subproblems | Sparse state space |
| Avoiding recursion | Deep dependencies |
| Space optimization | Quick prototyping |

## Key Takeaways

- **Tabulation** = build table bottom-up
- **Iterative** — no recursion stack
- **Computes all states** in order
- **Space optimization** often possible
- **Faster than memoization** in practice
- **Order matters** — solve smaller problems first`,

    'dsa-dynamic-programming': `# DSA Dynamic Programming

## What is Dynamic Programming?

**Dynamic Programming (DP)** is an optimization technique that:
1. Breaks problems into **overlapping subproblems**
2. **Stores solutions** to avoid recomputation
3. Builds optimal solution from subproblem solutions

\`\`\`
DP = Recursion + Memoization
   = Dividing into subproblems + Reusing solutions
\`\`\`

## When to Use DP

A problem is suitable for DP when it has:

### 1. Optimal Substructure

The optimal solution contains optimal solutions to subproblems.

\`\`\`
Shortest path A → D:
  If optimal path is A → B → C → D,
  then A → B → C must also be optimal for A → C.
\`\`\`

### 2. Overlapping Subproblems

The same subproblems are solved multiple times.

\`\`\`
Fibonacci:
  fib(5) needs fib(4) and fib(3)
  fib(4) needs fib(3) and fib(2)
  
  fib(3) is computed twice without DP!
\`\`\`

## Two Approaches

| Approach | Direction | Implementation |
|----------|-----------|----------------|
| **Memoization** | Top-down | Recursion + cache |
| **Tabulation** | Bottom-up | Iteration + table |

\`\`\`python
# Memoization (Top-down)
@lru_cache
def fib(n):
    if n <= 1: return n
    return fib(n-1) + fib(n-2)

# Tabulation (Bottom-up)
def fib(n):
    dp = [0, 1] + [0] * (n-1)
    for i in range(2, n+1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]
\`\`\`

## DP Problem Solving Framework

### Step 1: Define the State

What information do we need to describe a subproblem?

\`\`\`
Fibonacci: dp[n] = nth Fibonacci number
Knapsack: dp[i][w] = max value with first i items and capacity w
LCS: dp[i][j] = LCS of s1[:i] and s2[:j]
\`\`\`

### Step 2: Define the Recurrence

How does the current state relate to smaller states?

\`\`\`python
# Fibonacci
dp[n] = dp[n-1] + dp[n-2]

# Knapsack
dp[i][w] = max(dp[i-1][w], value[i] + dp[i-1][w-weight[i]])

# LCS
if s1[i] == s2[j]:
    dp[i][j] = 1 + dp[i-1][j-1]
else:
    dp[i][j] = max(dp[i-1][j], dp[i][j-1])
\`\`\`

### Step 3: Define Base Cases

What are the smallest subproblems?

\`\`\`python
# Fibonacci
dp[0] = 0, dp[1] = 1

# Knapsack
dp[0][w] = 0 for all w

# LCS
dp[0][j] = dp[i][0] = 0
\`\`\`

### Step 4: Determine Iteration Order

Which subproblems need to be solved first?

\`\`\`python
# Fibonacci: left to right (i-1, i-2 before i)
for i in range(2, n+1)

# 2D grid: row by row, column by column
for i in range(m):
    for j in range(n):
\`\`\`

## Classic DP Problems

### 1. Fibonacci

\`\`\`python
def fib(n):
    dp = [0, 1]
    for i in range(2, n + 1):
        dp.append(dp[-1] + dp[-2])
    return dp[n]
\`\`\`

### 2. Coin Change

\`\`\`python
def coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    
    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)
    
    return dp[amount] if dp[amount] != float('inf') else -1
\`\`\`

### 3. Longest Common Subsequence

\`\`\`python
def lcs(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = 1 + dp[i-1][j-1]
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    
    return dp[m][n]
\`\`\`

### 4. Longest Increasing Subsequence

\`\`\`python
def lis(nums):
    n = len(nums)
    dp = [1] * n
    
    for i in range(1, n):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)
    
    return max(dp)
\`\`\`

### 5. Edit Distance

\`\`\`python
def edit_distance(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(dp[i-1][j],      # delete
                                   dp[i][j-1],      # insert
                                   dp[i-1][j-1])    # replace
    
    return dp[m][n]
\`\`\`

## DP Patterns

| Pattern | Examples |
|---------|----------|
| **Linear** | Fibonacci, Climbing Stairs |
| **Grid** | Unique Paths, Min Path Sum |
| **String** | LCS, Edit Distance, Palindrome |
| **Knapsack** | 0/1 Knapsack, Subset Sum |
| **Interval** | Matrix Chain, Burst Balloons |
| **State Machine** | Stock Problems |

## Complexity Gain

| Without DP | With DP |
|------------|---------|
| O(2ⁿ) | O(n) or O(n²) |
| Exponential | Polynomial |

\`\`\`
Fibonacci without DP: O(2ⁿ) — 2⁴⁰ ≈ 10¹² operations
Fibonacci with DP: O(n) — 40 operations

1 trillion vs 40!
\`\`\`

## Common Mistakes

\`\`\`python
# ❌ Wrong: No memoization (exponential)
def fib(n):
    if n <= 1: return n
    return fib(n-1) + fib(n-2)  # Recomputes everything!

# ❌ Wrong: Wrong base case
dp[0] = 1  # Should be 0 for Fibonacci

# ❌ Wrong: Wrong iteration order
for i in range(n, 0, -1):  # May need forward!
    dp[i] = dp[i+1]  # Uses uncomputed values

# ❌ Wrong: Index out of bounds
for i in range(n):
    dp[i] = dp[i-1]  # Fails at i=0!
\`\`\`

## Interview Tips

### Recognizing DP Problems

- "Minimum/maximum" + choices
- "Count number of ways"
- "Is it possible to..."
- "Optimal substructure" present
- Overlapping subproblems

### Approach

1. Start with **recursive solution**
2. Identify **overlapping subproblems**
3. Add **memoization**
4. Convert to **tabulation** if needed
5. **Optimize space** if possible

## Key Takeaways

- **DP = Recursion + Storing Results**
- Look for **optimal substructure** + **overlapping subproblems**
- **Memoization** (top-down) vs **Tabulation** (bottom-up)
- **Define state, recurrence, base cases, order**
- **Reduces exponential to polynomial**
- **Practice patterns**: linear, grid, string, knapsack`,

    'dsa-greedy-algorithms': `# DSA Greedy Algorithms

## What is a Greedy Algorithm?

A **greedy algorithm** makes the **locally optimal choice** at each step, hoping to find a **global optimum**.

\`\`\`
Greedy approach:
  At each step → pick the BEST available option
  Never reconsider → move forward
  Hope → local best leads to global best
\`\`\`

## The Core Idea

> **Always choose what looks best right now.**

\`\`\`
Making change for 67 cents:
  Greedy: Pick largest coin ≤ remaining

  67 - 25 = 42  (use quarter)
  42 - 25 = 17  (use quarter)
  17 - 10 = 7   (use dime)
  7 - 5 = 2     (use nickel)
  2 - 1 = 1     (use penny)
  1 - 1 = 0     (use penny)

  Total: 6 coins (optimal for US coins!)
\`\`\`

## When Greedy Works

Greedy works when the problem has:

### 1. Greedy Choice Property

A locally optimal choice leads to a globally optimal solution.

### 2. Optimal Substructure

An optimal solution contains optimal solutions to subproblems.

\`\`\`
NOT all problems have these properties!

Counterexample: Coins = [1, 3, 4], Amount = 6
  Greedy: 4 + 1 + 1 = 3 coins
  Optimal: 3 + 3 = 2 coins ❌

Greedy fails here!
\`\`\`

## Classic Greedy Problems

### 1. Activity Selection

Select maximum non-overlapping activities.

\`\`\`python
def activity_selection(activities):
    """
    Select max activities that don't overlap.
    activities: list of (start, end) tuples
    """
    # Sort by end time
    activities.sort(key=lambda x: x[1])
    
    selected = []
    last_end = 0
    
    for start, end in activities:
        if start >= last_end:
            selected.append((start, end))
            last_end = end
    
    return selected

activities = [(1, 4), (3, 5), (0, 6), (5, 7), (3, 9), (5, 9), (6, 10)]
print(activity_selection(activities))
# [(1, 4), (5, 7), (6, 10)] - but actually should check times
\`\`\`

**Greedy choice:** Always pick the activity that ends earliest.

### 2. Fractional Knapsack

\`\`\`python
def fractional_knapsack(items, capacity):
    """
    Maximize value with fractional items allowed.
    items: list of (weight, value) tuples
    """
    # Sort by value/weight ratio
    items = sorted(items, key=lambda x: x[1]/x[0], reverse=True)
    
    total_value = 0
    remaining = capacity
    
    for weight, value in items:
        if weight <= remaining:
            # Take whole item
            total_value += value
            remaining -= weight
        else:
            # Take fraction
            total_value += value * (remaining / weight)
            break
    
    return total_value

items = [(10, 60), (20, 100), (30, 120)]
print(fractional_knapsack(items, 50))  # 240
\`\`\`

**Greedy choice:** Always pick the item with highest value-to-weight ratio.

### 3. Job Scheduling

\`\`\`python
def job_scheduling(jobs):
    """
    Schedule jobs to maximize profit.
    jobs: list of (deadline, profit) tuples
    """
    # Sort by profit (descending)
    jobs = sorted(enumerate(jobs), key=lambda x: x[1][1], reverse=True)
    
    max_deadline = max(job[1][0] for job in jobs)
    slots = [-1] * max_deadline
    total_profit = 0
    
    for job_id, (deadline, profit) in jobs:
        # Find latest available slot before deadline
        for slot in range(min(deadline, max_deadline) - 1, -1, -1):
            if slots[slot] == -1:
                slots[slot] = job_id
                total_profit += profit
                break
    
    return total_profit

jobs = [(2, 100), (1, 19), (2, 27), (1, 25), (3, 15)]
print(job_scheduling(jobs))  # 142
\`\`\`

### 4. Huffman Coding

\`\`\`python
import heapq

def huffman_coding(frequencies):
    """Build Huffman tree and return codes."""
    heap = [[freq, [char, ""]] for char, freq in frequencies.items()]
    heapq.heapify(heap)
    
    while len(heap) > 1:
        lo = heapq.heappop(heap)
        hi = heapq.heappop(heap)
        
        for pair in lo[1:]:
            pair[1] = '0' + pair[1]
        for pair in hi[1:]:
            pair[1] = '1' + pair[1]
        
        heapq.heappush(heap, [lo[0] + hi[0]] + lo[1:] + hi[1:])
    
    return sorted(heap[0][1:], key=lambda x: (len(x[1]), x))

freq = {'a': 5, 'b': 9, 'c': 12, 'd': 13, 'e': 16, 'f': 45}
print(huffman_coding(freq))
\`\`\`

**Greedy choice:** Always merge the two lowest-frequency nodes.

### 5. Dijkstra's Algorithm

\`\`\`python
import heapq

def dijkstra(graph, start):
    """Shortest paths from start to all nodes."""
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    pq = [(0, start)]
    
    while pq:
        dist, node = heapq.heappop(pq)
        
        if dist > distances[node]:
            continue
        
        for neighbor, weight in graph[node]:
            new_dist = dist + weight
            if new_dist < distances[neighbor]:
                distances[neighbor] = new_dist
                heapq.heappush(pq, (new_dist, neighbor))
    
    return distances
\`\`\`

**Greedy choice:** Always process the closest unvisited node.

## Greedy vs Dynamic Programming

| Aspect | Greedy | DP |
|--------|--------|-----|
| Makes | Local best choice | All choices considered |
| Revisits | Never | Stores and reuses |
| Correctness | May not be optimal | Always optimal |
| Speed | Usually faster | Can be slower |
| Proof | Need to prove works | Recurrence proves it |

\`\`\`
When to use which?

Greedy:
  - Problem has greedy choice property
  - Local optimal → global optimal
  - Simpler and faster

DP:
  - Need to consider all possibilities
  - Overlapping subproblems
  - Greedy doesn't work
\`\`\`

## Proving Greedy Works

### Exchange Argument

Show that any solution can be transformed into the greedy solution without making it worse.

\`\`\`
Activity Selection Proof:
  1. Greedy picks activity with earliest end time (A)
  2. If optimal picks different activity (B) first:
     - A ends before or when B ends
     - Swapping B for A doesn't invalidate later choices
     - New solution is still valid and optimal
  3. Therefore, greedy choice is safe
\`\`\`

## Common Greedy Problems

| Problem | Greedy Strategy |
|---------|-----------------|
| Activity Selection | Earliest end time |
| Fractional Knapsack | Highest value/weight |
| Job Scheduling | Highest profit first |
| Huffman Coding | Lowest frequency first |
| Dijkstra | Shortest distance first |
| Prim's MST | Minimum edge weight |
| Kruskal's MST | Sort edges, add smallest |

## When Greedy Fails

\`\`\`python
# 0/1 Knapsack - Greedy FAILS
items = [(10, 60), (20, 100), (30, 120)]  # (weight, value)
capacity = 50

# Greedy (by value/weight): Take item 1 (10, 60), then item 2 (20, 100)
# Value = 160, Weight = 30

# Optimal: Take item 2 (20, 100) and item 3 (30, 120)
# Value = 220, Weight = 50

# Greedy gives 160, optimal is 220!
\`\`\`

## Interview Tips

### Recognize Greedy Problems

- "Maximum/minimum with constraint"
- "Schedule/select optimal subset"
- "Can be solved by sorting"
- Problem seems too simple for DP

### Approach

1. **Identify** the greedy choice
2. **Prove** it works (or test counterexamples)
3. **Implement** the algorithm
4. **Verify** with test cases

### Common Mistakes

\`\`\`python
# ❌ Wrong: Assuming greedy always works
def knapsack_greedy(items, W):  # FAILS for 0/1 knapsack!
    items.sort(key=lambda x: x[1]/x[0], reverse=True)
    # ... greedy selection

# ❌ Wrong: Wrong sorting criteria
activities.sort(key=lambda x: x[0])  # By start time - WRONG!
# Should sort by end time

# ❌ Wrong: Not considering all constraints
# Greedy for coins works for US coins, not all coin systems!
\`\`\`

## Complexity

| Problem | Time Complexity |
|---------|-----------------|
| Activity Selection | O(n log n) |
| Fractional Knapsack | O(n log n) |
| Huffman Coding | O(n log n) |
| Dijkstra | O(E log V) |

Most greedy algorithms are O(n log n) due to sorting.

## Key Takeaways

- **Greedy** = locally optimal at each step
- **Works when** local best leads to global best
- **Faster than DP** but doesn't always work
- **Prove correctness** before using
- **Common patterns**: sorting + selection
- **Examples**: activity selection, Huffman, Dijkstra, MST`
  };

  return content[slug] || 'Coming soon';
}

async function main() {
  console.log('🌱 Starting DSA database seeding...');

  console.log('Clearing existing data...');
  await prisma.dSALesson.deleteMany();
  await prisma.dSATopic.deleteMany();

  let totalTopics = 0;
  let totalLessons = 0;

  for (let i = 0; i < topicsWithLessons.length; i++) {
    const topicData = topicsWithLessons[i];
    const topicSlug = createSlug(topicData.title);
    
    console.log(`\n📚 Creating topic: ${topicData.title}`);
    
    const topic = await prisma.dSATopic.upsert({
      where: { slug: topicSlug },
      update: {
        title: topicData.title,
        order: i + 1,
      },
      create: {
        slug: topicSlug,
        title: topicData.title,
        order: i + 1,
      },
    });

    totalTopics++;

    const lessonsData = topicData.lessons.map((lessonTitle, index) => {
      const lessonSlug = createSlug(lessonTitle);
      const lessonContent = getLessonContent(lessonSlug);
      
      return {
        topicId: topic.id,
        slug: lessonSlug,
        title: lessonTitle,
        content: lessonContent,
        difficulty: 'Easy',
        codeExamples: {},
        order: index + 1,
      };
    });

    await prisma.dSALesson.createMany({
      data: lessonsData,
    });

    totalLessons += lessonsData.length;
    lessonsData.forEach(lesson => console.log(`  ✓ ${lesson.title}`));
  }

  console.log(`\n✅ Seeding completed successfully!`);
  console.log(`📊 Summary:`);
  console.log(`   - Topics: ${totalTopics}`);
  console.log(`   - Lessons: ${totalLessons}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
