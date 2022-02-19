import React, { forwardRef, useImperativeHandle } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import useFetchState from "../../utils/useFetchState";

const RichText = forwardRef((props, ref)=>{
    const [editorState, setEditorState] = useFetchState(()=> {
        const html = props.detail
        if(html){
            const contentBlock = htmlToDraft(html);
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                return EditorState.createWithContent(contentState);
            }
        }
        else return EditorState.createEmpty()
    })

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState)
    };

    const uploadImageCallBack = (file)=>{
        return new Promise(
            (resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', '/manage/img/upload');
                const data = new FormData();
                data.append('image', file);
                xhr.send(data);
                xhr.addEventListener('load', () => {
                    const response = JSON.parse(xhr.responseText);
                    // 得到图片地址
                    const url = response.data.url;
                    resolve({data: {link: url}});
                });
                xhr.addEventListener('error', () => {
                    const error = JSON.parse(xhr.responseText);
                    reject(error);
                });
            }
        );
    }

    useImperativeHandle(ref, ()=>({
        getDetail: ()=>{
            return draftToHtml(convertToRaw(editorState.getCurrentContent()))
        }
    }))

    return (
        <Editor
            editorState={editorState}
            editorStyle={{border: "1px solid black", minHeight: 200, marginTop: 40}}
            onEditorStateChange={onEditorStateChange}
            toolbar={{
                image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
            }}
        />
        );
})

export default RichText

