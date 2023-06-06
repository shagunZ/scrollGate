import React from 'react';

function InfiniteScroll(props){
    return (
        <div style={{position:"relative"}}>
            <div style={{
                position:"absolute",
                bottom:"0",
                left:"0",
                width:"10px",
                height:"60px",
                backgroundColor:"cyan",
            }} 
            />
            {props.children}
            </div>
    )
}

export default InfiniteScroll;