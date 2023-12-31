import React from "react";
import { Grid, Avatar, Typography, Box } from "@mui/material";
import { aboutData } from "./AboutData";
import photo from "../assets/photo.png";

export default function About() {
  return (
    <Grid container justifyContent="center" display="flex">
      <Grid item xs={12} justifyContent="center" display="flex">
        <Typography variant="h4">About Us</Typography>
      </Grid>
      <Grid item xs={12} display="flex" justifyContent="center">
        <Typography color="primary">Get to Know Montana</Typography>
      </Grid>
      <Grid
        item
        xs={12}
        display="flex"
        mt={2}
        justifyContent="center"
        alignItems="center"
      >
        <Avatar
          src={photo}
          sx={{
            borderRadius: "100%",
            width: { xs: " 12%", md: " 6%" },
            height: "auto",
            objectFit: "cover",
          }}
        ></Avatar>
        <Typography
          ml={1}
          sx={{ fontSize: { xs: "12px", md: "14px", xl: "16px" } }}
        >
          Boubaker Achkhbar
        </Typography>
      </Grid>
      <Grid item xs={12} lg={11} xl={8} columnGap={2} mt={2} p={2}>
        <Grid
          container
          spacing={2}
          sx={{ display: { xs: "block", md: "flex" } }}
        >
          {aboutData.map((service, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Grid
                container
                justifyContent="center"
                sx={{
                  width: "100%",
                  height: "400px",
                  p: 2,
                  backgroundColor: "white",
                  color: "black",
                  textAlign: "center",
                  borderRadius: "32px",
                  boxShadow: "2px 2px 24px #DBDBDB",
                }}
              >
                <Box>
                  <Avatar
                    sx={{ width: "80px", height: "auto", margin: "0 auto" }}
                    src={service.image}
                  ></Avatar>
                  <Typography variant="h6">{service.title}</Typography>
                  <Typography
                    sx={{
                      mt: 2,
                      fontSize: { xs: "12px", md: "14px", xl: "16px" },
                    }}
                    variant="body1"
                  >
                    {service.description}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
