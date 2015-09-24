import React from 'react';
import Radium from 'radium';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchCommitList, appendCommitList } from '../actions';
import Commit from '../components/commit';
import Loading from '../components/loading';

function mapStateToProp({fetchCommitList, append, commitList}) {
  return {
    fetch: fetchCommitList,
    append,
    commitList,
  };
}

@connect(mapStateToProp)
@Radium
export default class CommitListPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCommitList());
  }

  render() {
    const {
      fetch,
      append,
      commitList,
    } = this.props;

    if (fetch.status === 'init' || fetch.status === 'request') {
      return (
        <Loading>
          Loading...
        </Loading>
      );
    }

    if (fetch.status === 'failure') {
      return (
        <Loading>
          Failure to load a commit list. Please <a href='javascript:location.reload()'>reload</a>.
        </Loading>
      );
    }

    const commitListElement = commitList.map((commit) => (
      <Commit key={commit.sha} commit={commit} style={{display: 'table-row'}} />
    ));
    let appendElement;
    switch (append.status) {
    case 'success':
      appendElement = <section style={{display: 'table-row'}} onClick={::this.appendCommitList}>
        <div style={[style.appendButton]}>
          More load...
        </div>
      </section>;
      break;
    case 'failure':
      appendElement = <Loading style={{display: 'table-row'}}>
        Failure to load a commit list. Please <a href='javascript:location.reload()'>reload</a>.
      </Loading>;
      break;
    case 'request':
      appendElement = <Loading style={{display: 'table-row'}}>
          Loading...
      </Loading>;
      break;
    }

    return (
      <div style={{display: 'table', width: '100%'}}>
        {commitListElement}
        {!append.finish && appendElement}
      </div>
    );
  }

  appendCommitList() {
    let { dispatch } = this.props;
    dispatch(appendCommitList());
  }
}

const style = {
  appendButton: {
    cursor: 'pointer',
    display: 'table-cell',
    height: '13em',
    textAlign: 'center',
    transition: 'color ease 0.3s 0s',
    ':hover': {
      color: '#57a3e8',
    },
    verticalAlign: 'middle',
    width: '100%',
  },
};
