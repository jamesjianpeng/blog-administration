// import react, react-markdown-editor-lite, and a markdown parser you like
import React from 'react'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'

import 'react-markdown-editor-lite/lib/index.css';
import 'src/components/Article/edit.css'

const mdParser = new MarkdownIt(/* Markdown-it options */);

interface IProps {
  data: string
  onFinsh: (html: string, text: string) => void
}

export const Edit = (props: IProps) => {
  function handleEditorChange({html, text}: any) {
    props.onFinsh(html, text)
  }
  return (
    <MdEditor
      value={ props.data }
      renderHTML={(text) => mdParser.render(text)}
      onChange={handleEditorChange}
    />
  )
}
