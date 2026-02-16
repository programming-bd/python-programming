"use client";

import { useState, useEffect, useCallback } from "react";
import bookData from "@/data/book.json";
import CodeBlock from "@/components/CodeBlock";
import PythonLogo from "@/components/PythonLogo";

interface Section {
  id: string;
  title: string;
  content: string;
  code?: {
    language: string;
    content: string;
  };
  note?: string;
}

interface Chapter {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  sections: Section[];
}

interface BookData {
  title: string;
  subtitle: string;
  author: string;
  edition: string;
  year: string;
  description: string;
  coverQuote: string;
  chapters: Chapter[];
}

const book: BookData = bookData as BookData;

function renderContent(text: string) {
  // Parse markdown-like content into HTML
  const lines = text.split("\n");
  const result: string[] = [];
  let inTable = false;
  let tableRows: string[][] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Table detection
    if (line.startsWith("|") && line.endsWith("|")) {
      if (!inTable) {
        inTable = true;
        tableRows = [];
      }
      // Skip separator line
      if (line.match(/^\|[\s\-:|]+\|$/)) continue;

      const cells = line
        .split("|")
        .filter((c) => c.trim() !== "")
        .map((c) => c.trim());
      tableRows.push(cells);
      continue;
    } else if (inTable) {
      // Flush table
      inTable = false;
      result.push(buildTable(tableRows));
      tableRows = [];
    }

    // Bold
    let processed = line.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    // Inline code
    processed = processed.replace(
      /`([^`]+)`/g,
      '<code style="background:var(--color-bg-tertiary);color:var(--color-accent);padding:2px 6px;border-radius:4px;font-family:var(--font-mono);font-size:13px">$1</code>'
    );
    // Links (Markdown style [text](url))
    processed = processed.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    );

    // List items with bullet
    if (processed.startsWith("•")) {
      processed = `<li>${processed.substring(1).trim()}</li>`;
    }

    if (processed) {
      result.push(processed);
    } else {
      result.push("");
    }
  }

  if (inTable) {
    result.push(buildTable(tableRows));
  }

  // Wrap consecutive <li> in <ul>
  let html = result.join("\n");
  html = html.replace(
    /(<li>[\s\S]*?<\/li>\n?)+/g,
    (match) => `<ul>${match}</ul>`
  );

  // Convert double line breaks to paragraph breaks for better reading
  html = html.replace(/\n\n/g, "<br/><br/>");

  return html;
}

function buildTable(rows: string[][]): string {
  if (rows.length === 0) return "";
  const header = rows[0];
  const body = rows.slice(1);

  let html = '<table><thead><tr>';
  for (const cell of header) {
    let processed = cell.replace(
      /`([^`]+)`/g,
      '<code style="background:var(--color-bg-tertiary);color:var(--color-accent);padding:2px 6px;border-radius:4px;font-family:var(--font-mono);font-size:13px">$1</code>'
    );
    html += `<th>${processed}</th>`;
  }
  html += '</tr></thead><tbody>';

  for (const row of body) {
    html += '<tr>';
    for (const cell of row) {
      let processed = cell.replace(
        /`([^`]+)`/g,
        '<code style="background:var(--color-bg-tertiary);color:var(--color-accent);padding:2px 6px;border-radius:4px;font-family:var(--font-mono);font-size:13px">$1</code>'
      );
      html += `<td>${processed}</td>`;
    }
    html += '</tr>';
  }

  html += '</tbody></table>';
  return html;
}

// Helper to convert English digits to Bangla
const toBanglaDigits = (num: number | string) => {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num.toString().replace(/\d/g, (d) => banglaDigits[parseInt(d)]);
};

export default function Home() {
  const [activeChapter, setActiveChapter] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Load theme from local storage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const navigateToChapter = (id: number | null) => {
    setActiveChapter(id);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentChapter = activeChapter
    ? book.chapters.find((c) => c.id === activeChapter)
    : null;

  const currentIndex = activeChapter
    ? book.chapters.findIndex((c) => c.id === activeChapter)
    : -1;

  const prevChapter = currentIndex > 0 ? book.chapters[currentIndex - 1] : null;
  const nextChapter =
    currentIndex < book.chapters.length - 1
      ? book.chapters[currentIndex + 1]
      : null;

  return (
    <>
      <div className="progress-bar" style={{ width: `${scrollProgress}%` }} />

      {/* Mobile Header */}
        <div className="mobile-header">
          <button
            className="mobile-toggle"
            onClick={() => setSidebarOpen(true)}
            aria-label="মেনু খুলুন"
          >
            ☰
          </button>
          <div className="flex-1 flex items-center justify-center">
              <span className="mobile-title truncate px-2">
              {currentChapter ? currentChapter.title : book.title}
              </span>
          </div>
          <label className="toggle-switch-label" aria-label={theme === 'light' ? "ডার্ক মোড" : "লাইট মোড"}>
             <input
               type="checkbox"
               className="toggle-checkbox"
               checked={theme === 'dark'}
               onChange={toggleTheme}
             />
             <div className="toggle-slider"></div>
          </label>
        </div>

      <div className="app-layout">
        {/* Sidebar Overlay */}
        <div
          className={`sidebar-overlay ${sidebarOpen ? "open" : ""}`}
          onClick={() => setSidebarOpen(false)}
        />

        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="sidebar-header">
            <div className="sidebar-brand">
              <PythonLogo size={32} className="sidebar-logo" />
              <div className="sidebar-title">{book.title}</div>
            </div>
          </div>

          <nav className="sidebar-nav">
            <div className="nav-chapter">
              <button
                className={`nav-chapter-btn ${activeChapter === null ? "active" : ""}`}
                onClick={() => navigateToChapter(null)}
              >
                <span className="nav-chapter-title">প্রচ্ছদ</span>
              </button>
            </div>

            {book.chapters.map((chapter) => (
              <div className="nav-chapter" key={chapter.id}>
                <button
                  className={`nav-chapter-btn ${activeChapter === chapter.id ? "active" : ""}`}
                  onClick={() => navigateToChapter(chapter.id)}
                >
                  <span className="nav-chapter-number">
                    {String(chapter.id).padStart(2, "0")}
                  </span>
                  <span className="nav-chapter-title">{chapter.title}</span>
                </button>
              </div>
            ))}
          </nav>

          <div className="sidebar-footer">
             <div className="flex items-center justify-between w-full">
               <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.7 }}>
                   <span>By</span>
                   <a
                     href="https://www.sifat.net/"
                     target="_blank"
                     rel="noopener noreferrer"
                     style={{ fontWeight: 'bold', color: 'inherit', textDecoration: 'none' }}
                   >
                     {book.author}
                   </a>
               </div>
               {/* Theme Toggle Switch */}
               <label className="toggle-switch-label" aria-label={theme === 'light' ? "ডার্ক মোড" : "লাইট মোড"}>
                 <input
                   type="checkbox"
                   className="toggle-checkbox"
                   checked={theme === 'dark'}
                   onChange={toggleTheme}
                 />
                 <div className="toggle-slider"></div>
               </label>
             </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {activeChapter === null ? (
            /* Creative Cover Page */
            <div className="cover-page">
              <section className="hero-section">
                <div className="hero-content">
                  <h1 className="hero-brand-title">
                    <div className="hero-logo-wrapper">
                      <PythonLogo size={60} />
                    </div>
                    <span className="hero-title">
                      {book.title}
                    </span>
                  </h1>

                  <p className="hero-subtitle">
                    {book.subtitle}
                  </p>

                  <div className="hero-actions">
                    <button
                      className="hero-btn-primary"
                      onClick={() => navigateToChapter(1)}
                    >
                      পড়া শুরু করুন
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </button>
                  </div>

                  <div className="hero-stats">
                    <div className="hero-stat-item">
                      <div className="hero-stat-value">{toBanglaDigits(book.chapters.length)}</div>
                      <div className="hero-stat-label">সর্বমোট অধ্যায়</div>
                    </div>
                    <div className="hero-stat-divider"></div>
                    <div className="hero-stat-item">
                      <div className="hero-stat-value">{toBanglaDigits(book.edition.split(' ')[2])}</div>
                      <div className="hero-stat-label">লেটেস্ট এডিশন</div>
                    </div>
                    <div className="hero-stat-divider"></div>
                    <div className="hero-stat-item">
                      <div className="hero-stat-value">Free</div>
                      <div className="hero-stat-label">সবার জন্য উন্মুক্ত</div>
                    </div>
                  </div>
                </div>

                <div className="hero-visual">
                  <div className="hero-logo-large"></div>
                  <div className="hero-card">
                    <div className="hero-card-content">
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></div>
                      </div>
                      <pre style={{ margin: 0 }}>
                        <code style={{ fontSize: '14px', lineHeight: '1.6' }}>
                          <span style={{ color: '#c678dd' }}>def</span> <span style={{ color: '#61afef' }}>welcome</span>():{"\n"}
                          {"  "}print(<span style={{ color: '#98c379' }}>"Hello, Python!"</span>){"\n"}
                          {"\n"}
                          <span style={{ color: '#5c6370' }}># Start your journey</span>
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>

                <div style={{ position: 'absolute', bottom: '20px', left: 0, right: 0, textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: '12px', fontFamily: 'var(--font-inter)', opacity: 0.6 }}>
                  <p>Designed with ❤️ by <a href="https://www.sifat.net/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>{book.author}</a></p>
                </div>
              </section>
            </div>
          ) : currentChapter ? (
            /* Chapter Content */
            <div className="content-wrapper">
              <header className="chapter-header">
                <div className="chapter-label">
                  অধ্যায় {String(currentChapter.id).padStart(2, "0")}
                </div>
                <h1 className="chapter-title">{currentChapter.title}</h1>
                <p className="chapter-subtitle">{currentChapter.subtitle}</p>
              </header>

              {currentChapter.sections.map((section) => (
                <section className="section" key={section.id}>
                  {/* <div className="section-id">{section.id}</div> */}
                  <h2 className="section-title">{section.title}</h2>
                  <div
                    className="section-content"
                    dangerouslySetInnerHTML={{
                      __html: renderContent(section.content),
                    }}
                  />
                  {section.code && (
                    <CodeBlock
                      language={section.code.language}
                      code={section.code.content}
                    />
                  )}
                  {section.note && (
                    <div className="note-block">
                      <div className="note-block-title">নোট</div>
                      {section.note}
                    </div>
                  )}
                </section>
              ))}

              {/* Chapter Navigation */}
              <div className="chapter-nav">
                {prevChapter && (
                  <button
                    className="chapter-nav-btn prev"
                    onClick={() => navigateToChapter(prevChapter.id)}
                  >
                    <div className="chapter-nav-label">← পূর্ববর্তী</div>
                    <div className="chapter-nav-title">{prevChapter.title}</div>
                  </button>
                )}
                {nextChapter && (
                  <button
                    className="chapter-nav-btn next"
                    onClick={() => navigateToChapter(nextChapter.id)}
                  >
                    <div className="chapter-nav-label">পরবর্তী →</div>
                    <div className="chapter-nav-title">{nextChapter.title}</div>
                  </button>
                )}
              </div>
            </div>
          ) : null}
        </main>
      </div>
    </>
  );
}
