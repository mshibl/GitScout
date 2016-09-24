import React from 'react';
import Chart from '../components/Chart';
import Counts from '../components/Counts';

export default class Stats extends React.Component {
	render(){
		const {languages, counts} = this.props
		return(
		    <div className="col-md-9">
		    	<div className="stats">
			    	<h3 className="section-title"> User Statistics  </h3>
			    	<Counts loaded={counts.loaded} counts={counts} / >
			    	<Chart loaded={languages.length > 0} chartData={languages} />
		    	</div>
		    </div>
		)
	}
}