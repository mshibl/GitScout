import React from 'react';
import {observer} from "mobx-react"

import store from '../utils/store'
import actions from '../utils/actions';

import Stats from './StatsContainer'
import UserCard from '../components/UserCard'
import Repos from '../components/Repos'

export default observer(class UserProfile extends React.Component {
	componentWillMount() {
		const {username} = this.props.params
		if(this.props.location.query.token){ localStorage.setItem("github_token",this.props.location.query.token) }
		if(store.mainUser.verified != "verified"){ actions.verfiyUsername(username, true) }
	}

	render(){
		const { userInfo, repos } = store.mainUser
		return(
			<div className="user-profile">
				<h3 className="gitscout top-screen-logo"><a className="link" href="http://gitscout.herokuapp.com">GIT<b>SCOUT</b></a></h3>
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