type InitialStateType = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null,
}

const initialState: InitialStateType = {
  status: 'idle',
  error: null,
}
