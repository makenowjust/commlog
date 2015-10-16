import React from 'react'
import Link from './link'

export default function App (props) {
  return (
    <div>
      <h1 style={style.h1}><Link to='/' style={style.link}>commlog</Link></h1>
      {props.children}
    </div>
  )
}

App.propTypes = {
  children: React.PropTypes.node
}

const style = {
  h1: {
    fontSize: '3em',
    textAlign: 'center',
    width: '100%',
    height: '50%',
    padding: '2em 0 1em 0',
    marginTop: '0',
    border: 'none'
  },
  link: {
    textDecoration: 'none'
  }
}
