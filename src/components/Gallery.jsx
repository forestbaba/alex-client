import React from 'react';

export default class Gallery extends React.Component{
    render(){
        return (
            <div>
            { this.props.items ? 
                this.props.items.map((item , i) => {
                    let {title, imageLinks , infoLink} = item.volumeInfo
                    return (
                        <a href ={infoLink}
                        target = "_blank"
                        rel="noopener noreferrer"
                        key={i} className = "book">
                        <img 
                        src ={imageLinks !== undefined? imageLinks.thumbnail : ''} 
                        alt = "book"
                        className = "bookImage"
                        />
                        <div className = "titleText">{title }</div>

                        </a>
                        
                    );
                })
                : null
            }</div>

        );
    }
}