import React from 'react';

export default class CreateTodo extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      error: null
    };

  }

  renderError(){
    if(!this.state.error) { return null; }

    return(
      <div className='alert alert-danger error'>
        {this.state.error}
      </div>
    );
  }

  render() {
    return (
      <form onSubmit={this.handleCreate.bind(this)} className="form-inline" id="createForm">
        <div className='form-group'>
          <input type='text' className="form-control" placeholder='What do I need to do ?' ref="createInput" />
        </div>
        <button className="btn btn-primary">Create</button>
        {this.renderError()}
      </form>
    )
  }

  handleCreate(event){
    event.preventDefault();

    const createInput = this.refs.createInput;
    const task = createInput.value;
    const validateInput = this.validateInput(task);

    if(validateInput){
      this.setState({ error: validateInput });
      return;
    }

    this.setState({ error: null });
    this.props.createTask(task);
    this.refs.createInput.value = '';
  }

  validateInput(task){
    if(!task){
      return 'Please enter a task.';
    }else if(_.find(this.props.todos, todo => todo.task === task)){
      return 'Task already exists.';
    }else{
      return null;
    }
  }

}
