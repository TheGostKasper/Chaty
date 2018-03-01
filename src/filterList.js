import React, { Component } from 'react';

  import NumberList from './listItems'

  class FilterList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        stocked:'',
        prodList: [],
        filteredList:[]
      };
      var PRODUCTS = [
        { id: 1, category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' },
        { id: 2, category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },
        { id: 3, category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },
        { id: 4, category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' },
        { id: 5, category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' },
        { id: 6, category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }
      ];
      this.state.prodList = PRODUCTS;
      this.state.filteredList = PRODUCTS;
      this.stocked=false;
    }

    filterList = (e) => {
      this.setState({
        prodList: this.state.filteredList.filter(prod => prod.name.toLowerCase().includes(e.target.value.toLowerCase()))
      });
    }
    handleCheckChange=(e)=>{
      this.setState({
        stocked:!this.state.stocked
      })
    }

    render(){
    	return(
    		 <div className="App-intro">
	            <input type="search" onChange={this.filterList} />
              <p><input type="checkbox" checked={this.state.stocked}  onChange={this.handleCheckChange}/> Only show products in stock</p>
	            <NumberList prods={this.state.prodList} stock={this.state.stocked}/>
          </div>
      )
    }
  }

 export default FilterList;