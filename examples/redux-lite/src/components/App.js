import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { selectReddit, fetchPostsIfNeeded, invalidateReddit } from "../actions";
import Picker from "./Picker";
import Posts from "./Posts";
import { getState } from "../store";

class App extends Component {
  static propTypes = {
    selectedReddit: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number
  };

  componentDidMount() {
    fetchPostsIfNeeded(this.props.selectedReddit);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedReddit !== this.props.selectedReddit) {
      const { selectedReddit } = nextProps;
      fetchPostsIfNeeded(selectedReddit);
    }
  }

  handleChange = nextReddit => {
    selectReddit(nextReddit);
  };

  handleRefreshClick = e => {
    e.preventDefault();
    invalidateReddit(this.props.selectedReddit);
    fetchPostsIfNeeded(this.props.selectedReddit);
  };

  render() {
    const { selectedReddit, posts, isFetching, lastUpdated } = this.props;
    const isEmpty = posts.length === 0;
    return (
      <div>
        <Picker
          value={selectedReddit}
          onChange={this.handleChange}
          options={["reactjs", "frontend"]}
        />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {" "}
            </span>}
          {!isFetching &&
            <a href="#" onClick={this.handleRefreshClick}>
              Refresh
            </a>}
        </p>
        {isEmpty
          ? isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Posts posts={posts} />
            </div>}
      </div>
    );
  }
}

const mapStateToProps = () => {
  const { selectedReddit, postsByReddit } = getState();

  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsByReddit[selectedReddit] || {
    isFetching: true,
    items: []
  };

  return {
    selectedReddit,
    posts,
    isFetching,
    lastUpdated
  };
};

export default connect(mapStateToProps)(App);
