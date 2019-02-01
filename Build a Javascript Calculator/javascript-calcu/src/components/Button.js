import React, { Component } from 'react'

class Button extends Component {
    state = {  }

    runParentHandleClick = () => {
        this.props.handleClick(this.props.name);
    }
    render() { 
        return (  
            <div>
                <button className="button" onClick={this.runParentHandleClick}>{this.props.name}</button>
            </div>
        );
    }
}
 
export default Button;