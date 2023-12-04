import React from "react";

class AlphaResult extends React.Component {
    render() {
        let className = this.props.result > 0 ? 'positive-num' : 'negative-num';
        className += " number-result";
        return <div className={className}>{this.props.result}</div>
    }
  }
  
  export default AlphaResult;
  