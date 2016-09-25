import React from 'react';
import actions from '../utils/actions';
import { withRouter } from 'react-router';
import store from '../utils/store';

export default withRouter(class Search extends React.Component {
	constructor(props) {
		super(props);

		this.handleSubmit = (event) => this._handleSubmit(event);
	}

	componentWillMount(){
		this.setState({errorMessage: this.props.errorMessage})
	}

	componentWillReceiveProps(nextProps){
		this.setState({errorMessage: nextProps.errorMessage})
	}

	_handleSubmit(e){
		e.preventDefault();
		
		store.errorMessage = ""
		let username = this.refs.input.value
		actions.loadUserProfile(username)
	}

	render(){
		const {customClassName, defaultValue} = this.props
		const {errorMessage} = this.state
		return(
			<form className={"search-input " + (customClassName || "")} onSubmit={this.handleSubmit}>
				<i className="git-icon fa fa-github-alt fa-lg" aria-hidden="true"></i>
				<input
					ref='input'
					type='text'
					className={"searchbox " + (errorMessage ? "error" : "")}
					placeholder="Erlich Bachman"
					defaultValue={defaultValue}
					onChange={()=> this.setState({errorMessage: ""})}
					required
				/>
				{errorMessage ? <div className="error-message">{errorMessage}</div> : null}
			</form>
		)
	}
})