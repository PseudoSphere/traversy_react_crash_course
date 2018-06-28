import React, { Component } from 'react';
import uuid from 'uuid';
import $ from 'jquery';
import Projects from './Components/Projects';
import AddProject from './Components/AddProject';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      todos: []
    }
  }
  
  getTodos() {
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/todos',
      dataType: 'json',
      cache: 'false',
      success: function(data) {
        this.setState({todos: data}, function() {
          console.log(this.state);
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
      }
    })
  }

  getProjects() {
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

  componentDidMount() {
    // This is the wrong place to fetch data
    //this.getProjects();
    //this.getTodos();
  }

  componentWillMount() {
    // This is the RIGHT place to fetch data
    this.getProjects();
    this.getTodos();
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
