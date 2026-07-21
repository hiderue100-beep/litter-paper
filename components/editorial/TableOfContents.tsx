'use client';

import React, { useState, useEffect } from 'react';
import { List, Check } from 'lucide-react';

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  toc?: TocItem[];
}

export function TableOfContents({ toc = [] }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const headings = document.querySelectorAll('h2, h3');
      let currentId = '';

      headings.forEach((heading) => {
        const top = heading.getBoundingClientRect().top;
        if (top <= 120) {
          currentId = heading.id || '';
        }
      });

      if (currentId) setActiveId(currentId);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!toc || toc.length === 0) return null;

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-[#1D231E] border border-[#ECECEC] dark:border-[#2A332C] sticky top-28 shadow-xs">
      <h3 className="text-xs font-bold uppercase tracking-wider text-[#3D5A40] dark:text-[#E8DCC7] mb-3 flex items-center gap-1.5">
        <List className="w-4 h-4" /> 목차 (Table of Contents)
      </h3>
      <nav className="space-y-1.5 text-xs">
        {toc.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`block py-1.5 px-2.5 rounded-lg transition-colors leading-normal ${
              item.level === 3 ? 'pl-5' : ''
            } ${
              activeId === item.id
                ? 'bg-[#3D5A40] text-white font-bold'
                : 'text-[#6E6E6E] dark:text-[#9EAAA0] hover:text-[#202020] dark:hover:text-[#F2F5F3] hover:bg-[#FAF9F7] dark:hover:bg-[#252C26]'
            }`}
          >
            {item.title}
          </a>
        ))}
      </nav>
    </div>
  );
}
