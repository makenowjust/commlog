import React from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'
import { fetchCommitList, appendCommitList } from '../actions'
import Commit from '../components/commit'
import Loading from '../components/loading'

function mapStateToProp ({fetchCommitList, append, commitList}) {
  return {
    fetch: fetchCommitList,
    append,
    commitList
  }
}

@connect(mapStateToProp)
@Radium
export default class CommitListPage extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    const { dispatch } = this.props
    dispatch(fetchCommitList())
  }

  render () {
    const {
      fetch,
      append,
      commitList
    } = this.props

    if (fetch.status === 'init' || fetch.status === 'request') {
      return (
        <Loading>
          Loading...
        </Loading>
      )
    }

    if (fetch.status === 'failure') {
      return (
        <Loading>
          Failure to load a commit list. Please <a href='javascript:location.reload()'>reload</a>.
        </Loading>
      )
    }

    const commitListElement = commitList.map((commit) => (
      <Commit key={commit.sha} commit={commit} />
    ))
    let appendElement
    switch (append.status) {
      case 'success':
        appendElement = <section onClick={::this.appendCommitList} style={[style.appendButton]}>
          <p>
            More load...
          </p>
        </section>
        break
      case 'failure':
        appendElement = <Loading>
          Failure to load a commit list. Please <a href='javascript:location.reload()'>reload</a>.
        </Loading>
        break
      case 'request':
        appendElement = <Loading>
            Loading...
        </Loading>
        break
    }

    return (
      <div>
        {commitListElement}
        {!append.finish && appendElement}
      </div>
    )
  }

  appendCommitList () {
    let { dispatch } = this.props
    dispatch(appendCommitList())
  }
}

CommitListPage.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  // TODO: Fix `fetch`, `append` and `commitList` types
  fetch: React.PropTypes.object.isRequired,
  append: React.PropTypes.object.isRequired,
  commitList: React.PropTypes.arrayOf(React.PropTypes.object)
}

const style = {
  appendButton: {
    cursor: 'pointer',
    display: 'box',
    boxPack: 'center',
    boxAlign: 'center',
    height: '13em',
    lineHeight: '13em',
    textAlign: 'center',
    transition: 'color ease 0.3s 0s',
    ':hover': {
      color: '#57a3e8'
    },
    verticalAlign: 'middle',
    width: '100%'
  }
}
