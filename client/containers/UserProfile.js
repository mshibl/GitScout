import React from 'react';
import {observer} from "mobx-react"

import store from '../utils/store'
import actions from '../utils/actions';

import UserCard from '../components/UserCard'
import Repos from '../components/Repos'
import Stats from '../components/Stats'

export default observer(class UserProfile extends React.Component {
	componentWillMount() {
		if(this.props.location.query.token){
			sessionStorage.setItem("github_token",this.props.location.query.token)
		}
		const {username} = this.props.params
		if(store.mainUser.verified != "verified"){
			actions.verfiyUsername(username, true)
		}
	}

	render(){
		const { userInfo, repos } = store.mainUser
		return(
			<div className="user-profile">
				<div className="container">
					<div className="row">
						<UserCard loaded={store.mainUser.verified == "verified"} userInfo={store.mainUser.userInfo} />
						<Stats counts={store.mainUser.counts} languages={store.mainUser.languages.entries()}/>
						<Repos loaded={store.mainUser.repos.length > 0 } repos={store.mainUser.repos} />
					</div>
				</div>
			</div>
		)
	}
})