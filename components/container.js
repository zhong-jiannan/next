import { cloneElement } from 'react'


const style = {
    width:'100%',
    maxWidth:1200,
    marginLeft:'auto',
    marginRight:'auto',
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    paddingLeft:20,
    paddingRight:20
}



export default ({ children, render }) =>{
    return cloneElement(render,{
        style,
        children
    })
}