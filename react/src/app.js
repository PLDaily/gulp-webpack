import React from 'react';
import ReactDOM from 'react-dom';
//import App from './App';

/*var Counter = React.createClass({
	getInitialState: function() {
		return {
			count: 0
		}
	},
	handleClick: function() {
		this.setState({
			count: this.state.count + 1
		})
	},
	render: function() {
		return (
			<button onClick={this.handleClick}>
				Click me! {this.state.count}
			</button>
		)
	}
})*/

class Counter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {count: 0};
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick() {
		this.setState(() => ({
			count: this.state.count + 1
		}));
	}
	render() {
		return (
			<button onClick={this.handleClick}>
				Click me! {this.state.count}
			</button>
		)
	}
}

ReactDOM.render(
  <Counter />,
  document.getElementById('root')
);

