import React from "react";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "rsuite/dist/styles/rsuite-default.css";

import { Login, Main, PageLoading } from "./Template";
import Forbidden from "./features/Forbidden";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./router/ProtectedRoute";
import PublicRoute from "./router/PublicRoute";

const Home = React.lazy(() => import("./features/Beranda"));

const Setting = React.lazy(() => import("./features/Setting"));

const Users = React.lazy(() => import("./features/Users"));
const DataAnggota = React.lazy(() => import("./features/Users/DataAnggota"));
const DataAgen = React.lazy(() => import("./features/Users/DataAgen"));

const WaitingPayment = React.lazy(() =>
  import("./features/Transaksi/WaitingPayment")
);
const PaymentCompleted = React.lazy(() =>
  import("./features/Transaksi/PaymentCompleted")
);

const Completed = React.lazy(() => import("./features/Transaksi/Completed"));
const Rejected = React.lazy(() => import("./features/Transaksi/Rejected"));

const getBasename = (path) => path.substr(0, path.lastIndexOf("/"));

function App({ main }) {
  return (
    <div className="App">
      <Router basename={getBasename(window.location.pathname)}>
        <Switch>
          <PublicRoute exact path="/login">
            <Login />
          </PublicRoute>

          <PublicRoute exact path="/test">
            <PageLoading />
          </PublicRoute>

          <ProtectedRoute path="/">
            <Main>
              <React.Suspense fallback={<PageLoading />}>
                <Route exact path="/" component={Home} />
                <Route exact path="/cooljek" component={Home} />

                <Route
                  exact
                  path="/setting"
                  component={main.type === 1 ? Setting : Forbidden}
                />

                <Route
                  exact
                  path="/users"
                  component={
                    main.type === 1 || main.type === 2 ? Users : Forbidden
                  }
                />
                <Route
                  exact
                  path="/data-anggota"
                  component={
                    main.type === 1 || main.type === 2 ? DataAnggota : Forbidden
                  }
                />
                <Route
                  exact
                  path="/data_agen"
                  component={
                    main.type === 1 || main.type === 2 ? DataAgen : Forbidden
                  }
                />

                <Route
                  exact
                  path="/waiting_payment"
                  component={WaitingPayment}
                />
                <Route exact path="/payment" component={PaymentCompleted} />

                <Route exact path="/completed" component={Completed} />
                <Route exact path="/rejected" component={Rejected} />

                <Route exact path="/no_akses" component={Forbidden} />
              </React.Suspense>
            </Main>
          </ProtectedRoute>
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    main: state.main.currentUser,
  };
};

export default connect(mapStateToProps)(App);
