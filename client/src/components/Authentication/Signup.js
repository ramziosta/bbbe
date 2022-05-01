import { Box, Button, TextField } from "@material-ui/core";
import { useState } from "react";
import { CryptoState } from "../../CryptoContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";


const Signup = ({ handleClose }) => {
  //const [user, setUser] = useState("");
  //const [accountType, setAccountType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // const { setAlert } = CryptoState();

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      // setAlert({
      //   open: true,
      //   message: "Passwords do not match",
      //   type: "error",
      // });
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
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
<></>

  );
};

export default Signup;