import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
  state = { value: "" }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.searchInfo(this.state.value)
  }

  render() {
    return (
      <form className="search">
        <input className="search__input" name="search" type="text" placeholder="Search" onChange={this.handleChange} />
        <button className="search__btn btn" type="submit" onClick={this.handleSubmit}>Search</button>
      </form>
    );
  }
}

export default SearchBar;