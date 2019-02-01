import React, { Component } from 'react'

class Screen extends Component {
    state = {  }
    render() { 
        return (  
            <div id="display">
                {this.props.currentNumber}
            </div>
        );
    }
}
 
export default Screen;