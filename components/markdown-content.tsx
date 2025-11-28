'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        img: ({ node, ...props }) => (
          <img
            {...props}
            className="rounded-lg border border-neutral-800"
            alt={props.alt || ''}
          />
        ),
        code: ({ node, inline, className, children, ...props }: any) => {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <code className={className} {...props}>
              {children}
            </code>
          ) : (
            <code
              className="bg-neutral-900 px-1.5 py-0.5 rounded text-sm text-emerald-400"
              {...props}
            >
              {children}
            </code>
          );
        },
        a: ({ node, ...props }: any) => (
          <a
            {...props}
            className="text-emerald-500 hover:text-emerald-400 underline"
            target="_blank"
            rel="noopener noreferrer"
          />
        ),
        h1: ({ node, ...props }: any) => (
          <h1 className="text-3xl font-bold text-white mt-8 mb-4" {...props} />
        ),
        h2: ({ node, ...props }: any) => (
          <h2 className="text-2xl font-bold text-white mt-6 mb-3" {...props} />
        ),
        h3: ({ node, ...props }: any) => (
          <h3 className="text-xl font-semibold text-white mt-4 mb-2" {...props} />
        ),
        p: ({ node, ...props }: any) => (
          <p className="text-neutral-300 mb-4 leading-7" {...props} />
        ),
        ul: ({ node, ...props }: any) => (
          <ul className="list-disc list-inside text-neutral-300 mb-4 space-y-2" {...props} />
        ),
        ol: ({ node, ...props }: any) => (
          <ol className="list-decimal list-inside text-neutral-300 mb-4 space-y-2" {...props} />
        ),
        li: ({ node, ...props }: any) => (
          <li className="text-neutral-300" {...props} />
        ),
        blockquote: ({ node, ...props }: any) => (
          <blockquote
            className="border-l-4 border-emerald-500 bg-neutral-900/50 py-2 px-4 rounded my-4 italic text-neutral-300"
            {...props}
          />
        ),
        pre: ({ node, ...props }: any) => (
          <pre
            className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 overflow-x-auto mb-4"
            {...props}
          />
        ),
        hr: ({ node, ...props }: any) => (
          <hr className="border-neutral-800 my-8" {...props} />
        ),
        table: ({ node, ...props }: any) => (
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full border-collapse border border-neutral-800" {...props} />
          </div>
        ),
        th: ({ node, ...props }: any) => (
          <th
            className="border border-neutral-800 bg-neutral-900 px-4 py-2 text-left text-white font-semibold"
            {...props}
          />
        ),
        td: ({ node, ...props }: any) => (
          <td
            className="border border-neutral-800 px-4 py-2 text-neutral-300"
            {...props}
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

