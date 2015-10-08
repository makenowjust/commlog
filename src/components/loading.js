import React from 'react'
import Radium from 'radium'

@Radium
export default class Loading extends React.Component {
  static propTypes = {
    children: React.PropTypes.node
  }

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div style={[style.loading]}>
        <div>
          {this.props.children}
        </div>
        <img src='img/box.gif' style={[style.box]} />
      </div>
    )
  }
}

const style = {
  loading: {
    padding: '1em 0',
    textAlign: 'center',
    width: '100%',
    height: '14em'
  },
  box: {
    paddingTop: '1em',
    width: '10em',
    height: '10em'
  }
}
