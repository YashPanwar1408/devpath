import { notFound } from 'next/navigation';
import { fetchLearnTopic } from '@/lib/api';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import Link from 'next/link';

interface LessonPageProps {
  slug: string;
  categoryPath: string;
  domainSlug?: string;
}

// Map topic slug prefixes to category paths
const slugToCategoryMap: Record<string, string> = {
  'python': 'python',
  'oop': 'python-oop',
  'reading-files': 'file-handling',
  'writing-files': 'file-handling',
  'deleting-files': 'file-handling',
  'directory-operations': 'file-handling',
  'json-files': 'file-handling',
  'csv-files': 'file-handling',
  'file-exceptions': 'file-handling',
  'libraries': 'python-libraries',
  'datetime': 'python-libraries',
  'math-module': 'python-libraries',
  'random': 'python-libraries',
  'os-module': 'python-libraries',
  'sys-module': 'python-libraries',
  'pip': 'python-libraries',
  'dsa': 'python-dsa',
  'arrays': 'python-dsa',
  'linked-lists': 'python-dsa',
  'stacks': 'python-dsa',
  'queues': 'python-dsa',
  'trees': 'python-dsa',
  'graphs': 'python-dsa',
  'sorting': 'python-dsa',
  'searching': 'python-dsa',
  'big-o': 'python-dsa',
  'numpy': 'numpy',
  'array': 'numpy',
  'pandas': 'pandas',
  'data-': 'pandas',
  'matplotlib': 'data-visualization',
  'line-plots': 'data-visualization',
  'scatter-plots': 'data-visualization',
  'bar-charts': 'data-visualization',
  'histograms': 'data-visualization',
  'pie-charts': 'data-visualization',
  'subplots': 'data-visualization',
  'customization': 'data-visualization',
  'statistics': 'statistics',
  'descriptive-statistics': 'statistics',
  'probability': 'statistics',
  'distributions': 'statistics',
  'hypothesis-testing': 'statistics',
  'correlation': 'statistics',
  'regression-analysis': 'statistics',
  'math': 'mathematics-for-ai',
  'linear-algebra': 'mathematics-for-ai',
  'calculus': 'mathematics-for-ai',
  'derivatives': 'mathematics-for-ai',
  'gradients': 'mathematics-for-ai',
  'vectors': 'mathematics-for-ai',
  'matrices': 'mathematics-for-ai',
  'optimization': 'mathematics-for-ai',
  'data-science': 'data-science',
  'data-collection': 'data-science',
  'data-preprocessing': 'data-science',
  'feature-engineering': 'data-science',
  'exploratory-data-analysis': 'data-science',
  'data-pipeline': 'data-science',
  'model-evaluation': 'data-science',
  'data-engineering': 'data-engineering',
  'etl': 'data-engineering',
  'data-warehousing': 'data-engineering',
  'data-lakes': 'data-engineering',
  'batch-processing': 'data-engineering',
  'stream-processing': 'data-engineering',
  'data-quality': 'data-engineering',
  'database': 'python-databases',
  'mysql': 'python-databases',
  'sql': 'python-databases',
  'mongodb': 'python-databases',
  'pymongo': 'python-databases',
  'crud': 'python-databases',
  'what-is-machine-learning': 'machine-learning',
  'machine-learning': 'machine-learning',
  'ml-': 'machine-learning',
  'supervised': 'machine-learning',
  'unsupervised': 'machine-learning',
  'linear-regression': 'machine-learning',
  'logistic-regression': 'machine-learning',
  'decision-trees': 'machine-learning',
  'random-forests': 'machine-learning',
  'svm': 'machine-learning',
  'knn': 'machine-learning',
  'clustering': 'machine-learning',
  'neural-networks': 'deep-learning',
  'deep-learning': 'deep-learning',
  'activation-functions': 'deep-learning',
  'backpropagation': 'deep-learning',
  'convolutional': 'deep-learning',
  'recurrent': 'deep-learning',
  'lstm': 'deep-learning',
  'gru': 'deep-learning',
  'autoencoders': 'deep-learning',
  'generative-adversarial': 'deep-learning',
  'transfer-learning': 'deep-learning',
  'batch-normalization': 'deep-learning',
  'dropout': 'deep-learning',
  'optimizers': 'deep-learning',
  'loss-functions': 'deep-learning',
  'nlp': 'nlp',
  'text-preprocessing': 'nlp',
  'tokenization': 'nlp',
  'stemming': 'nlp',
  'pos-tagging': 'nlp',
  'named-entity': 'nlp',
  'word-embeddings': 'nlp',
  'word2vec': 'nlp',
  'sentiment-analysis': 'nlp',
  'machine-translation': 'nlp',
  'question-answering': 'nlp',
  'text-summarization': 'nlp',
  'computer-vision': 'computer-vision',
  'image-': 'computer-vision',
  'opencv': 'computer-vision',
  'object-detection': 'computer-vision',
  'yolo': 'computer-vision',
  'rcnn': 'computer-vision',
  'face-recognition': 'computer-vision',
  'pose-estimation': 'computer-vision',
  'vision-transformers': 'computer-vision',
  'llm': 'llm',
  'transformer-architecture': 'llm',
  'bert': 'llm',
  'gpt': 'llm',
  'fine-tuning-llms': 'llm',
  'prompt-engineering-llms': 'llm',
  'llm-apis': 'llm',
  'hugging-face': 'llm',
  'langchain': 'llm',
  'token-management': 'llm',
  'context-window': 'llm',
  'llm-evaluation': 'llm',
  'generative-ai': 'genai',
  'genai': 'genai',
  'diffusion': 'genai',
  'stable-diffusion': 'genai',
  'dall-e': 'genai',
  'midjourney': 'genai',
  'text-to-image': 'genai',
  'image-to-image': 'genai',
  'text-to-video': 'genai',
  'audio-generation': 'genai',
  'music-generation': 'genai',
  'code-generation': 'genai',
  'multimodal': 'genai',
  'rag': 'rag',
  'vector-databases': 'rag',
  'embeddings': 'rag',
  'semantic-search': 'rag',
  'document-chunking': 'rag',
  'retrieval-strategies': 'rag',
  'pinecone': 'rag',
  'weaviate': 'rag',
  'chromadb': 'rag',
  'rag-pipeline': 'rag',
  'rag-evaluation': 'rag',
  'advanced-rag': 'rag',
  'agentic-ai': 'agentic-ai',
  'ai-agents': 'agentic-ai',
  'tool-use': 'agentic-ai',
  'function-calling': 'agentic-ai',
  'react-pattern': 'agentic-ai',
  'planning-and-reasoning': 'agentic-ai',
  'multi-agent': 'agentic-ai',
  'agent-memory': 'agentic-ai',
  'autogpt': 'agentic-ai',
  'langgraph': 'agentic-ai',
  'agent-evaluation': 'agentic-ai',
  'agent-safety': 'agentic-ai',
  'tensorflow': 'tensorflow',
  'keras': 'tensorflow',
  'pytorch': 'tensorflow',
  'building-models': 'tensorflow',
  'training-models': 'tensorflow',
  'model-deployment': 'tensorflow',
  'tensorflowjs': 'tensorflow',
  'mljs': 'tensorflow',
  'browser-ml': 'tensorflow',
  'mlops': 'mlops',
  'model-versioning': 'mlops',
  'experiment-tracking': 'mlops',
  'model-registry': 'mlops',
  'cicd-for-ml': 'mlops',
  'model-monitoring': 'mlops',
  'data-drift': 'mlops',
  'model-serving': 'mlops',
  'llmops': 'mlops',
  'prompt-management': 'mlops',
  'llm-monitoring': 'mlops',
  'cost-optimization': 'mlops',
  'ai-systems': 'ai-systems',
  'system-architecture': 'ai-systems',
  'scalability': 'ai-systems',
  'latency-optimization': 'ai-systems',
  'caching-strategies': 'ai-systems',
  'load-balancing': 'ai-systems',
  'api-design': 'ai-systems',
  'security': 'ai-systems',
  'privacy': 'ai-systems',
  'compliance': 'ai-systems',
  'history-of-ai': 'ai-history',
  'ai-evolution': 'ai-history',
  'ai-theory': 'ai-history',
  'turing-test': 'ai-history',
  'ai-winters': 'ai-history',
  'ai-ethics': 'ai-ethics',
  'bias-in-ai': 'ai-ethics',
  'fairness': 'ai-ethics',
  'transparency': 'ai-ethics',
  'explainability': 'ai-ethics',
  'ai-safety': 'ai-ethics',
  'alignment-problem': 'ai-ethics',
  'responsible-ai': 'ai-ethics',
  'prompt-engineering-basics': 'prompt-engineering',
  'prompt-design': 'prompt-engineering',
  'few-shot-learning': 'prompt-engineering',
  'chain-of-thought': 'prompt-engineering',
  'prompt-optimization': 'prompt-engineering',
  'zero-shot': 'prompt-engineering',
  'prompt-templates': 'prompt-engineering',
  'syntax-reference': 'python-reference',
  'builtin-functions': 'python-reference',
  'keywords-reference': 'python-reference',
  'datatypes-reference': 'python-reference',
  'numpy-reference': 'module-reference',
  'pandas-reference': 'module-reference',
  'matplotlib-reference': 'module-reference',
  'sklearn-reference': 'module-reference',
  'how-to-install': 'python-howto',
  'setup-environment': 'python-howto',
  'debug-code': 'python-howto',
  'handle-errors': 'python-howto',
  'optimize-code': 'python-howto',
  'basic-examples': 'python-examples',
  'numpy-examples': 'python-examples',
  'pandas-examples': 'python-examples',
  'ml-examples': 'python-examples',
  'project-examples': 'python-examples',
  'python-basics-qa': 'python-interview',
  'oop-qa': 'python-interview',
  'data-structures-qa': 'python-interview',
  'ml-interview-qa': 'python-interview',
  'coding-challenges': 'python-interview',
};

function getCategoryPathFromSlug(slug: string): string {
  // Remove 'aiml-' prefix if present
  const cleanSlug = slug.replace('aiml-', '');
  
  // Try to find exact match or prefix match
  for (const [key, category] of Object.entries(slugToCategoryMap)) {
    if (cleanSlug.startsWith(key)) {
      return category;
    }
  }
  
  // Fallback: extract first part of slug
  const parts = cleanSlug.split('-');
  return parts[0];
}

export default async function LessonPage({ slug, categoryPath, domainSlug = 'full-stack' }: LessonPageProps) {
  const data = await fetchLearnTopic(domainSlug, slug);
  
  if (!data) {
    notFound();
  }

  const { topic, navigation } = data;

  return (
    <div className="max-w-5xl mx-auto px-8 py-12">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <div className="text-sm text-muted-foreground mb-2">
            {topic.category.title}
          </div>
          <h1 className="text-4xl font-bold mb-4">{topic.title}</h1>
          <div className="h-1 w-20 bg-linear-to-r from-purple-500 to-pink-500 rounded-full" />
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          <MarkdownRenderer content={topic.content} />
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-border">
          {navigation.prev ? (
            <Link
              href={`/learn/${domainSlug}/${getCategoryPathFromSlug(navigation.prev.slug)}/${navigation.prev.slug}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>←</span>
              <div>
                <div className="text-xs">Previous</div>
                <div className="font-medium">{navigation.prev.title}</div>
              </div>
            </Link>
          ) : (
            <div />
          )}
          
          {navigation.next ? (
            <Link
              href={`/learn/${domainSlug}/${getCategoryPathFromSlug(navigation.next.slug)}/${navigation.next.slug}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-right"
            >
              <div>
                <div className="text-xs">Next</div>
                <div className="font-medium">{navigation.next.title}</div>
              </div>
              <span>→</span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
