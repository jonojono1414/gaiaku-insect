"use client";

import Link from "next/link";
import type { Pest } from "../data/pests";
import PestSvg from "./PestSvg";

type Props = {
  pest: Pest;
};

const dangerLabel = (level: number) => {
  return "★".repeat(level) + "☆".repeat(5 - level);
};

const dangerColor = (level: number) => {
  if (level >= 5) return "text-red-500";
  if (level >= 4) return "text-orange-500";
  if (level >= 3) return "text-yellow-500";
  return "text-green-500";
};

const categoryColors: Record<string, string> = {
  cockroach: "bg-amber-700 text-white",
  "mosquito-fly": "bg-sky-500 text-white",
  "mite-flea": "bg-rose-500 text-white",
  spider: "bg-purple-600 text-white",
  "ant-beetle": "bg-red-700 text-white",
  other: "bg-yellow-500 text-white",
};

export default function PestCard({ pest }: Props) {
  return (
    <Link href={`/pests/${pest.id}`}>
      <div className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
        <div className="relative flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-5">
          <PestSvg id={pest.id} size={160} />
          {/* Danger badge */}
          {pest.danger >= 4 && (
            <span className="absolute right-3 top-3 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
              {pest.danger >= 5 ? "危険" : "注意"}
            </span>
          )}
        </div>
        <div className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                categoryColors[pest.categoryId] ?? "bg-gray-500 text-white"
              }`}
            >
              {pest.category}
            </span>
            <span className={`text-xs ${dangerColor(pest.danger)}`}>
              {dangerLabel(pest.danger)}
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-800 transition-colors group-hover:text-emerald-600">
            {pest.name}
          </h3>
          <p className="mt-0.5 text-xs italic text-gray-400">
            {pest.scientificName}
          </p>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-600">
            {pest.description}
          </p>
          <div className="mt-3 flex items-center text-xs font-medium text-emerald-500 opacity-0 transition-opacity group-hover:opacity-100">
            詳しく見る →
          </div>
        </div>
      </div>
    </Link>
  );
}
