import React from 'react';
import {observer} from "mobx-react"
import store from '../utils/store';

export default observer(class UserCard extends React.Component {
	render(){
		const {name, avatar_url, created_at, followers, following, hireable, location, public_repos, url} = this.props.userInfo
		return(
		     <div className="card-container col-md-3">
		        <div className="card">
		                <div className="cover">
		                    <img src="http://werehumans.com/wp-content/uploads/2016/04/CodingSnippet.jpg"/>
		                </div>
		                <div className="user">
		                    <img className="img-circle" src={avatar_url}/>
		                </div>
		                <div className="content">
		                    <div className="main">
		                        <h3 className="name">{name}</h3>
		                        <p className="location">{location}</p>
		                        <p className=""> <i className="fa fa-users" aria-hidden="true"></i> Followers: {followers}</p>
		                        <p className=""> <i className="fa fa-user-plus" aria-hidden="true"></i> Following: {following}</p>
		                        <p className=""> <i className="fa fa-briefcase" aria-hidden="true"></i> Hireable: {hireable ? "Yes" : "No"}</p>
		                        <p className=""> <i className="fa fa-github-square" aria-hidden="true"></i> Public Repositories: {public_repos}</p>
		                    </div>
		                </div>
		        </div>
		    </div>
		)
	}
})