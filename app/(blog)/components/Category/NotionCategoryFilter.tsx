import { Flex, Tag } from 'antd';

import { CategoryFilterSkeleton } from './CategoryFilterSkeleton';

interface NotionCategoryFilterProps {
  onCategoryChange: (category: string) => void;
  activeCategory: string;
  categories: { category: string; order: number; count: number }[];
}

function CategoryTag({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <Tag
      color={active ? 'blue' : 'default'}
      onClick={onClick}
      style={{
        cursor: 'pointer',
        marginInlineEnd: 0,
        padding: '6px 10px',
        borderRadius: 16,
      }}
    >
      {label}
    </Tag>
  );
}

export function NotionCategoryFilter({
  onCategoryChange,
  activeCategory,
  categories,
}: NotionCategoryFilterProps) {
  if (!categories || categories.length === 0) {
    return <CategoryFilterSkeleton />;
  }

  const totalCount = categories.reduce((total, cat) => total + cat.count, 0);

  return (
    <Flex wrap gap={8}>
      <CategoryTag
        active={activeCategory === '전체'}
        onClick={() => onCategoryChange('전체')}
        label={`전체 (${totalCount})`}
      />
      {categories.map((cat) => (
        <CategoryTag
          key={cat.category}
          active={activeCategory === cat.category}
          onClick={() => onCategoryChange(cat.category)}
          label={`${cat.category} (${cat.count})`}
        />
      ))}
    </Flex>
  );
}
