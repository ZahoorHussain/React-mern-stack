import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import AuthService from "../services/auth.service";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import StudentTableRow from './StudentTableRow';
export default class StudentList extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };
    this.state = {
      students: []
    };
  }
  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  DataTable() {
    
    return this.state.students.map((res, i) => {
      return <StudentTableRow obj={res} key={i} />;
    });
  }


  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (<div className="table-wrapper">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Roll No</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {this.DataTable()}
        </tbody>
      </Table>
    </div>);
  }
}