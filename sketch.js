import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import "./App.css";
import { auth } from "./firebase-config";

function App() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="App">
      <div>
        <h3> Register User </h3>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
        />
        <input
          placeholder="Password..."
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
        />

        <button onClick={register}> Create User</button>
      </div>

      <div>
        <h3> Login </h3>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        <input
          placeholder="Password..."
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />

        <button onClick={login}> Login</button>
      </div>

      <h4> User Logged In: </h4>
      {user?.email}

      <button onClick={logout}> Sign Out </button>
    </div>
  );
}
export default App;


( <>
      <div className="loggedin">
        <SiteSideBar />
        <Card
          className="dashboard-card"
          style={{ maxWidth: "60%", marginTop: "4rem", marginLeft: "10rem" }}
          bgcolor="dark"
            // status={status}
          body={
            <>
              <div className="">
                <LoginUser user={user} />
                <br />
                <Row className="text-center">
                  <Col>
                    <Link
                      to="/deposit"
                      className="btn btn-primary text-white Link"
                    >
                      Make a deposit
                    </Link>
                  </Col>
                  <Col>
                    <Link
                      to="/withdraw"
                      className="btn btn-primary text-white Link"
                    >
                      Make a withdraw
                    </Link>
                  </Col>

                  <div
                    style={{
                      backgroundColor: "lightgrey",
                      marginTop: "2rem",
                      padding: "2rem",
                    }}
                  >
                    <table className="table table-striped w-auto">
                      <Header />
                      <Table2 />
                    </table>
                  </div>
                </Row>
              </div>
            </>
            }
          />
                      {/* !------------- */}
                      </div>
</>)


()    


  //ctx.log = true;

    //setStatus("LogedIn");
   // ctx.sessionActivity.push({
     // activity: "Login",
    //  stamp: timeStamp,
   // });