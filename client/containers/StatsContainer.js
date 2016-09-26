import React from 'react';
import Chart from '../components/Chart';
import Counts from '../components/Counts';
import SearchCount from '../components/SearchCount';

export default class Stats extends React.Component {
	render(){
		const {languages, analysisLoaded, counts, searchCount} = this.props
		return(
		    <div className="col-md-9">
		    	<div className="stats">
			    	<h3 className="section-title"> User Statistics  </h3>
			    	<Counts loaded={counts.loaded} counts={counts} / >
			    	<Chart loaded={analysisLoaded} chartData={languages} />
			    	<SearchCount searchCount={searchCount} wait={3000}/>
		    	</div>
		    </div>
		)
	}
}