import React, { Component } from 'react'
import { Link } from "react-router-dom";
import './home.scss';
export default class Home extends Component {
    render() {
        return (
            <div>

                <div class="container">
                    <div class="row justify-content-center align-items-center intro-section">
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <div class="card">
                                <div class="card-body">
                                    <h3>Welcome to User management</h3>
                                    <Link to="/user-list">
                                        <button className="btn btn-primary">User List Screen</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
