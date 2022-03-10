type InitialStateType = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null,
}
