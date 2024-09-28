import {atom} from 'jotai';
import {atomWithStorage} from "jotai/utils";

export const darkModeAtom = atomWithStorage("darkMode", false);

export const isSideMenuCollapsedAtom = atom(true);

export const accessTokenAtom = atom<string | null>(null)