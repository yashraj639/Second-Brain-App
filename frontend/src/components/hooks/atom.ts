import { atom } from "jotai";

export interface AuthState {
  token: string | null;
  username: string | null;
}

export const authAtom = atom<AuthState>({
  token: null,
  username: "",
});