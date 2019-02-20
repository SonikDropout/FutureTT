import React, { Component } from 'react';
import Popup from './components/Popup';
import CustomersTable from './components/CustomersTable';
import fakeJSONRqeust from './fakeData/fakeJSON';
import fakeShortData from './fakeData/shortList.json';
import fakeFullData from './fakeData/fullList.json';
import SearchBar from './components/SearchBar';

class App extends Component {
  state = {
    customers: [],
    isDataSetChosen: false,
    isDataLoaded: false,
    isErrorLoading: false,
    currentPage: 1
  }

  switchStateToLoading() {
    this.setState({
      isDataSetChosen: true
    })
  }

  // TODO implement loading full fake data
  handleError() {
    this.setState({
      customers: fakeShortData,
      isDataLoaded: true
    });
  }

  setLoadedCustomers(data) {
    this.setState({
      customers: data.sort((customer1, customer2) => {
          return customer1.id - customer2.id;
        }),
      isDataLoaded: true
    })
  }

  fetchFakeAPI = async (number) => {
    const response = await fetch(
      `http://www.filltext.com/?rows=${number}
      &id={number|1000}
      &firstName={firstName}
      &lastName={lastName}
      &email={email}
      &phone={phone|(xxx)xxx-xx-xx}
      &address={addressObject}
      &description={lorem|32}`);
    return await response.json();
  }

  loadCustomers = number => {
    this.switchStateToLoading();
    this.fetchFakeAPI(number).then(customers => {
      this.setLoadedCustomers(customers)
    }).catch(err => this.handleError());
  }

  renderPopup() {
    if (!this.state.isDataSetChosen) {
      return  <Popup loadData={this.loadCustomers}/>; 
    } else if (!this.state.isDataLoaded) {
      return <Popup loading={true}/>
    }
  }

  renderTable() {
    if (this.state.isDataLoaded) {
      return <CustomersTable customers={this.customersChunk} />
    }
  }

  get customersChunk() {
    let currentChunk = (this.state.customers.length > 50) ? 
      this.state.customers.slice(
        (this.currentPage - 1)*50,
         this.currentPage
        ):
      this.state.customers;
    if (this.state.searchQuery) {
      return this.filterCustomersBySearchQuery(currentChunk);
    }
    return currentChunk;
  }

  filterCustomersProperties(customers) {
    let customersInfo = [];
    for (let customer of customers) {
      let customerInfo = Object.entries(customer).slice(0,5).reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});
      customersInfo.push(customerInfo);
    }
    console.log(customersInfo);
    return customersInfo;
  }

  filterCustomersBySearchQuery(customers) {
    customers = this.filterCustomersProperties(customers);
    let results = []
    for (let customer of customers) {
      for (let property in customer) {
        if (String(customer[property]).search(this.state.searchQuery) !== -1) {
          results.push(customer);
          break;
        } 
      }
    }
    console.log(results)
    return results;
  }

  renderSearchBar() {
    if (this.state.isDataLoaded) {
      return <SearchBar searchInfo={this.searchInfo} />
    }
  }

  searchInfo = query => {
    this.setState({
      searchQuery: query
    })
  }

  render() {
    return (
      <div className="container">
        {this.renderPopup()}
        {this.renderSearchBar()}
        {this.renderTable()}
      </div>
    );
  }
}

export default App;
