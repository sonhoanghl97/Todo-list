import React,{Component} from 'react';
import classNames from 'classnames'
import {v4 as uuidv4} from 'uuid'

import logo from './logo.svg';
import './App.css';
import TodoItem from './components/todoItem'
import Table from './components/table'
import List from './components/list'
import Form from './components/form'
import tick from './img/tick.svg'


const filterModes={
  ALL: {
    value:0,
    filterFunction: (item)=>{
      return item
    }
  },
  ACTIVE :{
    value:1,
    filterFunction: (item)=>{
      return item.isComplete=== false
    }
  },
  COMPLETE:{
    value:2,
    filterFunction: (item)=>{
      return item.isComplete=== true
    }
  },
}

class App extends Component{
  
  constructor(){
    super();
    const jobs=localStorage.getItem("jobs")
    this.state ={
      newItem :'',
      filterMode :filterModes.ALL,
      todoItems : jobs ? JSON.parse(jobs) :[]
  }
  this.onKeyUp=this.onKeyUp.bind(this)
  this.onChange=this.onChange.bind(this)
  }
  onItemClicked(item){
    const {todoItems}= this.state
    const {isComplete, id} = item
    let index=todoItems.findIndex(each=>each.id===id)
    let newItem ={...item,isComplete:!isComplete}
    let newJobs =[...todoItems]
    newJobs.splice(index,1,newItem)
   
    this.setState({
      todoItems :[...newJobs]
    },()=>{
      localStorage.setItem("jobs",JSON.stringify(newJobs))
    }
    )
  }
  onKeyUp(event){
    if(event.keyCode===13){
      let text =event.target.value
      if(!text){
        return
      }
      text = text.trim()
      if(!text){
        return
      }
      const newJobs = [
        {id:uuidv4(), title:text, isComplete : false}
        ,
        ...this.state.todoItems
      ]

      this.setState({
        newItem:'',
        todoItems:[...newJobs]
      },()=>{
        localStorage.setItem("jobs",JSON.stringify(newJobs))
      })
    }
  }
  onChange(event){
    this.setState({
      newItem : event.target.value
    })
  }
  removeItem=item=>{
    let {todoItems}=this.state
    let {id} = item
    let newJobs= todoItems.filter(each=>each.id!==item.id)
    this.setState({
      todoItems:newJobs
    },()=> localStorage.setItem('jobs',JSON.stringify(newJobs)))
  }
  render(){
    const {todoItems, newItem,filterMode} = this.state;
    const {value,filterFunction} = filterMode;
    const list = todoItems.filter(filterFunction)
    const actions = [{
      label : "All",
      isActive : filterMode.value===filterModes.ALL.value,
      onClick : () =>this.setState({filterMode:filterModes.ALL})
    },{
      label : "Active",
      isActive : filterMode.value===filterModes.ACTIVE.value,
      onClick : () =>this.setState({filterMode:filterModes.ACTIVE})
    },{
      label : "Completed",
      isActive : filterMode.value===filterModes.COMPLETE.value,
      onClick : () =>this.setState({filterMode:filterModes.COMPLETE})
    },]
    
  return (
    <div className="App">
      <div className="Head">Todos</div>
      <div className="Header">
        <img src ={tick} height={30} width={30}/>
        <input value={newItem} onChange={this.onChange} type="text" placeholder="Add new Item" onKeyUp={this.onKeyUp}/>
      </div>
        {
          list.map((item,index)=>(
            <TodoItem key ={index} item={item} onClick={()=>this.onItemClicked(item)} onRemove={()=>this.removeItem(item)}/>
            
            ))
        }
        <div className="actions">
          <div className="itemCount">
            {list.filter(filterModes.ACTIVE.filterFunction).length} items left
          </div>
          {
            actions.map((item, index)=>{
              return (
                <div key={index} className={classNames('action',{active:item.isActive})} onClick={item.onClick}>
                  {item.label}
                </div>
              )
            })
          }
        </div>
    </div>
  );
  }
}
export default App;