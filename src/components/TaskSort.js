import React, { Component } from 'react';

class TaskSort extends Component {

  UNSAFE_componentWillReceiveProps(nextProps) {}

  onClick = (sortBy, sortValue) => {
    this.props.onSort(sortBy, sortValue);
    
  }

  render() {
    var { sortBy, sortValue } = this.props;

    return (
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <div className="dropdown">
          <button
            type="button"
            className="btn btn-primary dropdown-toggle"
            id="dropdownMenu1"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="true"
          >
            Sắp Xếp <span className="fas fa-caret-square-down ml-5"></span>
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
            <li onClick={ () => this.onClick('name', 1) }>
              <a
                role="button"
                className={ (sortBy === 'name' && sortValue === 1) ? 'sort_selected' : '' }
              >
                <span className="fas fa-sort-alpha-down pr-5">&nbsp;&nbsp;Tên A-Z</span>
              </a>
            </li>
            <li onClick={ () => this.onClick('name', -1) }>
              <a
                role="button"
                className={ (sortBy === 'name' && sortValue === -1) ? 'sort_selected' : '' }
              >
                <span className="fas fa-sort-alpha-down-alt pr-5">&nbsp;&nbsp;Tên Z-A</span>
              </a>
            </li>
            <li role="separator" className="divider"></li>
            <li onClick={ () => this.onClick('status', 1) }>
              <a
                role="button"
                className={ (sortBy === 'status' && sortValue === 1) ? 'sort_selected' : '' }
              >
                Trạng thái kích hoạt
              </a>
            </li>
            <li onClick={ () => this.onClick('status', -1) }>
              <a
                role="button"
                className={ (sortBy === 'status' && sortValue === -1) ? 'sort_selected' : '' }
              >
                Trạng thái ẩn
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default TaskSort;
