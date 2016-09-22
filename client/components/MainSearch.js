import React from 'react';
import {observer} from "mobx-react"
import {Link} from 'react-router'

import store from '../utils/store';
import Input from './input.js'

export default observer(class MainSearch extends React.Component {
	render(){
		return(
			<div className="input-list">
				<p className="main-guide">Who is the Github user you wish to find?</p>
				<Input />
				{store.mainUser.verified == "verified" ? 
					<button type="button">
						<Link className="results-button" to={'/user/'+store.mainUser.username}>Show Results</Link>
					</button> 
					: null
				}
			</div>
		)
	}
})