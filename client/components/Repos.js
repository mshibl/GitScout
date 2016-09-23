import React from 'react';
import Repo from './Repo'

export default class Repos extends React.Component {
	componentWillMount() {
		this.setState({displayCount: 8})
	}

	showMore(){
		let numOfRepos = this.props.repos.length
		let newDisplayCount = this.state.displayCount += 8
		this.setState({displayCount: Math.min(newDisplayCount, numOfRepos)})
	}

	showLess(){
		let numOfRepos = this.props.repos.length
		let currentDisplayCount = this.state.displayCount
		let newDisplayCount = currentDisplayCount % 8 ? currentDisplayCount -= numOfRepos % 8 : currentDisplayCount -= 8
		this.setState({displayCount: Math.max(newDisplayCount, 8)})
	}

	render(){
		const {repos} = this.props
		return(
		     <div className="repos col-md-9">
		     	<h3 className="repos-title"> Repositories </h3>
		     	<input type="text" className="repo-search form-control" placeholder="Search for..." />
			    <div className="row repos-displayed">
			     	{repos.slice(0,this.state.displayCount).map((repo)=>{
			     		return 	<Repo key={repo.id} repo={repo} />
			     	})}
			    </div>
		     	<hr />
		     	<div className="display-control-button"> 
		     	{this.state.displayCount < repos.length ? <a onClick={(e) => this.showMore()}><i className="fa fa-plus" aria-hidden="true"></i></a> : null}
		     	{this.state.displayCount > 8 ? <a onClick={(e) => this.showLess()}><i className="fa fa-minus" aria-hidden="true"></i></a> : null}
		     	</div>
		    </div>
		)
	}
}