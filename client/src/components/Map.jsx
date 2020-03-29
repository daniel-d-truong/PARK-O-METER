import React from 'react';
import socketIOClient from 'socket.io-client';
import {serverUrl} from '../FunctionConstants'

class Map extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const socket = socketIOClient(serverUrl);
        socket.on("update parking", data => console.log(data));
    }

    render(){
        return(
            <div>
                <p>Map</p>
            </div>
        )
    }
}

export default Map;