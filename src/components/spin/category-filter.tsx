'use client';

import { Badge } from '@/components/ui/badge';

interface CategoryFilterProps {
  categories: readonly string[];
  selected: string | null;
  onSelect: (category: string | null) => void;
}

export function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex w-full overflow-x-auto pb-4 gap-2 scrollbar-none items-center justify-start sm:flex-wrap">
      <Badge
        variant={selected === null ? 'default' : 'outline'}
        className="cursor-pointer whitespace-nowrap transition-colors py-2"
        onClick={() => onSelect(null)}
      >
        All
      </Badge>
      {categories.map((category) => (
        <Badge
          key={category}
          variant={selected === category ? 'default' : 'outline'}
          className="cursor-pointer whitespace-nowrap transition-colors py-2"
          onClick={() => onSelect(category)}
        >
          {category}
        </Badge>
      ))}
    </div>
  );
}
