// all import statements must go here
import React, { Component } from 'react';
import uuid from 'uuid';
import $ from 'jquery';

import Projects from './Components/Projects';
import AddProject from './Components/AddProject';

import Todos from './Components/Todos';

// import all CSS after the components
import './App.css';

// main App Class
class App extends Component {
  constructor() {
    // super() must always be called first before creating any state information
    super();

    // state data must be stored in this variable
    // it can be stored directly, but it's more efficient to store it using a lifecycle method like below
    this.state = {
      projects: [],
      todos: []
    }
  }

  getTodos() {
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/todos',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({todos: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
      }
    });
  }

  getProjects() {
    this.setState({projects: [
      {
        id: uuid.v4(),
        title: 'Business Website',
        category: 'Web Design'
      },
      {
        id: uuid.v4(),
        title: 'Social App',
        category: 'Mobile Development'
      },
      {
        id: uuid.v4(),
        title: 'E-Commerce Shopping Website',
        category: 'Web Development'
      }
    ]});
  }

  // lifecycle method that gets called whenever the component is re-rendered
  componentWillMount() {
    this.getProjects();

    this.getTodos();
  }

  componentDidMount() {
    this.getTodos();
  }

  handleAddProject(project) {
    let projects = this.state.projects;

    projects.push(project);
    this.setState({projects: projects});
  }

  handleDeleteProject(id) {
    let projects = this.state.projects;
    let index = projects.findIndex(x => x.id === id);

    projects.splice(index, 1);
    this.setState({projects: projects});
  }

  // this is where it will render the components of App
  render() {
    // contents of the return() function are what will be rendered to the screen
    return (
      <div className="App">
        <AddProject addProject={this.handleAddProject.bind(this)}/>

        {/* Pass properties (props) to other components by passing them as parameters */}
        <Projects projects={this.state.projects} onDelete={this.handleDeleteProject.bind(this)} />

        <hr />

        <Todos todos={this.state.todos}/>
      </div>
    );
  }
}

// export App so that it can be used by other components across the project
export default App;
