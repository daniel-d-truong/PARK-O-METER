import React from 'react';

class Marker extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            "occupied": props["occupied"]
        };
    }

    render() {
        return (
            <div></div>
        )
    }
}