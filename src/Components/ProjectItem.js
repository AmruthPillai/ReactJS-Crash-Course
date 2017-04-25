import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProjectItem extends Component {
  handleDeleteProject(id) {
    this.props.onDelete(id);
  }

  render() {
    return (
      <li className="ProjectItem">
        <strong>{this.props.project.title}</strong>: {this.props.project.category} <a href="#" onClick={this.handleDeleteProject.bind(this, this.props.project.id)}>Delete</a>
      </li>
    );
  }
}

ProjectItem.propTypes = {
  project: PropTypes.object,
  onDelete: PropTypes.func
}

export default ProjectItem;
