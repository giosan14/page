/* eslint-disable @typescript-eslint/no-explicit-any */
import {create} from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// Types
interface BasicInfo {
  type: string;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  birthday: string;
  gender: string;
  country: string;
  state: string;
  city: string;
  postalCode: string;
  // municipality: string;
  address1: string;
  addressNumber: string;
}

interface SelectedOption {
  value: string;
  label: string;
}

interface Professional {
  licenseNumber: string;
  specialty: string;
}

interface Residence {
  type: string;
  name: string;
  country: string;
  postalCode: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  interiorNumber: string;
  exteriorNumber: string;
}
interface StoreState {
  basicInfo: BasicInfo;
  selectedCountry: SelectedOption;
  selectedState: SelectedOption;
  selectedCity: SelectedOption;
  validationSchema: {
    professionals: Professional[];
  };
  residences: Residence[];
  setBasicInfo: (data: Partial<BasicInfo>) => void;
  setSelectedCountry: (data: SelectedOption) => void;
  setSelectedState: (data: SelectedOption) => void;
  setSelectedCity: (data: SelectedOption) => void;
  setValidationSchema: (data: { professionals: Professional[] }) => void;
  setResidences: (residences: Residence[]) => void;
}

const authStore = create<StoreState>()(
    devtools(
      persist(
        (set) => ({
          basicInfo: {
            type: "",
            name: "",
            lastname: "",
            phone: "",
            email: "",
            password: "",
            confirmPassword: "",
            birthday: "",
            gender: "",
            country: "",
            state: "",
            city: "",
            postalCode: "",
            // municipality: "",
            address1: "",
            addressNumber: "",
          },
          selectedCountry: { value: "", label: "" },
          selectedState: { value: "", label: "" },
          selectedCity: { value: "", label: "" },
          validationSchema: { professionals: [{ licenseNumber: "", specialty: "" }] },
          residences: [
            {
              type: "",
              name: "",
              country: "",
              postalCode: "",
              state: "",
              city: "",
              neighborhood: "",
              street: "",
              interiorNumber: "",
              exteriorNumber: "",
            },
          ],
  
          setBasicInfo: (data) => set((state) => ({ basicInfo: { ...state.basicInfo, ...data } })),
          setSelectedCountry: (data) => set(() => ({ selectedCountry: data })),
          setSelectedState: (data) => set(() => ({ selectedState: data })),
          setSelectedCity: (data) => set(() => ({ selectedCity: data })),
          setValidationSchema: (data) => set(() => ({ validationSchema: data })),
          setResidences: (residences) => set(() => ({ residences })),
          setClearBasicInfo: (data: Partial<BasicInfo>) => set((state) => ({ basicInfo: { ...state.basicInfo, ...data } })),

        }),
        {
          name: 'auth-store',
        }
      )
    )
  );
  
  export default authStore;