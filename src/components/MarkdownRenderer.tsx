import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);

  const handleCopyCode = async (codeText: string, index: number) => {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopiedCodeIndex(index);
      setTimeout(() => setCopiedCodeIndex(null), 2000);
    } catch {
      // Fallback
    }
  };

  // Helper to split markdown into blocks: code blocks vs text blocks
  const parseBlocks = (text: string) => {
    const blocks: Array<{ type: 'code' | 'text'; content: string; language?: string }> = [];
    const codeBlockRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;

    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        blocks.push({
          type: 'text',
          content: text.slice(lastIndex, match.index),
        });
      }

      blocks.push({
        type: 'code',
        language: match[1]?.trim() || 'code',
        content: match[2]?.replace(/\n$/, '') || '',
      });

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      blocks.push({
        type: 'text',
        content: text.slice(lastIndex),
      });
    }

    return blocks;
  };

  // Helper for inline markdown: bold, italic, inline code, links
  const renderInline = (str: string) => {
    // Split by inline code `...`
    const parts = str.split(/(`[^`]+`)/g);

    return parts.map((part, pIdx) => {
      if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
        return (
          <code
            key={pIdx}
            className="px-1.5 py-0.5 mx-0.5 rounded font-mono text-xs sm:text-sm bg-neutral-200 dark:bg-neutral-800 text-emerald-700 dark:text-emerald-400 font-medium"
          >
            {part.slice(1, -1)}
          </code>
        );
      }

      // Format bold **...** and italic *...*
      // Simple regex replacement representation
      const boldParts = part.split(/(\*\*[^*]+\*\*)/g);

      return (
        <span key={pIdx}>
          {boldParts.map((bPart, bIdx) => {
            if (bPart.startsWith('**') && bPart.endsWith('**') && bPart.length > 4) {
              return (
                <strong key={bIdx} className="font-semibold text-neutral-900 dark:text-neutral-100">
                  {bPart.slice(2, -2)}
                </strong>
              );
            }

            // Check single asterisk italic
            const italicParts = bPart.split(/(\*[^*]+\*)/g);
            return (
              <span key={bIdx}>
                {italicParts.map((iPart, iIdx) => {
                  if (iPart.startsWith('*') && iPart.endsWith('*') && iPart.length > 2) {
                    return (
                      <em key={iIdx} className="italic text-neutral-800 dark:text-neutral-200">
                        {iPart.slice(1, -1)}
                      </em>
                    );
                  }
                  return iPart;
                })}
              </span>
            );
          })}
        </span>
      );
    });
  };

  const renderTextBlock = (text: string, blockKey: number) => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];

    let inList = false;
    let listType: 'ul' | 'ol' = 'ul';
    let listItems: React.ReactNode[] = [];

    const flushList = () => {
      if (listItems.length > 0) {
        if (listType === 'ol') {
          elements.push(
            <ol key={`ol-${elements.length}`} className="list-decimal list-outside ml-5 space-y-1 my-2">
              {listItems}
            </ol>
          );
        } else {
          elements.push(
            <ul key={`ul-${elements.length}`} className="list-disc list-outside ml-5 space-y-1 my-2">
              {listItems}
            </ul>
          );
        }
        listItems = [];
        inList = false;
      }
    };

    lines.forEach((line, idx) => {
      const trimmed = line.trim();

      // Heading 3
      if (trimmed.startsWith('### ')) {
        flushList();
        elements.push(
          <h4 key={`h3-${idx}`} className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100 mt-4 mb-1">
            {renderInline(trimmed.slice(4))}
          </h4>
        );
        return;
      }

      // Heading 2
      if (trimmed.startsWith('## ')) {
        flushList();
        elements.push(
          <h3 key={`h2-${idx}`} className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-neutral-100 mt-5 mb-2 pb-1 border-b border-neutral-200 dark:border-neutral-800">
            {renderInline(trimmed.slice(3))}
          </h3>
        );
        return;
      }

      // Heading 1
      if (trimmed.startsWith('# ')) {
        flushList();
        elements.push(
          <h2 key={`h1-${idx}`} className="text-xl sm:text-2xl font-extrabold text-neutral-900 dark:text-neutral-100 mt-6 mb-2">
            {renderInline(trimmed.slice(2))}
          </h2>
        );
        return;
      }

      // Bullet List item
      const bulletMatch = trimmed.match(/^[-*•]\s+(.*)$/);
      if (bulletMatch) {
        if (inList && listType !== 'ul') flushList();
        inList = true;
        listType = 'ul';
        listItems.push(
          <li key={`li-${idx}`} className="text-neutral-800 dark:text-neutral-200 leading-relaxed">
            {renderInline(bulletMatch[1])}
          </li>
        );
        return;
      }

      // Numbered List item
      const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
      if (numMatch) {
        if (inList && listType !== 'ol') flushList();
        inList = true;
        listType = 'ol';
        listItems.push(
          <li key={`oli-${idx}`} className="text-neutral-800 dark:text-neutral-200 leading-relaxed">
            {renderInline(numMatch[2])}
          </li>
        );
        return;
      }

      // Blockquote
      if (trimmed.startsWith('> ')) {
        flushList();
        elements.push(
          <blockquote
            key={`bq-${idx}`}
            className="border-l-4 border-emerald-500 pl-3 py-1 my-2 text-neutral-700 dark:text-neutral-300 italic bg-neutral-100/60 dark:bg-neutral-800/40 rounded-r"
          >
            {renderInline(trimmed.slice(2))}
          </blockquote>
        );
        return;
      }

      // Horizontal rule
      if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
        flushList();
        elements.push(<hr key={`hr-${idx}`} className="my-4 border-neutral-200 dark:border-neutral-800" />);
        return;
      }

      // Empty line
      if (trimmed === '') {
        flushList();
        return;
      }

      // Regular paragraph
      flushList();
      elements.push(
        <p key={`p-${idx}`} className="my-1.5 leading-relaxed text-neutral-800 dark:text-neutral-200 break-words">
          {renderInline(trimmed)}
        </p>
      );
    });

    flushList();

    return <div key={`tb-${blockKey}`}>{elements}</div>;
  };

  const blocks = parseBlocks(content);

  return (
    <div className="space-y-2 text-sm sm:text-base leading-relaxed break-words font-sans">
      {blocks.map((block, index) => {
        if (block.type === 'code') {
          return (
            <div
              key={`code-${index}`}
              className="my-3 rounded-xl overflow-hidden border border-neutral-700/60 bg-neutral-950 text-neutral-200 shadow-md"
            >
              <div className="flex items-center justify-between px-3.5 py-1.5 bg-neutral-900 border-b border-neutral-800 text-xs font-mono text-neutral-400">
                <span className="uppercase tracking-wider font-semibold text-emerald-400">
                  {block.language || 'code'}
                </span>
                <button
                  onClick={() => handleCopyCode(block.content, index)}
                  className="flex items-center gap-1.5 px-2 py-0.5 rounded hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                  title="Copy code"
                >
                  {copiedCodeIndex === index ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 text-xs font-medium">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-xs">Copy code</span>
                    </>
                  )}
                </button>
              </div>
              <div className="p-3.5 overflow-x-auto font-mono text-xs sm:text-sm text-neutral-200 leading-snug">
                <pre>
                  <code>{block.content}</code>
                </pre>
              </div>
            </div>
          );
        }

        return renderTextBlock(block.content, index);
      })}
    </div>
  );
};
