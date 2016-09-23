import React from 'react';

export default class Counts extends React.Component {
	displayCounts(){
		const {counts} = this.props
		return(
		    <div>
		    	<div className="count-box col-md-12">
		    	<h4>
		    		<div className="col-md-6"><i className="fa  fa-eye" aria-hidden="true"></i> Watchers: </div>
		    		<div className="col-md-6"><b>{counts.watchersCount}</b></div>
				</h4> 
		    	</div>
		    	<div className="count-box col-md-12">
		    		<h4>
			    		<div className="col-md-6"><i className="fa  fa-star" aria-hidden="true"></i> Stars: </div>
			    		<div className="col-md-6"><b>{counts.starsCount}</b></div>
		    		</h4>
		    	</div>
		    	<div className="count-box col-md-12">
		    		<h4>
			    		<div className="col-md-6"><i className="fa  fa-code-fork" aria-hidden="true"></i> Forks: </div>
			    		<div className="col-md-6"><b>{counts.forksCount}</b></div>
		    		</h4>
		    	</div>
		    	<div className="count-box col-md-12">
		    		<h4>
			    		<div className="col-md-6"><i className="fa  fa-exclamation-circle" aria-hidden="true"></i> Open Issues:</div>
			    		<div className="col-md-6"><b>{counts.openIssuesCount}</b></div>
		    		</h4>
		    	</div>
		    </div>
		)
	}

	render(){
		return(
		    <div className="counts col-md-7">
	     		{this.props.loaded ? 
	     			this.displayCounts() 
	     			: <div className="loading"><i className="fa fa-cog fa-spin fa-3x fa-fw"></i><span className="sr-only">Loading...</span></div>
	     		}
          	</div>
		)
	}
}