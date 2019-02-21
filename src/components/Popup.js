import React, { Component } from 'react';
import './Popup.css';

class Popup extends Component {

  loadFullData = () => {
    this.props.loadData(this.props.fullListLength);
  }

  loadShortData = () => {
    this.props.loadData(this.props.shortListLength);
  }

  get modalTitle() {
    if (this.props.loading) {
      return 'Please wait';
    }
    return 'Choose data set';
  }

  renderBody() {
    if (this.props.loading) {
      return (
        <div className="modal__body">
          <div className="modal__loader"></div>
        </div>
        )
    } else {
      return (
        <div className="modal__body">
          <p className="modal__text">Please choose which data set to load from the server</p>
          <div className="modal__controls">
            <button onClick={this.loadShortData} className="modal__btn btn">Short</button>
            <button onClick={this.loadFullData} className="modal__btn btn">Full</button>
          </div>
        </div>
        )
    }
  }

	render() {
		return (
			<div className="modal">
	      <h5 className="modal__title">{this.modalTitle}</h5>
	      {this.renderBody()}
			</div>
		)
	}
}

export default Popup;