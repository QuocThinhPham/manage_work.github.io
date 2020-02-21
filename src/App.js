import React from 'react'; 
import './App.css';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';
import TaskList from './components/TaskList';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tasks : [], // id : unique, name, status
      isDisplayForm : false,
      taskEditting : null,
      filter : {
        name : '',
        status : -1,
      },
      keyword : '',
      sortBy : 'name',
      sortValue : 1,
    }
  }

  UNSAFE_componentWillMount() {
    if(localStorage && localStorage.getItem('tasks')) {
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks : tasks,
      });
    }
  }

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  generateID() {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4() + '-' + this.s4();
  }

  onToggleForm = () => {
    if(this.state.isDisplayForm && this.state.taskEditting !== null) {
      this.setState({
        isDisplayForm : true,
        taskEditting : null,
      });
    } else {
      this.setState({
        isDisplayForm : !this.state.isDisplayForm,
        taskEditting : null,
      });
    }
  }

  onCloseForm = () => {
    this.setState({
      isDisplayForm : false,
    });
  }

  onShowForm = () => {
    this.setState({
      isDisplayForm : true,
    });
  }

  onSubmit = (data) => {
    var { tasks } = this.state;
    if(data.id === '') {
      data.id = this.generateID();
      tasks.push(data);
    } else {
      var index = this.findIndex(data.id);
      tasks[index] = data;
    }
    this.setState({
      tasks : tasks,
      taskEditting : null,
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  onUpdateStatus = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if(index !== -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks : tasks,
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }

  findIndex = (id) => {
    var { tasks } = this.state;
    var result = -1;
    tasks.forEach((task, index) => {
      if(task.id === id) result = index;
    })
    return result;
  }

  onDelete = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if(index !== -1) {
      tasks.splice(index, 1);
      this.setState({
        tasks : tasks,
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    this.onCloseForm();
  }

  onUpdate = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    this.setState({
      taskEditting : tasks[index],
    });
    this.onShowForm();
  }

  onFilter = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus, 10);
    this.setState({
      filter : {
        name : filterName.toLowerCase(),
        status : filterStatus,
      }
    });
  }

  onSearch = (keyword) => {
    this.setState({
      keyword : keyword.toLowerCase(),
    });
  }

  onSort = (sortBy, sortValue) => {
    this.setState({
      sortBy : sortBy,
      sortValue : sortValue,
    });
  }

  render() {

    var {
      tasks,
      isDisplayForm,
      taskEditting,
      filter,
      keyword,
      sortBy,
      sortValue
    } = this.state;

    if(filter) {
      if(filter.name) {
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        })
      }
      tasks = tasks.filter((task) => {
        if(filter.status === -1) return task;
        else return task.status === (filter.status === 1 ? true : false);
      })
    }
    if(keyword) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyword) !== -1;
      })
    }

    if(sortBy === 'name') {
      tasks.sort((a, b) => {
        if(a.name > b.name) return sortValue;
        else if(a.name < b.name) return -sortValue;
        else return 0;
      })
    }
    if(sortBy === 'status') {
      tasks.sort((a, b) => {
        if(a.status > b.status) return -sortValue;
        else if(a.status < b.status) return sortValue;
        else return 0;
      })
    }

    var elmTaskForm = isDisplayForm 
                        ? <TaskForm
                            onSubmit={ this.onSubmit }
                            onCloseForm={ this.onCloseForm }
                            task={ taskEditting }
                          /> 
                        : '';

    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1> <hr />
        </div>
        <div className="row">
          <div className={ isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : '' }>
            { /* Task Form */ }
            { elmTaskForm }
          </div>
          <div className={ isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12' }>
            <button
              type="button"
              className="btn btn-primary"
              onClick={ this.onToggleForm }
            >
               <span className="fas fa-plus mr-5"></span> Thêm công việc
            </button>
            { /* Search - Sort */ }
            <TaskControl
              onSearch={ this.onSearch }
              onSort={ this.onSort }
              sortBy={ sortBy }
              sortValue={ sortValue }
            />
            { /* List */ }
            <TaskList
              tasks={ tasks }
              onUpdateStatus={ this.onUpdateStatus }
              onDelete={ this.onDelete }
              onUpdate={ this.onUpdate }
              onFilter={ this.onFilter }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
