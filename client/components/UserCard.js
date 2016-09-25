import React from 'react';
import store from '../utils/store';

export default class UserCard extends React.Component {

	displayUserCard(){
		const {name, login, avatar_url, followers, following, hireable, location, public_repos, html_url, bio} = this.props.userInfo
		return(
	        <div className="card">
	            <div className="cover">
	                <img src="http://melissavandyke.com/wp-content/uploads/2015/09/code.jpg"/>
	            </div>
	            <div className="user">
	                <img className="img-circle" src={avatar_url}/>
	            </div>
	            <div className="content">
	                <div className="main">
	                    <h3 className="name"><a href={html_url}> {name || login} </a></h3>
	                    <p className="location">{location}</p>
	                    {/*<p>{bio}</p>*/}
	                </div>
	            </div>
	        </div>
		)
	}


	render(){
		return(
			<div className="card-container col-md-3 slideDown">
			<h3 className="gitscout top-screen-logo"><a className="link" href="http://gitscout.herokuapp.com">GIT<b>SCOUT</b></a></h3>
		 		{this.props.loaded ? 
		 			this.displayUserCard() 
		 			: <div className="loading"><i className="fa fa-cog fa-spin fa-3x fa-fw"></i><span className="sr-only">Loading...</span></div>
		 		}
			</div>
		)
	}
}