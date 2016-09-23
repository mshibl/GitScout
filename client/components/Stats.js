import React from 'react';
import Chart from './Chart';
import Counts from './Counts';

export default class Stats extends React.Component {
	render(){
		const {languages, counts} = this.props
		return(
		    <div className="col-md-9">
		    	<div className="repos">
			    	<h3 className="repos-title"> User Statistics  </h3>
			    	<Counts loaded={counts.loaded} counts={counts} / >
			    	<Chart loaded={languages.length > 0} chartData={languages} />
		    	</div>
		    </div>
		)
	}
}