// Required Import
import React, { Component } from 'react';
// Generate unique ids
import uuid from 'uuid';
// Used for data typing
import PropTypes from 'prop-types';

// Main component
class AddProject extends Component {
    // Instantiate state
    constructor() {
        super();
        this.state = {
            newProject: {}
        }
    }
    // default props always used by this component (poor usage in this tutorial but good to learn)
    static defaultProps = {
        categories: ['Web Design','Mobile Dev', 'Web Dev']
    }
    
    // custom event handler
    handleSubmit(e) {
        // refs are labeled in the render funtion
        if(this.refs.title.value === '') {
            alert('!!Title Required!!')
        } else {
            this.setState({
                newProject: {
                    id: uuid.v4(),
                    title: this.refs.title.value,
                    category: this.refs.category.value
                }
            }, ()=>{
                this.props.addProject(this.state.newProject);
            });
        }
        // Ensures my handler is called and not Reacts default event listener... I think
        e.preventDefault();
    }

    render() {
        // Map categories to JSX. So cool. I need to use .map more often
        let categoryOptions = this.props.categories.map(category => {
            return <option key={category} value={category}>{category}</option>
        });
        return (
            <div>
                <h3>Add Project</h3>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div> 
                        <label>Title</label><br />
                        <input type="text" ref="title" />    
                    </div>
                    <div> 
                        <label>Category</label><br />
                        <select ref="category">
                            {categoryOptions}
                        </select>
                    </div>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

// Data type enforcing
AddProject.propTypes = {    
    categories: PropTypes.array,    
    addProject: PropTypes.func
}

export default AddProject;