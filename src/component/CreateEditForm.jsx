import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import swal from 'sweetalert';
import {
    Switch,
    useHistory,
    Link
  } from "react-router-dom";
import GenericRequest from '../utils/GenericRequest';
import { Add} from '@material-ui/icons';
import { defaultField,  selectField, checkListField, checkField, scheduleField} from './Fields';

function CreateEditForm(props) {

    let currentUrl = window.location.href;
    let cancelUrl = "";
    let cancelLinkTo = "";
    if(currentUrl.includes("details")){
        cancelUrl = currentUrl.replace("/edit","");
        cancelLinkTo = "./"
    } else if(currentUrl.includes("create")) {
        cancelUrl = currentUrl.replace("/create","");
        cancelLinkTo = "./"
    } else if(currentUrl.includes("edit")) {
        cancelUrl = currentUrl.replace(props.values.resourceId + "/edit","");
        cancelLinkTo = "../"
    }
    
    const successAction = props.successCallBack.bind(props.component);
    

    let formValues = {...props.values.objectReference}
    const onSubmit = (e) => {
        e.preventDefault();

        const call = (props.values.method === "POST") ? axios.post :
                    (props.values.method === "PATCH") ? axios.patch : axios.put;

        const params = {
            requestId: GenericRequest().requestId,
            session: {
                sessionValue: GenericRequest().sessionValue,
                sessionId: GenericRequest().sessionId,
                username: GenericRequest().username,
                application: GenericRequest().application
            },
            [props.values.resource] : formValues
        }
        
        console.log("params", params)
        call(props.values.submitUrl, params)
        .then(res => {
            swal("Success!", props.values.successMessage, "success").then(()=>{
                
                successAction();

                // if(!props.values.disableReload){
                //     window.location.href = cancelUrl
                // } else {
                //     window.location = "../";
                // }

            })
        }).catch( e => {
            swal("Error!", e.message, "error");
        })
  }

  const handleFormValueChange = (e) =>{
    formValues[e.target.id] = e.target.value;
    props.values.fields.forEach(function(field){
        if(e.target.id === field.id){
            if(field.selectValueChange){
                field.selectValueChange(e.target.value)
            }
        }
    })
  }
  

  const handleScheduleDayChange = (e, i) => {
    props.values.fields.forEach(function(field){
        if(e.target.id === field.id){
            if(field.selectValueChange){
                console.log("e.target.value", e.target.value)
                field.selectValueChange(e.target.value, "day", i)
            }
        }
    })
  }


  const handleStartTimeChange = (e, i) => {
    props.values.fields.forEach(function(field){
        if(e.target.id === field.id){
            if(field.selectValueChange){
                field.selectValueChange(e.target.value, "timeStart", i);
            }
        }
    })
  }

  const handleEndTimeChange = (e, i) => {
    props.values.fields.forEach(function(field){
        if(e.target.id === field.id){
            if(field.selectValueChange){
                field.selectValueChange(e.target.value, "timeEnd", i);
            }
        }
    })
  }

  const handleCheckListValueChange = (e) =>{
    let list = [];
    if(formValues[e.target.id]){
        list = formValues[e.target.id];
    }   
    props.values.fields.forEach(function(field){
        if(e.target.id === field.id){
            if(field.objectReference){
                if(e.target.checked){
                    list.push(field.objectReference[e.target.value])
                } else {
                    list = list.filter(function(item){
                        if(item){
                            return item.id != e.target.value
                        } else {
                            return false;
                        }
                    })
                }
                formValues[field.id] = list;
                if(field.checklistValueChange){
                    field.checklistValueChange(list)
                }
            }
        }
    })
  }

  const handleAllCheckListValueChange = (e) =>{
    let list = [];  
    props.values.fields.forEach(function(field){
        if(e.target.id === field.id){
            if(e.target.checked){
                list = Object.values(field.objectReference);
            } else {
                list = [];
            }
            formValues[field.id] = list;
            field.checklistValueChange(list);
        }
    })
  }

  const handleSelectValueChange = (e) => {
      props.values.fields.forEach(function(field){
        if(e.target.id === field.id){
            if(field.objectReference){
                formValues[e.target.id] = field.objectReference[e.target.value];
            } else {
                formValues[e.target.id] = e.target.value;
            }
            if(field.selectValueChange){
                // if(field.objectReference){
                //     field.selectValueChange(field.objectReference[e.target.value]);
                // } else {
                    field.selectValueChange(e.target.value)
                //}
            }
        }
    })
  }
  return (
        <form style={{padding: '10px'}} onSubmit={onSubmit} > 
            <h5 style={{marginBottom: '30px'}}>{props.values.title}</h5>
            {
               props.values.fields.map(function(field){
                    if(field.type === "select"){
                        return selectField(field, formValues, handleSelectValueChange, props.values.resourceId)
                    } else if(field.type === "checklist"){
                        return checkListField(field, formValues, handleAllCheckListValueChange, handleCheckListValueChange)
                    } else if(field.type === "check"){
                        return checkField(field, formValues, handleFormValueChange)
                    } else if(field.type === "schedule"){
                        return scheduleField(field, formValues, handleScheduleDayChange, handleStartTimeChange, handleEndTimeChange)
                    } else {
                        return defaultField(field, formValues, handleFormValueChange)
                    }
               })
            }
            <div style={{marginTop: '30px', float: 'right', marginBottom: '30px'}}>
                 <Link to={cancelLinkTo}><Button variant="outline-secondary" style={{marginRight: '5px'}}>
                    Cancel
                </Button></Link>
                <Button type="submit" variant="outline-info">
                    Submit
                </Button>
            </div>
    </form>
  );
}
export default CreateEditForm;

