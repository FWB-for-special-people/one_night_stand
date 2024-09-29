// @ts-nocheck
import {useState} from 'react';
import {Container, TextField, Button, Typography, Box} from '@mui/material';
import axios from "axios";
import {API, PrefixedAPI} from "src/constants/api_routes.ts";
import {useSetAtom} from "jotai";
import {accessTokenAtom} from "src/atoms.ts";
import {useNavigate} from "react-router-dom";

type TokenResponse = {
    access: string;
    refresh: string;
}

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [fetching, setFetching] = useState(false)
    const setAccessToken = useSetAtom(accessTokenAtom)
    const navigate = useNavigate();

    const logoImage = '../public/welcomeLogo.png'

    return (
        <Container maxWidth="sm">
            <Box
                component="main"
                role="main"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="100vh"
                padding="16px"
                sx={{
                    gap: '1rem',
                    '&:focus': {
                        outline: '2px solid #3f51b5', // WCAG focus state
                    },
                }}
            >
              <Box
                component={"img"}
                src={logoImage}
                sx={{
                  width: '10rem',
                  marginBottom: '1rem'
                }}
                />
                <Typography variant="h4">
                    Zaloguj się
                </Typography>
                <TextField
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    aria-label="Email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Hasło"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    aria-label="Hasło"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    aria-label="Zaloguj"
                    disabled={fetching}
                    onClick={async () => {
                        try {
                            setFetching(true)
                            const response = await axios.post<TokenResponse>(PrefixedAPI.login, {email, password})
                            setAccessToken(response.data.access)
                            navigate("/")
                        } catch {
                            console.error("Login failed")
                        } finally {
                            setFetching(false)
                        }
                    }}
                >
                    Zaloguj
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    aria-label="Konto Gościa"
                    disabled={fetching}
                    onClick={async () => {
                        try {
                            setFetching(true)
                            const response = await axios.post<TokenResponse>(PrefixedAPI.loginDemo)
                            setAccessToken(response.data.access)
                            navigate("/")
                        } catch {
                            console.error("Login failed")
                        } finally {
                            setFetching(false)
                        }
                    }}
                >
                    Konto Gościa
                </Button>
            </Box>
        </Container>
    );
};
