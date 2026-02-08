'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Code, Box, FileText, Package, Grid3x3, Table, BarChart3, TrendingUp, Calculator, Database, Brain, GitBranch, HardDrive, Cpu, BookOpen, MessageSquare, Book, Layers, Lightbulb, Code2, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

const pythonTopics = [
  { title: 'Python Introduction', href: '/learn/aiml/python/aiml-python-introduction' },
  { title: 'Python Variables', href: '/learn/aiml/python/aiml-python-variables' },
  { title: 'Python Data Types', href: '/learn/aiml/python/aiml-python-data-types' },
  { title: 'Python Operators', href: '/learn/aiml/python/aiml-python-operators' },
  { title: 'Python Conditions', href: '/learn/aiml/python/aiml-python-conditions' },
  { title: 'Python Loops', href: '/learn/aiml/python/aiml-python-loops' },
  { title: 'Python Functions', href: '/learn/aiml/python/aiml-python-functions' },
  { title: 'Python Strings', href: '/learn/aiml/python/aiml-python-strings' },
  { title: 'Python Lists', href: '/learn/aiml/python/aiml-python-lists' },
  { title: 'Python Tuples', href: '/learn/aiml/python/aiml-python-tuples' }
];

const oopTopics = [
  { title: 'OOP Introduction', href: '/learn/aiml/python-oop/aiml-oop-introduction' },
  { title: 'Classes', href: '/learn/aiml/python-oop/aiml-classes' },
  { title: 'Objects', href: '/learn/aiml/python-oop/aiml-objects' },
  { title: 'Inheritance', href: '/learn/aiml/python-oop/aiml-inheritance' },
  { title: 'Encapsulation', href: '/learn/aiml/python-oop/aiml-encapsulation' },
  { title: 'Polymorphism', href: '/learn/aiml/python-oop/aiml-polymorphism' },
  { title: 'Abstraction', href: '/learn/aiml/python-oop/aiml-abstraction' },
  { title: 'Constructors', href: '/learn/aiml/python-oop/aiml-constructors' },
  { title: 'Destructors', href: '/learn/aiml/python-oop/aiml-destructors' },
  { title: 'Methods', href: '/learn/aiml/python-oop/aiml-methods' }
];

const fileHandlingTopics = [
  { title: 'Reading Files', href: '/learn/aiml/file-handling/aiml-reading-files' },
  { title: 'Writing Files', href: '/learn/aiml/file-handling/aiml-writing-files' },
  { title: 'Deleting Files', href: '/learn/aiml/file-handling/aiml-deleting-files' },
  { title: 'Directory Operations', href: '/learn/aiml/file-handling/aiml-directory-operations' },
  { title: 'JSON Files', href: '/learn/aiml/file-handling/aiml-json-files' },
  { title: 'CSV Files', href: '/learn/aiml/file-handling/aiml-csv-files' },
  { title: 'File Exceptions', href: '/learn/aiml/file-handling/aiml-file-exceptions' }
];

const librariesTopics = [
  { title: 'Libraries Overview', href: '/learn/aiml/python-libraries/aiml-libraries-overview' },
  { title: 'DateTime Module', href: '/learn/aiml/python-libraries/aiml-datetime-module' },
  { title: 'Math Module', href: '/learn/aiml/python-libraries/aiml-math-module' },
  { title: 'Random Module', href: '/learn/aiml/python-libraries/aiml-random-module' },
  { title: 'OS Module', href: '/learn/aiml/python-libraries/aiml-os-module' },
  { title: 'Sys Module', href: '/learn/aiml/python-libraries/aiml-sys-module' },
  { title: 'Pip Package Manager', href: '/learn/aiml/python-libraries/aiml-pip-package-manager' }
];

const numpyTopics = [
  { title: 'NumPy Introduction', href: '/learn/aiml/numpy/aiml-numpy-introduction' },
  { title: 'NumPy Arrays', href: '/learn/aiml/numpy/aiml-numpy-arrays' },
  { title: 'Array Indexing', href: '/learn/aiml/numpy/aiml-array-indexing' },
  { title: 'Array Slicing', href: '/learn/aiml/numpy/aiml-array-slicing' },
  { title: 'Array Operations', href: '/learn/aiml/numpy/aiml-array-operations' },
  { title: 'Array Shape', href: '/learn/aiml/numpy/aiml-array-shape' },
  { title: 'Array Reshape', href: '/learn/aiml/numpy/aiml-array-reshape' },
  { title: 'Array Iteration', href: '/learn/aiml/numpy/aiml-array-iteration' },
  { title: 'Array Join', href: '/learn/aiml/numpy/aiml-array-join' },
  { title: 'Array Split', href: '/learn/aiml/numpy/aiml-array-split' }
];

const pandasTopics = [
  { title: 'Pandas Introduction', href: '/learn/aiml/pandas/aiml-pandas-introduction' },
  { title: 'Pandas Series', href: '/learn/aiml/pandas/aiml-pandas-series' },
  { title: 'Pandas DataFrames', href: '/learn/aiml/pandas/aiml-pandas-dataframes' },
  { title: 'Reading Data', href: '/learn/aiml/pandas/aiml-reading-data' },
  { title: 'Data Cleaning', href: '/learn/aiml/pandas/aiml-data-cleaning' },
  { title: 'Data Analysis', href: '/learn/aiml/pandas/aiml-data-analysis' },
  { title: 'Data Selection', href: '/learn/aiml/pandas/aiml-data-selection' },
  { title: 'Data Grouping', href: '/learn/aiml/pandas/aiml-data-grouping' },
  { title: 'Data Merging', href: '/learn/aiml/pandas/aiml-data-merging' },
  { title: 'Data Visualization', href: '/learn/aiml/pandas/aiml-pandas-visualization' }
];

const dataVizTopics = [
  { title: 'Matplotlib Introduction', href: '/learn/aiml/data-visualization/aiml-matplotlib-introduction' },
  { title: 'Line Plots', href: '/learn/aiml/data-visualization/aiml-line-plots' },
  { title: 'Scatter Plots', href: '/learn/aiml/data-visualization/aiml-scatter-plots' },
  { title: 'Bar Charts', href: '/learn/aiml/data-visualization/aiml-bar-charts' },
  { title: 'Histograms', href: '/learn/aiml/data-visualization/aiml-histograms' },
  { title: 'Pie Charts', href: '/learn/aiml/data-visualization/aiml-pie-charts' },
  { title: 'Subplots', href: '/learn/aiml/data-visualization/aiml-subplots' },
  { title: 'Customization', href: '/learn/aiml/data-visualization/aiml-customization' }
];

const statisticsTopics = [
  { title: 'Statistics Introduction', href: '/learn/aiml/statistics/aiml-statistics-introduction' },
  { title: 'Descriptive Statistics', href: '/learn/aiml/statistics/aiml-descriptive-statistics' },
  { title: 'Probability', href: '/learn/aiml/statistics/aiml-probability' },
  { title: 'Distributions', href: '/learn/aiml/statistics/aiml-distributions' },
  { title: 'Hypothesis Testing', href: '/learn/aiml/statistics/aiml-hypothesis-testing' },
  { title: 'Correlation', href: '/learn/aiml/statistics/aiml-correlation' },
  { title: 'Regression Analysis', href: '/learn/aiml/statistics/aiml-regression-analysis' }
];

const mathTopics = [
  { title: 'Math Introduction', href: '/learn/aiml/mathematics-for-ai/aiml-math-introduction' },
  { title: 'Linear Algebra', href: '/learn/aiml/mathematics-for-ai/aiml-linear-algebra' },
  { title: 'Calculus Basics', href: '/learn/aiml/mathematics-for-ai/aiml-calculus-basics' },
  { title: 'Derivatives', href: '/learn/aiml/mathematics-for-ai/aiml-derivatives' },
  { title: 'Gradients', href: '/learn/aiml/mathematics-for-ai/aiml-gradients' },
  { title: 'Vectors', href: '/learn/aiml/mathematics-for-ai/aiml-vectors' },
  { title: 'Matrices', href: '/learn/aiml/mathematics-for-ai/aiml-matrices' },
  { title: 'Optimization', href: '/learn/aiml/mathematics-for-ai/aiml-optimization' }
];

const dataScienceTopics = [
  { title: 'Data Science Introduction', href: '/learn/aiml/data-science/aiml-data-science-introduction' },
  { title: 'Data Collection', href: '/learn/aiml/data-science/aiml-data-collection' },
  { title: 'Data Preprocessing', href: '/learn/aiml/data-science/aiml-data-preprocessing' },
  { title: 'Feature Engineering', href: '/learn/aiml/data-science/aiml-feature-engineering' },
  { title: 'Exploratory Data Analysis', href: '/learn/aiml/data-science/aiml-exploratory-data-analysis' },
  { title: 'Data Pipeline', href: '/learn/aiml/data-science/aiml-data-pipeline' },
  { title: 'Model Evaluation', href: '/learn/aiml/data-science/aiml-model-evaluation' }
];

const mlTopics = [
  { title: 'What is Machine Learning', href: '/learn/aiml/machine-learning/aiml-what-is-ml' },
  { title: 'ML Types', href: '/learn/aiml/machine-learning/aiml-ml-types' },
  { title: 'Supervised Learning', href: '/learn/aiml/machine-learning/aiml-supervised-learning' },
  { title: 'Unsupervised Learning', href: '/learn/aiml/machine-learning/aiml-unsupervised-learning' },
  { title: 'Linear Regression', href: '/learn/aiml/machine-learning/aiml-linear-regression' },
  { title: 'Logistic Regression', href: '/learn/aiml/machine-learning/aiml-logistic-regression' },
  { title: 'Decision Trees', href: '/learn/aiml/machine-learning/aiml-decision-trees' },
  { title: 'Random Forests', href: '/learn/aiml/machine-learning/aiml-random-forests' },
  { title: 'Support Vector Machines', href: '/learn/aiml/machine-learning/aiml-svm' },
  { title: 'K-Nearest Neighbors', href: '/learn/aiml/machine-learning/aiml-knn' },
  { title: 'Clustering', href: '/learn/aiml/machine-learning/aiml-clustering' },
  { title: 'Neural Networks', href: '/learn/aiml/machine-learning/aiml-neural-networks' },
  { title: 'Deep Learning', href: '/learn/aiml/machine-learning/aiml-deep-learning' },
  { title: 'Model Training', href: '/learn/aiml/machine-learning/aiml-model-training' },
  { title: 'Overfitting & Underfitting', href: '/learn/aiml/machine-learning/aiml-overfitting-underfitting' }
];

const dsaTopics = [
  { title: 'DSA Introduction', href: '/learn/aiml/python-dsa/aiml-dsa-introduction' },
  { title: 'Arrays', href: '/learn/aiml/python-dsa/aiml-arrays' },
  { title: 'Linked Lists', href: '/learn/aiml/python-dsa/aiml-linked-lists' },
  { title: 'Stacks', href: '/learn/aiml/python-dsa/aiml-stacks' },
  { title: 'Queues', href: '/learn/aiml/python-dsa/aiml-queues' },
  { title: 'Trees', href: '/learn/aiml/python-dsa/aiml-trees' },
  { title: 'Graphs', href: '/learn/aiml/python-dsa/aiml-graphs' },
  { title: 'Sorting Algorithms', href: '/learn/aiml/python-dsa/aiml-sorting-algorithms' },
  { title: 'Searching Algorithms', href: '/learn/aiml/python-dsa/aiml-searching-algorithms' },
  { title: 'Big O Notation', href: '/learn/aiml/python-dsa/aiml-big-o-notation' }
];

const dbTopics = [
  { title: 'Database Overview', href: '/learn/aiml/python-databases/aiml-database-overview' },
  { title: 'MySQL Basics', href: '/learn/aiml/python-databases/aiml-mysql-basics' },
  { title: 'MySQL Connector', href: '/learn/aiml/python-databases/aiml-mysql-connector' },
  { title: 'SQL Queries', href: '/learn/aiml/python-databases/aiml-sql-queries' },
  { title: 'MongoDB Basics', href: '/learn/aiml/python-databases/aiml-mongodb-basics' },
  { title: 'PyMongo', href: '/learn/aiml/python-databases/aiml-pymongo' },
  { title: 'CRUD Operations', href: '/learn/aiml/python-databases/aiml-crud-operations' },
  { title: 'Database Design', href: '/learn/aiml/python-databases/aiml-database-design' }
];

const tensorflowTopics = [
  { title: 'TensorFlow Introduction', href: '/learn/aiml/tensorflow/aiml-tensorflow-introduction' },
  { title: 'Keras API', href: '/learn/aiml/tensorflow/aiml-keras-api' },
  { title: 'Building Models', href: '/learn/aiml/tensorflow/aiml-building-models' },
  { title: 'Training Models', href: '/learn/aiml/tensorflow/aiml-training-models' },
  { title: 'TensorFlow.js', href: '/learn/aiml/tensorflow/aiml-tensorflowjs' },
  { title: 'ML.js Overview', href: '/learn/aiml/tensorflow/aiml-mljs-overview' },
  { title: 'Browser ML', href: '/learn/aiml/tensorflow/aiml-browser-ml' }
];

const aiHistoryTopics = [
  { title: 'History of AI', href: '/learn/aiml/ai-history/aiml-history-of-ai' },
  { title: 'AI Evolution', href: '/learn/aiml/ai-history/aiml-ai-evolution' },
  { title: 'AI Theory', href: '/learn/aiml/ai-history/aiml-ai-theory' },
  { title: 'Turing Test', href: '/learn/aiml/ai-history/aiml-turing-test' },
  { title: 'AI Ethics', href: '/learn/aiml/ai-history/aiml-ai-ethics' }
];

const promptEngTopics = [
  { title: 'Prompt Engineering Basics', href: '/learn/aiml/prompt-engineering/aiml-prompt-basics' },
  { title: 'Prompt Design', href: '/learn/aiml/prompt-engineering/aiml-prompt-design' },
  { title: 'Few-Shot Learning', href: '/learn/aiml/prompt-engineering/aiml-few-shot-learning' },
  { title: 'Chain of Thought', href: '/learn/aiml/prompt-engineering/aiml-chain-of-thought' },
  { title: 'Prompt Optimization', href: '/learn/aiml/prompt-engineering/aiml-prompt-optimization' }
];

const pythonRefTopics = [
  { title: 'Syntax Reference', href: '/learn/aiml/python-reference/aiml-syntax-reference' },
  { title: 'Built-in Functions', href: '/learn/aiml/python-reference/aiml-builtin-functions' },
  { title: 'Keywords Reference', href: '/learn/aiml/python-reference/aiml-keywords-reference' },
  { title: 'Data Types Reference', href: '/learn/aiml/python-reference/aiml-datatypes-reference' }
];

const moduleRefTopics = [
  { title: 'NumPy Reference', href: '/learn/aiml/module-reference/aiml-numpy-reference' },
  { title: 'Pandas Reference', href: '/learn/aiml/module-reference/aiml-pandas-reference' },
  { title: 'Matplotlib Reference', href: '/learn/aiml/module-reference/aiml-matplotlib-reference' },
  { title: 'Scikit-learn Reference', href: '/learn/aiml/module-reference/aiml-sklearn-reference' }
];

const howToTopics = [
  { title: 'How to Install Python', href: '/learn/aiml/python-howto/aiml-install-python' },
  { title: 'How to Setup Environment', href: '/learn/aiml/python-howto/aiml-setup-environment' },
  { title: 'How to Debug Code', href: '/learn/aiml/python-howto/aiml-debug-code' },
  { title: 'How to Handle Errors', href: '/learn/aiml/python-howto/aiml-handle-errors' },
  { title: 'How to Optimize Code', href: '/learn/aiml/python-howto/aiml-optimize-code' }
];

const examplesTopics = [
  { title: 'Basic Examples', href: '/learn/aiml/python-examples/aiml-basic-examples' },
  { title: 'NumPy Examples', href: '/learn/aiml/python-examples/aiml-numpy-examples' },
  { title: 'Pandas Examples', href: '/learn/aiml/python-examples/aiml-pandas-examples' },
  { title: 'ML Examples', href: '/learn/aiml/python-examples/aiml-ml-examples' },
  { title: 'Project Examples', href: '/learn/aiml/python-examples/aiml-project-examples' }
];

const interviewTopics = [
  { title: 'Python Basics Q&A', href: '/learn/aiml/python-interview/aiml-python-basics-qa' },
  { title: 'OOP Q&A', href: '/learn/aiml/python-interview/aiml-oop-qa' },
  { title: 'Data Structures Q&A', href: '/learn/aiml/python-interview/aiml-data-structures-qa' },
  { title: 'ML Interview Q&A', href: '/learn/aiml/python-interview/aiml-ml-interview-qa' },
  { title: 'Coding Challenges', href: '/learn/aiml/python-interview/aiml-coding-challenges' }
];

const deepLearningTopics = [
  { title: 'Deep Learning Introduction', href: '/learn/aiml/deep-learning/aiml-deep-learning-introduction' },
  { title: 'Neural Networks', href: '/learn/aiml/deep-learning/aiml-neural-networks' },
  { title: 'Activation Functions', href: '/learn/aiml/deep-learning/aiml-activation-functions' },
  { title: 'Backpropagation', href: '/learn/aiml/deep-learning/aiml-backpropagation' },
  { title: 'Convolutional Neural Networks', href: '/learn/aiml/deep-learning/aiml-convolutional-neural-networks' },
  { title: 'Recurrent Neural Networks', href: '/learn/aiml/deep-learning/aiml-recurrent-neural-networks' },
  { title: 'LSTM Networks', href: '/learn/aiml/deep-learning/aiml-lstm-networks' },
  { title: 'GRU Networks', href: '/learn/aiml/deep-learning/aiml-gru-networks' },
  { title: 'Autoencoders', href: '/learn/aiml/deep-learning/aiml-autoencoders' },
  { title: 'Generative Adversarial Networks', href: '/learn/aiml/deep-learning/aiml-generative-adversarial-networks' },
  { title: 'Transfer Learning', href: '/learn/aiml/deep-learning/aiml-transfer-learning' },
  { title: 'Batch Normalization', href: '/learn/aiml/deep-learning/aiml-batch-normalization' },
  { title: 'Dropout', href: '/learn/aiml/deep-learning/aiml-dropout' },
  { title: 'Optimizers', href: '/learn/aiml/deep-learning/aiml-optimizers' },
  { title: 'Loss Functions', href: '/learn/aiml/deep-learning/aiml-loss-functions' }
];

const nlpTopics = [
  { title: 'NLP Introduction', href: '/learn/aiml/nlp/aiml-nlp-introduction' },
  { title: 'Text Preprocessing', href: '/learn/aiml/nlp/aiml-text-preprocessing' },
  { title: 'Tokenization', href: '/learn/aiml/nlp/aiml-tokenization' },
  { title: 'Stemming and Lemm atization', href: '/learn/aiml/nlp/aiml-stemming-lemmatization' },
  { title: 'Part of Speech Tagging', href: '/learn/aiml/nlp/aiml-pos-tagging' },
  { title: 'Named Entity Recognition', href: '/learn/aiml/nlp/aiml-named-entity-recognition' },
  { title: 'Word Embeddings', href: '/learn/aiml/nlp/aiml-word-embeddings' },
  { title: 'Word2Vec', href: '/learn/aiml/nlp/aiml-word2vec' },
  { title: 'Sentiment Analysis', href: '/learn/aiml/nlp/aiml-sentiment-analysis' },
  { title: 'Machine Translation', href: '/learn/aiml/nlp/aiml-machine-translation' },
  { title: 'Question Answering', href: '/learn/aiml/nlp/aiml-question-answering' },
  { title: 'Text Summarization', href: '/learn/aiml/nlp/aiml-text-summarization' }
];

const cvTopics = [
  { title: 'Computer Vision Introduction', href: '/learn/aiml/computer-vision/aiml-computer-vision-introduction' },
  { title: 'Image Processing Basics', href: '/learn/aiml/computer-vision/aiml-image-processing-basics' },
  { title: 'OpenCV', href: '/learn/aiml/computer-vision/aiml-opencv' },
  { title: 'Image Classification', href: '/learn/aiml/computer-vision/aiml-image-classification' },
  { title: 'Object Detection', href: '/learn/aiml/computer-vision/aiml-object-detection' },
  { title: 'YOLO', href: '/learn/aiml/computer-vision/aiml-yolo' },
  { title: 'R-CNN Family', href: '/learn/aiml/computer-vision/aiml-rcnn-family' },
  { title: 'Image Segmentation', href: '/learn/aiml/computer-vision/aiml-image-segmentation' },
  { title: 'Face Recognition', href: '/learn/aiml/computer-vision/aiml-face-recognition' },
  { title: 'Pose Estimation', href: '/learn/aiml/computer-vision/aiml-pose-estimation' },
  { title: 'Image Augmentation', href: '/learn/aiml/computer-vision/aiml-image-augmentation' },
  { title: 'Vision Transformers', href: '/learn/aiml/computer-vision/aiml-vision-transformers' }
];

const llmTopics = [
  { title: 'LLM Introduction', href: '/learn/aiml/llm/aiml-llm-introduction' },
  { title: 'Transformer Architecture', href: '/learn/aiml/llm/aiml-transformer-architecture' },
  { title: 'BERT', href: '/learn/aiml/llm/aiml-bert' },
  { title: 'GPT Models', href: '/learn/aiml/llm/aiml-gpt-models' },
  { title: 'Fine-tuning LLMs', href: '/learn/aiml/llm/aiml-fine-tuning-llms' },
  { title: 'Prompt Engineering for LLMs', href: '/learn/aiml/llm/aiml-prompt-engineering-llms' },
  { title: 'LLM APIs', href: '/learn/aiml/llm/aiml-llm-apis' },
  { title: 'Hugging Face', href: '/learn/aiml/llm/aiml-hugging-face' },
  { title: 'LangChain', href: '/learn/aiml/llm/aiml-langchain' },
  { title: 'Token Management', href: '/learn/aiml/llm/aiml-token-management' },
  { title: 'Context Window Optimization', href: '/learn/aiml/llm/aiml-context-window-optimization' },
  { title: 'LLM Evaluation', href: '/learn/aiml/llm/aiml-llm-evaluation' }
];

const genAITopics = [
  { title: 'GenAI Introduction', href: '/learn/aiml/genai/aiml-genai-introduction' },
  { title: 'Diffusion Models', href: '/learn/aiml/genai/aiml-diffusion-models' },
  { title: 'Stable Diffusion', href: '/learn/aiml/genai/aiml-stable-diffusion' },
  { title: 'DALL-E', href: '/learn/aiml/genai/aiml-dall-e' },
  { title: 'Midjourney', href: '/learn/aiml/genai/aiml-midjourney' },
  { title: 'Text-to-Image', href: '/learn/aiml/genai/aiml-text-to-image' },
  { title: 'Image-to-Image', href: '/learn/aiml/genai/aiml-image-to-image' },
  { title: 'Text-to-Video', href: '/learn/aiml/genai/aiml-text-to-video' },
  { title: 'Audio Generation', href: '/learn/aiml/genai/aiml-audio-generation' },
  { title: 'Music Generation', href: '/learn/aiml/genai/aiml-music-generation' },
  { title: 'Code Generation', href: '/learn/aiml/genai/aiml-code-generation' },
  { title: 'Multimodal Models', href: '/learn/aiml/genai/aiml-multimodal-models' }
];

const ragTopics = [
  { title: 'RAG Introduction', href: '/learn/aiml/rag/aiml-rag-introduction' },
  { title: 'Vector Databases', href: '/learn/aiml/rag/aiml-vector-databases' },
  { title: 'Embeddings', href: '/learn/aiml/rag/aiml-embeddings' },
  { title: 'Semantic Search', href: '/learn/aiml/rag/aiml-semantic-search' },
  { title: 'Document Chunking', href: '/learn/aiml/rag/aiml-document-chunking' },
  { title: 'Retrieval Strategies', href: '/learn/aiml/rag/aiml-retrieval-strategies' },
  { title: 'Pinecone', href: '/learn/aiml/rag/aiml-pinecone' },
  { title: 'Weaviate', href: '/learn/aiml/rag/aiml-weaviate' },
  { title: 'ChromaDB', href: '/learn/aiml/rag/aiml-chromadb' },
  { title: 'RAG Pipeline', href: '/learn/aiml/rag/aiml-rag-pipeline' },
  { title: 'RAG Evaluation', href: '/learn/aiml/rag/aiml-rag-evaluation' },
  { title: 'Advanced RAG Techniques', href: '/learn/aiml/rag/aiml-advanced-rag-techniques' }
];

const agenticAITopics = [
  { title: 'Agentic AI Introduction', href: '/learn/aiml/agentic-ai/aiml-agentic-ai-introduction' },
  { title: 'AI Agents', href: '/learn/aiml/agentic-ai/aiml-ai-agents' },
  { title: 'Tool Use', href: '/learn/aiml/agentic-ai/aiml-tool-use' },
  { title: 'Function Calling', href: '/learn/aiml/agentic-ai/aiml-function-calling' },
  { title: 'ReAct Pattern', href: '/learn/aiml/agentic-ai/aiml-react-pattern' },
  { title: 'Planning and Reasoning', href: '/learn/aiml/agentic-ai/aiml-planning-and-reasoning' },
  { title: 'Multi-Agent Systems', href: '/learn/aiml/agentic-ai/aiml-multi-agent-systems' },
  { title: 'Agent Memory', href: '/learn/aiml/agentic-ai/aiml-agent-memory' },
  { title: 'AutoGPT', href: '/learn/aiml/agentic-ai/aiml-autogpt' },
  { title: 'LangGraph', href: '/learn/aiml/agentic-ai/aiml-langgraph' },
  { title: 'Agent Evaluation', href: '/learn/aiml/agentic-ai/aiml-agent-evaluation' },
  { title: 'Agent Safety', href: '/learn/aiml/agentic-ai/aiml-agent-safety' }
];

const dataEngineeringTopics = [
  { title: 'Data Engineering Introduction', href: '/learn/aiml/data-engineering/aiml-data-engineering-introduction' },
  { title: 'ETL Processes', href: '/learn/aiml/data-engineering/aiml-etl-processes' },
  { title: 'Data Warehousing', href: '/learn/aiml/data-engineering/aiml-data-warehousing' },
  { title: 'Data Lakes', href: '/learn/aiml/data-engineering/aiml-data-lakes' },
  { title: 'Batch Processing', href: '/learn/aiml/data-engineering/aiml-batch-processing' },
  { title: 'Stream Processing', href: '/learn/aiml/data-engineering/aiml-stream-processing' },
  { title: 'Data Quality', href: '/learn/aiml/data-engineering/aiml-data-quality' }
];

const mlopsTopics = [
  { title: 'MLOps Introduction', href: '/learn/aiml/mlops/aiml-mlops-introduction' },
  { title: 'Model Versioning', href: '/learn/aiml/mlops/aiml-model-versioning' },
  { title: 'Experiment Tracking', href: '/learn/aiml/mlops/aiml-experiment-tracking' },
  { title: 'Model Registry', href: '/learn/aiml/mlops/aiml-model-registry' },
  { title: 'CI/CD for ML', href: '/learn/aiml/mlops/aiml-cicd-for-ml' },
  { title: 'Model Monitoring', href: '/learn/aiml/mlops/aiml-model-monitoring' },
  { title: 'Data Drift Detection', href: '/learn/aiml/mlops/aiml-data-drift-detection' },
  { title: 'Model Serving', href: '/learn/aiml/mlops/aiml-model-serving' },
  { title: 'LLMOps Introduction', href: '/learn/aiml/mlops/aiml-llmops-introduction' },
  { title: 'Prompt Management', href: '/learn/aiml/mlops/aiml-prompt-management' },
  { title: 'LLM Monitoring', href: '/learn/aiml/mlops/aiml-llm-monitoring' },
  { title: 'Cost Optimization', href: '/learn/aiml/mlops/aiml-cost-optimization' }
];

const aiSystemsTopics = [
  { title: 'AI Systems Overview', href: '/learn/aiml/ai-systems/aiml-ai-systems-overview' },
  { title: 'System Architecture', href: '/learn/aiml/ai-systems/aiml-system-architecture' },
  { title: 'Scalability', href: '/learn/aiml/ai-systems/aiml-scalability' },
  { title: 'Latency Optimization', href: '/learn/aiml/ai-systems/aiml-latency-optimization' },
  { title: 'Caching Strategies', href: '/learn/aiml/ai-systems/aiml-caching-strategies' },
  { title: 'Load Balancing', href: '/learn/aiml/ai-systems/aiml-load-balancing' },
  { title: 'API Design', href: '/learn/aiml/ai-systems/aiml-api-design' },
  { title: 'Security', href: '/learn/aiml/ai-systems/aiml-security' },
  { title: 'Privacy', href: '/learn/aiml/ai-systems/aiml-privacy' },
  { title: 'Compliance', href: '/learn/aiml/ai-systems/aiml-compliance' }
];

const aiEthicsTopics = [
  { title: 'AI Ethics Introduction', href: '/learn/aiml/ai-ethics/aiml-ai-ethics-introduction' },
  { title: 'Bias in AI', href: '/learn/aiml/ai-ethics/aiml-bias-in-ai' },
  { title: 'Fairness', href: '/learn/aiml/ai-ethics/aiml-fairness' },
  { title: 'Transparency', href: '/learn/aiml/ai-ethics/aiml-transparency' },
  { title: 'Explainability', href: '/learn/aiml/ai-ethics/aiml-explainability' },
  { title: 'AI Safety', href: '/learn/aiml/ai-ethics/aiml-ai-safety' },
  { title: 'Alignment Problem', href: '/learn/aiml/ai-ethics/aiml-alignment-problem' },
  { title: 'Responsible AI', href: '/learn/aiml/ai-ethics/aiml-responsible-ai' }
];

export function AISidebar() {
  const pathname = usePathname();
  const [search, setSearch] = React.useState('');

  const categories = [
    { name: 'Python', icon: Code, topics: pythonTopics },
    { name: 'Python OOP', icon: Box, topics: oopTopics },
    { name: 'File Handling', icon: FileText, topics: fileHandlingTopics },
    { name: 'Python Libraries', icon: Package, topics: librariesTopics },
    { name: 'Python DSA', icon: GitBranch, topics: dsaTopics },
    { name: 'NumPy', icon: Grid3x3, topics: numpyTopics },
    { name: 'Pandas', icon: Table, topics: pandasTopics },
    { name: 'Data Visualization', icon: BarChart3, topics: dataVizTopics },
    { name: 'Statistics', icon: TrendingUp, topics: statisticsTopics },
    { name: 'Mathematics for AI', icon: Calculator, topics: mathTopics },
    { name: 'Data Science', icon: Database, topics: dataScienceTopics },
    { name: 'Data Engineering', icon: Database, topics: dataEngineeringTopics },
    { name: 'Python + Databases', icon: HardDrive, topics: dbTopics },
    { name: 'Machine Learning', icon: Brain, topics: mlTopics },
    { name: 'Deep Learning', icon: Brain, topics: deepLearningTopics },
    { name: 'Natural Language Processing', icon: MessageSquare, topics: nlpTopics },
    { name: 'Computer Vision', icon: Brain, topics: cvTopics },
    { name: 'Large Language Models', icon: Brain, topics: llmTopics },
    { name: 'Generative AI', icon: Brain, topics: genAITopics },
    { name: 'RAG', icon: Database, topics: ragTopics },
    { name: 'Agentic AI', icon: Brain, topics: agenticAITopics },
    { name: 'TensorFlow / PyTorch / ML JS', icon: Cpu, topics: tensorflowTopics },
    { name: 'MLOps & LLMOps', icon: Cpu, topics: mlopsTopics },
    { name: 'AI Systems Design', icon: Cpu, topics: aiSystemsTopics },
    { name: 'AI History & Theory', icon: BookOpen, topics: aiHistoryTopics },
    { name: 'AI Ethics & Safety', icon: BookOpen, topics: aiEthicsTopics },
    { name: 'AI Prompt Engineering', icon: MessageSquare, topics: promptEngTopics },
    { name: 'Python Reference', icon: Book, topics: pythonRefTopics },
    { name: 'Module Reference', icon: Layers, topics: moduleRefTopics },
    { name: 'Python How-To', icon: Lightbulb, topics: howToTopics },
    { name: 'Python Examples', icon: Code2, topics: examplesTopics },
    { name: 'Python Interview Q&A', icon: HelpCircle, topics: interviewTopics }
  ];

  const filteredCategories = React.useMemo(() => {
    if (!search) return categories;
    
    return categories
      .map(category => ({
        ...category,
        topics: category.topics.filter(topic =>
          topic.title.toLowerCase().includes(search.toLowerCase())
        )
      }))
      .filter(category => category.topics.length > 0);
  }, [search, categories]);

  return (
    <div className="h-full w-80 bg-card/50 backdrop-blur-xl border-r border-white/10">
      <div className="sticky top-0 z-10 bg-card/90 backdrop-blur-xl border-b border-white/10 p-6">
        <Link
          href="/learn"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to Overview
        </Link>
        <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-orange-400 to-yellow-400">
          AI / ML
        </h2>
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <Input
            type="text"
            placeholder="Search topics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-background/50 border-white/10 focus:border-orange-500/50 transition-colors"
          />
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="p-4 space-y-2">
          {filteredCategories.map((category, idx) => (
            <Collapsible key={idx} defaultOpen={category.topics.some(t => pathname === t.href)}>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-between h-auto py-3 px-4 hover:bg-white/5 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <category.icon className="w-5 h-5 text-orange-400" />
                    <span className="font-semibold text-sm">{category.name}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 transition-transform group-data-[state=open]:rotate-90" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-1 ml-4 space-y-1">
                {category.topics.map((topic) => {
                  const isActive = pathname === topic.href;
                  return (
                    <Link
                      key={topic.href}
                      href={topic.href}
                      className={`
                        block py-2 px-4 rounded-lg text-sm transition-all duration-200
                        ${isActive
                          ? 'bg-linear-to-r from-orange-500/20 to-yellow-500/10 text-orange-300 font-medium border-l-2 border-orange-500'
                          : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                        }
                      `}
                    >
                      {topic.title}
                    </Link>
                  );
                })}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
