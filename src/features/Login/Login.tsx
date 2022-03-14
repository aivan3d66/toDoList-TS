import React from "react";
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from "@mui/material";

export const Login = () => {
  return (
    <Grid container justify="center">
      <Grid item xs={4}>
        <FormLabel>

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
    </Grid>
  )
}
