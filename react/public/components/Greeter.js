import React from 'react'
import GreeterForm from './GreeterForm'
import GreeterMessage from './GreeterMessage'

export default React.createClass({
	getDefaultProps: function() {
		return {
			devName: 'Userffff',
			devMesage: 'Set your name and message'
		}
	},
	getInitialState: function() {
		return {
			userName: this.props.devName,
			userMessage: this.props.devMesage
		}
	},
	handleNewDate: function(data) {
		console.log(data);
		if (data.name.length > 0 || data.message.length > 0) {
            if (data.name.length === 0) {
                this.setState({
                    userMessage: data.message
                })
            }
            if (data.message.length === 0){
                this.setState({
                    userName: data.name
                })
            }
        }
        if (data.name.length > 0 && data.message.length > 0) {
            this.setState({
                userName: data.name,
                userMessage: data.message
            })
        }
	},
	render: function() {
		var name = this.state.userName;
		var message = this.state.userMessage;
		return (
			<div>
				<GreeterMessage name = { name } message = { message } />
				<GreeterForm onNewDate = {this.handleNewDate} />
			</div>
		);
	}
})