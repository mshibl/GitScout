import React from 'react';
import {observer} from "mobx-react"
import store from '../utils/store';

export default observer(class Repos extends React.Component {
	render(){
		return(
		     <div className="">
		     	{this.props.repos}
		    </div>
		)
	}
})