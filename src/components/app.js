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
      <div style={[style.body]}>
        <h1 style={[style.h1]}><Link to='/' style={[style.link]}>commlog</Link></h1>
        {this.props.children}
      </div>
    );
  }
}

const style = {
  body: {
    maxWidth: '800px',
    background: '',
    margin: '0 auto',
    padding: '0',
  },
  h1: {
    fontSize: '3em',
    textAlign: 'center',
    width: '100%',
    height: '50%',
    padding: '2em 0',
    marginTop: '0',
  link: {
    textDecoration: 'none',
  },
};
