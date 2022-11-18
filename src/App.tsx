import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import StorageIcon from "@mui/icons-material/Storage";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { Grid } from "@mui/material";

const JSONParse = (obj: string | unknown) => {
  try {
    if (typeof obj === "string") {
      return JSON.parse(obj);
    }
  } catch (error) {
    console.log("Wrong data format.");
  }
  return {};
};
const theme = createTheme();

export default function CORSApp() {
  const [result, setResult] = React.useState<any>("Results...");
  const [isError, setError] = React.useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    const data = JSONParse(formdata.get("data"));
    const url = formdata.get("url") as string;
    axios
      .post(url, data)
      .then((response) => {
        setError(false);
        setResult(JSON.stringify(response.data, null, 4));
      })
      .catch((error) => {
        setError(true);
        setResult(JSON.stringify(error, null, 4));
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="md"
        sx={{
          marginTop: 10,
          display: "flex",
          height: "80vh",
        }}
      >
        <CssBaseline />
        <Grid container spacing={2} alignItems="stretch">
          <Grid item xs={5}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                <StorageIcon />
              </Avatar>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="url"
                  label="Lambda Url"
                  name="url"
                  autoComplete="url"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  multiline
                  rows={5}
                  name="data"
                  label="Data"
                  type="data"
                  id="data"
                  defaultValue="{}"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={7}>
            <Box
              sx={{
                padding: 2,
                bgcolor: () => "grey.100",
                color: () => (isError ? "error.dark" : "grey.800"),
                border: "1px solid",
                borderColor: () => (isError ? "error.main" : "info.light"),
                height: "100%",
                wordWrap: "break-word"
              }}
            >
              <code>{result}</code>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
