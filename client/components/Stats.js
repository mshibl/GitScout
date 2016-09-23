import React from 'react';
import Chart from './Chart';
import Counts from './Counts';

export default class Stats extends React.Component {
	render(){
		const {languages, counts} = this.props
		return(
		    <div className="repos col-md-9">
		    	<h3 className="repos-title"> User Statistics  </h3>
		    	<Chart loaded={languages.length > 0} chartData={languages} />
		    	<Counts loaded={counts.loaded} counts={counts} / >
		    </div>
		)
	}
}