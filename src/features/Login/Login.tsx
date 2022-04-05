import React from "react";
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from "@mui/material";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {getAuth} from "../../state/login-reducer";
import {AppRootState} from "../../state/redux-store";
import {Navigate} from "react-router-dom";
import {ROUTES} from "../../common/constants";

type FormValues = {
    email: string,
    password: string,
    rememberMe: boolean
}

const errorStyles = {
  padding: "8px",
  color: "white",
  borderRadius: "5px",
  backgroundColor: "red"
}

export const Login = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector<AppRootState>(state => state.auth.isLoginIn)

  const formik = useFormik({
    validate: (values) => {
      if (!values.email) {
        return {
          email: "Email is required",
        }
      }
      if (!values.password) {
        return {
          password: "Password is required"
        }
      }
    },
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    onSubmit: values => {
      dispatch(getAuth(values))
    }
  });

  if (isLoggedIn) return <Navigate to={ROUTES.HOME}/>

  return (
    <Grid item style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      margin: "100px auto",
      minWidth: "320px",
      maxWidth: "400px"
    }}>
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          <FormLabel>
            <p>To log in get registered <a href="https://social-network.samuraijs.com/">here</a> or use common test
              account
              credentials:</p>
            <p style={{
              display: "flex",
              flexDirection: "column"
            }}>
              <span>Email: free@samuraijs.com</span>
              <span>Password: free</span>
            </p>
          </FormLabel>
          <FormGroup>
            <TextField
              label="Email"
              margin="normal"
              {...formik.getFieldProps("email")}
            />
            {formik.errors.email ? <span style={errorStyles}>{formik.errors.email}</span> : null}
            <TextField
              type={"password"}
              label="Password"
              margin="normal"
              {...formik.getFieldProps("password")}
            />
            {formik.errors.password ? <span style={errorStyles}>{formik.errors.password}</span> : null}
            <FormControlLabel
              control={<Checkbox name="rememberMe"/>}
              label={"Remember me"}
              {...formik.getFieldProps("rememberMe")}
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
      </form>
    </Grid>
  )
}
