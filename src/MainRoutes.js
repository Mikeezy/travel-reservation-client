import React from "react"
import { Router, Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "./components/dashboard/layouts/Admin";
import AuthLayout from "./components/dashboard/layouts/Auth";
import history from "./utils/history"

const Routes = () => (
    
    <Router history={history} >
        <Switch>
            <Route path="/admin" render={props => <AdminLayout {...props} />} />
            <Route path="/auth" render={props => <AuthLayout {...props} />} />
            <Redirect from="/" to="/auth/signin" />
        </Switch>
    </Router>

)

export default Routes