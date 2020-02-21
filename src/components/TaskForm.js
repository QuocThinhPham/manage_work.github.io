import React, { Component } from 'react';

class TaskForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id : '',
      name : '',
      status : false,
    }
  }

  UNSAFE_componentWillMount() {
    console.log(this.props.task);
    // this.setState({
    //   id : this.props.id,
    //   name : this.props.name,
    //   status : this.props.status,
    // });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if(nextProps && nextProps.task) {
      this.setState({
        id : nextProps.task.id,
        name : nextProps.task.name,
        status : nextProps.task.status,
      });
    } else if(!nextProps.task) {
      this.setState({
        id : '',
        name : '',
        status : false,
      });
    }
  }

  onCloseForm = () => {
    this.props.onCloseForm();
  }

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    if(name === 'status') value = target.value === 'true' ? true : false;
    this.setState({
      [name] : value,
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    // Cancel & Close Form
    this.onClear();
    this.onCloseForm();
  }

  onClear = () => {
    this.setState({
      name : '',
      status : false,
    });
    this.onCloseForm();
  }

  render() {

    var { id } = this.state;

    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title text-right">
            { id !== '' ? 'Cập Nhật Công Việc' : 'Thêm Công Việc' }
            <span
              className="fas fa-times-circle ml-5"
              onClick={ this.onCloseForm }
            ></span>
          </h3>
        </div>
        <div className="panel-body">
          <form onSubmit={ this.onSubmit }>
            <div className="form-group">
              <label>Tên</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={ this.state.name }
                onChange={ this.onChange }
              />
            </div>
            <div className="form-group">
              <label>Trạng thái</label>
              <select
                name="status"
                className="form-control"
                value={ this.state.status }
                onChange={ this.onChange }
              >
                <option value={ true }>Kích hoạt</option>
                <option value={ false }>Ẩn</option>
              </select>
            </div>
            <div className="form-group text-center">
              <button
                type="submit"
                className="btn btn-warning"
              >
                <span className="fas fa-plus mr-5"></span> Lưu Lại
              </button>&nbsp;
              <button
                type="button"
                className="btn btn-danger"
                onClick={ this.onClear }
              >
                <span className="fas fa-times mr-5"></span> Hủy Bỏ
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default TaskForm;
