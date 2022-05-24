import React from 'react';
import CallTreeList from './CallTreeList';
  
class CallTreePage extends React.Component {

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

export default CallTreePage;