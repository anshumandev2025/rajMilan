import { create } from "zustand";

type UserStore = {
  isUserLogIn: boolean;
  setIsUserLogIn: (status: boolean) => void;
};

export const useUser = create<UserStore>((set) => ({
  isUserLogIn: false,
  setIsUserLogIn: (status) => set(() => ({ isUserLogIn: status })),
}));
