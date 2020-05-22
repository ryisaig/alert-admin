import React from 'react';

class DefaultPage extends React.Component {
    constructor(props) {
      super(props);
    }

    state = {
        fields: {}
    }

  
    render(){

        return(
            <div style={{margin: 'auto', position: 'absolute', transform: 'translateX(-50%) translateY(-50%)', left: "50%", top: "50%"}}>
                <h5>Ongoing development</h5>
            </div>
        );
    }
}

export default DefaultPage;