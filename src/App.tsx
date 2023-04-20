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
import { useRef } from "react";
import { post } from "./utils";

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
  const form = useRef();

  const handleSubmit = (
    event: React.MouseEvent<HTMLElement>,
    action: string = "axios"
  ) => {
    event.preventDefault();

    const formdata = new FormData(form.current);
    const data = JSONParse(formdata.get("data"));
    const headers = JSONParse(formdata.get("headers"));
    const url = formdata.get("url") as string;

    switch (action) {
      case "fetch":
        post(url, headers, data)
          .then((response) => {
            setError(false);
            console.log(response);
            setResult(JSON.stringify(response, null, 4));
          })
          .catch((error) => {
            setError(true);
            setResult(JSON.stringify(error, null, 4));
          });
    }

    axios
      .post(url, headers, data)
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
              <Box component="form" noValidate sx={{ mt: 1 }} ref={form}>
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
                  fullWidth
                  id="headers"
                  label="Request Headers"
                  name="headers"
                  multiline
                  rows={5}
                  type="data"
                  defaultValue="{}"
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
                  fullWidth
                  variant="contained"
                  name="action"
                  value="fetch"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={(e) => handleSubmit(e, "fetch")}
                >
                  Submit (fetch API)
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  name="action"
                  value="axios"
                  onClick={(e) => handleSubmit(e, "axios")}
                >
                  Submit (Axios)
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
                wordWrap: "break-word",
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
