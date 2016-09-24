import React from 'react';
import {observer} from "mobx-react"
import Modal from 'react-modal';
import actions from '../utils/actions';

import store from '../utils/store';
import Search from '../components/Search.js'

export default observer(class MainSearch extends React.Component {
	_closeModal(){
		store.requestAuth = false
	}

	render(){
		const {errorMessage} = store
		return(
			<div className="input-list">
				<h1 className="gitscout">GIT<b>SCOUT</b></h1>
				<p className="main-guide">Who is the Github user you wish to find?</p>
				<Search errorMessage={errorMessage} verified={store.mainUser.verified == "verified"} />
				<Modal className="slideUp" isOpen={store.requestAuth} onRequestClose={()=> this._closeModal()}>
				  	<p><b>"GitScout" Would Like to Access Your Github Account</b></p>
				  	<p className="sub-text">This allows GitScout to perform complex analysis, and provide you with more useful results</p>
				  	<div className="col-md-6 col-xs-6 btn" onClick={()=> this._closeModal()}><b>No</b></div>
				  	<div className="col-md-6 col-xs-6 btn" onClick={()=> actions.getToken(store.requestedUsername)}><b>Yes</b></div>
				</Modal>
			</div>
		)
	}
})