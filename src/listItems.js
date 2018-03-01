import React, { Component } from 'react';


class NumberList extends Component {
	render() {
		// const classes=`${(prod.stocked) ? 'stock' : 'outOfStock'} ${(this.props.stock) ? 'hide' : 'show'}`;
		const listItems = this.props.prods.map((prod) =>
			<li key={prod.id}
				className={(prod.stocked) ? 'stock' : 'outOfStock'}
				style={(this.props.stock && !prod.stocked) ? { 'display': 'none' } : { 'display': 'block' }}>
				{prod.name} - {prod.price}
			</li >
		);
		return (
			<div>
				<ul>{listItems}</ul>
			</div >
		);
	}
}


export default NumberList;