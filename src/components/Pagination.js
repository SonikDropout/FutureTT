import React, { Component } from 'react';
import './Pagination.css';

class Pagination extends Component {

  previousPage = () => {
    if (this.props.page > 1) {
      this.props.setCurrentPage(this.props.page - 1);
    }
  }

  nextPage = () => {
    if (this.props.page < this.props.maxPages) {
      this.props.setCurrentPage(this.props.page + 1);
    }
  }

  firstPage = () => {
    this.props.setCurrentPage(1);
  }

  lastPage = () => {
    this.props.setCurrentPage(this.props.maxPages);
  }
  
  renderPagesLinks() {
    let links = [];
    let firstNumberInRow = (this.props.page > this.props.maxPages - 5) ? this.props.maxPages - 4: this.props.page;
    for (let i = firstNumberInRow; i < firstNumberInRow + 5; i++) {
      links.push(<PaginationLink currentPage={this.props.page} setCurrentPage={this.props.setCurrentPage} correspondingPage={i} />);
    }
    return links;
  }

  render() {
    let previousClasses = "pagination__item" + ((this.props.page === 1) ? " disabled": "");
    let nextClasses = "pagination__item" + ((this.props.page === this.props.maxPages) ? " disabled": "");
    return (
      <div className="pagination">
        <ul className="pagination__list">
          <li onClick={this.firstPage} className="pagination__item">&laquo;</li>
          <li onClick={this.previousPage} className={previousClasses}>&#8249;</li>
          {this.renderPagesLinks()}
          <li onClick={this.nextPage} className={nextClasses}>&#8250;</li>
          <li onClick={this.lastPage} className="pagination__item">&raquo;</li>
        </ul>
      </div>
    )
  }
}


class PaginationLink extends Component {
  handleClick = () => {
    this.props.setCurrentPage(this.props.correspondingPage);
  }

  render() {
    let classes = "pagination__item" + ((this.props.correspondingPage === this.props.currentPage) ? " active" : "");
    return <li className={classes} onClick={this.handleClick}>{this.props.correspondingPage}</li>
  }
}

export default Pagination;