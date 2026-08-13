'use client';

import React, { useState, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { AnimatePresence, motion } from 'framer-motion';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Copy, Check, Play, Loader2, TerminalSquare, X, Info, Lightbulb, AlertTriangle } from 'lucide-react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Tooltip from '@/components/Tooltip';

const MarkdownContext = React.createContext<{
  checkboxState: Record<string, boolean>;
  toggleCheckbox: (index: string, checked: boolean) => void;
  getCheckboxIndex: () => number;
  dirPath: string;
  setSelectedImage: (src: string) => void;
  onNavigateLink?: (href: string) => void;
  isCompact?: boolean;
}>({
  checkboxState: {},
  toggleCheckbox: () => {},
  getCheckboxIndex: () => 0,
  dirPath: '',
  setSelectedImage: () => {},
  onNavigateLink: undefined,
  isCompact: false
});

const SyntaxHighlighter = dynamic(() => import('react-syntax-highlighter').then(mod => mod.Prism), { ssr: false });

const extractText = (node: any): string => {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return node.toString();
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (node && node.props && node.props.children) return extractText(node.props.children);
  return '';
};

function AnimatedCodeBlock({ code, language }: { code: string, language: string }) {
  const context = React.useContext(MarkdownContext);
  const isCompact = context.isCompact;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isPython = language.toLowerCase() === 'python';
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      transition={{ duration: 0.5 }}
      style={{ position: 'relative', margin: isCompact ? '0.5em 0' : '1.5em 0' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Tooltip content={copied ? "Copied!" : "Copy to clipboard"} side="top">
        <motion.button
          onClick={handleCopy}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            padding: '6px',
            borderRadius: '6px',
            backgroundColor: 'var(--interactive-bg)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-color)',
            cursor: 'pointer',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: isHovered || copied ? 1 : 0,
            transition: 'opacity 0.2s',
            pointerEvents: isHovered || copied ? 'auto' : 'none'
          }}
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
                <Check size={14} color="#4ade80" />
              </motion.div>
            ) : (
              <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
                <Copy size={14} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </Tooltip>
      
      <SyntaxHighlighter
        PreTag="div"
        language={language}
        style={dracula as any}
        customStyle={{ 
          borderRadius: '8px', 
          padding: '16px', 
          margin: '1.5em 0', 
          backgroundColor: '#252627',
          fontSize: '0.9em'
        }}
      >
        {code}
      </SyntaxHighlighter>
      

    </motion.div>
  );
}

function ScrollReveal({ children, as: Component = 'div', ...props }: { children: React.ReactNode, as?: any, [key: string]: any }) {
  const MotionComponent = (motion as any)[Component] || motion.div;
  return (
    <MotionComponent
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}

function MarkdownInput({ type, checked, disabled, ...rest }: any) {
  const context = React.useContext(MarkdownContext);
  if (type === 'checkbox') {
    const currentIndex = String(context.getCheckboxIndex());
    const isChecked = context.checkboxState[currentIndex] ?? checked ?? false;

    return (
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(e) => context.toggleCheckbox(currentIndex, e.target.checked)}
        disabled={false}
        style={{ accentColor: '#4ade80', cursor: 'pointer', marginRight: '0.45em', transform: 'translateY(1px)' }}
        {...rest}
      />
    );
  }
  return <input type={type} checked={checked} disabled={disabled} {...rest} />;
}

function MarkdownLink({ href, children, ...rest }: any) {
  const context = React.useContext(MarkdownContext);
  const value = typeof href === "string" ? href : "";
  const internalMarkdown =
    value.length > 0 &&
    !value.startsWith("#") &&
    !/^(?:[a-z]+:)?\/\//i.test(value) &&
    value.split("#")[0].toLowerCase().endsWith(".md");

  return (
    <a
      href={value}
      {...rest}
      onClick={(event) => {
        if (internalMarkdown && context.onNavigateLink) {
          event.preventDefault();
          context.onNavigateLink(value);
        }
      }}
    >
      {children}
    </a>
  );
}

function MarkdownImage({ src, alt }: any) {
  const context = React.useContext(MarkdownContext);
  if (!src) return null;
  const srcString = String(src);
  let resolvedDir = context.dirPath;
  if (!resolvedDir && srcString.startsWith('images/')) {
    resolvedDir = '/practice-data/phase-6-data-science';
  }

  const actualSrc = srcString.startsWith('http')
    ? srcString
    : (resolvedDir ? `${resolvedDir}/${srcString}`.replace(/([^:]\/)\/+/g, "$1") : `/${srcString}`);

  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      transition={{ duration: 0.5 }}
      style={{ display: 'inline-block', width: '100%', margin: '1em 0' }}
    >
      <Image
        src={actualSrc}
        alt={alt || 'Markdown Image'}
        width={800}
        height={500}
        unoptimized
        style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', cursor: 'zoom-in', border: '1px solid var(--border-color)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
        onClick={() => context.setSelectedImage(actualSrc)}
      />
    </motion.span>
  );
}

const markdownComponents: any = {
  input: MarkdownInput,
  a: MarkdownLink,
  code: (props: any) => {
    const { children, className, node, ref, ...rest } = props;
    const match = /language-(\w+)/.exec(className || '');
    const isBlock = match || String(children).includes('\n');
    
    if (isBlock) {
      const codeString = String(children).replace(/\n$/, '');
      return <AnimatedCodeBlock code={codeString} language={match ? match[1] : 'text'} />;
    }
    return (
      <code ref={ref} {...rest} className={className}>
        {children}
      </code>
    );
  },
  img: MarkdownImage,
  table: ({ children }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      transition={{ duration: 0.5 }}
      style={{ overflowX: 'auto', margin: '1.5em 0' }}
    >
      <table>{children}</table>
    </motion.div>
  ),
  h1: ({ children }: any) => <ScrollReveal as="h1" style={{ scrollMarginTop: '60px' }}>{children}</ScrollReveal>,
  p: ({ children }: any) => <ScrollReveal as="p" style={{ lineHeight: 1.7, margin: '1.2em 0' }}>{children}</ScrollReveal>,
  ul: ({ children }: any) => <ScrollReveal as="ul" style={{ margin: '1em 0', paddingLeft: '2em' }}>{children}</ScrollReveal>,
  ol: ({ children }: any) => <ScrollReveal as="ol" style={{ margin: '1em 0', paddingLeft: '2em' }}>{children}</ScrollReveal>,
  li: ({ children, className }: any) => {
    if (className === 'task-list-item') return <li className={className}>{children}</li>;
    return <ScrollReveal as="li" style={{ margin: '0.5em 0' }}>{children}</ScrollReveal>;
  },
  blockquote: ({ children }: any) => {
    const text = extractText(children);
    const lowerText = text.toLowerCase().trim();
    
    let type = 'note';
    if (lowerText.startsWith('!tip') || lowerText.startsWith('[!tip]') || text.includes('💡')) type = 'tip';
    if (lowerText.startsWith('!warn') || lowerText.startsWith('[!warn') || text.includes('⚠️')) type = 'warning';

    const cleanChildren = (nodes: any): any => {
      return React.Children.map(nodes, child => {
        if (typeof child === 'string') {
          return child.replace(/^\[?!(note|tip|warning|warnning|info|caution)\]?:?\s*/i, '');
        }
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            ...(child.props as any),
            children: cleanChildren((child.props as any).children)
          });
        }
        return child;
      });
    };

    const styles = {
      note: { 
        bg: 'rgba(59, 130, 246, 0.15)', 
        border: '1px solid rgba(59, 130, 246, 0.4)', 
        color: '#60a5fa', 
        icon: Info 
      },
      tip: { 
        bg: 'rgba(34, 197, 94, 0.15)', 
        border: '1px solid rgba(34, 197, 94, 0.4)', 
        color: '#4ade80', 
        icon: Lightbulb 
      },
      warning: { 
        bg: 'rgba(234, 179, 8, 0.15)', 
        border: '1px solid rgba(234, 179, 8, 0.4)', 
        color: '#facc15', 
        icon: AlertTriangle 
      },
    };

    const style = styles[type as keyof typeof styles];
    const Icon = style.icon;

    return (
      <ScrollReveal as="blockquote" style={{ 
        backgroundColor: style.bg,
        border: style.border,
        color: style.color,
        padding: '16px 20px', 
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '14px',
        margin: '1.5em 0',
      }}>
        <div style={{ marginTop: '2px' }}><Icon size={20} color={style.color} /></div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }} className="blockquote-content">
          {cleanChildren(children)}
        </div>
      </ScrollReveal>
    );
  },
  h2: ({ children }: any) => {
    const text = extractText(children).trim();
    const id = text.toLowerCase().replace(/[^\w\- ]+/g, '').replace(/\s+/g, '-');
    return <ScrollReveal as="h2" id={id} style={{ scrollMarginTop: '60px' }}>{children}</ScrollReveal>;
  },
  h3: ({ children }: any) => {
    const text = extractText(children).trim();
    const id = text.toLowerCase().replace(/[^\w\- ]+/g, '').replace(/\s+/g, '-');
    return <ScrollReveal as="h3" id={id} style={{ scrollMarginTop: '60px' }}>{children}</ScrollReveal>;
  }
};

const MarkdownRenderer = React.memo(function MarkdownRenderer({ content, fileId, dirPath = '', isCompact = false, onNavigateLink }: { content: string, fileId: string, dirPath?: string, isCompact?: boolean, onNavigateLink?: (href: string) => void }) {
  const [checkboxState, setCheckboxState] = useState<Record<string, boolean>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const saved = localStorage.getItem(`checkboxes-${fileId}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const toggleCheckbox = useCallback((index: string, checked: boolean) => {
    setCheckboxState((prev) => {
      const newState = { ...prev, [index]: checked };
      localStorage.setItem(`checkboxes-${fileId}`, JSON.stringify(newState));
      return newState;
    });
  }, [fileId]);

  let checkboxIndexRef = React.useRef(0);
  // eslint-disable-next-line react-hooks/refs -- render-phase counter that must reset before each checkbox pass
  checkboxIndexRef.current = 0; // reset on every render

  const contextValue = React.useMemo(() => ({
    checkboxState,
    toggleCheckbox,
    getCheckboxIndex: () => checkboxIndexRef.current++,
    dirPath,
    setSelectedImage,
    onNavigateLink,
    isCompact
  }), [checkboxState, toggleCheckbox, dirPath, onNavigateLink, isCompact]);

  return (
    <MarkdownContext.Provider value={contextValue}>
      <div className={`markdown-body ${isCompact ? 'compact' : ''}`}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={markdownComponents}
        >
          {content}
        </ReactMarkdown>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'zoom-out',
              backdropFilter: 'blur(8px)'
            }}
          >
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              src={selectedImage}
              alt="Enlarged view"
              style={{
                maxWidth: '90vw',
                maxHeight: '90vh',
                borderRadius: '8px',
                boxShadow: '0 12px 48px rgba(0,0,0,0.5)',
                objectFit: 'contain'
              }}
              onClick={(e) => e.stopPropagation()} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </MarkdownContext.Provider>
  );
});

export default MarkdownRenderer;
