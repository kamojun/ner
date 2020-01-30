import React from 'react'

type NamedEntity = { tag: string | null, content: string }
interface IStore {
  sentences: NamedEntity[][],
  loaded: Boolean,
  tags: string[],
  message: string,
}
const parseText = (text: string) => (
  text.split('\n\n').map(line => (
    line.split('\n').map(block => {
      const [content, ..._tag] = block.split('\t')
      const tag = _tag.length > 0 ? _tag[0] !== 'O' ? _tag[0] : null : null
      return { tag, content } as NamedEntity
    })
  ))
)
const collectTagFromSentneces = (sentences: NamedEntity[][]) => (
  [...new Set(sentences.flat().flatMap(({ tag }) => tag !== null ? [tag] : []))]
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
  // sentences: parseText("今日\tTAG1\nは\nいい天気\tTAG2\nです。\n\n明日\tTAG1\nは\n雪が降る\tTAG2\nでしょう"),
  sentences: [],
  tags: [],
  loaded: false,
  message: 'ラベル用のファイルを選択して下さい'
}
type UAction = {
  type: 'load'
  text: string
} | {
  type: 'loadLabel'
  text: string
} | {
  type: 'tag',
  snum: number,
  bnum: number,
  a: number,
  b: number,
  newtag: string
} | {
  type: 'reset',
  snum: number
} | {
  type: 'switch',
  snum: number,
  bnum: number,
  curtag: string,
  disttag?: string
} | {
  type: 'newTag',
  tagname: string
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
  switch (action.type) {
    case 'load': {
      const sentences = parseText(action.text)
      const tags = collectTagFromSentneces(sentences)
      return { ...state, sentences, message: "ラベル付けできます。", loaded: true }
    }
    case 'loadLabel': {
      const tags = action.text.trim().split('\n')
      const tagset = new Set(tags)
      if (tags.length > tagset.size) {
        return { ...state, message: "ラベルに重複があります。" }
      } else {
        return { ...state, message: "次に、データ用のファイルを選択してください。", tags }
      }
    }
    case 'tag': {
      const { snum, bnum, a, b, newtag } = action
      const sentences = [...state.sentences]
      const sentence = sentences[snum].flatMap(ne => insertTag(ne, a, b, newtag))
      sentences[snum] = sentence
      return { ...state, sentences: sentences }
    }
    case 'reset': {
      state.sentences[action.snum] = resetTag(state.sentences[action.snum])
      return { ...state }
    }
    case 'switch': {
      const { snum, bnum, curtag } = action
      const newtagnum = state.tags.flatMap((t, i) => t === curtag ? [i] : [])[0] + 1
      const newtag = state.tags[newtagnum % state.tags.length]
      state.sentences[snum][bnum].tag = newtag
      return { ...state }
    }
    case 'newTag': {
      const { tags } = state
      const { tagname } = action
      if (!tags.some(x => x === tagname)) {
        tags.push(tagname)
      }
      return { ...state, tags }
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

export { RootContext, Provider, StoreWithAction, NamedEntity }