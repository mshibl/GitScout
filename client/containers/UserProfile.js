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
		if(!store.mainUser.loaded){ actions.loadUserProfile(username) }
	}

	render(){
		const { userInfo, repos } = store.mainUser
		return(
			<div className="user-profile">
				<div className="container">
					<div className="row">
						<UserCard loaded={store.mainUser.username} userInfo={store.mainUser.userInfo} />
						<Stats counts={store.mainUser.counts} languages={store.mainUser.languages.entries()}/>
						<Repos loaded={store.mainUser.repos.length > 0 } repos={store.mainUser.repos} />
					</div>
				</div>
			</div>
		)
	}
})