import React, { Component } from 'react';
import './Popup.css';

class LoadingPopup extends Component {
  render() {
    return (
      <div className="modal">
        <h5 className="modal__title">Please wait</h5>
        <div className="modal__body">
          <div className="modal__loader"></div>
        </div>
      </div>
    )
  }
}

export default LoadingPopup;