import { Pagination } from 'antd';
import './pagination-list.css';

const PaginationList = ({ cur, currentPage, total, rated, pageRated }) => {
  const totalList = total === null ? 50 : total;
  const totalPages = rated ? pageRated * 10 : totalList;
  const onChange = (page) => {
    currentPage(page);
  };
  return (
    <div className="pagination">
      <Pagination current={cur} onChange={onChange} total={totalPages} />
    </div>
  );
};

export default PaginationList;
