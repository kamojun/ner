const reducer = (state, action) => (
  action.type === 'set' ?
    action.text.split('\n\n') :
    state
)

export default reducer