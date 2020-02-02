import React from 'react'
import Tagged from './components/tagged'

type NamedEntity = { tag: string | null, content: string }
interface IStore {
  sentences: NamedEntity[][],
  filename?: string,
  labelfilename?: string,
  tags: string[],
  tagcolors: Map<string, string>,
  message: string,
  saved: false,
}
const parseText = (text: string) => (
  (text.split('\n\n').map(line => (
    line.split('\n').map(block => {
      const [content, ..._tag] = block.split('\t')
      const tag = _tag.length > 0 ? _tag[0] !== 'O' ? _tag[0] : null : null
      return { tag, content } as NamedEntity
    })
  )))
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
const joinNullTags = (nes: NamedEntity[]) => {
  const nes2: NamedEntity[] = []
  nes.forEach(ne => {
    if (ne.tag === null && nes2.length > 0) {
      const current = nes2.slice(-1)[0]
      if (current.tag === null) {
        current.content += ne.content
      } else {
        nes2.push(ne)
      }
    } else {
      nes2.push(ne)
    }
  })
  return nes2
}

const resetTag = (nes: NamedEntity[]) => {
  const content = nes.flatMap(ne => ne.content).join('')
  return [{ content, tag: null } as NamedEntity]
}

const initalState: IStore = {
  // sentences: [[{ tag: null, content: "こんにちは。" }], [{ tag: null, content: "今日はいい天気です。" }]],
  sentences: [],
  tags: [],
  tagcolors: new Map(),
  message: 'ラベル用のファイルを選択して下さい',
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
  //   type: 'newTag',
  //   tagname: string
  // } | {
  type: 'debug',
  anything: any
} | {
  type: 'deleteTag'
  snum: number,
  bnum: number,
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
      const tags = action.text.trim().split('\n').map(x => x.split('\t')[0])
      const tagset = new Set(tags)
      if (tags.length > tagset.size) {
        return { ...state, message: "ラベルに重複があります。" + String(tags) }
      } else {
        const nonexisttags = collectTagFromSentneces(state.sentences).filter(tag => !tagset.has(tag))
        if (nonexisttags.length > 0) {
          return { ...state, message: "ラベル " + nonexisttags.join() + " がファイルに含まれていません。" }
        }
        const tagcolors = new Map(action.text.trim().split('\n').flatMap((x, i) => {
          const [tag, ...c] = x.split('\t')
          const color = [0, 30, 90, 180, 210, 270, 300].map(hue => `hsla(${hue}, 100%, 50%, 0.6)`)[i]
          // const color = ['hsla(0, 100%, 50%)', 'orange', 'lime', 'green', 'cyan', 'blue', 'purple', 'magenta', 'grey'][i]
          return c.length > 0 ? [[tag, c[0]]] : [[tag, color]]
        }))
        return { ...state, tags, tagcolors, message: "ラベルを設定しました。" }
      }
    }
    case 'load': {
      const sentences = (parseText(action.text)).map(joinNullTags)
      const tags = collectTagFromSentneces(sentences)
      const tagset = new Set(state.tags)
      const nonexisttags = tags.filter(tag => !tagset.has(tag))
      if (nonexisttags.length > 0) {
        return { ...state, message: "ラベル " + nonexisttags.join() + " が登録されていません。先にラベルのファイルを選択して下さい" }
      } else {
        return { ...state, sentences, message: "ラベル付けできます。", filename: action.filename }
      }
    }
    case 'addTag': {
      const { snum, bnum, a, b, newtag } = action
      const sentences = [...state.sentences]
      const sentence = sentences[snum].flatMap((ne, i) => i === bnum ? insertTag(ne, a, b, newtag) : [ne])
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
    case 'deleteTag': {
      const { snum, bnum } = action
      const sentence = state.sentences[snum]
      sentence[bnum].tag = null
      state.sentences[snum] = joinNullTags(sentence)
      return { ...state }
    }
    // case 'newTag': {
    //   const { tags } = state
    //   const { tagname } = action
    //   if (!tags.some(x => x === tagname)) {
    //     tags.push(tagname)
    //   }
    //   return { ...state, tags }
    // }
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