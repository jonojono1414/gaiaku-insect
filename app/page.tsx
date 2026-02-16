"use client";

import { useState, useEffect, useRef } from "react";
import { pests, categories } from "./data/pests";
import PestCard from "./components/PestCard";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = pests
    .filter((p) => (activeCategory ? p.categoryId === activeCategory : true))
    .filter(
      (p) =>
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.scientificName.toLowerCase().includes(search.toLowerCase()) ||
        p.description.includes(search)
    );

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    const items = grid.querySelectorAll(".scroll-fade-in-up");
    items.forEach((item) => {
      item.classList.remove("is-visible");
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, [filtered]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-green-50">
      {/* Hero */}
      <header className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-500 to-cyan-500 px-4 py-14 text-center text-white shadow-xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-10 top-5 text-6xl">🪲</div>
          <div className="absolute right-10 top-8 text-5xl">🦟</div>
          <div className="absolute bottom-5 left-1/4 text-4xl">🐝</div>
          <div className="absolute bottom-3 right-1/4 text-5xl">🦗</div>
          <div className="absolute left-1/3 top-2 text-3xl">🕷️</div>
          <div className="absolute right-1/3 bottom-6 text-4xl">🐜</div>
        </div>
        <h1 className="relative text-4xl font-extrabold tracking-tight drop-shadow-md md:text-5xl">
          🐝 害虫図鑑
        </h1>
        <p className="relative mt-3 text-lg font-medium text-emerald-100">
          あまり不快にならない憎めない害虫図鑑
        </p>

        {/* Search */}
        <div className="relative mx-auto mt-6 max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="害虫を検索..."
            className="w-full rounded-full bg-white/20 px-5 py-3 text-sm text-white placeholder-white/60 backdrop-blur-sm transition-all focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/20 px-2 py-0.5 text-xs text-white/80 hover:bg-white/30"
            >
              ✕
            </button>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* Controls */}
        <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`rounded-full px-4 py-2 text-sm font-bold transition-all ${
                activeCategory === null
                  ? "bg-emerald-500 text-white shadow-md scale-105"
                  : "bg-white text-gray-600 hover:bg-gray-100 shadow"
              }`}
            >
              すべて ({pests.length})
            </button>
            {categories.map((cat) => {
              const count = pests.filter((p) => p.categoryId === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`rounded-full px-4 py-2 text-sm font-bold transition-all ${
                    activeCategory === cat.id
                      ? "bg-emerald-500 text-white shadow-md scale-105"
                      : "bg-white text-gray-600 hover:bg-gray-100 shadow"
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>

        </div>

        {/* Result count */}
        {(activeCategory || search) && (
          <p className="mb-4 text-center text-sm text-gray-500">
            {filtered.length}件の害虫が見つかりました
          </p>
        )}

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {filtered.map((pest, index) => (
            <div
              key={pest.id}
              className="scroll-fade-in-up"
              style={{ animationDelay: `${Math.min(index * 0.06, 0.6)}s` }}
            >
              <PestCard pest={pest} />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-4xl">🔍</p>
            <p className="mt-4 text-gray-400">該当する害虫が見つかりません</p>
            <button
              onClick={() => {
                setActiveCategory(null);
                setSearch("");
              }}
              className="mt-4 rounded-full bg-emerald-500 px-6 py-2 text-sm font-bold text-white shadow transition hover:bg-emerald-600"
            >
              すべて表示
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 bg-gray-800 px-4 py-8 text-center text-sm text-gray-400">
        <p className="font-medium">害虫図鑑（claude画伯） &copy; 2026</p>
        <p className="mt-1 text-gray-500">身近な害虫を知って、正しく対策しよう</p>
      </footer>
    </div>
  );
}
