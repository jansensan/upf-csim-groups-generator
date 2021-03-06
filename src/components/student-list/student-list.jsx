import React, { Component } from 'react';

// components
import TableRow from '../table-row/table-row.jsx';


require('./student-list.scss');


export default class StudentList extends Component {
  constructor(props) {
    super(props);

    // bind to proper "this"
    this.onDownloadButtonClicked = this.onDownloadButtonClicked.bind(this);
  }

  // react methods definitions
  render() {
    return (
      <div className="student-list">
        <table
          className="students-table"
          cellSpacing="0" cellPadding="0"
        >
          <tbody>
            <tr>
              {
                (this.props.hasIncludeOption) &&
                <th className="include-in-shuffle">Include</th>
              }
              <th className="profile-pic"></th>
              <th className="first-name">First Name</th>
              <th className="last-name">Last Name</th>
              <th className="country-flag">Flag</th>
            </tr>
            {
              this.props.students.map(
                (student, i) =>
                  <TableRow
                    key={i}
                    studentModel={student}
                    profilePic={student.profilePic}
                    firstName={student.firstName}
                    lastName={student.lastName}
                    country={student.country}
                    hasIncludeOption={this.props.hasIncludeOption}
                  ></TableRow>
              )
            }
          </tbody>
        </table>
        <button
          id="downloadListButton"
          className="btn-primary download-list-btn"
          onClick={this.onDownloadButtonClicked}
        >Download list</button>
      </div>
    );
  }


  // methods definitions
  convertToCSV(json) {
    let csv = 'First Name,Last Name,Email,Phone,Country\n';
    json.forEach(student => {
      csv += student.firstName + ',' +
        student.lastName + ',' +
        student.email + ',' +
        student.phone + ',' +
        student.country + '\n';
    });
    return csv;
  }


  // event handlers
  onDownloadButtonClicked(event) {
    let csv = this.convertToCSV(this.props.students);
    let response = prompt('Please enter the password');
    if (response === 'CSIM2019') {
      window.open("data:text/csv;charset=utf-8," + escape(csv));
    } else {
      alert('Password incorrect. Please contact an admin for assistance.');
    }
  }
}
