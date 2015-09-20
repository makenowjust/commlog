import React from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import Commit from '../components/commit';
import { fetchCommit } from '../actions';

function mapStateToProp({fetchCommit, commitCache}) {
  return {
    fetch: fetchCommit,
    commitCache,
  };
}

@connect(mapStateToProp)
@Radium
export default class CommitPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      params: {
        sha,
      },
      dispatch,
    } = this.props;
    dispatch(fetchCommit(sha));
  }

  render() {
    const {
      params: {
        sha,
      },
      fetch,
      commitCache,
    } = this.props;

    if (!(sha in commitCache)) {
      if (fetch.status === 'init' || fetch.status === 'request') {
        return (
          <div style={[style.request]}>
            Loading...
          </div>
        );
      }

      return (
        <div style={[style.request]}>
          Failure to load a commit list. Please <a href='javascript:location.reload()'>reload</a>.
        </div>
      );
    }

    const commit = commitCache[sha];

    return (
      <Commit commit={commit} />
    );
  }
}

const style = {
  request: {
    background: 'url(img/box.gif) no-repeat center',
    height: '10em',
    textAlign: 'center',
    width: '100%',
  },
};
