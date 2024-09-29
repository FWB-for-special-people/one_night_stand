import {useAtom} from "jotai";
import {jwtDecode} from "jwt-decode";
import {accessTokenAtom} from "src/atoms";
import {useMemo} from "react";

type DecodedToken = {
    exp: number;
    iat: number;
    jti: string;
    token_type: string;
    user_id: number;
}

export const useDecodedToken = () => {
    const [token] = useAtom(accessTokenAtom);

    return useMemo(() => {
        if (token) {
            try {
                return jwtDecode(token) as DecodedToken;  // Decode the JWT token
            } catch (error) {
                console.error("Invalid token", error);
                return null;
            }
        }
        return null;
    }, [token]);
};