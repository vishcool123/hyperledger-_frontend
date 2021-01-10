/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable no-else-return */
/* eslint-disable curly */
import React from 'react';
import { Search } from 'react-bootstrap-table2-toolkit';
// import moment from 'moment';

export const { SearchBar } = Search;

const sizePerPageList = [
  {
    text: '5',
    value: 5,
  },
  {
    text: '10',
    value: 20,
  },
  {
    text: '20',
    value: 50,
  },
  {
    text: '40',
    value: 40,
  },
];

export const tableOptions = {
  // pageStartIndex: 0,
  // hideSizePerPage: true,
  sizePerPageList,
  alwaysShowAllBtns: true,
  prePageText: 'Previous',
  nextPageText: 'Next',
  withFirstAndLast: false,
  showTotal: true,
//   paginationTotalRenderer: 10,
};

export const defaultSorted = [
  {
    dataField: 'title',
    order: 'desc',
  },
];

export const customTotal = (from, to, size) => (
  <span className="react-bootstrap-table-pagination-total">
    Showing
    {' '}
    {from}
    {' '}
    to
    {' '}
    {to}
    {' '}
    of
    {' '}
    {size}
    {' '}
    Results
  </span>
);

// export const sortDates = (a, b, order) => {
//   if (order === 'desc') {
//     return moment(a, 'DD/MM/YYYY') - moment(b, 'DD/MM/YYYY');
//   }
//   return moment(b, 'DD/MM/YYYY') - moment(a, 'DD/MM/YYYY');
// };

export const sorting = (a, b, order) => {
  let aLower = a.toLowerCase();
  let bLower = b.toLowerCase();
  if (order === 'asc') {
    if (aLower < bLower) {
      return -1;
    }
    if (aLower > bLower) {
      return 1;
    }
    return 0;
  }
  if (order === 'desc') {
    if (aLower > bLower) {
      return -1;
    }
    if (aLower < bLower) {
      return 1;
    }
    return 0;
  }
};

// export const getDate = (dateString) => moment(dateString).format('DD-MM-YYYY');

// export const getUTCDate = (dateString) => moment.utc(dateString).format('DD-MM-YYYY');

export const customSort = (order, column) => {
  if (!order) return <span>&nbsp;&nbsp;↑↓</span>;
  else if (!order || order === 'asc') return (
    <span>
        &nbsp;&nbsp;↑
      <font color="red">↓</font>
    </span>
  );
  else if (order === 'desc')
  // eslint-disable-next-line brace-style
  { return (
    <span>
        &nbsp;&nbsp;
      <font color="red">↑</font>
      ↓
    </span>
  );
  }
  return null;
};
