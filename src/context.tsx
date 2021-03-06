import React from 'react'

type Annotation = { tag: string, a: number, b: number }
type Entry = { text: string, annots: Annotation[] }
type NamedEntity = { tag: string | null, content: string }
interface IStore {
  entries: Entry[],
  filename?: string,
  labelfilename?: string,
  labelrawtext?: string,
  tags: string[],
  tagcolors: Map<string, string>,
  message: string,
  saved: false,
}
const parseText = (text: string) => (
  text.trim().split('\n\n').map(line => {
    const [text, ...lines] = line.trim().split('\n')
    const annots = lines.flatMap(line => {
      const [tag, ...ab] = line.trim().split(/\s/)
      if (ab.length >= 2) {
        const [a, b] = ab.map(Number)
        return [{ tag, a, b }]
      } else {
        return []
      }
    })
    return { text: text.trim(), annots } as Entry
  })
)
const collectTagFromSentneces = (sentences: Entry[]) => (
  [...new Set(sentences.flatMap(({ annots }) => annots.map(({ tag }) => tag)))]
)
const initalState: IStore = {
  entries: [],
  tags: [],
  tagcolors: new Map(),
  message: 'ラベル用のファイルを選択して下さい(とりあえず使ってみる場合は「デモ」をクリック)',
  saved: false,
}
type UAction = {
  type: 'load',
  text: string,
  filename: string
} | {
  type: 'loadLabel'
  text: string
} | {
  type: 'addTag',
  snum: number,
  a: number,
  b: number,
  tag: string
} | {
  type: 'reset',
  snum: number
} | {
  type: 'switch',
  snum: number,
  tnum: number
  tag: string
} | {
  type: 'debug',
  anything: any
} | {
  type: 'deleteTag'
  snum: number,
  tnum: number,
}

interface StoreWithAction {
  state: IStore;
  dispatch: React.Dispatch<UAction>;
}
const RootContext = React.createContext<StoreWithAction>({
  state: initalState,
  dispatch: ({ }: UAction) => { }
});

const reducer: React.Reducer<IStore, UAction> = (state, action) => {
  console.log(action)
  switch (action.type) {
    case 'loadLabel': {
      const tags = action.text.trim().split('\n').map(x => x.replace(/\s*\/\/[\s\S]*$/, '').split('\t')[0])
      const tagset = new Set(tags)
      if (tags.length > tagset.size) {
        return { ...state, message: "ラベルに重複があります。" + String(tags) }
      } else {
        const nonexisttags = collectTagFromSentneces(state.entries).filter(tag => !tagset.has(tag))
        if (nonexisttags.length > 0) {
          return { ...state, message: "ラベル " + nonexisttags.join() + " がファイルに含まれていません。" }
        }
        const tagcolors = new Map(action.text.trim().split('\n').flatMap((x, i) => {
          const [tag, ...c] = x.replace(/\s*\/\/[\s\S]*$/, '').split('\t')
          const color = [0, 30, 90, 180, 210, 270, 300].map(hue => `hsla(${hue}, 100%, 50%, 0.6)`)[i]
          // const color = ['hsla(0, 100%, 50%)', 'orange', 'lime', 'green', 'cyan', 'blue', 'purple', 'magenta', 'grey'][i]
          return c.length > 0 ? [[tag, c[0]]] : [[tag, color]]
        }))
        return { ...state, tags, tagcolors, labelrawtext: action.text, message: "ラベルを設定しました。" }
      }
    }
    case 'load': {
      const entries = parseText(action.text)
      const tags = collectTagFromSentneces(entries)
      const tagset = new Set(state.tags)
      const nonexisttags = tags.filter(tag => !tagset.has(tag))
      if (nonexisttags.length > 0) {
        return { ...state, message: "ラベル " + nonexisttags.join() + " が登録されていません。先にラベルのファイルを選択して下さい" }
      } else {
        return { ...state, message: "ラベル付けできます。", filename: action.filename, entries }
      }
    }
    case 'addTag': {
      const { snum, a, b, tag: newtag } = action
      state.entries[snum].annots.push({ tag: newtag, a, b })
      return { ...state }
    }
    case 'reset': {
      state.entries[action.snum].annots = []
      return { ...state }
    }
    case 'switch': {
      const { snum, tnum, tag } = action
      state.entries[snum].annots[tnum].tag = state.tags.some(t => t === tag) ? tag : state.tags[0]
      return { ...state }
    }
    case 'deleteTag': {
      const { snum, tnum } = action
      const annots = state.entries[snum].annots.flatMap((entry, i) => i == tnum ? [] : [entry])
      state.entries[snum].annots = annots
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
const useRootContext = () => React.useContext(RootContext)

export { RootContext, Provider, StoreWithAction, NamedEntity, useRootContext, Entry, Annotation }