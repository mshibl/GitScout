import React from 'react';

export default class Loader extends React.Component {
	render(){
          return(
			<div className="loading">
				<i className="fa fa-cog fa-spin fa-3x fa-fw"></i>
				<span className="sr-only">Loading...</span>
			</div>
          )
	}
}