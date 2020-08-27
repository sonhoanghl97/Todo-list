import React, { Component } from 'react';
import './todoItem.css'
import classNames from 'classnames'
import checkImg from '../img/check.svg'
import checkImgComplete from '../img/check-complete.svg'

class TodoItem extends Component{   
    
    render(){
        const {item, onClick,onRemove}=this.props
        let url = checkImg
        if(item.isComplete){
        url=checkImgComplete
    }
        return <div  className={classNames("TodoItem", {"TodoItem-complete" : item.isComplete})}>
            <img onClick={onClick} src={url} width={32} height={32}/>
            <p>{this.props.item.title}</p>
            <div className="remove" onClick={onRemove}> 
            <i class="fas fa-times"></i>
            </div>
        </div>;
    }
}

export default TodoItem;
// import React from 'react';

// function TodoItem(){
//     return(
//         <div className='todoItem'>
//             <p>Wake up</p>
//         </div>
//     )
// }

// export default TodoItem;