import React from 'react'

export default React.createClass({
	formSubmit: function(event) {
		event.preventDefault();
		var data = {};
		data.name = this.refs.nameInput.value;
		data.message  = this.refs.messageInput.value;
		this.refs.nameInput.value = '';
		this.refs.messageInput.value = '';
		this.props.onNewDate(data);
	},
	render: function() {
		return(
			<form onSubmit = {this.formSubmit }>
				<div>
					<input type="text" placeholder="aaasasa" ref="nameInput" />
				</div>
				<div>
					<textarea placeholder="bb" ref="messageInput" />
				</div>
				<div>
					<input type="reset" />
					<input type="submit" />
				</div>
			</form>
		);
	}
})