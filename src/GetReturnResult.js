import React from "react";
import {Chart} from "react-google-charts"

class GetReturnResult extends React.Component {
    render() {
        let data = [['Date', 'Change']];
        Object.keys(this.props.result).map((key, i) => {
            data.push([key, this.props.result[key].dollars]);
        });
        console.log("AAAA"+JSON.stringify(data));
        let options = {
            title: this.props.stock.toUpperCase(),
            curveType: "function",
            legend: {position:"bottom"}
        }

        return <Chart className="google-chart" chartType="LineChart" width="90vw" height="400px" data={data} options={options} />
    }
  }
  
  export default GetReturnResult;
  