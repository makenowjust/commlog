import React from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'
import { fetchCommit } from '../actions'
import Commit from '../components/commit'
import Loading from '../components/loading'

function mapStateToProp ({fetchCommit, commitCache}) {
  return {
    fetch: fetchCommit,
    commitCache
  }
}

@connect(mapStateToProp)
@Radium
export default class CommitPage extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    const {
      params: {
        sha
      },
      dispatch
    } = this.props
    dispatch(fetchCommit(sha))
  }

  render () {
    const {
      params: {
        sha
      },
      fetch,
      commitCache
    } = this.props

    if (!(sha in commitCache)) {
      if (fetch.status === 'init' || fetch.status === 'request') {
        return (
          <Loading>
            Loading...
          </Loading>
        )
      }

      return (
        <Loading>
          Failure to load a commit list. Please <a href='javascript:location.reload()'>reload</a>.
        </Loading>
      )
    }

    const commit = commitCache[sha]

    return (
      <Commit commit={commit} />
    )
  }
}

CommitPage.propTypes = {
  params: React.PropTypes.shape({
    sha: React.PropTypes.string.isRequired
  }).isRequired,
  dispatch: React.PropTypes.func.isRequired,
  // TODO: Fix `fetch` and `commitCache` types
  fetch: React.PropTypes.object.isRequired,
  commitCache: React.PropTypes.object.isRequired
}
