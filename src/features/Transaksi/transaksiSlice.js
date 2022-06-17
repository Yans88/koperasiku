import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_URL_API;
const tokenLogin = process.env.REACT_APP_TOKEN_LOGIN;

export const fetchData = createAsyncThunk(
  "transaksi/get",
  async (param, thunkAPI) => {
    const token = localStorage.getItem(tokenLogin)
      ? "Bearer " + localStorage.getItem(tokenLogin)
      : "";
    const config = {
      headers: {
        Authorization: `${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(API_URL + "/pinjaman", param, config);
      let data = "";
      let _data = response;
      let res = {};
      if (response.status === 200) {
        let dataa = _data.data;
        data = dataa.data;
        if (dataa.err_code === "00") {
          res = {
            data: data,
            totalData: dataa.total_data,
          };
          return res;
        } else {
          res = {
            err_msg: dataa.err_msg,
          };
          return thunkAPI.rejectWithValue(res);
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

export const fetchDataDetail = createAsyncThunk(
  "transaksi/detail",
  async (param, thunkAPI) => {
    let res = {};
    try {
      const response = await axios.post(API_URL + "/transaksi_detail", param);
      //let data = '';
      let _data = response;
      if (response.status === 200) {
        let dataa = _data.data;
        //data = dataa.data;
        if (dataa.err_code === "00") {
          return dataa;
        } else {
          res = {
            isAddLoading: false,
            showFormSuccess: false,
            showFormConfirm: true,
            err_msg: dataa.err_msg,
            contentMsg: null,
          };
          return thunkAPI.rejectWithValue(res);
        }
      } else {
        res = {
          isAddLoading: false,
          showFormSuccess: true,
          showFormConfirm: false,
          contentMsg:
            "<div style='font-size:20px; text-align:center;'><strong>Failed</strong>, Something wrong</div>",
          err_msg: null,
        };
        console.log("Error", _data);
        return thunkAPI.rejectWithValue(res);
      }
    } catch (e) {
      res = {
        isAddLoading: false,
        showFormSuccess: true,
        showFormConfirm: false,
        contentMsg:
          "<div style='font-size:20px; text-align:center;'><strong>Failed</strong>, Something wrong</div>",
        err_msg: null,
      };
      console.log("Error catch", e.response.data);
      return thunkAPI.rejectWithValue(res);
    }
  }
);

export const approveData = createAsyncThunk(
  "transaksi/approveData",
  async (param, thunkAPI) => {
    let res = {};

    const token = localStorage.getItem(tokenLogin)
      ? "Bearer " + localStorage.getItem(tokenLogin)
      : "";
    const config = {
      headers: {
        Authorization: `${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(API_URL + "/upd_status", param, config);
      //let data = '';
      let _data = response;
      if (response.status === 200) {
        let dataa = _data.data;
        //data = dataa.data;
        if (dataa.err_code === "00") {
          return dataa;
        } else {
          res = {
            isAddLoading: false,
            showFormSuccess: false,
            showFormAdd: true,
            err_msg: dataa.err_msg,
            contentMsg: null,
          };
          return thunkAPI.rejectWithValue(res);
        }
      } else {
        res = {
          isAddLoading: false,
          showFormSuccess: true,
          showFormAdd: false,
          contentMsg:
            "<div style='font-size:20px; text-align:center;'><strong>Failed</strong>, Something wrong</div>",
          err_msg: null,
        };
        console.log("Error", _data);
        return thunkAPI.rejectWithValue(res);
      }
    } catch (e) {
      res = {
        isAddLoading: false,
        showFormSuccess: true,
        showFormAdd: false,
        contentMsg:
          "<div style='font-size:20px; text-align:center;'><strong>Failed</strong>, Something wrong</div>",
        err_msg: null,
      };
      console.log("Error catch", e.response.data);
      return thunkAPI.rejectWithValue(res);
    }
  }
);

export const receiveCicilan = createAsyncThunk(
  "transaksi/receiveCicilan",
  async (param, thunkAPI) => {
    let res = {};

    const token = localStorage.getItem(tokenLogin)
      ? "Bearer " + localStorage.getItem(tokenLogin)
      : "";
    const config = {
      headers: {
        Authorization: `${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(API_URL + "/submit_cicilan", param, config);
      //let data = '';
      let _data = response;
      if (response.status === 200) {
        let dataa = _data.data;
        //data = dataa.data;
        if (dataa.err_code === "00") {
          return dataa;
        } else {
          res = {
            isAddLoading: false,
            showFormSuccess: false,
            showFormAdd: true,
            err_msg: dataa.err_msg,
            contentMsg: null,
          };
          return thunkAPI.rejectWithValue(res);
        }
      } else {
        res = {
          isAddLoading: false,
          showFormSuccess: true,
          showFormAdd: false,
          contentMsg:
            "<div style='font-size:20px; text-align:center;'><strong>Failed</strong>, Something wrong</div>",
          err_msg: null,
        };
        console.log("Error", _data);
        return thunkAPI.rejectWithValue(res);
      }
    } catch (e) {
      res = {
        isAddLoading: false,
        showFormSuccess: true,
        showFormAdd: false,
        contentMsg:
          "<div style='font-size:20px; text-align:center;'><strong>Failed</strong>, Something wrong</div>",
        err_msg: null,
      };
      console.log("Error catch", e.response.data);
      return thunkAPI.rejectWithValue(res);
    }
  }
);

export const historyCicilan = createAsyncThunk(
  "transaksi/historyCicilan",
  async (param, thunkAPI) => {
    const token = localStorage.getItem(tokenLogin)
      ? "Bearer " + localStorage.getItem(tokenLogin)
      : "";
    const config = {
      headers: {
        Authorization: `${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(API_URL + "/pinjaman_detail", param, config);
      let data = "";
      let _data = response;
      let res = {};
      if (response.status === 200) {
        let dataa = _data.data;
        data = dataa.data;
        if (dataa.err_code === "00") {
          res = {
            data: data.history_cicilan,
            
          };
          return res;
        } else {
          res = {
            err_msg: dataa.err_msg,
          };
          return thunkAPI.rejectWithValue(res);
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

const initialState = {
  data: [],
  historyCicilan: [],
  dtRes: {},
  totalData: 0,
  isError: false,
  isLoading: false,
  isAddLoading: false,
  showFormSuccess: false,
  showFormDriver: false,
  showPhoto: false,
  tipeSWAL: "success",
  contentMsg: null,
};

export const transaksiSlice = createSlice({
  name: "transaksi",
  initialState,
  reducers: {
    setDriver: (state, { payload }) => {
      state.isLoading = false;
      state.errorPriority = null;
      state.showFormDriver = payload.showFormDriver;
      return state;
    },
    viewPhoto: (state, { payload }) => {
      state.isLoading = false;
      state.errorPriority = null;
      state.showPhoto = payload.showPhoto;
      return state;
    },
    clearError: (state) => {
      state.isLoading = false;
      state.errorPriority = null;
      return state;
    },
    closeForm: (state) => {
      state.errorPriority = null;
      state.showFormSuccess = false;
    },
  },
  extraReducers: {
    [fetchData.fulfilled]: (state, { payload }) => {
      state.totalData = payload.totalData;
      state.data = payload.data;
      state.isLoading = false;
      state.isError = false;
      state.contentMsg = null;
    },
    [fetchData.rejected]: (state, { payload }) => {
      state.data = [];
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = payload !== undefined ? payload.err_msg : null;
    },
    [fetchData.pending]: (state) => {
      state.isLoading = true;
    },
	[historyCicilan.fulfilled]: (state, { payload }) => {      
      state.historyCicilan = payload.data;
      state.isLoading = false;
      state.isError = false;
      state.contentMsg = null;
    },
    [historyCicilan.rejected]: (state, { payload }) => {
      state.historyCicilan = [];
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = payload !== undefined ? payload.err_msg : null;
    },
    [historyCicilan.pending]: (state) => {
      state.isLoading = false;
    },
    [approveData.fulfilled]: (state) => {
      state.isError = false;
      state.tipeSWAL = "success";
      state.showFormSuccess = true;
      state.showFormAdd = false;
      state.isAddLoading = false;
      state.contentMsg =
        "<div style='font-size:20px; text-align:center;'><strong>Success</strong>, Data berhasil disimpan</div>";
    },
    [approveData.rejected]: (state, { payload }) => {
      
      state.isAddLoading = payload !== undefined ? payload.isAddLoading : false;
      state.showFormSuccess =
        payload !== undefined ? payload.showFormSuccess : true;
      state.showFormAdd = payload !== undefined ? payload.showFormAdd : false;
      state.tipeSWAL = "error";
      state.contentMsg =
        payload !== undefined
          ? payload.contentMsg
          : "<div style='font-size:20px; text-align:center;'><strong>Failed</strong>, Something wrong</div>";
      state.isError = true;
      state.errorPriority = payload !== undefined ? payload.err_msg : null;
    },
    [approveData.pending]: (state) => {
      state.isAddLoading = true;
    },
	[receiveCicilan.fulfilled]: (state) => {
      state.isError = false;
      state.tipeSWAL = "success";
      state.showFormSuccess = true;
      state.showFormAdd = false;
      state.isAddLoading = false;
      state.contentMsg =
        "<div style='font-size:20px; text-align:center;'><strong>Success</strong>, Pembayaran telah diterima</div>";
    },
    [receiveCicilan.rejected]: (state, { payload }) => {
      console.log(payload);
      state.isAddLoading = payload !== undefined ? payload.isAddLoading : false;
      state.showFormSuccess =
        payload !== undefined ? payload.showFormSuccess : true;
      state.showFormAdd = payload !== undefined ? payload.showFormAdd : false;
      state.tipeSWAL = "error";
      state.contentMsg =
        payload !== undefined
          ? payload.contentMsg
          : "<div style='font-size:20px; text-align:center;'><strong>Failed</strong>, Something wrong</div>";
      state.isError = true;
      state.errorPriority = payload !== undefined ? payload.err_msg : null;
    },
    [receiveCicilan.pending]: (state) => {
      state.isAddLoading = true;
    },
  },
});

export const { clearError, setDriver, closeForm, viewPhoto } =
  transaksiSlice.actions;
export const userSelector = (state) => state.transaksi;
