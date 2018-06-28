import React, { Component } from 'react';
import uuid from 'uuid';
import Projects from './Components/Projects';
import AddProject from './Components/AddProject';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {projects: []}
  }
  
  componentDidMount() {
    this.setState({
      projects: [
      {
        id: uuid.v4(),
        title: 'Business Website',
        category: 'Web Design'
      },
      {
        id: uuid.v4(),
        title: 'Social App',
        category: 'Mobile Dev'
      },
      {
        id: uuid.v4(),
        title: 'Shopping Cart',
        category: 'Web Development'
      }
    ]});
  }

  handleAddProject(project) {
    let state = this.state;
    state.projects.push(project);
    this.setState(state);
  }

  handleDeleteProject(id) {
    let state = this.state;
    let index = state.projects.findIndex(x => x.id === id);
    state.projects.splice(index, 1);
    this.setState(state);
  }

  render() {
    return (
      <div className="App">
        <AddProject addProject={this.handleAddProject.bind(this)}/>
        <Projects projects={this.state.projects} onDelete={this.handleDeleteProject.bind(this)}/>
      </div>
    );
  }
}

export default App;
