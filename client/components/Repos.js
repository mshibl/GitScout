import React from 'react';
import Repo from './Repo'

export default class Repos extends React.Component {
	constructor(props) {
		super(props);

		this.filterRepos = (event) => this._filterRepos(event);
	}

	componentWillMount() {
		this.setState({
			displayedRepos: this.props.repos,
			displayCount: 8
		})
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ displayedRepos: nextProps.repos })	      
	}

	showMore(){
		let numOfRepos = this.state.displayedRepos.length
		let newDisplayCount = this.state.displayCount += 8
		this.setState({displayCount: Math.min(newDisplayCount, numOfRepos)})
	}

	showLess(){
		let numOfRepos = this.state.displayedRepos.length
		let currentDisplayCount = this.state.displayCount
		let newDisplayCount = currentDisplayCount % 8 ? currentDisplayCount -= numOfRepos % 8 : currentDisplayCount -= 8
		this.setState({displayCount: Math.max(newDisplayCount, 8)})
	}

	_filterRepos(){
		// console.log('filtering repos')
		// console.log(this.refs.search.value)
		const {value} = this.refs.search
		let filteredRepos = this.props.repos.filter(function(repo){
			// console.log(value.toLocaleLowerCase() == repo.name.slice(0,value.length).toLocaleLowerCase())	
			if (repo.name.slice(0,value.length).toLocaleLowerCase() == value.toLocaleLowerCase()){ return true }
			return false
		})
		this.setState({
			displayedRepos: filteredRepos
		})
	}

	render(){
		const {displayedRepos} = this.state
		return(
		     <div className="repos col-md-9">
		     	<h3 className="repos-title"> Repositories </h3>
		     	<input onChange={this.filterRepos} ref="search" type="text" className="repo-search form-control" placeholder="Search for..." />
			    <div className="row repos-displayed">
			     	{displayedRepos.slice(0,this.state.displayCount).map((repo)=>{
			     		return 	<Repo key={repo.id} repo={repo} />
			     	})}
			    </div>
		     	<hr />
		     	<div className="display-control-button"> 
		     	{this.state.displayCount < displayedRepos.length ? <a onClick={() => this.showMore()}><i className="fa fa-plus" aria-hidden="true"></i></a> : null}
		     	{displayedRepos.length > 8 ? <a onClick={() => this.showLess()}><i className="fa fa-minus" aria-hidden="true"></i></a> : null}
		     	</div>
		    </div>
		)
	}
}