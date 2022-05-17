import React from 'react';
import { Button, InputGroup, FormControl, Table, Form } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import PrintByDiv from '../utils/WindowPrinter'
import {
  Link
} from "react-router-dom";
import ViewTable from './ViewTable';
import { NavigateNext } from '@material-ui/icons';

function ViewDetails(props) {

    return(
    <>
        <div>
        <Table responsive> 
            <tbody>
                <tr>
                    <td>
                        <Table responsive> 
                        <tbody>
                            <tr>             
                                <td style={{border: "none", padding: '25px'}}>
                                    <h5 style={{ marginBottom: '30px'}}><Link as={Link} to={"../../../" + props.values.type}style={{color: '#3880ff'}}>{props.values.title}</Link> <NavigateNext/> {props.values.resource}</h5>

                                    <table style={{borderRadius: '10px'}}>
                                        <tbody>

                                            {
                                                props.values.fields.map(function(field, i){
                                                    return(
                                                        <tr key={i}>
                                                            <td style={{width: '200px', backgroundColor: '#3880ff', color: '#fff'}}>
                                                                <Form.Label style={{fontSize: '14px', marginBottom: 5, float:'left', fontWeight: 'bold' }}>{field.label}</Form.Label>
                                                            </td>
                                                            <td style={{width: '200px', backgroundColor: '#d6d8db', color: '#000'}}>
                                                                 <Form.Label style={{fontSize: '14px', marginBottom: 5, float:'left'}}>{field.value}</Form.Label>
                                                            </td>
                                                            {
                                                                i == 0 && props.values.enableEdit && (<td style={{padding: '0', border: 'none', paddingLeft: '15px', paddingTop: '5px'}}>
                                                                <Button as={Link} variant="outline-info" to={"/" + props.values.type  + "/" + props.values.resourceId + ( props.values.subtype ? "/" + props.values.subtype + "/edit" : "/details/edit" )}>Edit</Button>
                                                                </td>)
                                                            }
                                                        </tr>
                                                    )
                                                })
                                            }                                         
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                {
                                     props.values.tableAction && props.values.tableAction.map(function(action){
                                       return <td style={{border: "none", padding: '25px'}}><Button variant="outline-info" onClick={action.onSubmit}>{action.label}</Button></td>
                                    })
                                }

                            </tr>
                            {   
                                props.values.tables.map(function(table){
                                    return (
                                        <tr key={table.title}>             
                                            <td style={{border: "none", padding: '25px'}}>
                                             {
                                                 table.title != "" && 
                                                 <h5 style={{ marginBottom: '30px' }}>
                                                         {table.title + " of " + props.values.resource}
                                                </h5>
                                             }
                                              {
                                                 table.subtitle != "" && 
                                                 <h6 style={{ marginBottom: '30px' }}>
                                                         {table.subtitle}
                                                </h6>
                                             }
                                              {
                                                    table.filters && table.filters.map(function(filter){
                                                    return ( <div  key={filter.field} style={{border: 'none'}}>
                                                            <Form.Group key={filter.field} controlId={filter.field} style={{width: '200px'}}> 
                                                            <Form.Label style={{fontSize: '14px', marginBottom: 5, float:'left'}}>{filter.label}</Form.Label>
                                                            <Form.Control controlid={"select" + filter.field } as="select" onChange={filter.onChange} value={filter.value}>                  
                                                                {
                                                                    filter.options && filter.options.map(function(option, i){
                                                                        return <option key={option.key + i} value={option.key.toString()}>{option.value}{}</option>  
                                                                    })                       
                                                                }                           
                                                            </Form.Control>
                                                            </Form.Group>
                                                            </div>)
                                                    })
                                                }
                                                 <ViewTable values={table}/>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                           
                        </tbody>
                    </Table>
                    </td>
                        {(window.location.href.includes("edit")) &&
                        <td style={{width: '400px', display: !props.sideContent && 'none', height: '100vh', border: "none", padding: '20px'}}  className="bg-light">
                        {props.sideContent}
                        </td>
                        }    
                </tr>
            </tbody>
        </Table>
            
       
    </div>
    </>);
}

export default ViewDetails;
