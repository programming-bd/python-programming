"use client";

import { useState } from "react";

interface CodeBlockProps {
  language: string;
  code: string;
}

// Helper to escape HTML characters
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Main highlight function
function highlightCode(code: string, language: string): string {
  if (language === "bash") {
    return highlightBash(code);
  }
  return highlightPython(code);
}

// Helper to safely highlight code using placeholders
function highlightWithPlaceholders(
  code: string,
  language: "python" | "bash"
): string {
  const lines = code.split("\n");

  return lines.map(line => {
    let result = line;
    const placeholders: string[] = [];

    // 1. Extract Strings and Comments to placeholders to prevent corruption
    // We strictly assume simple patterns for this lightweight highlighter

    // Comments (handle first)
    // Note: This simple regex doesn't handle '#' inside strings correctly if we do it first naively without precise parsing.
    // BUT, for a simple highlighter, distinguishing # inside string vs comment is hard without a tokenizer.
    // To do it better: Match Strings OR Comments in one go.

    const tokenRegex = language === "python"
      ? /((?:"""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|#.*$)/g
      : /((?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|#.*$)/g;

    result = result.replace(tokenRegex, (match) => {
      const isComment = match.startsWith("#");
      const className = isComment ? "comment" : "string";
      // Sanitize the content of the string/comment itself for display
      const safeContent = escapeHtml(match);
      placeholders.push(`<span class="${className}">${safeContent}</span>`);
      return `__TOKEN_${placeholders.length - 1}__`;
    });

    // 2. Escape remaining HTML (code logic)
    result = escapeHtml(result);

    // 3. Apply Syntax Highlighting (Keywords, specific to language)
    if (language === "python") {
      // Keywords
      const keywords = [
        "def", "class", "if", "elif", "else", "for", "while", "return",
        "import", "from", "as", "try", "except", "finally", "raise",
        "with", "in", "not", "and", "or", "is", "lambda", "break",
        "continue", "pass", "del", "global", "yield", "assert"
      ];

      // Use boundary check to avoid replacing inside other words
      const kwRegex = new RegExp(`\\b(${keywords.join("|")})\\b`, "g");
      result = result.replace(kwRegex, '<span class="keyword">$1</span>');

      // Built-ins
      const builtins = [
        "print", "input", "len", "range", "type", "int", "float",
        "str", "bool", "list", "dict", "tuple", "set", "sum",
        "min", "max", "sorted", "enumerate", "zip", "map",
        "filter", "open", "super", "isinstance", "id"
      ];
      const builtinRegex = new RegExp(`\\b(${builtins.join("|")})\\b(?=\\()`, "g");
      result = result.replace(builtinRegex, '<span class="builtin">$1</span>');

      // Numbers
      result = result.replace(/\b(\d+\.?\d*)\b/g, '<span class="number">$1</span>');

       // Constants
      result = result.replace(/\b(True|False|None)\b/g, '<span class="number">$1</span>');

      // Definitions (Function/Class names)
      // Look for keyword span followed by text
      result = result.replace(
        /(<span class="keyword">(?:def|class)<\/span>\s+)(\w+)/g,
        '$1<span class="function">$2</span>'
      );

    } else if (language === "bash") {
       // Commands
      const commands = ["python", "pip", "npm", "npx", "cd", "mkdir", "ls", "echo"];
      const cmdRegex = new RegExp(`\\b(${commands.join("|")})\\b`, "g");
      result = result.replace(cmdRegex, '<span class="keyword">$1</span>');

      // Flags
      result = result.replace(/(\s)(--?\w[\w-]*)/g, '$1<span class="function">$2</span>');
    }

    // 4. Restore Placeholders
    result = result.replace(/__TOKEN_(\d+)__/g, (_, index) => {
      return placeholders[parseInt(index)];
    });

    return result;
  }).join("\n");
}

function highlightPython(code: string): string {
    return highlightWithPlaceholders(code, "python");
}

function highlightBash(code: string): string {
    return highlightWithPlaceholders(code, "bash");
}

export default function CodeBlock({ language, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const highlighted = highlightCode(code, language);

  return (
    <div className="code-block">
      <div className="code-header">
        <div className="code-dots">
          <span className="code-dot" />
          <span className="code-dot" />
          <span className="code-dot" />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span className="code-lang">{language}</span>
          <button
            onClick={handleCopy}
            style={{
              background: "transparent",
              border: "1px solid #333",
              borderRadius: "6px",
              padding: "4px 10px",
              color: copied ? "#4ade80" : "#6b6b6b",
              cursor: "pointer",
              fontFamily: "Inter, sans-serif",
              fontSize: "11px",
              transition: "all 0.2s ease",
            }}
          >
            {copied ? "✓ কপি হয়েছে" : "কপি"}
          </button>
        </div>
      </div>
      <div className="code-body">
        <pre dangerouslySetInnerHTML={{ __html: highlighted }} />
      </div>
    </div>
  );
}
