import React, { Component } from 'react';
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
        title: 'Business Website',
        category: 'Web Design'
      },
      {
        title: 'Social App',
        category: 'Mobile Dev'
      },
      {
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

  render() {
    return (
      <div className="App">
        <AddProject addProject={this.handleAddProject.bind(this)}/>
        <Projects projects = {this.state.projects}/>
      </div>
    );
  }
}

export default App;
