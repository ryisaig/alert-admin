import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Add } from '@material-ui/icons';

export const defaultField = (field, formValues, handleFormValueChange) =>{ 
    formValues[field.id] = field.value;
    return (
    <Form.Group key={field.id} controlId={field.id} style={{ ...field.overrideStyle, marginBottom: 10}}> 
        <Form.Label style={{fontSize: '14px', marginBottom: 5, float:'left'}}>{field.label}</Form.Label>
        <Form.Control type={field.type} placeholder={field.placeholder} required={field.isRequired} defaultValue={field.value} onChange={handleFormValueChange} readOnly={field.readOnly}/>                         
    </Form.Group>);
}


export const selectField = (field, formValues, handleSelectValueChange, resourceId) => {
        
    if(field.objectReference){
        formValues[field.id] = field.objectReference[field.value];
     } else {
        formValues[field.id] = field.value;
    }

    return <Form.Group key={field.id + resourceId} controlId={field.id} style={{ marginBottom: 10}}> 
        <Form.Label style={{fontSize: '14px', marginBottom: 5, float:'left'}}>{field.label}</Form.Label>
        <Form.Control controlid={"select" + field.id + resourceId} as="select" placeholder={field.placeholder} required={field.isRequired} value={field.value} onChange={handleSelectValueChange} disabled={field.readOnly}>
            {!field.isRequired && <option key="0" value="0">None</option>}
            {
                field && field.options && field.options.map(function(option){
                    return <option key={option.key} value={option.key.toString()}>{option.value}{}</option>  
                })
            }                                 
        </Form.Control>
    </Form.Group>
    
};

export const checkField = (field, formValues, handleFormValueChange) => {
    formValues[field.id] = field.value;
    return(
    <Form.Group key={field.id} controlId={field.id}> 
        <Form.Check type="checkbox" label={field.label} required={field.isRequired} checked={field.checked} defaultValue={field.value} onChange={handleFormValueChange}/>
    </Form.Group>
    );
}

export const scheduleItemField = (field, item, i, handleScheduleDayChange, handleStartTimeChange, handleEndTimeChange) => (
    <div key={item}> 
        <Form.Control controlid={"scheduleDay" + i} name={"scheduleDay" + i} as="select" readOnly={field.readOnly} required={field.isRequired} value={item.day} onChange={(e)=>handleScheduleDayChange(e, i)} style={{width: '70px', float: 'left', display: 'block', marginRight: '5px'}}>
                <option key="MON" value="MON">MON</option>   
                <option key="TUE" value="TUE">TUE</option>                             
                <option key="WED" value="WED">WED</option>                             
                <option key="THU" value="THU">THU</option>                             
                <option key="FRI" value="FRI">FRI</option>                             
                <option key="SAT" value="SAT">SAT</option>                             
                <option key="SUN" value="SUN">SUN</option>                             
        </Form.Control>
        <Form.Control controlid={"scheduleTimeStart" + i} name={"scheduleTimeStart" + i} type="time"  value={item.time.timeStart} required={field.isRequired} onChange={(e)=>handleStartTimeChange(e, i)} readOnly={field.readOnly} style={{width: '130px', float: 'left', display: 'block', marginRight: '5px'}}/>                         
        <Form.Control controlid={"scheduleTimeEnd" + i} name={"scheduleTimeEnd" + i} type="time"  value={item.time.timeEnd} required={field.isRequired} onChange={(e)=>handleEndTimeChange(e, i)} readOnly={field.readOnly} style={{width: '130px', float: 'left', display: 'block'}}/>                         
        <br/><br/>
    </div> 
);

export const scheduleField = (field, formValues, handleScheduleDayChange, handleStartTimeChange, handleEndTimeChange) => {
    formValues[field.id] = field.value;
    return(
    <Form.Group key={field.id} controlId={field.id}> 
         <Form.Label style={{fontSize: '14px', marginBottom: 5}}>Schedule</Form.Label><br/>
            <Button variant="outline-info" style={{marginBottom: '10px'}} onClick={field.onIncrement}><Add/></Button> <br/>
            {  
                field.value && field.value.map(function(item, i){
                    return scheduleItemField(field, item, i, handleScheduleDayChange, handleStartTimeChange, handleEndTimeChange);        
                })
            }               
    </Form.Group>
    );
}


export const checkListField = (field, formValues, handleAllCheckListValueChange, handleCheckListValueChange) => {
    formValues[field.id] = field.value;
    return(
        <Form.Group key={field.id} controlId={field.id}>{field.label} 
            <Form.Check 
                key="selectAll"
                type="checkbox" 
                label="Select All"
                onChange={handleAllCheckListValueChange}
            />
             { 
                field && field.options && field.options.map(function(option){
                    return  <Form.Check 
                                key={option.key}
                                type="checkbox" 
                                checked={ifExistInValue(option, field.value)}
                                label={option.value} 
                                value={option.key} 
                                onChange={handleCheckListValueChange}/>
                })
            }
        </Form.Group>
    );
}

const ifExistInValue = (option, values) =>{
    var found = false;
    if(values){
        for(var i = 0; i < values.length; i++) {
            if (values[i] && (values[i].id == option['key'])) {
                found = true;
                break;
            }
        }    
    }
    return found;
}
