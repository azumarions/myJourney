import React, { useState } from "react"
import { useRouter } from "next/router"
import Cookie from "universal-cookie"
import { createProf, getProf, getMyProf } from "../../api/profile";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const cookie = new Cookie();

const Auth = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const login = async () => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}/authen/jwt/create/`,
        {
          method: 'POST',
          body: JSON.stringify({ email: email, password: password }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        if (res.status === 400) {
          throw 'authlization failed';
        } else if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        const options = { path: '/' };
        cookie.set('access_token', data.access, options);
        // getProf();
      });
      router.push('/posts');
    } catch (err) {
      alert(err);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) {
      login();
    } else {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/register/`, {
          method: 'POST',
          body: JSON.stringify({ email: email, password: password }),
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((res) => {
          if (res.status === 400) {
            throw '?????????????????????????????????????????????????????????????????????????????????????????????';
          }
        });
        await login();
        await createProf();
      } catch (err) {
        alert(err);
      }
    }
  }

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {isLogin ? <Avatar sx={{ m: 1, width: 150, height: 150 }} src="/auth_icon1.jpeg" alt="icon">
          </Avatar> : <Avatar sx={{ m: 1, width: 150, height: 150 }} src="/auth_icon3.jpeg" alt="icon">
          </Avatar> }
          
          <Typography component="h1" variant="h5">
            {isLogin? 'Log in' : 'Sign up'}
          </Typography>
          <Box component="form" onSubmit={onSubmit} method="POST" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="?????????????????????"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="???????????????"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
            <Grid container justifyItems="center" alignItems="center">
              <Grid item sx={{ mt: 1, mb: 0 }} xs={4} onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? '??????????????? ->' : '??????????????? ->'}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              color="secondary"
              sx={{ mt: 3, mb: 2 }}
            >
              {isLogin ? '????????????' : '????????????'}
            </Button>  
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default Auth