import { Pagination as AntdPagination } from 'antd';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        margin: '2rem 0',
      }}
    >
      <AntdPagination
        current={currentPage}
        total={totalPages * 10}
        pageSize={10}
        showSizeChanger={false}
        onChange={(page) => onPageChange(page)}
      />
    </div>
  );
}
