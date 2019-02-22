import React, { Component } from 'react';
import CustomerRow from './CustomerRow';
import CustomerInfo from './CustomerInfo';
import TableHeadCell from './TableHeadCell';
import './CustomersTable.css';

class CustomerTable extends Component {
  state = {
    sorted: {
      key: 'id',
      isDescending: true
    },
  }

  // unset selected row when turning page
  // unset selected row when data gets filtered
  componentWillUpdate(nextProps, nextState) {
    if (this.props.currentPage !== nextProps.currentPage) {
      nextState.selectedRow = null;
      nextState.selectedCustomerId = null;
    }
  }

  sortCustomersBy = (key) => {
    let isDescending = true;
    if (this.state.sorted.key === key) {
      isDescending = !this.state.sorted.isDescending;
    }
    if (key === 'id') {
      this.props.customers.sort((customer1, customer2) => {
      return (isDescending) ?
       customer1[key] - customer2[key]:
       customer2[key] - customer1[key];
      });
    } else {
      this.props.customers.sort((customer1, customer2) => {
        return (isDescending) ?
         customer1[key].localeCompare(customer2[key]):
         customer2[key].localeCompare(customer1[key]);
      });
    }
    this.setState({
      sorted: {
        key: key,
        isDescending: isDescending
      }
    })
  }

  renderInfo() {
    const id = this.state.selectedCustomerId;
    if (id && this.isCustomerNotFiltered(id)) {
      const customerInfo = this.props.customers.filter(customer => {
        return customer.id === this.state.selectedCustomerId;
      })[0];
      return <CustomerInfo info={customerInfo} />
    }
  }

  isCustomerNotFiltered(id) {
    for (let customer of this.props.customers) {
      if (customer.id === id) {
        return true;
      }
    }
    return false;
  }

  showInfoOnCustomer = (id, number) => {
    this.setState({
      selectedCustomerId: id,
      selectedRow: number
    })
  }

  renderRows() {
    let rows = [];
    let counter = 0;
    // if customers empty return one row
    if (!this.props.customers.length) {
      return <tr className="table__row empty"><td className="table__cell" colSpan="5">No data found</td></tr>
    }
    for (let customer of this.props.customers) {
      let selected = (customer.id === this.state.selectedCustomerId);
      rows.push(<CustomerRow selected={selected} number={counter} showInfoOnCustomer={this.showInfoOnCustomer} key={customer.id} info={customer} />);
      counter++;
    }
    return <tbody className="table__body">{rows}</tbody>;
  }

  renderHeadCells() {
    let cells = [];
    const headers = ["Id", "First Name", "Last Name", "Email", "Phone"];
    // if customers is an empty array return non-interactive table head
    if(!this.props.customers.length) {
      for (let i = 0; i < headers.length; i++) {
        cells.push(<th key={i} className="table__cell">{headers[i]}</th>)
      }
      return <tr className="table__row">{cells}</tr>
    }
    const keys = Object.keys(this.props.customers[0]).slice(0,5);
    for (let i = 0; i < headers.length; i++) {
      const sorted = this.state.sorted.key === keys[i];
      const sortedDesc = (sorted) ? this.state.sorted.isDescending : undefined;
      cells.push(<TableHeadCell key={i} sortedDesc={sortedDesc} sortRows={this.sortCustomersBy} title={headers[i]} correspondingKey={keys[i]} />);
    }
    return <tr className="table__row">{cells}</tr>
  }

	render() {
		return (
			<div className="tableWrapper">
        <table className="table">
          <thead className="table__head">
            {this.renderHeadCells()}
          </thead>
          {this.renderRows()}
        </table>
        {this.renderInfo()}
      </div>
		);
	}
}

export default CustomerTable;