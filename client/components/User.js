import React from 'react';
import {observer} from "mobx-react"
import store from '../utils/store'
import actions from '../utils/actions';
import UserCard from './UserCard'
import Input from './input'
import Repos from './Repos'

export default observer(class User extends React.Component {
	componentWillMount() {
		actions.fetchRepos(store.mainUser.userInfo.login)
	}

	render(){
		return(
			<div>
				{/* <Input className="top-bar" /> */}
				<div className="container">
					<div className="row">
						<UserCard userInfo={store.mainUser.userInfo} />
						<Repos repos={store.mainUser.repos}/>
					</div>
				</div>
			</div>
		)
	}
})