import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import AuthService from "../services/auth.service";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

export default class CreateStudent extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };

    // Setting up functions
    this.onChangeStudentName = this.onChangeStudentName.bind(this);
    this.onChangeStudentEmail = this.onChangeStudentEmail.bind(this);
    this.onChangeStudentRollno = this.onChangeStudentRollno.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      name: '',
      email: '',
      rollno: ''
    }
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  onChangeStudentName(e) {
    this.setState({ name: e.target.value })
  }

  onChangeStudentEmail(e) {
    this.setState({ email: e.target.value })
  }

  onChangeStudentRollno(e) {
    this.setState({ rollno: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()

    const studentObject = {
      name: this.state.name,
      email: this.state.email,
      rollno: this.state.rollno
    };

    axios.post('http://localhost:8080/students/create-student', studentObject)
    .then(res => console.log(res.data));

    this.setState({
      name: '',
      email: '',
      rollno: ''
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
    
      <div className="container">
        {(this.state.userReady) ?
        <div>
          <h2>Add Student</h2>
          <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="Name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={this.state.name} onChange={this.onChangeStudentName} />
          </Form.Group>
  
          <Form.Group controlId="Email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={this.state.email} onChange={this.onChangeStudentEmail} />
          </Form.Group>
  
          <Form.Group controlId="Name">
            <Form.Label>Roll No</Form.Label>
            <Form.Control type="text" value={this.state.rollno} onChange={this.onChangeStudentRollno} />
          </Form.Group>
  
          <Button variant="danger" size="lg" block="block" type="submit">
            Add Student
          </Button>
        </Form>
        </div>: null}
      </div>
      
    );
  }
}
