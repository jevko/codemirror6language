import {parser} from "./syntax.grammar"
import {LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside, delimitedIndent} from "@codemirror/language"
import {styleTags, tags as t} from "@codemirror/highlight"

export const jevkoLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Subjevko: (context) => {
          return (context.continue() || context.baseIndent) + context.unit
        }
      }),
      foldNodeProp.add({
        Subjevko: foldInside,
      }),
      styleTags({
        'Jevko/Text': t.string,
        'Subjevko/Text': t.labelName,
        "[ ]": t.paren
      })
    ]
  }),
  languageData: {
    // commentTokens: {line: ";"}
  }
})

export function jevko() {
  return new LanguageSupport(jevkoLanguage)
}
