import React, { Component } from 'react';
import axios from 'axios';
import Popup from './components/Popup';
import CustomersTable from './components/CustomersTable';
import Pagination from './components/Pagination';
import fakeShortData from './backupData/shortList.json';
import fakeFullData from './backupData/fullList.json';
import SearchBar from './components/SearchBar';

class App extends Component {
  constructor(props) {
    super(props);
    this.customersPerPage = 50;
    this.fullListLength = 1000;
    this.shortListLength = 32;
    this.state = {
      customers: [],
      isFullListRequested: false,
      isShortListRequested: false,
      isDataLoaded: false,
      isErrorLoading: false,
      currentPage: 1
    }
  }

  renderPopup() {
    if (!this.state.isDataSetChosen) {
      return  <Popup loadData={this.loadCustomers}
                     fullListLength={this.fullListLength}
                     shortListLength={this.shortListLength}
              />; 
    } else if (!this.state.isDataLoaded) {
      return <Popup loading={true}/>
    }
  }

  loadCustomers = number => {
    this.switchStateToLoading();
    this.fetchFakeAPI(number).then(customers => {
      this.setLoadedCustomers(customers)
    }).catch(err => this.handleError(number));
  }

  switchStateToLoading() {
    this.setState({
      isDataSetChosen: true
    })
  }

  fetchFakeAPI = async (number) => {
    const response = await axios.get(
      'http://www.filltext.com/', {
        params: {
          rows: number,
          id: '{number|1000}',
          firstName: '{firstName}',
          lastName: '{lastName}',
          email: '{email}',
          phone: '{phone|(xxx)xxx-xx-xx}',
          address: '{addressObject}',
          description: '{lorem|32}'
        }
      });
    return JSON.parse(response);
  }

  setLoadedCustomers(customers) {
    // just a little hack to avoid same id 
    // for multiple customers
    customers.forEach((customer, index) => {
      customer.id = index + 1;
    })
    this.setState({
      customers: customers,
      isDataLoaded: true
    })
  }

  handleError(number) {
    switch (number) {
      case this.fullListLength:
        this.setState({
          customers: fakeFullData,
          isDataLoaded: true
        });
        break;
      default:
        this.setState({
          customers: fakeShortData,
          isDataLoaded: true
        });
        break;
    }
  }

  renderTable() {
    if (this.state.isDataLoaded) {
      return <CustomersTable currentPage={this.state.currentPage} customers={this.customersChunk} />
    }
  }

  get customersChunk() {
    let currentChunk = (this.state.customers.length > this.customersPerPage) ? 
      this.state.customers.slice(
        (this.state.currentPage - 1)*this.customersPerPage,
         this.state.currentPage * this.customersPerPage
        ):
      this.state.customers;
    if (this.state.searchQuery) {
      return this.filterCustomersBySearchQuery(currentChunk);
    }
    return currentChunk;
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

  renderPaginatinon() {
    const maxPages = Math.ceil(this.state.customers.length/this.customersPerPage);
    if (this.state.isDataLoaded && maxPages > 1) {
      return <Pagination maxPages={maxPages} page={this.state.currentPage} setCurrentPage={this.setCurrentPage} />
    }
  }

  setCurrentPage = (number) => {
    this.setState({
      currentPage: number
    })
  }

  render() {
    return (
      <div className="container">
        {this.renderPopup()}
        {this.renderSearchBar()}
        {this.renderTable()}
        {this.renderPaginatinon()}
      </div>
    );
  }
}

export default App;
