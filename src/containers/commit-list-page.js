import React from 'react';
import Radium from 'radium';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchCommitList, appendCommitList } from '../actions';
import Commit from '../components/commit';

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
    console.log(this.props);
    const {
      fetch,
      append,
      commitList,
    } = this.props;

    if (fetch.status === 'init' || fetch.status === 'request') {
      return (
        <div style={[style.request]}>
          Loading...
        </div>
      );
    }

    if (fetch.status === 'failure') {
      return (
        <div style={[style.request]}>
          Failure to load a commit list. Please <a href='javascript:location.reload()'>reload</a>.
        </div>
      );
    }

    const commitListElement = commitList.map((commit) => (
      <Commit key={commit.sha} commit={commit} />
    ));
    let appendElement;
    switch (append.status) {
    case 'success':
      appendElement = <section style={[style.append, style.appendButton]} onClick={::this.appendCommitList}>
        More load...
      </section>;
      break;
    case 'failure':
      appendElement = <section style={[style.append, style.request]}>
        Failure to load a commit list. Please <a href='javascript:location.reload()'>reload</a>.
      </section>
      break;
    case 'request':
      appendElement = <section style={[style.append, style.request]}>
        Loading...
      </section>
      break;
    }

    return (
      <div>
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
  request: {
    background: 'url(img/box.gif) no-repeat center',
    height: '10em',
    textAlign: 'center',
    width: '100%',
  },
  append: {
    padding: '2em 0',
    textAlign: 'center',
  },
  appendButton: {
    cursor: 'pointer',
    transition: 'color ease 0.3s 0s',
    ':hover': {
      color: '#57a3e8',
    },
  },
};
