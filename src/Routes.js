import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Home from "./home/Home";
import UserList from "./user-list/UserList";

export default function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/user-list">
                    <UserList />
                </Route>

            </Switch>
        </Router>
    );
}