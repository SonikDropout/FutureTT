import React, { Component } from 'react';
import './Pagination.css';

class Pagination extends Component {

  previousPage = () => {
    this.props.setCurrentPage(this.props.page - 1);
  }

  nextPage = () => {
    this.props.setCurrentPage(this.props.page + 1);
  }

  render() {
    let isPreviousDisabled = this.props.page === 1;
    let isNextDisabled = this.props.page === this.props.maxPages;
    return (
      <div className="pagination">
        <button disabled={isPreviousDisabled} className="pagination__btn_prev btn" onClick={this.previousPage}>&laquo; Previous</button>
        <button disabled={isNextDisabled} className="pagination__btn_next btn" onClick={this.nextPage}>Next &raquo;</button>
      </div>
    )
  }
}

export default Pagination;