import React from "react";
import { InputGroup, Form, Button, Alert } from "react-bootstrap";
import AlphaResult from "./AlphaResult";
import GetReturnResult from "./GetReturnResult";

class StockViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayType:"",
            using_dates:false,
            data:{},
            errorText:""
        }
    }

    setFieldAsToday(id) {
        let today = new Date();
        let month = today.getMonth() + 1;
        let day = today.getDate();
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }
        let datestring = today.getFullYear() + '-' + month + '-' + day;
        console.log(datestring);
        document.getElementById(id).value = datestring;
    }
    async getData(endpoint) {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        let url = 'https:localhost:7210/' + endpoint + '?stockTicker=' + document.getElementById('stock').value; 
        if (this.state.using_dates) {
            let from_date_val = document.getElementById('from-date').value;
            let to_date_val = document.getElementById('to-date').value;
            if (from_date_val) {
                url += '&FromDate=' + from_date_val;
            }
            if (to_date_val) {
                url += '&ToDate=' + to_date_val;
            }
        }
        try {
            const response = await fetch(url, requestOptions);
            const data = await this.attemptParseJSON(response);
            if (data.status && data.status != 200) {
                if (data.errors) {
                    this.setState({errorText:'Error: '+JSON.stringify(data.errors)});
                } else {
                    this.setState({errorText:'Error: '+data});
                }
            } else {
                this.setState({displayType:endpoint, data:data, errorText:""});
            } 
        } catch (e) {
            console.log(e.message);
            this.setState({errorText:'Error: '+e.message});
        }
    }
    async attemptParseJSON(response) {
        return response.text().then(function(text) {
            return text && text[0] == "{" ? JSON.parse(text) : {status:500, errors:text}
        })
    }
    render() {
        return <div>
            {
                this.state.errorText === "" ? "" :
                <div>
                    <Alert variant="danger" data-bs-theme="dark" style={this.state.errorText.length > 100 ? {fontSize:"small"} :{}}>
                        {this.state.errorText}
                    </Alert>
                    <InputGroup className="mb-3" style={{justifyContent:'center'}}>
                        <Button type="primary" onClick={() => {this.setState({errorText:""})}}>Clear Error</Button>
                    </InputGroup>
                </div>
            }
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Stock</InputGroup.Text>
                <Form.Control
                id="stock"
                placeholder="Enter ticker here..."
                aria-label="Stock-ticker"
                aria-describedby="basic-addon1"
                />
            </InputGroup>
            {!this.state.using_dates ? <InputGroup className="mb-3" style={{justifyContent:'center'}}><Button variant="primary" onClick={() => {this.setState({using_dates:true})}}>Add a date range</Button></InputGroup> : ''}
            {!this.state.using_dates ? '' : 
            <div>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="from-addon1">From Date</InputGroup.Text>
                    <Form.Control
                    id="from-date"
                    type="date"
                    placeholder="Enter date here..."
                    aria-label="From Date"
                    aria-describedby="from-addon1"
                    />
                    <Button variant="secondary" id="from-is-today-btn" onClick={() => {this.setFieldAsToday("from-date")}}>Today</Button>
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="to-addon1">To Date</InputGroup.Text>
                    <Form.Control
                    id="to-date"
                    type="date"
                    placeholder="Enter date here..."
                    aria-label="To Date"
                    aria-describedby="to-addon1"
                    />
                    <Button variant="secondary" id="to-is-today-btn"  onClick={() => {this.setFieldAsToday("to-date")}}>Today</Button>
                </InputGroup>
                <InputGroup style={{justifyContent:'center'}} className="mb-3">
                    <Button variant="primary" onClick={() => {this.setState({using_dates:false})}}>Remove Dates</Button>
                </InputGroup>
            </div>}
            <InputGroup className="mb-3" style={{justifyContent:'center'}}>
                    <Button variant="success" style={{marginRight:'10px'}} size="lg" onClick={() => {this.getData("GetAlpha")}}>GetAlpha</Button>
                    <br/>
                    <Button variant="success" size="lg" onClick={() => {this.getData("GetReturn")}}>GetReturn</Button>
            </InputGroup>
            {this.state.displayType == "GetAlpha" ? <AlphaResult result={this.state.data}></AlphaResult> : ''}
            {this.state.displayType == "GetReturn" ? <GetReturnResult stock={document.getElementById('stock').value} result={this.state.data}></GetReturnResult> : ''}
        </div>;
    }
}

export default StockViewer;