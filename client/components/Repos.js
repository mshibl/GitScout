import React from 'react';
import Repo from './Repo'

export default class Repos extends React.Component {
	constructor(props) {
		super(props);

		this.filterRepos = (event) => this._filterRepos(event);
		this.changePage = (event) => this._changePage(event);
		this.displayRepos = this.displayRepos.bind(this);
		this.nextPage = () => this._nextPage();
		this.prevPage = () => this._prevPage();
	}

	componentWillMount() {
		this.setState({
			displayedRepos: this.props.repos,
			displayCount: 0
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
		const {value} = this.refs.search
		let filteredRepos = this.props.repos.filter(function(repo){
			if (repo.name.slice(0,value.length).toLocaleLowerCase() == value.toLocaleLowerCase()){ return true }
			return false
		})
		this.setState({ displayedRepos: filteredRepos })
	}

	_changePage(e){
		if(e){e.preventDefault()}
		let numOfPages = Math.ceil(this.state.displayedRepos.length / 8)
		const {value} = this.refs.pageNum
		if(value > numOfPages || value <= 0 || !Number.isInteger(parseInt(value))){
			alert("not a valid page number")
		} else {
			this.setState({ displayCount: (value-1)*8 })
		}
	}

	_nextPage(){
		this.refs.pageNum.value  = (this.state.displayCount/8)+2
		this.changePage()
	}

	_prevPage(){
		this.refs.pageNum.value = (this.state.displayCount/8)
		this.changePage()	
	}

	displayRepos(){
		const {displayedRepos} = this.state
		const {displayCount} = this.state
		let numOfPages = Math.ceil(displayedRepos.length / 8)
		let lastPage = displayCount+8 >= displayedRepos.length
		let firstPage = displayCount < 8
		console.log(lastPage)
		return(
			<div>
		     	<input onChange={this.filterRepos} ref="search" type="text" className="repo-search form-control" placeholder="Search for..." />
			    <div className="repos-displayed">
			     	{displayedRepos.slice(displayCount,displayCount+8).map((repo)=>{
			     		return 	<Repo key={repo.id} repo={repo} />
			     	})}
			    </div>
		     	<hr />
		     	<div className="change-page-control"> 
		     		{!firstPage ? <a><i className="fa fa-chevron-left" onClick={this.prevPage}></i></a> : <i className="fa fa-chevron-left idle"></i>}
		     		<form className="page-number" onSubmit={this.changePage}>
		     			<input ref="pageNum" type="text" className="form-control" defaultValue={1} maxLength="1"/>
		     		</form>
		     		<span className="of">of</span> {numOfPages}
		     		{!lastPage ? <a><i className="fa fa-chevron-right" onClick={this.nextPage}></i></a> : <i className="fa fa-chevron-right idle"></i>}
		     	</div>
	     	</div>
		)
	}
			     	// {this.state.displayCount < displayedRepos.length ? <a onClick={() => this.showMore()}><i className="fa fa-chevron-right fa-rotate-90"></i></a> : null}
			     	// {displayedRepos.length > 8 ? <a onClick={() => this.showLess()}><i className="fa fa-chevron-right fa-rotate-270"></i></a> : null}

	render(){
		const {displayedRepos} = this.state
		return(
		    <div className="repos col-md-9">
	     		<h3 className="repos-title"> Repositories </h3>
	     		{this.props.loaded ? 
	     			this.displayRepos(displayedRepos) 
	     			: <div className="loading"><i className="fa fa-cog fa-spin fa-3x fa-fw"></i><span className="sr-only">Loading...</span></div>
	     		}
		    </div>
		)
	}
}