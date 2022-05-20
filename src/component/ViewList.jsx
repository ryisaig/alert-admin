import React from 'react';
import { Button, InputGroup, FormControl, Table, Form } from 'react-bootstrap';
import PrintByDiv from '../utils/WindowPrinter'
import {
  Link
} from "react-router-dom";
import ViewTable from './ViewTable';
import { Computer, ArrowForward, AccountBox, FolderOpen, GroupAdd, Send, Work, SyncAlt , Poll,Search, Print, Add} from '@material-ui/icons';


function ViewList(props) {
 
  // const noData = (<tr><td colSpan="100">No records found</td></tr>);

  props.values.data.forEach(function (data, i) {
    data["no"] = (i + 1);
  })
 
  const searchAction = props.search.bind(props.component);


  const handleKeyPress = (target) => {
    if(target.charCode === 13) {
      searchAction();
    }
  }

  const removeActionsFromColumnsForPrint = (columns) => {
    let filteredData = columns.filter(function(col){
      return col.dataField != "actions";

    })

    return filteredData;
  }
  return (
    <div>
      <Table responsive> 
        <tbody>
          <tr>
            <td style={{border: "none", padding: '25px'}}>
            <h5 style={{ marginBottom: '30px' }}>{props.values.title}</h5>
              <table>
                <tbody>
                <tr>
              {props.values.filters && props.values.filters.map(function(filter){
                return (
                  <td  key={filter.field} style={{padding: '0px', border: 'none'}}>
                  <Form.Group key={filter.field} controlId={filter.field} style={{ marginBottom: '20px', marginRight: '10px',width: '200px'}}> 
                    <Form.Label style={{fontSize: '14px', marginBottom: 5, float:'left'}}>{filter.label}</Form.Label>
                    <Form.Control controlid={"select" + filter.field } as="select" onChange={filter.onChange} value={filter.value}>                  
                        {
                          filter.options && filter.options.map(function(option, i){
                              return <option key={option.key + i} value={option.key.toString()}>{option.value}{}</option>  
                          })                       
                        }                           
                    </Form.Control>
                 </Form.Group>
                 </td>
                )})}          
            </tr>
            </tbody>
              </table>
            <InputGroup className="mb-3" style={{width: '500px'}}>
             {
               props.values.isCreatable &&      
               <InputGroup.Prepend>
                  <Button style={{backgroundColor: "#3880ff"}} onClick={props.values.handleShow.bind(this)}><Add/>
                  </Button>
                </InputGroup.Prepend> 
              } 
         
              { props.values.isSearchable && <FormControl onChange={props.handleKeywordChange} onKeyPress={handleKeyPress} style={{height: '40px'}}/>}
              <InputGroup.Append> 
              { props.values.isSearchable && <Button variant="outline-secondary" onClick={searchAction}><Search/></Button>}
              { props.values.isPrintable && <Button variant="outline-secondary" onClick={()=>PrintByDiv(
                              props.values.data, 
                              removeActionsFromColumnsForPrint(props.values.columns),
                              props.values.title)}><Print/></Button>}
              </InputGroup.Append>
            </InputGroup>
            <ViewTable {...props}/>
            </td>
            {(window.location.href.includes("edit") || window.location.href.includes("create")) &&
             <td style={{width: '400px', display: !props.sideContent && 'none', height: '100vh', border: "none", padding: '20px', boxShadow: '2px 4px 10px rgba(0,0,0,.2)'}}  className="bg-light">
             {props.sideContent}
           </td>
            }
          </tr>
        </tbody>
        </Table>
      
    </div>
  );
}

export default ViewList;
