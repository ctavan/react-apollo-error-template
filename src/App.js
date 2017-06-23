import React, { Component } from "react";

import List from './List';
import Create from './Create';

class App extends Component {
  state = {
    route: 'list',
  };

  goTo = (route) => {
    this.setState({
      route,
    });
  };

  render() {
    const { route } = this.state;
    return (
      <main>
        <header>
          <h1>Apollo Client Error Template</h1>
          <button onClick={() => this.goTo('list')}>List</button>
          <button onClick={() => this.goTo('create')}>Create</button>
        </header>
        {route === 'list' && (
          <List />
        )}
        {route === 'create' && (
          <Create onSuccess={() => this.goTo('list')}/>
        )}
      </main>
    );
  }
}

export default App;
