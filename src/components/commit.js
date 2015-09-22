import React from 'react';
import Radium from 'radium';
import { Link } from 'react-router';
import Mdast from 'mdast-react-component';

@Radium
export default class Commit extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      sha,
      commit: {
        author: {
          date,
        },
        message,
      },
      committer: {
        avatar_url: comitterIconUrl,
        html_url: comitterUrl,
        login: comitterName,
      },
    } = this.props.commit;


    return (
      <section style={[style.section]}>
        <div style={[style.container]}>
          <Mdast>{message}</Mdast>
          <div style={[style.info]}>
            <a style={[style.rightPad]} href={comitterUrl}>
              {comitterName}
              <img style={[style.icon]} src={comitterIconUrl} />
            </a>
            <span style={[style.rightPad]}>{date}</span>
            <Link to={`/commit/${sha}`}>#</Link>
          </div>
        </div>
      </section>
    );
  }
}

const style = {
  section: {
    display: 'block',
    width: '100%',
    borderBottom: '1px solid #ddd',
    padding: '2em',
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  icon: {
    width: '1em',
    height: '1em',
  },
  rightPad: {
    paddingRight: '1em',
  },
  info: {
    width: '100%',
    textAlign: 'right',
    margin: '1em 0',
  },
};
