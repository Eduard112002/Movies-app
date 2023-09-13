import { Pagination } from 'antd';
import './pagination-list.css';

const PaginationList = ({ cur, currentPage, total }) => {
  const totalList = total === null ? 50 : total;
  const onChange = (page) => {
    currentPage(page);
  };
  return (
    <div className="pagination">
      <Pagination current={cur} onChange={onChange} total={totalList} />
    </div>
  );
};

export default PaginationList;
