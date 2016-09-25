import React from 'react';
import {observer} from "mobx-react"
import actions from '../utils/actions';

import store from '../utils/store';
import Search from '../components/Search.js'

export default observer(class MainSearch extends React.Component {
	render(){
		return(
			<div className="input-list">
				<h1 className="gitscout">GIT<b>SCOUT</b></h1>
				<p className="main-guide">Who is the Github user you wish to find?</p>
				<Search errorMessage={store.errorMessage} />
			</div>
		)
	}
})