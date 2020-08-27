import React, {Component} from 'react'

class Form extends Component{
    constructor(){
        super()
        this.state={
            value:''
        }

    }
    render(){
        let {value}= this.state
        return(
            <>
            <p>"Hi," {value}</p>
            <form>
                <input type="text" value={value} onChange={(event)=>{
                    this.setState({value:event.target.value})
                }}></input>
            </form>
            </>
        )
    }
}
export default Form