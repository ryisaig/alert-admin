import React from 'react';
import CallTreeList from './CallTreeList';
  
class ViewGradeList extends React.Component {

    state = {
        title: "Call Tree",
    }

    render(){
        return(
            <div>          
                <CallTreeList  sideContent={this.props.children} />                 
            </div>
        )
    }


}

export default ViewGradeList;