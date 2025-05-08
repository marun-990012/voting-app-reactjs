import { useState, useContext } from "react";
import users from "../user-data.json";
import { AuthContex } from "./Auth";

function Login() {
  const [username, setUserName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { handleLogin } = useContext(AuthContex);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      username,
    };
    // console.log(formData);
    const user = users.find((user) => {
      return user.username == formData.username;
    });

    if (user) {
      handleLogin(user);
      setErrorMessage("");
    } else {
      setErrorMessage("invalid credential");
    }
  };
  return (
    <div className="login-form-container">
      <div className="login-form">
        <h2>Login</h2>
        {errorMessage && <p>{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />

          {/* <input type="submit" value="Login" className="login-button" /> */}
          <button className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
}
export default Login;
