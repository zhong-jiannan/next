import { cloneElement } from 'react'


const basic = {
    width:'100%',
    maxWidth:1200,
    marginLeft:'auto',
    marginRight:'auto',
    display:'flex',
    justifyContent:'space-between',
    paddingLeft:20,
    paddingRight:20
}

export default ({ children, render }) =>{
    return cloneElement(render,{
        className:'inner-wrapper',
        style:Object.assign({},basic,render.props.style),
        children
    })
}