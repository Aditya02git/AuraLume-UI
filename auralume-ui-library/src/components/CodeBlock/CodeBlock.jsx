import React, { useEffect, useRef, useState } from 'react';
import './CodeBlock.css';


const CodeBlock = ({ 
  children, 
  language = 'javascript', 
  showLineNumbers = false, 
  highlightLines = '',
  className = '',
  showCopyButton = true,
  ...props 
}) => {
  const codeRef = useRef(null);
  const preRef = useRef(null);
  const [copied, setCopied] = useState(false);

  // Trim whitespace from children content
  const trimmedContent = typeof children === 'string' 
    ? children.trim() 
    : React.Children.toArray(children).join('').trim();

  useEffect(() => {
    // Add line numbers if needed
    if (showLineNumbers && preRef.current && codeRef.current) {
      // Remove existing line numbers
      const existingNumbers = preRef.current.querySelector('.line-numbers-rows');
      if (existingNumbers) {
        existingNumbers.remove();
      }

      // Create line numbers
      const lines = trimmedContent.split(/\r\n|\r|\n/).length;
      const numbersContainer = document.createElement('div');
      numbersContainer.className = 'line-numbers-rows';
      numbersContainer.setAttribute('aria-hidden', 'true');

      for (let i = 0; i < lines; i++) {
        const span = document.createElement('span');
        numbersContainer.appendChild(span);
      }

      preRef.current.insertBefore(numbersContainer, codeRef.current);
    }

    // Check if Prism is available globally
    if (typeof window !== 'undefined' && window.Prism && codeRef.current) {
      // Highlight the code
      window.Prism.highlightElement(codeRef.current);
    } else if (typeof window !== 'undefined' && window.hljs && codeRef.current) {
      // Fallback to highlight.js if available
      window.hljs.highlightElement(codeRef.current);
    }
  }, [trimmedContent, language, showLineNumbers]);

  const copyCode = async () => {
    if (!codeRef.current) return;

    try {
      // Modern clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(codeRef.current.textContent);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = codeRef.current.textContent;
        textArea.style.position = 'absolute';
        textArea.style.left = '-999999px';
        document.body.prepend(textArea);
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.warn('Failed to copy code:', err);
    }
  };

  const languageClass = `language-${language}`;
  const lineNumbersClass = showLineNumbers ? 'line-numbers' : '';
  const combinedClassName = `${languageClass} ${lineNumbersClass} ${className}`.trim();

  return (
    <figure className="code-block-container" {...props}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: '10px', paddingRight: '10px'}}>
        <div style={{display: 'flex', alignItems: 'center',gap: '6px'}}>
          <img 
            src="https://cdn.jsdelivr.net/gh/Aditya02git/Icons/terminal.png" 
            height="15px" 
            width="15px"
            style={{filter: 'brightness(0) saturate(100%) invert(54%) sepia(0%) saturate(0%) hue-rotate(180deg) brightness(90%) contrast(85%)'}} 
          />
          <figcaption className="code-block-caption">
            {language}
          </figcaption>
        </div>
        {showCopyButton && (
          <button 
            className="copy-button"
            onClick={copyCode}
            title={copied ? 'Copied!' : 'Copy'}
            aria-label={copied ? 'Copied to clipboard' : 'Copy code to clipboard'}
          >
            {copied ? 
              <div style={{display: 'flex', alignItems: 'center', gap: '0.3rem', backgroundColor: '#1e293b', padding: '3px 5px', borderRadius: '6px'}}><img src="https://cdn.jsdelivr.net/gh/Aditya02git/Icons/check.png" alt='copied!' height="13px" width="13px" style={{filter: 'brightness(0) invert(1)'}} /><p>copied</p></div> : 
              <div className='copy-main' style={{display: 'flex', alignItems: 'center', gap: '0.3rem', backgroundColor: '#1e293b', padding: '4px 5px', borderRadius: '6px'}}><img src="https://cdn.jsdelivr.net/gh/Aditya02git/Icons/copy.png" alt='copy' height="13px" width="13px" style={{filter: 'brightness(0) invert(1)'}} /></div>
            }
          </button>
        )}
      </div>
      <pre 
        ref={preRef}
        className={combinedClassName}
        data-line={highlightLines || undefined}
      >
        <code 
          ref={codeRef}
          className={languageClass}
          contentEditable="false"
          tabIndex="0"
          spellCheck="false"
        >
          {trimmedContent}
        </code>
      </pre>
    </figure>
  );
};

export default CodeBlock;