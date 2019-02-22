import React, {PureComponent} from 'react';


class CustomerRow extends PureComponent {

  handleClick = () => {
    this.props.showInfoOnCustomer(this.props.info.id);
  }

  render() {
    let rowClass = (this.props.selected) ? " selected": "";
    return (
      <tr className={`table__row${rowClass}`} onClick={this.handleClick}>
        <td className="table__cell">{this.props.info.id}</td>
        <td className="table__cell">{this.props.info.firstName}</td>
        <td className="table__cell">{this.props.info.lastName}</td>
        <td className="table__cell">{this.props.info.email}</td>
        <td className="table__cell">{this.props.info.phone}</td>
      </tr>
    );
  }
}

export default CustomerRow;