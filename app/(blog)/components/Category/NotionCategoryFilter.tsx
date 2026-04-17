import { Flex, Tag } from 'antd';

import { CategoryFilterSkeleton } from './CategoryFilterSkeleton';

interface NotionCategoryFilterProps {
  onCategoryChange: (category: string) => void;
  activeCategory: string;
  categories: { category: string; order: number; count: number }[];
}

const ALL_CATEGORY = '전체';

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
      bordered={false}
      onClick={onClick}
      style={{
        cursor: 'pointer',
        marginInlineEnd: 0,
        padding: '7px 12px',
        borderRadius: 999,
        fontSize: 13,
        fontWeight: active ? 700 : 500,
        color: active ? '#1f3f8f' : '#4b5563',
        background: active ? 'rgba(31, 63, 143, 0.1)' : 'rgba(95, 85, 66, 0.06)',
        border: active
          ? '1px solid rgba(31, 63, 143, 0.18)'
          : '1px solid rgba(95, 85, 66, 0.12)',
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
        active={activeCategory === ALL_CATEGORY}
        onClick={() => onCategoryChange(ALL_CATEGORY)}
        label={`${ALL_CATEGORY} (${totalCount})`}
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

export { ALL_CATEGORY };
