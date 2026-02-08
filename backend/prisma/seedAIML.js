const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const generateContent = (title, categoryTitle) => {
  return `${title}

This is a comprehensive introduction to ${title.toLowerCase()}. This topic covers the fundamental concepts and practical applications that are essential for understanding modern AI and machine learning development. The content provides both theoretical foundation and hands-on guidance for real-world implementation.

Understanding ${title.toLowerCase()} is crucial for building robust and scalable AI systems. This knowledge forms the backbone of effective development strategies and helps practitioners make informed decisions when designing solutions. The principles discussed here apply across various domains and use cases in the AI ecosystem.

In practice, ${title.toLowerCase()} enables teams to deliver high-quality applications efficiently. By mastering these concepts, you'll be equipped to handle complex challenges and optimize your development workflow. This knowledge bridges the gap between academic theory and production-ready systems that serve real users.

The skills learned here will prepare you for more advanced topics in ${categoryTitle}. These foundational concepts are used throughout the industry and understanding them thoroughly will accelerate your learning journey into more specialized areas of artificial intelligence and machine learning.`;
};

async function seedAIML() {
  console.log('🚀 Starting Comprehensive AI/ML Platform Seed...');
  console.log('📊 Target: 32 Categories, Complete Python → Agentic AI → LLMOps');
  
  const existingDomain = await prisma.learnDomain.findUnique({
    where: { slug: 'aiml' }
  });
  
  if (existingDomain) {
    console.log('🧹 Cleaning up existing AI/ML domain...');
    await prisma.learnTopic.deleteMany({
      where: { category: { domainId: existingDomain.id } }
    });
    await prisma.learnCategory.deleteMany({
      where: { domainId: existingDomain.id }
    });
    await prisma.learnDomain.delete({
      where: { id: existingDomain.id }
    });
  }

  const domain = await prisma.learnDomain.create({
    data: {
      slug: 'aiml',
      title: 'AI & Machine Learning'
    }
  });
  console.log('✅ Domain created:', domain.title);

  // ==========================================================================
  // BATCH 1: Python → Python DSA
  // ==========================================================================
  console.log('\n📦 BATCH 1: Python → Python DSA');

  // 1. PYTHON
  await prisma.learnCategory.create({
    data: {
      title: 'Python',
      order: 1,
      domainId: domain.id,
      topics: {
        create: [
          { title: 'Python Introduction', slug: 'aiml-python-introduction', order: 1, content: `Python Introduction

Python is a high-level, interpreted programming language known for its simplicity and readability. Created by Guido van Rossum in 1991, Python emphasizes code readability with its use of significant indentation. It supports multiple programming paradigms including procedural, object-oriented, and functional programming.

The language's design philosophy prioritizes developer productivity and code clarity over raw performance. Python's extensive standard library and vast ecosystem of third-party packages make it one of the most versatile languages for modern development. Its syntax allows developers to express concepts in fewer lines of code compared to languages like Java or C++.

In the AI and machine learning world, Python has become the de facto standard. Libraries like NumPy, Pandas, TensorFlow, and PyTorch are built with Python interfaces, making it the bridge between research and production. Major companies including Google, Netflix, and NASA use Python for critical systems and data analysis.

Python's interactive nature through tools like Jupyter notebooks makes it ideal for data exploration and experimentation. The language runs on major platforms including Windows, macOS, and Linux, ensuring consistent behavior across environments. Python's strong community support means abundant resources, tutorials, and solutions are readily available.

Starting your AI journey with Python provides immediate access to the tools and frameworks that power modern machine learning systems. Understanding Python fundamentals is essential before diving into specialized AI libraries and frameworks.` },
          { title: 'Python Variables', slug: 'aiml-python-variables', order: 2, content: `Python Variables

Variables in Python are containers for storing data values. Unlike many other programming languages, Python has no command for declaring a variable—you simply create one by assigning a value. Python is dynamically typed, meaning you don't need to specify what type of data a variable will hold.

Variable names must start with a letter or underscore, followed by letters, numbers, or underscores. Python uses snake_case convention for variable names, making them descriptive and readable. Variables are case-sensitive, so 'age' and 'Age' are completely different variables.

In machine learning workflows, variables store everything from dataset paths to model parameters. A model's weights, training data, and evaluation metrics all live in variables during execution. Proper variable naming becomes crucial when managing complex data pipelines with dozens of intermediate values.

Python variables use reference semantics, meaning variables point to objects in memory rather than storing values directly. This distinction becomes important when working with mutable objects like lists or arrays. Understanding how variables reference objects helps prevent unexpected behavior when manipulating data structures.

Mastering variable assignment and management is your first step toward writing clean, maintainable AI code. These fundamentals underpin every data transformation and model training script you'll write.` },
          { title: 'Python Data Types', slug: 'aiml-python-data-types', order: 3, content: `Python Data Types

Python provides several built-in data types to store different kinds of information. The basic types include integers, floats, strings, booleans, and None. Each type has specific properties and behaviors that determine what operations you can perform on them.

Numeric types like integers and floats are essential for mathematical computations in AI. Integers represent whole numbers without decimal points, while floats handle decimal values crucial for precision in model calculations. Python automatically handles type conversion in many arithmetic operations, though explicit casting is sometimes necessary.

Strings store text data, from file paths to natural language text for NLP tasks. Booleans (True/False) control program flow and represent binary conditions. The None type represents the absence of a value, often used as a default or placeholder in function arguments.

In data science workflows, understanding data types prevents errors during array operations and data transformations. NumPy and Pandas build upon Python's basic types with specialized numeric types optimized for vector operations. Type mismatches are a common source of bugs when loading datasets or preprocessing features.

Complex data types like lists, tuples, dictionaries, and sets build on these primitives. These collection types form the foundation for organizing data before it flows into neural networks and machine learning models.` },
          { title: 'Python Operators', slug: 'aiml-python-operators', order: 4, content: `Python Operators

Operators are symbols that perform operations on variables and values. Python supports arithmetic operators like addition, subtraction, multiplication, division, and exponentiation. The modulo operator returns remainders, while floor division performs division and rounds down to the nearest integer.

Comparison operators evaluate relationships between values, returning boolean results. These include equal to, not equal to, greater than, less than, and their combinations. Logical operators (and, or, not) combine boolean expressions, essential for complex conditional logic in model training loops.

Assignment operators not only assign values but can perform operations simultaneously. The += operator adds and assigns in one step, commonly used when accumulating totals or updating counters during training iterations. Similar shortcuts exist for all arithmetic operations.

In machine learning code, operators appear everywhere—calculating loss functions, updating gradients, filtering datasets, and evaluating model performance. Vectorized operations in NumPy and PyTorch use these operators but apply them across entire arrays efficiently. Understanding operator precedence prevents calculation errors in complex mathematical expressions.

Bitwise and identity operators handle special cases like memory comparison and binary manipulation. Mastering operators enables you to write concise, efficient code for data transformations and mathematical computations.` },
          { title: 'Python Conditions', slug: 'aiml-python-conditions', order: 5, content: `Python Conditions

Conditional statements allow programs to make decisions and execute different code based on conditions. Python's if-elif-else structure evaluates expressions and branches execution accordingly. Indentation defines code blocks, making conditional logic visually clear and enforcing readable structure.

The if statement checks a condition and executes its block when true. The elif (else if) clause provides alternative conditions to check when previous conditions fail. The else clause catches all remaining cases, providing a default behavior when no conditions match.

In AI systems, conditionals control everything from data preprocessing decisions to model selection logic. You might check if a dataset is loaded before training, validate hyperparameters fall within acceptable ranges, or apply different preprocessing based on data types. Early stopping in training uses conditionals to halt when validation loss stops improving.

Python evaluates conditions using truthy and falsy values—empty collections, zero, and None evaluate as false, while most other values are true. This enables concise checks like 'if data:' instead of 'if len(data) > 0'. Nested conditionals handle complex decision trees, though deeply nested structures often indicate opportunities for refactoring.

Conditional expressions (ternary operators) provide inline if-else logic for assignments. Understanding conditionals enables you to build robust error handling and adaptive behavior into your machine learning pipelines.` },
          { title: 'Python Loops', slug: 'aiml-python-loops', order: 6, content: `Python Loops

Loops enable repetitive execution of code blocks, essential for processing data at scale. Python provides two primary loop structures: for loops iterate over sequences, while while loops continue until a condition becomes false. The for loop is particularly elegant in Python, working seamlessly with any iterable object.

The for loop iterates through collections like lists, ranges, or generator objects. Combined with the range function, it provides indexed iteration for a specified number of times. The enumerate function adds index tracking, useful when you need both the position and value during iteration.

While loops repeat as long as their condition remains true, perfect for situations where the number of iterations isn't known in advance. Training loops in machine learning often use while loops with convergence checks or timeout conditions. Break and continue statements control loop flow—break exits entirely, while continue skips to the next iteration.

In data processing, loops iterate through datasets for cleaning, transformation, and augmentation. However, Python loops can be slow for numerical operations—NumPy and Pandas vectorization replaces many explicit loops with optimized array operations. Knowing when to use loops versus vectorization significantly impacts code performance.

List comprehensions provide a concise syntax for creating lists through iteration, often replacing simple for loops with single-line expressions. Understanding loops is fundamental to batch processing, data iteration, and training model epochs.` },
          { title: 'Python Functions', slug: 'aiml-python-functions', order: 7, content: `Python Functions

Functions are reusable blocks of code that perform specific tasks. Defined using the def keyword, functions accept inputs (parameters), execute logic, and optionally return outputs. Functions promote code reuse, modularity, and abstraction—core principles in maintainable software development.

Parameters make functions flexible by accepting different inputs each time they're called. Default parameters provide fallback values when arguments aren't supplied. Python supports positional arguments, keyword arguments, variable-length argument lists (*args), and keyword argument dictionaries (**kwargs), enabling flexible function signatures.

In machine learning projects, functions encapsulate operations like data loading, preprocessing, model building, and evaluation. A typical pipeline might have functions for each stage: load_data(), preprocess_features(), build_model(), train_model(), and evaluate_performance(). This modular approach makes code testable and reusable across experiments.

Return statements send values back to the caller, though Python functions can return multiple values as tuples. Functions without explicit returns implicitly return None. First-class functions mean you can pass functions as arguments, return them from other functions, and assign them to variables—powerful for callbacks and higher-order operations.

Docstrings document function purpose, parameters, and return values, essential for collaborative codebases. Lambda functions provide anonymous, single-expression functions for simple operations. Mastering functions enables you to structure complex AI systems as composable, testable components.` },
          { title: 'Python Strings', slug: 'aiml-python-strings', order: 8, content: `Python Strings

Strings represent text data as sequences of characters enclosed in quotes. Python treats strings as immutable sequences, meaning once created, their contents cannot be changed—only replaced. Strings support indexing, slicing, and a rich set of manipulation methods for text processing.

String methods like split(), strip(), replace(), and join() handle common text transformations. Format strings using f-strings, the format() method, or percent formatting enable dynamic text construction. String concatenation combines multiple strings, though f-strings provide cleaner syntax for embedding variables.

In natural language processing and AI systems, string handling is constant—loading text datasets, tokenizing sentences, cleaning raw input, and formatting model outputs. File paths, model names, configuration values, and logs all involve string manipulation. Regular expressions provide powerful pattern matching for complex text extraction and validation.

Multiline strings use triple quotes, useful for docstrings and formatted text blocks. Raw strings (r-prefix) treat backslashes literally, essential for regex patterns and Windows file paths. Unicode support enables working with international text, critical for multilingual NLP applications.

String encoding and decoding convert between text and bytes, necessary when reading files or making API requests. Understanding string operations prepares you for text preprocessing, a crucial step before feeding data into language models or classification systems.` },
          { title: 'Python Lists', slug: 'aiml-python-lists', order: 9, content: `Python Lists

Lists are ordered, mutable collections that store sequences of items. Created using square brackets, lists can hold mixed data types, though homogeneous lists are more common in data processing. Lists grow and shrink dynamically, making them versatile for accumulating results during computation.

List methods like append(), extend(), insert(), and remove() modify lists in place. The pop() method removes and returns items, useful for implementing stacks and queues. List slicing extracts sublists using start:stop:step syntax, and negative indices count from the end, providing intuitive access patterns.

In machine learning workflows, lists accumulate training batches, store prediction results, and collect metrics across epochs. While lists are flexible, they're not optimized for numerical operations—NumPy arrays replace lists for mathematical computations. Lists excel at heterogeneous data and dynamic collections where size isn't known upfront.

List comprehensions offer concise syntax for creating lists through transformation and filtering. Nested lists represent matrices or multidimensional data structures in pure Python. The built-in functions sum(), max(), min(), and len() operate efficiently on lists without explicit loops.

Sorting with sort() modifies lists in place, while sorted() returns new sorted lists. Understanding lists is essential before transitioning to NumPy arrays, the foundation of numerical computing in Python.` },
          { title: 'Python Tuples', slug: 'aiml-python-tuples', order: 10, content: `Python Tuples

Tuples are immutable sequences, similar to lists but cannot be modified after creation. Created with parentheses or just comma-separated values, tuples guarantee data integrity—once defined, their contents remain constant. This immutability makes tuples hashable, enabling their use as dictionary keys.

Tuple unpacking assigns multiple variables simultaneously from tuple values, a common pattern for functions returning multiple results. Single-element tuples require a trailing comma to distinguish them from parenthesized expressions. Tuples consume less memory than lists and offer slightly better performance for fixed collections.

In data processing pipelines, tuples represent fixed records like coordinates, RGB color values, or dataset splits. Functions often return tuples to send back multiple related values without wrapping them in objects. The immutability provides safety—passing tuples to functions guarantees they won't be unexpectedly modified.

Tuples support indexing and slicing like lists but lack modification methods. Named tuples from the collections module add field names to tuple positions, improving code readability while maintaining immutability benefits. Tuples appear frequently in Python internals—function arguments, dictionary items, and iteration often use tuple structures.

Choosing between lists and tuples depends on whether mutability is needed. Tuples signal intent—this collection won't change—making code more predictable and slightly more efficient.` }
        ]
      }
    }
  });
  console.log('✅ Python: 10 topics');

  // 2. PYTHON OOP
  await prisma.learnCategory.create({
    data: {
      title: 'Python OOP',
      order: 2,
      domainId: domain.id,
      topics: {
        create: [
          { title: 'OOP Introduction', slug: 'aiml-oop-introduction', order: 1, content: `OOP Introduction

Object-Oriented Programming (OOP) organizes code around objects that combine data and behavior. Instead of separate functions operating on separate data, OOP bundles related data (attributes) and functions (methods) into cohesive objects. This paradigm models real-world entities and relationships, making complex systems more intuitive.

OOP's four core principles—encapsulation, inheritance, polymorphism, and abstraction—provide structured approaches to managing complexity. Classes serve as blueprints defining object structure and behavior, while instances are concrete objects created from those blueprints. Each instance maintains its own state while sharing methods defined in the class.

In machine learning frameworks, OOP is everywhere. TensorFlow and PyTorch models are classes with methods for forward passes and parameter updates. Datasets, data loaders, optimizers, and loss functions are all objects with well-defined interfaces. Scikit-learn's consistent API relies on classes with fit(), predict(), and transform() methods.

OOP enables code reuse and extension without modification. You can create custom model architectures by inheriting from base classes and overriding specific methods. This pattern appears throughout deep learning—extending nn.Module in PyTorch or tf.keras.Model in TensorFlow to define novel architectures.

Understanding OOP principles is essential for working with modern AI frameworks. Most libraries you'll use are object-oriented, and structuring your own projects with classes leads to more maintainable, scalable code.` },
          { title: 'Classes', slug: 'aiml-classes', order: 2, content: `Classes

Classes define templates for creating objects, specifying what data they hold and what operations they support. Defined using the class keyword, classes contain methods (functions) and attributes (variables) that define object behavior and state. The class acts as a factory for producing multiple instances with shared structure but independent data.

Class attributes are shared across all instances, while instance attributes are unique to each object. Methods are functions defined within classes, automatically receiving the instance as their first parameter (conventionally named 'self'). Class methods and static methods provide alternative binding behaviors for specialized use cases.

In machine learning projects, classes represent models, datasets, training loops, and evaluation metrics. A custom model class might define the neural network architecture, initialization logic, and forward pass computation. Dataset classes handle data loading, preprocessing, and batching, abstracting away file I/O complexity.

Inheritance allows classes to extend existing classes, inheriting their attributes and methods. This enables creating specialized versions of general classes—a ConvolutionalNetwork class might inherit from a general NeuralNetwork class, adding convolution-specific behavior. Multiple classes can inherit from the same parent, promoting code reuse.

Well-designed classes have clear responsibilities and hide implementation details. This encapsulation lets you change internal workings without breaking code that uses your classes. Understanding classes is fundamental to working with and extending AI frameworks.` },
          { title: 'Objects', slug: 'aiml-objects', order: 3, content: `Objects

Objects are instances of classes, concrete entities created by calling the class constructor. Each object maintains its own state through instance attributes while sharing behavior defined in the class. Creating objects instantiates the blueprint, allocating memory and initializing data.

Python's object model treats everything as an object—numbers, strings, functions, and even classes themselves. All objects have an identity (memory address), type (class), and value (data). The isinstance() and type() functions inspect object types, useful for validation and debugging.

In deep learning code, your model is an object, your optimizer is an object, and your data loader is an object. Each training epoch creates batch objects from your dataset. Loss values, gradients, and predictions are all objects (often tensors) with methods for manipulation. Object lifetimes matter—retaining references prevents garbage collection, while releasing objects frees memory.

Objects interact through method calls and attribute access. A training loop object might call methods on model, optimizer, and loss function objects, coordinating their interactions. The object-oriented approach makes these relationships explicit and manageable.

Understanding object creation, lifecycle, and interaction patterns enables effective use of AI frameworks. You'll constantly create, configure, and manipulate objects when building and training models.` },
          { title: 'Inheritance', slug: 'aiml-inheritance', order: 4, content: `Inheritance

Inheritance creates new classes based on existing classes, inheriting attributes and methods while adding or overriding functionality. The child class (subclass) inherits from the parent class (superclass), establishing an "is-a" relationship. This mechanism promotes code reuse and establishes hierarchical relationships between related concepts.

Single inheritance involves one parent class, while multiple inheritance allows inheriting from multiple parents. The super() function accesses parent class methods, commonly used to extend initialization logic. Method resolution order (MRO) determines which parent method gets called when multiple inheritance creates ambiguity.

In PyTorch, custom models inherit from nn.Module, gaining automatic parameter tracking and serialization. You override the __init__ method to define layers and the forward method to specify computations. The parent class handles gradient computation, device transfer, and training/evaluation mode switching—functionality you get for free through inheritance.

Inheritance enables framework extension without modifying library code. Create custom data loaders by inheriting from Dataset, custom optimizers by extending Optimizer, or novel architectures by inheriting base network classes. This extensibility makes frameworks flexible while maintaining backward compatibility.

Overriding methods replaces parent implementation with specialized behavior. Abstract base classes define interfaces that subclasses must implement, ensuring consistent APIs across different implementations. Understanding inheritance unlocks the full power of machine learning frameworks.` },
          { title: 'Encapsulation', slug: 'aiml-encapsulation', order: 5, content: `Encapsulation

Encapsulation bundles data and methods that operate on that data within a single unit, restricting direct access to internal state. This principle hides implementation details, exposing only necessary interfaces to external code. By controlling access, encapsulation prevents unintended modifications and maintains object invariants.

Python uses naming conventions rather than strict access modifiers. Single underscore prefixes (_variable) indicate internal attributes not intended for external use. Double underscore prefixes (__variable) trigger name mangling, providing stronger (though not absolute) privacy. Public methods form the object's interface, while private methods handle internal operations.

Properties using the @property decorator provide controlled access to attributes, enabling validation, computation, or transformation during access. Setters can enforce constraints when attributes change. This approach maintains clean syntax while protecting internal state—accessing model.accuracy looks like attribute access but can trigger complex calculations.

In machine learning libraries, encapsulation hides complex operations behind simple interfaces. Calling model.fit(data) triggers data validation, batch processing, forward passes, loss computation, backpropagation, and parameter updates—all hidden behind a clean method call. Internal caching, optimization state, and computational graphs remain encapsulated.

Encapsulation enables refactoring internal implementations without breaking external code. As long as public interfaces remain stable, you can optimize, fix bugs, or restructure internals freely. This separation of interface and implementation is crucial for maintaining large AI codebases.` },
          { title: 'Polymorphism', slug: 'aiml-polymorphism', order: 6, content: `Polymorphism

Polymorphism enables objects of different types to be treated uniformly through shared interfaces. The same method name behaves differently depending on the object type. This allows writing generic code that operates on various types without knowing specifics, enhancing flexibility and reducing coupling.

Method overriding achieves polymorphism through inheritance—subclasses provide specific implementations of methods defined in parent classes. Duck typing, Python's approach, emphasizes behavior over type—if an object supports required operations, it's acceptable regardless of its actual class. This "if it walks like a duck" philosophy enables flexible, dynamic code.

In machine learning frameworks, polymorphism appears everywhere. Different loss functions (MSELoss, CrossEntropyLoss, BCELoss) all implement the same interface—call them with predictions and targets, get a loss value back. Different optimizers (SGD, Adam, RMSprop) share fit patterns. This consistency enables swapping components without rewriting training loops.

Operator overloading extends polymorphism to operators like +, -, *, enabling natural syntax for custom types. NumPy arrays and PyTorch tensors overload mathematical operators to perform element-wise operations. The @ operator for matrix multiplication works across different array-like types through polymorphic operator implementations.

Polymorphism simplifies experimentation in AI—swap datasets, models, or optimizers by using different objects with compatible interfaces. This flexibility accelerates development and enables comparing approaches without extensive code changes.` },
          { title: 'Abstraction', slug: 'aiml-abstraction', order: 7, content: `Abstraction

Abstraction focuses on essential features while hiding unnecessary implementation details. By creating simplified models of complex systems, abstraction reduces cognitive load and enables working at higher levels of understanding. Abstract classes and interfaces define what operations must exist without specifying how they work.

Abstract base classes (ABCs) from Python's abc module define templates that subclasses must implement. Decorating methods with @abstractmethod requires subclasses to provide implementations, enforcing interface contracts. This guarantees all concrete classes support expected operations, enabling polymorphic use.

In AI frameworks, abstraction layers separate concerns—you train models without understanding CUDA kernels, define architectures without managing memory allocation, or process data without implementing file parsers. Each layer provides abstractions that hide lower-level complexity. High-level APIs like Keras offer simple interfaces over complex TensorFlow operations.

Abstraction enables changing underlying implementations transparently. Code using abstract interfaces doesn't break when implementation details change. This flexibility is crucial for frameworks supporting multiple backends—the same model code can target CPUs, GPUs, or TPUs through abstraction.

Good abstractions expose the right level of control—simple for common cases, with escape hatches for advanced needs. Scikit-learn's fit/predict abstraction works across dozens of algorithms. Understanding abstraction helps you design reusable components and work effectively with framework abstractions.` },
          { title: 'Constructors', slug: 'aiml-constructors', order: 8, content: `Constructors

Constructors initialize new objects, setting up initial state when instances are created. Python's __init__ method serves as the constructor, automatically called after object creation. Constructors receive parameters to customize initialization, ensuring objects start in valid states.

The __init__ method typically assigns instance attributes, validates parameters, and performs necessary setup. Type hints on constructor parameters document expected types and improve IDE support. Default parameter values enable flexible initialization—required parameters ensure critical data is provided, while optional parameters customize behavior.

In neural network classes, constructors define architecture by instantiating layers and specifying connections. A CNN constructor might create convolutional layers, pooling layers, and fully connected layers, storing them as instance attributes. Constructors also initialize hyperparameters like learning rates, dropout probabilities, and hidden dimensions.

Complex initialization logic sometimes uses factory methods or builder patterns instead of overloading constructors. Class methods decorated with @classmethod create alternative constructors, useful for loading models from files or creating instances from configurations. This pattern appears in model serialization and deserialization.

Constructors establish object invariants—conditions that remain true throughout the object's lifetime. Validating inputs in constructors prevents invalid states. Understanding constructors enables proper object initialization, essential when creating custom datasets, models, or training components.` },
          { title: 'Destructors', slug: 'aiml-destructors', order: 9, content: `Destructors

Destructors clean up resources when objects are destroyed, ensuring proper resource release. Python's __del__ method serves as the destructor, called when an object's reference count drops to zero. However, Python's garbage collection makes destructors less critical than in languages without automatic memory management.

The __del__ method shouldn't be relied upon for critical cleanup due to unpredictable timing. Python's garbage collector runs when it chooses, and circular references can delay destruction indefinitely. For reliable cleanup, context managers (with statement) provide deterministic resource management, ensuring cleanup happens at specific points.

In machine learning code, destructors rarely need explicit definition. Python's garbage collector handles memory automatically. However, external resources like file handles, database connections, or GPU memory allocations benefit from explicit cleanup. The __del__ method can close files or release GPU resources, though context managers are preferred.

Weakref module provides weak references that don't prevent object destruction, useful for caches and observer patterns. Understanding object lifetime and destruction helps prevent memory leaks in long-running training jobs. Monitoring GPU memory requires awareness of when tensors are released.

Modern Python code favors context managers over destructors for cleanup. The with statement guarantees cleanup executes even when exceptions occur. Understanding destructors and garbage collection helps debug memory issues and optimize resource usage in data-intensive applications.` },
          { title: 'Methods', slug: 'aiml-methods', order: 10, content: `Methods

Methods are functions defined within classes that operate on object instances. Instance methods receive self as the first parameter, providing access to instance attributes and other methods. Methods encapsulate behavior associated with objects, defining what operations objects can perform.

Class methods use the @classmethod decorator and receive the class itself (cls) rather than instances. These methods operate on class-level data and create alternative constructors. Static methods use @staticmethod and don't receive self or cls—they're regular functions organized within classes for namespace purposes.

In neural network classes, methods define critical operations. The forward method specifies computation during forward passes, the backward method (often automatic) handles gradients, and prediction methods make inferences on new data. Training methods orchestrate optimization steps, wrapping multiple operations into logical units.

Magic methods (dunder methods) enable Python's syntactic features. __call__ makes instances callable like functions, useful for models and layers. __len__ and __getitem__ enable sequence protocols, required for dataset classes. __str__ and __repr__ control string representations for debugging and logging.

Well-designed methods have clear purposes, accept appropriate parameters, and return meaningful values. Methods should minimize side effects when possible, making behavior predictable. Understanding methods enables you to create intuitive, usable classes that integrate seamlessly with Python's ecosystem.` }
        ]
      }
    }
  });
  console.log('✅ Python OOP: 10 topics');

  // 3. FILE HANDLING
  await prisma.learnCategory.create({
    data: {
      title: 'File Handling',
      order: 3,
      domainId: domain.id,
      topics: {
        create: [
          { title: 'Reading Files', slug: 'aiml-reading-files', order: 1, content: `Reading Files

File reading enables programs to load data from persistent storage into memory for processing. Python provides multiple approaches for reading files—the open() function returns file objects with methods like read(), readline(), and readlines(). Context managers using 'with' statements ensure files close properly even if errors occur during reading.

The read() method loads entire file contents as a string, suitable for small files. For large files, readline() reads one line at a time, while readlines() returns a list of all lines. Iterating directly over file objects provides memory-efficient line-by-line processing without loading everything into memory.

In machine learning workflows, reading files happens constantly—loading dataset CSVs, reading configuration JSONs, importing pre-trained model weights, and accessing log files. Understanding file encodings prevents errors when reading text files with international characters. Binary mode ('rb') handles non-text files like images, audio, or serialized models.

Path management using pathlib provides cross-platform file path handling. The Path object offers methods for checking existence, reading content, and navigating directory structures. Combining pathlib with file reading creates robust data loading pipelines that work across operating systems.

Error handling during file reading catches common issues—missing files, permission errors, and encoding problems. Try-except blocks with specific exception handling enable graceful failures and helpful error messages. Mastering file reading is fundamental to data loading, the first step in any AI pipeline.` },
          { title: 'Writing Files', slug: 'aiml-writing-files', order: 2, content: `Writing Files

Writing files persists data from memory to storage, essential for saving results, logs, and trained models. The open() function with 'w' mode creates or overwrites files, while 'a' mode appends to existing content. The write() method outputs strings to files, and writelines() saves lists of strings efficiently.

Text mode handles string data, automatically managing line endings across platforms. Binary mode ('wb') writes bytes, necessary for images, model checkpoints, and other non-text data. Buffer flushing ensures data reaches disk—explicit flush() calls or closing files commits pending writes.

In AI projects, writing files saves training metrics, model checkpoints, prediction outputs, and experiment logs. Structured formats like JSON and CSV organize output for analysis. Pickle and joblib serialize Python objects including trained models, though framework-specific formats (PyTorch .pth, TensorFlow SavedModel) offer better compatibility.

Atomic writes prevent corruption from crashes during saving. Writing to temporary files then renaming provides atomic guarantees—the file is either complete or untouched. This pattern protects critical outputs like model checkpoints from partial writes that could corrupt hours of training.

Logging predictions, metrics, and hyperparameters to files creates audit trails for experiments. Timestamped filenames prevent overwriting previous results. Understanding file writing enables persistent storage of valuable computation results and trained models.` },
          { title: 'Deleting Files', slug: 'aiml-deleting-files', order: 3, content: `Deleting Files

Deleting files removes them from storage, freeing disk space and cleaning up temporary artifacts. Python's os.remove() deletes single files, while pathlib's Path.unlink() provides object-oriented deletion. Before deleting, checking file existence with os.path.exists() or Path.exists() prevents errors from attempting to delete non-existent files.

Folder deletion requires different functions—os.rmdir() removes empty directories, while shutil.rmtree() recursively deletes directories and their contents. The latter is powerful but dangerous—accidentally deleting important directories can cause data loss. Always validate paths before recursive deletion.

In machine learning workflows, automated cleanup removes temporary files created during training—cached preprocessed data, intermediate results, and failed checkpoint attempts. Cleanup scripts prevent disk space exhaustion in long-running experiments. However, be cautious deleting anything—losing training checkpoints can waste hours of compute time.

Pattern-based deletion using glob finds files matching patterns for bulk deletion. This enables removing all cache files, old logs, or failed experiments at once. Dry-run modes that print files to be deleted without actually deleting provide safety checks before bulk operations.

Trash or recycle bin approaches provide safer deletion than permanent removal. Moving files to trash folders instead of immediate deletion enables recovery from mistakes. Understanding deletion operations helps maintain clean project directories and manage storage efficiently.` },
          { title: 'Directory Operations', slug: 'aiml-directory-operations', order: 4, content: `Directory Operations

Directory operations manage folder structures, essential for organizing datasets, models, and outputs. Python's os module provides functions like mkdir() to create directories, listdir() to list contents, and walk() to traverse directory trees. The pathlib module offers object-oriented alternatives with cleaner syntax.

Creating directories with exist_ok=True prevents errors when directories already exist, enabling idempotent setup scripts. Nested directory creation using os.makedirs() or Path.mkdir(parents=True) creates entire directory hierarchies in one call. This simplifies project initialization and output directory setup.

In AI projects, organized directory structures separate training data, validation data, test data, model checkpoints, logs, and visualizations. Standard layouts make projects navigable and enable automation. Scripts that expect consistent directory structures can reliably find inputs and write outputs.

Directory traversal using os.walk() or Path.rglob() finds all files matching criteria across nested folders. This enables batch processing datasets, collecting all images in a folder tree, or finding all model checkpoints. Generator-based traversal handles large directory trees memory-efficiently.

Current working directory awareness prevents file path bugs. Using absolute paths or paths relative to script locations ensures portability. Understanding directory operations enables creating robust data pipelines that organize inputs and outputs systematically.` },
          { title: 'JSON Files', slug: 'aiml-json-files', order: 5, content: `JSON Files

JSON (JavaScript Object Notation) provides human-readable data serialization for structured information. Python's json module loads JSON into dictionaries and lists, and serializes Python objects back to JSON. The format's simplicity and universal support make it ideal for configuration files, API responses, and lightweight data storage.

Loading JSON uses json.load() for file objects or json.loads() for strings. Saving uses json.dump() for files or json.dumps() for strings. The indent parameter Pretty-prints JSON with specified indentation, improving readability for human-edited configurations. ensure_ascii=False preserves Unicode characters instead of escaping them.

In machine learning projects, JSON stores hyperparameters, model architectures, training configurations, and experiment metadata. Version controlling JSON configs enables reproducing experiments exactly. API integrations for cloud services typically use JSON for request and response bodies.

JSON's limitations include no native support for dates, binary data, or custom objects. Workarounds involve conversion to JSON-compatible types or custom serialization with default parameters. For complex objects, consider pickle, though JSON's human-readability often outweighs pickle's flexibility.

JSON schema validation ensures loaded configurations match expected structures. Libraries like jsonschema validate data against schemas, catching configuration errors early. Understanding JSON handling is essential for configuration management and data interchange in modern AI systems.` },
          { title: 'CSV Files', slug: 'aiml-csv-files', order: 6, content: `CSV Files

CSV (Comma-Separated Values) files store tabular data in plain text format, ubiquitous in data science and machine learning. Python's csv module provides readers and writers for CSV files, handling complexities like quoted fields and different delimiters. However, pandas typically replaces raw CSV handling with more convenient DataFrame operations.

Reading CSVs with pandas.read_csv() loads data directly into DataFrames, handling type inference, missing values, and date parsing automatically. Parameters like sep, header, and skiprows customize parsing for various CSV formats. Large files benefit from chunking or column selection to reduce memory usage.

In machine learning workflows, CSVs commonly store datasets from Kaggle, exported database queries, and prediction outputs. CSVs represent the lingua franca of data exchange—tools like Excel, databases, and analytics platforms all support CSV import/export. However, CSVs lack standardization beyond basics, leading to encoding issues and parsing ambiguities.

Writing CSVs with DataFrame.to_csv() exports results, predictions, and metrics. The index parameter controls whether row indices are included. For large datasets, writing in chunks prevents memory exhaustion. Compression options like gzip reduce file size for storage and transfer.

CSV limitations include no type information, inefficient storage, and slow parsing. For production systems, formats like Parquet or HDF5 offer better performance. Understanding CSV handling remains essential due to CSV's universal adoption in data science.` },
          { title: 'File Exceptions', slug: 'aiml-file-exceptions', order: 7, content: `File Exceptions

File operations can fail in numerous ways—missing files, permission errors, disk full, and encoding issues. Python raises specific exceptions for different failure modes: FileNotFoundError for missing files, PermissionError for access issues, and UnicodeDecodeError for encoding problems. Handling these exceptions prevents crashes and enables graceful error recovery.

Try-except blocks wrap file operations, catching and handling potential errors. Specific exception handling provides targeted responses—retrying on network errors, falling back to defaults for missing configs, or not ifying users of permission issues. Finally blocks ensure cleanup code runs regardless of success or failure.

In machine learning pipelines, robust error handling prevents single file problems from crashing entire training runs. When loading batches from thousands of files, encountering one corrupted image shouldn't stop training. Logging errors while continuing enables identifying and fixing problematic data without interrupting experiments.

Context managers (with statements) automatically handle resource cleanup even when exceptions occur. Files opened within with blocks always close properly, preventing resource leaks. Combining context managers with exception handling creates robust file operations.

Validation before file operations prevents many errors—checking paths exist, verifying permissions, and validating file formats. Fail-fast approaches detect problems immediately rather than failing deep in processing. Understanding file exceptions enables building resilient data pipelines that handle real-world messiness gracefully.` }
        ]
      }
    }
  });
  console.log('✅ File Handling: 7 topics');

  // 4. PYTHON STANDARD LIBRARIES  
  await prisma.learnCategory.create({
    data: {
      title: 'Python Standard Libraries',
      order: 4,
      domainId: domain.id,
      topics: {
        create: [
          { title: 'Libraries Overview', slug: 'aiml-libraries-overview', order: 1, content: `Libraries Overview

Python's standard library provides modules for common tasks without requiring external packages. Included with every Python installation, the standard library covers file I/O, system operations, data structures, networking, and much more. Understanding what's available prevents reinventing solutions and ensures portable code.

The standard library's batteries-included philosophy means most basic needs are covered out of the box. Modules like os, sys, pathlib, datetime, json, and collections solve frequent programming challenges. For AI work, modules like pickle for serialization, logging for diagnostics, and multiprocessing for parallelization prove invaluable.

Third-party libraries extend beyond the standard library. PyPI (Python Package Index) hosts hundreds of thousands of packages including NumPy, Pandas, TensorFlow, and PyTorch. The pip package manager installs these libraries, making Python's ecosystem accessible. However, standard library modules offer stability and guarantee availability.

Module import using import statements brings library functionality into your code. Understanding import mechanics—absolute imports, relative imports, and import aliases—enables organizing code effectively. The dir() and help() functions explore module contents and documentation interactively.

Knowing what exists in the standard library accelerates development. Before installing external packages, check if standard library modules suffice. This knowledge forms a foundation before specializing in domain-specific libraries like scikit-learn or Hugging Face transformers.` },
          { title: 'DateTime Module', slug: 'aiml-datetime-module', order: 2, content: `DateTime Module

The datetime module handles dates, times, and timestamps essential for time-series data and experiment tracking. datetime objects represent specific moments, while timedelta objects represent durations. The module provides parsing, formatting, arithmetic, and timezone operations for temporal data.

Creating datetime objects captures current time with datetime.now() or specific moments with datetime constructors. Formatting with strftime() converts datetimes to strings, while strptime() parses strings into datetimes. These operations enable logging timestamps, naming files with dates, and parsing dataset timestamps.

In machine learning workflows, datetime operations timestamp training runs, checkpoint models, and organize experiments chronologically. Time-series forecasting depends on proper datetime handling for sliding windows, seasonal patterns, and temporal features. Logging systems use datetimes to track when events occurred.

Timezone awareness prevents bugs in distributed systems and international datasets. Naive datetimes lack timezone information, while aware datetimes include it. The pytz or zoneinfo modules provide timezone databases. Converting between timezones ensures consistent temporal reasoning across geographic regions.

Temporal arithmetic with timedelta enables calculating training duration, scheduling tasks, and implementing timeout logic. Understanding the datetime module is essential for experiment tracking, time-series analysis, and production system logging.` },
          { title: 'Math Module', slug: 'aiml-math-module', order: 3, content: `Math Module

The math module provides mathematical functions beyond basic arithmetic—trigonometry, logarithms, exponentials, and constants like pi and e. These functions operate on single numbers, distinct from NumPy's array operations. The module offers precise implementations of mathematical operations for scalar calculations.

Functions like ceil(), floor(), and trunc() handle rounding and truncation. sqrt() computes square roots, pow() raises numbers to powers, and log() calculates logarithms with various bases. Trigonometric functions (sin, cos, tan) and their inverses support geometric calculations.

In AI code, math module functions appear in custom activation functions, loss calculations, and mathematical utilities. While NumPy typically handles array operations, the math module suits single-value computations in helper functions. Understanding both prevents confusion about when to use each.

Special functions like factorial() and gcd() support combinatorics and number theory. The isnan() and isinf() functions check for special float values, useful for validating numerical stability. These checks prevent NaN and infinity values from corrupting training.

For heavy numerical computation, NumPy's vectorized operations outperform math module functions on arrays. However, the math module remains valuable for utility functions, formula implementations, and situations where NumPy isn't available. Understanding its capabilities complements NumPy knowledge.` },
          { title: 'Random Module', slug: 'aiml-random-module', order: 4, content: `Random Module

The random module generates pseudo-random numbers for sampling, shuffling, and stochastic operations. Functions like random() return floats between 0 and 1, randint() generates random integers, and choice() selects random elements from sequences. These operations enable data augmentation, train-test splits, and initialization.

Seeding the random number generator with seed() ensures reproducibility—the same seed produces identical random sequences. This reproducibility is crucial for debugging and experiment reproducibility. Setting seeds at program start creates deterministic behavior for development while allowing randomness in production.

In machine learning, random sampling creates train-validation-test splits, implements dropout during training, and augments data with random transformations. The shuffle() function randomizes data order, preventing models from learning ordering artifacts. Random initialization of neural network weights uses random distributions to break symmetry.

Distribution functions like uniform(), gauss(), and choice() sample from probability distributions. These enable generating synthetic data, implementing Monte Carlo methods, and simulating probabilistic processes. Understanding probability distributions connects random number generation to statistical foundations.

For cryptographic applications, use the secrets module instead—random is not cryptographically secure. In deep learning, framework-specific random number generators (torch.rand, np.random) often replace Python's random module, offering GPU acceleration and better integration. Understanding both standard library and framework-specific randomness is important.` },
          { title: 'OS Module', slug: 'aiml-os-module', order: 5, content: `OS Module

The os module provides operating system interfaces for file paths, environment variables, and process management. Functions like listdir(), remove(), and mkdir() manipulate files and directories. The os.path submodule offers path manipulation functions, though pathlib is more modern and convenient.

Environment variables accessed via os.environ configure applications without hardcoding values. Reading API keys, database URLs, and configuration from environment variables enables secure, flexible deployments. Setting environment variables controls framework behavior—CUDA_VISIBLE_DEVICES limits GPU usage, OMP_NUM_THREADS controls CPU parallelism.

In ML workflows, os module functions locate datasets, create output directories, and manage checkpoint files. Path joining with os.path.join() creates portable paths across Windows and Unix systems. Existence checks with os.path.exists() prevent errors before file operations.

Process management functions like os.system() and os.environ modify the execution environment. Getting the current working directory with os.getcwd() and changing it with os.chdir() control where files are found. However, explicit paths typically beat changing directories for clarity.

Cross-platform compatibility requires careful path handling. os.sep provides the platform's path separator, but pathlib abstracts these details better. Understanding the os module enables system interaction, though modern code often prefers higher-level alternatives like pathlib and subprocess.` },
          { title: 'Sys Module', slug: 'aiml-sys-module', order: 6, content: `Sys Module

The sys module provides access to Python interpreter internals and system-specific parameters. sys.argv contains command-line arguments, enabling scripts to accept user input. sys.exit() terminates programs with specific exit codes. sys.path lists directories Python searches for modules during imports.

Python version information from sys.version and sys.version_info enables compatibility checks and version-specific code paths. Maximum integer size, default encoding, and platform identifiers help write portable code. Understanding Python internals through sys helps debug import issues and environment problems.

In AI projects, command-line arguments via sys.argv configure training runs—batch size, learning rate, dataset path, and model architecture. Argument parsing libraries like argparse build on sys.argv, providing structured interfaces. Exit codes signal success or failure to orchestration systems.

Module path manipulation with sys.path.append() adds directories to Python's module search path. This enables importing from non-standard locations, though proper package installation is cleaner. Understanding sys.path helps debug import errors when modules can't be found.

Standard streams sys.stdin, sys.stdout, and sys.stderr provide low-level I/O. Redirecting these streams captures output or implements custom logging. Memory profiling with sys.getsizeof() estimates object memory usage, useful for optimizing data structures. The sys module provides low-level control when higher-level abstractions don't suffice.` },
          { title: 'Pip Package Manager', slug: 'aiml-pip-package-manager', order: 7, content: `Pip Package Manager

Pip installs Python packages from PyPI (Python Package Index) and other sources. The command 'pip install package_name' downloads and installs packages with dependencies. Pip transforms Python from a language into an ecosystem, providing access to hundreds of thousands of community-contributed packages.

Requirements files list project dependencies for reproducible environments. Creating requirements.txt with 'pip freeze' captures installed versions. Installing from requirements with 'pip install -r requirements.txt' recreates environments exactly. Version pinning ensures consistency across development, testing, and production.

In machine learning development, pip installs frameworks like TensorFlow, PyTorch, scikit-learn, pandas, and specialized libraries. Virtual environments isolate project dependencies, preventing conflicts between projects requiring different package versions. Tools like venv and virtualenv create isolated Python environments.

Upgrading packages with 'pip install --upgrade' updates to newer versions. However, version bumps can break compatibility. Carefully managing versions and testing after upgrades prevents unexpected failures. Semantic versioning helps predict breaking changes from version numbers.

Alternative package managers like conda handle non-Python dependencies better, important for packages with C/C++ components. Understanding both pip and conda enables working across different project setups. Package management skills are essential for setting up development environments and deploying AI systems.` }
        ]
      }
    }
  });
  console.log('✅ Python Standard Libraries: 7 topics');

  // 5. PYTHON DSA
  await prisma.learnCategory.create({
    data: {
      title: 'Python DSA',
      order: 5,
      domainId: domain.id,
      topics: {
        create: [
          { title: 'DSA Introduction', slug: 'aiml-dsa-introduction', order: 1, content: `DSA Introduction

Data Structures and Algorithms (DSA) form the foundation of efficient programming. Data structures organize information for optimal access and modification, while algorithms define step-by-step procedures for computations. Together, they determine whether programs run instantly or take hours on identical hardware.

Choosing appropriate data structures affects program performance dramatically. Arrays provide constant-time indexing, linked lists enable efficient insertion and deletion, and hash tables offer near-constant lookups. Understanding trade-offs between time and space complexity guides architectural decisions.

In machine learning systems, DSA knowledge optimizes data loading pipelines, implements efficient caching, and designs scalable inference services. Graph algorithms power recommendation systems and neural network architectures. Understanding algorithmic complexity helps predict how systems scale with data growth.

Algorithmic thinking breaks complex problems into manageable steps. This mindset applies beyond classic DSA problems—designing training pipelines, implementing custom loss functions, and optimizing inference all benefit from algorithmic analysis. Strong DSA foundations enable both coding interviews and production system optimization.

While ML frameworks abstract low-level details, DSA understanding helps make informed decisions about batch sizes, caching strategies, and data preprocessing. This knowledge remains relevant even when frameworks handle implementation details.` },
          { title: 'Arrays', slug: 'aiml-arrays', order: 2, content: `Arrays

Arrays store fixed-size collections of elements in contiguous memory, enabling constant-time indexed access. Python lists implement dynamic arrays that resize automatically, providing array-like functionality with flexibility. NumPy arrays extend this concept to multidimensional arrays optimized for numerical computations.

Constant-time indexing makes arrays ideal for random access patterns. Sequential traversal benefits from cache locality—adjacent elements sit next to each other in memory. However, inserting or deleting in the middle requires shifting elements, an O(n) operation. Arrays excel when reading far exceeds modification.

In AI systems, arrays underpin everything. Image data, model weights, activations, and gradients all live in arrays. NumPy arrays and PyTorch tensors build on array concepts, adding vectorization and GPU acceleration. Understanding array fundamentals clarifies how these higher-level structures work.

Multidimensional arrays represent tensors—images as height×width×channels, batches as batch×features, and model weights as input×output matrices. Array reshaping, slicing, and indexing manipulate data shapes for different operations. Broadcasting enables operations on arrays of different shapes.

Array efficiency comes from contiguity and type uniformity. All elements share the same type, enabling compact storage and vectorized operations. This foundation explains why NumPy arrays dramatically outperform Python lists for numerical work.` },
          { title: 'Linked Lists', slug: 'aiml-linked-lists', order: 3, content: `Linked Lists

Linked lists store elements as nodes containing data and references to next nodes. Unlike arrays, elements scatter across memory connected by pointers. This structure enables efficient insertion and deletion without shifting elements, but sacrifices constant-time indexing.

Traversing linked lists requires following pointers sequentially from head to tail. Finding elements takes O(n) time since random access isn't possible. However, inserting or removing nodes only requires updating pointers, an O(1) operation when you already have the position.

In practical Python programming, linked lists appear less frequently than arrays—Python lists handle most use cases. However, understanding linked list concepts clarifies deque implementations, helps recognize when sequential access suffices, and provides foundation for more complex pointer-based structures.

Linked list variants include doubly linked lists with backward pointers enabling bidirectional traversal, and circular linked lists where the tail links to the head. These variants support specialized operations efficiently. Understanding trade-offs guides choosing appropriate structures.

While you rarely implement linked lists in ML code, understanding them builds intuition for graph structures used in neural networks and knowledge graphs. The concept of nodes with connections extends to computational graphs tracking gradients through operations.` },
          { title: 'Stacks', slug: 'aiml-stacks', order: 4, content: `Stacks

Stacks implement Last-In-First-Out (LIFO) ordering where the most recently added element comes out first. Think of a stack of plates—you add to the top and remove from the top. Push adds elements, pop removes them, and peek views the top without removal.

Python lists work excellently as stacks using append() for push and pop() for removal. The collections.deque provides a dedicated double-ended queue optimized for efficient additions and removals from both ends. Either structure implements stack operations in constant time.

In programming, stacks enable function call management—each call pushes a frame, and returns pop it. Expression evaluation uses stacks to handle operator precedence and nested structures. Undo/redo functionality naturally fits stack structures.

In AI systems, stacks appear in depth-first search algorithms exploring neural architecture spaces or traversing decision trees. Recursive algorithms implicitly use the call stack. Understanding stacks clarifies recursive behavior and helps convert recursion to iteration when needed.

The stack abstraction focuses on adding and removing from one end. This constraint enables elegant solutions to problems involving reversal, nesting validation, and backtracking. Recognizing stack-appropriate problems simplifies implementations.` },
          { title: 'Queues', slug: 'aiml-queues', order: 5, content: `Queues

Queues implement First-In-First-Out (FIFO) ordering where the earliest added element comes out first. Think of a line at a store—first person in line gets served first. Enqueue adds to the back, dequeue removes from the front, and peek views the front element.

Python's collections.deque provides efficient queue operations with O(1) enqueue and dequeue. Using lists as queues works but inefficiently—removing from the front with pop(0) is O(n). The queue module offers thread-safe queue implementations with blocking operations.

In machine learning pipelines, queues coordinate data loading and batch processing. One process loads and preprocesses data, enqueuing batches for training processes to dequeue and consume. This producer-consumer pattern enables parallel processing and smooth data flow.

Priority queues via heapq module order elements by priority rather than insertion order. This structure schedules tasks, implements algorithms like Dijkstra's shortest path, and manages event ordering. Training schedules and learning rate schedulers use priority queue concepts.

Circular queues, bounded queues, and double-ended queues (deques) extend basic queue functionality. Understanding queue variants helps choose appropriate structures for buffering, scheduling, and coordinating concurrent operations in complex ML systems.` },
          { title: 'Trees', slug: 'aiml-trees', order: 6, content: `Trees

Trees organize data hierarchically with nodes connected by edges, starting from a root node. Each node can have child nodes, forming parent-child relationships. Binary trees limit each node to two children, while general trees allow arbitrary numbers. Trees naturally represent hierarchical data and enable efficient searching and sorting.

Binary search trees (BSTs) maintain ordering—left children hold smaller values, right children hold larger values. This property enables O(log n) search, insertion, and deletion in balanced trees. However, unbalanced trees degrade to O(n) performance, motivating self-balancing trees like AVL and Red-Black trees.

In machine learning, decision trees form the basis of random forests and gradient boosting methods. Each node represents a decision based on features, branching toward predictions in leaf nodes. Tree-based models dominate tabular data competitions and provide interpretable alternatives to neural networks.

Tree traversal algorithms—inorder, preorder, postorder, and level-order—visit nodes in different sequences. These patterns appear in neural network architectures where operations flow through computational graphs. Understanding tree concepts illuminates gradient backpropagation through network layers.

Heap data structures, implemented as binary trees, efficiently maintain minimum or maximum elements. Priority queues use heaps internally. Understanding tree structures provides foundation for both classical algorithms and modern ML techniques like tree-based ensembles.` },
          { title: 'Graphs', slug: 'aiml-graphs', order: 7, content: `Graphs

Graphs represent relationships between entities using vertices (nodes) and edges (connections). Unlike trees, graphs allow cycles and multiple paths between nodes. Directed graphs have one-way edges, while undirected graphs have bidirectional connections. Graphs model social networks, knowledge bases, and neural network architectures.

Graph representations include adjacency matrices storing connections in 2D arrays, and adjacency lists storing each vertex's neighbors. Matrix representation suits dense graphs, while lists optimize sparse graphs. The representation choice affects memory usage and algorithm efficiency.

In AI systems, knowledge graphs structure factual information for reasoning and retrieval. Recommendation systems model user-item interactions as bipartite graphs. Graph neural networks propagate information across graph structures, enabling reasoning about molecular structures, social networks, and citation networks.

Graph algorithms like breadth-first search (BFS) and depth-first search (DFS) explore connectivity and find paths. Shortest path algorithms optimize routing and recommendation. PageRank, originally for web search, applies graph analysis to rank nodes by importance. These algorithms power various ML applications.

Understanding graphs enables working with relational data beyond simple tables. Graph databases, knowledge graph embeddings, and graph neural networks increasingly appear in modern AI systems. Graph concepts connect classical data structures to cutting-edge research.` },
          { title: 'Sorting Algorithms', slug: 'aiml-sorting-algorithms', order: 8, content: `Sorting Algorithms

Sorting arranges elements in specific order, fundamental to many algorithms and system optimizations. Common algorithms include quicksort (average O(n log n)), mergesort (guaranteed O(n log n)), and heapsort. Python's built-in sorted() and list.sort() use Timsort, an adaptive algorithm optimized for real-world data.

Different algorithms trade space for time, stability for speed, and average-case for worst-case performance. Stable sorts preserve relative ordering of equal elements, important when sorting by multiple keys. In-place sorts minimize memory usage at the cost of modifying input.

In ML workflows, sorting appears in data preprocessing, ranking predictions by confidence, and organizing results. While Python's built-in sorting handles most needs, understanding algorithms helps reason about performance. Sorting complexity often dominates pipeline performance when dealing with large datasets.

Partial sorting algorithms like quickselect find the k-th smallest element without full sorting, useful for top-k predictions. Bucket sort and counting sort achieve linear time for restricted input ranges, applicable to discrete labels or binned features.

While you rarely implement sorting from scratch, understanding algorithmic trade-offs guides choosing appropriate techniques. Database query optimization, caching strategies, and batch processing all involve sorting decisions that impact system performance.` },
          { title: 'Searching Algorithms', slug: 'aiml-searching-algorithms', order: 9, content: `Searching Algorithms

Searching locates specific elements within data structures. Linear search checks each element sequentially, taking O(n) time but working on any data. Binary search requires sorted data but achieves O(log n) time by repeatedly halving the search space. Hash-based search offers near-constant time with proper hash functions.

Binary search's divide-and-conquer approach applies beyond sorted arrays—finding optimal hyperparameters, implementing bisection methods for root finding, and searching discrete spaces efficiently all use binary search principles. The algorithm's simplicity belies its power and broad applicability.

In ML systems, nearest neighbor search finds similar items using distance metrics. Approximate nearest neighbor algorithms like locality-sensitive hashing trade perfect accuracy for speed, enabling similarity search in high-dimensional spaces. These techniques power recommendation systems and retrieval-augmented generation.

Search optimization considers whether to sort first or search directly. For single searches, linear search suffices. For repeated searches, upfront sorting amortizes costs. Understanding these trade-offs guides designing efficient data access patterns.

Advanced search includes interpolation search for uniformly distributed sorted data, and exponential search for unbounded ranges. While specialized, these algorithms demonstrate how analyzing data distribution enables optimization. Search optimization principles apply across ML pipelines.` },
          { title: 'Big O Notation', slug: 'aiml-big-o-notation', order: 10, content: `Big O Notation

Big O notation describes algorithm scalability by characterizing how runtime grows with input size. O(1) means constant time regardless of input size. O(n) grows linearly, O(n²) grows quadratically, and O(log n) grows logarithmically. This notation enables comparing algorithms and predicting performance at scale.

Analyzing algorithms requires identifying dominant operations and how they scale. Nested loops often indicate O(n²) complexity, while divide-and-conquer approaches often achieve O(n log n). Understanding these patterns helps identify bottlenecks and optimization opportunities.

In machine learning, Big O analysis predicts training time scaling. Transformer attention is O(n²) in sequence length, limiting context windows. Training neural networks is O(parameters × examples), explaining why larger models need more compute. Understanding complexity guides architectural decisions.

Space complexity follows similar notation, describing memory usage growth. Trade-offs between time and space complexities create optimization opportunities—caching exchanges memory for speed, while recomputation saves memory at time cost. Dynamic programming exemplifies this balance.

While Big O notation simplifies by ignoring constants and lower-order terms, it accurately predicts asymptotic behavior. A poorly implemented O(n log n) algorithm might lose to an optimized O(n²) algorithm for small inputs, but Big O governs scaling. Understanding algorithmic complexity is fundamental to building efficient AI systems.` }
        ]
      }
    }
  });
  console.log('✅ Python DSA: 10 topics');

  // ==========================================================================
  // BATCH 2: NumPy → Statistics
  // ==========================================================================
  console.log('\n📦 BATCH 2: NumPy → Statistics');

  // 6. NUMPY
  await prisma.learnCategory.create({
    data: {
      title: 'NumPy',
      order: 6,
      domainId: domain.id,
      topics: {
        create: [
          { title: 'NumPy Introduction', slug: 'aiml-numpy-introduction', order: 1, content: `NumPy Introduction

NumPy (Numerical Python) provides powerful n-dimensional array objects and mathematical functions optimized for scientific computing. Written in C, NumPy operations execute orders of magnitude faster than equivalent Python loops. It forms the foundation for the entire scientific Python ecosystem including Pandas, scikit-learn, TensorFlow, and PyTorch.

The ndarray object represents homogeneous multidimensional arrays with fixed sizes. Unlike Python lists, NumPy arrays store elements of uniform type in contiguous memory, enabling vectorized operations that apply functions across entire arrays simultaneously. This design eliminates slow Python loops for numerical computations.

In machine learning, NumPy handles all numerical data before it enters neural networks. Training data, model weights, activations, gradients, and predictions all flow through NumPy arrays or their framework-specific descendants (PyTorch tensors, TensorFlow tensors). Understanding NumPy is fundamental to understanding modern AI frameworks.

NumPy provides not just arrays but comprehensive mathematical operations—linear algebra, Fourier transforms, random number generation, and statistical functions. Broadcasting enables operations on arrays of different shapes following intuitive rules. Universal functions (ufuncs) apply element-wise operations efficiently.

Installing NumPy via pip makes it immediately available. The standard import convention 'import numpy as np' appears in virtually every data science script. Mastering NumPy is the gateway from Python programming to numerical computing and machine learning.` },
          { title: 'NumPy Arrays', slug: 'aiml-numpy-arrays', order: 2, content: `NumPy Arrays

NumPy arrays (ndarrays) are homogeneous data structures storing elements of the same type in contiguous memory. Creating arrays uses np.array() to convert Python lists, or functions like np.zeros(), np.ones(), and np.arange() for specific patterns. Arrays have fixed size upon creation, though you can create new arrays with different sizes.

Array attributes include shape (dimensions), dtype (data type), ndim (number of dimensions), and size (total elements). Shape tuples describe array dimensions—a (3, 4) array has 3 rows and 4 columns. Understanding shape is crucial for debugging dimension mismatches in neural networks.

In machine learning workflows, arrays represent everything. A grayscale image is a 2D array, a color image is 3D (height, width, channels), and a batch of images is 4D (batch, height, width, channels). Model weights are 2D arrays (input size, output size), and activations flow through layers as arrays.

Array dtype controls memory usage and computational precision. Float32 balances precision and performance for neural networks, while int8 handles image pixel values. Explicit dtype specification prevents unexpected type conversions and memory issues. GPU memory constraints make dtype choice critical.

Creating arrays from various sources—files, ranges, random values, or existing data—flexible initialization for different scenarios. Understanding array creation patterns streamlines data preparation and model implementation.` },
          { title: 'Array Indexing', slug: 'aiml-array-indexing', order: 3, content: `Array Indexing

Indexing accesses specific elements from arrays using square bracket notation. Single-dimensional arrays use integer indices like arr[3] to access the fourth element (zero-indexed). Multidimensional arrays use comma-separated indices like arr[2, 5] to access row 2, column 5. Negative indices count from the end, with -1 referencing the last element.

Boolean indexing filters arrays using boolean masks—arrays of True/False values. Creating conditions like arr[arr > 0] selects only positive elements. This powerful technique filters datasets, applies conditional operations, and implements masking in attention mechanisms.

Fancy indexing uses integer arrays to select multiple elements simultaneously. Passing lists of indices like arr[[1, 3, 5]] extracts specific elements in specified order. This enables gathering scattered data, implementing embeddings, and selecting specific features or samples.

In neural network operations, indexing extracts specific layers' outputs, selects batch examples, or gathers specific class predictions. Attention mechanisms use sophisticated indexing to focus on relevant input positions. Understanding indexing patterns enables implementing custom operations.

Combining indexing types—integers, slices, booleans, and fancy indices—creates complex selection patterns. Proper indexing avoids copying data unnecessarily, improving memory efficiency. These skills are fundamental to data manipulation in ML pipelines.` },
          { title: 'Array Slicing', slug: 'aiml-array-slicing', order: 4, content: `Array Slicing

Slicing extracts subarrays using start:stop:step syntax. The slice arr[2:7] returns elements from index 2 through 6 (stop is exclusive). Omitting values uses defaults—arr[:5] starts from beginning, arr[5:] goes to end, and arr[::2] takes every second element. Slicing multdimensional arrays uses comma-separated slices for each dimension.

Slices create views rather than copies—modifying a slice modifies the original array. This memory-efficient behavior differs from Python lists where slicing copies. Explicit .copy() creates independent copies when needed. Understanding view versus copy semantics prevents unexpected mutations.

In machine learning, slicing extracts training batches, splits data into train-validation-test sets, and crops images. Sequence models slice temporal windows from time series. Convolutional operations use advanced slicing patterns though frameworks typically abstract this complexity.

Step parameter enables downsampling—arr[::2] selects every other element, reducing data size. Negative steps reverse arrays—arr[::-1] flips array direction. These patterns appear in data augmentation, sequence reversal for bidirectional models, and temporal resampling.

Efficient slicing avoids unnecessary copying, critical for large arrays and limited memory. The colon operator with ellipsis enables concise multi-dimensional slicing. Mastering slicing patterns is essential for data preprocessing and model implementations.` },
          { title: 'Array Operations', slug: 'aiml-array-operations', order: 5, content: `Array Operations

NumPy operations apply element-wise to entire arrays without explicit loops, called vectorization. Arithmetic operators (+, -, *, /) broadcast across arrays, performing operations on corresponding elements. This vectorization leverages optimized C code and SIMD instructions, dramatically outperforming Python loops.

Universal functions (ufuncs) like np.exp(), np.log(), np.sin(), and np.sqrt() operate element-wise with C-level performance. These functions support broadcasting, type casting, and parallel execution. Ufuncs form the building blocks for implementing mathematical transformations efficiently.

In deep learning, array operations compute activations, apply transformations, and aggregate results. Matrix multiplication via @ operator or np.matmul() implements dense layer computations. Element-wise operations apply activation functions like ReLU or sigmoid. Aggregations like sum() and mean() compute loss functions and metrics.

Broadcasting extends operations to arrays of different shapes following specific rules. A (3, 4) array plus a (4,) vector broadcasts the vector across rows. This mechanism enables adding biases to layer outputs, normalizing data, and implementing efficient computations without explicit replication.

Reduction operations like sum(), max(), and mean() aggregate across dimensions specified by axis parameters. Understanding axis operations is crucial—axis=0 aggregates across rows, axis=1 across columns. These reductions compute batch statistics, losses, and evaluation metrics.` },
          { title: 'Array Shape', slug: 'aiml-array-shape', order: 6, content: `Array Shape

Array shape describes the size of each dimension as a tuple. A 1D array with 5 elements has shape (5,), a matrix with 3 rows and 4 columns has shape (3, 4), and an image batch might be (32, 224, 224, 3) for 32 images of 224x224 with 3 color channels. The shape attribute returns this tuple, fundamental for understanding data structure.

Shape determines compatibility for operations. Matrix multiplication requires inner dimensions to match—(3,4) @ (4,2) works, producing (3,2). Broadcasting rules depend on shapes aligning properly. Shape mismatches are a common source of errors in neural networks, causing cryptic dimension errors.

In ML pipelines, constantly tracking shapes ensures data flows correctly through transformations. Input shapes determine model architecture—image dimensions dictate convolutional layers, sequence lengths affect recurrent networks, and feature counts define dense layer sizes. Printing shapes during development clarifies data flow.

Standard shape conventions in deep learning place batch dimension first. Images are (batch, height, width, channels) or (batch, channels, height, width) depending on framework. Time series are (batch, timesteps, features). Following conventions prevents confusion and enables code reuse.

Verifying shapes before operations catches bugs early. Assertions checking expected shapes document assumptions and fail fast when data doesn't match expectations. Understanding shape manipulation is prerequisite for implementing neural network layers correctly.` },
          { title: 'Array Reshape', slug: 'aiml-array-reshape', order: 7, content: `Array Reshape

Reshaping changes array dimensions without modifying data. The reshape() method accepts a new shape tuple, rearranging elements to match new dimensions. Total elements must remain constant—reshaping a (12,) array could produce (3,4) or (2,6) but not (5,5). Using -1 for one dimension auto-calculates that size.

Common patterns include flattening with reshape(-1) to create 1D arrays, adding batch dimensions with reshape(1, -1), and converting between image formats. Reshaping enables adapting data shapes to match layer requirements without copying data.

In neural networks, reshaping prepares data for different layer types. Flattening converts convolutional outputs to dense layer inputs. Reshape adds or removes dimensions for broadcasting compatibility. Transpose-like operations rearrange dimension order when frameworks expect different conventions.

The reshape operation creates views when possible, avoiding data copying for efficiency. However, non-contiguous memory layouts sometimes force copies. Understanding when copies occur helps optimize memory usage in large-scale training.

Careful reshaping preserves intended data structure. Reshaping (4, 3) to (3, 4) reinterprets data organization, potentially scrambling meaning. Always verify reshaped data maintains logical structure. Shape transformations are powerful but require understanding data layout.` },
          { title: 'Array Iteration', slug: 'aiml-array-iteration', order: 8, content: `Array Iteration

Iterating arrays element-by-element uses standard Python for loops, though this sacrifices NumPy's performance advantages. For 1D arrays, iteration yields individual elements. For multidimensional arrays, iteration yields rows (first dimension). The flat attribute provides a flattened iterator over all elements regardless of dimensions.

While iteration works, vectorized operations should be preferred whenever possible. Explicit loops in Python run dramatically slower than vectorized NumPy operations. However, complex logic sometimes requires iteration where vectorization isn't straightforward.

In machine learning code, avoid iterating individual elements when possible. Instead, use slicing for batches, vectorized operations for transformations, and aggregations for reductions. Framework-specific iteration patterns handle batching efficiently without manual loops.

Specialized iterators like np.nditer() provide advanced iteration control, supporting custom iteration orders, broadcasting during iteration, and multi-array iteration. These tools enable implementing custom operations when high-level functions don't suffice.

Understanding when to iterate versus vectorize is key skill. Iterating for control flow with vectorized operations inside loops balances flexibility and performance. The goal is minimizing Python-level loops while maximizing NumPy's optimized operations.` },
          { title: 'Array Join', slug: 'aiml-array-join', order: 9, content: generateContent('Array Join', 'NumPy') },
          { title: 'Array Split', slug: 'aiml-array-split', order: 10, content: `Array Split

Splitting divides arrays into multiple sub-arrays. Functions like np.split(), np.array_split(), np.vsplit(), and np.hsplit() partition arrays along specified dimensions. This enables distributing data across workers, creating train-validation-test splits, and implementing batch processing.

Split() requires split points or counts, dividing arrays into equal pieces. array_split() handles sizes that don't divide evenly, creating slightly unequal pieces. Specifying indices creates custom split points for non-uniform division.

In machine learning, splitting creates data partitions for cross-validation, separate training batches, and parallel processing. K-fold cross-validation splits data into K parts, training on K-1 and validating on the remaining fold. Batch processing splits datasets into chunks fitting memory constraints.

Split views share memory with original arrays when possible, avoiding copies. This efficiency matters for large datasets. However, modifying splits may affect originals—use copy() for independent arrays when needed.

Understanding splitting complements joining, together providing complete array manipulation capabilities. These operations manage data flow through complex pipelines, coordinating parallel processing, and implementing efficient batch strategies.` }
        ]
      }
    }
  });
  console.log('✅ NumPy: 10 topics');

  // 7. PANDAS
  await prisma.learnCategory.create({
    data: {
      title: 'Pandas',
      order: 7,
      domainId: domain.id,
      topics: {
        create: [
          { title: 'Pandas Introduction', slug: 'aiml-pandas-introduction', order: 1, content: `Pandas Introduction\n\nPandas is the definitive library for data manipulation and analysis in Python. Built on NumPy, Pandas provides high-level data structures and operations for working with tabular and time-series data. The DataFrame object, similar to spreadsheets or SQL tables, forms the cornerstone of data analysis workflows.\n\nDesigned by Wes McKinney for quantitative finance, Pandas has become the standard tool for data wrangling across industries. Its intuitive API enables loading data from various formats, cleaning messy data, transforming structures, and performing complex analyses with concise syntax. Integration with visualization libraries makes exploratory data analysis seamless.\n\nIn machine learning projects, Pandas handles everything before model training\u2014loading CSVs, cleaning missing values, encoding categorical variables, engineering features, and splitting datasets. Most Kaggle competitions and real-world ML projects start with Pandas DataFrames. Understanding Pandas is essential for practical data science.\n\nPandas excels at operations that are cumbersome in raw NumPy\u2014filtering rows by conditions, grouping by categories, merging datasets, handling missing data, and time-series operations. The library's integration with NumPy means you can mix low-level array operations with high-level data manipulation.\n\nImporting with 'import pandas as pd' is universal convention. Pandas transforms data from messy reality into clean arrays ready for ML algorithms. Mastering Pandas dramatically accelerates the data preparation phase of ML projects.` },
          { title: 'Pandas Series', slug: 'aiml-pandas-series', order: 2, content: `Pandas Series\n\nA Pandas Series is a one-dimensional labeled array capable of holding any data type. Think of it as a column from a spreadsheet or an enhanced NumPy array with an index. Each element has a label (index), enabling powerful label-based data access beyond integer positions.\n\nSeries combine the performance of NumPy arrays with the flexibility of dictionary-like access. You can create Series from lists, NumPy arrays, or dictionaries. The index can be integers, strings, dates, or any hashable type, making data alignment automatic during operations.\n\nIn ML workflows, Series often represent single features, model predictions, or evaluation metrics. Operations on Series are vectorized like NumPy, but with automatic alignment by index. Missing data becomes 'NaN', which Pandas handles gracefully in computations.\n\nSeries support NumPy operations (mean, std, sum) while adding methods like 'value_counts()' for categorical analysis and 'apply()' for custom transformations. Boolean indexing filters data easily: 'series[series > 0]' selects positive values. These capabilities make exploratory data analysis intuitive.\n\nUnderstanding Series is essential because DataFrames are collections of Series sharing an index. Operations you learn on Series transfer directly to DataFrame columns. Series form the building blocks for more complex data manipulations.` },
          { title: 'Pandas DataFrames', slug: 'aiml-pandas-dataframes', order: 3, content: `Pandas DataFrames\n\nThe DataFrame is Pandas' two-dimensional labeled data structure, analogous to spreadsheets, SQL tables, or dictionaries of Series. It's the most used Pandas object for data analysis. Rows and columns both have labels, enabling powerful data alignment and manipulation.\n\nDataFrames handle heterogeneous data\u2014different columns can have different types (integers, floats, strings, dates). This flexibility mirrors real-world datasets where features have varied types. Creating DataFrames from dictionaries, CSVs, databases, or APIs is straightforward and forms the entry point for most ML projects.\n\nIn machine learning, DataFrames hold entire datasets with features as columns and samples as rows. Selecting columns ('df["age"]'), filtering rows ('df[df.age > 25]'), and applying transformations ('df.groupby("category").mean()') enable rapid data exploration. DataFrames naturally represent the X matrix and y vector before model training.\n\nDataFrame operations return DataFrames or Series, enabling method chaining for readable data pipelines. Methods like 'merge()', 'concat()', and 'pivot()' handle complex data restructuring. Integration with Matplotlib and Seaborn makes visualization seamless with 'df.plot()' methods.\n\nMastering DataFrames unlocks efficient data wrangling for ML projects. Understanding indexing, selection, and transformation operations accelerates the 80% of ML project time spent on data preparation. DataFrames bridge raw data and clean ML-ready inputs.` },
          { title: 'Reading Data', slug: 'aiml-reading-data', order: 4, content: `Reading Data with Pandas\n\nPandas provides unified interfaces for reading data from diverse sources\u2014CSV, Excel, JSON, SQL databases, HTML, Parquet, and more. The 'read_csv()' function alone handles countless real-world scenarios with parameters for delimiters, headers, data types, and missing values.\n\nMost ML projects start with 'pd.read_csv("data.csv")', instantly transforming flat files into DataFrames. Parameters like 'usecols' select specific columns, 'dtype' specifies types to save memory, and 'parse_dates' converts string timestamps. These options optimize loading for large datasets.\n\nReading from databases uses 'pd.read_sql()' with connection objects, executing queries and returning results as DataFrames. This eliminates manual iteration through database cursors. For APIs returning JSON, 'pd.read_json()' or 'pd.DataFrame(json_data)' converts responses to tabular format.\n\nPandas intelligently infers data types during loading, but specifying types explicitly with 'dtype' parameter improves performance and memory usage. For massive files, 'chunksize' parameter enables reading data in chunks, preventing memory overflow. The 'nrows' parameter helps preview large datasets.\n\nEfficient data loading is critical\u2014poor reading strategies cause memory issues and slow pipelines. Understanding Pandas I/O functions ensures smooth data ingestion from any source, the first step in every ML pipeline.` },
          { title: 'Data Cleaning', slug: 'aiml-data-cleaning', order: 5, content: `Data Cleaning with Pandas\n\nData cleaning is the process of detecting and correcting corrupt or inaccurate records from datasets. Real-world data is messy\u2014missing values, duplicates, incorrect types, outliers, and inconsistent formatting plague most datasets. Pandas provides comprehensive tools for identifying and resolving these issues.\n\nMissing data appears as 'NaN' in Pandas. The 'isnull()' and 'notnull()' methods identify missing values, while 'dropna()' removes them and 'fillna()' replaces them with specified values. Choosing between dropping and filling depends on data volume and missing patterns. Forward-fill and back-fill methods handle time-series gaps.\n\nDuplicates waste memory and skew analysis. The 'duplicated()' method flags duplicate rows, and 'drop_duplicates()' removes them. Type conversion with 'astype()' fixes incorrect data types, critical when numbers are stored as strings. Outlier detection using statistical methods or domain knowledge prevents model contamination.\n\nString cleaning methods like 'str.lower()', 'str.strip()', and 'str.replace()' standardize text data. Categorical encoding with 'get_dummies()' or 'factorize()' converts categories to numeric form for ML algorithms. These transformations prepare data for model ingestion.\n\nData quality determines model quality\u201480% of ML project time involves cleaning. Pandas makes cleaning programmatic and reproducible, unlike manual spreadsheet editing. Clean data is the foundation of reliable ML models.` },
          { title: 'Data Analysis', slug: 'aiml-data-analysis', order: 6, content: `Data Analysis with Pandas\n\nData analysis in Pandas involves exploring, summarizing, and understanding datasets to extract insights. Descriptive statistics, aggregations, and transformations reveal patterns before formal modeling. The 'describe()' method provides instant statistical summaries\u2014count, mean, std, min, quartiles, max\u2014across columns.\n\nAggregation methods like 'sum()', 'mean()', 'median()', 'std()', and 'count()' compute statistics efficiently. These operations apply to entire DataFrames, individual columns, or grouped data. Understanding data distributions and central tendencies guides feature engineering and model selection decisions.\n\nThe 'value_counts()' method is essential for categorical analysis, showing frequency distributions. For continuous variables, 'hist()' and 'plot()' methods create visualizations directly from DataFrames. Cross-tabulation with 'crosstab()' or 'pivot_table()' reveals relationships between categorical variables.\n\nCorrelation analysis using 'corr()' identifies relationships between numeric features. High correlations suggest redundancy or multicollinearity, influencing feature selection. The 'apply()' method enables custom analysis functions across rows or columns, extending Pandas' built-in capabilities.\n\nExploratory Data Analysis (EDA) with Pandas precedes model building. Understanding data characteristics\u2014distributions, correlations, anomalies\u2014informs feature engineering and model choice. Pandas makes EDA efficient and interactive, accelerating the path to insights.` },
          { title: 'Data Selection', slug: 'aiml-data-selection', order: 7, content: `Data Selection in Pandas\n\nSelecting subsets of data is fundamental to data analysis. Pandas offers multiple indexing methods\u2014bracket notation, 'loc', 'iloc', and boolean indexing\u2014each suited to different selection patterns. Mastering these techniques enables efficient data extraction and manipulation.\n\nBracket notation ('df["column"]') selects columns by name, returning a Series. Multiple columns use lists: 'df[["age", "income"]]' returns a DataFrame. Row selection uses slicing: 'df[0:5]' selects first five rows. This syntax is intuitive but limited for complex selections.\n\nThe 'loc' accessor selects by labels\u2014row and column names. 'df.loc[0:5, "age"]' selects rows 0-5 of the age column. Boolean arrays enable conditional selection: 'df.loc[df.age > 30]' filters rows where age exceeds 30. 'loc' is label-based and inclusive of end points.\n\nThe 'iloc' accessor selects by integer positions, like NumPy indexing. 'df.iloc[0:5, 0:3]' selects first five rows and first three columns using positions. This position-based indexing is useful when you don't know column names or for programmatic selection.\n\nBoolean indexing filters data based on conditions: 'df[df.age > 25] & (df.income < 50000)' selects rows meeting both criteria. Query method offers SQL-like syntax: 'df.query("age > 25 and income < 50000")'. These selection methods form the basis of data filtering in ML pipelines.` },
          { title: 'Data Grouping', slug: 'aiml-data-grouping', order: 8, content: `Data Grouping in Pandas\n\nThe 'groupby()' operation is one of Pandas' most powerful features, implementing the split-apply-combine pattern. Group data by categorical variables, apply aggregation or transformation functions, and combine results. This mirrors SQL's GROUP BY but with more flexibility and Python's expressiveness.\n\nGrouping splits DataFrames into groups based on column values. 'df.groupby("category")' creates a GroupBy object ready for aggregation. Following with 'mean()', 'sum()', or 'count()' computes statistics per group. Multiple grouping columns enable hierarchical aggregation: 'df.groupby(["region", "product"]).sum()'.\n\nIn ML projects, grouping calculates aggregate features\u2014average customer spend, total transactions per user, engagement metrics by segment. These engineered features often improve model performance significantly. Groupby enables creating these features efficiently from transactional data.\n\nAggregation functions can be multiple: 'df.groupby("category").agg({"price": ["mean", "std"], "quantity": "sum"})' applies different functions to different columns. Custom aggregation functions via 'agg()' or 'apply()' enable domain-specific calculations. Transform method broadcasts group statistics back to original DataFrame shape.\n\nGrouping reveals patterns in data\u2014how metrics vary across segments, time periods, or categories. This exploratory grouping informs feature engineering and model training strategies. Understanding groupby unlocks powerful data aggregation capabilities essential for real-world ML.` },
          { title: 'Data Merging', slug: 'aiml-data-merging', order: 9, content: `Data Merging in Pandas\n\nCombining data from multiple sources is essential in real-world ML projects. Pandas provides 'merge()', 'join()', and 'concat()' methods for combining DataFrames. These operations mirror SQL joins but with pandas-specific enhancements for index alignment and flexibility.\n\nThe 'merge()' function performs database-style joins\u2014inner, outer, left, right\u2014based on common columns. 'pd.merge(df1, df2, on="user_id")' combines DataFrames sharing a user_id column. This is critical when features come from different tables or data sources, common in production ML pipelines.\n\nLeft joins preserve all records from the left DataFrame while matching right DataFrame records. Inner joins keep only matching records. Outer joins include all records from both DataFrames, filling missing matches with NaN. Understanding join types prevents data loss and unexpected results during merges.\n\nThe 'concat()' function stacks DataFrames vertically (rows) or horizontally (columns). 'pd.concat([df1, df2], axis=0)' appends rows, useful for combining data batches. 'concat()' with axis=1 joins DataFrames side-by-side, similar to join(). Handling duplicate indices requires attention to avoid silent errors.\n\nIn ML workflows, merging combines user data with transaction history, enriches features with external datasets, or joins predictions back to original data. Efficient merging prevents memory issues and maintains data integrity. Mastering merge operations is essential for building complex feature sets from multiple data sources.` },
          { title: 'Data Visualization', slug: 'aiml-pandas-data-visualization', order: 10, content: `Data Visualization with Pandas\n\nPandas integrates visualization capabilities directly into DataFrames via the 'plot()' method, built on Matplotlib. Quick visualizations during EDA help identify patterns, outliers, and distributions without switching to separate visualization libraries. This integration makes exploratory plotting effortless.\n\nCalling 'df.plot()' creates line plots by default, with optional parameters for plot type: 'kind="bar"' for bar charts, 'kind="hist"' for histograms, 'kind="box"' for box plots, 'kind="scatter"' for scatter plots. Series plotting with 'series.plot()' visualizes single features quickly. These one-liners accelerate exploratory analysis.\n\nHistograms reveal feature distributions\u2014normal, skewed, bimodal patterns guide preprocessing decisions. Box plots identify outliers and quartile structures. Scatter plots visualize relationships between two features, highlighting correlations or clusters. Bar charts compare categorical aggregations clearly.\n\nAdvanced plotting includes correlation matrices with heatmaps: 'df.corr().plot(kind="heatmap")' (via Seaborn integration). Subplots using 'subplots=True' parameter create multiple charts from multi-column DataFrames. Customization through Matplotlib parameters (title, xlabel, ylabel, legend) refines visualizations.\n\nVisualization is crucial for understanding data before modeling. Pandas' built-in plotting makes exploratory visualization fast and interactive. While Matplotlib and Seaborn offer more control, Pandas plotting serves rapid exploration needs perfectly. Visual EDA uncovers insights that summary statistics miss.` }
        ]
      }
    }
  });
  console.log('✅ Pandas: 10 topics');

  // 8. DATA VISUALIZATION
  await prisma.learnCategory.create({
    data: {
      title: 'Data Visualization',
      order: 8,
      domainId: domain.id,
      topics: {
        create: [
          { title: 'Matplotlib Introduction', slug: 'aiml-matplotlib-introduction', order: 1, content: `Matplotlib Introduction\n\nMatplotlib is Python's foundational plotting library, providing fine-grained control over every aspect of visualizations. Created by John Hunter in 2003, Matplotlib's design mirrors MATLAB's plotting interface, making it familiar to engineers and scientists. It forms the basis for higher-level libraries like Seaborn and Pandas plotting.\n\nThe library operates through two interfaces: the pyplot module ('plt') for quick MATLAB-style plotting, and the object-oriented interface for programmatic control. Understanding both approaches enables flexibility—pyplot for interactive exploration, OOP for production-quality figures in ML pipelines.\n\nIn machine learning workflows, Matplotlib visualizes training curves, confusion matrices, decision boundaries, feature importance, and prediction distributions. These visualizations communicate model behavior to stakeholders and guide model improvement. Publication-quality figures require Matplotlib's precision control over fonts, colors, and layouts.\n\nMatplotlib renders to multiple backends—displaying in Jupyter notebooks, saving to files (PNG, PDF, SVG), or embedding in GUI applications. This versatility makes it suitable for both interactive analysis and automated reporting pipelines. Integration with NumPy arrays enables efficient plotting of large datasets.\n\nMastering Matplotlib fundamentals unlocks data visualization capabilities essential for ML projects. While modern libraries offer simpler APIs, Matplotlib's flexibility and control remain unmatched for custom visualizations. Understanding Matplotlib deepens your ability to communicate data insights effectively.` },
          { title: 'Line Plots', slug: 'aiml-line-plots', order: 2, content: `Line Plots\n\nLine plots visualize continuous data as connected points, ideal for showing trends over time or ordered sequences. In ML projects, line plots track training and validation loss across epochs, monitor learning rates, or display time-series predictions. They reveal patterns, trends, and anomalies in sequential data.\n\nCreating line plots with Matplotlib uses 'plt.plot(x, y)', where x and y are array-like sequences. Multiple lines on one plot enable comparing different models, features, or conditions. Color, line style (solid, dashed, dotted), and markers differentiate lines visually. Legends label each line clearly.\n\nIn deep learning, line plots are essential for visualizing training dynamics—loss curves show convergence or overfitting when training loss decreases but validation loss increases. Learning rate schedules plotted over epochs visualize annealing strategies. Metric tracking (accuracy, F1, AUROC) across training helps diagnose model behavior.\n\nLine plots handle large datasets efficiently when data points connect meaningfully. For time-series forecasting, plotting actual vs. predicted values reveals model accuracy visually. Confidence intervals displayed as shaded regions (via 'fill_between()') communicate prediction uncertainty.\n\nUnderstanding line plots enables monitoring model training, comparing algorithms, and presenting sequential results. They're the workhorse visualization for tracking ML experiments and communicating temporal patterns clearly.` },
          { title: 'Scatter Plots', slug: 'aiml-scatter-plots', order: 3, content: `Scatter Plots\n\nScatter plots display individual data points as dots in two-dimensional space, revealing relationships between two continuous variables. Each point's position encodes feature values, making patterns like correlations, clusters, or outliers immediately visible. Scatter plots are fundamental for exploratory data analysis in ML.\n\nCreating scatter plots uses 'plt.scatter(x, y)', with optional parameters for point size, color, transparency, and marker style. Color-coding points by a third variable (using 'c' parameter) adds dimensionality—class labels, prediction confidence, or continuous features. Size variation ('s' parameter) encodes another dimension.\n\nIn machine learning, scatter plots visualize feature relationships to inform feature engineering decisions. High correlation suggests redundancy; distinct clusters suggest separability. Plotting predicted vs. actual values diagnoses model accuracy—perfect predictions align on the diagonal. Outliers in scatter plots indicate data quality issues or edge cases.\n\nDecision boundaries visualization combines scatter plots with contour plots, showing how classifiers partition feature space. Principal Component Analysis (PCA) results plotted in 2D reveal dataset structure and class separation. These visualizations guide model selection and architecture decisions.\n\nScatter plots handle thousands of points efficiently, though very large datasets benefit from transparency (alpha parameter) to show density. Understanding relationships between features through scatter plots accelerates feature selection and engineering in ML pipelines.` },
          { title: 'Bar Charts', slug: 'aiml-bar-charts', order: 4, content: `Bar Charts\n\nBar charts compare quantities across discrete categories using rectangular bars with lengths proportional to values. They excel at displaying categorical data distributions, model performance metrics across classes, or feature importance rankings. Bar charts make categorical comparisons intuitive and immediate.\n\nCreating bar charts uses 'plt.bar(categories, values)' for vertical bars or 'plt.barh()' for horizontal orientation. Horizontal bars work better for long category names. Grouped bars compare multiple metrics per category; stacked bars show composition. Color differentiation distinguishes groups or categories clearly.\n\nIn ML workflows, bar charts visualize class distributions in datasets, revealing class imbalance issues. Feature importance plots rank features by contribution to model predictions—Random Forests and XGBoost provide importances naturally visualized as bars. Confusion matrix values displayed as bars clarify classification errors by class.\n\nModel comparison uses grouped bar charts showing accuracy, precision, recall across different algorithms. Hyperparameter tuning results plotted as bars identify optimal configurations. Error analysis displays error counts by category, focusing debugging efforts on problematic classes.\n\nBar charts communicate categorical insights effectively to technical and non-technical audiences. Their simplicity makes complex model performance metrics accessible. Understanding bar charts enables clear communication of ML model characteristics and results.` },
          { title: 'Histograms', slug: 'aiml-histograms', order: 5, content: `Histograms\n\nHistograms visualize the distribution of continuous data by grouping values into bins and counting frequency in each bin. They reveal data shape—normal, skewed, bimodal, uniform—guiding preprocessing decisions in ML pipelines. Understanding feature distributions is critical before model training.\n\nCreating histograms uses 'plt.hist(data, bins=30)', where bins control granularity. Too few bins oversimplify; too many bins create noise. Automatic binning algorithms (Sturges, Scott, Freedman-Diaconis) optimize bin selection. Overlapping histograms with transparency compare distributions across groups or classes.\n\nIn machine learning, histograms identify skewed features requiring transformation—log transform for right-skewed data, power transforms for normalization. Outliers appear as isolated bins far from the main distribution. Class-conditional histograms (separate histograms per class) reveal feature discriminative power.\n\nPrediction distributions visualized as histograms diagnose model calibration—well-calibrated classifiers produce uniform histogram of predicted probabilities. Residual histograms in regression should center at zero with normal distribution; deviations indicate model bias or missing features.\n\nHistograms are essential for exploratory data analysis and model diagnostics. They reveal data characteristics that summary statistics miss. Understanding distributions through histograms informs feature engineering, transformation strategies, and model validation approaches.` },
          { title: 'Pie Charts', slug: 'aiml-pie-charts', order: 6, content: `Pie Charts\n\nPie charts represent parts of a whole using circular sectors proportional to quantities. Each slice's angle corresponds to its proportion of the total. While popular for presentations, pie charts have limitations—humans perceive angles and areas less accurately than lengths, making bar charts often clearer.\n\nCreating pie charts uses 'plt.pie(values, labels=labels)', with optional parameters for colors, explosion (separating slices), shadows, and percentage display. Automatic percentage calculation simplifies showing proportions. Exploding important slices emphasizes them visually.\n\nIn ML contexts, pie charts visualize class distributions in balanced or imbalanced datasets. A pie chart immediately shows if one class dominates—85% negative class suggests imbalance requiring resampling or adjusted loss functions. Model prediction distributions across classes communicate classifier behavior.\n\nComputing resource allocation, time spent in training stages, or feature category distributions suit pie charts when communicating simple proportions to non-technical stakeholders. However, more than 5-6 slices becomes cluttered; bar charts handle many categories better.\n\nUse pie charts sparingly in technical ML work—bar charts typically communicate the same information more clearly. Reserve pie charts for high-level overviews and presentations where simplicity and familiarity matter more than precise comparison.` },
          { title: 'Subplots', slug: 'aiml-subplots', order: 7, content: `Subplots\n\nSubplots arrange multiple plots in a grid within a single figure, enabling comparison across visualizations. They're essential for comprehensive EDA dashboards, model comparison charts, and multi-metric tracking. Subplots save space and facilitate visual comparison better than separate figures.\n\nCreating subplots uses 'plt.subplots(rows, cols)', returning figure and axes objects. The axes array ('axes[0, 1]') references individual subplot positions for plotting. Alternatively, 'plt.subplot(rows, cols, index)' creates one subplot at a time. Shared axes ('sharex=True', 'sharey=True') align scales for meaningful comparison.\n\nIn ML workflows, subplots display training metrics (loss, accuracy) side-by-side, or show feature distributions across multiple features simultaneously. Comparing model predictions across different test samples uses subplots effectively. Confusion matrices for multiple models arranged in subplots enable direct performance comparison.\n\nSubplot layouts accommodate various aspect ratios and sizes using 'gridspec' for fine-grained control. Shared colorbars across subplots maintain consistent scales. Tight layout ('plt.tight_layout()') automatically adjusts spacing to prevent label overlap.\n\nMastering subplots enables creating comprehensive visualization dashboards for ML experiments. They organize related visualizations cohesively, improving interpretability and communication of complex results. Professional ML presentations rely heavily on well-designed subplot arrangements.` },
          { title: 'Customization', slug: 'aiml-customization', order: 8, content: `Plot Customization\n\nCustomization transforms basic plots into publication-quality visualizations. Titles, axis labels, legends, grids, colors, fonts, and styles make plots clear and professional. Default Matplotlib settings suit quick exploration, but polished presentations and papers require deliberate customization.\n\nTitle and labels use 'plt.title()', 'plt.xlabel()', and 'plt.ylabel()' with font size and weight parameters. Legends ('plt.legend()') identify multiple series, with positioning options (upper right, lower left, outside plot area). Grid lines ('plt.grid()') aid reading values; linestyle and alpha control visibility.\n\nColor schemes matter—qualitative for categories, sequential for ordered data, diverging for data with meaningful center. Colorblind-friendly palettes ensure accessibility. Line styles, markers, and widths differentiate series when color alone insufficient. Font sizes must consider final display medium—larger for presentations, smaller for papers.\n\nMatplotlib styles ('plt.style.use("seaborn")') apply consistent themes across plots. Custom rcParams dictate default settings for colors, fonts, and sizes globally. Saving figures with high DPI ('plt.savefig("plot.png", dpi=300)') ensures print quality.\n\nIn ML reporting, well-customized plots communicate results professionally. Clear labels, appropriate scales, and thoughtful color choices make complex results accessible. Customization skills differentiate amateur from professional visualizations, impacting how audiences perceive your work.` }
        ]
      }
    }
  });
  console.log('✅ Data Visualization: 8 topics');

  // 9. STATISTICS
  await prisma.learnCategory.create({
    data: {
      title: 'Statistics',
      order: 9,
      domainId: domain.id,
      topics: {
        create: [
          { title: 'Statistics Introduction', slug: 'aiml-statistics-introduction', order: 1, content: `Statistics Introduction\n\nStatistics is the science of collecting, analyzing, interpreting, and presenting data. It provides the mathematical foundation for making decisions under uncertainty, a core challenge in machine learning. Understanding statistics enables reasoning about model performance, data quality, and prediction confidence.\n\nDescriptive statistics summarize data characteristics—mean, median, variance reveal central tendencies and spread. Inferential statistics generalize from samples to populations, using concepts like confidence intervals and hypothesis testing. These techniques underpin model evaluation and A/B testing in production ML systems.\n\nIn machine learning, statistics guides every stage—exploratory data analysis uses descriptive statistics, feature selection employs correlation analysis, model evaluation relies on statistical tests, and uncertainty quantification uses probability theory. Bayesian methods blend probability and statistics for principled inference under uncertainty.\n\nStatistical thinking prevents common ML pitfalls—p-hacking in model selection, overfitting from multiple testing, and misinterpreting randomness as signal. Understanding sampling distributions, bias-variance tradeoff, and central limit theorem provides theoretical grounding for practical ML work.\n\nMastering statistics enables rigorous ML experimentation and interpretation. It transforms ML from black-box prediction to principled inference with quantified uncertainty. Statistics is the language of data science.` },
          { title: 'Descriptive Statistics', slug: 'aiml-descriptive-statistics', order: 2, content: `Descriptive Statistics\n\nDescriptive statistics summarize and describe data characteristics without making inferences beyond the observed data. Measures of central tendency (mean, median, mode) locate data centers. Measures of spread (variance, standard deviation, range, IQR) quantify variability. These summaries compress datasets into interpretable numbers.\n\nThe mean represents arithmetic average, sensitive to outliers. The median splits data into equal halves, robust to outliers. The mode identifies most frequent values, useful for categorical and discrete data. Choosing appropriate measures depends on data distribution and presence of outliers.\n\nVariance and standard deviation quantify how data spreads around the mean. Low values indicate clustering; high values indicate dispersion. The coefficient of variation (std/mean) enables comparing variability across different scales. Interquartile range (IQR) measures spread of middle 50%, robust to outliers.\n\nIn ML projects, descriptive statistics guide data understanding—skewed features may need transformation, high variance features dominate distance metrics, and outliers may indicate data quality issues or interesting edge cases. Feature scaling decisions depend on understanding feature distributions through descriptive statistics.\n\nPandas provides descriptive statistics via 'describe()' method. Understanding these summaries accelerates exploratory data analysis and informs preprocessing decisions. Descriptive statistics form the foundation for all statistical reasoning.` },
          { title: 'Probability', slug: 'aiml-probability', order: 3, content: `Probability\n\nProbability quantifies uncertainty, assigning numerical values (0 to 1) to event likelihoods. It provides the mathematical framework for reasoning about randomness, a core aspect of machine learning where data, model initialization, and predictions involve stochasticity.\n\nBasic probability concepts include sample spaces (all possible outcomes), events (subsets of outcomes), and probability axioms (non-negativity, normalization, additivity). Conditional probability P(A|B) represents probability of A given B occurred. Independence means P(A and B) equals P(A)×P(B).\n\nBayes' theorem connects conditional probabilities: P(A|B) = P(B|A)P(A)/P(B). This fundamental result underpins Bayesian machine learning, spam filters, medical diagnosis systems, and probabilistic reasoning. It formalizes updating beliefs given new evidence.\n\nIn machine learning, probability appears everywhere—logistic regression outputs class probabilities, Naive Bayes uses probability for classification, dropout introduces probabilistic regularization, and ensemble methods combine predictions probabilistically. Understanding probability enables interpreting model confidence and uncertainty.\n\nProbability theory provides the language for quantifying uncertainty in predictions. Probability distributions model data generation processes, maximum likelihood estimates parameters, and probabilistic graphical models represent complex dependencies. Mastering probability is essential for advanced ML work.` },
          { title: 'Distributions', slug: 'aiml-distributions', order: 4, content: `Statistical Distributions\n\nProbability distributions describe how probabilities are allocated across possible values. Discrete distributions (Bernoulli, Binomial, Poisson) model countable outcomes. Continuous distributions (Normal, Exponential, Uniform) model measurable quantities. Understanding distributions enables modeling data generation processes.\n\nThe Normal (Gaussian) distribution is ubiquitous—many natural phenomena approximate it due to the Central Limit Theorem, which states that sums of independent random variables converge to Normal distributions. Normal distributions are fully characterized by mean and variance, making them mathematically tractable.\n\nIn machine learning, distributions appear everywhere—linear regression assumes normally distributed errors, Naive Bayes uses Gaussian distributions for continuous features, neural network weights initialize from normal distributions, and Gaussian Processes define distributions over functions. The softmax function outputs categorical distributions over classes.\n\nThe Bernoulli distribution models binary outcomes (success/failure), fundamental for classification. Binomial distribution counts successes in repeated trials. Poisson distribution models rare events (clicks, failures). Exponential distribution models time between events. Each distribution suits specific data characteristics.\n\nUnderstanding distributions enables choosing appropriate models for data, validating model assumptions, and generating synthetic data. Distribution fitting and goodness-of-fit tests validate whether observed data matches theoretical distributions. Distributions are the mathematical language of uncertainty in ML.` },
          { title: 'Hypothesis Testing', slug: 'aiml-hypothesis-testing', order: 5, content: `Hypothesis Testing\n\nHypothesis testing is a statistical method for making decisions about populations based on sample data. It formalizes the scientific method—propose a hypothesis, collect data, and determine if evidence supports or refutes the hypothesis. In ML, hypothesis testing validates model improvements and A/B test results.\n\nThe null hypothesis (H0) represents the default assumption (no effect, no difference). The alternative hypothesis (H1) represents what we want to establish. P-values quantify evidence against the null hypothesis—low p-values (typically <0.05) suggest rejecting the null in favor of the alternative.\n\nType I error (false positive) occurs when rejecting a true null hypothesis. Type II error (false negative) occurs when failing to reject a false null hypothesis. Balancing these errors involves choosing significance level (alpha) and understanding statistical power. Multiple testing requires correction (Bonferroni, FDR) to control false discovery rates.\n\nIn ML projects, hypothesis testing compares model performance—t-tests compare means, chi-square tests compare distributions, ANOVA compares multiple groups. A/B testing of ML models uses hypothesis testing to determine if differences in metrics (accuracy, conversion rate) are statistically significant or due to random variation.\n\nUnderstanding hypothesis testing prevents overinterpretation of random fluctuations in model performance. It provides rigorous framework for decision-making under uncertainty. Statistical significance doesn't guarantee practical significance, but it prevents acting on noise.` },
          { title: 'Correlation', slug: 'aiml-correlation', order: 6, content: `Correlation\n\nCorrelation measures the strength and direction of linear relationships between two variables. Correlation coefficients range from -1 (perfect negative correlation) through 0 (no correlation) to +1 (perfect positive correlation). Understanding correlation helps identify feature relationships and redundancy in ML datasets.\n\nPearson correlation coefficient measures linear relationships between continuous variables. Spearman correlation assesses monotonic relationships, robust to outliers and non-linear monotonic patterns. Kendall tau correlation evaluates concordance between ranked variables. Choosing appropriate correlation measures depends on data characteristics and distribution assumptions.\n\nIn machine learning, correlation analysis identifies redundant features—highly correlated features provide similar information, causing multicollinearity in linear models. Feature selection often removes highly correlated features to reduce dimensionality. Correlation with target variables indicates predictive potential of features.\n\nCorrelation matrices visualized as heatmaps provide comprehensive overviews of feature relationships. Correlation doesn't imply causation—spurious correlations occur frequently in high-dimensional data. Domain knowledge distinguishes meaningful correlations from coincidental patterns.\n\nUnderstanding correlation guides feature engineering and selection. It reveals data structure and relationships, informing model architecture choices. While correlation captures only linear relationships, it provides essential insights into feature dependencies in ML pipelines.` },
          { title: 'Regression Analysis', slug: 'aiml-regression-analysis', order: 7, content: `Regression Analysis\n\nRegression analysis models relationships between dependent variables (targets) and independent variables (features). It quantifies how features influence targets, predicts continuous outcomes, and identifies significant predictors. Regression forms the foundation of many machine learning algorithms.\n\nLinear regression assumes linear relationships between features and targets: y = β₀ + β₁x₁ + β₂x₂ + ... + ε. Coefficients (β) quantify feature contributions. Multiple regression includes multiple features. Polynomial regression captures non-linear relationships by adding polynomial terms.\n\nRegression diagnostics validate model assumptions—residual plots check linearity and homoscedasticity (constant variance), Q-Q plots assess normality of residuals, and leverage plots identify influential points. Violating assumptions invalidates statistical inference but not necessarily predictions.\n\nIn machine learning, linear regression provides baseline models and interpretable predictions. Regularized regression (Ridge, Lasso) prevents overfitting by penalizing large coefficients. Logistic regression extends regression to classification by modeling log-odds. Generalized Linear Models (GLMs) accommodate various target distributions.\n\nRegression analysis provides interpretable models where feature coefficients explain predictions. This interpretability matters in regulated industries (finance, healthcare) requiring explainable AI. Understanding regression enables building interpretable ML models and diagnosing model limitations.` }
        ]
      }
    }
  });
  console.log('✅ Statistics: 7 topics');

  // ==========================================================================
  // BATCH 3: Math → Data Engineering
  // ==========================================================================
  console.log('\n📦 BATCH 3: Math → Data Engineering');

  // 10. MATHEMATICS FOR AI
  await prisma.learnCategory.create({
    data: {
      title: 'Mathematics for AI',
      order: 10,
      domainId: domain.id,
      topics: {
        create: [
          { title: 'Math Introduction', slug: 'aiml-math-introduction', order: 1, content: `Mathematics for AI Introduction\n\nMathematics provides the theoretical foundation for machine learning algorithms. Linear algebra powers neural networks, calculus enables optimization, probability quantifies uncertainty, and statistics validates models. While modern frameworks abstract mathematical details, understanding core concepts deepens intuition and enables algorithm design.\n\nMachine learning algorithms are fundamentally mathematical transformations—linear algebra manipulates data matrices, calculus computes gradients for training, probability models uncertainty, and optimization finds optimal parameters. Each ML breakthrough from backpropagation to transformers relies on mathematical innovation.\n\nThe level of mathematical depth needed depends on your ML role—practitioners need conceptual understanding to debug and tune models, researchers need rigorous knowledge to develop new algorithms. Understanding mathematical foundations explains why algorithms work, their limitations, and how to adapt them.\n\nMathematical concepts connect across ML domains—linear algebra in CNNs and transformers, calculus in gradient descent, probability in Bayesian methods, and information theory in loss functions. These recurring patterns make diverse ML topics learnable through unified mathematical understanding.\n\nThis mathematics section covers essential concepts for modern ML—linear algebra for data representation, calculus for optimization, and mathematical thinking for algorithm design. Mastery unlocks deeper ML understanding beyond surface-level framework usage.` },
          { title: 'Linear Algebra', slug: 'aiml-linear-algebra', order: 2, content: `Linear Algebra\n\nLinear algebra is the mathematics of vectors, matrices, and linear transformations. It provides the computational framework for representing and manipulating data in machine learning. Images, text, and structured data all become vectors and matrices for ML algorithms to process.\n\nVectors represent data points in multi-dimensional space—a house with 3 features (size, bedrooms, age) becomes a 3D vector. Matrices hold entire datasets with rows as samples and columns as features. Matrix multiplication computes weighted combinations, the core operation in neural networks forward propagation.\n\nEigenvalues and eigenvectors reveal intrinsic directions in data. Principal Component Analysis (PCA) uses eigenvectors to find directions of maximum variance for dimensionality reduction. Singular Value Decomposition (SVD) factorizes matrices, enabling recommender systems and data compression.\n\nIn deep learning, every layer performs matrix operations—linear layers multiply by weight matrices, convolutions are structured matrix operations, attention mechanisms use matrix multiplications for query-key-value computations. GPU acceleration optimizes these matrix operations for speed.\n\nLinear algebra explains why neural networks work as universal function approximators through compositions of linear transformations and nonlinearities. Understanding matrix operations, ranks, and decompositions enables reasoning about model capacity, overfitting, and representational power.` },
          { title: 'Calculus Basics', slug: 'aiml-calculus-basics', order: 3, content: `Calculus Basics\n\nCalculus studies continuous change through derivatives and integrals. In machine learning, calculus powers optimization—finding model parameters that minimize loss functions. Every trained neural network relies on calculus to compute parameter updates during backpropagation.\n\nDerivatives measure instantaneous rates of change—how loss changes with small parameter adjustments. The derivative of position with respect to time is velocity; the derivative of loss with respect to weights indicates optimization direction. This concept enables gradient descent, the workhorse of ML training.\n\nPartial derivatives compute derivatives with respect to one variable while holding others constant. Machine learning models have millions of parameters, requiring partial derivatives for each. The gradient combines all partial derivatives into a vector pointing toward steepest loss increase.\n\nIntegrals compute accumulated quantities—areas under curves, total probabilities, expected values. Probability distributions integrate to 1, and expectation computes weighted averages using integration. While less central than derivatives, integrals appear in probability theory and certain ML algorithms.\n\nUnderstanding calculus basics—what derivatives represent, how to compute them, and their connection to optimization—explains the training process. Automatic differentiation in frameworks like PyTorch computes derivatives automatically, but understanding calculus enables debugging training dynamics and designing custom loss functions.` },
          { title: 'Derivatives', slug: 'aiml-derivatives', order: 4, content: `Derivatives\n\nDerivatives quantify how functions change with their inputs. For a function f(x), the derivative f'(x) measures the slope at each point. In machine learning, derivatives show how loss changes when adjusting parameters, guiding optimization toward better models.\n\nThe derivative of f(x) = x² is f'(x) = 2x, indicating that small changes in x cause proportional changes in f(x) scaled by 2x. Chain rule computes derivatives of composite functions—essential for backpropagation through neural network layers. Product and quotient rules handle more complex function combinations.\n\nPartial derivatives extend derivatives to multivariable functions. For f(x,y), ∂f/∂x measures change with respect to x while holding y constant. Neural networks with millions of parameters require computing partial derivatives for each—the gradient vector collects all partial derivatives.\n\nNumerical derivatives approximate derivatives using finite differences: f'(x) ≈ (f(x+h) - f(x))/h for small h. Analytic derivatives compute exact slopes using calculus rules. Automatic differentiation combines both approaches efficiently, powering modern deep learning frameworks.\n\nUnderstanding derivatives explains gradient descent—moving parameters opposite to the gradient decreases loss. Vanishing and exploding gradients occur when derivatives become too small or large, causing training difficulties. Derivatives are the mathematical engine of ML optimization.` },
          { title: 'Gradients', slug: 'aiml-gradients', order: 5, content: `Gradients\n\nThe gradient is a vector of partial derivatives, pointing in the direction of steepest increase for multivariable functions. In a loss landscape with millions of parameters, the gradient indicates which direction to adjust parameters to decrease loss most rapidly.\n\nFor a function f(x₁, x₂, ..., xₙ), the gradient ∇f = [∂f/∂x₁, ∂f/∂x₂, ..., ∂f/∂xₙ] collects all partial derivatives. Each component shows how loss changes with that specific parameter. Moving opposite to the gradient (negative gradient direction) performs gradient descent optimization.\n\nBackpropagation efficiently computes gradients by applying the chain rule backward through network layers. Each layer computes local gradients, which chain together to produce parameter gradients. This enables training networks with billions of parameters—the computational breakthrough that enabled deep learning.\n\nGradient descent updates parameters via θ ← θ - α∇L, where α is learning rate and ∇L is the loss gradient. Variants like SGD, Adam, and RMSprop modify this basic update with momentum, adaptive learning rates, and variance reduction for faster, more stable training.\n\nUnderstanding gradients explains training dynamics—large gradients cause rapid learning, small gradients slow convergence, zero gradients indicate local minima or saddle points. Gradient clipping prevents instability from exploding gradients. Gradients are the compass guiding optimization through parameter space.` },
          { title: 'Vectors', slug: 'aiml-vectors', order: 6, content: `Vectors\n\nVectors are ordered arrays of numbers representing points or directions in multi-dimensional space. In machine learning, vectors encode feature representations—an image becomes a vector of pixel values, a sentence becomes a vector of word embeddings, and a data sample becomes a feature vector.\n\nVector operations include addition (combining vectors), scalar multiplication (scaling), and dot products (measuring similarity). The dot product v·w = v₁w₁ + v₂w₂ + ... + vₙwₙ measures vector alignment—positive for similar direction, negative for opposite, zero for orthogonal.\n\nVector norms measure magnitude—L2 norm (Euclidean length) for distance, L1 norm for sparsity regularization. Normalized vectors (unit vectors) have length 1, useful for comparing directions independent of magnitude. Cosine similarity, ubiquitous in NLP, uses normalized dot products to measure semantic similarity.\n\nIn neural networks, embeddings are learned vector representations—words become dense vectors capturing semantic relationships, users and items become vectors for recommendations. Attention mechanisms compute similarity between query and key vectors. Distance metrics in vector space enable clustering and nearest-neighbor search.\n\nUnderstanding vectors as geometric and algebraic objects explains many ML concepts—feature spaces, similarity metrics, dimensionality reduction, and embedding spaces. Vectors are the fundamental data structure of machine learning.` },
          { title: 'Matrices', slug: 'aiml-matrices', order: 7, content: `Matrices\n\nMatrices are 2D arrays of numbers organizing data into rows and columns. In machine learning, datasets are matrices with rows as samples and columns as features. Neural network layers use weight matrices to transform activations. Understanding matrix operations is essential for understanding ML computations.\n\nMatrix multiplication combines two matrices: C = AB requires A's columns equal B's rows. Result C[i,j] is the dot product of A's i-th row with B's j-th column. This operation represents linear transformations—neural network forward propagation chains matrix multiplications with nonlinear activations.\n\nMatrix transpose swaps rows and columns, critical for backpropagation. Matrix inverse reverses transformations, used in solving linear systems. Determinant measures volume scaling—zero determinant indicates loss of dimensionality. These properties connect to model capacity and degeneracy.\n\nMatrix decompositions factor matrices into simpler forms—eigendecomposition for symmetric matrices, SVD for general matrices, LU decomposition for solving linear systems. These decompositions enable efficient computation, reveal data structure, and power dimensionality reduction techniques.\n\nIn deep learning, batched matrix operations process multiple samples simultaneously for efficiency. Convolutions are structured matrix operations, attention uses matrix multiplications extensively. GPU acceleration optimizes these operations. Understanding matrices explains the computational structure of modern ML.` },
          { title: 'Optimization', slug: 'aiml-optimization', order: 8, content: `Mathematical Optimization\n\nOptimization finds parameter values that minimize or maximize objective functions. In machine learning, optimization minimizes loss functions to train models. Every trained ML model results from solving an optimization problem—finding weights that best fit training data.\n\nGradient descent is the workhorse optimizer: repeatedly compute loss gradient with respect to parameters, then update parameters opposite to gradient direction. Learning rate controls step size—too large causes divergence, too small slows convergence. Convergence to local minima depends on loss landscape convexity.\n\nStochastic Gradient Descent (SGD) uses mini-batches instead of full datasets, enabling scalable training. Momentum accumulates gradients over time, smoothing optimization paths. Adam combines momentum with adaptive learning rates per parameter, automatically adjusting step sizes. These optimizers dominate modern deep learning.\n\nConvex optimization guarantees finding global minima—linear regression, logistic regression, and SVMs have convex loss functions. Neural networks have non-convex losses with many local minima, yet SGD finds good solutions through implicit regularization and overparameterization.\n\nConstrained optimization includes constraints on parameters—L1 regularization encourages sparsity, L2 regularization prevents large weights, and projected gradient descent enforces hard constraints. Hyperparameter optimization treats model configuration as an outer optimization problem. Optimization theory explains why and when ML training succeeds.` }
        ]
      }
    }
  });
  console.log('✅ Mathematics for AI: 8 topics');

  // 11. DATA SCIENCE
  await prisma.learnCategory.create({
    data: {
      title: 'Data Science',
      order: 11,
      domainId: domain.id,
      topics: {
        create: [
          { title: 'Data Science Introduction', slug: 'aiml-data-science-introduction', order: 1, content: `Data Science Introduction\n\nData science extracts knowledge and insights from structured and unstructured data using scientific methods, algorithms, and systems. It combines domain expertise, programming skills, and statistical knowledge to discover patterns and make data-driven decisions. Machine learning forms the algorithmic core of modern data science.\n\nThe data science workflow follows iterative stages: formulate questions, collect data, clean and explore data, model patterns, interpret results, and communicate findings. Each stage requires different skills—SQL for data collection, Python for analysis, statistics for validation, and visualization for communication.\n\nData scientists bridge business and technology, translating business problems into analytical questions and technical solutions into actionable insights. They work with messy real-world data—missing values, inconsistent formats, biases, and noise—requiring creativity and domain knowledge beyond algorithm application.\n\nIn organizations, data science drives A/B testing, recommendation systems, fraud detection, demand forecasting, customer segmentation, and predictive maintenance. Impact comes not from the fanciest algorithm but from asking the right questions and validating results rigorously.\n\nData science is broader than machine learning—it includes data engineering (pipelines and infrastructure), domain expertise (interpreting results), and communication (presenting insights). This interdisciplinary nature makes data science both challenging and impactful across industries.` },
          { title: 'Data Collection', slug: 'aiml-data-collection', order: 2, content: `Data Collection\n\nData collection gathers raw data from various sources—databases, APIs, web scraping, sensors, surveys, or third-party datasets. Quality and quantity of collected data fundamentally constrain model performance. Thoughtful data collection strategies determine project success.\n\nStructured data from databases uses SQL queries, APIs provide programmatic access to platforms (Twitter, weather services, financial data), and web scraping extracts information from websites using tools like BeautifulSoup or Scrapy. Each source has advantages—databases offer reliability, APIs provide real-time data, scraping accesses publicly available information.\n\nData collection must consider legal and ethical constraints—privacy regulations (GDPR, CCPA), terms of service, copyright, and fairness. Biased data collection yields biased models—sampling strategies must represent target populations fairly. Documentation of data provenance enables reproducibility and bias auditing.\n\nIn machine learning projects, insufficient data limits model capacity, while too much noisy data wastes resources without improving performance. Active learning selects informative samples strategically. Data augmentation artificially expands datasets through transformations preserving labels.\n\nEffective data collection balances cost, time, and quality. Sometimes external datasets suffice; other times custom data collection provides competitive advantage. Understanding data sources and collection methods ensures ML projects build on solid foundations.` },
          { title: 'Data Preprocessing', slug: 'aiml-data-preprocessing', order: 3, content: `Data Preprocessing\n\nData preprocessing transforms raw data into clean, consistent formats suitable for machine learning. This stage consumes 60-80% of ML project time yet critically impacts model performance. Garbage in, garbage out—poor preprocessing yields poor models regardless of algorithm sophistication.\n\nKey preprocessing steps include handling missing values (imputation, deletion), removing duplicates, correcting data types, standardizing formats, and addressing outliers. Missing data strategies depend on patterns—missing completely at random (MCAR), missing at random (MAR), or missing not at random (MNAR)—each requiring different approaches.\n\nFeature scaling ensures numeric features have comparable ranges—standardization (z-score normalization) for normally distributed features, min-max scaling for bounded ranges. Distance-based algorithms (KNN, SVM, neural networks) require scaling; tree-based models (Random Forests, XGBoost) are scale-invariant.\n\nEncoding categorical variables transforms text categories into numeric representations—one-hot encoding for nominal categories (colors, countries), ordinal encoding for ordered categories (education levels), and target encoding for high-cardinality categories. Choice impacts model interpretability and performance.\n\nPreprocessing pipelines automate transformations and prevent data leakage—fit transformers on training data only, then apply to test data. Scikit-learn's Pipeline and ColumnTransformer enable reproducible preprocessing. Well-preprocessed data makes subsequent modeling straightforward.` },
          { title: 'Feature Engineering', slug: 'aiml-feature-engineering', order: 4, content: `Feature Engineering\n\nFeature engineering creates new features from raw data to improve model performance. Well-engineered features often matter more than algorithm choice—domain knowledge transformed into features gives models discriminative power. Feature engineering blends creativity, domain expertise, and statistical thinking.\n\nCommon techniques include polynomial features (interactions like x₁×x₂), binning continuous variables into categories, extracting date components (day of week, month, holidays), and aggregating transaction-level data into user-level statistics. Text features use TF-IDF, n-grams, and embeddings. Image features from pretrained CNNs enable transfer learning.\n\nDomain expertise drives effective feature engineering—in finance, technical indicators from price series; in NLP, syntactic features like parts of speech; in computer vision, shape descriptors and texture features. Generic features rarely outperform domain-informed features on specialized tasks.\n\nAutomated feature engineering tools like Featuretools generate features systematically, but domain knowledge remains crucial for guiding search and interpreting results. Feature selection removes irrelevant features reducing dimensionality and preventing overfitting.\n\nFeature engineering is where data scientists add value—algorithms are commoditized, but thoughtful features tailored to specific problems provide competitive advantage. Creativity in feature engineering often determines model success more than hyperparameter tuning.` },
          { title: 'Exploratory Data Analysis', slug: 'aiml-exploratory-data-analysis', order: 5, content: `Exploratory Data Analysis\n\nExploratory Data Analysis (EDA) investigates datasets to discover patterns, detect anomalies, test hypotheses, and check assumptions through statistical summaries and visualizations. EDA precedes modeling, informing feature engineering and algorithm selection. It transforms unfamiliar data into understood structure.\n\nEDA techniques include univariate analysis (distributions, outliers per feature), bivariate analysis (correlations, scatter plots between feature pairs), and multivariate analysis (dimensionality reduction with PCA or t-SNE). Summary statistics reveal central tendencies and spread; visualizations reveal shapes, relationships, and clusters.\n\nEDA uncovers data quality issues—missing patterns, impossible values, duplicate records, and inconsistent encodings. It reveals class imbalance, feature correlations, and non-linear relationships guiding preprocessing decisions. Identifying these characteristics early prevents wasted modeling effort on poorly understood data.\n\nVisualization tools for EDA include Matplotlib and Seaborn for statistical graphics, Plotly for interactive exploration, and Pandas Profiling for automated reporting. Jupyter notebooks facilitate iterative exploration, documenting reasoning and insights alongside code.\n\nThorough EDA builds intuition about data characteristics, constraints, and opportunities. Insights from EDA drive hypothesis formation, feature engineering ideas, and modeling strategies. Skipping EDA risks building models on misunderstood data, leading to poor performance and misleading conclusions.` },
          { title: 'Data Pipeline', slug: 'aiml-data-pipeline', order: 6, content: `Data Pipeline\n\nData pipelines are automated workflows that move data from sources through transformations to destinations. In ML, pipelines encompass data collection, cleaning, feature engineering, model training, and prediction serving. Well-designed pipelines ensure reproducibility, scalability, and maintainability.\n\nPipelines typically follow ETL (Extract, Transform, Load) or ELT patterns. Extract pulls data from sources (databases, APIs, files), Transform applies cleaning and feature engineering, and Load stores results in target systems. Modern ELT approaches load raw data first, transforming within data warehouses for flexibility.\n\nOrchestration tools like Apache Airflow, Luigi, or Prefect schedule and monitor pipeline tasks, handling dependencies, failures, and retries. These tools enable complex workflows—daily model retraining, incremental data processing, and automated reporting. Pipelines encode business logic and data transformations programmatically.\n\nML pipelines extend beyond data preparation to include model training, validation, and deployment. Scikit-learn's Pipeline class chains transformers and models, preventing data leakage and enabling hyperparameter search across preprocessing and modeling steps. MLOps platforms provide end-to-end pipeline management.\n\nReproducible pipelines enable experimentation and debugging—code replaces manual steps, version control tracks changes, and parameterization enables reuse across projects. Investing in pipeline infrastructure accelerates future ML projects through reusable components.` },
          { title: 'Model Evaluation', slug: 'aiml-model-evaluation', order: 7, content: `Model Evaluation\n\nModel evaluation quantifies how well trained models perform on unseen data. Proper evaluation distinguishes truly useful models from those that merely memorize training data. Evaluation methodology determines whether deployed models meet business requirements and perform safely.\n\nTrain-test split divides data into training sets (building models) and test sets (evaluating generalization). Cross-validation extends this by training multiple times on different data splits, providing robust performance estimates. Stratified splitting maintains class proportions; time-series splits respect temporal ordering.\n\nClassification metrics include accuracy (overall correctness), precision (positive prediction reliability), recall (positive case detection), and F1-score (harmonic mean of precision and recall). Confusion matrices visualize true/false positives/negatives. ROC curves and AUC measure performance across classification thresholds, enabling threshold tuning.\n\nRegression metrics include Mean Absolute Error (MAE, average error magnitude), Mean Squared Error (MSE, penalizes large errors), and R² (variance explained). Residual plots diagnose systematic errors. Business context determines appropriate metrics—in fraud detection, recall matters most; in spam filtering, precision dominates.\n\nModel evaluation must consider fairness across demographic groups, robustness to distribution shifts, and calibration of predicted probabilities. Hold-out test sets simulate production performance. Rigorous evaluation prevents deploying models that underperform or cause harm.` }
        ]
      }
    }
  });
  console.log('✅ Data Science: 7 topics');

  // 12. DATA ENGINEERING BASICS
  await prisma.learnCategory.create({
    data: {
      title: 'Data Engineering Basics',
      order: 12,
      domainId: domain.id,
      topics: {
        create: [
          { title: 'Data Engineering Overview', slug: 'aiml-data-engineering-overview', order: 1, content: `Data Engineering Overview\n\nData engineering builds and maintains infrastructure for data generation, storage, and processing. Data engineers create pipelines that move data from diverse sources into formats usable by data scientists and ML systems. Without data engineering, ML projects lack the reliable data foundations they require.\n\nData engineers design and implement ETL/ELT pipelines, manage data warehouses and lakes, ensure data quality, and optimize query performance. They work with tools like Apache Spark for distributed processing, Airflow for orchestration, and cloud platforms (AWS, GCP Azure) for scalable infrastructure.\n\nThe boundary between data engineering and data science blurs in smaller teams—data scientists often build their own pipelines. In larger organizations, data engineers provide production-grade data infrastructure while data scientists focus on modeling and analysis. Both roles collaborate closely.\n\nIn ML workflows, data engineering enables feature stores (centralized repositories of features), model monitoring (tracking prediction distribution drift), and real-time inference (serving predictions at scale). Poor data infrastructure causes model staleness, training-serving skew, and reliability issues.\n\nUnderstanding data engineering fundamentals helps data scientists and ML engineers build maintainable, scalable systems. Even if specialized data engineers handle infrastructure, knowing engineering concepts improves collaboration and system design. Data engineering is the foundation of production ML.` },
          { title: 'ETL Pipelines', slug: 'aiml-etl-pipelines', order: 2, content: `ETL Pipelines\n\nETL (Extract, Transform, Load) pipelines systematically move data from sources, apply transformations, and load into target systems. Extract pulls data from APIs, databases, flat files, or streaming sources. Transform cleans, joins, aggregates, and enriches data. Load writes results to databases, data warehouses, or object storage.\n\nModern ELT (Extract, Load, Transform) inverts the traditional pattern—loading raw data first, then transforming within powerful data warehouses like Snowflake or BigQuery. This approach preserves raw data and leverages warehouse computing for transformations, increasing flexibility.\n\nETL tools range from code-based (Python scripts, Apache Spark) to GUI-based platforms (Talend, Informatica) to SQL-centric approaches (dbt for transformations). Choice depends on data volume, transformation complexity, and team skills. Cloud-native services like AWS Glue and Azure Data Factory provide managed ETL.\n\nIn ML projects, ETL pipelines prepare training data, compute features offline (batch feature engineering), and populate feature stores. Pipelines must handle schema evolution, data quality checks, and incremental processing for efficiency. Idempotency ensures rerunning pipelines produces consistent results.\n\nReliable ETL is critical for ML—models trained on stale or incorrect data produce poor predictions. Monitoring pipeline health, latency, and data quality ensures ML systems remain accurate and trustworthy.` },
          { title: 'Data Warehousing', slug: 'aiml-data-warehousing', order: 3, content: `Data Warehousing\n\nData warehouses are centralized repositories optimized for analytical queries across large datasets. Unlike transactional databases (OLTP) optimized for fast writes and updates, warehouses (OLAP) optimize for complex reads and aggregations. They enable business intelligence, reporting, and ML feature engineering at scale.\n\nWarehouse schemas organize data logically—star schemas center fact tables (events, transactions) surrounded by dimension tables (users, products, time). Snowflake schemas normalize dimensions further. These structures optimize join performance and query speed for analytical workloads.\n\nModern cloud data warehouses (Snowflake, BigQuery, Redshift) decouple storage and compute, enabling elastic scaling. They use columnar storage for fast aggregations and compression. Materialized views precompute expensive queries, trading storage for query speed. Partitioning and clustering organize data for efficient filtering.\n\nIn ML workflows, data warehouses store historical data for model training, support feature engineering with SQL, and power dashboards monitoring model performance. Feature stores often sit atop warehouses, providing consistent training and serving features.\n\nUnderstanding data warehousing enables data scientists to efficiently query large datasets for analysis and training. Knowing how to write performant SQL and leverage warehouse capabilities prevents slow notebooks and expensive compute costs.` },
          { title: 'Batch Processing', slug: 'aiml-batch-processing', order: 4, content: `Batch Processing\n\nBatch processing handles data in large groups at scheduled intervals—hourly, daily, weekly. It's ideal for non-time-critical workloads like model training, historical analysis, report generation, and feature computation. Batch systems trade latency for throughput, processing millions of records efficiently.\n\nApache Spark dominates distributed batch processing, enabling parallel computations across clusters. Spark DataFrames provide SQL-like APIs for large-scale transformations, joins, and aggregations. MapReduce pioneered batch processing; Spark improves on its model with in-memory computing and richer APIs.\n\nBatch jobs follow patterns: read data from storage (S3, HDFS), transform with distributed operations, and write results back. Partitioning data by time or category enables incremental processing—only processing new data rather than recomputing everything. Idempotent operations allow safe job reruns.\n\nIn ML, batch processing trains models overnight on historical data, computes batch features for offline inference, and generates evaluation reports. Spark MLlib provides distributed ML algorithms for datasets too large for single machines. Batch retraining keeps models current with recent data.\n\nBatch processing balances cost and latency—it's cheaper than real-time but introduces delays. Many ML applications tolerate batch latency—recommendation systems update daily, demand forecasts run weekly. Understanding when batch suffices versus when streaming is necessary guides architecture decisions.` },
          { title: 'Stream Processing', slug: 'aiml-stream-processing', order: 5, content: `Stream Processing\n\nStream processing handles data continuously as events arrive in real-time. Unlike batch processing which waits for complete datasets, streaming processes individual events or micro-batches with sub-second latency. It powers real-time dashboards, fraud detection, and online model predictions.\n\nApache Kafka is the dominant streaming platform, providing durable, scalable event logs. Producers publish events to topics; consumers subscribe and process events. Kafka enables decoupling—multiple systems consume the same event stream independently. Its durability allows replay for recovery and reprocessing.\n\nStream processing frameworks (Apache Flink, Spark Streaming, Kafka Streams) compute aggregations, joins, and transformations over event streams. Windowing groups events by time (tumbling, hopping, sliding windows) or session boundaries. Stateful processing maintains aggregates across events (running totals, recent event histories).\n\nIn ML, stream processing computes real-time features (user's last 5 clicks, rolling average transaction amount), serves online predictions with fresh data, and monitors model performance metrics live. Feature stores with streaming support provide consistency between batch and real-time features.\n\nStream processing is complex—handling late events, managing state, ensuring exactly-once semantics. It's essential when sub-second latency matters (ad targeting, fraud prevention) but overkill when batch latency suffices. Understanding streaming enables building low-latency ML systems.` },
          { title: 'Data Quality', slug: 'aiml-data-quality', order: 6, content: `Data Quality\n\nData quality measures fitness for purpose—accurate, complete, consistent, timely data that meets requirements. Poor quality data causes incorrect insights, failed ML models, and business losses. Data quality spans completeness (no missing values), accuracy (correctness), consistency (no contradictions), and timeliness (freshness).\n\nData quality issues include missing values, duplicates, outliers, inconsistent formats, schema violations, and stale data. Sources of issues: integration errors when combining data sources, manual data entry mistakes, system bugs, and natural data degradation over time.\n\nData quality validation includes schema validation (type checking, required fields), statistical validation (range checks, distribution tests), and business rule validation (domain constraints, relationship integrity). Great Expectations and similar tools codify data quality tests, running automatically in pipelines to catch issues early.\n\nIn ML, data quality directly impacts model performance—training on corrupt data yields unreliable models. Testing data quality at pipeline stages prevents propagating errors. Monitoring data distributions over time detects drift indicating models need retraining.\n\nData quality is a continuous process, not one-time cleanup. Automated monitoring, clear data ownership, and quality metrics (error rates, completeness percentages) maintain standards. High data quality is foundational for trustworthy ML systems.` },
          { title: 'Data Orchestration', slug: 'aiml-data-orchestration', order: 7, content: `Data Orchestration\n\nData orchestration coordinates and schedules complex workflows involving multiple tasks with dependencies. Orchestrators manage task execution order, handle failures and retries, and monitor progress. They transform fragile scripts into robust, maintainable production pipelines.\n\nApache Airflow dominates data orchestration, defining workflows as Directed Acyclic Graphs (DAGs) in Python. Tasks represent operations (SQL queries, Python scripts, Spark jobs), and edges represent dependencies. Airflow schedules workflows, parallelizes independent tasks, and provides web UI for monitoring.\n\nOrchestrators provide critical features: dependency management (Task B runs after Task A completes), retry logic (handle transient failures), alerting (notify on failures), backfilling (reprocess historical periods), and scheduling (cron expressions, intervals). These capabilities prevent fragile, manual execution.\n\nIn ML pipelines, orchestration coordinates data extraction, preprocessing, feature engineering, model training, validation, and deployment. Model retraining pipelines run on schedules, triggered by performance degradation or data updates. Orchestrators integrate with cloud services (S3, BigQuery) and ML platforms (SageMaker, Kubeflow).\n\nOrchestration enables reliable, reproducible data and ML pipelines. It provides observability through logs and metrics, enabling debugging and optimization. Modern ML systems depend on orchestration for automating the complex workflows connecting data to deployed models.` }
        ]
      }
    }
  });
  console.log('✅ Data Engineering Basics: 7 topics');

  // 13. PYTHON + DATABASES
  await prisma.learnCategory.create({
    data: {
      title: 'Python + Databases',
      order: 13,
      domainId: domain.id,
      topics: {
        create: [
          { title: 'Database Overview', slug: 'aiml-database-overview', order: 1, content: `Database Overview\n\nDatabases store, organize, and retrieve structured data efficiently. They provide persistent storage with ACID guarantees (Atomicity, Consistency, Isolation, Durability) for reliable data management. ML projects depend on databases for training data, feature storage, model metadata, and prediction logs.\n\nRelational databases (SQL) organize data in tables with rows and columns, enforcing schemas and relationships. PostgreSQL, MySQL, and SQLite are common choices. NoSQL databases (MongoDB, Cassandra, Redis) offer flexible schemas and horizontal scaling, suited for unstructured data and high-throughput applications.\n\nDatabases serve different purposes—transactional databases (OLTP) handle multi-record transactions with strong consistency, analytical databases (OLAP/warehouses) optimize complex queries over historical data. Graph databases (Neo4j) model relationships, vector databases (Pinecone, Weaviate) store embeddings for similarity search.\n\nIn ML workflows, databases provide training data via SQL queries, store computed features in feature stores, log predictions and ground truth for model monitoring, and persist model metadata (hyperparameters, metrics, versions). Choosing appropriate database types impacts system performance and complexity.\n\nUnderstanding databases enables data scientists to efficiently query training data, collaborate with data engineers, and design ML systems that integrate with organizational data infrastructure. Database knowledge is foundational for production ML.` },
          { title: 'MySQL Basics', slug: 'aiml-mysql-basics', order: 2, content: `MySQL Basics\n\nMySQL is an open-source relational database management system widely used for web applications and data storage. It organizes data into tables with defined schemas (columns and types), enforces relationships through foreign keys, and enables powerful queries using SQL. MySQL balances performance, reliability, and ease of use.\n\nRelational databases model entities as tables—users, transactions, products. Each row represents an instance; each column represents an attribute. Tables relate through keys: primary keys uniquely identify rows, foreign keys reference other tables. This structured approach enforces data integrity and enables complex queries joining multiple tables.\n\nMySQL provides ACID transactions ensuring data consistency—either all operations complete successfully or all roll back. Indexes accelerate queries by creating fast lookup structures on columns. Views create virtual tables from queries, simplifying complex logic. Stored procedures encapsulate business logic within the database.\n\nIn ML projects, MySQL stores structured application data (users, sessions, events) that becomes training data. Feature engineering often involves SQL queries aggregating transactional data. Model metadata, experiment tracking, and prediction logs commonly reside in MySQL or similar relational databases.\n\nUnderstanding MySQL fundamentals—tables, keys, queries, transactions—enables data scientists to extract and prepare training data effectively. SQL proficiency accelerates data exploration and feature engineering, critical skills for practical ML work.` },
          { title: 'MySQL Connector', slug: 'aiml-mysql-connector', order: 3, content: `MySQL Connector\n\nMySQL Connector enables Python programs to interact with MySQL databases programmatically. The mysql-connector-python library provides APIs for connecting, querying, and managing MySQL databases from Python scripts. This integration enables automated data pipelines, feature engineering, and ML workflows.\n\nConnecting to MySQL requires host, username, password, and database name. Connection objects manage database sessions; cursor objects execute queries and fetch results. Context managers (with statements) ensure connections close properly, preventing resource leaks.\n\nExecuting queries involves creating SQL strings and using cursor.execute(). SELECT queries fetch data with fetchall(), fetchone(), or fetchmany(). INSERT, UPDATE, DELETE modify data; connection.commit() persists changes. Parameterized queries ('WHERE id = %s' with parameters) prevent SQL injection attacks.\n\nIn ML projects, Python scripts query databases for training data, compute features locally or in-database, and write predictions back. Combining Pandas read_sql() with MySQL connectors enables loading query results directly into DataFrames for analysis.\n\nUnderstanding MySQL connectors bridges Python ML workflows with database storage. It enables building end-to-end pipelines—extracting features from databases, training models, and storing predictions—all automated in Python.` },
          { title: 'SQL Queries', slug: 'aiml-sql-queries', order: 4, content: `SQL Queries\n\nSQL (Structured Query Language) retrieves and manipulates data in relational databases. SELECT queries filter, join, aggregate, and transform data. Mastering SQL enables data scientists to efficiently extract insights and prepare training data from large databases.\n\nSELECT statements specify columns to retrieve, FROM indicates tables, WHERE filters rows, and ORDER BY sorts results. JOINs combine tables—INNER JOIN keeps matching rows, LEFT JOIN preserves left table rows, OUTER JOIN includes all rows. GROUP BY aggregates with functions (COUNT, SUM, AVG, MAX, MIN).\n\nAdvanced SQL includes subqueries (queries within queries), window functions (aggregations over row partitions), CTEs (Common Table Expressions for readable complex queries), and CASE statements for conditional logic. These enable sophisticated feature engineering within databases.\n\nIn ML workflows, SQL computes aggregate features (user's total spend, average session duration), joins user attributes with event histories, and filters datasets by time periods or conditions. Analytical SQL for feature engineering can be more efficient than loading data into Python first.\n\nSQL proficiency accelerates exploratory analysis and feature engineering. Writing efficient queries—using appropriate indexes, avoiding SELECT *—prevents slow notebooks and expensive compute. SQL is essential for working with organizational data at scale.` },
          { title: 'MongoDB Basics', slug: 'aiml-mongodb-basics', order: 5, content: `MongoDB Basics\n\nMongoDB is a NoSQL document database storing data as JSON-like documents instead of tables and rows. It offers flexible schemas, horizontal scalability, and high performance for certain use cases. MongoDB suits semi-structured data, rapid prototyping, and applications requiring schema evolution.\n\nDocuments are BSON (Binary JSON) objects with key-value pairs, similar to Python dictionaries. Collections group related documents, analogous to tables in SQL. Unlike relational databases requiring predefined schemas, MongoDB allows heterogeneous documents within collections, providing schema flexibility.\n\nMongoDB query language filters documents with JSON-like syntax. Indexing accelerates queries like SQL. Aggregation pipelines transform and analyze data with stages (match, group, project, sort). Replication provides high availability; sharding distributes data across servers for horizontal scaling.\n\nIn ML projects, MongoDB stores unstructured or semi-structured data—logs, JSON API responses, variable-structure records. It's useful for rapid prototyping where schema evolves frequently. However, joins are less efficient than SQL, and complex aggregations may be more challenging.\n\nUnderstanding MongoDB provides flexibility beyond relational databases. Choosing between SQL and NoSQL depends on data structure, query patterns, and scaling needs. Many ML projects use both—SQL for structured features, MongoDB for flexible storage.` },
          { title: 'PyMongo', slug: 'aiml-pymongo', order: 6, content: `PyMongo\n\nPyMongo is the official Python driver for MongoDB, enabling Python applications to interact with MongoDB databases. It provides Pythonic APIs for connecting, querying, inserting, updating, and deleting documents. PyMongo integrates MongoDB into Python ML workflows seamlessly.\n\nConnecting to MongoDB creates client objects with connection strings specifying host, port, and credentials. Database and collection objects represent MongoDB databases and collections. PyMongo's API mirrors MongoDB query language but uses Python dictionaries instead of JSON strings.\n\nQuerying uses find() with filter dictionaries: collection.find({'age': {'$gt': 25}}) finds documents where age exceeds 25. find_one() returns single documents. Cursor objects from find() iterate through results. Aggregation pipelines use Python list syntax matching MongoDB's stages.\n\nIn ML workflows, PyMongo stores model predictions with flexible schemas, logs experiment configurations as documents, and retrieves variable-structure training data. Document structure flexibility accommodates evolving ML metadata formats without schema migrations.\n\nUnderstanding PyMongo enables leveraging MongoDB's flexibility in Python ML projects. It provides an alternative to SQL databases when schema flexibility, horizontal scaling, or document-oriented storage suits the use case better.` },
          { title: 'CRUD Operations', slug: 'aiml-crud-operations', order: 7, content: `CRUD Operations\n\nCRUD (Create, Read, Update, Delete) represents fundamental database operations. Every database interaction reduces to these four operations. Understanding CRUD enables building complete data-driven applications and ML systems that persist and retrieve data.\n\nCreate adds new records—INSERT in SQL, insert_one()/insert_many() in MongoDB. Read retrieves data—SELECT in SQL, find() in MongoDB. Update modifies existing records—UPDATE in SQL, update_one()/update_many() in MongoDB. Delete removes records—DELETE in SQL, delete_one()/delete_many() in MongoDB.\n\nBatch operations process multiple records efficiently. Upserts (update if exists, insert if not) simplify logic for maintaining datasets. Transactions group multiple CRUD operations atomically—all succeed or all fail, maintaining consistency.\n\nIn ML projects, CRUD operations manage training data (inserting new samples, updating labels), model metadata (creating experiment records, updating metrics), and predictions (inserting inference results, reading for analysis). Feature stores implement CRUD for features.\n\nMastering CRUD across SQL and NoSQL databases enables building end-to-end ML systems. Efficient CRUD operations—using batch inserts, appropriate indexes, avoiding N+1 queries—ensure system performance doesn't degrade with data scale.` },
          { title: 'Database Design', slug: 'aiml-database-design', order: 8, content: `Database Design\n\nDatabase design structures data for efficient storage, retrieval, and integrity. Good design prevents anomalies, reduces redundancy, and optimizes query performance. Poor design causes slow queries, data inconsistencies, and maintenance headaches. Design directly impacts ML system performance and reliability.\n\nRelational design follows normalization—organizing data to reduce redundancy. First Normal Form (1NF) eliminates repeating groups, Second Normal Form (2NF) removes partial dependencies, Third Normal Form (3NF) eliminates transitive dependencies. Normalization improves consistency but may require more joins.\n\nDenormalization intentionally introduces redundancy for query performance—fewer joins for faster reads. Data warehouses often denormalize into star schemas. Choosing between normalization and denormalization balances write simplicity, storage, and read performance based on access patterns.\n\nIndexing speeds queries by creating auxiliary data structures—B-trees for range queries, hash indexes for exact matches. Indexes accelerate reads but slow writes and consume storage. Indexing query filter columns and foreign keys is essential for performance.\n\nIn ML systems, database design affects feature computation speed, model training data access, and prediction storage efficiency. Understanding design principles enables data scientists to optimize schemas for ML workloads, collaborating effectively with data engineers on system architecture.` }
        ]
      }
    }
  });
  console.log('✅ Python + Databases: 8 topics');

  // ==========================================================================
  // BATCH 4: ML → Deep Learning
  // ==========================================================================
  console.log('\n📦 BATCH 4: ML → Deep Learning');

  // 14. MACHINE LEARNING
  await prisma.learnCategory.create({
    data: {
      title: 'Machine Learning',
      order: 14,
      domainId: domain.id,
      topics: {
        create: [
          { title: 'What is Machine Learning', slug: 'aiml-what-is-machine-learning', order: 1, content: `What is Machine Learning\n\nMachine Learning is the science of programming computers to learn from data without explicit programming. Instead of writing rules manually, ML algorithms discover patterns in data and use them for predictions or decisions. ML powers recommendation systems, fraud detection, image recognition, and language translation.\n\nTraditional programming requires developers to specify every rule and condition. ML inverts this—provide examples (data), and algorithms learn rules automatically. This approach handles complexity humans can't easily codify, like recognizing faces or understanding speech.\n\nML algorithms learn from experience (data) to improve performance on tasks. The learning process involves training models on datasets, adjusting internal parameters to minimize errors, and validating performance on unseen data. More data and better algorithms generally produce better models.\n\nML divides into supervised learning (learning from labeled examples), unsupervised learning (finding patterns in unlabeled data), and reinforcement learning (learning through trial and error with rewards). Each approach suits different problem types.\n\nML has transformed industries—personalized recommendations drive engagement, predictive maintenance reduces downtime, medical diagnosis aids doctors, and autonomous vehicles navigate roads. Understanding ML fundamentals enables participating in this technological revolution.` },
          { title: 'ML Types', slug: 'aiml-ml-types', order: 2, content: `ML Types\n\nMachine Learning algorithms categorize into three primary types based on learning approach: supervised learning (learning from labeled data), unsupervised learning (discovering patterns in unlabeled data), and reinforcement learning (learning through interaction with environments). Each type addresses different problem classes.\n\nSupervised learning maps inputs to known outputs—predicting house prices from features, classifying emails as spam/not spam, diagnosing diseases from symptoms. The "supervision" comes from labeled training examples teaching the algorithm correct answers.\n\nUnsupervised learning finds structure in unlabeled data—customer segmentation without predefined groups, dimensionality reduction for visualization, anomaly detection without labeled anomalies. These algorithms discover hidden patterns humans might miss.\n\nReinforcement learning trains agents to make sequential decisions—game playing (AlphaGo, Dota), robotics (grasping, walking), resource management (traffic control, energy optimization). Agents learn through trial and error, receiving rewards or penalties based on actions.\n\nSemi-supervised learning combines labeled and unlabeled data, active learning selects informative samples for labeling, and transfer learning reuses knowledge from one task on related tasks. These hybrid approaches address practical constraints like limited labels or changing domains.\n\nUnderstanding ML types guides problem formulation—what data is available, what outputs are needed, what learning signal exists. Matching problem characteristics to ML types is the first step in successful ML application.` },
          { title: 'Supervised Learning', slug: 'aiml-supervised-learning', order: 3, content: `Supervised Learning\n\nSupervised learning trains models on labeled datasets where each input has a corresponding correct output. The model learns to map inputs to outputs by minimizing prediction errors on training data. Supervised learning dominantes practical ML applications due to clear objectives and measurable performance.\n\nClassification predicts discrete categories—spam detection, image recognition, medical diagnosis. Regression predicts continuous values—house prices, stock prices, temperature forecasting. Both use labeled training examples, but the output type differs.\n\nThe supervised learning workflow: collect labeled data, split into training/validation/test sets, choose an algorithm (linear models, trees, neural networks), train on training data, tune hyperparameters on validation data, and evaluate on test data. This process ensures models generalize beyond training examples.\n\nCommon algorithms include linear/logistic regression (simple, interpretable), decision trees (handle non-linearity), random forests (robust ensembles), gradient boosting (high performance), support vector machines (effective in high dimensions), and neural networks (powerful but complex).\n\nSupervised learning requires labeled data, often expensive to obtain. Active learning reduces labeling costs by selecting informative samples. Data augmentation artificially expands datasets. Despite costs, supervised learning's clear objectives make it the most widely adopted ML paradigm.` },
          { title: 'Unsupervised Learning', slug: 'aiml-unsupervised-learning', order: 4, content: `Unsupervised Learning\n\nUnsupervised learning discovers patterns and structure in data without labeled outputs. These algorithms explore data to find hidden relationships, groupings, or representations. Unsupervised learning handles scenarios where labels are unavailable, expensive, or undefined.\n\nClustering groups similar data points—customer segmentation, document organization, image compression. K-means, hierarchical clustering, and DBSCAN are common algorithms. Clustering reveals natural groupings without predefined categories.\n\nDimensionality reduction compresses high-dimensional data while preserving structure—PCA for linear reduction, t-SNE and UMAP for visualization, autoencoders for non-linear compression. Reduced dimensions improve visualization, speed up training, and alleviate the curse of dimensionality.\n\nAnomaly detection identifies unusual patterns—fraud detection, network intrusion, manufacturing defects. Without labeled anomalies, unsupervised methods learn normal behavior and flag deviations. Isolation forests, one-class SVMs, and autoencoders serve this purpose.\n\nAssociation rule learning finds relationships—market basket analysis (customers who buy X also buy Y), recommendation systems. These patterns inform business strategies and personalization.\n\nUnsupervised learning enables exploration when objectives are unclear or labels unavailable. While harder to evaluate than supervised learning (no clear correctness measure), it reveals insights and structures that seed further analysis or enable downstream supervised tasks.` },
          { title: 'Linear Regression', slug: 'aiml-linear-regression', order: 5, content: `Linear Regression\n\nLinear regression models relationships between features and continuous targets using linear equations. It's the simplest supervised learning algorithm, serving as baseline and interpretable model for regression tasks. Despite simplicity, linear regression remains widely used due to interpretability and computational efficiency.\n\nThe linear model assumes y = β₀ + β₁x₁ + β₂x₂ + ... + βₙxₙ + ε, where β coefficients quantify feature contributions. Training minimizes squared prediction errors (least squares), finding coefficients that best fit training data. Coefficients directly interpret feature importance and direction.\n\nLinear regression assumes linearity (relationships are linear), independence (observations are independent), homoscedasticity (constant error variance), and normality (errors are normally distributed). Violations don't prevent predictions but invalidate statistical inference like confidence intervals and p-values.\n\nMultiple linear regression includes multiple features. Polynomial regression adds polynomial terms (x², x³) to capture non-linearity. Regularized regression (Ridge, Lasso, Elastic Net) prevents overfitting by penalizing large coefficients, essential for high-dimensional data.\n\nIn ML workflows, linear regression provides interpretable baselines, identifies important features through coefficients, and performs well when relationships are approximately linear. Its simplicity enables fast training on large datasets and straightforward deployment compared to complex models.` },
          { title: 'Logistic Regression', slug: 'aiml-logistic-regression', order: 6, content: `Logistic Regression\n\nLogistic regression is a classification algorithm that predicts probabilities of categorical outcomes. Despite its name, it's a classification method, not regression. Logistic regression applies the logistic (sigmoid) function to linear combinations of features, outputting probabilities between 0 and 1.\n\nThe logistic function σ(z) = 1/(1+e⁻ᶻ) transforms linear predictions into probabilities. For binary classification, outputs above 0.5 predict positive class, below 0.5 predict negative. Multi-class extensions (one-vs-rest, softmax regression) handle multiple categories.\n\nTraining maximizes likelihood—finding coefficients that make observed outcomes most probable under the model. Regularization (L1, L2) prevents overfitting. Logistic regression provides calibrated probabilities useful for decision-making under uncertainty.\n\nLogistic regression coefficients interpret feature importance—positive coefficients increase positive class probability, negative coefficients decrease it. This interpretability makes logistic regression popular in medicine, finance, and business where explanations matter.\n\nIn ML workflows, logistic regression serves as strong baseline for classification, provides feature importance analysis, and works well with high-dimensional sparse data (text classification). It's computationally efficient, supporting online learning and large-scale applications.` },
          { title: 'Decision Trees', slug: 'aiml-decision-trees', order: 7, content: `Decision Trees\n\nDecision trees make predictions through a series of yes/no questions about features, creating a tree structure of decisions. Each internal node represents a feature test, branches represent outcomes, and leaf nodes represent predictions. Trees are intuitive, interpretable, and handle non-linear relationships naturally.\n\nTree construction involves recursive partitioning—select best feature to split data (maximizing information gain or minimizing impurity), split data into subsets, recurse on subsets until stopping criteria met. Features can be reused in different branches, enabling complex decision boundaries.\n\nDecision trees handle both classification and regression, require minimal data preprocessing (no scaling needed), manage missing values naturally, and capture feature interactions automatically. Tree visualization makes models interpretable—you can literally see the decision process.\n\nSingle trees tend to overfit—they memorize training data noise. Regularization controls depth, minimum samples per leaf, and minimum impurity decrease. Despite regularization, single trees are unstable—small data changes cause large tree changes. This motivates ensemble methods.\n\nIn ML practice, single decision trees serve exploratory analysis and baseline models. Their true power emerges in ensembles—Random Forests average many trees, Gradient Boosting builds trees sequentially. Trees' ability to handle mixed features and capture interactions makes them foundational in modern ML.` },
          { title: 'Random Forests', slug: 'aiml-random-forests', order: 8, content: `Random Forests\n\nRandom Forests ensemble multiple decision trees, combining their predictions through voting (classification) or averaging (regression). This ensemble approach reduces overfitting and variance compared to single trees, producing robust, high-performance models. Random Forests are among the most reliable ML algorithms.\n\nEach tree trains on a bootstrap sample (random sample with replacement) of the dataset. At each split, only a random subset of features is considered. These randomization techniques decorrelate trees, ensuring ensemble diversity. More diverse trees produce better ensembles through error averaging.\n\nRandom Forests require minimal hyperparameter tuning—more trees generally improve performance without overfitting. They handle high-dimensional data, provide feature importance rankings, and estimate prediction confidence through tree vote distributions.\n\nFeature importance from Random Forests identifies predictive features—features splitting near tree roots contribute more. Permutation importance measures performance drops when shuffling features, providing model-agnostic importance estimates.\n\nIn ML practice, Random Forests serve as strong default algorithms—they work well out-of-the-box, resist overfitting, and handle mixed feature types. While slower than single trees and less interpretable than linear models, their predictive performance makes them extremely popular for tabular data problems.` },
          { title: 'Support Vector Machines', slug: 'aiml-support-vector-machines', order: 9, content: `Support Vector Machines\n\nSupport Vector Machines (SVMs) find optimal decision boundaries (hyperplanes) separating classes in feature space. SVMs maximize the margin—distance from hyperplane to nearest data points (support vectors)—creating robust classifiers less sensitive to outliers. SVMs excel in high-dimensional spaces and complex boundaries.\n\nLinear SVMs find hyperplanes separating linearly separable data. Non-linear SVMs use kernel trick—implicitly mapping data to higher dimensions where linear separation becomes possible. Common kernels include polynomial, RBF (Gaussian), and sigmoid, each capturing different non-linear patterns.\n\nSVMs balance maximizing margin with minimizing misclassification through the C parameter—small C allows more misclassifications for wider margins (soft margin), large C enforces stricter separation. Kernel parameters control complexity.\n\nSVMs handle high-dimensional data efficiently—effective when features exceed samples. They're memory efficient since only support vectors (subset of training data) matter. However, training scales poorly to large datasets, and kernel/parameter selection requires expertise.\n\nIn ML practice, SVMs excel at text classification, bioinformatics (gene expression), and image recognition. While neural networks dominate modern applications, SVMs remain competitive on small-to-medium datasets and provide theoretical guarantees through margin maximization principles.` },
          { title: 'K-Nearest Neighbors', slug: 'aiml-k-nearest-neighbors', order: 10, content: `K-Nearest Neighbors\n\nK-Nearest Neighbors (KNN) classifies data points based on majority vote of K nearest neighbors in feature space. It's an instance-based algorithm—no explicit training phase, predictions query the training set directly. KNN's simplicity makes it an excellent conceptual introduction to ML.\n\nPrediction finds K closest training examples using distance metrics (Euclidean, Manhattan, cosine). For classification, majority class among K neighbors determines prediction. For regression, average of neighbor values provides prediction. The K parameter controls model complexity—small K is flexible but noisy, large K is smooth but less adaptive.\n\nKNN requires no training—it's lazy learning. All computation happens at prediction time. This makes training instant but prediction slow on large datasets. Distance calculations require feature scaling—features with larger ranges dominate distance without normalization.\n\nKNN suffers in high dimensions—the curse of dimensionality causes distances to become less meaningful as dimensions increase. It's sensitive to irrelevant features. Efficient nearest neighbor search (KD-trees, Ball trees, LSH) accelerates queries but doesn't fundamental solve these issues.\n\nIn ML practice, KNN serves introductory teaching and baseline models. It works well on small datasets with meaningful distance metrics. Recommendation systems use collaborative filtering based on KNN principles. While simple, KNN's computational cost limits scalability compared to parametric models.` },
          { title: 'Clustering', slug: 'aiml-clustering', order: 11, content: `Clustering Algorithms\n\nClustering groups similar data points without predefined labels, discovering natural structure in data. It's the most common unsupervised learning task, used for customer segmentation, document organization, image compression, and exploratory analysis. Clustering reveals hidden patterns and simplifies complex datasets.\n\nK-Means partitions data into K clusters by minimizing within-cluster variance. It's fast, scalable, but requires specifying K and assumes spherical clusters. Hierarchical clustering builds tree structures of clusters (dendrograms), revealing data structure at multiple scales without predefined K.\n\nDBSCAN finds arbitrary-shaped clusters based on density, automatically determining cluster count and identifying outliers. It works well with irregular shapes but requires tuning density parameters. Gaussian Mixture Models (GMMs) model clusters as probabilistic distributions, providing soft cluster assignments.\n\nEvaluating clustering is challenging without ground truth. Silhouette score measures within-cluster cohesion and between-cluster separation. Domain expertise often judges cluster quality—do clusters correspond to meaningful groups?\n\nIn ML workflows, clustering preprocesses data for supervised learning (cluster-based features), reduces dimensionality (represent points by cluster membership), identifies outliers (points not belonging to clusters), and enables exploratory analysis. Understanding clustering enables discovering structure in unlabeled data.` },
          { title: 'Model Training', slug: 'aiml-model-training', order: 12, content: `Model Training\n\nModel training adjusts algorithm parameters to minimize prediction errors on training data. It's the core ML process—models learn patterns by iteratively improving predictions. Training involves loss functions quantifying errors, optimization algorithms finding better parameters, and validation ensuring generalization.\n\nThe training loop: initialize parameters, compute predictions, calculate loss (difference from true values), compute gradients showing improvement direction, update parameters, repeat until convergence. This iterative process gradually improves model fit to training data.\n\nBatch training uses entire datasets per update, providing stable gradients but consuming memory. Stochastic Gradient Descent (SGD) uses single samples, enabling large-scale training with noisy updates. Mini-batch training balances both—moderate batch sizes provide reasonable gradients While fitting in memory.\n\nEarly stopping prevents overfitting by monitoring validation performance—stop training when validation error stops decreasing even as training error decreases. This prevents models from memorizing training noise.\n\nIn ML workflows, training converts raw algorithms into useful models. Computing resources (CPUs, GPUs), training time, and hyperparameters all impact final model quality. Understanding training dynamics—learning curves, convergence patterns, instabilities—enables effective model development.` },
          { title: 'Overfitting & Underfitting', slug: 'aiml-overfitting-underfitting', order: 13, content: `Overfitting & Underfitting\n\nOverfitting occurs when models memorize training data including noise, performing well on training but poorly on unseen data. Underfitting occurs when models are too simple to capture data patterns, performing poorly on both training and test data. Balancing model complexity achieves good generalization.\n\nOverfit models have high variance—small training data changes cause large prediction changes. They capture spurious patterns that don't generalize. Underfit models have high bias—they systematically miss relevant patterns. The bias-variance tradeoff describes this balance.\n\nCauses of overfitting: too many parameters relative to data, training too long, insufficient regularization. Solutions include regularization (L1, L2, dropout), more training data, early stopping, simplifying models, and ensembling. Overfitting is the central challenge in ML.\n\nCauses of underfitting: too simple models, insufficient features, over-regularization. Solutions include more complex models, feature engineering, reducing regularization, and training longer. Learning curves showing training and validation error diagnose under/overfitting.\n\nIn ML practice, start simple and increase complexity while monitoring validation performance. Regularization combats overfitting without sacrificing capacity. Understanding this fundamental tradeoff guides model selection, architecture design, and training strategies. Generalization to unseen data is the ultimate success metric.` },
          { title: 'Cross Validation', slug: 'aiml-cross-validation', order: 14, content: `Cross Validation\n\nCross Validation estimates model performance on unseen data by training and evaluating on different data splits. It provides more reliable performance estimates than single train-test splits, crucial for model selection and hyperparameter tuning. CV reduces performance estimate variance while maximizing data usage.\n\nK-Fold CV splits data into K equal parts (folds), trains on K-1 folds and validates on the remaining fold, repeats for each fold, and averages K performance scores. This uses all data for both training and validation. Common K values are 5 or 10, balancing computational cost and estimate quality.\n\nStratified K-Fold maintains class proportions in each fold, critical for imbalanced datasets. Leave-One-Out CV (LOOCV) uses single samples as validation sets, providing nearly unbiased estimates but requiring many training runs. Time Series CV respects temporal ordering—training on past, validating on future.\n\nCV guides model selection by comparing algorithms under consistent evaluation. Nested CV separates hyperparameter tuning (inner CV loops) from performance estimation (outer CV loop), preventing optimistic bias from tuning on test data.\n\nIn ML workflows, CV validates that models generalize beyond specific train-test splits. It's essential for rigorous model comparison, hyperparameter tuning, and understanding performance variability. CV is standard practice for trustworthy ML evaluation.` },
          { title: 'Hyperparameter Tuning', slug: 'aiml-hyperparameter-tuning', order: 15, content: `Hyperparameter Tuning\n\nHyperparameters are algorithm configuration settings set before training, unlike model parameters learned during training. Examples include learning rate, regularization strength, tree depth, and number of neurons. Tuning hyperparameters significantly impacts model performance, often more than algorithm choice itself.\n\nGrid search evaluates all combinations of hyperparameter values in specified ranges. Exhaustive but expensive—exponential cost in number of hyperparameters. Random search samples random combinations, often finding good configurations faster than grid search by exploring more hyperparameter space.\n\nBayesian optimization builds probabilistic models of hyperparameter performance, using past evaluations to guide next trials toward promising regions. Tools like Optuna and Hyperopt implement Bayesian optimization, dramatically reducing tuning cost compared to grid/random search.\n\nAutomated machine learning (AutoML) extends hyperparameter tuning to include algorithm selection, feature engineering, and ensembling. Tools like Auto-sklearn and H2O AutoML democratize ML by automating tedious tuning.\n\nIn ML projects, good defaults often suffice initially. Tuning becomes crucial when squeezing final performance points. Cross-validation within tuning loops prevents overfitting to validation sets. Understanding hyperparameter effects enables efficient manual tuning and debugging poor performance.` }
        ]
      }
    }
  });
  console.log('✅ Machine Learning: 15 topics');

  // 15. DEEP LEARNING
  await prisma.learnCategory.create({
    data: {
      title: 'Deep Learning',
      order: 15,
      domainId: domain.id,
      topics: {
        create: [
          { title: 'Deep Learning Introduction', slug: 'aiml-deep-learning-introduction', order: 1, content: `Deep Learning Introduction

Deep Learning uses neural networks with multiple layers to learn hierarchical representations from raw data. Unlike traditional ML requiring manual feature engineering, deep learning automatically discovers features through layers of transformation. This approach revolutionized computer vision, speech recognition, and natural language processing.

Deep networks stack layers—each layer learns increasingly abstract representations. In image recognition, early layers detect edges, middle layers detect shapes, and deep layers recognize objects. This hierarchical feature learning mimics aspects of biological vision and enables handling complex, high-dimensional data.

The "deep" in deep learning refers to many layers, not algorithmic sophistication. Modern networks contain dozens to hundreds of layers. Training deep networks requires large datasets, powerful GPUs, and algorithmic innovations like batch normalization and residual connections to overcome vanishing gradients.

Deep learning breakthroughs include AlexNet (image classification), GPT (language generation), AlphaGo (game playing), and Stable Diffusion (image generation). These successes stem from combining neural network architectures, massive datasets, and computational scale.

Understanding deep learning fundamentals—neural networks, backpropagation, architectures—enables leveraging pre-trained models and developing custom solutions. While frameworks abstract implementation details, conceptual understanding guides architecture design, debugging, and optimization.` },
          { title: 'Neural Networks', slug: 'aiml-neural-networks', order: 2, content: `Neural Networks

Neural networks are computational models inspired by biological neurons, consisting of interconnected nodes (neurons) organized in layers. Input layers receive data, hidden layers transform it, and output layers produce predictions. Connections have weights learned during training, enabling networks to approximate complex functions.

Each neuron computes a weighted sum of inputs, applies an activation function, and passes the result to next-layer neurons. This simple operation, repeated across layers and neurons, creates powerful function approximators. The Universal Approximation Theorem proves neural networks can approximate any continuous function given sufficient neurons.

Feedforward networks pass data forward through layers without loops—input to hidden to output. Training adjusts weights to minimize loss using backpropagation and gradient descent. Network architecture (layers, neurons per layer, activation functions) determines capacity and inductive biases.

Neural networks excel at pattern recognition in high-dimensional data—images, audio, text. They handle non-linear relationships naturally, unlike linear models. However, they require substantial data, computational resources, and careful tuning. They're also "black boxes" with limited interpretability.

Understanding neural network fundamentals—forward propagation, weight updates, activation functions—provides foundation for all deep learning architectures. Modern deep learning extends these basics with specialized architectures (CNNs, RNNs, Transformers) and training techniques.` },
          { title: 'Activation Functions', slug: 'aiml-activation-functions', order: 3, content: `Activation Functions

Activation functions introduce non-linearity into neural networks, enabling them to learn complex patterns. Without activation functions, stacked layers would reduce to a single linear transformation, no matter how many layers. Non-linearity is essential for neural network expressiveness.

ReLU (Rectified Linear Unit) outputs max(0, x), setting negative values to zero. It's computationally efficient and reduces vanishing gradient problems, making it the default activation for hidden layers. Variants like Leaky ReLU and ELU address ReLU's "dying neurons" problem where neurons output only zeros.

Sigmoid squashes outputs to (0, 1), suitable for binary classification output layers but causing vanishing gradients in deep networks. Tanh squashes to (-1, 1), centering outputs around zero. Both are largely replaced by ReLU in hidden layers.

Softmax converts logits to probability distributions over classes, essential for multi-class classification outputs. Each output represents class probability, summing to 1. Cross-entropy loss combines naturally with softmax for classification training.

Choosing activations impacts training dynamics—ReLU accelerates convergence, sigmoid/tanh cause vanishing gradients in deep networks, softmax enables probabilistic outputs. Understanding activation function properties guides architecture design and debugging training issues.` },
          { title: 'Backpropagation', slug: 'aiml-backpropagation', order: 4, content: `Backpropagation

Backpropagation computes gradients of loss functions with respect to network parameters by applying the chain rule backward through layers. It's the algorithm that makes training deep networks tractable, enabling efficient gradient computation for millions of parameters. Backpropagation is the computational engine of deep learning.

Forward pass computes predictions by passing inputs through layers. Loss measures prediction error. Backward pass propagates loss gradients backward—compute output layer gradients, pass to previous layer weighted by connections, repeat to input layer. Each parameter's gradient indicates how to adjust it to reduce loss.

The chain rule of calculus enables backpropagation—derivatives of composed functions multiply. For network f(g(h(x))), the gradient chains: df/dx = (df/dg) × (dg/dh) × (dh/dx). Each layer computes its local gradient and passes gradient information backward.

Automatic differentiation in frameworks (PyTorch, TensorFlow) implements backpropagation automatically. Define forward computation, call backward(), and gradients populate automatically. This abstraction enables focusing on architecture design rather than gradient derivation.

Understanding backpropagation explains training dynamics—vanishing/exploding gradients, why skip connections help, and why network depth matters. While frameworks automate computation, conceptual understanding enables debugging training issues and designing effective architectures.` },
          { title: 'Convolutional Neural Networks', slug: 'aiml-convolutional-neural-networks', order: 5, content: `Convolutional Neural Networks

Convolutional Neural Networks (CNNs) are specialized architectures for processing grid-like data, especially images. Convolution layers apply learned filters across inputs, detecting patterns like edges, textures, and objects. CNNs revolutionized computer vision, achieving human-level performance on image tasks.

Convolution operations slide filters (kernels) across images, computing dot products at each position. Filters learn to detect features—early layers detect edges and colors, deeper layers detect complex patterns. Weight sharing (same filter across image) reduces parameters dramatically compared to fully-connected layers.

Pooling layers downsample feature maps, reducing spatial dimensions while retaining important features. Max pooling selects maximum values in windows, introducing translation invariance. Alternating convolution and pooling layers progressively reduce spatial dimensions while increasing channel depth.

CNN architectures evolved from LeNet (digit recognition) through AlexNet (ImageNet breakthrough), VGG (deeper networks), ResNet (skip connections), to EfficientNet (compound scaling). Modern architectures like Vision Transformers challenge convolution's dominance but CNNs remain efficient and effective.

In practice, CNNs dominate image classification, object detection, segmentation, and medical imaging. Transfer learning from pre-trained CNNs (ResNet, EfficientNet) enables excellent performance with limited data. Understanding convolution operations and CNN architectures is essential for computer vision applications.` },
          { title: 'Recurrent Neural Networks', slug: 'aiml-recurrent-neural-networks', order: 6, content: `Recurrent Neural Networks

Recurrent Neural Networks (RNNs) process sequential data by maintaining hidden states that capture information from previous time steps. Unlike feedforward networks processing fixed inputs, RNNs handle variable-length sequences—text, speech, time series. Recurrence enables modeling temporal dependencies and sequential patterns.

RNNs have loops—outputs feed back as inputs at next time steps. Hidden states h_t combine current input x_t with previous state h_{t-1}, creating memory of past inputs. This recurrence processes sequences of arbitrary length, maintaining context across time steps.

Training RNNs uses Backpropagation Through Time (BPTT)—unroll the network across time steps and apply standard backpropagation. However, gradients vanish or explode when propagating through many time steps, limiting RNNs to short-term dependencies. LSTM and GRU architectures address this limitation.

RNNs excel at sequence modeling—language modeling, speech recognition, video analysis, and time series forecasting. They enable tasks like sequence-to-sequence translation and text generation. However, transformers have largely replaced RNNs in NLP due to better parallelization and long-range modeling.

Understanding RNNs provides foundation for sequence modeling concepts—hidden states, temporal dependencies, sequential processing. While transformers dominate modern NLP, RNN concepts influence architecture design and remain relevant for certain sequential tasks.` },
          { title: 'LSTM Networks', slug: 'aiml-lstm-networks', order: 7, content: `LSTM Networks

Long Short-Term Memory (LSTM) networks are RNN variants designed to learn long-term dependencies by mitigating vanishing gradient problems. LSTMs maintain cell states protected by gates controlling information flow, enabling learning dependencies across hundreds of time steps. LSTMs dominated sequence modeling before transformers.

LSTMs have three gates: forget gate (decides what to discard from cell state), input gate (decides what new information to store), and output gate (decides what to output). These gates learn to selectively remember and forget information, enabling long-term memory without gradient vanishing.

Cell state acts as a highway allowing gradients to flow across time steps with minimal transformation. Gates use sigmoid activations outputting values between 0 and 1, acting as learnable filters. This architecture enables LSTMs to capture dependencies spanning long sequences.

LSTMs excel at machine translation, speech recognition, text generation, and time series prediction requiring long-term context. Despite transformers' rise, LSTMs remain competitive for certain tasks and are more parameter-efficient than transformers on small datasets.

Understanding LSTMs explains how neural networks model temporal dependencies and overcome vanishing gradients. While transformers dominate NLP, LSTM concepts—gating mechanisms and memory cells—influence modern architectures and provide intuition for sequence modeling.` },
          { title: 'GRU Networks', slug: 'aiml-gru-networks', order: 8, content: `GRU Networks

Gated Recurrent Units (GRUs) are simplified LSTM variants combining forget and input gates into a single update gate. GRUs achieve similar performance to LSTMs with fewer parameters and faster training. They balance LSTM expressiveness with computational efficiency, making them popular for resource-constrained applications.

GRUs have two gates: reset gate (controls how much past information to forget) and update gate (controls how much past information to keep). This simpler architecture reduces parameters by roughly 25% compared to LSTMs while maintaining ability to learn long-term dependencies.

GRUs often perform comparably to LSTMs on many tasks, sometimes better, sometimes worse. No universal winner exists—performance depends on specific tasks and data characteristics. GRUs train faster due to fewer parameters, beneficial for large-scale applications.

Practical applications include speech recognition, machine translation, and time series forecasting where computational efficiency matters. GRUs provide good default choice for sequence modeling when LSTMs seem overkill or computational resources are limited.

Understanding GRUs shows how architectural simplifications can maintain performance while reducing complexity. The GRU vs LSTM comparison illustrates broader ML theme—simpler models often suffice. Try GRUs first, move to LSTMs if performance requires it.` },
          { title: 'Autoencoders', slug: 'aiml-autoencoders', order: 9, content: `Autoencoders

Autoencoders are neural networks trained to reconstruct inputs from compressed representations. The encoder compresses inputs into low-dimensional latent codes, the decoder reconstructs inputs from codes. Training minimizes reconstruction error, forcing networks to learn meaningful compressed representations capturing essential data characteristics.

The bottleneck (latent code) forces dimensionality reduction—networks must learn efficient encodings to enable accurate reconstruction. These learned representations often capture semantic features useful for downstream tasks. Autoencoders perform unsupervised learning—no labels required, just input data.

Variational Autoencoders (VAEs) add probabilistic structure, learning distributions over latent codes rather than deterministic encodings. VAEs enable generating new samples by sampling latent codes and decoding. Denoising autoencoders train to reconstruct clean inputs from corrupted versions, learning robust representations.

Applications include dimensionality reduction (similar to PCA but non-linear), anomaly detection (poorly reconstructed samples are anomalies), denoising (removing noise from images/audio), and generative modeling (VAEs generate new samples).

Understanding autoencoders reveals how neural networks learn unsupervised representations. The encoder-decoder structure appears in modern architectures—transformers, diffusion models, and more. Autoencoders bridge unsupervised and supervised learning through learned representations.` },
          { title: 'Generative Adversarial Networks', slug: 'aiml-generative-adversarial-networks', order: 10, content: `Generative Adversarial Networks

Generative Adversarial Networks (GANs) consist of two competing networks—a generator creating fake samples and a discriminator distinguishing real from fake. Through adversarial training, generators learn to produce increasingly realistic samples while discriminators get better at detection. This game-theoretic approach enables state-of-the-art generative modeling.

The generator maps random noise to data samples, the discriminator classifies samples as real or fake. Generator tries to fool discriminator, discriminator tries to correctly classify. Training alternates—update discriminator on real and generated samples, then update generator to fool discriminator. Game reaches equilibrium when generated samples are indistinguishable from real data.

GANs produce remarkably realistic images, videos, and audio. Applications include image synthesis (faces, art, landscapes), style transfer, super-resolution, data augmentation, and deepfakes. StyleGAN generates photorealistic faces, DALL-E 2 creates images from text, and Deep Voice mimics voices.

Training GANs is notoriously difficult—mode collapse (generator produces limited variety), training instability, and hyperparameter sensitivity cause challenges. Techniques like Wasserstein GANs, progressive growing, and spectral normalization improve stability.

Understanding GANs reveals how adversarial objectives enable unsupervised learning. The generator-discriminator framework extends beyond images to many generative tasks. GANs represent a paradigm shift in generative modeling.` },
          { title: 'Transfer Learning', slug: 'aiml-transfer-learning', order: 11, content: `Transfer Learning

Transfer learning applies knowledge from one task to related tasks by reusing pre-trained model weights. Instead of training from scratch, start with models trained on large datasets (ImageNet, Wikipedia), then fine-tune on specific tasks. This approach dramatically reduces training time and data requirements.

Pre-trained models learn general features—ImageNet models learn edge and texture detectors useful for many vision tasks. Fine-tuning adapts these features to new tasks with limited data. Freeze early layers (general features) and train later layers (task-specific features), or fine-tune all layers with small learning rates.

Transfer learning is crucial when data is limited—medical imaging rarely has millions of labeled images, but pre-trained models provide strong starting points. Fine-tuning on hundreds of samples often outperforms training from scratch on thousands.

Practical applications span computer vision (ResNet, EfficientNet pre-trained models), NLP (BERT, GPT fine-tuning), and speech recognition. Popular frameworks (Hugging Face, TensorFlow Hub, PyTorch Hub) provide thousands of pre-trained models ready for transfer.

Understanding transfer learning enables building effective models with limited data and computation. It's the default approach in modern ML—rarely train large models from scratch. Transfer learning democratizes deep learning by making powerful models accessible without massive resources.` },
          { title: 'Batch Normalization', slug: 'aiml-batch-normalization', order: 12, content: `Batch Normalization

Batch Normalization normalizes layer activations within mini-batches, stabilizing training and enabling higher learning rates. It addresses internal covariate shift—changing activation distributions across layers make training difficult. Batch norm is one of the most impactful deep learning innovations, enabling training very deep networks.

Batch norm normalizes activations to zero mean and unit variance within each mini-batch, then scales and shifts with learned parameters. This normalization happens per mini-batch during training. At inference, use running statistics computed during training for normalization.

Benefits include faster training (allows higher learning rates), improved gradient flow (reduces vanishing gradients), regularization effect (mini-batch statistics add noise), and reduced sensitivity to initialization. Batch norm enabled ResNet's 152-layer breakthrough.

Place batch norm after linear/convolutional layers, typically before activation functions (though after activations also works). Almost all modern CNNs use batch norm. However, it's less effective with small batch sizes and doesn't suit recurrent networks well (layer norm used instead).

Understanding batch normalization explains why modern networks train faster and deeper than historical networks. It's a standard component of most architectures—including batch norm is default practice unless specific reasons argue against it.` },
          { title: 'Dropout', slug: 'aiml-dropout', order: 13, content: `Dropout Regularization

Dropout randomly sets neuron outputs to zero during training with probability p (typically 0.5). This forces networks to learn redundant representations since any neuron might be dropped, preventing over-reliance on specific neurons. Dropout is a simple yet powerful regularization technique reducing overfitting.

During training, each forward pass randomly drops different neurons. This creates an ensemble effect—training exponentially many "thinned" networks that share weights. At inference, use all neurons but scale outputs by keep probability, approximating ensemble averaging.

Dropout particularly helps fully-connected layers prone to overfitting. Apply dropout between layers but not to convolutional layers (they already regularize through weight sharing). Typical dropout rates: 0.5 for fully-connected, 0.1-0.2 for convolutional if used.

Dropout slows training convergence since each mini-batch trains a different sub-network. However, final models generalize much better. It's essential when training data is limited. Modern architectures combine dropout with batch normalization and data augmentation for comprehensive regularization.

Understanding dropout reveals how randomization during training improves generalization. The ensemble interpretation explains its effectiveness. Dropout is a go-to regularization technique, especially for fully-connected layers in image classifiers and NLP models.` },
          { title: 'Optimizers', slug: 'aiml-optimizers', order: 14, content: `Deep Learning Optimizers

Optimizers update network parameters to minimize loss functions. While gradient descent provides the conceptual foundation, practical deep learning uses sophisticated optimizers that adapt learning rates, accumulate momentum, and handle sparse gradients. Optimizer choice significantly impacts training speed and final performance.

Stochastic Gradient Descent (SGD) updates parameters using mini-batch gradients. SGD with momentum accumulates gradients over time, smoothing optimization paths and accelerating convergence. Momentum helps escape local minima and navigate ravines in loss landscapes.

Adam (Adaptive Moment Estimation) adapts learning rates per parameter using gradient first and second moments (means and variances). Adam combines momentum with adaptive learning rates, working well across diverse problems. It's the default optimizer for many applications due to robustness.

RMSprop adapts learning rates based on recent gradient magnitudes, effective for non-stationary objectives. AdaGrad accumulates squared gradients, reducing learning rates for frequently updated parameters. These adaptive optimizers require less manual learning rate tuning than SGD.

Choosing optimizers: Adam for default choice (works well generally), SGD with momentum for careful tuning (often achieves best final performance), RMSprop for RNNs. Learning rate remains the most important hyperparameter regardless of optimizer. Understanding optimizers enables effective training and diagnosing convergence issues.` },
          { title: 'Loss Functions', slug: 'aiml-loss-functions', order: 15, content: `Loss Functions

Loss functions quantify prediction errors, providing training objectives for optimization. They define what "good" means, guiding networks toward desired behavior. Different tasks require different losses—classification uses cross-entropy, regression uses mean squared error, and specialized tasks use custom losses.

Cross-entropy loss measures dissimilarity between predicted and true probability distributions, essential for classification. Binary cross-entropy for binary classification, categorical cross-entropy for multi-class. Combined with softmax, cross-entropy provides smooth gradients for classification training.

Mean Squared Error (MSE) measures average squared prediction errors, standard for regression. Mean Absolute Error (MAE) measures average absolute errors, more robust to outliers. Huber loss combines both, behaving like MSE near zero and MAE for large errors.

Specialized losses include contrastive loss (metric learning), triplet loss (embedding learning), focal loss (handling class imbalance), and perceptual loss (image generation). Custom losses encode domain knowledge and inductive biases into training.

Loss function choice shapes model behavior—MSE penalizes outliers heavily, MAE treats all errors equally, focal loss focuses on hard examples. Understanding loss functions enables designing training objectives aligned with business goals and model requirements. Loss engineering is as important as architecture design.` }
        ]
      }
    }
  });
  console.log('✅ Deep Learning: 15 topics');

  // ==========================================================================
  // BATCH 5: NLP → Computer Vision
  // ==========================================================================
  console.log('\n📦 BATCH 5: NLP → Computer Vision');

  // 16. NATURAL LANGUAGE PROCESSING
  await prisma.learnCategory.create({
    data: {
      title: 'Natural Language Processing',
      order: 16,
      domainId: domain.id,
      topics: {
        create: [
          { title: 'NLP Introduction', slug: 'aiml-nlp-introduction', order: 1, content: `NLP Introduction

Natural Language Processing enables computers to understand, interpret, and generate human language. NLP bridges human communication and machine computation, powering chatbots, translation, search engines, and voice assistants. It's one of AI's most impactful domains, touching billions of users daily.

Language is complex—ambiguity, context-dependence, idioms, and cultural nuances challenge computational analysis. Unlike structured data, text requires sophisticated processing to extract meaning. NLP combines linguistics, machine learning, and deep learning to handle this complexity.

Historical NLP relied on rule-based systems and statistical methods. Modern NLP leverages deep learning—RNNs, LSTMs, and especially transformers enable unprecedented language understanding. Large Language Models (GPT, BERT) trained on massive text corpora achieve human-level performance on many tasks.

NLP tasks span text classification (spam detection, sentiment analysis), named entity recognition, machine translation, question answering, summarization, and text generation. Each task requires different approaches, from simple classifiers to massive transformer models.

Understanding NLP fundamentals—text representation, sequence modeling, attention mechanisms—enables leveraging powerful pre-trained models and building custom language applications. NLP skills are increasingly essential across industries as text data proliferates.` },
          { title: 'Text Preprocessing', slug: 'aiml-text-preprocessing', order: 2, content: `Text Preprocessing

Text preprocessing transforms raw text into clean, standardized formats suitable for NLP models. Raw text contains noise—HTML tags, special characters, inconsistent casing, extra whitespace. Preprocessing removes or standardizes these elements, improving model performance and reducing vocabulary size.

Common preprocessing steps include lowercasing (normalizing case variations), removing punctuation and special characters, stripping HTML/XML tags, expanding contractions (don't → do not), and removing stopwords (common words like 'the', 'is', 'and'). The specific steps depend on the task—sentiment analysis might keep punctuation (!!!) conveying emphasis.

Whitespace normalization removes extra spaces, tabs, and newlines. URL and email removal strips addresses often uninformative for meaning. Number handling varies—replace with placeholders, remove entirely, or keep based on task requirements.

Preprocessing tradeoffs exist—aggressive cleaning removes noise but may discard useful information. Removing stopwords reduces dimensionality but loses grammatical structure. Modern transformers often use minimal preprocessing, learning to handle noise through massive training data.

Understanding preprocessing enables building effective NLP pipelines. While pre-trained models handle some preprocessing internally, custom applications require thoughtful text cleaning aligned with task requirements and model architectures.` },
          { title: 'Tokenization', slug: 'aiml-tokenization', order: 3, content: `Tokenization

Tokenization splits text into units (tokens)—words, subwords, or characters. It's the foundational NLP step, converting text strings into sequences that models can process. Tokenization strategies critically impact model performance, vocabulary size, and ability to handle rare words.

Word tokenization splits on whitespace and punctuation, treating each word as a token. Simple but creates huge vocabularies and can't handle unseen words (out-of-vocabulary problem). Character tokenization uses individual characters as tokens, handling any text but creating very long sequences losing semantic meaning.

Subword tokenization (BPE, WordPiece, SentencePiece) balances word and character approaches. It learns to split rare words into common subword units—'unhappiness' → 'un' + 'happiness'. This handles rare words through subword composition while maintaining reasonable vocabulary sizes. Modern transformers use subword tokenization.

Tokenizers must handle special cases—contractions, hyphenated words, URLs, hashtags, emojis. Language-specific tokenizers account for differences—Chinese lacks whitespace, German has compound words, Arabic has complex morphology.

Understanding tokenization explains model vocabulary choices and text handling. Pre-trained models come with specific tokenizers that must be used consistently between training and inference. Tokenization directly determines how models "see" text.` },
          { title: 'Stemming and Lemmatization', slug: 'aiml-stemming-lemmatization', order: 4, content: `Stemming and Lemmatization

Stemming and lemmatization reduce words to base forms, grouping variants. 'running', 'runs', 'ran' map to 'run'. This reduces vocabulary size and helps models recognize that word variants convey similar meanings. Both techniques normalize text for traditional NLP approaches.

Stemming applies heuristic rules to chop word endings—remove 'ing', 'ed', 's'. Porter Stemmer and Snowball Stemmer are popular algorithms. Stemming is fast but crude, sometimes producing non-words ('studies' → 'studi') or failing on irregular forms ('better' doesn't stem to 'good').

Lemmatization uses vocabulary and morphological analysis to return dictionary forms (lemmas). It considers part of speech—'better' (adjective) lemmatizes to 'good', 'better' (verb) remains 'better'. Lemmatization is more accurate but slower, requiring linguistic resources like WordNet.

Modern deep learning often skips stemming/lemmatization—transformers learn relationships between word variants through massive training data. However, stemming remains useful for traditional methods (TF-IDF, classical ML) and resource-constrained applications requiring small vocabularies.

Understanding these techniques reveals how NLP handles morphological variation. While less critical with transformers, they remain relevant for classical NLP pipelines, search systems, and linguistic analysis.` },
          { title: 'Part of Speech Tagging', slug: 'aiml-pos-tagging', order: 5, content: `Part of Speech Tagging

Part of Speech (POS) tagging labels each word with its grammatical role—noun, verb, adjective, adverb, etc. It's a fundamental NLP task providing syntactic information useful for downstream applications. POS tags disambiguate word meanings and enable grammatical analysis.

POS tags include NN (noun), VB (verb), JJ (adjective), RB (adverb), with subtypes like NNS (plural noun), VBD (past tense verb). Tag sets vary—Penn Treebank uses 36 tags, Universal Dependencies uses 17. Tags capture grammatical function essential for parsing and semantic understanding.

POS tagging resolves ambiguity—'book' can be noun (read a book) or verb (book a flight). Context determines correct tag. Traditional taggers used Hidden Markov Models. Modern approaches use neural networks, often achieving 97%+ accuracy. Pre-trained transformers represent POS information implicitly.

Applications include information extraction (identify entities from noun phrases), text-to-speech (POS affects pronunciation), and grammatical error correction. POS tagging assists parsing, semantic role labeling, and machine translation.

Understanding POS tagging reveals how NLP captures syntax. While modern transformers often encode POS information within embeddings, explicit POS tags remain useful for linguistic analysis, rule-based systems, and interpretability.` },
          { title: 'Named Entity Recognition', slug: 'aiml-named-entity-recognition', order: 6, content: `Named Entity Recognition

Named Entity Recognition (NER) identifies and classifies named entities in text—person names, organizations, locations, dates, monetary amounts. NER extracts structured information from unstructured text, enabling knowledge extraction, question answering, and information retrieval.

NER systems assign entity type labels to text spans—'Apple Inc.' (ORGANIZATION), 'Tim Cook' (PERSON), 'California' (LOCATION), 'October 2023' (DATE). Standard tag sets include PERSON, ORGANIZATION, LOCATION, DATE, TIME, MONEY, PERCENT. Domain-specific NER extends to DISEASE, DRUG, GENE for biomedical text.

Traditional NER used CRFs (Conditional Random Fields) with hand-crafted features. Modern NER uses neural networks—BiLSTM-CRF architectures or transformers fine-tuned on labeled data. Pre-trained models (spaCy, Hugging Face NER models) achieve high accuracy out-of-the-box.

Applications include information extraction from documents, enriching search indexes, populating knowledge graphs, and enabling chatbots to understand user queries. NER is crucial for processing legal documents, medical records, and news articles.

Understanding NER enables building information extraction systems. It's often the first step in NLP pipelines converting unstructured text to structured data for analysis. NER bridges raw text and knowledge representation.` },
          { title: 'Word Embeddings', slug: 'aiml-word-embeddings', order: 7, content: `Word Embeddings

Word embeddings represent words as dense, continuous vectors where semantic similarity corresponds to vector proximity. Unlike one-hot encoding treating words independently, embeddings capture semantic relationships—'king' - 'man' + 'woman' ≈ 'queen'. Embeddings revolutionized NLP by enabling neural networks to leverage semantic knowledge.

Embeddings map words to points in high-dimensional space (typically 100-300 dimensions). Similar words cluster together—'cat' near 'dog', 'Paris' near 'London'. These geometric relationships encode semantics learned from word co-occurrence patterns in large text corpora.

Word2Vec (skip-gram, CBOW) and GloVe are classic embedding methods, pre-computing fixed word vectors. Modern contextual embeddings (BERT, GPT) generate different vectors for the same word based on context—'bank' (financial) vs 'bank' (river) get different representations. This captures polysemy and context-dependence.

Embeddings enable measuring semantic similarity via cosine similarity, finding analogies through vector arithmetic, and clustering related concepts. They serve as input layers for neural NLP models, replacing sparse one-hot vectors with rich semantic representations.

Understanding embeddings is fundamental to modern NLP. While transformers generate contextual embeddings dynamically, the core idea—representing discrete symbols as continuous vectors capturing semantic relationships—underpins all neural NLP.` },
          { title: 'Word2Vec', slug: 'aiml-word2vec', order: 8, content: `Word2Vec

Word2Vec learns word embeddings by predicting words from context (CBOW) or context from words (skip-gram). Trained on large text corpora, Word2Vec produces vectors capturing semantic and syntactic relationships. It's a foundational technique that popularized word embeddings in NLP.

Continuous Bag of Words (CBOW) predicts target words from surrounding context words. Skip-gram inverts this—predict context words from target words. Skip-gram works better for rare words, CBOW trains faster. Both use shallow neural networks optimized with negative sampling for efficiency.

Word2Vec produces remarkable semantic relationships—vector arithmetic captures analogies like 'king' - 'man' + 'woman' = 'queen', 'Paris' - 'France' + 'Italy' = 'Rome'. Cosine similarity measures word relatedness. Clustering reveals semantic topics.

Pre-trained Word2Vec models (trained on Google News, Wikipedia) provide instant word vectors for downstream tasks. Load pre-trained vectors, look up words, and use vectors as features for classifiers or inputs to neural networks.

While contextual embeddings (BERT, GPT) have largely superseded Word2Vec, understanding it provides foundation for embedding concepts. Word2Vec remains useful for applications needing lightweight, fast embeddings without context-dependence.` },
          { title: 'Sentiment Analysis', slug: 'aiml-sentiment-analysis', order: 9, content: `Sentiment Analysis

Sentiment Analysis determines emotional tone in text—positive, negative, or neutral. It's one of NLP's most common applications, enabling businesses to monitor brand perception, analyze customer feedback, and gauge public opinion. Sentiment analysis bridges subjective human emotions and objective computational analysis.

Basic sentiment analysis classifies text into polarity categories—positive, negative, neutral. Advanced approaches detect specific emotions (joy, anger, sadness, fear), measure sentiment intensity, and identify targets (sentiment about specific aspects). Aspect-based sentiment extracts opinions about product features.

Traditional methods used sentiment lexicons (dictionaries of positive/negative words) and rule-based scoring. Modern approaches fine-tune transformers (BERT, RoBERTa) on sentiment-labeled datasets. Pre-trained sentiment models achieve 90%+ accuracy on many domains.

Challenges include sarcasm detection ('Great, another delay!' is negative despite 'great'), context-dependence ('unpredictable' is negative for cars, positive for movies), and domain-specific language. Transfer learning from general sentiment models to specific domains partially addresses these challenges.

Understanding sentiment analysis enables building voice-of-customer systems, social media monitoring, and market research tools. It's often the intro NLP project, demonstrating how ML extracts insights from text at scale.` },
          { title: 'Text Classification', slug: 'aiml-text-classification', order: 10, content: `Text Classification

Text classification assigns predefined categories to text documents. It's a fundamental supervised NLP task with applications in spam detection, sentiment analysis, topic categorization, intent recognition, and content moderation. Text classification enables automated processing of massive text volumes.

Classification workflow: collect labeled training data (documents with category labels), extract features (TF-IDF, word embeddings, or transformer representations), train classifiers (Naive Bayes, SVM, neural networks, or fine-tuned transformers), and evaluate on test data.

Traditional approaches used bag-of-words features with classical ML algorithms. TF-IDF weighted term importance, then SVM or Naive Bayes performed classification. Modern approaches fine-tune pre-trained transformers—BERT, RoBERTa, DistilBERT—achieving state-of-the-art performance with less feature engineering.

Multi-label classification assigns multiple categories simultaneously—news articles tagged with [Politics, Economics, Europe]. Hierarchical classification organizes categories in taxonomies. Zero-shot classification categorizes without task-specific training using pre-trained language understanding.

Understanding text classification enables building custom categorization systems for any domain. It's a versatile technique applicable wherever text needs automated organization—from customer support routing to content recommendation.` },
          { title: 'Sequence to Sequence Models', slug: 'aiml-seq2seq-models', order: 11, content: `Sequence to Sequence Models

Sequence-to-Sequence (Seq2Seq) models map input sequences to output sequences of potentially different lengths. They power machine translation, text summarization, question answering, and dialogue systems. Seq2Seq architecture provided the foundation for modern NLP breakthroughs.

Seq2Seq consists of encoder-decoder architecture. The encoder (typically RNN, LSTM, or transformer) processes input sequences into fixed-length context vectors capturing semantic meaning. The decoder generates output sequences one token at a time, conditioned on context and previously generated tokens.

Traditional Seq2Seq used RNNs/LSTMs for both encoder and decoder. The encoder's final hidden state initializes decoder, passing information. However, fixed-length context vectors bottleneck long sequences. Attention mechanisms address this by letting decoders access all encoder states, dramatically improving performance.

Transformer architecture revolutionized Seq2Seq by replacing recurrence with attention exclusively. Transformers enable parallel processing, handle longer sequences, and achieve better performance. Modern translation systems (Google Translate) and summarization tools use transformer-based Seq2Seq.

Understanding Seq2Seq reveals how neural networks handle variable-length input-output mappings. The encoder-decoder pattern appears across NLP tasks and influenced modern architectures. Seq2Seq represents a paradigm shift from fixed-input/output models.` },
          { title: 'Attention Mechanism', slug: 'aiml-attention-mechanism', order: 12, content: `Attention Mechanism

Attention mechanisms let models focus on relevant parts of inputs when generating outputs. Instead of compressing entire sequences into fixed vectors, attention computes dynamic weighted combinations of input representations. Attention revolutionized NLP, enabling transformers and modern language models.

In Seq2Seq models, attention lets decoders "look back" at all encoder states when generating each output token. Attention weights indicate which input tokens are most relevant for current output. This solves the fixed-vector bottleneck, enabling much better handling of long sequences.

Attention computes via query-key-value mechanism. Queries represent current decoder state, keys represent encoder states, and values carry information. Attention weights come from query-key similarity (typically dot product + softmax), then weighted sum of values provides context.

Self-attention (attention within a sequence) powers transformers. Each token attends to all tokens, capturing dependencies regardless of distance. Multi-head attention uses multiple attention functions in parallel, capturing different relationship types. Transformers stack self-attention layers for deep language understanding.

Understanding attention explains why transformers dominate NLP—they process sequences globally rather than sequentially, parallelize efficiently, and capture long-range dependencies. Attention is the core innovation enabling GPT, BERT, and modern language AI.` }
        ]
      }
    }
  });
  console.log('✅ Natural Language Processing: 12 topics');

  // 17. COMPUTER VISION
  await prisma.learnCategory.create({
    data: {
      title: 'Computer Vision',
      order: 17,
      domainId: domain.id,
      topics: {
        create: [
          { title: 'Computer Vision Introduction', slug: 'aiml-computer-vision-introduction', order: 1, content: `Computer Vision Introduction

Computer Vision enables machines to interpret and understand visual information from images and videos. It aims to replicate human visual perception—recognizing objects, understanding scenes, detecting activities. Computer vision powers autonomous vehicles, medical imaging, facial recognition, and augmented reality.

Vision tasks include image classification (assign categories), object detection (locate and classify objects), segmentation (classify every pixel), pose estimation (detect body positions), and image generation. Each requires different approaches, from CNNs to vision transformers to diffusion models.

Historical computer vision used hand-crafted features—edge detectors, SIFT, HOG. Deep learning transformed the field—CNNs surpassed human performance on ImageNet in 2015. Modern vision relies almost exclusively on neural networks learning features automatically from data.

Computer vision combines image processing (filtering, enhancement), feature extraction (edges, textures), and high-level understanding (semantics). Pre-trained models (ResNet, EfficientNet, CLIP) enable transfer learning, achieving excellent results with limited labeled data.

Understanding computer vision fundamentals—image representations, convolutions, detection architectures—enables building vision applications. As cameras proliferate and computational power grows, computer vision increasingly impacts daily life through smartphones, surveillance, healthcare, and automation.` },
          { title: 'Image Processing Basics', slug: 'aiml-image-processing-basics', order: 2, content: `Image Processing Basics

Image processing transforms images to enhance quality, extract information, or prepare for analysis. It's the foundation of computer vision, providing techniques for filtering, edge detection, color manipulation, and geometric transformations. Image processing bridges raw pixels and higher-level vision tasks.

Images are represented as multi-dimensional arrays—grayscale images are 2D arrays of intensity values, color images are 3D arrays with RGB channels. Image coordinates, dimensions, and data types determine memory requirements and processing approaches.

Common operations include filtering (smoothing with Gaussian blur, sharpening with edge enhancement), thresholding (binary conversion), edge detection (Sobel, Canny), morphological operations (erosion, dilation), and histogram equalization (contrast adjustment). These transform images for specific purposes.

Geometric transformations include rotation, scaling, translation, and warping. Perspective correction and image alignment prepare images for analysis. Frequency domain processing via Fourier transforms enables filtering in frequency space.

Understanding image processing provides tools for preprocessing vision pipelines. While neural networks often learn preprocessing implicitly, explicit image processing remains valuable for data augmentation, noise reduction, and domain-specific enhancements improving model performance.` },
          { title: 'OpenCV', slug: 'aiml-opencv', order: 3, content: `OpenCV

OpenCV (Open Source Computer Vision Library) is the most popular computer vision library, providing thousands of optimized algorithms for image and video processing. Written in C++ with Python bindings, OpenCV enables rapid prototyping and production deployment. It's the Swiss Army knife of computer vision.

OpenCV includes classical computer vision algorithms—edge detection, feature extraction, object tracking, camera calibration, stereo vision. It also integrates deep learning models for detection and classification. OpenCV's breadth covers everything from basic filtering to complex 3D reconstruction.

Python's cv2 module makes OpenCV accessible. Read images with cv2.imread(), display with cv2.imshow(), write with cv2.imwrite(). Apply filters, detect edges, find contours, and extract features with simple function calls. OpenCV's extensive documentation and tutorials enable quick learning.

OpenCV excels at real-time video processing—face detection in webcam feeds, object tracking, motion detection. It integrates with cameras, handles video files, and optimizes for performance. Many computer vision products use OpenCV for preprocessing and classical vision tasks.

Understanding OpenCV provides practical computer vision skills. While deep learning handles high-level tasks, OpenCV remains essential for image I/O, preprocessing, classical algorithms, and real-time applications. OpenCV skills complement deep learning for end-to-end vision systems.` },
          { title: 'Image Classification', slug: 'aiml-image-classification', order: 4, content: `Image Classification

Image Classification assigns category labels to images—identify whether images contain cats, dogs, cars, or other objects. It's the fundamental computer vision task, with applications in medical diagnosis, quality control, content moderation, and photo organization. Classification enables automated visual understanding at scale.

Deep learning revolutionized image classification. CNNs learn hierarchical features—edges, textures, parts, objects—achieving superhuman accuracy. AlexNet's 2012 ImageNet victory launched the deep learning era. Modern architectures (ResNet, EfficientNet, Vision Transformers) push accuracy higher while reducing parameters.

Transfer learning dominates practical classification. Pre-trained models on ImageNet (1000 classes, 1.2M images) provide powerful feature extractors. Fine-tune on specific datasets (medical images, satellite imagery, custom products) with hundreds to thousands of labeled images, achieving excellent performance quickly.

Data augmentation—random crops, flips, color jittering, mixup—artificially expands training data, preventing overfitting. Class imbalance requires weighted losses or resampling strategies. Test-time augmentation averages predictions over augmented versions, improving accuracy.

Understanding image classification provides foundation for all vision tasks. Many complex problems reduce to classification—object detection classifies bounding boxes, segmentation classifies pixels. Classification skills transfer across vision domains.` },
          { title: 'Object Detection', slug: 'aiml-object-detection', order: 5, content: `Object Detection

Object Detection locates and classifies multiple objects in images, drawing bounding boxes around detected instances. It extends classification by answering "what" and "where." Detection powers autonomous vehicles (pedestrian detection), surveillance (threat detection), retail (shelf monitoring), and robotics (object manipulation).

Detection requires predicting bounding box coordinates (x, y, width, height) and class labels for each object. Challenges include handling multiple objects, various scales, occlusion, and real-time performance constraints. Modern detectors achieve near-human performance at fast speeds.

Two-stage detectors (R-CNN family) first propose regions, then classify. Single-stage detectors (YOLO, SSD) predict boxes directly in one pass, trading some accuracy for speed. YOLO variants achieve real-time performance (30+ FPS) essential for video applications.

Anchor-based methods use predefined box shapes (anchors) as reference, predicting offsets. Anchor-free methods predict object centers and sizes directly. Non-maximum suppression (NMS) removes duplicate detections. Evaluation uses mAP (mean Average Precision) measuring detection accuracy and localization.

Understanding object detection enables building systems that perceive and interact with visual environments. Detection is crucial for robotics, autonomous systems, and applications requiring spatial understanding of scenes.` },
          { title: 'YOLO', slug: 'aiml-yolo', order: 6, content: `YOLO Algorithm

YOLO (You Only Look Once) is a real-time object detection algorithm that processes images in a single forward pass. Unlike two-stage detectors, YOLO frames detection as regression, predicting bounding boxes and class probabilities simultaneously. YOLO variants (YOLOv3, YOLOv5, YOLOv7, YOLOv8) dominate real-time detection applications.

YOLO divides images into grids, each cell predicting bounding boxes and class probabilities. Predictions are made simultaneously across the entire image in one network evaluation. This unified architecture enables extremely fast inference (30-100+ FPS depending on model size).

YOLO uses anchor boxes for different object shapes and scales. Predictions include box coordinates, objectness score (confidence an object exists), and class probabilities. Non-maximum suppression filters overlapping detections. Loss function balances localization accuracy, objectness, and classification.

YOLO evolution improved accuracy while maintaining speed. YOLOv3 introduced multi-scale predictions. YOLOv5 streamlined implementation and added extensive augmentation. Newer versions push state-of-the-art detection while enabling deployment on edge devices (phones, embedded systems).

Understanding YOLO enables building real-time vision applications—security cameras, drone navigation, sports analytics, AR applications. YOLO's speed-accuracy tradeoff makes it the go-to detector when latency matters.` },
          { title: 'R-CNN Family', slug: 'aiml-rcnn-family', order: 7, content: `R-CNN Family

R-CNN (Region-based Convolutional Neural Network) and its successors (Fast R-CNN, Faster R-CNN, Mask R-CNN) are influential object detection architectures. They use two-stage approach—propose regions, then classify. While slower than YOLO, R-CNN variants achieve higher accuracy, making them suitable when precision matters more than speed.

R-CNN extracts region proposals via selective search, computes CNN features for each region, then classifies with SVM. Slow but accurate. Fast R-CNN shared computation across proposals, dramatically speeding up training and inference. Faster R-CNN introduced Region Proposal Network (RPN), making entire pipeline end-to-end trainable.

RPN predicts objectness and refines anchor boxes, learning to propose regions rather than using heuristics. Region of Interest (RoI) pooling extracts fixed-size features from arbitrary-sized regions. Classification and bounding box regression heads predict classes and refine boxes.

Mask R-CNN extends Faster R-CNN with instance segmentation—predicting pixel masks for each detected object. It adds a mask prediction branch parallel to classification and box regression. Mask R-CNN achieves state-of-the-art instance segmentation while maintaining detection capabilities.

Understanding R-CNN family reveals detection evolution and two-stage detection principles. While YOLO dominates real-time applications, Faster/Mask R-CNN remain competitive for offline processing requiring highest accuracy and instance segmentation.` },
          { title: 'Image Segmentation', slug: 'aiml-image-segmentation', order: 8, content: `Image Segmentation

Image Segmentation assigns category labels to every pixel in images, providing dense predictions. Semantic segmentation classifies pixels into categories (road, building, sky). Instance segmentation distinguishes individual objects of the same class. Segmentation enables detailed scene understanding for autonomous driving, medical imaging, and satellite imagery analysis.

Segmentation is pixel-wise classification—each pixel gets a category label. Unlike detection providing bounding boxes, segmentation provides precise object boundaries. This detail matters for applications requiring exact shape information—surgical planning needs precise organ boundaries, autonomous vehicles need drivable area delineation.

Fully Convolutional Networks (FCN) pioneered semantic segmentation by replacing fully-connected layers with convolutions, enabling arbitrary input sizes. U-Net architecture uses encoder-decoder structure with skip connections, excelling at medical image segmentation. DeepLab uses atrous convolutions and CRFs for detailed segmentation.

Instance segmentation combines detection and segmentation—detect objects, then segment each. Mask R-CNN dominates instance segmentation. Panoptic segmentation unifies semantic and instance segmentation, assigning instance IDs to countable objects and classes to background.

Understanding segmentation enables applications requiring precise spatial understanding—medical diagnosis (tumor delineation), robotics (obstacle boundaries), agriculture (crop disease detection). Segmentation provides the most detailed visual understanding.` },
          { title: 'Face Recognition', slug: 'aiml-face-recognition', order: 9, content: `Face Recognition

Face Recognition identifies or verifies individuals from facial images. It powers smartphone unlocking, photo tagging, security systems, and access control. Face recognition combines detection (find faces), alignment (normalize pose), and recognition (identify individuals). Modern systems achieve superhuman accuracy under controlled conditions.

Face detection localizes faces in images using specialized detectors (Haar cascades, MTCNN, RetinaFace). Landmark detection identifies facial keypoints (eyes, nose, mouth), enabling alignment to canonical poses. This preprocessing normalizes variations in pose, scale, and lighting.

Face recognition uses deep learning to extract facial features (embeddings). Siamese networks trained with triplet loss learn embeddings where same-person faces are close, different-person faces are distant. Verification compares embedding similarity; identification finds nearest neighbor in database.

Challenges include handling pose variation, lighting changes, aging, occlusions (masks, glasses), and demographic fairness. Modern datasets (VGGFace, MS-Celeb) contain millions of faces, enabling robust models. Privacy concerns and bias issues require careful deployment consideration.

Understanding face recognition enables building identity verification systems. While powerful, face recognition raises ethical questions about surveillance, consent, and bias that must inform deployment decisions.` },
          { title: 'Pose Estimation', slug: 'aiml-pose-estimation', order: 10, content: `Pose Estimation

Pose Estimation detects positions of body joints and limbs in images or videos, creating skeletal representations of human poses. Applications include fitness apps (form correction), gaming (motion capture), sports analytics (performance analysis), and healthcare (gait analysis). Pose estimation enables machines to understand human body language and movement.

2D pose estimation locates body keypoints (joints) in image coordinates—shoulders, elbows, wrists, hips, knees, ankles. 3D pose estimation adds depth, reconstructing poses in 3D space. Multi-person pose estimation handles multiple people simultaneously, requiring instance distinction.

Top-down approaches detect people first, then estimate poses individually. Bottom-up approaches detect all keypoints, then associate them into individuals. OpenPose and MediaPipe are popular frameworks providing real-time multi-person pose estimation. Modern approaches use CNNs predicting heatmaps for joint locations.

Challenges include occlusions (body parts hidden), clothing variations, diverse body types, and complex poses. Temporal smoothing across video frames improves consistency. 3D pose from single images requires resolving depth ambiguity.

Understanding pose estimation enables building interactive fitness applications, AR filters, sign language recognition, and behavioral analysis systems. Pose estimation bridges visual perception and understanding of human motion.` },
          { title: 'Image Augmentation', slug: 'aiml-image-augmentation', order: 11, content: `Image Augmentation

Image Augmentation artificially expands training datasets by applying transformations to existing images—flips, rotations, crops, color adjustments. Augmentation prevents overfitting, improves generalization, and reduces annotation costs. It's essential for training robust computer vision models with limited data.

Basic augmentations include random crops (varying viewpoints), horizontal flips (mirror symmetry), rotations (orientation invariance), and scaling (size variations). These geometric transformations simulate diverse imaging conditions without collecting new data.

Color augmentations modify brightness, contrast, saturation, and hue, simulating lighting variations. Cutout randomly masks image patches, forcing models to use partial information. Mixup blends image pairs, creating synthetic training examples. AutoAugment searches for optimal augmentation policies automatically.

Augmentation balances realism and diversity—vertical flips may not make sense for natural images (cars don't appear upside-down). Task-specific augmentations reflect real variations—medical images need intensity variations, satellite images need seasonal changes.

Understanding augmentation enables training high-performance models with limited labeled data. It's the most cost-effective way to improve model robustness and generalization. Effective augmentation strategies are as important as model architecture choices.` },
          { title: 'Vision Transformers', slug: 'aiml-vision-transformers', order: 12, content: `Vision Transformers

Vision Transformers (ViT) apply transformer architecture to computer vision, treating images as sequences of patches. Unlike CNNs using convolutions, ViTs use self-attention over patches. ViT matched or exceeded CNN performance on ImageNet, suggesting transformers might replace convolutions for vision.

ViT splits images into fixed-size patches (typically 16x16), linearly embeds patches, adds positional encodings, and feeds sequences through transformer encoders. The [CLS] token's representation serves as image embedding for classification. This approach processes images analogously to BERT processing text.

ViTs require massive datasets (ImageNet-21k, JFT-300M) to compete with CNNs—transformers lack convolutional inductive biases like translation invariance. But at sufficient scale, ViTs learn these properties from data, ultimately surpassing CNNs. Hybrid approaches (early convolutions + later transformers) combine both benefits.

Variants include DeiT (data-efficient training), Swin Transformer (hierarchical structure), and BEiT (BERT-style pre-training). Vision-language models (CLIP, ALIGN) jointly train vision transformers with language, enabling zero-shot classification and image-text understanding.

Understanding Vision Transformers reveals how transformers expanded beyond NLP. While CNNs remain efficient for many tasks, ViTs represent the frontier of vision research, especially for large-scale pre-training and vision-language tasks.` }
        ]
      }
    }
  });
  console.log('✅ Computer Vision: 12 topics');

  // ==========================================================================
  // BATCH 6: LLM → Agentic AI
  // ==========================================================================
  console.log('\n📦 BATCH 6: LLM → Agentic AI');

  // 18. LARGE LANGUAGE MODELS
  await prisma.learnCategory.create({
    data: {
      title: 'Large Language Models',
      order: 18,
      domainId: domain.id,
      topics: {
        create: [
          { title: 'LLM Introduction', slug: 'aiml-llm-introduction', order: 1, content: `LLM Introduction

Large Language Models are neural networks trained on massive text datasets to understand and generate human language. With billions of parameters, LLMs like GPT-4, Claude, and Gemini achieve unprecedented language capabilities—text generation, translation, summarization, reasoning, and coding. LLMs represent a paradigm shift in AI, enabling general-purpose language understanding.

LLMs use transformer architecture, scaling to hundreds of billions of parameters trained on trillions of tokens. This massive scale enables emergent capabilities—abilities not explicitly programmed but arising from scale. Few-shot learning allows LLMs to perform new tasks from examples without fine-tuning.

LLMs are pre-trained on diverse internet text through self-supervised learning—predicting next tokens. This pre-training captures grammar, facts, reasoning patterns, and world knowledge. Instruction tuning and RLHF (Reinforcement Learning from Human Feedback) align LLMs with human preferences.

Applications span chatbots (ChatGPT), coding assistants (GitHub Copilot), content creation, customer support, research assistance, and task automation. LLMs democratize AI—natural language interfaces eliminate programming barriers.

Understanding LLMs enables leveraging them via APIs, fine-tuning for specific domains, and building LLM-powered applications. LLMs are foundational to modern AI, with capabilities continually expanding as models scale.` },
          { title: 'Transformer Architecture', slug: 'aiml-transformer-architecture', order: 2, content: `Transformer Architecture

Transformers are neural network architectures using self-attention mechanisms to process sequences in parallel. Introduced in "Attention Is All You Need" (2017), transformers revolutionized NLP by enabling efficient training on massive datasets. All modern LLMs—GPT, BERT, T5—use transformer architecture.

Transformers replace recurrence with attention, computing relationships between all sequence positions simultaneously. This parallelization dramatically speeds training compared to RNNs. Self-attention captures long-range dependencies without vanishing gradients.

Key components: multi-head self-attention (captures different relationship types), feedforward networks (process representations), layer normalization (stabilizes training), and positional encoding (injects position information). Encoder-decoder structure or decoder-only variants handle different tasks.

Transformers scale exceptionally well—increasing parameters, data, and compute consistently improves performance. This scaling law enabled LLMs' emergence. GPT uses decoder-only transformers for generation, BERT uses encoder-only for understanding, T5 uses full encoder-decoder.

Understanding transformer architecture explains why LLMs work—attention mechanisms enable modeling complex language patterns, parallelization enables massive scale, and architecture choices determine model capabilities. Transformers transformed AI beyond NLP, now dominating vision and multimodal domains.` },
          { title: 'BERT', slug: 'aiml-bert', order: 3, content: `BERT

BERT (Bidirectional Encoder Representations from Transformers) is a pre-trained language model that reads text bidirectionally, understanding context from both directions. Released by Google (2018), BERT revolutionized NLP by providing powerful pre-trained representations for downstream tasks through fine-tuning.

BERT uses transformer encoders trained on masked language modeling—randomly mask input tokens, predict masked words from bidirectional context. This differs from GPT's left-to-right prediction. Next Sentence Prediction pre-training task teaches sentence relationships.

BERT's bidirectional understanding excels at tasks requiring deep comprehension—question answering, named entity recognition, sentiment analysis, text classification. Fine-tuning BERT on task-specific data achieves state-of-the-art results with moderate labeled data.

Variants include RoBERTa (optimized training), ALBERT (parameter reduction), DistilBERT (faster, smaller), and domain-specific versions (BioBERT, SciBERT). BERT-style models remain competitive for understanding tasks despite GPT's generative dominance.

Understanding BERT reveals how pre-training and fine-tuning enable transfer learning in NLP. BERT's bidirectional approach provides powerful semantic understanding, complementing GPT's generative capabilities. BERT remains essential for classification and extraction tasks.` },
          { title: 'GPT Models', slug: 'aiml-gpt-models', order: 4, content: `GPT Models

GPT (Generative Pre-trained Transformer) models are autoregressive language models that generate text by predicting next tokens. GPT-3, GPT-3.5, and GPT-4 demonstrate unprecedented language capabilities through massive scale. GPT models power ChatGPT, enabling natural conversations and complex task completion.

GPT uses decoder-only transformers trained on next-token prediction—given previous tokens, predict the next. This simple objective, combined with massive scale (175B parameters for GPT-3, more for GPT-4), enables emergent capabilities. GPT models generate coherent, contextually appropriate text.

GPT evolution: GPT-1 (117M parameters, proof of concept), GPT-2 (1.5B, coherent multi-paragraph generation), GPT-3 (175B, few-shot learning), GPT-3.5 (instruction tuning, chat capabilities), GPT-4 (multimodal, improved reasoning). Each generation dramatically improves capabilities.

GPT models excel at generation tasks—creative writing, code generation, summarization, translation, conversational AI. Few-shot prompting enables task performance without fine-tuning. API access via OpenAI democratizes advanced AI capabilities.

Understanding GPT models reveals how autoregressive generation and massive scale create general-purpose language intelligence. GPT represents the current frontier of language AI, with capabilities continually expanding.` },
          { title: 'Fine-tuning LLMs', slug: 'aiml-fine-tuning-llms', order: 5, content: `Fine-tuning LLMs

Fine-tuning adapts pre-trained LLMs to specific tasks or domains by continuing training on specialized datasets. This customization improves performance on target tasks while retaining general language capabilities. Fine-tuning enables leveraging massive pre-training investments for specific applications.

Full fine-tuning updates all model parameters on task-specific data. Parameter-efficient fine-tuning (PEFT) methods like LoRA (Low-Rank Adaptation) update small adapter modules, reducing computational requirements dramatically. PEFT enables fine-tuning large models on consumer GPUs.

Fine-tuning approaches: supervised fine-tuning (labeled task data), instruction tuning (diverse instruction-response pairs), and RLHF (reinforcement learning from human feedback). Each approach serves different goals—task specialization, instruction following, or alignment.

Applications include domain-specific chatbots (medical, legal), custom coding assistants, branded content generation, and specialized task solvers. Fine-tuned models outperform general LLMs on specific domains while maintaining broader capabilities.

Understanding fine-tuning enables customizing LLMs for business needs. Platforms like OpenAI Fine-tuning API, Hugging Face, and Azure OpenAI provide accessible fine-tuning infrastructure. Fine-tuning bridges general AI and specialized applications.` },
          { title: 'Prompt Engineering for LLMs', slug: 'aiml-prompt-engineering-llms', order: 6, content: `Prompt Engineering for LLMs

Prompt engineering designs inputs to elicit desired LLM outputs without changing model parameters. Well-crafted prompts dramatically improve response quality, accuracy, and task performance. Prompt engineering maximizes LLM utility across applications.

Techniques include few-shot learning (providing examples), chain-of-thought (explicit reasoning steps), role-playing (assigning personas), and structured templates. System messages set behavior, user messages provide input, and assistant messages guide responses.

Advanced strategies: ReAct (Reasoning + Acting), self-consistency (multiple reasoning paths), tree-of-thoughts (exploring solution spaces), and meta-prompting (prompts generating prompts). Each technique addresses specific task requirements.

Prompt optimization involves iterative refinement, A/B testing, and understanding model capabilities. Clear instructions, context provision, format specification, and constraint setting improve outputs. Temperature, top-p, and other parameters control generation randomness.

Mastering prompt engineering maximizes LLM value without expensive fine-tuning. Prompt engineering skills enable effective LLM utilization across domains—coding, writing, analysis, and task automation. Prompting remains core to LLM application development.` },
          { title: 'LLM APIs', slug: 'aiml-llm-apis', order: 7, content: `LLM APIs

LLM APIs provide programmatic access to powerful language models through HTTP endpoints. OpenAI, Anthropic, Google, and others offer APIs eliminating infrastructure management. LLM APIs democratize advanced AI, enabling developers to integrate language capabilities into applications easily.

APIs provide endpoints for text completion, chat conversations, embeddings generation, and fine-tuning. REST APIs accept JSON requests with prompts, parameters (temperature, max tokens, stop sequences), and return generated text. Chat APIs maintain conversational context through message arrays.

Key considerations: cost management (token-based pricing), rate limiting, latency optimization, error handling, and response streaming. API providers offer different models (GPT-4, Claude, Gemini) with varying capabilities, speeds, and costs. Model selection balances performance and economics.

Applications span chatbots, content generation, code assistants, data extraction, summarization, and translation. SDKs in Python, JavaScript, and other languages simplify integration. Environment variables manage API keys securely.

Understanding LLM APIs enables building AI-powered applications rapidly. API-based development focuses on prompt engineering and application logic rather than model training. LLM APIs lower barriers to AI application development, driving widespread adoption.` },
          { title: 'Hugging Face', slug: 'aiml-hugging-face', order: 8, content: `Hugging Face

Hugging Face is the leading platform for sharing and deploying NLP and ML models. The Transformers library provides unified interfaces to thousands of pre-trained models (GPT, BERT, T5, etc.). Hugging Face democratizes AI through open-source tools and collaborative model sharing.

The Transformers library simplifies loading models, tokenizers, and running inference. Pipelines abstract common tasks—text-generation, sentiment-analysis, question-answering—into single function calls. AutoModel classes automatically select appropriate model architectures.

Hugging Face Hub hosts models, datasets, and Spaces (interactive demos). Model cards document capabilities, training data, and limitations. Inference API enables testing models without local infrastructure. Hub collaboration features support team-based model development.

Integrations span PyTorch, TensorFlow, JAX, and deployment platforms. Accelerate library optimizes multi-GPU training, PEFT supports parameter-efficient fine-tuning, and Optimum provides hardware-specific optimization. Enterprise solutions offer private model hosting.

Mastering Hugging Face enables leveraging state-of-the-art models efficiently. The ecosystem provides end-to-end ML workflows from experimentation to production deployment. Hugging Face remains central to modern NLP and LLM development.` },
          { title: 'LangChain', slug: 'aiml-langchain', order: 9, content: generateContent('LangChain Framework', 'Large Language Models') },
          { title: 'Token Management', slug: 'aiml-token-management', order: 10, content: `Token Management

Tokens are text units LLMs process—roughly 4 characters or 0.75 words in English. Token limits constrain input + output length (4K-128K+ depending on model). Token-based pricing and context windows make token management critical for LLM applications.

Tokenization converts text into token sequences using model-specific algorithms (BPE, WordPiece). Different models use different tokenizers with varying token counts for identical text. Token counting libraries (tiktoken) help estimate costs and manage limits.

Strategies include prompt compression (removing unnecessary words), smart context selection (prioritizing relevant information), message summarization (condensing conversation history), and streaming (processing tokens as generated). Truncation strategies preserve important content.

Context window management involves sliding windows (removing old messages), summarization chains (condensing history), and retrieval (fetching only relevant context). Cost optimization balances model capability (GPT-4 vs GPT-3.5) with token prices.

Understanding token management prevents runtime errors, controls costs, and optimizes application performance. Efficient token usage enables longer conversations, larger documents, and more economical applications. Token awareness is fundamental to production LLM systems.` },
          { title: 'Context Window Optimization', slug: 'aiml-context-window-optimization', order: 11, content: `Context Window Optimization

Context windows limit the total tokens LLMs process—input and output combined. Window sizes range from 4K (older models) to 128K+ (Claude, GPT-4 Turbo). Optimizing context usage enables handling longer documents, extended conversations, and complex tasks within constraints.

Techniques include relevance-based selection (embedding similarity), recency weighting (prioritizing recent messages), summarization (condensing history), and chunking (processing documents in sections). Retrieval-augmented approaches fetch only relevant context.

Sliding windows maintain fixed-size context by removing oldest messages. Summary buffers periodically condense history. Hierarchical approaches create multi-level summaries. Vector search identifies relevant context from large knowledge bases.

Long-context models (Claude 100K, GPT-4 32K) enable processing entire books but cost more. Balancing context size with costs and latency optimizes applications. Lost-in-the-middle effect—models attend better to context beginning/end—affects context positioning strategies.

Mastering context optimization enables building applications handling extended interactions and large documents. Efficient context management balances capability, cost, and performance. Context optimization separates prototype from production-grade LLM applications.` },
          { title: 'LLM Evaluation', slug: 'aiml-llm-evaluation', order: 12, content: `LLM Evaluation

LLM evaluation assesses model performance, quality, and safety across tasks. Unlike traditional ML with clear metrics, LLM evaluation requires nuanced approaches—human judgment, model-based evaluation, and specialized benchmarks. Rigorous evaluation ensures LLM applications meet quality standards.

Approaches include human evaluation (experts rating outputs), automated metrics (BLEU, ROUGE for specific tasks), LLM-as-judge (using strong models to evaluate outputs), and benchmark datasets (MMLU, HumanEval, TruthfulQA). Each approach measures different capability aspects.

Evaluation dimensions: factual accuracy (truthfulness), coherence (logical consistency), helpfulness (user satisfaction), safety (avoiding harmful outputs), and task performance (problem-solving ability). Multi-dimensional evaluation provides comprehensive quality assessment.

Evaluation frameworks like HELM, LangSmith, and custom test suites enable systematic testing. A/B testing compares prompts or models. Regression testing prevents quality degradation. Continuous evaluation monitors production performance.

Mastering LLM evaluation enables data-driven optimization. Evaluation guides prompt engineering, model selection, fine-tuning, and safety measures. Robust evaluation frameworks are essential for responsible LLM deployment.` }
        ]
      }
    }
  });
  console.log('✅ Large Language Models: 12 topics');

  // 19. GENERATIVE AI
  await prisma.learnCategory.create({
    data: {
      title: 'Generative AI',
      order: 19,
      domainId: domain.id,
      topics: {
        create: [
          { title: 'Generative AI Introduction', slug: 'aiml-generative-ai-introduction', order: 1, content: `Generative AI Introduction

Generative AI creates new content—text, images, audio, video, code—rather than just analyzing existing data. Models learn data distributions to generate novel, realistic outputs. Generative AI represents a paradigm shift from discriminative AI, enabling creative applications across industries.

Key architectures include GANs (Generative Adversarial Networks), VAEs (Variational Autoencoders), diffusion models, and transformers. Each architecture uses different approaches—adversarial training, latent space learning, iterative denoising, or sequence modeling—to generate high-quality outputs.

Applications span creative industries (art generation, music composition), content creation (writing, marketing), design (product prototypes, architecture), entertainment (game assets, special effects), and programming (code generation). Generative AI augments human creativity and productivity.

Recent breakthroughs—DALL-E, Stable Diffusion, Midjourney (images), GPT-4 (text), Whisper (audio), Runway (video)—demonstrate unprecedented capabilities. Generative AI democratizes content creation, enabling anyone to produce professional-quality outputs.

Understanding generative AI fundamentals enables leveraging these powerful tools. Generative AI represents a technological inflection point, transforming creative work and expanding AI's societal impact dramatically.` },
          { title: 'Diffusion Models', slug: 'aiml-diffusion-models', order: 2, content: `Diffusion Models

Diffusion models generate images by iteratively denoising random noise. They learn to reverse a gradual noising process, transforming pure noise into coherent images. Diffusion models power modern image generation, achieving photorealistic quality and fine-grained control.

The process involves two phases: forward diffusion (gradually adding noise to images until pure noise) and reverse diffusion (learning to denoise, trained to predict and remove noise at each step). Neural networks learn the denoising process, enabling generation from random noise.

Key innovations: DDPM (Denoising Diffusion Probabilistic Models), score-based models, and latent diffusion (operating in compressed latent space for efficiency). Conditioning on text, images, or other inputs enables controlled generation.

Diffusion models surpass GANs in image quality and training stability. They enable applications like text-to-image (Stable Diffusion, DALL-E 2), image editing, inpainting, super-resolution, and style transfer. Classifier-free guidance improves adherence to text prompts.

Understanding diffusion models explains how modern image generators work. The iterative refinement process enables high-quality generation with controllability. Diffusion models represent the current state-of-the-art in image generation.` },
          { title: 'Stable Diffusion', slug: 'aiml-stable-diffusion', order: 3, content: `Stable Diffusion

Stable Diffusion is an open-source latent diffusion model generating high-quality images from text prompts. Released by Stability AI, it runs on consumer GPUs, democratizing image generation. Stable Diffusion's openness sparked an ecosystem of tools, fine-tuned models, and applications.

Latent diffusion operates on compressed image representations rather than raw pixels, dramatically reducing computational requirements. VAE encoder compresses images to latent space, diffusion process generates in latent space, VAE decoder reconstructs full images. This efficiency enables local deployment.

Key features: text-to-image generation, image-to-image transformation, inpainting (filling masked regions), outpainting (extending images), controlnet (precise control), and LoRA (efficient fine-tuning). Various checkpoints specialize in styles (realistic, anime, artistic).

Community contributions include thousands of custom models, embedding libraries (Textual Inversion), UI frontends (AUTOMATIC1111, ComfyUI), and integration platforms. Model fine-tuning, merging, and sharing drive continuous innovation.

Mastering Stable Diffusion enables creating custom image generation solutions. Local deployment ensures privacy and control. Stable Diffusion exemplifies how open-source AI empowers developers and creators.` },
          { title: 'DALL-E', slug: 'aiml-dalle', order: 4, content: `DALL-E

DALL-E is OpenAI's text-to-image model generating creative, high-quality images from natural language descriptions. DALL-E 2 and 3 demonstrate unprecedented understanding of prompts, generating photorealistic images, artistic creations, and imaginative concepts. DALL-E pioneered mainstream text-to-image generation.

DALL-E combines CLIP (understanding text-image relationships) with diffusion models. Text prompts encode to embeddings guiding image generation. The model understands complex concepts, compositions, styles, and even abstract ideas. DALL-E 3's improved prompt following reduces need for prompt engineering.

Capabilities include generating original images, editing existing images (inpainting, outpainting), creating variations, and maintaining consistent styles. Safety systems prevent generating harmful content. Commercial API access enables integration into applications.

Applications span marketing (ad creatives, product mockups), design (concept art, illustrations), education (visual aids), and content creation (blog images, social media). DALL-E democratizes visual content creation for non-artists.

Understanding DALL-E reveals how vision-language models enable creative AI applications. DALL-E's evolution demonstrates rapid progress in generative AI quality and accessibility. DALL-E represents the frontier of commercial text-to-image technology.` },
          { title: 'Midjourney', slug: 'aiml-midjourney', order: 5, content: `Midjourney

Midjourney is a leading AI art generation platform accessible through Discord. Known for artistic, aesthetically refined outputs, Midjourney excels at creating visually stunning images with painterly qualities. Midjourney's unique style and ease of use made it immensely popular among artists and creators.

Users interact via Discord bot commands, providing text prompts and parameters. Midjourney generates multiple variations, users upscale or create variants of preferred images. The iterative workflow encourages experimentation and refinement. Version upgrades (V5, V6) continuously improve quality and prompt adherence.

Key features: artistic style presets, aspect ratio control, stylization parameters, chaos settings (variation), and remix mode (iterative editing). Advanced parameters control image weight (reference images), negative prompts, and quality settings. Community showcase inspires and educates users.

Applications include concept art, character design, book illustrations, album covers, branding, and personal creative projects. Midjourney's aesthetic strengths make it preferred for artistic applications over photorealism.

Mastering Midjourney involves learning prompt crafting, parameter usage, and style references. The platform demonstrates how AI augments artistic creativity rather than replacing it. Midjourney represents the intersection of AI technology and human artistic vision.` },
          { title: 'Text-to-Image', slug: 'aiml-text-to-image', order: 6, content: `Text-to-Image

Text-to-image generation creates images from natural language descriptions. This technology enables anyone to create visual content without artistic skills. Text-to-image models understand concepts, compositions, styles, and relationships described in prompts.

Models combine language understanding (CLIP, T5 encoders) with image generation (diffusion models, GANs). Text embeddings condition the generation process, guiding models to create images matching descriptions. Training on billions of text-image pairs teaches these relationships.

Advanced techniques: negative prompts (excluding unwanted elements), prompt weighting (emphasizing parts), style references, and compositional control (ControlNet, pose guidance). Multi-stage generation enables refinement and detail enhancement.

Applications span advertising (product visualization), e-commerce (lifestyle images), education (custom illustrations), game development (concept art), and personal creative projects. Text-to-image democratizes visual content creation at scale.

Mastering text-to-image requires understanding prompt engineering—clear descriptions, style specifications, composition details, and iterative refinement. Text-to-image generation represents a fundamental shift in content creation, making visual expression accessible to all.` },
          { title: 'Image-to-Image', slug: 'aiml-image-to-image', order: 7, content: `Image-to-Image

Image-to-image translation transforms images from one domain to another while preserving structure. Applications include style transfer (photo to painting), enhancement (low-res to high-res), colorization, and guided editing. Image-to-image builds on existing images rather than generating from scratch.

Techniques include diffusion models with image conditioning, GANs (Pix2Pix, CycleGAN), and neural style transfer. Image encoders extract structural information, generation process applies transformations while maintaining content. Controls like strength parameters balance preservation and transformation.

Key capabilities: style transfer (artistic filters), super-resolution (upscaling), inpainting (object removal/addition), outpainting (extending images), and semantic editing (changing image properties). ControlNet enables precise structural control using edge maps, depth maps, and pose skeletons.

Applications include photo editing (professional retouching), design iteration (quick variations), restoration (old photo enhancement), and content adaptation (changing weather, time, season). Image-to-image accelerates creative workflows.

Mastering image-to-image enables efficient image manipulation and creative exploration. Understanding strength parameters, masking, and conditioning methods produces desired results. Image-to-image bridges human creativity with AI capabilities.` },
          { title: 'Text-to-Video', slug: 'aiml-text-to-video', order: 8, content: `Text-to-Video

Text-to-video generation creates videos from text descriptions, extending image generation to temporal dimension. Models generate coherent sequences maintaining consistency across frames. Text-to-video represents the frontier of generative AI, enabling video content creation from prompts.

Technologies include diffusion models extended to 3D (2D + time), temporal attention (frame consistency), and video transformers. Challenges include maintaining temporal coherence, computational cost (video data is massive), and realistic motion generation.

Leading platforms: Runway Gen-2 (short clips), Pika Labs (video editing), Stability AI's Stable Video Diffusion, and research systems like Make-A-Video, Imagen Video. Capabilities range from short clips to longer sequences with camera motion and object interaction.

Applications include marketing videos, social media content, animation, video prototyping, and educational content. Text-to-video dramatically reduces video production costs and time, democratizing video content creation.

Understanding text-to-video involves recognizing current limitations (short durations, occasional inconsistencies) while appreciating rapid progress. Text-to-video will transform content creation as technology matures. Early adoption positions creators for future capabilities.` },
          { title: 'Audio Generation', slug: 'aiml-audio-generation', order: 9, content: `Audio Generation

Audio generation creates realistic sounds, speech, and audio effects from descriptions or data. AI audio models generate human voices, sound effects, ambient sounds, and voiceovers. Audio generation transforms podcasting, game development, accessibility, and content creation.

Technologies include neural vocoders (WaveNet), diffusion models (AudioLDM), and transformer-based systems. Text-to-speech (TTS) models generate natural-sounding voices from text. Voice cloning replicates specific voices from small samples. Sound effect generation creates custom audio from descriptions.

Leading systems: ElevenLabs (voice synthesis), Bark (text-to-audio), AudioLDM (text-to-sound), and Whisper (speech recognition paired with generation). Multi-speaker TTS enables conversational content. Emotion control adds expressiveness.

Applications include audiobook narration, video voiceovers, podcast production, game sound effects, accessibility (text-to-speech for visually impaired), and language learning. Audio generation democratizes voice content creation.

Mastering audio generation involves understanding voice characteristics, prosody control, and quality trade-offs. Audio generation complements visual generative AI, enabling comprehensive multimedia content creation from AI.` },
          { title: 'Music Generation', slug: 'aiml-music-generation', order: 10, content: `Music Generation

Music generation creates original compositions, melodies, and accompaniments using AI. Models learn musical patterns, structures, and styles to generate new pieces. Music generation assists composers, enables personalized soundtracks, and democratizes music creation.

Technologies include RNNs for sequence modeling, transformers (Music Transformer), and diffusion models (Riffusion). Models train on MIDI data, audio files, or symbolic representations. Controllable generation enables specifying style, mood, instrumentation, and structure.

Leading platforms: OpenAI Jukebox (raw audio generation), Google Magenta (creative music tools), Stability AI's Dance Diffusion, and commercial services like AIVA, Soundraw. Capabilities range from melody generation to full arrangement.

Applications include background music for videos, game soundtracks, personalized playlists, composition assistance, and music education (generating practice exercises). Music generation augments human creativity rather than replacing musicians.

Understanding music generation involves recognizing AI's strengths (pattern generation, variation) and limitations (emotional depth, cultural context). Music AI serves as creative tool and inspiration source. Music generation represents AI expanding into creative domains.` },
          { title: 'Code Generation', slug: 'aiml-code-generation', order: 11, content: `Code Generation

Code generation creates functional code from natural language descriptions or partial implementations. LLMs trained on vast code repositories generate code across programming languages. Code generation dramatically accelerates software development and lowers programming barriers.

Leading systems: GitHub Copilot (powered by OpenAI Codex), ChatGPT with code capabilities, Amazon CodeWhisperer, and Google Bard. These tools provide inline suggestions, complete functions, generate entire modules, explain code, and debug issues.

Capabilities include autocomplete (next lines), function implementation (from docstrings/comments), test generation, code translation (language conversion), refactoring suggestions, and documentation generation. Context-aware generation understands project structure and coding patterns.

Applications span rapid prototyping, boilerplate generation, learning new frameworks, debugging assistance, and API integration. Code generation particularly helps with repetitive tasks, unfamiliar languages, and standard algorithms. Developers maintain oversight and refine outputs.

Mastering code generation involves effective prompting, code review skills, and understanding limitations (complex business logic, security considerations). Code generation represents a paradigm shift in software development, augmenting developers' capabilities significantly.` },
          { title: 'Multimodal Models', slug: 'aiml-multimodal-models', order: 12, content: `Multimodal Models

Multimodal models process and generate multiple data types—text, images, audio, video—within unified architectures. Unlike single-modality models, multimodal AI understands relationships across modalities. Multimodal models represent the future of AI, enabling more natural human-computer interaction.

Architectures combine modality-specific encoders (vision transformers, text transformers) with cross-attention mechanisms learning inter-modal relationships. CLIP aligns images and text in shared embedding space. GPT-4V (Vision) processes images and text jointly. Gemini processes text, images, audio, and video.

Capabilities include image captioning, visual question answering, text-to-image generation, audio-visual learning, and video understanding. Multimodal models excel at tasks requiring understanding across senses—describing images, answering questions about videos, and generating coordinated outputs.

Applications span accessibility (image descriptions for blind users), content moderation (understanding context), education (richer learning experiences), robotics (understanding environments), and creative tools (coordinated multimedia generation).

Understanding multimodal AI reveals the path toward artificial general intelligence—systems comprehending the world as humans do, across multiple senses. Multimodal models dramatically expand AI's applicability and effectiveness.` }
        ]
      }
    }
  });
  console.log('✅ Generative AI: 12 topics');

  // 20. RAG
  await prisma.learnCategory.create({
    data: {
      title: 'RAG',
      order: 20,
      domainId: domain.id,
      topics: {
        create: [
          { title: 'RAG Introduction', slug: 'aiml-rag-introduction', order: 1, content: `RAG Introduction

Retrieval-Augmented Generation combines LLMs with external knowledge retrieval. RAG fetches relevant documents from knowledge bases, providing them as context to LLMs for grounded, accurate responses. RAG solves LLMs' limitations—outdated training data, hallucinations, and lack of domain-specific knowledge.

RAG workflow: user query embeddings identify relevant documents from vector databases, retrieved documents augment LLM prompts, LLM generates responses grounded in provided context. This retrieval-generation pipeline ensures factual accuracy and enables working with current, private, or specialized information.

Advantages over pure LLMs: access to updated information (no retraining needed), reduced hallucinations (answers grounded in sources), domain expertise (specialized knowledge bases), cost efficiency (retrieval cheaper than massive models), and transparency (source attribution).

Applications include enterprise knowledge management, customer support (accessing documentation), research assistants, legal research, medical information systems, and chatbots with current information. RAG is fundamental to production LLM applications requiring accuracy.

Understanding RAG architecture enables building reliable, trustworthy AI systems. RAG represents best practices for enterprise LLM deployment, balancing model capabilities with factual grounding and knowledge specificity.` },
          { title: 'Vector Databases', slug: 'aiml-vector-databases', order: 2, content: `Vector Databases

Vector databases store and retrieve high-dimensional vector embeddings efficiently. Unlike traditional databases querying exact matches, vector databases perform similarity search—finding nearest neighbors in embedding space. Vector databases are essential infrastructure for RAG, recommendation systems, and semantic search.

Vector databases optimize for approximate nearest neighbor (ANN) search using indexing algorithms (HNSW, IVF, PQ). These algorithms trade perfect accuracy for massive speed improvements, enabling millisecond searches across millions of vectors. Specialized data structures handle high-dimensional spaces efficiently.

Key features: similarity metrics (cosine, Euclidean, dot product), metadata filtering (combining vector search with attribute filtering), hybrid search (keyword + semantic), and scalability (handling billions of vectors). CRUD operations manage vector collections.

Leading solutions: Pinecone (managed service), Weaviate (open-source), Qdrant (performance-focused), Chroma (developer-friendly), Milvus (scalable), and pgvector (PostgreSQL extension). Each offers different trade-offs in performance, features, and deployment options.

Mastering vector databases enables building scalable RAG systems. Vector search revolutionizes information retrieval, enabling semantic understanding beyond keyword matching. Vector databases are foundational to modern AI applications.` },
          { title: 'Embeddings', slug: 'aiml-embeddings', order: 3, content: `Embeddings

Embeddings represent text, images, or other data as fixed-size numerical vectors capturing semantic meaning. Similar content produces similar embeddings in vector space. Embeddings enable semantic search, clustering, classification, and recommendation systems.

Embedding models train to position semantically similar items close in vector space. Text embeddings (OpenAI text-embedding-ada-002, Sentence Transformers) encode sentences to vectors. Multimodal embeddings (CLIP) align text and images in shared space. Dimensionality typically ranges from 384 to 3072 dimensions.

Similarity measures: cosine similarity (angle between vectors), Euclidean distance (straight-line distance), and dot product (magnitude and direction). Cosine similarity most commonly used for normalized embeddings, providing intuitive 0-1 similarity scores.

Applications span semantic search (finding relevant documents), clustering (grouping similar content), recommendation (finding similar items), anomaly detection (identifying outliers), and zero-shot classification (matching descriptions). RAG systems fundamentally rely on embeddings for retrieval.

Mastering embeddings involves selecting appropriate models, understanding distance metrics, and optimizing embedding generation. Embeddings transform unstructured data into machine-readable format, enabling semantic AI applications across domains.` },
          { title: 'Semantic Search', slug: 'aiml-semantic-search', order: 4, content: `Semantic Search

Semantic search retrieves information based on meaning rather than keyword matching. Unlike traditional search (exact words), semantic search understands intent and context, finding relevant results even with different wording. Semantic search revolutionizes information retrieval accuracy.

Semantic search embeds queries and documents into vector space, retrieving documents with highest similarity to query embeddings. This approach captures synonyms, paraphrases, and conceptual relationships keyword search misses. Neural retrieval models outperform traditional BM25 and TF-IDF.

Advanced techniques: hybrid search (combining semantic and keyword search), reranking (refining results with cross-encoders), query expansion (reformulating queries), and multi-vector representations (capturing multiple aspects). Context-aware retrieval considers conversation history.

Applications include enterprise search (finding relevant documents), e-commerce (product discovery), customer support (knowledge base search), legal research (case law), and academic research (literature discovery). Semantic search dramatically improves user experience.

Mastering semantic search involves embedding selection, hybrid search strategies, and result quality optimization. Semantic search represents fundamental improvement over keyword-based approaches, enabling natural language information access.` },
          { title: 'Document Chunking', slug: 'aiml-document-chunking', order: 5, content: `Document Chunking

Document chunking splits large documents into smaller segments for embedding and retrieval. Effective chunking balances information completeness with retrieval precision. Poor chunking leads to incomplete context or irrelevant retrievals, directly impacting RAG quality.

Chunking strategies include fixed-size (character or token count), sentence-based (semantic boundaries), paragraph-based (logical units), and recursive (hierarchical splitting). Overlap between chunks prevents information loss at boundaries. Chunk size typically ranges from 200-1000 tokens.

Advanced techniques: semantic chunking (splitting at topic boundaries), agentic chunking (LLM-determined splits), and metadata preservation (maintaining document structure, headings, page numbers). Chunk size affects retrieval granularity and context completeness.

Considerations include embedding model context limits, retrieval relevance (smaller chunks more precise, larger chunks more complete), and computational efficiency. Different document types (code, PDFs, markdown) require specialized chunking strategies.

Mastering document chunking optimizes RAG system performance. Proper chunking ensures relevant information retrieval while maintaining context coherence. Chunking strategy significantly impacts answer quality and user experience.` },
          { title: 'Retrieval Strategies', slug: 'aiml-retrieval-strategies', order: 6, content: `Retrieval Strategies

Retrieval strategies determine how relevant documents are selected from knowledge bases. Effective retrieval balances relevance, diversity, and computational efficiency. Advanced retrieval strategies dramatically improve RAG answer quality.

Basic approaches: top-k similarity search (retrieve k most similar chunks), similarity threshold filtering (minimum similarity scores), and MMR (Maximal Marginal Relevance, balancing relevance with diversity). Hybrid retrieval combines semantic and keyword search strengths.

Advanced techniques: contextual compression (LLM-based compression of retrieved chunks), parent document retrieval (retrieve small chunks, return large parent documents), hypothetical document embeddings (HyDE, embed generated answers), and multi-query retrieval (retrieving for multiple query reformulations).

Reranking improves results by using cross-encoders (computing query-document interaction scores) for final ordering. Two-stage retrieval (fast first-stage, accurate second-stage) optimizes speed-quality trade-offs. Query understanding enhances retrieval through intent classification.

Mastering retrieval strategies enables building high-quality RAG systems. Retrieval directly determines available context, making it critical for answer quality. Advanced retrieval techniques separate basic from production-grade RAG implementations.` },
          { title: 'Pinecone', slug: 'aiml-pinecone', order: 7, content: `Pinecone

Pinecone is a fully managed vector database optimized for speed, scale, and simplicity. As a serverless solution, Pinecone eliminates infrastructure management while providing enterprise-grade performance. Pinecone is among the most popular vector databases for production RAG systems.

Key features: serverless architecture (auto-scaling), metadata filtering (hybrid search), namespaces (logical separation), sparse-dense hybrid search, and low-latency queries (single-digit millisecond). Indexes support billions of vectors with consistent performance.

API simplicity enables rapid integration—create indexes, upsert vectors, query similarity, and filter by metadata through simple SDK calls. Language SDKs (Python, JavaScript, etc.) provide idiomatic interfaces. Pinecone Console offers monitoring and management.

Use cases include semantic search, recommendation engines, RAG applications, personalization systems, and duplicate detection. Pinecone's managed nature appeals to teams preferring operational simplicity over infrastructure control.

Mastering Pinecone involves index configuration, namespace organization, metadata schema design, and query optimization. Pinecone's pricing model (pod-based) requires understanding usage patterns. Pinecone represents the serverless approach to vector search infrastructure.` },
          { title: 'Weaviate', slug: 'aiml-weaviate', order: 8, content: `Weaviate

Weaviate is an open-source vector database with built-in vectorization and multi-modal capabilities. Offering both cloud and self-hosted deployment, Weaviate provides flexibility and feature richness. Weaviate's module system enables extensive customization.

Key features: automatic vectorization (built-in embedding models), GraphQL and REST APIs, hybrid search (BM25 + vector), generative search (integrated LLM queries), multi-tenancy, and replication. Modular architecture allows custom modules for specific needs.

Weaviate integrates vectorizers (OpenAI, Cohere, Hugging Face), LLMs (OpenAI, Cohere, custom models), and rerankers. Schema definition enables typed data with relationships. CRUD operations manage objects and vectors simultaneously.

Use cases span knowledge management, recommendation systems, semantic search engines, and RAG pipelines. Open-source nature enables deep customization and self-hosted deployments for data privacy requirements.

Mastering Weaviate involves schema design, module configuration, and query optimization. Self-hosting requires operational expertise but provides full control. Weaviate represents feature-rich, customizable vector search for complex requirements.` },
          { title: 'ChromaDB', slug: 'aiml-chromadb', order: 9, content: `ChromaDB

ChromaDB is a developer-friendly, open-source vector database emphasizing simplicity and speed. Designed for AI applications, ChromaDB provides intuitive APIs and minimal setup. ChromaDB excels for rapid prototyping and embedding-first workflows.

Key features: zero-configuration setup (pip install and start), Python/JavaScript SDKs, automatic embedding generation, metadata filtering, and persistence options (in-memory, disk, client-server). Collections organize vectors with associated metadata.

ChromaDB's API design prioritizes developer experience—add documents with automatic embedding, query by text (automatic query embedding), and filter by metadata through simple Python calls. Built-in distance metrics (L2, cosine, IP) support various similarity measures.

Use cases include RAG prototypes, local development, small-scale production applications, and experimentation. ChromaDB's lightweight nature enables quick iteration cycles. Deployment options range from embedded (same process) to client-server architectures.

Mastering ChromaDB involves collection management, embedding function configuration, and persistence strategies. ChromaDB's simplicity makes it ideal for learning vector databases and building RAG MVPs. ChromaDB demonstrates how developer experience drives adoption.` },
          { title: 'RAG Pipeline', slug: 'aiml-rag-pipeline', order: 10, content: `RAG Pipeline

RAG pipelines orchestrate the end-to-end flow from user query to generated response. A complete pipeline includes query processing, retrieval, context assembly, generation, and post-processing. Well-designed pipelines ensure reliable, high-quality RAG systems.

Pipeline stages: query understanding (intent classification, query reformulation), retrieval (semantic search, filtering, reranking), context preparation (chunk selection, ordering, compression), generation (prompted LLM with context), and response formatting (citation addition, verification).

Advanced features: query routing (directing queries to appropriate sources), fallback strategies (handling retrieval failures), confidence scoring, source attribution, fact verification, and streaming responses. Error handling ensures graceful degradation.

Frameworks like LangChain, LlamaIndex provide RAG pipeline abstractions—retrieval chains, query engines, and response synthesizers. Custom pipelines offer fine-grained control. Monitoring tracks retrieval quality, generation latency, and user satisfaction.

Mastering RAG pipelines involves balancing complexity, performance, and maintainability. Production pipelines require error handling, monitoring, and optimization. RAG pipeline design determines system reliability and user experience.` },
          { title: 'RAG Evaluation', slug: 'aiml-rag-evaluation', order: 11, content: `RAG Evaluation

RAG evaluation assesses both retrieval quality and generation quality. Unlike traditional ML metrics, RAG evaluation requires multidimensional assessment—relevance, faithfulness, completeness, and coherence. Rigorous evaluation ensures RAG systems meet quality standards.

Retrieval metrics: precision (retrieved chunks relevance), recall (important chunks retrieved), MRR (Mean Reciprocal Rank), and NDCG (Normalized Discounted Cumulative Gain). These metrics evaluate whether retrieval finds the right documents.

Generation metrics: faithfulness (answer grounded in context, no hallucinations), answer relevance (addressing the question), context utilization (effectively using retrieved information), and coherence (clarity, readability). LLM-as-judge methods automate quality assessment.

Evaluation frameworks: RAGAS (comprehensive RAG metrics), TruLens (evaluation and monitoring), or custom test suites with human evaluation. Ground truth datasets enable systematic testing. A/B testing compares pipeline variations.

Mastering RAG evaluation enables data-driven optimization. Evaluation identifies retrieval vs generation issues, guiding improvements. Continuous evaluation monitors production quality, preventing degradation.` },
          { title: 'Advanced RAG Techniques', slug: 'aiml-advanced-rag-techniques', order: 12, content: `Advanced RAG Techniques

Advanced RAG techniques address limitations of naive retrieval-generation pipelines. These methods improve retrieval quality, context utilization, and answer accuracy. Production RAG systems leverage multiple advanced techniques for robust performance.

Query enhancement: HyDE (Hypothetical Document Embeddings, embed generated hypothetical answers), multi-query (parallel retrieval with reformulated queries), step-back prompting (retrieving higher-level concepts), and query decomposition (breaking complex queries into sub-questions).

Retrieval improvements: contextual compression (LLM-compressed retrievals), parent document retrieval (small chunks for search, large chunks for context), ensemble retrieval (combining multiple retrievers), and agentic retrieval (iterative retrieval with reasoning).

Context optimization: reranking with cross-encoders, lost-in-the-middle mitigation (strategic context positioning), recursive summarization (multi-level context), and dynamic context windows (adaptive context based on query complexity).

Production patterns: caching (storing retrieval results), streaming responses (progressive generation), confidence thresholds (fallback triggers), and multi-stage pipelines (sequential refinement). Monitoring and logging enable continuous improvement.

Mastering advanced RAG techniques transforms basic systems into production-grade solutions. These techniques address specific failure modes, improving reliability and quality across diverse queries.` }
        ]
      }
    }
  });
  console.log('✅ RAG: 12 topics');

  // 21. AGENTIC AI
  await prisma.learnCategory.create({
    data: {
      title: 'Agentic AI',
      order: 21,
      domainId: domain.id,
      topics: {
        create: [
          { title: 'Agentic AI Introduction', slug: 'aiml-agentic-ai-introduction', order: 1, content: `Agentic AI Introduction

Agentic AI refers to autonomous systems that plan, reason, and take actions to achieve goals. Unlike reactive chatbots, agents iterate through reasoning-action cycles, using tools and adapting strategies. Agentic AI represents evolution from passive assistants to proactive problem-solvers.

Key characteristics: autonomy (self-directed behavior), tool use (invoking external capabilities), planning (multi-step strategies), reasoning (logical decision-making), and persistence (iterating until goal achievement). Agents bridge natural language interfaces with actionable capabilities.

Architectures combine LLMs (reasoning and planning), external tools (APIs, databases, search, calculators), memory (conversation and task history), and control loops (iterative execution). Frameworks like LangChain, AutoGPT, and CrewAI enable agent development.

Applications span research assistants (autonomous information gathering), task automation (email management, scheduling), analysis (data processing and reporting), and customer service (complex multi-step support). Agents handle tasks requiring multiple operations.

Understanding agentic AI fundamentals enables building autonomous systems. Agents represent the frontier of practical AI, transforming how humans delegate complex tasks to machines. Agentic AI is foundational to future AI applications.` },
          { title: 'AI Agents', slug: 'aiml-ai-agents', order: 2, content: `AI Agents

AI agents are autonomous systems that perceive environments, reason about goals, and take actions to achieve objectives. Agents combine language understanding, tool use, planning, and execution. AI agents transform LLMs from conversational interfaces to capable assistants.

Agent components: LLM (reasoning engine), tools (available actions), memory (context and history), and control flow (decision logic). Agents observe outputs, decide next actions, execute tools, and iterate until task completion. This observe-think-act loop enables complex task handling.

Agent types: conversational agents (dialogue-based assistance), task agents (specific goal completion), research agents (information gathering and analysis), and autonomous agents (minimal human intervention). Different designs suit different use cases.

Challenges include error handling (graceful failure), cost control (limiting iterations), reliability (consistent behavior), and safety (preventing harmful actions). Agent design balances autonomy with control.

Mastering AI agents involves tool definition, prompt engineering, control flow design, and evaluation. Agents dramatically expand LLM capabilities, enabling practical AI assistants. AI agents represent mainstream AI's near-term future.` },
          { title: 'Tool Use', slug: 'aiml-tool-use', order: 3, content: `Tool Use

Tool use enables AI agents to interact with external systems—APIs, databases, calculators, search engines, code interpreters. Tools extend LLM capabilities beyond text generation to actionable impacts. Tool use transforms language models into practical problem-solvers.

Tool definition specifies names, descriptions, parameters, and return types. LLMs receive tool documentation in prompts, deciding when and how to invoke tools. Tool results feed back into reasoning loops. Well-designed tool interfaces enable reliable agent behavior.

Common tools: search (web/document search), calculators (precise computations), code interpreters (executing programs), APIs (data retrieval/actions), databases (querying/updating), and file operations (reading/writing). Custom tools extend agent capabilities arbitrarily.

Frameworks handle tool orchestration—LangChain Tools, OpenAI Function Calling, Anthropic Tool Use. These systems manage tool invocation, result processing, and error handling. Tool use patterns vary by framework.

Mastering tool use involves designing tool interfaces, writing clear descriptions, handling errors, and validating outputs. Tool use separates basic chatbots from capable agents. Proper tool design is critical for agent reliability.` },
          { title: 'Function Calling', slug: 'aiml-function-calling', order: 4, content: `Function Calling

Function calling enables LLMs to invoke structured functions with typed parameters. Models output JSON specifying function names and arguments, applications execute functions and return results. Function calling provides reliable tool use with structured interfaces.

OpenAI, Anthropic, and other providers offer function calling APIs. Define functions with JSON schemas (name, description, parameters, types). Models analyze conversations, decide appropriate functions, and generate valid invocations. Multi-function calling handles parallel tool use.

Advantages over prompt-based tool use: structured outputs (parsed JSON vs. text parsing), type safety (validated parameters), reliability (consistent format), and composability (chaining function calls). Function calling reduces parsing errors.

Applications include conversational search (SQL query generation), API integration (structured API calls), task automation (multi-step workflows), and data extraction (structured information retrieval). Function calling enables building robust agent systems.

Mastering function calling involves schema design, parameter validation, error handling, and result interpretation. Function calling represents production-grade tool use, superior to prompt-based approaches. Function calling is standard for professional agent development.` },
          { title: 'ReAct Pattern', slug: 'aiml-react-pattern', order: 5, content: `ReAct Pattern

ReAct (Reasoning + Acting) is an agent design pattern interleaving thought (reasoning) and action steps. Agents explicitly articulate reasoning before acting, improving decision quality and transparency. ReAct represents a foundational pattern for reliable agent behavior.

ReAct loop: agent receives input, generates thought (analyzing situation), decides action (selecting tool), executes action, observes result, and repeats. Explicit reasoning steps enable debugging and understanding agent decisions. Thought steps improve action quality.

Prompt structure guides ReAct: instructions specify thought-action-observation format, examples demonstrate pattern, and output parsing extracts thoughts and actions. Frameworks like LangChain implement ReAct agents automatically.

Advantages: improved decision quality (explicit reasoning), transparency (observable thought process), debuggability (identifying failure points), and controllability (intervening in reasoning). ReAct outperforms act-only approaches.

Mastering ReAct involves prompt design, parsing outputs, limiting iterations (preventing infinite loops), and error recovery. ReAct represents best practices for agent development. Understanding ReAct enables building reliable autonomous systems.` },
          { title: 'Planning and Reasoning', slug: 'aiml-planning-reasoning', order: 6, content: `Planning and Reasoning

Planning and reasoning enable agents to decompose complex goals into actionable steps. Rather than reactive responses, agents strategize approaches, anticipate challenges, and adapt plans. Planning capabilities distinguish capable agents from simple responders.

Planning approaches: chain-of-thought (step-by-step reasoning), tree-of-thoughts (exploring alternative strategies), plan-and-execute (planning then execution), and hierarchical planning (breaking goals into subgoals). Each approach suits different task complexities.

Reasoning techniques: logical reasoning (deductive/inductive), causal reasoning (cause-effect relationships), analogical reasoning (pattern matching), and common-sense reasoning (world knowledge application). Strong reasoning improves decision quality.

Challenges include plan evaluation (assessing strategy quality), replanning (adapting to failures), uncertainty handling (incomplete information), and computational cost (reasoning overhead). Balancing planning depth with execution speed matters.

Mastering planning enables building agents tackling complex, multi-step tasks. Advanced planning separates toy demos from production systems. Planning and reasoning represent core intelligence in agentic AI systems.` },
          { title: 'Multi-Agent Systems', slug: 'aiml-multi-agent-systems', order: 7, content: `Multi-Agent Systems

Multi-agent systems coordinate multiple specialized agents to accomplish complex tasks. Rather than monolithic agents, specialized agents collaborate—researchers, writers, critics, executors. Multi-agent approaches enable sophisticated problem-solving through collaboration.

Architectures include hierarchical (manager-worker), sequential (assembly line), collaborative (peers working together), and competitive (multiple agents proposing solutions). Communication protocols enable agent coordination and information sharing.

Specialization benefits: focused expertise (agents excel at specific tasks), parallel execution (simultaneous work), modularity (swappable agents), and scalability (adding agents for capacity). Division of labor improves overall system capability.

Frameworks: CrewAI (role-based collaboration), AutoGen (conversational agents), LangGraph (workflow orchestration), and custom coordination systems. Each provides different collaboration patterns.

Mastering multi-agent systems involves agent design, communication protocols, coordination strategies, and conflict resolution. Multi-agent approaches suit complex problems beyond single-agent capabilities. Multi-agent systems represent advanced agentic AI architecture.` },
          { title: 'Agent Memory', slug: 'aiml-agent-memory', order: 8, content: `Agent Memory

Agent memory enables maintaining context, learning from interactions, and personalizing behavior. Memory types include short-term (current conversation), long-term (persistent knowledge), episodic (past interactions), and semantic (learned facts). Memory makes agents contextually aware and adaptive.

Implementation approaches: conversation buffers (recent messages), summary memory (condensed history), vector memory (semantic search over past interactions), and entity memory (tracking mentioned entities). Hybrid approaches combine multiple memory types.

Memory enables capabilities like personalization (remembering user preferences), learning (improving from feedback), consistency (maintaining context across sessions), and relationship building (tracking interaction history). Memory transforms stateless responders into persistent assistants.

Challenges include memory management (what to store/discard), retrieval efficiency (finding relevant memories), privacy (sensitive information handling), and cost (storage and retrieval expenses). Balance context richness with computational efficiency.

Mastering agent memory enables building persistent, contextually-aware assistants. Memory is critical for long-term agent interactions and personalization. Effective memory management separates basic from sophisticated agent systems.` },
          { title: 'AutoGPT', slug: 'aiml-autogpt', order: 9, content: `AutoGPT

AutoGPT is an experimental autonomous agent attempting goal-driven task completion with minimal human intervention. Users provide high-level goals, AutoGPT breaks them into subtasks, executes actions, and iterates toward completion. AutoGPT pioneered mainstream autonomous agent development.

Architecture combines GPT-4 (reasoning), internet access (information gathering), file operations (data persistence), code execution (computation), and memory (context management). AutoGPT autonomously decides actions, uses tools, and pursues goals.

Capabilities demonstrated: research (gathering and synthesizing information), content creation (multi-step writing), task automation (completing workflows), and problem-solving (iterative approach refinement). AutoGPT showcased autonomous agent potential.

Limitations include cost (many LLM calls), reliability (occasional infinite loops), capability gaps (complex task failures), and safety concerns (uncontrolled actions). AutoGPT represents early autonomous agent exploration rather than production solution.

Understanding AutoGPT reveals autonomous agent possibilities and challenges. AutoGPT inspired agent development ecosystem—frameworks, improvements, and commercial applications. AutoGPT demonstrated autonomous AI's transformative potential.` },
          { title: 'LangGraph', slug: 'aiml-langgraph', order: 10, content: `LangGraph

LangGraph is a framework building stateful, cyclical agent workflows using graph structures. Unlike linear chains, LangGraph enables complex control flows—loops, conditionals, parallel execution, and state management. LangGraph provides production-grade agent orchestration.

Graphs define nodes (processing steps) and edges (control flow). State objects pass between nodes, accumulating information. Conditional edges enable dynamic routing based on state. Cycles support iterative refinement. LangGraph compiles graphs into executable workflows.

Advantages: debuggability (visualize workflow), controllability (explicit control flow), composability (reusable subgraphs), and persistence (state checkpointing). LangGraph enables sophisticated agent logic beyond simple chains.

Applications include multi-step agents (ReAct loops), human-in-the-loop workflows (approval gates), multi-agent coordination (agent communication), and complex decision systems (branching logic). LangGraph suits production agent systems.

Mastering LangGraph enables building robust, maintainable agent systems. Graph-based orchestration provides clarity and control absent in implicit agent loops. LangGraph represents professional approach to agent development.` },
          { title: 'Agent Evaluation', slug: 'aiml-agent-evaluation', order: 11, content: `Agent Evaluation

Agent evaluation assesses autonomous system performance across multiple dimensions—task completion, efficiency, safety, and reliability. Unlike simple QA metrics, agent evaluation requires comprehensive assessment of decision quality, tool use, and goal achievement.

Evaluation dimensions: success rate (goal achievement), efficiency (steps/cost to completion), decision quality (appropriate tool selection), error handling (graceful failure recovery), and safety (avoiding harmful actions). Multi-dimensional evaluation captures agent capabilities.

Methodologies include test suites (diverse task scenarios), simulation environments (controlled testing), human evaluation (judgment of outcomes), and automated metrics (quantitative measurement). Benchmarks like AgentBench provide standardized evaluation.

Challenges include defining success (ambiguous goals), measuring partial progress, handling stochastic behavior (non-deterministic decisions), and scalable evaluation (testing diverse scenarios). Agent evaluation requires creativity beyond traditional ML metrics.

Mastering agent evaluation enables building reliable autonomous systems. Rigorous evaluation identifies failure modes and guides improvements. Evaluation separates research demos from production-ready agents, ensuring systems meet quality standards.` },
          { title: 'Agent Safety', slug: 'aiml-agent-safety', order: 12, content: `Agent Safety

Agent safety ensures autonomous systems operate within acceptable boundaries, preventing harmful actions. As agents gain autonomy and tool access, safety becomes critical—agents can execute real-world actions with consequences. Agent safety is foundational to responsible agentic AI deployment.

Safety measures include action filtering (blocking dangerous operations), human-in-the-loop (approval for critical actions), sandboxing (isolated environments), rate limiting (preventing runaway execution), and cost caps (budget controls). Multiple safety layers provide defense-in-depth.

Risks include unintended actions (goal misalignment), resource exhaustion (infinite loops), data exposure (accessing sensitive information), and cascading failures (error propagation). Safety design anticipates failure modes.

Best practices: principle of least privilege (minimal necessary permissions), transparency (observable actions), reversibility (undo capabilities), testing (extensive scenario coverage), and monitoring (detecting anomalies). Safety must be designed-in, not bolted-on.

Mastering agent safety involves threat modeling, safety mechanism implementation, and incident response. As agents become more capable, safety becomes more critical. Agent safety enables beneficial agentic AI while mitigating risks.` }
        ]
      }
    }
  });
  console.log('✅ Agentic AI: 12 topics');

  // ==========================================================================
  // BATCH 7: MLOps → Systems Design
  // ==========================================================================
  console.log('\n📦 BATCH 7: MLOps → Systems Design');

  // 22. TENSORFLOW / PYTORCH / ML JS
  await prisma.learnCategory.create({
    data: {
      title: 'TensorFlow / PyTorch / ML JS',
      order: 22,
      domainId: domain.id,
      topics: {
        create: [
          { title: 'TensorFlow Introduction', slug: 'aiml-tensorflow-introduction', order: 1, content: `TensorFlow Introduction

TensorFlow is Google's open-source framework for building and deploying machine learning models. Supporting deep learning, traditional ML, and production deployment, TensorFlow powers applications from research prototypes to global-scale services. TensorFlow combines flexibility with production readiness.

TensorFlow provides high-level APIs (Keras), low-level operations (tf.nn), automatic differentiation (GradientTape), distributed training, and deployment tools (TensorFlow Serving, TFLite, TF.js). The ecosystem supports end-to-end ML workflows from experimentation to production.

Key features: eager execution (intuitive debugging), graph compilation (performance optimization), GPU/TPU acceleration, SavedModel format (portable serialization), and TensorBoard (visualization). TensorFlow integrates with Python, supporting NumPy-like tensor operations.

Applications span computer vision, NLP, recommendation systems, time series forecasting, and reinforcement learning. TensorFlow's production focus enables large-scale deployment. Google services extensively use TensorFlow internally.

Mastering TensorFlow enables building production-grade ML systems. TensorFlow's comprehensive ecosystem supports the full ML lifecycle. TensorFlow remains dominant in production ML despite PyTorch's research popularity.` },
          { title: 'Keras API', slug: 'aiml-keras-api', order: 2, content: `Keras API

Keras is TensorFlow's high-level API for building neural networks with simple, intuitive interfaces. Sequential and Functional APIs enable rapid model development without low-level complexity. Keras democratizes deep learning through ease of use while maintaining flexibility.

Sequential API chains layers linearly—ideal for simple architectures. Functional API enables complex topologies—multi-input/output models, shared layers, residual connections. Both APIs provide pre-built layers (Dense, Conv2D, LSTM), activation functions, and optimizers.

Model compilation specifies optimizer (Adam, SGD), loss function (categorical crossentropy, MSE), and metrics (accuracy, precision). Training uses fit() with batching, epochs, and validation data. Callbacks enable custom behaviors—checkpointing, early stopping, learning rate scheduling.

Keras includes pre-trained models (ResNet, VGG, BERT) via Applications module. Transfer learning leverages these models for custom tasks. Built-in preprocessing layers (Normalization, TextVectorization) simplify pipelines.

Mastering Keras enables rapid prototyping and production development. Keras balances simplicity with capability, serving both beginners and experts. Keras represents best practices in API design for deep learning frameworks.` },
          { title: 'PyTorch Introduction', slug: 'aiml-pytorch-introduction', order: 3, content: `PyTorch Introduction

PyTorch is Meta's open-source deep learning framework emphasizing flexibility and Pythonic design. Dominant in research, PyTorch provides intuitive interfaces, dynamic computation graphs, and strong community support. PyTorch excels at rapid experimentation and custom architecture development.

PyTorch's define-by-run approach builds computation graphs dynamically during execution, enabling intuitive debugging and dynamic architectures. Autograd provides automatic differentiation. Tensor operations mirror NumPy, easing learning curves. Python-first design feels natural to developers.

Key features: strong GPU support (CUDA integration), TorchScript (model optimization), distributed training (DDP), ONNX export (interoperability), and TorchVision/TorchText/TorchAudio (domain libraries). PyTorch Lightning simplifies training boilerplate.

Applications span research (novel architectures), computer vision (object detection, segmentation), NLP (transformers, LLMs), and reinforcement learning. PyTorch's flexibility enables cutting-edge research. Most AI research papers use PyTorch.

Mastering PyTorch enables building custom models and contributing to research. PyTorch's intuitive design accelerates learning and experimentation. PyTorch represents modern deep learning framework design principles.` },
          { title: 'PyTorch Tensors', slug: 'aiml-pytorch-tensors', order: 4, content: `PyTorch Tensors

Tensors are PyTorch's fundamental data structure—multi-dimensional arrays similar to NumPy arrays but with GPU acceleration and autograd support. Tensors store model parameters, intermediate computations, and gradients. Understanding tensors is foundational to PyTorch mastery.

Tensor creation: torch.tensor() from data, torch.zeros/ones/randn for initialization, conversion from NumPy. Tensors support standard operations—addition, multiplication, indexing, reshaping. Broadcasting enables operations on different shapes. Device management (.cuda(), .cpu()) controls GPU/CPU placement.

Autograd tracks operations on tensors with requires_grad=True, building computation graphs for automatic differentiation. Calling .backward() computes gradients. Gradient accumulation enables techniques like gradient clipping and custom optimization.

Key operations: torch.matmul (matrix multiplication), torch.cat/stack (concatenation), torch.squeeze/unsqueeze (dimension manipulation), and in-place operations (add_, mul_). Memory management and device placement affect performance significantly.

Mastering PyTorch tensors involves understanding shapes, broadcasting, device management, and autograd mechanics. Efficient tensor operations are critical for performance. Tensor proficiency separates beginners from advanced PyTorch users.` },
          { title: 'Building Models', slug: 'aiml-building-models', order: 5, content: `Building Models

Model building defines neural network architectures through layers, connections, and parameters. Both TensorFlow/Keras and PyTorch provide abstractions for composing models. Effective model design balances capacity, efficiency, and trainability.

Keras Sequential/Functional APIs enable declarative model building. PyTorch's nn.Module provides class-based architecture definition with forward() methods. Custom layers extend base functionality. Model composition enables reusable components and complex architectures.

Common patterns: input normalization, convolutional blocks (Conv + BatchNorm + ReLU), residual connections (skip connections), attention mechanisms, and output heads. Architecture choices depend on task—CNNs for vision, transformers for sequences, fully-connected for tabular data.

Model initialization affects training—Xavier/Kaiming initialization prevents gradient vanishing/exploding. Layer configuration (kernel sizes, filters, units) requires experimentation and architectural knowledge. Pre-built architectures (ResNet, BERT) provide proven designs.

Mastering model building involves understanding layer types, architectural patterns, and design trade-offs. Model architecture significantly impacts performance and training dynamics. Good architecture design accelerates convergence and improves results.` },
          { title: 'Training Models', slug: 'aiml-training-models', order: 6, content: `Training Models

Model training optimizes parameters through gradient descent on training data. Training loops iterate through batches, compute losses, backpropagate gradients, and update parameters. Effective training requires proper configuration and monitoring.

Training components: optimizer (Adam, SGD, AdamW), loss function (task-appropriate), learning rate (critical hyperparameter), batch size (memory/convergence trade-off), and epochs (training iterations). Learning rate scheduling improves convergence.

Best practices: data augmentation (preventing overfitting), validation monitoring (detecting overfitting), gradient clipping (stability), mixed precision training (speed/memory), and checkpointing (saving progress). Early stopping prevents overfitting.

Framework-specific tools: Keras fit() with callbacks, PyTorch training loops with DataLoader, distributed training (multi-GPU), and experiment tracking (TensorBoard, Weights & Biases). Automation reduces boilerplate.

Mastering training involves hyperparameter tuning, debugging convergence issues, and optimizing efficiency. Training dynamics understanding enables troubleshooting plateaus, instability, and overfitting. Effective training separates successful from failed projects.` },
          { title: 'Model Deployment', slug: 'aiml-model-deployment', order: 7, content: `Model Deployment

Model deployment transitions trained models from development to production, serving predictions at scale. Deployment involves model serialization, serving infrastructure, API design, and monitoring. Production deployment requires engineering beyond training.

Serialization: TensorFlow SavedModel (portable format), PyTorch TorchScript/ONNX (optimization and interoperability), and model converters. Optimizations include quantization (reduced precision), pruning (removing weights), and distillation (smaller models).

Serving options: TensorFlow Serving (high-performance), TorchServe (PyTorch serving), cloud platforms (AWS SageMaker, Azure ML, Google AI Platform), and serverless (AWS Lambda with containers). APIs provide REST/gRPC endpoints.

Production considerations: latency requirements (milliseconds for real-time), throughput (requests/second), scalability (auto-scaling), monitoring (performance tracking), versioning (A/B testing), and fallbacks (graceful degradation).

Mastering deployment involves infrastructure knowledge, optimization techniques, and production engineering. Deployment bridges ML development and business value. Effective deployment ensures models impact users reliably.` },
          { title: 'TensorFlow.js', slug: 'aiml-tensorflowjs', order: 8, content: `TensorFlow.js

TensorFlow.js brings machine learning to JavaScript, enabling browser and Node.js deployment. Run pre-trained models or train models directly in browsers. TensorFlow.js democratizes ML for web developers and enables privacy-preserving client-side inference.

Capabilities: loading pre-trained models (image classification, pose detection, text generation), training models in browser (federated learning), Node.js inference (server-side JS), and GPU acceleration (WebGL). Models trained in Python TensorFlow can convert to TF.js format.

Use cases: client-side inference (reducing server costs, low latency), interactive ML experiences (real-time webcam processing), privacy (data stays local), offline applications, and edge deployment. Browser ML enables new application categories.

APIs mirror TensorFlow Python: layers API (building models), operations (tensor manipulation), and training workflows. Pre-built models via tf.loadLayersModel. Integration with web technologies enables interactive visualizations and user experiences.

Mastering TensorFlow.js enables building ML-powered web applications. Browser-based ML opens possibilities for interactive, privacy-preserving applications. TensorFlow.js bridges ML capabilities with web development, expanding ML's reach.` },
          { title: 'ML.js Overview', slug: 'aiml-mljs-overview', order: 9, content: `ML.js Overview

ML.js is a collection of JavaScript machine learning libraries providing ML algorithms in pure JavaScript. Unlike TensorFlow.js (deep learning focused), ML.js offers traditional ML algorithms—regression, clustering, dimensionality reduction, and statistical methods.

ML.js includes libraries for supervised learning (regression, classification), unsupervised learning (k-means, PCA), matrix operations, statistics, distance metrics, and data preprocessing. Pure JavaScript implementation requires no native dependencies.

Use cases: lightweight ML in browsers (simple models), educational purposes (understanding algorithms), data analysis in Node.js, and prototyping. ML.js suits problems not requiring deep learning's complexity.

Advantages: small bundle sizes (lightweight), easy integration (npm install), no external dependencies, and readable implementations (learning resource). Limitations include performance (slower than native implementations) and scope (lacks deep learning).

Understanding ML.js provides alternatives to deep learning frameworks. Not all problems require neural networks—traditional ML often suffices with simpler implementations. ML.js demonstrates how classical ML algorithms translate to JavaScript environments.` },
          { title: 'Browser ML', slug: 'aiml-browser-ml', order: 10, content: `Browser ML

Browser ML runs machine learning models directly in web browsers, enabling client-side inference without server requests. WebGL and WebGPU provide GPU acceleration. Browser ML transforms web applications with real-time, privacy-preserving ML capabilities.

Technologies: TensorFlow.js (comprehensive framework), ONNX Runtime Web (cross-framework models), MediaPipe (Google's ML solutions), and Web Neural Network API (standardized browser API proposal). WebAssembly enables near-native performance.

Benefits: privacy (data never leaves device), latency (no network round-trip), offline functionality, scalability (computation distributed to clients), and cost (reduced server infrastructure). Trade-offs include model size downloads and device capability variations.

Applications: real-time video processing (filters, background removal), pose estimation, face detection, OCR, recommendation systems, spam detection, and interactive ML experiences. Browser ML enables previously impossible web experiences.

Mastering browser ML involves model optimization (size/speed), progressive enhancement (graceful degradation), and understanding browser capabilities. Browser ML represents frontier of web development, merging ML with universal web platform.` }
        ]
      }
    }
  });
  console.log('✅ TensorFlow / PyTorch / ML JS: 10 topics');

  // 23. MLOPS & LLMOPS
  await prisma.learnCategory.create({
    data: {
      title: 'MLOps & LLMOps',
      order: 23,
      domainId: domain.id,
      topics: {
        create: [
          { title: 'MLOps Introduction', slug: 'aiml-mlops-introduction', order: 1, content: `MLOps Introduction

MLOps (Machine Learning Operations) applies DevOps principles to ML systems, enabling reliable, scalable ML deployment and maintenance. MLOps bridges ML development and production, ensuring models deliver business value continuously. MLOps transforms ad-hoc ML into systematic engineering practice.

MLOps encompasses experiment tracking, model versioning, continuous training, deployment automation, monitoring, and governance. The goal: reduce time from model development to production while ensuring quality, reproducibility, and reliability.

Key challenges: model-data coupling (performance depends on data distribution), concept drift (distributions change over time), reproducibility (consistent results), and collaboration (data scientists, engineers, operations). MLOps provides systematic solutions.

MLOps lifecycle: data preparation, model training, validation, deployment, monitoring, and retraining. Automation reduces manual work. Version control extends beyond code to data and models. CI/CD pipelines enable continuous delivery.

Mastering MLOps enables building production ML systems. MLOps separates prototypes from business-critical systems. Understanding MLOps is essential for ML engineering roles and delivering reliable ML products.` },
          { title: 'Model Versioning', slug: 'aiml-model-versioning', order: 2, content: `Model Versioning

Model versioning tracks model iterations, enabling reproducibility, rollbacks, and comparison. Like code versioning, model versioning maintains history of model artifacts, hyperparameters, training data, and performance metrics. Versioning is foundational to professional ML development.

Model versions include model weights, architecture definition, training configuration, dependencies, and metadata (metrics, dataset version, training date). Semantic versioning (major.minor.patch) indicates compatibility and significance of changes.

Tools: MLflow Model Registry (open-source), AWS SageMaker Model Registry, Azure ML Model Registry, and DVC (Data Version Control). These platforms store models, track lineage, manage staging (development, staging, production), and enable governance.

Version control enables A/B testing (comparing models in production), rollbacks (reverting problematic deployments), audit trails (compliance requirements), and experiment tracking (understanding what works). Versioning prevents "which model is in production?" confusion.

Mastering model versioning enables professional ML workflows. Versioning provides accountability, reproducibility, and confidence in deployments. Model versioning is critical infrastructure for production ML systems.` },
          { title: 'Experiment Tracking', slug: 'aiml-experiment-tracking', order: 3, content: `Experiment Tracking

Experiment tracking records ML experiments—hyperparameters, metrics, artifacts, and code versions. Systematic tracking enables comparing approaches, reproducing results, and identifying best configurations. Experiment tracking prevents lost work and enables data-driven decisions.

Tracked information: hyperparameters (learning rate, batch size, architecture), metrics (accuracy, loss over epochs), artifacts (model checkpoints, visualizations), environment (dependencies, hardware), code version (git commit), and dataset (version, splits).

Tools: MLflow Tracking (open-source standard), Weights & Biases (collaborative platform), Neptune.ai (enterprise features), TensorBoard (TensorFlow integration), and Comet ML. These platforms provide dashboards, comparison tools, and collaboration features.

Benefits: reproducibility (recreate successful experiments), efficiency (avoid repeating failed experiments), collaboration (team visibility), and optimization (systematic hyperparameter search). Tracking transforms random exploration into systematic improvement.

Mastering experiment tracking accelerates ML development. Tracked experiments build organizational knowledge. Experiment tracking separates hobbyist from professional ML practice, enabling systematic progress toward production-quality models.` },
          { title: 'Model Registry', slug: 'aiml-model-registry', order: 4, content: `Model Registry

Model registries centralize model storage, versioning, and lifecycle management. Registries serve as single source of truth for trained models, enabling discovery, governance, and deployment workflows. Model registries prevent model sprawl and enable organizational ML management.

Registries store model artifacts, metadata (metrics, training configuration), lineage (dataset versions, code), stage labels (development, staging, production), and approval workflows. APIs enable programmatic access for deployment pipelines.

Key features: version control (tracking model evolution), stage transitions (promoting models through environments), search/discovery (finding models by metrics/tags), access control (permissions), and integration (CI/CD, serving platforms).

Leading solutions: MLflow Model Registry (open-source), AWS SageMaker Model Registry, Azure ML Model Registry, Google Vertex AI Model Registry. These integrate with respective cloud ecosystems while providing unified interfaces.

Mastering model registries enables enterprise ML governance. Registries provide visibility into deployed models, enable compliance, and streamline deployment. Model registries are essential infrastructure for organizations operationalizing multiple models.` },
          { title: 'CI/CD for ML', slug: 'aiml-cicd-ml', order: 5, content: `CI/CD for ML

CI/CD (Continuous Integration/Continuous Deployment) for ML automates testing, validation, and deployment of ML models. Unlike traditional software, ML CI/CD includes data validation, model testing, and performance verification. Automated pipelines ensure quality and accelerate deployment.

CI components: code testing (unit tests, integration tests), data validation (schema checks, distribution tests), model validation (performance thresholds, fairness checks), and artifact generation (versioned models). Automated checks prevent regressions.

CD components: automated deployment (staging, production), gradual rollout (canary deployments, blue-green), rollback mechanisms (automatic reversion on failures), and monitoring integration (tracking deployed model performance).

Tools: GitHub Actions/GitLab CI (workflow automation), Kubeflow Pipelines (ML-specific workflows), AWS SageMaker Pipelines, Azure ML Pipelines, and Airflow (orchestration). Infrastructure-as-code (Terraform) enables reproducible deployments.

Mastering ML CI/CD enables rapid, reliable model deployment. Automation reduces errors, accelerates iteration, and enables continuous improvement. ML CI/CD is essential for organizations deploying models frequently and reliably.` },
          { title: 'Model Monitoring', slug: 'aiml-model-monitoring', order: 6, content: `Model Monitoring

Model monitoring tracks deployed model performance, detecting degradation, anomalies, and failures. Unlike traditional software monitoring (uptime, latency), ML monitoring includes prediction quality, data drift, and concept drift. Monitoring ensures models continue delivering value.

Monitored metrics: prediction accuracy (online validation), prediction distribution (detecting shifts), latency (response times), throughput (requests/second), error rates, and business metrics (conversion rates, revenue). Ground truth feedback enables accuracy tracking.

Alerting: threshold-based (accuracy drops below threshold), anomaly detection (unusual patterns), and trend analysis (gradual degradation). Alerts trigger investigation, retraining, or rollback.

Tools: Evidently AI (open-source), WhyLabs, Fiddler, DataRobot, AWS SageMaker Model Monitor, and custom dashboards (Grafana, Datadog). Integration with incident management (PagerDuty) ensures responsive action.

Mastering model monitoring prevents silent failures. Proactive monitoring detects issues before customer impact. Model monitoring is critical for production ML, separating reliable systems from ticking time bombs.` },
          { title: 'Data Drift Detection', slug: 'aiml-data-drift-detection', order: 7, content: `Data Drift Detection

Data drift occurs when production data distributions diverge from training data, degrading model performance. Drift detection monitors input features, identifying distribution changes requiring model retraining. Detecting drift prevents silent model degradation.

Drift types: covariate drift (feature distributions change), concept drift (feature-target relationships change), label drift (target distribution changes), and prediction drift (model outputs shift). Each type requires different responses.

Detection methods: statistical tests (Kolmogorov-Smirnov, chi-squared), distance metrics (KL divergence, Wasserstein distance), and model-based detection (comparing feature distributions). Multivariate drift detection considers feature interactions.

Response strategies: automated retraining (periodic or drift-triggered), model adaptation (online learning), alerting (manual investigation), and A/B testing (validating retrained models). Retraining frequency balances freshness with cost.

Mastering drift detection enables maintaining model performance over time. Drift is inevitable in production—systematic detection and response are essential. Drift management separates mature MLOps practices from reactive firefighting.` },
          { title: 'Model Serving', slug: 'aiml-model-serving', order: 8, content: `Model Serving

Model serving provides prediction APIs, handling requests at scale with low latency. Serving infrastructure manages model loading, request batching, scaling, and monitoring. Effective serving bridges model training and business value delivery.

Serving patterns: real-time inference (synchronous REST/gRPC APIs, millisecond latency), batch inference (asynchronous processing, cost-efficient), streaming inference (processing data streams), and edge inference (on-device deployment).

Optimizations: model quantization (reduced precision), batching (processing multiple requests together), caching (storing frequent predictions), GPU utilization, and multi-model serving (resource sharing). Optimizations balance cost, latency, and throughput.

Solutions: TensorFlow Serving (high-performance), TorchServe (PyTorch), Triton Inference Server (multi-framework), AWS SageMaker, Azure ML, Google Vertex AI, and Seldon Core (Kubernetes-native). Serving platforms handle infrastructure complexity.

Mastering model serving involves understanding performance requirements, optimization techniques, and infrastructure trade-offs. Serving transforms trained models into business assets. Effective serving is critical for production ML success.` },
          { title: 'LLMOps Introduction', slug: 'aiml-llmops-introduction', order: 9, content: `LLMOps Introduction

LLMOps (Large Language Model Operations) adapts MLOps practices for LLM-specific challenges—prompt management, token costs, latency, evaluation complexity, and rapid model evolution. LLMOps enables reliable, cost-effective LLM application deployment and maintenance.

LLM-specific concerns: prompt versioning (prompts as code), cost management (token-based pricing), quality evaluation (nuanced metrics), model selection (GPT-4 vs GPT-3.5 trade-offs), and rapid iteration (frequent prompt changes). Traditional MLOps tools require adaptation.

LLMOps workflow: prompt engineering, evaluation (test sets, metrics), deployment (API integration, caching), monitoring (cost, latency, quality), and iteration (A/B testing prompts). Version control extends to prompts, few-shot examples, and system messages.

Challenges include non-deterministic outputs (temperature settings), evaluation difficulty (subjective quality), debugging complexity (black-box models), and vendor lock-in (API dependencies). LLMOps addresses these systematically.

Mastering LLMOps enables production LLM applications. LLMOps transforms ad-hoc prompt engineering into systematic practice. Understanding LLMOps is essential for building reliable, cost-effective LLM-powered products.` },
          { title: 'Prompt Management', slug: 'aiml-prompt-management', order: 10, content: `Prompt Management

Prompt management treats prompts as versioned, tested code artifacts. Systematic prompt management enables collaboration, reproducibility, and quality assurance. Prompts drive LLM behavior—managing them professionally is critical for production applications.

Prompt components: system messages (behavior definition), templates (parameterized prompts), few-shot examples (demonstrations), and output formatting (structure specifications). Each component requires versioning and testing.

Management practices: version control (Git for prompts), templating (variable substitution), testing (evaluation datasets), and staging (development, testing, production). Prompt libraries (promptfoo, LangSmith) provide infrastructure.

Collaboration: prompt engineers iterate prompts, developers integrate them, and QA tests them. Centralized prompt storage prevents sprawl. Documentation explains prompt purposes and expected behaviors. Change logs track iteration history.

Mastering prompt management enables team collaboration and quality control. Systematic management prevents prompt degradation and enables continuous improvement. Prompt management separates amateur from professional LLM application development.` },
          { title: 'LLM Monitoring', slug: 'aiml-llm-monitoring', order: 11, content: `LLM Monitoring

LLM monitoring tracks application performance, quality, costs, and user interactions. Unlike traditional monitoring, LLM monitoring includes output quality, prompt effectiveness, and token usage. Monitoring ensures applications deliver value while controlling costs.

Monitored metrics: response quality (user feedback, LLM-as-judge scores), latency (time to first token, total time), cost (tokens per request, daily spend), error rates (API failures, rate limits), and usage patterns (request volume, peak times).

Quality monitoring: user ratings (thumbs up/down), semantic similarity (expected vs actual outputs), hallucination detection, and safety violations. Aggregate metrics identify degradation trends.

Tools: LangSmith (LangChain monitoring), Helicone (API monitoring), Humanloop (prompt management and monitoring), OpenLIT, and custom solutions (logging, dashboards). Integration with incident management enables rapid response.

Mastering LLM monitoring prevents cost overruns and quality degradation. Proactive monitoring identifies issues before user impact. LLM monitoring is essential infrastructure for production LLM applications.` },
          { title: 'Cost Optimization', slug: 'aiml-cost-optimization', order: 12, content: `Cost Optimization

Cost optimization reduces LLM application expenses while maintaining quality. Token-based pricing makes optimization critical—costs can escalate quickly without management. Strategic optimization enables sustainable LLM application economics.

Optimization strategies: model selection (GPT-3.5 vs GPT-4 for appropriate tasks), prompt compression (removing unnecessary words), caching (storing repeated queries/responses), streaming (progressive responses), and rate limiting (preventing abuse).

Architectural approaches: routing (simple queries to cheaper models), cascading (trying cheaper models first), batching (grouping requests), and preprocessing (filtering before LLM calls). Smart routing balances cost and quality.

Monitoring and control: cost budgets (spending limits), usage tracking (per-user, per-feature), alerts (unexpected spikes), and attribution (understanding cost drivers). Cost dashboards enable data-driven decisions.

Mastering cost optimization enables economically viable LLM applications. Unmanaged costs sink projects—systematic optimization is essential. Cost optimization separates scalable from unsustainable LLM businesses.` }
        ]
      }
    }
  });
  console.log('✅ MLOps & LLMOps: 12 topics');

  // 24. AI SYSTEMS DESIGN
  await prisma.learnCategory.create({
    data: {
      title: 'AI Systems Design',
      order: 24,
      domainId: domain.id,
      topics: {
        create: [
          { title: 'AI Systems Overview', slug: 'aiml-ai-systems-overview', order: 1, content: `AI Systems Overview

AI systems integrate ML models with infrastructure, data pipelines, APIs, and user interfaces to deliver intelligent applications. Unlike standalone models, production AI systems require distributed architecture, scalability, reliability, and security. Systems thinking is essential for production AI.

System components: data ingestion (pipelines, preprocessing), model serving (inference APIs), caching (performance optimization), databases (state management), monitoring (observability), and user interfaces (web/mobile apps). Components work together coherently.

Architectural patterns: microservices (independent services), event-driven (asynchronous processing), serverless (managed infrastructure), and hybrid (cloud + edge). Architecture choices affect scalability, cost, and maintainability.

Challenges: latency requirements (real-time vs batch), scalability (handling load spikes), reliability (fault tolerance), data consistency, and security (protecting models and data). System design balances competing requirements.

Mastering AI systems design enables building production-grade applications. Understanding systems separates data scientists from ML engineers. AI systems design is critical for delivering business value from ML models.` },
          { title: 'System Architecture', slug: 'aiml-system-architecture', order: 2, content: `System Architecture

AI system architecture defines component organization, communication patterns, and data flows. Good architecture ensures scalability, maintainability, and performance. Architecture decisions have lasting impacts on system evolution and operational costs.

Common patterns: three-tier (presentation, logic, data), microservices (loosely coupled services), event-driven (message-based communication), and lambda architecture (batch + stream processing). Patterns suit different requirements.

Key decisions: monolith vs microservices (complexity vs flexibility), synchronous vs asynchronous (latency vs throughput), stateful vs stateless (simplicity vs scalability), and cloud vs on-premise (cost vs control). Trade-offs require careful consideration.

Architecture includes API gateways (request routing), load balancers (traffic distribution), message queues (asynchronous processing), caching layers (performance), and databases (persistence). Each component serves specific purposes.

Mastering architecture involves understanding patterns, trade-offs, and evolution. Good architecture enables growth; poor architecture creates technical debt. Architecture design is foundational to successful AI systems.` },
          { title: 'Scalability', slug: 'aiml-scalability', order: 3, content: `Scalability

Scalability enables systems to handle increasing load—more users, requests, or data—without performance degradation. AI systems must scale inference, data processing, and storage. Scalability determines whether systems support growth or collapse under load.

Scaling approaches: horizontal scaling (adding instances), vertical scaling (more powerful machines), and auto-scaling (dynamic resource adjustment). Stateless services scale easily; stateful services require coordination.

Bottlenecks: model inference (GPU availability), database queries (connection limits), network bandwidth, and memory. Identifying bottlenecks through profiling enables targeted optimization. Load testing validates scalability.

Scalability patterns: load balancing (distributing requests), caching (reducing compute), asynchronous processing (handling bursts), database sharding (distributing data), and CDNs (global distribution). Patterns combine for comprehensive scalability.

Mastering scalability enables building systems supporting growth. Scalability planning prevents costly rewrites. Understanding scalability is essential for ML engineers building production systems serving millions of users.` },
          { title: 'Latency Optimization', slug: 'aiml-latency-optimization', order: 4, content: `Latency Optimization

Latency optimization reduces response times, improving user experience and enabling real-time applications. AI inference often dominates latency—optimization is critical. Low latency separates usable from frustrating AI applications.

Optimization techniques: model optimization (quantization, pruning, distillation), batching (processing multiple requests together), caching (storing frequent predictions), GPU utilization, and architectural improvements (reducing hops, colocation).

Infrastructure: edge deployment (computation near users), CDNs (content delivery), regional deployment (geographic distribution), and specialized hardware (GPUs, TPUs, custom ASICs). Infrastructure choices significantly impact latency.

Measurement: p50/p95/p99 latency (percentile performance), time-to-first-byte (TTFB), and end-to-end latency (user-perceived). Monitoring identifies regressions. Profiling pinpoints bottlenecks.

Mastering latency optimization enables real-time AI applications. Users abandon slow applications—latency directly impacts engagement. Understanding latency optimization is essential for consumer-facing AI products.` },
          { title: 'Caching Strategies', slug: 'aiml-caching-strategies', order: 5, content: `Caching Strategies

Caching stores computed results for reuse, dramatically reducing latency and costs. AI caching stores predictions, embeddings, and intermediate results. Effective caching transforms expensive AI operations into instant responses.

Caching layers: in-memory (Redis, Memcached), CDN (edge caching), application-level (local caches), and database query caching. Multi-layer caching provides defense-in-depth.

Strategies: query result caching (identical inputs), semantic caching (similar inputs via embeddings), partial result caching (intermediate computations), and negative caching (storing "not found" results). Each strategy suits different patterns.

Cache management: expiration policies (TTL), invalidation (removing stale entries), eviction (LRU, LFU), and warming (preloading). Proper management balances freshness with performance.

Mastering caching reduces costs and improves performance dramatically. Caching is force multiplier for AI systems. Understanding caching strategies is essential for economical, performant AI applications.` },
          { title: 'Load Balancing', slug: 'aiml-load-balancing', order: 6, content: `Load Balancing

Load balancing distributes requests across multiple servers, preventing resource exhaustion and ensuring high availability. Load balancers route traffic intelligently, enabling horizontal scaling and fault tolerance. Load balancing is foundational to reliable, scalable AI systems.

Algorithms: round-robin (sequential distribution), least-connections (load-aware), IP hash (session affinity), and weighted distribution (capacity-aware). Algorithm choice depends on workload characteristics and state requirements.

Types: Layer 4 (transport layer, TCP/UDP), Layer 7 (application layer, HTTP), DNS load balancing (geographic distribution), and client-side load balancing (service mesh). Each type serves different scenarios.

Health checks: active (probing endpoints), passive (monitoring errors), and graceful degradation (removing unhealthy instances). Health checks ensure traffic routes only to healthy servers. Circuit breakers prevent cascading failures.

Mastering load balancing enables building highly available systems. Load balancing is essential infrastructure for production AI services. Understanding load balancing is critical for reliability and scalability.` },
          { title: 'API Design', slug: 'aiml-api-design', order: 7, content: `API Design

API design defines how clients interact with AI systems—request/response formats, authentication, error handling, and documentation. Good APIs are intuitive, consistent, and versioned. API design determines developer experience and integration ease.

RESTful principles: resource-based URLs, HTTP methods (GET, POST, PUT, DELETE), status codes (200, 400, 500), and JSON payloads. REST APIs provide familiar patterns. Alternative: GraphQL for flexible queries.

AI-specific considerations: streaming responses (progressive generation), batch endpoints (processing multiple items), async patterns (long-running tasks), and webhook callbacks (notifications). Timeouts and retries handle model inference delays.

API management: authentication (API keys, OAuth), rate limiting (preventing abuse), versioning (backward compatibility), documentation (OpenAPI/Swagger), and SDKs (language-specific clients). Management enables sustainable API programs.

Mastering API design enables building developer-friendly AI services. APIs are product interfaces—design quality impacts adoption. Understanding API design is essential for ML engineers building public or internal AI services.` },
          { title: 'Security', slug: 'aiml-security', order: 8, content: `Security

Security protects AI systems from unauthorized access, data breaches, model theft, and adversarial attacks. AI systems introduce unique vulnerabilities—model extraction, prompt injection, data poisoning. Comprehensive security is critical for trustworthy AI.

Threat categories: model attacks (extraction, inversion, adversarial inputs), data attacks (poisoning, inference), system attacks (DDoS, unauthorized access), and prompt injection (malicious inputs manipulating behavior). Each requires specific defenses.

Defensive measures: authentication (controlling access), encryption (data in transit/rest), input validation (sanitization), rate limiting (abuse prevention), monitoring (anomaly detection), and sandboxing (isolation). Defense-in-depth provides resilience.

AI-specific concerns: protecting model IP (weights, architectures), preventing prompt injection (LLM security), securing training data (privacy), and adversarial robustness (input perturbations). New attack vectors require ongoing vigilance.

Mastering AI security protects intellectual property, user data, and system integrity. Security breaches damage trust and violate regulations. Understanding AI security is essential for responsible AI deployment.` },
          { title: 'Privacy', slug: 'aiml-privacy', order: 9, content: `Privacy

Privacy ensures AI systems protect personal information and comply with regulations (GDPR, CCPA). AI systems process sensitive data—medical records, financial information, personal preferences. Privacy failures result in regulatory penalties and reputation damage.

Privacy principles: data minimization (collecting only necessary data), purpose limitation (using data only for stated purposes), consent management, data retention limits, and right to deletion. Compliance frameworks guide implementation.

Techniques: differential privacy (adding noise to protect individuals), federated learning (training without centralizing data), encryption (protecting data), anonymization (removing identifiers), and access controls (limiting exposure).

Privacy-preserving ML: homomorphic encryption (computation on encrypted data), secure multi-party computation (collaborative learning), and synthetic data (training without real data). These techniques enable AI with privacy guarantees.

Mastering privacy enables compliant, ethical AI. Privacy violations carry legal and reputational costs. Understanding privacy is essential for organizations deploying AI with sensitive data.` },
          { title: 'Compliance', slug: 'aiml-compliance', order: 10, content: `Compliance

Compliance ensures AI systems adhere to legal, regulatory, and ethical requirements. Regulations (GDPR, AI Act, industry-specific) increasingly govern AI. Non-compliance risks fines, shutdowns, and reputation damage. Compliance is essential for enterprise AI.

Regulatory frameworks: GDPR (data protection), CCPA (California privacy), AI Act (EU AI regulation), and industry-specific (HIPAA for healthcare, financial regulations). Requirements include transparency, fairness, accountability, and data rights.

Compliance requirements: documentation (model cards, data lineage), explainability (transparent decisions), bias testing (fairness assessments), audit trails (logging decisions), and data governance (privacy policies, retention). Requirements vary by jurisdiction.

Implementation: compliance frameworks (governance policies), automated checks (policy enforcement), documentation systems (audit readiness), and training (employee awareness). Compliance is organizational, not just technical.

Mastering compliance enables operating AI systems legally and ethically. Compliance complexity increases with regulation. Understanding compliance is essential for ML engineers and leaders deploying enterprise AI systems.` }
        ]
      }
    }
  });
  console.log('✅ AI Systems Design: 10 topics');

  // ==========================================================================
  // BATCH 8: History → Prompt Engineering
  // ==========================================================================
  console.log('\n📦 BATCH 8: History → Prompt Engineering');

  // 25. AI HISTORY & THEORY
  await prisma.learnCategory.create({
    data: {
      title: 'AI History & Theory',
      order: 25,
      domainId: domain.id,
      topics: {
        create: [
          { title: 'History of AI', slug: 'aiml-history-of-ai', order: 1, content: `History of AI

Artificial Intelligence's history spans 70+ years from theoretical foundations to transformative applications. AI evolved through cycles of optimism and disappointment, culminating in today's breakthroughs. Understanding AI history provides context for current capabilities and future trajectories.

Foundations (1940s-1950s): Alan Turing's computing theory, "Computing Machinery and Intelligence" (1950), and the Dartmouth Conference (1956) establishing AI as a field. Early optimism predicted human-level AI within decades.

Early progress and setbacks (1960s-1980s): Expert systems, LISP, perceptrons, then AI winters (funding cuts after unmet promises). Limitations of symbolic AI and computational constraints dampened progress.

Revival (1990s-2000s): Machine learning emergence, statistical approaches, internet-scale data, and increased compute. IBM Deep Blue defeating Kasparov (1997) demonstrated narrow AI capabilities.

Deep learning revolution (2010s-present): GPUs enabling neural network training, AlexNet (2012), AlphaGo (2016), transformers (2017), GPT models, and diffusion models. Current era characterized by rapid capability increases and societal impact.

Understanding AI history reveals patterns—hype cycles, breakthrough technologies, and scaling's importance. History informs realistic expectations and identifies promising research directions.` },
          { title: 'AI Evolution', slug: 'aiml-ai-evolution', order: 2, content: `AI Evolution

AI evolved through distinct paradigms—symbolic AI, machine learning, deep learning, and generative AI. Each paradigm addressed previous limitations while introducing new capabilities. Evolution continues toward more general, capable systems.

Symbolic AI (1950s-1980s): Rule-based systems, logic, expert systems. Strengths: transparency, reasoning. Limitations: brittle, required manual knowledge encoding, struggled with uncertainty.

Machine Learning (1990s-2010s): Statistical learning, pattern recognition from data. Decision trees, SVMs, random forests. Strengths: learning from examples. Limitations: feature engineering, limited by data scale.

Deep Learning (2010s): Neural networks with many layers, automatic feature learning. CNNs for vision, RNNs for sequences, transformers for language. Strengths: end-to-end learning, scalability. Enabled by GPUs and big data.

Generative AI (2020s): Models creating new content—text, images, code. LLMs (GPT, Claude), diffusion models (DALL-E, Stable Diffusion). Represents shift from analysis to creation.

Understanding AI evolution reveals how limitations drove innovation. Current capabilities build on decades of research. Evolution continues toward more general intelligence and multimodal understanding.` },
          { title: 'AI Theory', slug: 'aiml-ai-theory', order: 3, content: `AI Theory

AI theory provides mathematical foundations for learning algorithms, generalization, and intelligence itself. Theoretical understanding guides algorithm design, explains empirical success, and identifies fundamental limitations. AI theory bridges philosophy and engineering.

Core concepts: computational complexity (what's efficiently computable), learning theory (sample complexity, generalization bounds), information theory (optimal compression, entropy), and optimization (finding best parameters).

Learning frameworks: PAC learning (provably approximately correct), VC dimension (model capacity), bias-variance tradeoff (underfitting vs overfitting), and no free lunch theorem (no universal best algorithm).

Neural network theory: universal approximation (networks can represent any function), optimization landscapes (why gradient descent works), generalization (why models work on new data despite overparameterization), and scaling laws (performance vs compute/data).

Philosophical questions: What is intelligence? Can machines think? Symbol grounding problem, Chinese room argument, and consciousness debates. Theory intersects with philosophy of mind.

Mastering AI theory enables principled algorithm design and understanding why methods work. Theory provides foundations beyond empirical trial-and-error, guiding research toward fundamental breakthroughs.` },
          { title: 'Turing Test', slug: 'aiml-turing-test', order: 4, content: `Turing Test

The Turing Test, proposed by Alan Turing (1950), evaluates machine intelligence through conversational indistinguishability from humans. If interrogators can't distinguish machine from human responses, the machine exhibits intelligence. The test influenced AI development profoundly.

Test procedure: Human evaluator converses with machine and human via text. If the evaluator can't reliably identify which is which, the machine passes. Focus on behavioral intelligence rather than internal mechanisms.

Philosophical significance: Turing avoided defining intelligence directly, using operational criterion. "Computing Machinery and Intelligence" anticipated objections—consciousness, creativity, learning. Test shifted focus from "Can machines think?" to "Can machines behave intelligently?"

Critiques: Chinese room argument (Searle)—passing test doesn't imply understanding. Test focuses on language, ignoring embodiment, perception, and action. Modern AI excels at specific tasks without general intelligence.

Modern relevance: ChatGPT and Claude might pass limited Turing tests but aren't generally intelligent. Test remains culturally significant but limitations highlight intelligence's complexity. Modern AI evaluation uses task-specific benchmarks.

Understanding Turing Test provides historical context for AI goals. Test shaped early AI research toward natural language understanding. Its limitations inform current debates about artificial general intelligence.` },
          { title: 'AI Winters', slug: 'aiml-ai-winters', order: 5, content: `AI Winters

AI winters were periods of reduced funding and interest following unmet promises. Understanding AI winters teaches lessons about hype cycles, realistic expectations, and sustained progress. Current AI boom prompts questions about another potential winter.

First AI Winter (1970s): Early optimism (human-level AI within decades) met reality. Perceptrons' limitations (Minsky & Papert), computational costs, and Lighthill Report (UK) criticizing AI progress led to funding cuts.

Second AI Winter (late 1980s-1990s): Expert systems promised too much, delivered too little. Specialized hardware (LISP machines) became obsolete. Market collapse of AI companies. Rule-based systems proved brittle and expensive to maintain.

Causes: Overpromising capabilities, underestimating difficulty, insufficient compute/data, and narrow problem-solving. Each winter followed hype cycles where expectations outpaced reality.

Lessons: Importance of realistic expectations, sustained research funding, focusing on practical applications, and incremental progress. Current AI boom benefits from actual capabilities (ChatGPT, stable diffusion) rather than promises.

Understanding AI winters provides perspective on current progress. Today's capabilities (large-scale models, real products) differ fundamentally from previous eras' limitations. However, lessons remain relevant—manage expectations, focus on value delivery, and sustain research.` }
        ]
      }
    }
  });
  console.log('✅ AI History & Theory: 5 topics');

  // 26. AI ETHICS & SAFETY
  await prisma.learnCategory.create({
    data: {
      title: 'AI Ethics & Safety',
      order: 26,
      domainId: domain.id,
      topics: {
        create: [
          { title: 'AI Ethics Introduction', slug: 'aiml-ai-ethics-introduction', order: 1, content: `AI Ethics Introduction

AI ethics examines moral implications of AI development and deployment—fairness, accountability, transparency, and societal impact. As AI influences critical decisions (hiring, lending, healthcare), ethical considerations become paramount. Responsible AI requires ethical frameworks guiding development.

Key concerns: algorithmic bias (discriminatory outcomes), privacy (data usage), autonomy (human agency), accountability (responsibility for AI decisions), and safety (preventing harm). Each concern requires systematic approaches.

Ethical frameworks: consequentialism (outcomes matter), deontology (rules and duties), virtue ethics (character and intentions), and care ethics (relationships and context). Different frameworks provide different guidance.

Stakeholders: developers (implementing ethics), organizations (policies and governance), regulators (legal frameworks), and society (affected populations). Multi-stakeholder collaboration ensures comprehensive approaches.

Tensions: innovation vs safety, capability vs control, open vs closed development, and commercial vs societal benefit. Navigating tensions requires value alignment and ongoing dialogue.

Mastering AI ethics enables building trustworthy systems. Ethics isn't optional—it's fundamental to sustainable AI development. Understanding ethics is essential for responsible AI practitioners.` },
          { title: 'Bias in AI', slug: 'aiml-bias-in-ai', order: 2, content: `Bias in AI

Bias in AI causes systematic unfairness toward groups or individuals. Biased systems perpetuate discrimination in hiring, lending, criminal justice, and healthcare. Understanding and mitigating bias is critical for equitable AI.

Bias sources: training data (historical discrimination reflected), algorithm design (optimization choices), feature selection (proxy discrimination), and deployment context (how systems are used). Bias compounds through AI pipeline.

Bias types: historical (past discrimination), measurement (data collection), representation (underrepresented groups), and aggregation (treating diverse groups uniformly). Each requires specific mitigation strategies.

Examples: facial recognition (lower accuracy for darker skin), hiring algorithms (gender discrimination), predictive policing (racial bias), and loan approval (socioeconomic discrimination). Real harms demand urgent action.

Mitigation: diverse training data, fairness constraints during training, bias testing, algorithmic auditing, and human oversight. Technical and organizational approaches combine for comprehensive solutions.

Mastering bias detection and mitigation enables building equitable AI. Bias isn't inevitable—conscious effort prevents it. Understanding bias is essential for responsible AI development.` },
          { title: 'Fairness', slug: 'aiml-fairness', order: 3, content: `Fairness

Fairness ensures AI systems treat individuals and groups equitably. Defining and measuring fairness is complex—multiple definitions exist, sometimes contradicting. Fairness considerations are essential for trustworthy, socially acceptable AI.

Fairness definitions: demographic parity (equal outcomes across groups), equalized odds (equal true/false positive rates), calibration (predicted probabilities match actual outcomes), and individual fairness (similar individuals treated similarly). Impossibility theorems show some definitions conflict.

Measurement: fairness metrics quantify algorithmic fairness. Disparity ratios, equality of opportunity, and predictive parity. Metrics guide but don't dictate fairness—context matters.

Trade-offs: accuracy vs fairness, different fairness definitions, and group vs individual fairness. Perfect fairness across all dimensions is often impossible. Stakeholder dialogue determines acceptable trade-offs.

Implementation: fairness constraints in training, post-processing adjustments, data rebalancing, and algorithmic auditing. Tools like Fairlearn, AI Fairness 360 enable fairness-aware development.

Mastering fairness enables building equitable systems. Fairness requires intentional design—default approaches often perpetuate inequality. Understanding fairness is fundamental to ethical AI practice.` },
          { title: 'Transparency', slug: 'aiml-transparency', order: 4, content: `Transparency

Transparency provides visibility into AI systems—how they work, why they make decisions, and what data they use. Transparency builds trust, enables accountability, and supports informed consent. Opaque "black box" systems undermine trust and prevent oversight.

Transparency dimensions: data (what data is used), model (how it works), decision (why specific outputs), and organization (who develops, deploys). Each dimension serves different stakeholder needs.

Approaches: documentation (model cards, datasheets), interpretability (understanding model behavior), explainability (explaining individual decisions), and disclosure (communicating capabilities/limits to users).

Challenges: complexity (models too complex for full transparency), trade secrets (commercial interests), and adversarial concerns (transparency enabling attacks). Balancing transparency with other values.

Best practices: clear documentation, user-facing explanations, audit trails, and stakeholder communication. Tools like TensorFlow Model Card Toolkit formalize transparency.

Mastering transparency enables building trustworthy systems. Transparency is prerequisite for accountability and user agency. Understanding transparency requirements is essential for responsible AI deployment.` },
          { title: 'Explainability', slug: 'aiml-explainability', order: 5, content: `Explainability

Explainability provides understandable reasons for AI decisions. Unlike transparency (system visibility), explainability focuses on specific outputs. Explainability enables users to understand, trust, and appropriately rely on AI systems.

Explainability methods: feature importance (which inputs mattered), attention visualization (what model focused on), counterfactual explanations (what changes would alter decision), and example-based (similar training examples).

Techniques: LIME (Local Interpretable Model-agnostic Explanations), SHAP (SHapley Additive exPlanations), attention weights, and saliency maps. Each technique suits different model types and use cases.

Interpretable models: decision trees (transparent by nature), linear models (weighted features), and rule-based systems. Trade-off between interpretability and performance. Some domains require inherently interpretable models.

Contextual needs: medical diagnosis (doctors need reasoning), loan decisions (applicants deserve explanations), and content moderation (appeals require justification). Different contexts require different explanation granularity.

Mastering explainability enables accountable AI. Explainability builds trust and enables error correction. Understanding explainability is essential for high-stakes AI applications.` },
          { title: 'AI Safety', slug: 'aiml-ai-safety', order: 6, content: `AI Safety

AI safety prevents AI systems from causing harm through accidents, misuse, or unintended consequences. As AI capabilities increase, safety becomes increasingly critical. AI safety spans technical robustness, operational safety, and long-term existential risks.

Safety concerns: robustness (handling adversarial inputs), reliability (consistent behavior), security (preventing attacks), and specification (ensuring systems do what's intended). Each concern requires systematic approaches.

Technical safety: adversarial training (robustness to attacks), uncertainty quantification (confidence estimation), formal verification (proving properties), and testing (comprehensive evaluation). Technical measures provide baseline safety.

Operational safety: monitoring (detecting anomalies), human oversight (human-in-the-loop), access controls (limiting capabilities), and incident response (handling failures). Organizational practices complement technical measures.

Long-term concerns: capability acceleration, value alignment (systems pursuing intended goals), and existential risk. Research organizations (Anthropic, OpenAI Safety) focus on these challenges.

Mastering AI safety enables building reliable systems. Safety must be designed-in, not bolted-on. Understanding safety is essential for responsible AI development as capabilities increase.` },
          { title: 'Alignment Problem', slug: 'aiml-alignment-problem', order: 7, content: `Alignment Problem

The alignment problem addresses ensuring AI systems pursue intended goals and values. Misalignment—systems optimizing for wrong objectives—causes harm even without malicious intent. Alignment becomes critical as AI capabilities increase.

Core challenge: specifying objectives precisely is difficult. Proxies (measurable objectives) diverge from true goals. Goodhart's Law: "When a measure becomes a target, it ceases to be a good measure." Systems game metrics.

Examples: recommender systems optimizing engagement (addiction), content moderators maximizing removals (over-censorship), and proposed AGI scenarios (unintended optimization pressure). Misalignment creates perverse incentives.

Alignment approaches: reward modeling (learning rewards from human feedback, RLHF), inverse reinforcement learning (inferring goals from behavior), debate (AI systems arguing for oversight), and recursive reward modeling. Research ongoing.

Long-term concerns: As AI becomes more capable, alignment difficulty increases. Superintelligent systems pursuing misaligned goals could pose existential risks. Ensuring alignment preemptively is critical.

Understanding alignment reveals fundamental AI safety challenge. Perfect alignment remains unsolved. Alignment research is essential for beneficial advanced AI.` },
          { title: 'Responsible AI', slug: 'aiml-responsible-ai', order: 8, content: `Responsible AI

Responsible AI encompasses ethical, safe, and beneficial AI development and deployment. Responsibility extends beyond compliance to proactive consideration of societal impacts. Responsible AI is organizational commitment, not just technical requirement.

Principles: fairness (equitable treatment), accountability (clear responsibility), transparency (understandable systems), privacy (data protection), safety (harm prevention), and beneficence (promoting wellbeing). Principles guide implementation.

Implementation: governance frameworks (policies and oversight), ethics reviews (impact assessments), diverse teams (multiple perspectives), stakeholder engagement (affected populations), and continuous monitoring (ongoing evaluation).

Tools and frameworks: Microsoft Responsible AI Standard, Google AI Principles, IBM AI Ethics, and Partnership on AI guidelines. Frameworks provide actionable guidance for organizations.

Challenges: balancing innovation with caution, navigating conflicting values, resource constraints (ethics work requires investment), and global variation (cultural differences in values).

Mastering responsible AI enables sustainable AI development. Responsibility builds trust, prevents harms, and ensures long-term viability. Understanding responsible AI is essential for leaders and practitioners shaping AI's societal impact.` }
        ]
      }
    }
  });
  console.log('✅ AI Ethics & Safety: 8 topics');

  // 27. PROMPT ENGINEERING
  await prisma.learnCategory.create({
    data: {
      title: 'Prompt Engineering',
      order: 27,
      domainId: domain.id,
      topics: {
        create: [
          { title: 'Prompt Engineering Basics', slug: 'aiml-prompt-engineering-basics', order: 1, content: `Prompt Engineering Basics

Prompt engineering crafts inputs to elicit desired LLM outputs. Well-designed prompts dramatically improve response quality, accuracy, and task performance. Prompt engineering maximizes LLM value without model modification.

Basic principles: clarity (specific instructions), context (relevant information), constraints (output format, length), and examples (demonstrations). Simple improvements yield significant quality gains.

Prompt structure: instruction (task description), context (background information), input data (specific content), and output indicator (format specification). Structured prompts provide comprehensive guidance.

Common patterns: instructions (clear directives), role assignment (persona definition), format specification (JSON, bullet points), and constraints (length limits, don'ts). Patterns provide starting templates.

Iterative refinement: prompting is empirical—test prompts, analyze outputs, refine, repeat. A/B testing compares variants. Systematic experimentation identifies effective approaches.

Mastering prompt basics enables immediate LLM productivity gains. Prompt engineering skills complement technical knowledge. Understanding basics is foundational to advanced techniques.` },
          { title: 'Prompt Design', slug: 'aiml-prompt-design', order: 2, content: `Prompt Design

Prompt design applies systematic approaches to crafting effective prompts. Design principles guide creating prompts that reliably produce high-quality outputs. Thoughtful design transforms inconsistent results into predictable performance.

Design elements: persona (role definition), tone (formal/casual), format (structure specification), constraints (dos/don'ts), and examples (few-shot demonstrations). Each element serves specific purposes.

Best practices: specificity (vague prompts yield vague outputs), context provision (relevant background), explicit formatting, chunking (breaking complex tasks), and iterative refinement. Practices prevent common pitfalls.

Template development: reusable prompt templates with variables enable consistent application. Template libraries accelerate prompt development. Version control tracks template evolution.

Domain adaptation: prompts vary by domain—code generation, creative writing, data analysis, customer support. Domain knowledge informs effective prompt design. Specialized prompts outperform generic approaches.

Mastering prompt design enables building reliable LLM applications. Systematic design produces consistent quality. Design skills separate casual users from professional practitioners.` },
          { title: 'Few-Shot Learning', slug: 'aiml-few-shot-learning', order: 3, content: `Few-Shot Learning

Few-shot learning provides examples in prompts, enabling models to perform tasks without training. Examples demonstrate desired input-output patterns. Few-shot learning dramatically improves task performance over zero-shot approaches.

Example structure: input-output pairs showing task pattern. Examples guide model behavior. Diversity in examples improves generalization. Typically 2-5 examples balance context length with demonstration.

Example selection: representative (covering input variety), clear (unambiguous patterns), correct (accurate outputs), and diverse (avoiding narrow patterns). Quality over quantity matters.

Ordering effects: example order influences outputs. Strong examples first establish patterns. Similar examples to target input improve accuracy. Experimentation identifies optimal ordering.

Limitations: context window constraints (limited examples), cost (token usage), and task complexity (some tasks need many examples). Few-shot works best for well-defined, pattern-based tasks.

Mastering few-shot learning enables rapid task adaptation. Few-shot learning reduces need for fine-tuning. Understanding few-shot techniques is essential for practical LLM applications.` },
          { title: 'Chain of Thought', slug: 'aiml-chain-of-thought', order: 4, content: `Chain of Thought

Chain-of-thought (CoT) prompting instructs models to show reasoning steps before final answers. CoT dramatically improves performance on complex reasoning tasks. Making reasoning explicit improves accuracy and provides interpretability.

CoT pattern: "Let's think step by step" or "Let's work through this systematically." Phrases trigger detailed reasoning. Models break problems into steps, explaining each before concluding.

Few-shot CoT: examples demonstrating reasoning chains. Examples show desired thinking patterns. Model learns to emulate demonstrated reasoning approach.

Benefits: improved accuracy (especially math, logic), error detection (flawed reasoning becomes visible), debugging (understanding failures), and transparency (observable decision process). CoT particularly helps complex tasks.

Variants: zero-shot CoT (simple phrase triggers reasoning), least-to-most prompting (solving subproblems first), and self-consistency (multiple reasoning paths, majority vote). Variants suit different tasks.

Mastering CoT enables tackling complex reasoning tasks. CoT represents significant prompting breakthrough. Understanding CoT is essential for applications requiring multi-step reasoning.` },
          { title: 'Prompt Optimization', slug: 'aiml-prompt-optimization', order: 5, content: `Prompt Optimization

Prompt optimization systematically improves prompts through experimentation, measurement, and refinement. Optimization balances quality, cost, latency, and maintainability. Systematic optimization yields significant performance improvements.

Optimization approaches: A/B testing (comparing variants), metric-driven (quantitative evaluation), iterative refinement (continuous improvement), and automated optimization (DSPy, prompt tuning). Each approach suits different scenarios.

Metrics: accuracy (task correctness), quality scores (human/LLM ratings), latency (response time), cost (tokens used), and user satisfaction. Metrics guide optimization decisions. Multi-objective optimization balances trade-offs.

Techniques: prompt shortening (cost reduction), example optimization (best demonstrations), structure refinement (improved organization), and model selection (right model for task). Small changes yield large impacts.

Tools: promptfoo (testing frameworks), Humanloop (prompt management), LangSmith (monitoring), and custom evaluation harnesses. Tools enable systematic optimization workflows.

Mastering optimization enables production-grade prompts. Optimization transforms prototypes into reliable systems. Understanding optimization is essential for cost-effective, high-quality LLM applications.` },
          { title: 'Zero-Shot Prompting', slug: 'aiml-zero-shot-prompting', order: 6, content: `Zero-Shot Prompting

Zero-shot prompting performs tasks without examples, relying solely on instructions and model capabilities. Zero-shot is simplest prompting approach, suitable when task descriptions suffice. Zero-shot reduces prompt length and complexity.

Zero-shot pattern: clear instruction describing task, input data, optional output format specification. No examples provided. Model leverages pre-training knowledge.

Strengths: simplicity (minimal prompt engineering), flexibility (adapts to varied inputs), efficiency (shorter prompts), and discovery (exploring model capabilities). Zero-shot tests baseline performance.

Limitations: lower accuracy than few-shot (for complex tasks), inconsistent outputs (less guidance), and format control challenges. Performance varies by task complexity and model capability.

When to use: simple tasks, diverse inputs (hard to provide representative examples), rapid prototyping, and exploration. Zero-shot appropriate for straightforward applications.

Mastering zero-shot enables rapid deployment. Zero-shot serves as baseline for comparing advanced techniques. Understanding when zero-shot suffices prevents over-engineering simple solutions.` },
          { title: 'Prompt Templates', slug: 'aiml-prompt-templates', order: 7, content: `Prompt Templates

Prompt templates provide reusable prompt structures with variables for dynamic content. Templates enable consistency, maintainability, and team collaboration. Professional prompt engineering relies heavily on well-designed templates.

Template structure: static instruction parts (consistent across uses), variables (dynamic content insertion—user input, context), and optional sections (conditional inclusions). Templates balance flexibility with consistency.

Template types: task templates (specific operations—summarization, extraction), domain templates (industry-specific—medical, legal), and format templates (output structure—JSON, markdown). Different templates serve different needs.

Template management: version control (Git), documentation (usage guidelines), testing (validation), and sharing (template libraries). Management practices enable team collaboration and quality control.

Best practices: parameterization (clear variable names), documentation (usage examples), validation (input checking), and versioning (change tracking). Practices prevent template misuse and errors.

Mastering template development enables scalable prompt engineering. Templates accelerate development and ensure consistency. Understanding template patterns is essential for production LLM applications.` }
        ]
      }
    }
  });
  console.log('✅ Prompt Engineering: 7 topics');

  // ==========================================================================
  // BATCH 9: Reference → Interview Q&A
  // ==========================================================================
  console.log('\n📦 BATCH 9: Reference → Interview Q&A');

  // 28. PYTHON REFERENCE
  await prisma.learnCategory.create({
    data: {
      title: 'Python Reference',
      order: 28,
      domainId: domain.id,
      topics: {
        create: [
          { title: 'Syntax Reference', slug: 'aiml-syntax-reference', order: 1, content: `Syntax Reference

Python syntax defines language structure—statements, expressions, blocks, and rules. Understanding syntax is foundational to writing correct Python code. Python's clear syntax emphasizes readability and simplicity.

Core syntax: indentation (defines blocks, typically 4 spaces), statements (lines of code), expressions (evaluating to values), and comments (# for single-line, ''' for multi-line). Indentation is syntactically significant.

Control flow: if/elif/else (conditionals), for/while (loops), break/continue (loop control), and try/except (exception handling). Control flow structures program logic.

Functions: def (definition), parameters (inputs), return (outputs), and docstrings (documentation). Functions enable code reuse and organization.

Data structures: lists [], tuples (), dictionaries {}, and sets. Comprehensions provide concise creation syntax. Python's syntax makes data manipulation intuitive.

This reference provides quick syntax lookup for Python development. Mastering Python syntax enables fluent coding. Syntax knowledge accelerates development and debugging.` },
          { title: 'Built-in Functions', slug: 'aiml-built-in-functions', order: 2, content: `Built-in Functions

Python built-in functions provide core functionality without imports. These functions handle common operations—I/O, type conversion, iteration, and more. Mastering built-ins increases productivity significantly.

Common functions: print() (output), input() (user input), len() (length), type() (type checking), range() (number sequences), and str/int/float() (type conversion). These functions are constantly used.

Iteration: enumerate() (index + value), zip() (parallel iteration), map() (apply function), filter() (conditional selection), and sorted() (ordering). Built-ins enable concise data processing.

Utilities: abs() (absolute value), sum() (summation), min/max() (extremes), round() (rounding), and all/any() (boolean tests). Math and logic utilities simplify calculations.

Advanced: eval() (execute code), exec() (run statements), compile() (create code objects), and globals/locals() (namespace access). Use advanced functions carefully.

This reference provides built-in function overview for quick lookup. Built-in mastery eliminates unnecessary imports. Understanding built-ins is fundamental to Pythonic code.` },
          { title: 'Keywords Reference', slug: 'aiml-keywords-reference', order: 3, content: `Keywords Reference

Python keywords are reserved words with special meanings. Keywords define control flow, operations, and declarations. Understanding keywords is essential for reading and writing Python.

Control flow keywords: if, elif, else (conditionals), for, while (loops), break, continue, pass (loop control), and return, yield (function control). Control flow structures program logic.

Logical keywords: and, or, not (boolean operations), True, False, None (constants), and is, in (identity and membership). Logical keywords enable conditions and comparisons.

Definition keywords: def (functions), class (classes), lambda (anonymous functions), and global, nonlocal (scope). Definition keywords create program structure.

Exception keywords: try, except, finally (exception handling), raise (throwing exceptions), and assert (debugging checks). Exception keywords enable robust error handling.

Other keywords: import, from, as (module imports), with (context managers), del (deletion). Each keyword serves specific language functionality.

This reference provides comprehensive keyword overview. Keyword mastery is fundamental to Python proficiency. Keywords cannot be used as variable names.` },
          { title: 'Data Types Reference', slug: 'aiml-data-types-reference', order: 4, content: `Data Types Reference

Python data types categorize values—numbers, strings, collections, booleans. Types determine available operations and memory representation. Understanding types prevents errors and enables appropriate data structure selection.

Numeric types: int (integers), float (decimals), complex (real + imaginary), and bool (True/False). Numeric types support arithmetic operations.

Text type: str (strings, text data). Strings support indexing, slicing, concatenation, and many methods. Immutable sequence of characters.

Sequence types: list (mutable ordered collection), tuple (immutable ordered collection), and range (number sequences). Sequences support indexing and iteration.

Mapping type: dict (key-value pairs, associative arrays). Dictionaries provide fast lookup by key. Unordered (Python 3.7+ maintains insertion order).

Set types: set (mutable unique elements), frozenset (immutable unique elements). Sets support mathematical set operations.

Type checking: type() returns type, isinstance() checks type. Type hints (PEP 484) enable static type checking with mypy.

This reference provides data type overview for quick lookup. Type mastery enables effective data modeling. Understanding types is fundamental to Python programming.` }
        ]
      }
    }
  });
  console.log('✅ Python Reference: 4 topics');

  // 29. MODULE REFERENCE
  await prisma.learnCategory.create({
    data: {
      title: 'Module Reference',
      order: 29,
      domainId: domain.id,
      topics: {
        create: [
          { title: 'NumPy Reference', slug: 'aiml-numpy-reference', order: 1, content: `NumPy Reference

NumPy provides numerical computing capabilities—multi-dimensional arrays, mathematical functions, linear algebra. NumPy is foundational to scientific Python. This reference covers essential NumPy operations.

Array creation: np.array() (from lists), np.zeros/ones/empty() (initialized arrays), np.arange() (ranges), np.linspace() (evenly spaced values). Array creation is starting point for NumPy operations.

Array operations: arithmetic (+, -, *, /), aggregations (sum, mean, std), reshaping (reshape, flatten, transpose), indexing (slicing, boolean indexing), and broadcasting (automatic size adjustment).

Mathematical functions: trigonometric (sin, cos), exponential (exp, log), rounding (round, floor, ceil), statistical (mean, median, std), and linear algebra (dot, matmul, inv).

Useful attributes: shape (dimensions), dtype (data type), size (total elements), ndim (number of dimensions). Attributes provide array information.

This reference provides quick NumPy lookup. NumPy documentation (numpy.org) offers comprehensive details. Mastering NumPy enables efficient numerical computing.` },
          { title: 'Pandas Reference', slug: 'aiml-pandas-reference', order: 2, content: `Pandas Reference

Pandas provides data manipulation and analysis tools—DataFrames, Series, data cleaning, transformations. Pandas is essential for data science workflows. This reference covers core Pandas operations.

Data structures: DataFrame (2D table), Series (1D array). DataFrames are primary Pandas structure for tabular data.

Data loading: pd.read_csv(), read_excel(), read_json(), read_sql(). Pandas reads diverse formats. df.to_csv(), to_excel() write data.

Data selection: df['column'], df[['col1', 'col2']] (columns), df.loc[] (label-based), df.iloc[] (position-based), df.query() (SQL-like). Selection enables data access.

Data operations: df.head/tail() (preview), df.describe() (statistics), df.groupby() (aggregation), df.merge/join() (combining DataFrames), df.fillna/dropna() (missing data).

Transformations: df.apply() (custom functions), df.map() (element-wise), df.sort_values() (ordering), df.pivot_table() (pivoting).

This reference provides Pandas quick lookup. Pandas documentation offers comprehensive guides. Mastering Pandas enables efficient data manipulation.` },
          { title: 'Matplotlib Reference', slug: 'aiml-matplotlib-reference', order: 3, content: `Matplotlib Reference

Matplotlib provides data visualization—plots, charts, figures. Matplotlib is fundamental to scientific visualization in Python. This reference covers essential plotting operations.

Basic plotting: plt.plot() (line plots), plt.scatter() (scatter plots), plt.bar() (bar charts), plt.hist() (histograms), plt.pie() (pie charts). Basic plots cover most visualization needs.

Figure management: plt.figure() (create figure), plt.subplot() (multiple plots), plt.subplots() (grid layout), plt.savefig() (save image). Figure management organizes complex visualizations.

Customization: plt.xlabel/ylabel() (axis labels), plt.title() (title), plt.legend() (legend), plt.xlim/ylim() (axis limits), plt.grid() (gridlines). Customization improves plot clarity.

Styling: colors (color='red'), markers (marker='o'), linestyles (linestyle='--'), sizes (size parameters). Styling enhances visual communication.

Advanced: plt.imshow() (images), plt.contour() (contour plots), plt.3D plots (mplot3d toolkit), animations. Advanced features enable sophisticated visualizations.

This reference provides Matplotlib quick lookup. Matplotlib documentation offers extensive examples. Mastering Matplotlib enables effective data communication.` },
          { title: 'Scikit-learn Reference', slug: 'aiml-scikit-learn-reference', order: 4, content: `Scikit-learn Reference

Scikit-learn provides machine learning algorithms—classification, regression, clustering, preprocessing. Scikit-learn is goto library for traditional ML. This reference covers essential scikit-learn operations.

Workflow: load data → split (train/test) → preprocess (scaling, encoding) → train model → evaluate → predict. Scikit-learn provides tools for each step.

Classifiers: LogisticRegression, DecisionTreeClassifier, RandomForestClassifier, SVC (Support Vector), KNeighborsClassifier. Classifiers predict categorical outcomes.

Regressors: LinearRegression, Ridge, Lasso, DecisionTreeRegressor, RandomForestRegressor. Regressors predict continuous values.

Clustering: KMeans, DBSCAN, AgglomerativeClustering. Clustering finds data groupings.

Preprocessing: StandardScaler (standardization), MinMaxScaler (normalization), LabelEncoder (category encoding), train_test_split (data splitting).

Evaluation: accuracy_score, precision_recall_fscore, confusion_matrix, roc_auc_score, mean_squared_error. Metrics assess model performance.

This reference provides scikit-learn quick lookup. Scikit-learn documentation offers comprehensive guides. Mastering scikit-learn enables practical ML development.` }
        ]
      }
    }
  });
  console.log('✅ Module Reference: 4 topics');

  // 30. PYTHON HOW-TO
  await prisma.learnCategory.create({
    data: {
      title: 'Python How-To',
      order: 30,
      domainId: domain.id,
      topics: {
        create: [
          { title: 'How to Install Python', slug: 'aiml-how-to-install-python', order: 1, content: `How to Install Python

Python installation varies by operating system. Modern Python (3.10+) recommended for AI/ML development. This guide covers installation and verification.

**Windows:** Download from python.org, run installer, check "Add Python to PATH", verify with python --version in Command Prompt. Microsoft Store provides alternative installation.

**macOS:** Pre-installed (often outdated). Use Homebrew: brew install python3. Or download from python.org. Verify with python3 --version.

**Linux:** Usually pre-installed. Update with package manager: sudo apt install python3 python3-pip (Ubuntu/Debian) or sudo yum install python3 (RedHat/CentOS).

**Verification:** Open terminal/command prompt, run python --version or python3 --version. Should show Python 3.x.x.

**Next steps:** Install pip (Python package installer), setup virtual environments (venv), install common packages (numpy, pandas, matplotlib), configure IDE (VS Code, PyCharm).

Proper installation is foundation for Python development. Virtual environments prevent package conflicts. Development environment setup ensures smooth workflow.` },
          { title: 'How to Setup Environment', slug: 'aiml-how-to-setup-environment', order: 2, content: `How to Setup Environment

Python environments isolate project dependencies, preventing conflicts. Virtual environments are best practice for Python development. This guide covers environment setup.

**Virtual environment:** python -m venv myenv creates environment. Activate: myenv\\Scripts\\activate (Windows) or source myenv/bin/activate (macOS/Linux). Deactivate: deactivate.

**Conda:** conda create -n myenv python=3.10 creates environment. Activate: conda activate myenv. Conda manages Python and non-Python dependencies.

**Managing packages:** pip install package_name installs packages. pip freeze > requirements.txt saves dependencies. pip install -r requirements.txt installs from requirements.

**IDE setup:** Configure VS Code (Python extension, select interpreter), PyCharm (auto-detects environments), or Jupyter (install ipykernel in environment).

**Best practices:** One environment per project, document dependencies (requirements.txt), use .gitignore to exclude environment folders, regularly update packages.

Environment management prevents dependency conflicts. Proper setup enables reproducible development. Environment discipline is professional Python practice.` },
          { title: 'How to Debug Code', slug: 'aiml-how-to-debug-code', order: 3, content: `How to Debug Code

Debugging identifies and fixes code errors. Systematic debugging saves time and frustration. This guide covers Python debugging techniques.

**Print debugging:** Insert print() statements to inspect variables. Simple but effective. print(f"Variable x: {x}") shows values during execution.

**Python debugger (pdb):** import pdb; pdb.set_trace() creates breakpoint. Commands: n (next line), s (step into), c (continue), p variable (print), q (quit). Terminal-based debugging.

**IDE debuggers:** VS Code and PyCharm provide visual debuggers. Set breakpoints (click line numbers), run with debugger, inspect variables, step through code. Visual debugging more intuitive than pdb.

**Exception handling:** try/except blocks catch errors gracefully. traceback.print_exc() shows full error details. logging module records debugging information.

**Common issues:** Indentation errors (check spaces/tabs), NameError (undefined variables), IndexError (list/array access), TypeError (wrong types), AttributeError (nonexistent attributes).

Effective debugging accelerates development. Debuggers reveal program state at execution points. Debugging skills separate beginners from experienced developers.` },
          { title: 'How to Handle Errors', slug: 'aiml-how-to-handle-errors', order: 4, content: `How to Handle Errors

Error handling prevents program crashes and provides graceful failure. Try/except blocks catch exceptions, enabling appropriate responses. This guide covers Python error handling.

**Basic try/except:** try: risky_operation() except Exception as e: handle_error(e). Catches exceptions, prevents crashes.

**Specific exceptions:** except ValueError, except FileNotFoundError, except KeyError. Catch specific exceptions for targeted handling. More precise than catching all exceptions.

**Multiple exceptions:** except (ValueError, TypeError) as e: handles multiple exception types. except ValueError: except TypeError: handles differently.

**Else and finally:** else: runs if no exception. finally: always runs (cleanup code). Pattern: try/except/else/finally covers all scenarios.

**Raising exceptions:** raise ValueError("Invalid input") creates custom exceptions. Assert statements: assert condition, "message" for debugging checks.

**Best practices:** Don't catch exceptions silently (log them), be specific (avoid bare except:), use appropriate exception types, clean up resources (use finally or context managers).

Proper error handling creates robust applications. Errors are inevitable—handling them gracefully distinguishes professional code.` },
          { title: 'How to Optimize Code', slug: 'aiml-how-to-optimize-code', order: 5, content: `How to Optimize Code

Code optimization improves performance—faster execution, lower memory usage. Optimization should follow correctness—premature optimization wastes time. This guide covers Python optimization techniques.

**Profiling:** Measure before optimizing. cProfile identifies slow functions. timeit measures snippet execution time. line_profiler shows line-by-line timing. Profiling reveals actual bottlenecks.

**Algorithm optimization:** Choose appropriate data structures (dict lookup O(1) vs list O(n)), use built-in functions (sum() faster than manual loops), leverage comprehensions (faster than loops).

**NumPy vectorization:** Replace Python loops with NumPy operations. Vectorized operations dramatically faster. Essential for numerical computing.

**Memory optimization:** Generators instead of lists (lazy evaluation), del to free memory, __slots__ in classes (reduce memory overhead).

**Compilation:** Numba (JIT compilation for numerical code), Cython (compile Python to C). Dramatic speedups for computation-heavy code.

**Caching:** functools.lru_cache caches function results. Avoid redundant computation. Memoization for recursive functions.

Optimization is engineering trade-off—performance vs readability. Profile first, optimize bottlenecks. Readable code often sufficiently fast.` }
        ]
      }
    }
  });
  console.log('✅ Python How-To: 5 topics');

  // 31. PYTHON EXAMPLES
  await prisma.learnCategory.create({
    data: {
      title: 'Python Examples',
      order: 31,
      domainId: domain.id,
      topics: {
        create: [
          { title: 'Basic Examples', slug: 'aiml-basic-examples', order: 1, content: `Basic Examples

Basic Python examples demonstrate fundamental concepts through practical code. Examples reinforce learning and provide templates for common tasks. This collection covers core Python patterns.

**Variables and types:** x = 10 (integer), y = 3.14 (float), name = "Alice" (string), is_valid = True (boolean). Type inference simplifies declarations.

**Control flow:** if-else conditionals, for loops over ranges/lists, while loops with conditions, break/continue for loop control. Control flow structures program logic.

**Functions:** def greet(name): return f"Hello, {name}" defines functions. Parameters enable reusability. Return values output results.

**Data structures:** Lists [1, 2, 3], dictionaries {"key": "value"}, tuples (immutable), sets (unique elements). Choosing appropriate structures improves efficiency.

**List comprehensions:** [x**2 for x in range(10)] creates lists concisely. More Pythonic than explicit loops. Comprehensions enhance readability.

Basic examples provide foundation for advanced Python. Practice with examples builds proficiency. Examples demonstrate idiomatic Python style.` },
          { title: 'NumPy Examples', slug: 'aiml-numpy-examples', order: 2, content: `NumPy Examples

NumPy examples demonstrate numerical computing operations. Examples show array manipulation, mathematical operations, and performance patterns. This collection covers practical NumPy usage.

**Array creation:** np.array([1, 2, 3]), np.zeros((3, 3)), np.arange(10), np.linspace(0, 1, 100). Multiple creation methods suit different needs.

**Operations:** array arithmetic (a + b, a * 2), matrix multiplication (np.dot(), @), aggregations (a.sum(), a.mean(), a.std()). Vectorized operations are efficient.

**Indexing:** a[0], a[1:5], a[a > 5] (boolean indexing), a[:, 0] (column selection). Flexible indexing enables data access.

**Reshaping:** a.reshape(3, 4), a.flatten(), a.T (transpose). Reshaping adapts arrays to requirements.

**Broadcasting:** Operations on different-shaped arrays automatically broadcast. Broadcasting eliminates manual loops.

NumPy examples show efficient numerical computing. Vectorization dramatically outperforms loops. Mastering NumPy patterns accelerates data science workflows.` },
          { title: 'Pandas Examples', slug: 'aiml-pandas-examples', order: 3, content: `Pandas Examples

Pandas examples demonstrate data manipulation and analysis. Examples show DataFrame operations, data cleaning, and transformations. This collection covers typical Pandas workflows.

**Loading data:** pd.read_csv('data.csv'), pd.read_excel('data.xlsx'). Loading is first step in analysis.

**Selection:** df['column'], df[['col1', 'col2']], df.loc[condition], df.iloc[0:5]. Flexible selection access data.

**Filtering:** df[df['age'] > 25], df.query('age > 25'). Filtering subsets data by conditions.

**Aggregation:** df.groupby('category')['sales'].sum(), df.pivot_table(). Group-by enables summary statistics.

**Cleaning:** df.dropna() (remove missing), df.fillna(0) (fill missing), df.drop_duplicates() (remove duplicates). Cleaning prepares data for analysis.

**Merging:** pd.merge(df1, df2, on='key'), pd.concat([df1, df2]). Combining DataFrames integrates data sources.

Pandas examples demonstrate practical data workflows. Mastering Pandas patterns accelerates analysis. Examples show idiomatic Pandas usage.` },
          { title: 'ML Examples', slug: 'aiml-ml-examples', order: 4, content: `ML Examples

Machine learning examples demonstrate complete ML workflows. Examples cover classification, regression, and model evaluation. This collection shows practical ML implementation.

**Classification:** from sklearn.ensemble import RandomForestClassifier; model = RandomForestClassifier(); model.fit(X_train, y_train); predictions = model.predict(X_test). Complete classification pipeline.

**Regression:** from sklearn.linear_model import LinearRegression; model = LinearRegression(); model.fit(X_train, y_train); predictions = model.predict(X_test). Regression predicts continuous values.

**Data splitting:** from sklearn.model_selection import train_test_split; X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2). Train/test split enables evaluation.

**Preprocessing:** from sklearn.preprocessing import StandardScaler; scaler = StandardScaler(); X_scaled = scaler.fit_transform(X). Scaling improves model performance.

**Evaluation:** from sklearn.metrics import accuracy_score, classification_report; accuracy = accuracy_score(y_test, predictions). Metrics assess model quality.

ML examples show end-to-end workflows. Examples demonstrate scikit-learn patterns. Mastering examples accelerates ML development.` },
          { title: 'Project Examples', slug: 'aiml-project-examples', order: 5, content: `Project Examples

Project examples demonstrate complete applications. Examples integrate multiple concepts into cohesive solutions. This collection shows practical project structures.

**Data analysis project:** Load CSV, clean data, exploratory analysis, visualizations, insights report. Complete analysis workflow from raw data to conclusions.

**ML prediction project:** Collect data, preprocess features, train model, evaluate performance, save model, create prediction API. End-to-end ML development.

**Web scraping project:** Request pages, parse HTML (BeautifulSoup), extract data, store in database/CSV. Data collection automation.

**Automation script:** Read files, process data, generate reports, send emails. Task automation saves time.

**API integration:** Call external APIs, process responses, store results, error handling. API usage enables functionality integration.

Project examples show real-world applications. Projects integrate multiple skills. Building projects cements learning through practice.` }
        ]
      }
    }
  });
  console.log('✅ Python Examples: 5 topics');

  // 32. PYTHON INTERVIEW Q&A
  await prisma.learnCategory.create({
    data: {
      title: 'Python Interview Q&A',
      order: 32,
      domainId: domain.id,
      topics: {
        create: [
          { title: 'Python Basics Q&A', slug: 'aiml-python-basics-qa', order: 1, content: `Python Basics Q&A

Common Python interview questions covering fundamentals. Preparation with these questions builds confidence for technical interviews. This collection addresses frequently asked basics.

**Q: What is Python?** A: High-level, interpreted, dynamically-typed programming language emphasizing readability. Used for web development, data science, ML, automation.

**Q: Python 2 vs Python 3?** A: Python 3 (current) adds Unicode support, print function, better division. Python 2 reached end-of-life (2020). Use Python 3.

**Q: Mutable vs immutable?** A: Mutable objects (lists, dicts) can change after creation. Immutable (strings, tuples, numbers) cannot. Immutability prevents unexpected modifications.

**Q: List vs tuple?** A: Lists mutable, tuples immutable. Lists use [], tuples (). Tuples slightly faster, suitable for fixed data.

**Q: What are list comprehensions?** A: Concise syntax creating lists: [x**2 for x in range(10)]. More Pythonic than explicit loops.

**Q: Explain *args and **kwargs?** A: *args accepts variable positional arguments, **kwargs accepts variable keyword arguments. Enable flexible function signatures.

Preparing basics questions ensures interview readiness. Articulating fundamentals demonstrates understanding. Practice explanations improve communication.` },
          { title: 'OOP Q&A', slug: 'aiml-oop-qa', order: 2, content: `OOP Q&A

Object-oriented programming interview questions. OOP concepts frequently appear in Python interviews. This collection covers essential OOP topics.

**Q: What is OOP?** A: Programming paradigm organizing code into objects with data (attributes) and behavior (methods). Enables encapsulation, inheritance, polymorphism.

**Q: Class vs instance?** A: Class is blueprint, instance is object created from class. class Dog defines structure, fido = Dog() creates instance.

**Q: Explain inheritance?** A: Class inheriting attributes/methods from parent class. Enables code reuse. class Puppy(Dog) inherits from Dog.

**Q: What is encapsulation?** A: Bundling data and methods, restricting direct access. Uses private attributes (convention: _private, __private). Protects internal state.

**Q: Explain polymorphism?** A: Same interface, different implementations. Method overriding (child class redefines parent method) demonstrates polymorphism.

**Q: __init__ vs __new__?** A: __new__ creates instance (rarely overridden), __init__ initializes instance (commonly used constructor).

OOP questions test design understanding. OOP patterns enable scalable code. Mastering OOP concepts is essential for intermediate-level interviews.` },
          { title: 'Data Structures Q&A', slug: 'aiml-data-structures-qa', order: 3, content: `Data Structures Q&A

Data structure interview questions covering implementation and usage. Data structure knowledge demonstrates algorithmic thinking. This collection addresses common questions.

**Q: Implement stack?** A: Use list with append() (push) and pop(). LIFO (last in, first out) structure.

**Q: Implement queue?** A: Use collections.deque with append() (enqueue) and popleft() (dequeue). FIFO (first in, first out) structure.

**Q: Hash table in Python?** A: Dictionary is hash table implementation. O(1) average lookup, insertion, deletion. Underlying structure uses hash function.

**Q: Explain time complexity?** A: Measures algorithm speed growth with input size. O(1) constant, O(n) linear, O(n^2) quadratic, O(log n) logarithmic. Big O notation describes worst case.

**Q: When use list vs dict?** A: Lists for ordered collections, sequential access. Dicts for key-based lookup, O(1) access. Choose based on access patterns.

**Q: Implement linked list?** A: Define Node class with data and next pointer. LinkedList class manages head. Practice implementing insert, delete, traverse.

Data structure questions assess problem-solving skills. Understanding complexity is crucial. Practice implementations builds confidence.` },
          { title: 'ML Interview Q&A', slug: 'aiml-ml-interview-qa', order: 4, content: `ML Interview Q&A

Machine learning interview questions covering theory and practice. ML interviews test both conceptual understanding and implementation skills. This collection addresses common topics.

**Q: Supervised vs unsupervised learning?** A: Supervised uses labeled data (classification, regression). Unsupervised finds patterns in unlabeled data (clustering, dimensionality reduction).

**Q: Overfitting vs underfitting?** A: Overfitting: model memorizes training data, poor generalization. Underfitting: model too simple, misses patterns. Balance through regularization, proper complexity.

**Q: Explain cross-validation?** A: Technique assessing model performance by training on subsets, testing on held-out data. K-fold splits data into k parts. Prevents overfitting to single train/test split.

**Q: Bias-variance tradeoff?** A: Bias: error from wrong assumptions (underfitting). Variance: error from sensitivity to training data (overfitting). Optimal model balances both.

**Q: How choose algorithm?** A: Consider: problem type (classification/regression), data size, feature count, interpretability needs, performance requirements. Start simple (linear models), increase complexity if needed.

**Q: Explain feature engineering?** A: Creating informative features from raw data. Improves model performance. Includes scaling, encoding, interaction terms, domain-specific transformations.

ML questions test theoretical and practical knowledge. Understanding trade-offs demonstrates maturity. Prepare both concepts and implementations.` },
          { title: 'Coding Challenges', slug: 'aiml-coding-challenges', order: 5, content: `Coding Challenges

Common coding challenges in Python interviews. Practice challenges builds problem-solving skills and coding fluency. This collection covers frequently asked problems.

**FizzBuzz:** Print numbers 1-100. For multiples of 3 print "Fizz", multiples of 5 print "Buzz", multiples of both print "FizzBuzz". Classic screening question.

**Reverse string:** Multiple approaches: slicing (s[::-1]), loop with concatenation, two-pointer swap. Discuss time/space complexity.

**Find duplicates:** Given list, find duplicates. Solutions: set (track seen), Counter (count occurrences), sorting + adjacent comparison. Discuss trade-offs.

**Two sum:** Find two numbers summing to target. Brute force O(n^2), hash table O(n). Demonstrate optimization thinking.

**Linked list reversal:** Reverse linked list iteratively or recursively. Common data structure question testing pointer manipulation.

**Balanced parentheses:** Check if parentheses balanced. Use stack: push opening, pop matching closing. Tests stack understanding.

Coding challenges assess implementation skills. Practice various difficulty levels. Explain approach before coding, discuss alternatives, analyze complexity.

Interviews combine conceptual questions with live coding. Preparation across all areas ensures readiness. Practice articulating thought process while coding.` }
        ]
      }
    }
  });
  console.log('✅ Python Interview Q&A: 5 topics');

  console.log('\n🎉 AI/ML Platform Seed Complete!');
  console.log('📊 Final Summary:');
  console.log('   ✅ 32 Categories Created');
  console.log('   ✅ 282+ Topics with Content');
  console.log('   ✅ Complete Python → GenAI → Agentic AI → LLMOps Coverage');
  console.log('   ✅ Production-Ready Bootstrap Content');
}

seedAIML()
  .catch((e) => {
    console.error('❌ Seed Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
