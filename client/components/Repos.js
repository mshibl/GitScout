import React from 'react';
import Repo from './Repo'
import Loader from './Loader'

export default class Repos extends React.Component {
	constructor(props) {
		super(props);

		this.displayRepos = this.displayRepos.bind(this);
		this.filterRepos = (event) => this._filterRepos(event);
		this.changePage = (event) => this._changePage(event);
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
		let numOfPages = Math.ceil(this.state.displayedRepos.length / 12)
		const {value} = this.refs.pageNum
		if(value > numOfPages || value <= 0 || !Number.isInteger(parseInt(value))){
			alert("not a valid page number")
		} else {
			this.setState({ displayCount: (value-1)*12 })
		}
	}

	_nextPage(){
		this.refs.pageNum.value  = (this.state.displayCount/12)+2
		this.changePage()
	}

	_prevPage(){
		this.refs.pageNum.value = (this.state.displayCount/12)
		this.changePage()	
	}

	displayRepos(){
		const {displayedRepos} = this.state
		if (displayedRepos[0] === "user has no repos"){
			return( <div className="no-repos col-md-12"><i className="fa fa-exclamation-circle" aria-hidden="true"></i>  {this.props.username} has no public Repositories</div> )
		} else {
			const {displayCount} = this.state
			let numOfPages = Math.ceil(displayedRepos.length / 12)
			let lastPage = displayCount+12 >= displayedRepos.length
			let firstPage = displayCount < 12
			return(
				<div>
				    <div className="repos-displayed col-md-12">
				     	{displayedRepos.slice(displayCount,displayCount+12).map((repo)=>{
				     		return 	<Repo key={repo.id} repo={repo} />
				     	})}
				    </div>
			     	<hr />
			     	<div className="change-page-control"> 
			     		{!firstPage ? <a><i className="fa fa-chevron-left" onClick={this.prevPage}></i></a> : <i className="fa fa-chevron-left idle"></i>}
			     		<div className="page-picker">
				     		<form className="page-number" onSubmit={this.changePage}>
				     			<input ref="pageNum" type="text" className="form-control" defaultValue={1} maxLength="1"/>
				     		</form>
				     		<span className="of">of</span> {numOfPages}
			     		</div>
			     		{!lastPage ? <a><i className="fa fa-chevron-right" onClick={this.nextPage}></i></a> : <i className="fa fa-chevron-right idle"></i>}
			     	</div>
		     	</div>
			)
		}
	}

	render(){
		return(
		    <div className="col-md-12">
		    	<div className="repos">	
		     		<div className="col-md-3"><h3 className="section-title"> Repositories </h3></div>
		     		<div className="col-md-4 col-md-offset-5 repo-search"><input onChange={this.filterRepos} ref="search" type="text" className="form-control" placeholder="Search for..." /></div>
		     		
		     		{this.props.loaded ? 
		     			this.displayRepos() 
		     			: <Loader />
		     		}
	     		</div>
		    </div>
		)
	}
}