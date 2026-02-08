const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedCheatsheets() {
  console.log('📝 Seeding Cheatsheets...\n');

  // Clear existing data
  await prisma.cheatsheet.deleteMany({});
  await prisma.cheatsheetCategory.deleteMany({});

  // ============================================================================
  // CATEGORIES
  // ============================================================================

  const categories = await Promise.all([
    prisma.cheatsheetCategory.create({
      data: {
        slug: 'programming',
        title: 'Programming Languages',
        description: 'Quick reference for popular programming languages',
        icon: '💻',
        color: 'from-blue-500 to-cyan-500',
        order: 1
      }
    }),
    prisma.cheatsheetCategory.create({
      data: {
        slug: 'frontend',
        title: 'Frontend Development',
        description: 'HTML, CSS, JavaScript, React, and modern frontend tools',
        icon: '🎨',
        color: 'from-purple-500 to-pink-500',
        order: 2
      }
    }),
    prisma.cheatsheetCategory.create({
      data: {
        slug: 'backend',
        title: 'Backend Development',
        description: 'Server-side technologies and APIs',
        icon: '⚙️',
        color: 'from-green-500 to-emerald-500',
        order: 3
      }
    }),
    prisma.cheatsheetCategory.create({
      data: {
        slug: 'databases',
        title: 'Databases',
        description: 'SQL and NoSQL database systems',
        icon: '🗄️',
        color: 'from-orange-500 to-red-500',
        order: 4
      }
    }),
    prisma.cheatsheetCategory.create({
      data: {
        slug: 'devops',
        title: 'DevOps & Tools',
        description: 'Git, Docker, Kubernetes, CI/CD',
        icon: '🔧',
        color: 'from-yellow-500 to-orange-500',
        order: 5
      }
    }),
    prisma.cheatsheetCategory.create({
      data: {
        slug: 'ai-ml',
        title: 'AI & Machine Learning',
        description: 'ML frameworks and data science tools',
        icon: '🤖',
        color: 'from-indigo-500 to-purple-500',
        order: 6
      }
    }),
    prisma.cheatsheetCategory.create({
      data: {
        slug: 'dsa',
        title: 'Data Structures & Algorithms',
        description: 'Essential DSA concepts and patterns',
        icon: '📊',
        color: 'from-teal-500 to-green-500',
        order: 7
      }
    })
  ]);

  console.log('✅ Created 7 categories\n');

  // ============================================================================
  // PROGRAMMING LANGUAGES
  // ============================================================================

  // Python Cheatsheet
  await prisma.cheatsheet.create({
    data: {
      categoryId: categories[0].id,
      slug: 'python',
      title: 'Python',
      subtitle: 'High-level, interpreted programming language',
      description: 'Comprehensive Python syntax and common operations',
      icon: '🐍',
      difficulty: 'Beginner',
      tags: ['scripting', 'data-science', 'web', 'automation'],
      popularity: 100,
      overview: `Python is a versatile, high-level programming language known for its clean syntax and readability. 
      
**When to use:**
- Web development (Django, Flask)
- Data science and ML
- Automation scripts
- API development
- General-purpose programming`,
      syntax: {
        variables: {
          title: 'Variables & Data Types',
          code: `# Variables (no declaration needed)
name = "John"
age = 25
height = 5.9
is_student = True

# Multiple assignment
x, y, z = 1, 2, 3

# Type conversion
num_str = "42"
num_int = int(num_str)  # 42
num_float = float(num_str)  # 42.0`
        },
        dataStructures: {
          title: 'Data Structures',
          code: `# Lists (mutable)
fruits = ["apple", "banana", "cherry"]
fruits.append("orange")
fruits[0]  # "apple"

# Tuples (immutable)
coordinates = (10, 20)

# Dictionaries
person = {"name": "John", "age": 25}
person["name"]  # "John"

# Sets (unique values)
numbers = {1, 2, 3, 3, 4}  # {1, 2, 3, 4}`
        },
        controlFlow: {
          title: 'Control Flow',
          code: `# If-else
if age >= 18:
    print("Adult")
elif age >= 13:
    print("Teen")
else:
    print("Child")

# For loop
for fruit in fruits:
    print(fruit)

for i in range(5):  # 0 to 4
    print(i)

# While loop
count = 0
while count < 5:
    print(count)
    count += 1

# List comprehension
squares = [x**2 for x in range(10)]`
        },
        functions: {
          title: 'Functions',
          code: `# Basic function
def greet(name):
    return f"Hello, {name}!"

# Default parameters
def greet(name="World"):
    return f"Hello, {name}!"

# Multiple return values
def get_coords():
    return 10, 20

x, y = get_coords()

# Lambda functions
square = lambda x: x**2
result = square(5)  # 25

# *args and **kwargs
def sum_all(*args):
    return sum(args)

def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")`
        }
      },
      operations: {
        strings: {
          title: 'String Operations',
          code: `# String methods
text = "Hello World"
text.upper()  # "HELLO WORLD"
text.lower()  # "hello world"
text.replace("World", "Python")  # "Hello Python"
text.split()  # ["Hello", "World"]

# String formatting
name = "John"
age = 25
f"My name is {name} and I'm {age}"  # f-strings
"My name is {} and I'm {}".format(name, age)  # format()
"My name is %s and I'm %d" % (name, age)  # old style

# String slicing
text[0:5]  # "Hello"
text[:5]   # "Hello"
text[6:]   # "World"
text[-5:]  # "World"`
        },
        lists: {
          title: 'List Operations',
          code: `numbers = [1, 2, 3, 4, 5]

# Add/Remove
numbers.append(6)  # Add to end
numbers.insert(0, 0)  # Insert at index
numbers.remove (2)  # Remove first occurrence
numbers.pop()  # Remove and return last item
numbers.pop(0)  # Remove at index

# Slicing
numbers[1:4]  # [2, 3, 4]
numbers[::2]  # Every other element
numbers[::-1]  # Reverse list

# Useful methods
len(numbers)  # Length
max(numbers)  # Maximum value
min(numbers)  # Minimum value
sum(numbers)  # Sum of all elements
sorted(numbers)  # Return sorted list
numbers.sort()  # Sort in place`
        },
        fileIO: {
          title: 'File I/O',
          code: `# Read file
with open('file.txt', 'r') as f:
    content = f.read()  # Read entire file
    lines = f.readlines()  # Read lines as list

# Write file
with open('file.txt', 'w') as f:
    f.write("Hello\\n")
    f.write("World\\n")

# Append to file
with open('file.txt', 'a') as f:
    f.write("Appended text\\n")

# Read file line by line
with open('file.txt', 'r') as f:
    for line in f:
        print(line.strip())`
        }
      },
      examples: {
        fibonacci: {
          title: 'Fibonacci Sequence',
          code: `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Or iterative
def fibonacci_iter(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a`
        },
        readJSON: {
          title: 'Working with JSON',
          code: `import json

# Parse JSON string
json_str = '{"name": "John", "age": 25}'
data = json.loads(json_str)

# Convert to JSON
person = {"name": "John", "age": 25}
json_str = json.dumps(person)

# Read JSON file
with open('data.json', 'r') as f:
    data = json.load(f)

# Write JSON file
with open('data.json', 'w') as f:
    json.dump(person, f, indent=2)`
        },
        listComprehension: {
          title: 'List Comprehensions',
          code: `# Basic
squares = [x**2 for x in range(10)]

# With condition
evens = [x for x in range(20) if x % 2 == 0]

# Nested
matrix = [[i*j for j in range(5)] for i in range(5)]

# Dictionary comprehension
square_dict = {x: x**2 for x in range(5)}

# Set comprehension
unique_chars = {c for c in "hello world" if c != ' '}`
        }
      },
      mistakes: [
        'Forgetting to close files (use `with` statement)',
        'Modifying list while iterating over it',
        'Using mutable default arguments in functions',
        'Not handling exceptions properly',
        'Confusing `==` (equality) with `is` (identity)',
        'Not using virtual environments for project dependencies'
      ],
      tips: [
        'Use list comprehensions for cleaner, faster code',
        'Always use `with` for file operations',
        'Understand the difference between `is` and `==`',
        'Know when to use tuples vs lists',
        'Practice implementing common algorithms without libraries',
        'Understand time/space complexity of built-in operations'
      ],
      relatedCheatsheets: ['javascript', 'java'],
      relatedRoadmaps: ['full-stack-developer', 'data-scientist', 'ai-ml-engineer'],
      relatedDSA: ['arrays', 'strings', 'sorting']
    }
  });

  console.log('✅ Created Python cheatsheet');

  // JavaScript Cheatsheet
  await prisma.cheatsheet.create({
    data: {
      categoryId: categories[0].id,
      slug: 'javascript',
      title: 'JavaScript',
      subtitle: 'The language of the web',
      description: 'Modern JavaScript ES6+ syntax and patterns',
      icon: '⚡',
      difficulty: 'Beginner',
      tags: ['web', 'frontend', 'backend', 'nodejs'],
      popularity: 98,
      overview: `JavaScript is the programming language of the web, essential for both frontend and backend development.

**When to use:**
- Frontend web development
- Backend with Node.js
- Mobile apps (React Native)
- Desktop apps (Electron)
- Full-stack development`,
      syntax: {
        variables: {
          title: 'Variables & Scope',
          code: `// let - block scoped, reassignable
let name = "John";
name = "Jane";  // OK

// const - block scoped, not reassignable
const PI = 3.14;
// PI = 3.14159;  // ERROR

// var - function scoped (avoid)
var oldWay = "don't use";

// Destructuring
const [a, b] = [1, 2];
const {x, y} = {x: 10, y: 20};

// Spread operator
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];  // [1,2,3,4,5]`
        },
        functions: {
          title: 'Functions',
          code: `// Function declaration
function greet(name) {
    return \`Hello, \${name}!\`;
}

// Arrow function
const greet = (name) => \`Hello, \${name}!\`;
const greet = name => \`Hello, \${name}!\`;  // single param

// Default parameters
const greet = (name = "World") => \`Hello, \${name}!\`;

// Rest parameters
const sum = (...numbers) => numbers.reduce((a, b) => a + b);

// Async/Await
async function fetchData() {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}`
        },
        arrays: {
          title: 'Array Methods',
          code: `const numbers = [1, 2, 3, 4, 5];

// Iteration
numbers.forEach(n => console.log(n));
numbers.map(n => n * 2);  // [2,4,6,8,10]
numbers.filter(n => n > 2);  // [3,4,5]
numbers.reduce((sum, n) => sum + n, 0);  // 15
numbers.find(n => n > 3);  // 4
numbers.some(n => n > 3);  // true
numbers.every(n => n > 0);  // true

// Manipulation
numbers.push(6);  // Add to end
numbers.pop();  // Remove from end
numbers.unshift(0);  // Add to start
numbers.shift();  // Remove from start
numbers.splice(1, 2);  // Remove 2 items at index 1

// Others
numbers.slice(1, 3);  // Copy items [1,3)
numbers.concat([6, 7]);  // Combine arrays
numbers.join(', ');  // "1, 2, 3, 4, 5"`
        },
        objects: {
          title: 'Objects & Classes',
          code: `// Object literal
const person = {
    name: "John",
    age: 25,
    greet() {
        return \`Hi, I'm \${this.name}\`;
    }
};

// Accessing properties
person.name  // "John"
person['age']  // 25

// Object methods
Object.keys(person);  // ['name', 'age', 'greet']
Object.values(person);  // ['John', 25, function]
Object.entries(person);  // [['name','John'], ...]

// Class syntax
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    greet() {
        return \`Hi, I'm \${this.name}\`;
    }
}

const john = new Person("John", 25);`
        }
      },
      operations: {
        promises: {
          title: 'Promises & Async/Await',
          code: `// Creating a Promise
const fetchData = () => {
    return new Promise((resolve, reject) => {
        // Async operation
        if (success) {
            resolve(data);
        } else {
            reject(error);
        }
    });
};

// Using Promises
fetchData()
    .then(data => console.log(data))
    .catch(error => console.error(error))
    .finally(() => console.log('Done'));

// Async/Await
async function getData() {
    try {
        const data = await fetchData();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

// Promise.all - wait for all
const results = await Promise.all([promise1, promise2]);

// Promise.race - wait for first
const result = await Promise.race([promise1, promise2]);`
        },
        modules: {
          title: 'ES6 Modules',
          code: `// Exporting
export const name = "John";
export function greet() { }
export default class Person { }

// Importing
import Person from './person.js';
import { name, greet } from './utils.js';
import { name as userName } from './utils.js';
import * as utils from './utils.js';

// Dynamic import
const module = await import('./module.js');`
        },
        dom: {
          title: 'DOM Manipulation',
          code: `// Selecting elements
const el = document.getElementById('id');
const el = document.querySelector('.class');
const els = document.querySelectorAll('div');

// Modifying elements
el.textContent = 'New text';
el.innerHTML = '<span>HTML</span>';
el.style.color = 'red';
el.classList.add('active');
el.classList.remove('hidden');
el.classList.toggle('show');

// Creating elements
const div = document.createElement('div');
div.textContent = 'Hello';
document.body.appendChild(div);

// Event listeners
el.addEventListener('click', (e) => {
    console.log('Clicked!', e.target);
});`
        }
      },
      examples: {
        debounce: {
          title: 'Debounce Function',
          code: `function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

// Usage
const search = debounce((query) => {
    console.log('Searching for:', query);
}, 300);

input.addEventListener('input', (e) => search(e.target.value));`
        },
        fetchAPI: {
          title: 'Fetch API',
          code: `// GET request
const response = await fetch('https://api.example.com/data');
const data = await response.json();

// POST request
const response = await fetch('https://api.example.com/data', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: 'John', age: 25 })
});

// Error handling
try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network error');
    const data = await response.json();
} catch (error) {
    console.error('Fetch error:', error);
}`
        }
      },
      mistakes: [
        'Forgetting to use `const`/`let` instead of `var`',
        'Not understanding `this` context in arrow functions',
        'Mutating state directly in React',
        'Not handling rejected promises',
        'Comparing with `==` instead of `===`',
        'Forgetting `async`/`await` error handling'
      ],
      tips: [
        'Master ES6+ features (arrow functions, destructuring, spread)',
        'Understand closures and scope',
        'Know the difference between `==` and `===`',
        'Practice async patterns (Promises, async/await)',
        'Understand event loop and asynchronous JavaScript',
        'Learn common array methods (map, filter, reduce)'
      ],
      relatedCheatsheets: ['typescript', 'react', 'nodejs'],
      relatedRoadmaps: ['full-stack-developer', 'frontend-developer'],
      relatedDSA: ['arrays', 'strings', 'hashmaps']
    }
  });

  console.log('✅ Created JavaScript cheatsheet');

  // ============================================================================
  // FRONTEND
  // ============================================================================

  // React Cheatsheet
  await prisma.cheatsheet.create({
    data: {
      categoryId: categories[1].id,
      slug: 'react',
      title: 'React',
      subtitle: 'A JavaScript library for building user interfaces',
      description: 'React hooks, components, and essential patterns',
      icon: '⚛️',
      difficulty: 'Intermediate',
      tags: ['frontend', 'ui', 'components', 'jsx'],
      popularity: 95,
      overview: `React is a JavaScript library for building user interfaces with reusable components.

**When to use:**
- Single Page Applications (SPAs)
- Dynamic user interfaces
- Component-based architecture
- Mobile apps (React Native)`,
      syntax: {
        components: {
          title: 'Components',
          code: `// Function Component
function Greeting({ name }) {
    return <h1>Hello, {name}!</h1>;
}

// Arrow function component
const Greeting = ({ name }) => {
    return <h1>Hello, {name}!</h1>;
};

// With children
const Card = ({ children }) => {
    return <div className="card">{children}</div>;
};

// Usage
<Greeting name="John" />
<Card>
    <h2>Title</h2>
    <p>Content</p>
</Card>`
        },
        hooks: {
          title: 'React Hooks',
          code: `import { useState, useEffect, useRef, useMemo } from 'react';

// useState - state management
const [count, setCount] = useState(0);
const [user, setUser] = useState({ name: 'John', age: 25 });

// useEffect - side effects
useEffect(() => {
    // Runs after every render
    console.log('Component rendered');
}, []); // Empty array = run once

useEffect(() => {
    // Runs when count changes
    document.title = \`Count: \${count}\`;
}, [count]);

// useRef - mutable reference
const inputRef = useRef(null);
inputRef.current.focus();

// useMemo - memoize expensive calculations
const expensiveValue = useMemo(() => {
    return computeExpensiveValue(a, b);
}, [a, b]);

// useCallback - memoize functions
const handleClick = useCallback(() => {
    console.log(count);
}, [count]);`
        },
        jsx: {
          title: 'JSX Syntax',
          code: `// JSX expressions
const element = <h1>Hello, {name}!</h1>;

// Attributes (use camelCase)
<div className="container" onClick={handleClick}>
    <img src={imageUrl} alt="description" />
    <input type="text" onChange={handleChange} />
</div>

// Conditional rendering
{isLoggedIn && <Dashboard />}
{isLoggedIn ? <Dashboard /> : <Login />}

// Lists and keys
{items.map(item => (
    <li key={item.id}>{item.name}</li>
))}

// Fragments
<>
    <h1>Title</h1>
    <p>Paragraph</p>
</>`
        }
      },
      operations: {
        stateUpdates: {
          title: 'State Updates',
          code: `// Simple state
const [count, setCount] = useState(0);
setCount(count + 1);
setCount(prev => prev + 1);  // Functional update

// Object state
const [user, setUser] = useState({ name: '', age: 0 });
setUser({ ...user, name: 'John' });  // Spread existing state
setUser(prev => ({ ...prev, age: 26 }));

// Array state
const [items, setItems] = useState([]);
setItems([...items, newItem]);  // Add
setItems(items.filter(item => item.id !== id));  // Remove
setItems(items.map(item => 
    item.id === id ? { ...item, done: true } : item
));  // Update`
        },
        forms: {
          title: 'Form Handling',
          code: `function Form() {
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input
                name="name"
                value={formData.name}
                onChange={handleChange}
            />
            <input
                name="email"
                value={formData.email}
                onChange={handleChange}
            />
            <button type="submit">Submit</button>
        </form>
    );
}`
        },
        dataFetching: {
          title: 'Data Fetching',
          code: `function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch('/api/users');
                const data = await response.json();
                setUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        
        fetchUsers();
    }, []);
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    
    return (
        <ul>
            {users.map(user => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    );
}`
        }
      },
      examples: {
        customHook: {
          title: 'Custom Hook',
          code: `// useLocalStorage hook
function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
    });
    
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    
    return [value, setValue];
}

// Usage
function App() {
    const [name, setName] = useLocalStorage('name', 'Guest');
    
    return <input value={name} onChange={e => setName(e.target.value)} />;
}`
        },
        contextAPI: {
          title: 'Context API',
          code: `// Create context
const ThemeContext = React.createContext('light');

// Provider
function App() {
    const [theme, setTheme] = useState('light');
    
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <Toolbar />
        </ThemeContext.Provider>
    );
}

// Consumer
function ThemedButton() {
    const { theme, setTheme } = useContext(ThemeContext);
    
    return (
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            {theme}
        </button>
    );
}`
        }
      },
      mistakes: [
        'Mutating state directly instead of using setState',
        'Not using keys in lists properly',
        'Using index as key in dynamic lists',
        'Forgetting dependencies in useEffect',
        'Creating functions inside render that cause re-renders',
        'Not cleaning up useEffect side effects'
      ],
      tips: [
        'Master React Hooks thoroughly',
        'Understand component lifecycle and rendering',
        'Learn proper state management patterns',
        'Know when to lift state up vs use Context',
        'Practice building custom hooks',
        'Understand Virtual DOM and reconciliation'
      ],
      relatedCheatsheets: ['javascript', 'typescript', 'nextjs'],
      relatedRoadmaps: ['frontend-developer', 'full-stack-developer'],
      relatedDSA: []
    }
  });

  console.log('✅ Created React cheatsheet');

  // ============================================================================
  // DATABASES
  // ============================================================================

  // SQL Cheatsheet
  await prisma.cheatsheet.create({
    data: {
      categoryId: categories[3].id,
      slug: 'sql',
      title: 'SQL',
      subtitle: 'Structured Query Language for databases',
      description: 'Essential SQL commands and queries',
      icon: '🗄️',
      difficulty: 'Beginner',
      tags: ['database', 'query', 'data'],
      popularity: 92,
      overview: `SQL is the standard language for managing and manipulating relational databases.

**When to use:**
- Relational database management
- Data analysis and reporting
- Backend data operations
- Complex queries and joins`,
      syntax: {
        basic: {
          title: 'Basic Queries',
          code: `-- SELECT
SELECT * FROM users;
SELECT name, email FROM users;
SELECT DISTINCT country FROM users;

-- WHERE
SELECT * FROM users WHERE age > 18;
SELECT * FROM users WHERE country = 'USA' AND age >= 21;
SELECT * FROM users WHERE name LIKE 'John%';
SELECT * FROM users WHERE age IN (18, 21, 25);
SELECT * FROM users WHERE age BETWEEN 18 AND 30;

-- ORDER BY
SELECT * FROM users ORDER BY age DESC;
SELECT * FROM users ORDER BY country ASC, age DESC;

-- LIMIT
SELECT * FROM users LIMIT 10;
SELECT * FROM users LIMIT 10 OFFSET 20;  -- Pagination`
        },
        crud: {
          title: 'CRUD Operations',
          code: `-- INSERT
INSERT INTO users (name, email, age) 
VALUES ('John Doe', 'john@example.com', 25);

INSERT INTO users (name, email) 
VALUES 
    ('Alice', 'alice@example.com'),
    ('Bob', 'bob@example.com');

-- UPDATE
UPDATE users SET age = 26 WHERE id = 1;
UPDATE users SET age = age + 1;
UPDATE users SET country = 'USA' WHERE country IS NULL;

-- DELETE
DELETE FROM users WHERE id = 1;
DELETE FROM users WHERE age < 18;
DELETE FROM users;  -- Delete all (careful!)

-- TRUNCATE (faster than DELETE)
TRUNCATE TABLE users;`
        },
        joins: {
          title: 'JOINs',
          code: `-- INNER JOIN
SELECT users.name, orders.order_date
FROM users
INNER JOIN orders ON users.id = orders.user_id;

-- LEFT JOIN
SELECT users.name, orders.order_date
FROM users
LEFT JOIN orders ON users.id = orders.user_id;

-- RIGHT JOIN
SELECT users.name, orders.order_date
FROM users
RIGHT JOIN orders ON users.id = orders.user_id;

-- FULL JOIN
SELECT users.name, orders.order_date
FROM users
FULL JOIN orders ON users.id = orders.user_id;

-- Multiple joins
SELECT u.name, o.order_date, p.product_name
FROM users u
JOIN orders o ON u.id = o.user_id
JOIN products p ON o.product_id = p.id;`
        }
      },
      operations: {
        aggregation: {
          title: 'Aggregate Functions',
          code: `-- COUNT
SELECT COUNT(*) FROM users;
SELECT COUNT(DISTINCT country) FROM users;

-- SUM, AVG, MIN, MAX
SELECT SUM(price) FROM orders;
SELECT AVG(age) FROM users;
SELECT MIN(age), MAX(age) FROM users;

-- GROUP BY
SELECT country, COUNT(*) as user_count
FROM users
GROUP BY country;

SELECT country, AVG(age) as avg_age
FROM users
GROUP BY country
HAVING AVG(age) > 25;`
        },
        subqueries: {
          title: 'Subqueries',
          code: `-- WHERE subquery
SELECT name FROM users
WHERE id IN (SELECT user_id FROM orders WHERE total > 100);

-- FROM subquery
SELECT  AVG(total) FROM (
    SELECT SUM(price) as total
    FROM orders
    GROUP BY user_id
) as totals;

-- EXISTS
SELECT name FROM users u
WHERE EXISTS (
    SELECT 1 FROM orders o WHERE o.user_id = u.id
);`
        },
        indexes: {
          title: 'Indexes',
          code: `-- Create index
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_name_country ON users(name, country);

-- Unique index
CREATE UNIQUE INDEX idx_users_email ON users(email);

-- Drop index
DROP INDEX idx_users_email;

-- Show indexes
SHOW INDEX FROM users;`
        }
      },
      examples: {
        pagination: {
          title: 'Pagination',
          code: `-- MySQL/PostgreSQL
SELECT * FROM users
ORDER BY id
LIMIT 10 OFFSET 20;  -- Page 3, 10 per page

-- SQL Server
SELECT * FROM users
ORDER BY id
OFFSET 20 ROWS
FETCH NEXT 10 ROWS ONLY;`
        },
        rankingWindow: {
          title: 'Window Functions',
          code: `-- ROW_NUMBER
SELECT name, age,
    ROW_NUMBER() OVER (ORDER BY age DESC) as rank
FROM users;

-- RANK with partitioning
SELECT name, country, age,
    RANK() OVER (PARTITION BY country ORDER BY age DESC) as rank
FROM users;

-- Running total
SELECT order_date, amount,
    SUM(amount) OVER (ORDER BY order_date) as running_total
FROM orders;`
        }
      },
      mistakes: [
        'Not using indexes on frequently queried columns',
        'Using SELECT * instead of specific columns',
        'Forgetting WHERE clause in UPDATE/DELETE (affects all rows!)',
        'Not using parameterized queries (SQL injection risk)',
        'Inefficient N+1 query problems',
        'Not optimizing JOIN queries'
      ],
      tips: [
        'Always use indexes on foreign keys and frequently searched columns',
        'Understand different JOIN types and when to use them',
        'Practice writing complex queries with subqueries',
        'Learn to read and optimize query execution plans',
        'Master GROUP BY and aggregate functions',
        'Know how to prevent SQL injection'
      ],
      relatedCheatsheets: ['postgresql', 'mongodb'],
      relatedRoadmaps: ['backend-developer', 'full-stack-developer', 'data-scientist'],
      relatedDSA: []
    }
  });

  console.log('✅ Created SQL cheatsheet');

  // ============================================================================
  // DSA
  // ============================================================================

  // Arrays Cheatsheet
  await prisma.cheatsheet.create({
    data: {
      categoryId: categories[6].id,
      slug: 'arrays-dsa',
      title: 'Arrays',
      subtitle: 'Array data structure and common patterns',
      description: 'Array operations, algorithms, and interview patterns',
      icon: '📊',
      difficulty: 'Beginner',
      tags: ['data-structures', 'algorithms', 'patterns'],
      popularity: 96,
      overview: `Arrays are the most fundamental data structure, storing elements in contiguous memory.

**Time Complexities:**
- Access: O(1)
- Search: O(n)
- Insert (end): O(1)*
- Insert (middle): O(n)
- Delete: O(n)`,
      syntax: {
        basics: {
          title: 'Array Basics',
          code: `// JavaScript
const arr = [1, 2, 3, 4, 5];
arr.length  // 5
arr[0]  // 1
arr[arr.length - 1]  // 5

// Python
arr = [1, 2, 3, 4, 5]
len(arr)  # 5
arr[0]  # 1
arr[-1]  # 5 (negative indexing)`
        },
        operations: {
          title: 'Common Operations',
          code: `// Add/Remove
arr.push(6);  // Add to end - O(1)
arr.pop();  // Remove from end - O(1)
arr.unshift(0);  // Add to start - O(n)
arr.shift();  // Remove from start - O(n)

// Slice
arr.slice(1, 3);  // Copy [1, 3) - O(n)

// Splice
arr.splice(2, 1);  // Remove 1 at index 2 - O(n)
arr.splice(2, 0, 99);  // Insert 99 at index 2 - O(n)`
        }
      },
      operations: {
        twoPointers: {
          title: 'Two Pointers Pattern',
          code: `// Reverse array in-place
function reverse(arr) {
    let left = 0, right = arr.length - 1;
    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
    return arr;
}

// Two sum (sorted array)
function twoSum(arr, target) {
    let left = 0, right = arr.length - 1;
    
    while (left < right) {
        const sum = arr[left] + arr[right];
        if (sum === target) return [left, right];
        if (sum < target) left++;
        else right--;
    }
    return [-1, -1];
}`
        },
        slidingWindow: {
          title: 'Sliding Window Pattern',
          code: `// Maximum sum subarray of size k
function maxSumSubarray(arr, k) {
    let maxSum = 0, windowSum = 0;
    
    // First window
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    maxSum = windowSum;
    
    // Slide window
    for (let i = k; i < arr.length; i++) {
        windowSum += arr[i] - arr[i - k];
        maxSum = Math.max(maxSum, windowSum);
    }
    
    return maxSum;
}

// Longest substring without repeating chars
function lengthOfLongestSubstring(s) {
    const seen = new Set();
    let left = 0, maxLen = 0;
    
    for (let right = 0; right < s.length; right++) {
        while (seen.has(s[right])) {
            seen.delete(s[left]);
            left++;
        }
        seen.add(s[right]);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    
    return maxLen;
}`
        },
        prefixSum: {
          title: 'Prefix Sum Pattern',
          code: `// Build prefix sum array
function buildPrefixSum(arr) {
    const prefix = [arr[0]];
    for (let i = 1; i < arr.length; i++) {
        prefix[i] = prefix[i-1] + arr[i];
    }
    return prefix;
}

// Range sum query O(1)
function rangeSum(prefix, left, right) {
    if (left === 0) return prefix[right];
    return prefix[right] - prefix[left - 1];
}

// Subarray sum equals K
function subarraySum(arr, k) {
    const map = new Map([[0, 1]]);
    let sum = 0, count = 0;
    
    for (const num of arr) {
        sum += num;
        count += map.get(sum - k) || 0;
        map.set(sum, (map.get(sum) || 0) + 1);
    }
    
    return count;
}`
        }
      },
      examples: {
        binarySearch: {
          title: 'Binary Search',
          code: `function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    
    return -1;  // Not found
}

// Time: O(log n), Space: O(1)`
        },
        rotateArray: {
          title: 'Rotate Array',
          code: `function rotate(arr, k) {
    k = k % arr.length;
    
    // Reverse entire array
    reverse(arr, 0, arr.length - 1);
    // Reverse first k elements
    reverse(arr, 0, k - 1);
    // Reverse remaining
    reverse(arr, k, arr.length - 1);
    
    return arr;
}

function reverse(arr, start, end) {
    while (start < end) {
        [arr[start], arr[end]] = [arr[end], arr[start]];
        start++;
        end--;
    }
}

// Time: O(n), Space: O(1)`
        }
      },
      mistakes: [
        'Off-by-one errors in loops and indices',
        'Not checking array bounds before accessing elements',
        'Modifying array while iterating over it',
        'Using nested loops when hash map would be O(n)',
        'Not considering edge cases (empty array, single element)',
        'Inefficient string concatenation in loops'
      ],
      tips: [
        'Master two pointers, sliding window, and prefix sum patterns',
        'Always consider array is sorted - can use binary search',
        'Use hash map to reduce time complexity from O(n²) to O(n)',
        'Remember: array access is O(1), search is O(n)',
        'Practice problems on sorted arrays, subarrays, and subsequences',
        'Know when to use in-place vs creating new array'
      ],
      relatedCheatsheets: ['big-o', 'sorting', 'two-pointers'],
      relatedRoadmaps: ['full-stack-developer', 'data-scientist'],
      relatedDSA: ['strings', 'sorting', 'searching']
    }
  });

  console.log('✅ Created Arrays DSA cheatsheet');

  console.log('\n✅ All cheatsheets seeded successfully!\n');
  console.log(`📊 Summary:
  - Categories: 7
  - Cheatsheets: 6
  - Programming: Python, JavaScript
  - Frontend: React
  - Databases: SQL
  - DSA: Arrays
  `);
}

async function main() {
  try {
    await seedCheatsheets();
  } catch (error) {
    console.error('Error seeding cheatsheets:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();
