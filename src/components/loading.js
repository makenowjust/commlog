import React from 'react'

export default function Loading (props) {
  return (
    <div style={style.loading}>
      <div>
        {props.children}
      </div>
      <img src='img/box.gif' style={style.box} />
    </div>
  )
}

Loading.propTypes = {
  children: React.PropTypes.node
}

const style = {
  loading: {
    padding: '1em 0',
    textAlign: 'center',
    height: '14em'
  },
  box: {
    paddingTop: '1em',
    width: '10em',
    height: '10em'
  }
}
