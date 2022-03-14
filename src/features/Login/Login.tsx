import React from "react";
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from "@mui/material";
import {useFormik} from "formik";

export const Login = () => {
  const formik = useFormik({
    validate: (values) => {
      return {email: "bad email"};
    },
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    onSubmit: values => {
      alert(JSON.stringify(values))
    }
  })
  return (
    // <Grid container justify="center">
      <Grid item style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: "100px auto",
        minWidth: "320px",
        maxWidth: "400px"
      }}>
        <FormLabel>
          <p>To log in get registered <a href="https://social-network.samuraijs.com/">here</a>  or use common test account credentials:</p>
           <p style={{display: "flex", flexDirection: "column"}}>
             <span>Email: free@samuraijs.com</span>
             <span>Password: free</span>
           </p>
        </FormLabel>
        <FormControl>
          <FormGroup>
            <TextField
              label="Email"
              margin="normal"
            />
            <TextField
              label="Password"
              margin="normal"
            />
            <FormControlLabel
              control={<Checkbox name="rememberMe"/>}
              label={"Remember me"}
            />
            <Button
              type={"submit"}
              variant={"contained"}
              color={"primary"}
            >
              Login
            </Button>
          </FormGroup>
        </FormControl>
      </Grid>
    // </Grid>
  )
}
