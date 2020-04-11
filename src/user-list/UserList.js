import React, { Component } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { MDBDataTable } from 'mdbreact';
import DatePicker from "react-datepicker";
import dateFormat from "dateformat";
import "react-datepicker/dist/react-datepicker.css";
import './userlist.scss';
import { Modal } from "react-bootstrap";
import { HttpInterceptor } from "../HttpInterceptor";






export default class users extends Component {

    constructor() {
        super();
        this.state = {
            users: [],
            show: false,
            userprofile: {},
            startDate: new Date(),
            activeDate: [],
            dateCount: 0
        }
    }

    componentDidMount() {
        HttpInterceptor.get('user-lists').then(res => {
            this.setState({ users: res.data.members })
        })

    }

    handleShow = (item, e) => {
        let date = new Date();
        let dateList = [];
        let calendarDate = dateFormat(date, "mmm d yyyy");
        let activityDate = item.activity_periods;
        for (var i = 0; i < activityDate.length; i++) {
            let checkDate = activityDate[i].start_time.substring(0, activityDate[i].start_time.length - 8).trim();
            if (calendarDate === checkDate) {
                dateList.push(activityDate[i])
            }
        }

        this.setState({
            show: true,
            userprofile: item,
            startDate: date,
            activeDate: dateList,
            dateCount: dateList.length
        });
    }

    handleClose = () => {
        this.setState({ show: false })
    }

    handleChange = date => {
        let dateList = [];
        let calendarDate = dateFormat(date, "mmm d yyyy");
        let activityDate = this.state.userprofile.activity_periods;
        for (var i = 0; i < activityDate.length; i++) {
            let checkDate = activityDate[i].start_time.substring(0, activityDate[i].start_time.length - 8).trim();
            if (calendarDate === checkDate) {
                dateList.push(activityDate[i])
            }
        }
        this.setState({
            startDate: date,
            activeDate: dateList,
            dateCount: dateList.length
        });
    };



    render() {



        const data = {
            columns: [
                {
                    label: 'Sl No',
                    field: 'slno',
                    sort: 'disabled',
                    width: 150
                },
                {
                    label: 'User Name',
                    field: 'real_name',
                    width: 270
                },
                {
                    label: 'Time Zone',
                    field: 'tz',
                    width: 200
                },
                {
                    label: 'Action',
                    field: 'actions',
                    sort: 'disabled',
                    width: 100
                },

            ],
            rows: []
        };

        data.rows = this.state.users;
        for (let i = 0; i < this.state.users.length; i++) {
            let action = <div className="action-icn">
                <i className="fas fa-eye" alt="Edit" onClick={this.handleShow.bind(this, data.rows[i])}></i>
            </div>;
            let slno = <span>{i + 1}</span>

            data.rows[i]['actions'] = action;
            data.rows[i]['slno'] = slno;

        }

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-primary bg-primary">
                    <a className="navbar-brand" href="#">User management</a>
                </nav>

                <div className="container home-section">
                    {
                        (this.state.users.length > 0) ?
                            <MDBDataTable
                                striped
                                bordered
                                hover
                                data={data}
                            />
                            :
                            <div class="spinner-border text-primary alg-center" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                    }



                    <Modal show={this.state.show} onHide={this.handleClose} size="lg" className="modal-userlist">
                        <Modal.Header closeButton>
                            <Modal.Title>{this.state.userprofile.real_name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="form-group">
                                        <label>Pick Date</label>
                                        <DatePicker className="form-control"
                                            selected={this.state.startDate}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Name</label>
                                        <span>{this.state.userprofile.real_name}</span>
                                    </div>
                                    <div className="form-group">
                                        <label>Time Zone</label>
                                        <span>{this.state.userprofile.tz}</span>
                                    </div>
                                    <div className="form-group">
                                        <label>Total Activity Period Counts</label>
                                        <span>{this.state.dateCount}</span>
                                    </div>
                                    <div className="form-group">
                                        <label>Activity Periods List</label>
                                        <ul>
                                            {
                                                this.state.activeDate.map((activeDate, i) =>
                                                    <li>
                                                        {activeDate.start_time} - {activeDate.end_time}
                                                    </li>
                                                )

                                            }
                                            {
                                                (this.state.dateCount === 0) ?
                                                    <li>No Activity Date</li> : ''
                                            }

                                        </ul>
                                    </div>

                                </div>
                            </div>


                        </Modal.Body>
                        <Modal.Footer>
                            <button className="btn btn-primary" onClick={this.handleClose}>
                                Close
          </button>

                        </Modal.Footer>
                    </Modal>

                </div>
            </div>
        )
    }
}
