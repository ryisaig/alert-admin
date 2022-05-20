import React from 'react';
import ViewList from '../../component/ViewList';
import axios from 'axios'
import { BASE_SERVER_URL } from '../../utils/BaseServerUrl';
import { Button } from 'react-bootstrap';
import {
    Link
  } from "react-router-dom";
import { Create, OpenInNew, ViewAgendaRounded, ViewColumn } from '@material-ui/icons';
  
class TeacherGrades extends React.Component {
   username =  sessionStorage.getItem("luna_user");
    state = {
        title: "Call Tree List",
        isSearchable: false,
        isPrintable: false,
        isCreatable: true,
        columns: [
            {dataField: "no", text: "No", sort: true,  
                headerStyle: (colum, colIndex) => {
                    return { width: '50px', textAlign: 'center' };
                }},
            {dataField: "createdDate", text: "Date", sort: true}, 
            {dataField: "subject", text: "Title", sort: true,  
                headerStyle: (colum, colIndex) => {
                    return { width: '250px', textAlign: 'center' };
                }}, 
            {dataField: "totalResponses", text: "Total Responses", sort: true},
            {dataField: "totalSafe", text: "Total Safe", sort: true},
            {dataField: "totalUncertain", text: "Total Uncertain", sort: true},
            {dataField: "totalInDanger", text: "Total In Danger", sort: true},
            {dataField: "actions", text: "Actions", sort: true, 
                headerStyle: (colum, colIndex) => {
                    return { width: '80px'};
                },
                formatter: (cell, row) => (
                    <>  
                         {/* <Button as={Link} variant="outline-info"  to={"/calltree/" + row['id']+ "/details"}><ImageSearch/></Button>&nbsp; */}
                        <Button as={Link} style={{backgroundColor: '#3880ff'}}  to={"/calltree/" + row['id']+ "/responses"}><OpenInNew/></Button>&nbsp;
                        {/* <Button as={Link} variant="outline-danger" to="#" onClick={()=>this.delete(row['id'])}><DeleteOutline/></Button> */}

                    </>
                )},
        ],
        data: [],
        filters: []
    }

    getCallTreeList(){
        let classId = 0;
        let filters = this.state.filters;

        filters.map(function(filter){
            if(filter.field == 'class'){
                classId = filter.value;
            }
        })

        axios.get(BASE_SERVER_URL + 'calltree/all').then(res => {
            this.setState({data: res.data})
        })
    }

    handleKeywordChange = (e) => {
        this.state.keyword = e.target.value;
    }

    search(){
        this.getCallTreeList();
    }

    componentDidMount(){
        this.getCallTreeList();
    }

    render(){
        
       return (
        <>
            <ViewList values={this.state} sideContent={this.props.sideContent} handleKeywordChange={this.handleKeywordChange} search={this.search} component={this}/>
        </>
       )
    }


}

export default TeacherGrades;