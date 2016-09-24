import React from 'react';

export default class Counts extends React.Component {
	displayCounts(){
		const {counts} = this.props
		return(
			<table className="table">
				<tbody>
					<tr className="slideRight">
						<td><i className="fa fa-github-square" aria-hidden="true"></i> Public Repos </td>
						<td><b>{counts.public_repos}</b></td>
					</tr>
					<tr className="slideRight">
						<td><i className="fa  fa-users" aria-hidden="true"></i> Followers </td>
						<td><b>{counts.followers}</b></td>
					</tr>
					<tr className="slideRight">
						<td><i className="fa  fa-user-plus" aria-hidden="true"></i> Following </td>
						<td><b>{counts.following}</b></td>
					</tr>
					<tr className="slideRight">
						<td><i className="fa  fa-eye" aria-hidden="true"></i> Total Watchers </td>
						<td><b>{counts.watchersCount}</b></td>
					</tr>
					<tr className="slideRight">
						<td><i className="fa  fa-star" aria-hidden="true"></i> Total Stars </td>
						<td><b>{counts.starsCount}</b></td>
					</tr>
					<tr className="slideRight">
						<td><i className="fa  fa-code-fork" aria-hidden="true"></i> Total Forks </td>
						<td><b>{counts.forksCount}</b></td>
					</tr>
					<tr className="slideRight">
						<td><i className="fa  fa-exclamation-circle" aria-hidden="true"></i> Open Issues </td>
						<td><b>{counts.openIssuesCount}</b></td>
					</tr>
				</tbody>
			</table>
		)
	}

	render(){
		return(
		    <div className="counts col-md-6">
	     		{this.props.loaded ? 
	     			this.displayCounts() 
	     			: <div className="loading"><i className="fa fa-cog fa-spin fa-3x fa-fw"></i><span className="sr-only">Loading...</span></div>
	     		}
          	</div>
		)
	}
}