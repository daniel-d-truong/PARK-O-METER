import React from 'react';

// class Marker extends React.Component{
//     constructor(props){
//         super(props);
//         this.state = {
//             "occupied": props["occupied"]
//         };
//     }

//     render() {
//         return (
//             <div></div>
//         )
//     }
// }

const markerStyle = {
    height: '50px',
    width: '50px',
    marginTop: '-50px'
}

const imgStyle = {
    height: '100%'
}

// const Marker = ({ title }) => (
//     <div style={markerStyle}>
//       <img style={imgStyle} src="https://res.cloudinary.com/og-tech/image/upload/s--OpSJXuvZ--/v1545236805/map-marker_hfipes.png" alt={title} />
//       <h3>{title}</h3>
//     </div>
// );

const markerTypes = {
    "blue": "https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color/254000/66-512.png",
    "red": "https://res.cloudinary.com/og-tech/image/upload/s--OpSJXuvZ--/v1545236805/map-marker_hfipes.png",
    "taken": "https://cdn0.iconfinder.com/data/icons/map-markers-2-1/512/xxx002-512.png",
    "free": "https://www.pngfind.com/pngs/m/87-878259_select-facultats-i-escoles-google-map-marker-green.png"
};

class Marker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "occupied": false
        };
    }

    render() {
        return(
            <div style={markerStyle}>
                <img style={imgStyle} src={markerTypes[this.props["type"]]} alt={this.props["title"]} />
                <h3>{this.props["title"]}</h3>
            </div>
        )
    }
};

export default Marker;