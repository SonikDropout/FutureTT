import React, {PureComponent} from 'react';

class TableHeadCell extends PureComponent {
  handleClick = () => {
    this.props.sortRows(this.props.correspondingKey);
  }

  render() {
    let cellClasses = (this.props.sortedDesc === false) ? " sortedAsc" : "";
    cellClasses += (this.props.sortedDesc === true) ? " sortedDesc": "";
    return (
      <th className={`table__cell${cellClasses}`} onClick={this.handleClick}>
        {this.props.title}
      </th>
    )
  }
}

export default TableHeadCell;