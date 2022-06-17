import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import "moment/locale/id";
import axios from "axios";

const tokenLogin = process.env.REACT_APP_TOKEN_LOGIN;
const API_URL = process.env.REACT_APP_URL_API;

export const loginUser = createAsyncThunk(
  "users/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await fetch(API_URL + "/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      let data = "";
      let _data = await response.json();
      if (response.status === 200) {
        data = _data.data;
        if (_data.err_code === "00") {
          localStorage.setItem(tokenLogin, data.access_token);
          return data;
        } else {
          return thunkAPI.rejectWithValue(_data);
        }
      } else {
        return thunkAPI.rejectWithValue(_data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const fetchUserBytoken = createAsyncThunk(
  "users/fetchUserBytoken",
  async (param, thunkAPI) => {
    const token = localStorage.getItem(tokenLogin)
      ? "Bearer " + localStorage.getItem(tokenLogin)
      : "";

    var config = {
      method: "get",
      url: API_URL + "/profile",
      headers: {
        Authorization: token,
      },
    };

    return axios(config)
      .then(function (response) {
        const _data = JSON.stringify(response);

        if (response.status === 200) {
          let data = response.data;
          if (data.err_code === "00") {
            return data.data;
          } else {
            localStorage.removeItem(tokenLogin);
            return thunkAPI.rejectWithValue(data);
          }
        } else {
          return thunkAPI.rejectWithValue(_data);
        }
      })
      .catch(function (error) {
        console.log(error);
        localStorage.removeItem(tokenLogin);
        return thunkAPI.rejectWithValue(error);
      });
  }
);

const initialState = {
  expandMenu: true,
  isLoggedIn: !!localStorage.getItem(tokenLogin),
  token: localStorage.getItem(tokenLogin),
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
  defaultOpenKeys: "/",
  currentUser: {
    id_operator: null,
    name: "",
    password: null,
  },
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    clickExpand: (state) => {
      state.expandMenu = !state.expandMenu ? true : false;
      return state;
    },
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.errorMessage = null;
      return state;
    },
    onLogout: (state) => {
      localStorage.removeItem(tokenLogin);
      state.isLoggedIn = false;
      state.token = null;
      state.currentUser = initialState.currentUser;
      return state;
    },
    setDefaultOpenKeys: (state, dt) => {
      state.defaultOpenKeys = dt.payload;
    },
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isLoggedIn = !!localStorage.getItem(tokenLogin);
      state.token = localStorage.getItem(tokenLogin);
      state.currentUser = payload;
      return state;
    },
    [loginUser.rejected]: (state, { payload }) => {
      //console.log('payload', payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.err_msg;
    },
    [loginUser.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchUserBytoken.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchUserBytoken.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.currentUser = payload;
    },
    [fetchUserBytoken.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
    },
  },
});

export const { clickExpand, clearState, onLogout, setDefaultOpenKeys } =
  mainSlice.actions;
export const userSelector = (state) => state.main;
//export default mainSlice.reducer;
