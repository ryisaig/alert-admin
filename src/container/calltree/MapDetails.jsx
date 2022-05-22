import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
class MapDetails extends Component {

 render() {
 return (
 <div className="MapDetails">
    <Map google={this.props.google} zoom={10}
            initialCenter={{
            lat: this.props.lat,
            lng: this.props.lng
            }} />
    </div>
    );
    }
}
export default GoogleApiWrapper({
 apiKey: ("AIzaSyBDW1CMuHycsVdVi5ofBq2ZFAhtJ1G7k3g")
})(MapDetails);