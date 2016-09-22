import React from 'react';
import actions from '../utils/actions';

export default class Input extends React.Component {
	constructor(props, context) {
		super(props);

		this.verifyUser = (event) => this._verifyUser(event);
	}

	_verifyUser(e){
		e.preventDefault();
		const {value} = this.refs.input
		if (value) {
			let reply = actions.verfiyUsername(value, true)
		}
	}

	render(){
		return(
			<form className="serach-container" onSubmit={this.verifyUser}>
				<i className="git-icon fa fa-github-alt fa-lg" aria-hidden="true"></i>
				<input
					ref='input'
					type='text'
					className="searchbox"
					placeholder="Erlich Bachman"
					onBlur={this.verifyUser}
					autoFocus={true}
				/>
			</form>
		)
	}
}