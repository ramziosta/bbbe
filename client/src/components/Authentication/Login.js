import { Box, Button, TextField } from "@material-ui/core";
import { useState } from "react";
import { CryptoState } from "../../CryptoContext";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Login from '../../frontend/login'
const Loginform = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const { setAlert } = CryptoState();

  const handleSubmit = async () => {
    if (!email || !password) {
      // setAlert({
      //   open: true,
      //   message: "Please fill all the Fields",
      //   type: "error",
      // });
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      // setAlert({
      //   open: true,
      //   message: `Sign Up Successful. Welcome ${result.user.email}`,
      //   type: "success",
      // });

      handleClose();
    } catch (error) {
      // setAlert({
      //   open: true,
      //   message: error.message,
      //   type: "error",
      // });
      return;
    }
  };

  return (
    <Login />
  );
};

export default Loginform;