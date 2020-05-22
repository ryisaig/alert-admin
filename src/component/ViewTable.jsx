import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import TableHeaderColumn from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

function ViewTable(props) {

  const customPaginationFactory = paginationFactory({
    page: 1, // Specify the current page. It's necessary when remote is enabled
    sizePerPage: 10, // Specify the size per page. It's necessary when remote is enabled
    totalSize: props.values.data.length, // Total data size. It's necessary when remote is enabled
    pageStartIndex: 1, // first page will be 0, default is 1
    showTotal: true, // display pagination information
    sizePerPageList: [{
      text: '5', value: 5
    }, {
      text: '10', value: 10
    }, {
      text: 'All', value: props.values.data.length
    }], // A numeric array is also available: [5, 10]. the purpose of above example is custom the text
    withFirstAndLast: true, // hide the going to first and last page button
    alwaysShowAllBtns: true, // always show the next and previous page button
    hideSizePerPage: true, // hide the size per page dropdown
    onPageChange: (page, sizePerPage) => { }, // callback function when page was changing
    onSizePerPageChange: (sizePerPage, page) => { }, // callback function when page size was changing
  })
  return (
            <div>
              <BootstrapTable id="viewListTable" striped responsive
                keyField='id' columns={props.values.columns}
                data={props.values.data}
                pagination={customPaginationFactory}
                filter={filterFactory()}/>
            </div>
  )
}

export default ViewTable;
