import React from 'react'

export default React.createClass({
	render: function() {
		var name = this.props.name;
		var message  = this.props.message;
		return (
			<div>
				<h1>Hello { name }</h1>
				<p>{ message } !!!!</p>
			</div>
		)
	}
})
