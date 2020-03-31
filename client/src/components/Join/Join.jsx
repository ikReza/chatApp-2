import axios from "axios";
import React, { useState } from "react";
import {
  Typography,
  Grid,
  TextField,
  Button,
  Link,
  Paper
} from "@material-ui/core";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const onSubmit = e => {
    e.preventDefault();

    const user = { name };
    console.log(user);

    axios
      .post("http://localhost:4000/users/add", user)
      .then(res => console.log(res.data))
      .catch(err => console.log({ err }));

    setName("");

    window.location = `/chat?name=${name}&room=${room}`;
  };

  return (
    <Paper
      style={{
        margin: "10% 25%",
        width: "50%",
        backgroundColor: "#33322f"
      }}
    >
      <form onSubmit={onSubmit}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="space-between"
          spacing={3}
        >
          <Grid item xs={false} sm={2} />
          <Grid item xs={12} sm={8}>
            <Typography variant="h4" gutterBottom style={{ color: "white" }}>
              Join
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              style={{ backgroundColor: "white" }}
              label="Username"
              variant="filled"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              style={{ backgroundColor: "white" }}
              label="Room"
              variant="filled"
              onChange={e => setRoom(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Link
              href={`/chat?name=${name}&room=${room}`}
              onClick={e => (!name || !room ? e.preventDefault() : null)}
            >
              <Button variant="contained" color="primary" type="submit">
                Sign In
              </Button>
            </Link>
          </Grid>
          <Grid item xs={false} sm={2} />
        </Grid>
      </form>
    </Paper>
  );
};

export default Join;
