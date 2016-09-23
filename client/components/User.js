import React from 'react';
import {observer} from "mobx-react"
import store from '../utils/store'
import actions from '../utils/actions';
import UserCard from './UserCard'
import Input from './input'
import Repos from './Repos'

export default observer(class User extends React.Component {
	componentWillMount() {
		const {username} = this.props.params
		if(store.mainUser.verified != "verified"){
			actions.verfiyUsername(username, true)
		}
	}

	render(){
		const { userInfo, repos } = store.mainUser
		// console.log(store.mainUser.repos)
		// console.log(store.mainUser.repos.length)
		return(
			<div className="user-profile">
				{/* <Input className="top-bar" /> */}
				
					<div className="container">
						<div className="row">
							{store.mainUser.verified == "verified" ? <UserCard userInfo={store.mainUser.userInfo} /> : <h1> Loading </h1> }
							{store.mainUser.repos.length ? <Repos repos={store.mainUser.repos}/> : <h1> Loading </h1>} 
						</div>
					</div>
			</div>
		)
	}
})