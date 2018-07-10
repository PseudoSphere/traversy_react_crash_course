// Required import for react components
import React, { Component } from 'react';
// Optional import for type constraints
import PropTypes from 'prop-types';

// Main component of this file, generates the section with a list of projects
class Projects extends Component {
    // Middle of the "deleteProject" chain of functions
    deleteProject(id) {
        this.props.onDelete(id);
    }

    // Required method (and most important)
    render() {
        // prepare variable
        let projectItems;
        
        // validate input
        if (this.props.projects) {
            // I should work on mapping more as well. Looks like I'll be using it a lot with React
            projectItems = this.props.projects.map(project => {
                return (
                    // Can normal comment here because outside JSX
                    // OOP!! Reusable component written below this one. Can also be done in another file and imported (duh)
                    <ProjectItem onDelete={this.deleteProject.bind(this)} key={project.id} project={project} />
                );
            });
        }

        // Single HTML element which gets passed up to whatever uses this component, namely the App component
        return (
            // Pretty simple
            <div className="Projects">
                <h3>Projects</h3>
                {/* projectItems is actually an array of list items */}
                {projectItems}
            </div>
        );
    }
}

// Optional variable typing. Only throws warnings; incorrect variable types will not break compiler
Projects.propTypes = {    
    projects: PropTypes.array,    
    onDelete: PropTypes.func
}

// A single project display, generated for every displayed project
class ProjectItem extends Component {
    // Bottom of the "deleteProject" chain of functions
    deleteProject(id) {
        this.props.onDelete(id);
    }

    // Only required method for every component
    render() {
        // easy reference to specific project rather than using this.props.project every time
        let project = this.props.project;
        // a single HTML element goes in here, usually a div.
        return (
            // our one element
            <li className="ProjectItem">
                {/* JSX comments must be in curly braces and block comments */}
                {/* variables are notated with {variable} */}
                <strong>{project.title}:</strong> {project.category}&nbsp;
                {/* we use .bind(this) a lot. Would be good to learn exactly how that works and when I need it and when I don't etc. */}
                <a href="#" onClick={this.deleteProject.bind(this, this.props.project.id)}>X</a>
            </li>
        );
    }
}

// Optional variable typing. Only throws warnings; incorrect variable types will not break compiler
ProjectItem.propTypes = {    
    project: PropTypes.object,    
    onDelete: PropTypes.func
}

// export the primary component. Additional testing needed to determine how (and if) to export multiple components from the same file.
//export default Projects;

// Trying named exports instead (Success!!)
export {Projects, ProjectItem}