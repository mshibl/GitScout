import React from 'react';
import actions from '../utils/actions';
import { withRouter } from 'react-router'

export default withRouter(class UserSearch extends React.Component {
	constructor(props) {
		super(props);

		this.verifyUser = (event) => this._verifyUser(event);
	}

	componentWillReceiveProps(nextProps) {
		const {value} = this.refs.input
		if(nextProps.verified) this.props.router.push('/user/'+value)
	}

	_verifyUser(e){
		e.preventDefault();
		const {value} = this.refs.input

		if(sessionStorage.getItem('github_token')){
			if (value){ actions.verfiyUsername(value, true) }
		} else {
			// console.log('authenticating')
			actions.authenticate(value)
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
					
					autoFocus={true}
				/>
			</form>
		)
	}
})