'use client';

import { useState, useEffect, useRef } from 'react';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

type SearchResult = {
  slug: string;
  title: string;
  overview: string;
  date: string;
  tags: string[];
  matchType: {
    title: boolean;
    content: boolean;
    tags: boolean;
    overview: boolean;
  };
};

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  
  // 从URL获取查询参数
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setQuery(q);
      handleSearch(q);
    }
  }, [searchParams]);
  
  // 点击外部关闭搜索结果
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // 搜索处理函数
  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setShowResults(false);
      return;
    }
    
    setIsSearching(true);
    setShowResults(true);
    
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      setResults(data.posts);
    } catch (error) {
      console.error('搜索出错:', error);
    } finally {
      setIsSearching(false);
    }
  };
  
  // 防抖处理
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        handleSearch(query);
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [query]);
  
  // 提交搜索表单
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setShowResults(false);
    }
  };
  
  return (
    <div className="relative" ref={searchRef}>
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && setShowResults(true)}
          placeholder="搜索文章..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-color"
        />
        <button
          type="submit"
          className="ml-2 p-2 bg-accent-color text-white rounded-lg hover:bg-opacity-90"
        >
          搜索
        </button>
      </form>
      
      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg z-10 max-h-96 overflow-y-auto">
          {isSearching ? (
            <div className="p-4 text-center">搜索中...</div>
          ) : results.length > 0 ? (
            <ul>
              {results.map((post) => (
                <li key={post.slug} className="border-b border-gray-100 last:border-none">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block p-4 hover:bg-gray-50"
                    onClick={() => setShowResults(false)}
                  >
                    <h4 className="font-medium text-lg">
                      {post.matchType.title ? (
                        <span className="bg-yellow-100">{post.title}</span>
                      ) : (
                        post.title
                      )}
                    </h4>
                    <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                      {post.overview}
                    </p>
                    {post.matchType.tags && post.tags.length > 0 && (
                      <div className="flex gap-2 mt-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-gray-100 px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          ) : query ? (
            <div className="p-4 text-center">没有找到相关文章</div>
          ) : null}
        </div>
      )}
    </div>
  );
}