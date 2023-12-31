import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Button,
  FormControlLabel,
  Checkbox,
  Typography,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { login } from "./AuthApi";
import RegistrationTerms from "./RegistrationTerms";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { useLocation } from "react-router-dom";

const initialFormValues = {
  email: "",
  password: "",
};

export default function Login() {
  const [formData, setFormData] = useState(initialFormValues);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [registrationTerms, setRegistrationTerms] = useState(false);
  const { state } = useLocation();
  const { prevPath } = state || {};
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const data = await login({
        email: formData.email,
        password: formData.password,
      });
      if (data.token && data.user) {
        setIsLoading(false);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        if (prevPath) {
          window.location.href = prevPath;
        } else {
          window.location.href = "/products";
        }
      } else {
        setIsLoading(false);
        setError("User not found or invalid password");
      }
    } catch (error) {
      setIsLoading(false);
      setError("Something went wrong, please try again");
    }
  };

  return (
    <Grid container justifyContent="center" mt={4}>
      <Grid item xs={12} md={8}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <OutlinedInput
                fullWidth
                onChange={handleChange}
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                startAdornment={
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                }
                sx={{
                  backgroundColor: "#F0F0F0  ",
                  "& fieldset": { border: "none" },
                }}
                inputProps={{
                  autoComplete: "new-email-field",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <OutlinedInput
                fullWidth
                type="password"
                onChange={handleChange}
                name="password"
                value={formData.password}
                placeholder="Password"
                startAdornment={
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                }
                sx={{
                  backgroundColor: "#F0F0F0",
                  "& fieldset": { border: "none" },
                }}
                inputProps={{
                  autoComplete: "new-password", // Prevent auto-fill
                }}
              />
            </Grid>
            <Grid item xs={12} display="flex" alignItems="center">
              <FormControlLabel control={<Checkbox />} label=" remember me" />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <Button
                type="submit"
                disableElevation
                variant="contained"
                sx={{
                  paddingLeft: "60px",
                  paddingRight: "60px",
                  color: "white",
                  borderRadius: "38px",
                  fontSize: { xs: "12px", md: "12px", lg: "14px" },
                }}
              >
                Login
              </Button>
            </Grid>

            <Grid container justifyContent="center" mt={2}>
              <Typography>{error}</Typography>
            </Grid>
            {isLoading && (
              <Grid container justifyContent="center">
                {" "}
                <CircularProgress color="primary" />
              </Grid>
            )}
          </Grid>
        </form>
      </Grid>
      {registrationTerms && (
        <Grid xs={12} md={6}>
          <RegistrationTerms setOnClose={() => setRegistrationTerms(false)} />
        </Grid>
      )}
    </Grid>
  );
}
