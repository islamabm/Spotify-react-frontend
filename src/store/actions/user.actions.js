export function spendBalance(amount) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: 'SPEND_BALANCE', amount })
    } catch (error) {
      console.log('error:', error)
    }
  }
}
