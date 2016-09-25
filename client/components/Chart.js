import React from 'react';
import randomColor from 'randomcolor';
import {PieChart, Pie, Tooltip, Cell} from 'recharts';


export default class Chart extends React.Component {
	componentWillReceiveProps(nextProps) {
	 	const {chartData} = nextProps
	 	if(chartData.length){
	 		this.setState({
	 			chartData: chartData.map(function(arr){ 
							 				return {value: arr[1], name: arr[0], color: randomColor({luminosity: 'bright'})} 
							 			})
	 		})

	 	}     
	}

	displayChart(){
		const {chartData} = this.state
		const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value }) => {
			const radius = innerRadius + (outerRadius - innerRadius) * 1.4;
			const RADIAN = Math.PI / 180; 
			const x  = cx + radius * Math.cos(-midAngle * RADIAN);
			const y = cy + radius * Math.sin(-midAngle * RADIAN);

			return (
				<text x={x} y={y} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
					{percent > 0.1 ? name : null}
				</text>
			);
		};

		return(
		    <div>
				<PieChart width={300} height={250}>
					<Pie isAnimationActive={true} data={chartData} innerRadius={40} outerRadius={80} cx={150} cy={125} outerRadius={80} fill="#8884d8" labelLine={false} label={renderCustomizedLabel}>
			        	{chartData.map((entry, index) => <Cell key={entry.name} fill={randomColor({luminosity: 'bright'})} />)}
					</Pie>
					<Tooltip/>
				</PieChart>
		    </div>
		)
	}

	render(){
		
          return(
          	<div className="chart col-md-6">
	     		{this.props.loaded ? 
	     			this.displayChart() 
	     			: <div className="loading"><i className="fa fa-cog fa-spin fa-3x fa-fw"></i><span className="sr-only">Loading...</span></div>
	     		}
          	</div>
          )
	}
}