import React from 'react';
import {observer} from "mobx-react"

import store from '../utils/store';
import UserSearch from '../components/UserSearch.js'

export default observer(class MainSearch extends React.Component {
	render(){
		return(
			<div className="input-list">
				<h1 id="gitscout">GIT<b>SCOUT</b></h1>
				<p className="main-guide">Who's the Github user you wish to find?</p>
				<UserSearch verified={store.mainUser.verified == "verified"} />
			</div>
		)
	}
})