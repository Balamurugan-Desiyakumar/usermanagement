import React, { Component } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { MDBDataTable } from 'mdbreact';
import { Container, Modal, Button } from "react-bootstrap";
import { HttpInterceptor } from "../HttpInterceptor";






export default class users extends Component {

    constructor() {
        super();
        this.state = {
            users: [],
            show: false
        }
    }

    componentDidMount() {
        HttpInterceptor.get('user-lists').then(res => {
            this.setState({ users: res.data.members })
            debugger;
            console.log(this.state.users)
        })

    }

    handleShow = (item, e) => {
        this.setState({ show: true })
    }

    handleClose = () => {
        this.setState({ show: false })
    }

    render() {

        const data = {
            columns: [
                {
                    label: 'Sl No',
                    field: 'id',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'User Name',
                    field: 'real_name',
                    sort: 'asc',
                    width: 270
                },
                {
                    label: 'Time Zone',
                    field: 'tz',
                    sort: 'asc',
                    width: 200
                },
                {
                    label: 'Action',
                    field: 'actions',
                    sort: 'asc',
                    width: 100
                },

            ],
            rows: []
        };

        data.rows = this.state.users;
        for (let i = 0; i < this.state.users.length; i++) {
            let action = <div className="icoBtn">
                <i class="fas fa-edit" alt="Edit" onClick={this.handleShow.bind(this, data.rows[i])}></i>


            </div>;

            data.rows[i]['actions'] = action;

        }

        return (
            <Container>
                <h1>User List</h1>
                {/* {
                    (this.state.users.length > 0) ?
                        <BootstrapTable keyField='id' data={this.state.users} columns={columns} />
                        :
                        'No Data Found'
                } */}

                <MDBDataTable
                    striped
                    bordered
                    hover
                    data={data}
                />

                <Modal show={this.state.show} onHide={this.handleClose} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
          </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Save Changes
          </Button>
                    </Modal.Footer>
                </Modal>

            </Container>
        )
    }
}
