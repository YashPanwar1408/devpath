'use client';

import { useState, ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface MarkdownRendererProps {
  content: string;
}

/* ---------------- CODE BLOCK ---------------- */

function CodeBlock({
  code,
  language,
}: {
  code: string;
  language?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Card className="my-4 border-border/50 bg-[#1e1e1e] overflow-hidden relative group">
      <CardContent className="p-0">
        <div className="absolute right-2 top-2 z-10 opacity-0 group-hover:opacity-100 transition">
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCopy}
            className="h-8 px-2 text-xs bg-background/80"
          >
            {copied ? 'Copied' : 'Copy'}
          </Button>
        </div>

        <SyntaxHighlighter
          style={oneDark}
          language={language || 'text'}
          PreTag="div"
          showLineNumbers={false}
          wrapLines={false}
          customStyle={{
            margin: 0,
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            background: 'transparent',
            fontSize: '0.875rem',
            lineHeight: '1.5',
          }}
          codeTagProps={{
            style: {
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            }
          }}
        >
          {code}
        </SyntaxHighlighter>
      </CardContent>
    </Card>
  );
}

/* ---------------- HELPER: Extract text from children ---------------- */

function extractText(children: ReactNode): string {
  if (typeof children === 'string') {
    return children;
  }
  if (typeof children === 'number') {
    return String(children);
  }
  if (Array.isArray(children)) {
    return children.map(extractText).join('');
  }
  if (children && typeof children === 'object' && 'props' in children) {
    return extractText((children as { props: { children?: ReactNode } }).props.children);
  }
  return '';
}

/* ---------------- MARKDOWN RENDERER ---------------- */

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-invert prose-lg max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          /* ---------- HEADINGS ---------- */
          h1: ({ children }) => (
            <h1 className="text-4xl font-bold mt-10 mb-6">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-3xl font-semibold mt-10 mb-4">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-2xl font-semibold mt-8 mb-3">{children}</h3>
          ),

          /* ---------- TEXT ---------- */
          p: ({ children }) => (
            <p className="text-muted-foreground leading-relaxed mb-5">
              {children}
            </p>
          ),

          strong: ({ children }) => (
            <strong className="text-foreground font-semibold">
              {children}
            </strong>
          ),

          /* ---------- LISTS ---------- */
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-2 my-4">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-2 my-4">
              {children}
            </ol>
          ),

          /* ---------- LINKS ---------- */
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {children}
            </a>
          ),

          /* ---------- BLOCKQUOTE ---------- */
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-muted-foreground">
              {children}
            </blockquote>
          ),

          /* ---------- TABLE ---------- */
          table: ({ children }) => (
            <div className="overflow-x-auto my-6">
              <table className="w-full border border-border border-collapse">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-border px-4 py-2 bg-muted text-left">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-border px-4 py-2">
              {children}
            </td>
          ),

          /* ---------- CODE ---------- */
          pre: ({ children }) => {
            // Extract code from the pre > code structure
            const codeElement = children as { props?: { children?: ReactNode; className?: string } };
            
            if (codeElement?.props) {
              const codeText = extractText(codeElement.props.children);
              const className = codeElement.props.className || '';
              const match = /language-(\w+)/.exec(className);
              const language = match ? match[1] : 'text';
              
              return (
                <CodeBlock
                  code={codeText.replace(/\n$/, '')}
                  language={language}
                />
              );
            }
            
            // Fallback for unexpected structure
            return <pre className="p-4 overflow-x-auto bg-muted rounded">{children}</pre>;
          },

          code: ({ className, children }) => {
            // Check if this is inline code (no language class)
            const match = /language-(\w+)/.exec(className || '');
            
            if (!match) {
              // Inline code
              return (
                <code className="px-1.5 py-0.5 rounded bg-muted text-primary font-mono text-sm">
                  {children}
                </code>
              );
            }
            
            // Block code - will be handled by pre
            return <code className={className}>{children}</code>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}