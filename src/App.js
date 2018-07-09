// Required Import
import React, { Component } from 'react';
// Generate unique ids
import uuid from 'uuid';

import $ from 'jquery';
// Importing named exports. Groovy! (Not actually using ProjectItem; only imported to test compiling)
import {Projects, ProjectItem} from './Components/Projects';
// Import component from another file
import AddProject from './Components/AddProject';
// Required Import
import './App.css';

// Required class
class App extends Component {
  // Instantiate state object
  constructor() {
    super();
    this.state = {
      projects: [],
      todos: []
    }
  }
  
  // Unused but proof of concept
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

  // Generate project data
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

  // Called before render()
  componentWillMount() {
    // This is the RIGHT place to fetch data
    this.getProjects();
    this.getTodos();
  }

  // Called after render()
  componentDidMount() {

  }

  // Adds a project to the list
  handleAddProject(project) {
    let state = this.state;
    state.projects.push(project);
    this.setState(state);
  }
  
  // Top of the "deleteProject" chain
  /* 
        TLDR:
        (ProjectItem)OnClick -> (ProjectItem)deleteProject -> (ProjectItem)onDelete = (Projects)deleteProject -> (Projects)onDelete = (App)handleDeleteProject;

        Verbose:
        (ProjectItem)OnClick triggers (ProjectItem)deleteProject
        (ProjectItem)deleteProject calls (ProjectItem)onDelete
        (ProjectItem)onDelete equals (Projects)deleteProject
        (Projects)deleteProject calls (Projects)onDelete
        (Projects)onDelete equals (App)handleDeleteProject
        (App)handleDeleteProject updates the state which updates the DOM
    */
  handleDeleteProject(id) {
    let state = this.state;
    let index = state.projects.findIndex(x => x.id === id);
    state.projects.splice(index, 1);
    this.setState(state);
  }

  // Must be a pure function (Always returns the same result)
  render() {
    return (
      // Single element return (required)
      <div className="App">
        {/* My two main components */}
        <AddProject addProject={this.handleAddProject.bind(this)}/>
        <Projects projects={this.state.projects} onDelete={this.handleDeleteProject.bind(this)}/>
      </div>
    );
  }
}

// required export
export default App;
