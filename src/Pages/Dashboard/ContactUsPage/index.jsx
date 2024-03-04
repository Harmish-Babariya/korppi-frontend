import React from "react";
import {
  Typography,
  Container,
  Grid,
  Paper,
  TextField,
  Button,
} from "@mui/material";

const ContactUsPage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your logic for form submission here
  };
  return (
    <Container className="mt-4">
      <Typography variant="h4" align="center" gutterBottom>
        Let's Build Something Great Together
      </Typography>

      <Typography variant="body1" paragraph>
        Have questions, suggestions, or just want to get in touch? Drop us a
        message below.
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          variant="outlined"
          required
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          variant="outlined"
          type="email"
          required
        />
        <TextField
          label="Message"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          variant="outlined"
          required
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
        >
          Send Message
        </Button>
      </form>
      <Grid container justifyContent="center" spacing={5}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: "20px", textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>
              Contact Information
            </Typography>
            <p>Email: example@example.com</p>
            <p>Phone: (123) 456-7890</p>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactUsPage;
