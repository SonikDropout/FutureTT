import React, { Component } from 'react';
import './CustomerInfo.css';

class CustomerInfo extends Component {
  render() {
    return (
      <div className='info'>
        <p className="info__row">
          Selected customer: 
          <b> {`${this.props.info.firstName} ${this.props.info.lastName}`}</b>
        </p>
        <p className="info__row">
          Description: 
          <textarea className="info__textarea" rows="8" defaultValue={this.props.info.about} />
        </p>
        <p className="info__row">
          Street address: 
          <b> {this.props.info.address.streetAddress}</b>
        </p>
        <p className="info__row">
          City: 
          <b> {this.props.info.address.city}</b>
        </p>
        <p className="info__row">
          State: 
          <b> {this.props.info.address.state}</b>
        </p>
        <p className="info__row">
          Zip: 
          <b> {this.props.info.address.zip}</b>
        </p>
      </div>
    );
  }
}

export default CustomerInfo;