import {accessTokenAtom} from "src/atoms.ts";
import {useAtomValue} from "jotai";
import {useMemo} from "react";
import axios from "axios";

export function useAxios() {
    const token = useAtomValue(accessTokenAtom)

    return useMemo(() => {
        const instance = axios.create({
            baseURL: "http://localhost" // Replace with your API base URL
        });

        instance.interceptors.request.use(
            (config) => {
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        return instance;
    }, [token]);
}