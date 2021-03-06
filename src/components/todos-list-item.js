import React from 'react';

export default class TodosListItem extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      isEditing: false
    };
  }

  onEditClick(){
    this.setState({isEditing: true});
  }
  onCancelClick(){
    this.setState({isEditing: false});
  }
  onSaveClick(event){
    event.preventDefault();

    const oldTask = this.props.task;
    const newTask = this.refs.editInput.value;
    this.props.saveTask(oldTask, newTask);
    this.setState({isEditing: false});
  }

  renderActionSection(){
    if(this.state.isEditing){
      return(
        <td>
          <button className='btn btn-success' onClick={this.onSaveClick.bind(this)}>Save</button>
          <button className='btn btn-warning' onClick={this.onCancelClick.bind(this)}>Cancel</button>
        </td>
      );
    }

    return(
      <td>
        <button className='btn btn-info' onClick={this.onEditClick.bind(this)}>Edit</button>
        <button className='btn btn-danger' onClick={this.props.deleteTask.bind(this, this.props.task)}>Delete</button>
      </td>
    );
  }

  renderTaskSection(){
    const { task, isCompleted } = this.props;

    const taskStyle = {
      textDecoration: isCompleted ? 'line-through' : 'none',
      cursor: 'pointer'
    };

    const taskClassName = isCompleted ? 'text-success' : 'text-danger';

    if(this.state.isEditing){
      return (
        <td>
          <form onSubmit={this.onSaveClick.bind(this)} className='form-inline'>
            <div className='form-group'>
              <input type='text' className='form-control' defaultValue={task} ref="editInput" />
            </div>
          </form>
        </td>
      )
    }

    return(
      <td className={taskClassName}
        style={taskStyle}
        onClick={this.props.toggleTask.bind(this, task)}
      >
        {task}
      </td>
    );
  }

  render() {
    return (
      <tr>
          {this.renderTaskSection()}
          {this.renderActionSection()}
        </tr>
    )
  }
}
