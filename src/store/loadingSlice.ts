import { createSlice } from '@reduxjs/toolkit'

export interface LoadingState {
  value: boolean
}

const initialState: LoadingState = {
  value: false,
}

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    changeLoading: (state,{ payload }) => {
      state.value=payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { changeLoading } = loadingSlice.actions
export default loadingSlice.reducer