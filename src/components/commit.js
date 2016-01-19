import React from 'react'
import { Link } from 'react-router'
import Markdown from './markdown'

export default function Commit (props) {
  const {
    sha,
    commit: {
      author: {
        date
      },
      message
    },
    committer: {
      avatar_url: comitterIconUrl,
      html_url: comitterUrl,
      login: comitterName
    }
  } = props.commit

  return (
    <section style={style.section}>
      <div style={style.container}>
        <Markdown>{message}</Markdown>
        <div style={style.info}>
          <a style={style.rightPad} href={comitterUrl}>
            {comitterName}
            <img style={style.icon} src={comitterIconUrl} />
          </a>
          <span style={style.rightPad}>{date}</span>
          <Link to={`/commit/${sha}`}>#</Link>
        </div>
      </div>
    </section>
  )
}

Commit.propTypes = {
  commit: React.PropTypes.shape({
    sha: React.PropTypes.string.isRequired,
    commit: React.PropTypes.shape({
      author: React.PropTypes.shape({
        date: React.PropTypes.string.isRequired
      }).isRequired,
      message: React.PropTypes.string.isRequired
    }).isRequired,
    committer: React.PropTypes.shape({
      avatar_url: React.PropTypes.string.isRequired,
      html_url: React.PropTypes.string.isRequired,
      login: React.PropTypes.string.isRequired
    }).isRequired
  }).isRequired
}

const style = {
  section: {
    borderBottom: '1px solid #ddd',
    padding: '2em 0'
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  icon: {
    width: '1em',
    height: '1em'
  },
  rightPad: {
    paddingRight: '1em'
  },
  info: {
    textAlign: 'right',
    margin: '1em 0'
  }
}
