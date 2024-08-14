// import React, { useEffect, useRef, useState } from 'react'
// import {
//   headingsPlugin,
//   listsPlugin,
//   quotePlugin,
//   thematicBreakPlugin,
//   markdownShortcutPlugin,
//   MDXEditor,
//   type MDXEditorMethods,
//   type MDXEditorProps,
//   frontmatterPlugin,
//   UndoRedo,
//   BoldItalicUnderlineToggles,
//   toolbarPlugin,
//   InsertImage,
//   linkPlugin,
//   linkDialogPlugin,
//   imagePlugin,
//   CreateLink,
//   InsertTable,
//   tablePlugin,
// } from '@mdxeditor/editor'
// import useBase64Img from '@/hook/useBase64Img'
// const ViewCreate = ({ item }: { item: any }) => {
//   const editorRef = useRef<MDXEditorMethods | null>(null)
//   const { getBase64 } = useBase64Img()

//   return (
//     <div className="w-[500px] h-[500px]">
//       <MDXEditor
//         onChange={(data) => {
//           console.log({ typeData: typeof data })

//           console.log(data)
//         }}
//         className="w-full h-full"
//         plugins={[
//           headingsPlugin(),
//           listsPlugin(),
//           quotePlugin(),
//           thematicBreakPlugin(),
//           markdownShortcutPlugin(),
//           frontmatterPlugin(),
//           tablePlugin(),
//           toolbarPlugin({
//             toolbarContents: () => (
//               <>
//                 {' '}
//                 <UndoRedo />
//                 <BoldItalicUnderlineToggles />
//                 <InsertImage />
//                 <CreateLink />
//                 <InsertTable />
//               </>
//             ),
//           }),
//           linkPlugin(),
//           linkDialogPlugin(),
//           imagePlugin({
//             imageUploadHandler: (file) => {
//               return new Promise((resolve, reject) => {
//                 console.log({ file })
//                 const callBack = (data: any) => {
//                   resolve(data.base64)
//                 }
//                 getBase64(file, callBack)
//               })

//               // return Promise.resolve('https://picsum.photos/200/300')
//             },
//             imageAutocompleteSuggestions: [
//               'https://picsum.photos/200/300',
//               'https://picsum.photos/200',
//             ],
//           }),
//         ]}
//         markdown="> This is a quote"
//         suppressHtmlProcessing
//         ref={editorRef}
//       />
//     </div>
//   )
// }

// export default ViewCreate

import YooptaEditor, { createYooptaEditor, YooEditor } from '@yoopta/editor'
import Paragraph from '@yoopta/paragraph'
import Blockquote from '@yoopta/blockquote'
import { HeadingOne } from '@yoopta/headings'
const plugins = [Paragraph, Blockquote, HeadingOne]

import React, { useEffect, useMemo } from 'react'

const ViewCreate = () => {
  const editor: YooEditor = useMemo(() => createYooptaEditor(), [])
  console.log('====================================')
  console.log({ editor })
  useEffect(() => {
    if (editor) {
      editor.on('change', (e) => {
        console.log('====================================')
        console.log({ e })
        console.log('====================================')
      })
    }
  }, [editor])

  console.log('====================================')
  return <YooptaEditor editor={editor} plugins={plugins} />
}

export default ViewCreate
