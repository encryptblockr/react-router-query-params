import "./styles.css";
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  useLocation
} from "react-router-dom";

/**
 * https://stackoverflow.com/questions/68042569/how-do-i-setup-verify-account-with-react
 */

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Home = () => <div>HOME</div>;
const SigninPage = () => <div>Sign in</div>;
const ResetPasswordPage = () => {
  const queryParams = useQuery();

  return <div>Query: {queryParams.get("reset-password-token")}</div>;
};
const VerifyAccountPage = () => {
  const queryParams = useQuery();

  const email = queryParams.get("email");
  const token = queryParams.get("token");

  return (
    <div>
      <div>Email: {email}</div>
      <div>Token: {token}</div>
    </div>
  );
};

export default function App() {
  const logout = () => console.log("log out");

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Edit to see some magic happen!</h2>

      <Router>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/signout">Sign Out</Link>
          </li>
          <li>
            <Link to="/reset-password?reset-password-token=1234567890">
              Reset Password
            </Link>
          </li>
          <li>
            <Link to="/verify-account?token=1234567890&email=123@abc.com">
              Verify Account
            </Link>
          </li>
        </ul>
        <Switch>
          <Route
            path="/signout"
            render={({ history }) => {
              logout();
              history.push("/");
              return null;
            }}
          />
          <Route path="/signin" component={SigninPage} />
          <Route path="/reset-password" component={ResetPasswordPage} />
          <Route path="/verify-account" component={VerifyAccountPage} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}
