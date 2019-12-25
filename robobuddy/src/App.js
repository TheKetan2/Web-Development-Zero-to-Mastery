import React from "react";
import CardList from "./CardList";
// import { robots } from "./robots";
import SearchBox from "./SearchBox";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchField: ""
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        return response.json();
      })
      .then(users => {
        this.setState({ robots: users });
      });
  }

  onSearchChange = event => {
    this.setState({ searchField: event.target.value });
  };

  render() {
    const filterRobots = this.state.robots.filter(robot =>
      robot.name.toLowerCase().includes(this.state.searchField.toLowerCase())
    );
    return (
      <div className="tc">
        <h1>RoboBuddy</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <CardList robots={filterRobots} />
      </div>
    );
  }
}

export default App;
