import React from 'react'

type NamedEntity = { tag: string | null, content: string }
interface IStore {
  sentences: NamedEntity[][],
  tags: string[]
  loaded: Boolean,
}
const parseText = (text: string) => (
  text.split('\n\n').map(line => (
    line.split('\n').map(block => {
      const [content, ..._tag] = block.split('\t')
      const tag = _tag.length > 0 ? _tag[0] : null
      return { tag, content } as NamedEntity
    })
  ))
)
const insertTag = (ne: NamedEntity, a: number, b: number, tag: string) => {
  if (ne.tag !== null) {
    return [ne]
  } else {
    const { content } = ne;
    const left = content.slice(0, a)
    const middle = content.slice(a, b)
    const right = content.slice(b)
    let inserted: NamedEntity[] = []
    if (left.length > 0) {
      inserted.push({ content: left, tag: null })
    }
    inserted.push({ content: middle, tag })
    if (right.length > 0) {
      inserted.push({ content: right, tag: null })
    }
    return inserted
  }
}
const resetTag = (nes: NamedEntity[]) => {
  const content = nes.flatMap(ne => ne.content).join('')
  return [{ content, tag: null } as NamedEntity]
}

const initalState: IStore = {
  sentences: parseText("今日\tTAG1\nは\nいい天気\tTAG2\nです。\n\n明日\tTAG1\nは\n雪が降る\tTAG2\nでしょう"),
  tags: ['TAG1', 'TAG2'],
  loaded: false,
}
interface IAction {
  type: 'load' | 'tag' | 'remove' | 'reset' | 'switch'
  text: string
}
interface LoadAction {
  text: string
}
interface TagAction {
  snum: Number,
  tnum: Number,
  a: Number,
  b: Number,
}
interface ResetAction {
  snum: Number
}
interface SwitchAction {
  snum: Number,
  tnum: Number,
  curtag: string,
  disttag?: string
}
type UAction = LoadAction | TagAction | ResetAction | SwitchAction

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
    case 'load': {
      const sentences = parseText(action.text)
      const tags = [...new Set(sentences.flat().flatMap(({ tag }) => tag !== null ? [tag] : []))]
      return { ...state, sentences, tags, loaded: true }
    }
    case 'tag': {
      const [nums, tagname] = action.text.split('\t')
      const [n, m, a, b] = nums.split(' ').map(Number)
      const sentences = [...state.sentences]
      const sentence = sentences[n].flatMap(ne => insertTag(ne, a, b, tagname))
      sentences[n] = sentence
      return { ...state, sentences: sentences }
    }
    case 'reset': {
      const n = Number(action.text)
      state.sentences[n] = resetTag(state.sentences[n])
      return { ...state }
    }
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

export { RootContext, Provider, StoreWithAction, IAction, NamedEntity }