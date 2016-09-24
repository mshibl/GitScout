import React from 'react';
import actions from '../utils/actions';
import { withRouter } from 'react-router';
import store from '../utils/store';

export default withRouter(class Search extends React.Component {
	constructor(props) {
		super(props);

		this.handleSubmit = (event) => this._handleSubmit(event);
	}

	componentWillReceiveProps(nextProps) {
		const {value} = this.refs.input
		if(nextProps.verified) this.props.router.push('/user/'+value)
	}

	_handleSubmit(e){
		e.preventDefault();
		
		let username = this.refs.input.value
		actions.loadUserProfile(username)
	}

	render(){
		const {errorMessage} = this.props
		return(
			<form className="search-input" onSubmit={this.handleSubmit}>
				<i className="git-icon fa fa-github-alt fa-lg" aria-hidden="true"></i>
				<input
					ref='input'
					type='text'
					className={"searchbox " + (errorMessage ? "error" : "")}
					placeholder="Erlich Bachman"
					onChange={()=> store.errorMessage = ""}
					required
				/>
				<div className="error-message">{errorMessage}</div>
			</form>
		)
	}
})