import React, {Component} from 'react'
class List extends Component{
    render(){
        return(
            <div>
            {[
                '1','A','a','I','i'
            ].map((item,index)=>(
                <ol key={index} type={item} >
                    <li>Item1</li>
                    <li>Item2</li>
                    <li>Item3</li>
                </ol>
            ))}
            </div>
            
        )
    }
}

export default List