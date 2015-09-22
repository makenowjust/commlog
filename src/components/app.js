import React from 'react';
import Radium from 'radium';
import Link from './link';

@Radium
export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1 style={[style.h1]}><Link to='/' style={[style.link]}>commlog</Link></h1>
        {this.props.children}
      </div>
    );
  }
}

const style = {
  h1: {
    fontSize: '3em',
    textAlign: 'center',
    width: '100%',
    height: '50%',
    padding: '2em 0 1em 0',
    marginTop: '0',
    border: 'none',
  },
  link: {
    textDecoration: 'none',
  },
};
