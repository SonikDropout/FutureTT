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
    if (this.state.selectedCustomerId) {
      const customerInfo = this.props.customers.filter(customer => {
        return customer.id === this.state.selectedCustomerId;
      });
      return <CustomerInfo info={customerInfo[0]} />
    }
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
    for (let customer of this.props.customers) {
      let selected = (counter === this.state.selectedRow);
      rows.push(<CustomerRow selected={selected} number={counter} showInfoOnCustomer={this.showInfoOnCustomer} key={customer.id} info={customer} />);
      counter++;
    }
    return <tbody className="table__body">{rows}</tbody>;
  }

  renderHeadCells() {
    let cells = [];
    const keys = Object.keys(this.props.customers[0]).slice(0,5);
    const headers = keys.map(key => {
      return key.replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase());
    });
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