import React from 'react';

export default class SearchCount extends React.Component {
	componentWillMount(){
		this.setState({display: "none"})
		setTimeout(function(){
			console.log('showing')
			this.setState({display: "block"})
		}.bind(this), this.props.wait)
	}

	render(){
		return(
		    <div style={this.state} className="search-count slideUp col-md-12">
		    	<i className="fa fa-search"></i> There was <b>{this.props.searchCount}</b> searches for this user during the past hour
          	</div>
		)
	}
}