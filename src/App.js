import React, { Component } from 'react';
import './App.css';
/*
 * - header / sorting
 * - userList
 *   - users
 */

const Header = () => {
  return (
  <div className="text-center">
    <h1>Camper Leaderboard</h1>
  </div>
  );
}

const UserList = (props) => {
  let userNodes = props.users.map((user, index) => {
    return (
      <User
        username={user.username}
        key={index}
        index={index}
        img={user.img}
        alltime={user.alltime}
        recent={user.recent}
      />
    );
  });
  return (
  <div className="table-responsive">
    <table className="table table-hover table-condensed">
      <thead>
        <tr>
          <th>#</th>
          <th>Picture</th>
          <th>Username</th>
          <th onClick={() => {props.toggleSort('all')}}>
            All time <i className="fa fa-sort-desc"></i>
          </th>
          <th onClick={() => {props.toggleSort('recent')}}>
            Recent <i className="fa fa-sort-desc"></i>
          </th>
        </tr>
      </thead>
      <tbody>
        {userNodes}
      </tbody>
    </table>
  </div>
  );
}

const User = (props) => {
  let baseLink = "https://www.freecodecamp.com/";
  return (
    <tr>
      <td>
        {props.index + 1}
      </td>
      <td>
        <img className="user-img img-thumbnail" src={props.img} alt="user"/>
      </td>
      <td>
        <a href={baseLink + props.username}>{props.username}</a>
      </td>
      <td>
       {props.alltime}
      </td>
      <td>
       {props.recent}
     </td>
   </tr>
  );
}

class App extends Component {
  constructor() {
    super();
    this.loadAlltimeUsers = this.loadAlltimeUsers.bind(this);
    this.toggleSort = this.toggleSort.bind(this);
    this.state = {data: [], sortBy: 'all'}; // sortBy needs to be 'all' or 'recent';
  }
  componentDidMount() {
    this.loadAlltimeUsers()
  }
  loadAlltimeUsers() {
    const urlBase = 'https://fcctop100.herokuapp.com/api/fccusers/top/';
    const paths = {
      recent: 'recent',
      all: 'alltime'
    };
    let url = urlBase + paths[this.state.sortBy];
    $.ajax({
        url: url,
        dataType: 'json',
        cache: false,
        success: function(data) {
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(url, status, err.toString());
        }.bind(this)
    });
  }
  toggleSort(key) {
    this.setState({sortBy: key});
    this.loadAlltimeUsers();
  }
  render() {
    return (
      <div>
        <Header />
        <UserList users={this.state.data} sort={this.state.sortBy} toggleSort={this.toggleSort}/>
      </div>
    );
  }
}

export default App;
