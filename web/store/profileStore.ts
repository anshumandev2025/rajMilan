import { initialProfileData } from "@/constants/defaultData";
import { ProfileData } from "@/types";
import { create } from "zustand";

type ProfileStore = {
  profileData: ProfileData;
  updateProfile: (fields: Partial<ProfileData>) => void;
  reset: () => void;
};

export const useProfileStore = create<ProfileStore>((set) => ({
  profileData: initialProfileData,
  updateProfile: (fields) =>
    set((state) => ({
      profileData: {
        ...state.profileData,
        ...fields,
      },
    })),
  reset: () => set(() => ({ profileData: initialProfileData })),
}));
