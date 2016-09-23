import React from 'react';
import {observer} from "mobx-react"

import store from '../utils/store';
import Input from './input.js'

export default observer(class MainSearch extends React.Component {
	render(){
		return(
			<div className="input-list">
				<p className="main-guide">Who is the Github user you wish to find?</p>
				<Input verified={store.mainUser.verified == "verified"} />
			</div>
		)
	}
})