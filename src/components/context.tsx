import React from 'react'

interface IStore {
  sentences: string[],
  loaded: Boolean,
}
const initalState: IStore = {
  sentences: [],
  loaded: false,
}
interface IAction {
  type: string,
  text: string
}

interface StoreWithAction {
  state: IStore;
  dispatch: React.Dispatch<IAction>;
}
const RootContext = React.createContext<StoreWithAction>({
  state: initalState,
  dispatch: ({ type }: IAction) => { }
});

const reducer: React.Reducer<IStore, IAction> = (state, action) => {
  switch (action.type) {
    case 'load':
      return { ...state, sentences: action.text.split('\n\n'), loaded: true }
    case 'add':
      const sentences = [...state.sentences]
      sentences[Number(action.text)] += "!?!?!?"
      return { ...state, sentences }
    default:
      return state
  }
}
interface StoreProviderProps {
  children: JSX.Element | JSX.Element[];
}
const Provider = ({ children }: StoreProviderProps) => {
  const [state, dispatch] = React.useReducer(reducer, initalState)
  return (
    <RootContext.Provider value={{ state, dispatch }}>
      {children}
    </RootContext.Provider>
  )
}

export { RootContext, Provider, StoreWithAction, IAction }