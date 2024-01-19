import React from 'react';
import styles from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';

type Pagination = {
  value: number;
  onChangePage: any;
};

const Pagination: React.FC<Pagination> = ({ value, onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="< "
      nextLabel=" >"
      forcePage={value - 1}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
