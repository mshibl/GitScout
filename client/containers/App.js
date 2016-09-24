import React from 'react';
import MainSearch from './MainSearch'
import UserProfile from './UserProfile';
import { Router, Route, browserHistory } from 'react-router'

export default class App extends React.Component {
	render(){
		return(
			<div>
				<Router history={browserHistory}>
					<Route path="/" component={MainSearch} />
					<Route path="/user/:username" component={UserProfile} />
				</Router>
			</div>
		)
	}
}