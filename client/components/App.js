import React from 'react';
import MainSearch from './MainSearch'
import User from './User';
import { Router, Route, Link, browserHistory } from 'react-router'

export default class App extends React.Component {
	// const WrapperComponent = withRouter(MyComponent, { withRef: true })
	render(){
		return(
			<Router history={browserHistory}>
				<Route path="/" component={MainSearch} />
				<Route path="/user/:username" component={User} />
			</Router>
		)
	}
}