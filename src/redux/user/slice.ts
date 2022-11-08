import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { AdressInterface, BankCard, NextStage, SetCountryAndTel, UserSlice } from "./types";

const initialState: UserSlice = {
    isAuth: localStorage.getItem("isLogged") === "true",
    authorizationOrLogin: {
        stage: 0,
        type: ""
    },
    mainInformation: {
        telephone: "",
        country: "",
    },
    canEditProfile: false,
};

export const userSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        clearAuthLoginFields(state) {
            state.authorizationOrLogin.stage = 0
            state.authorizationOrLogin.type = ""
        },
        setNextStage(state, action: PayloadAction<NextStage>) {
            state.authorizationOrLogin.stage = action.payload.stage
            state.authorizationOrLogin.type = action.payload.type
        },
        setContryAndTel(state, action: PayloadAction<SetCountryAndTel>) {
            state.mainInformation.telephone = action.payload.telephone
            if (action.payload.country) state.mainInformation.country = action.payload.country
        },
        setUserInformation(state, action: PayloadAction<any>) {
            Object.keys(action.payload).map((el, idx) => {
                if (Object.keys(action.payload)[idx] !== "password") {
                    //@ts-ignore
                    state.mainInformation[el] = Object.values(action.payload)[idx].stringValue
                }
            })
            state.isAuth = true
        },
        setCanEditProfile(state, action: PayloadAction<boolean>) {
            state.canEditProfile = action.payload
        },
    },
});

export const { clearAuthLoginFields, setNextStage, setContryAndTel, setUserInformation, setCanEditProfile, } = userSlice.actions;

export const selectCart = (state: RootState) => state.userSlice;

export default userSlice.reducer;
