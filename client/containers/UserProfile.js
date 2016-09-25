import React from 'react';
import {observer} from "mobx-react"
import Modal from "react-modal"

import store from '../utils/store'
import actions from '../utils/actions';

import Stats from './StatsContainer'
import UserCard from '../components/UserCard'
import Repos from '../components/Repos'
import Search from '../components/Search'

export default observer(class UserProfile extends React.Component {
	componentWillMount() {
		const {username} = this.props.params
		if(!store.mainUser.loaded){ actions.loadUserProfile(username) }
	}

	_closeModal(){		
		store.errorMessage = ""		
	}

	render(){
		const { username, userInfo, repos, analysisLoaded, languages, counts } = store.mainUser
		return(
			<div className="user-profile">
				<div className="container">
					<div className="row">
						<UserCard loaded={username} userInfo={userInfo} />
						<Stats counts={counts} analysisLoaded={analysisLoaded} languages={languages.entries()} />
						<Repos loaded={repos.length > 0 } username={userInfo.username || store.mainUser.userInfo.login} repos={store.mainUser.repos} />
					</div>
					<Modal className="slideUp" isOpen={!store.mainUser.loaded} onRequestClose={()=> this._closeModal()}>		
						<p><b>{this.props.params.username} cannot be found on Github!</b></p>		
						<p className="sub-text">Try searching for a different user</p>	
						<Search customClassName="modal-input" errorMessage={store.errorMessage} defaultValue={this.props.params.username}/>
					</Modal>
				</div>
			</div>
		)
	}
})



