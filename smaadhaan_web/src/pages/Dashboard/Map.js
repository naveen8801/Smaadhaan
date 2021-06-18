import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import axios from "axios";
import { CardHeader } from 'reactstrap';


const containerStyle = {
    width: '100%',
    height: '800px'
};

const center = [];
var obj = {};

const chart = () => {

    axios
        .get("https://smaadhaan-server-interested-eland-ls.eu-gb.mybluemix.net/api/all-data")
        .then(res => {
            for (const dataObj in res.data.userLocation) {
                console.log(dataObj.data);

                obj['lat'].push(parseInt(dataObj.lat));
                obj['long'].push(dataObj.long);
                center.push(obj);

            }
        })
        .catch(err => {
            console.log(err);
        });


};



function MyComponent() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAiPFta9tA8MUawfQtZgCrqQRf84Mcqvl0"
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])
    chart();
    return isLoaded ? ( <
        GoogleMap mapContainerStyle = { containerStyle }
        defaultcenter = { center }
        zoom = { 10 }
        onLoad = { onLoad }
        onUnmount = { onUnmount } >
        { /* Child components, such as markers, info windows, etc. */ } {

        } <
        > < />

        <
        /GoogleMap>
    ) : < > < />
}

export default React.memo(MyComponent)