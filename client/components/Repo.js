import React from 'react';

export default class Repo extends React.Component {
	render(){
		const {repo} = this.props
		return(
		     <div className="col-md-3 col-xs-12">
		     	<div className="repo col-md-12">
			     	<div className="name"> <a href={repo.html_url}> {repo.name} </a> </div>
			     	<div className="stars"> <i className="fa fa-star" aria-hidden="true" /> {repo.stargazers_count} </div>
			     	<div className="language"> <i className="fa fa-pencil" aria-hidden="true" /> {repo.language ? repo.language : "N/A"} </div>
		     	</div>
		    </div>
		)
	}
}