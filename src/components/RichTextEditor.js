'use client';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeNode, CodeHighlightNode } from '@lexical/code';
import { LinkNode, AutoLinkNode } from '@lexical/link';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';
import { $getRoot, $insertNodes } from 'lexical';
import { useEffect } from 'react';
import ToolbarPlugin from './ToolbarPlugin';

const theme = {
    ltr: 'ltr',
    rtl: 'rtl',
    paragraph: 'editor-paragraph',
    quote: 'editor-quote',
    heading: {
        h1: 'editor-heading-h1',
        h2: 'editor-heading-h2',
        h3: 'editor-heading-h3',
        h4: 'editor-heading-h4',
        h5: 'editor-heading-h5',
    },
    list: {
        nested: {
            listitem: 'editor-nested-listitem',
        },
        ol: 'editor-list-ol',
        ul: 'editor-list-ul',
        listitem: 'editor-listitem',
    },
    link: 'editor-link',
    text: {
        bold: 'editor-text-bold',
        italic: 'editor-text-italic',
        underline: 'editor-text-underline',
        strikethrough: 'editor-text-strikethrough',
        code: 'editor-text-code',
    },
    code: 'editor-code',
    codeHighlight: {
        atrule: 'editor-tokenAttr',
        attr: 'editor-tokenAttr',
        boolean: 'editor-tokenProperty',
        builtin: 'editor-tokenSelector',
        cdata: 'editor-tokenComment',
        char: 'editor-tokenSelector',
        class: 'editor-tokenFunction',
        'class-name': 'editor-tokenFunction',
        comment: 'editor-tokenComment',
        constant: 'editor-tokenProperty',
        deleted: 'editor-tokenProperty',
        doctype: 'editor-tokenComment',
        entity: 'editor-tokenOperator',
        function: 'editor-tokenFunction',
        important: 'editor-tokenVariable',
        inserted: 'editor-tokenSelector',
        keyword: 'editor-tokenAttr',
        namespace: 'editor-tokenVariable',
        number: 'editor-tokenProperty',
        operator: 'editor-tokenOperator',
        prolog: 'editor-tokenComment',
        property: 'editor-tokenProperty',
        punctuation: 'editor-tokenPunctuation',
        regex: 'editor-tokenVariable',
        selector: 'editor-tokenSelector',
        string: 'editor-tokenSelector',
        symbol: 'editor-tokenProperty',
        tag: 'editor-tokenProperty',
        url: 'editor-tokenOperator',
        variable: 'editor-tokenVariable',
    },
};

function onError(error) {
    console.error(error);
}

function InitialContentPlugin({ initialHtml }) {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        if (initialHtml) {
            editor.update(() => {
                const parser = new DOMParser();
                const dom = parser.parseFromString(initialHtml, 'text/html');
                const nodes = $generateNodesFromDOM(editor, dom);
                $getRoot().clear();
                $insertNodes(nodes);
            });
        }
    }, [editor, initialHtml]);

    return null;
}

export default function RichTextEditor({ value, onChange, height = 500 }) {
    const initialConfig = {
        namespace: 'MyEditor',
        theme,
        onError,
        nodes: [
            HeadingNode,
            ListNode,
            ListItemNode,
            QuoteNode,
            CodeNode,
            CodeHighlightNode,
            LinkNode,
            AutoLinkNode,
        ],
    };

    const handleChange = (editorState, editor) => {
        editor.update(() => {
            const htmlString = $generateHtmlFromNodes(editor, null);
            if (onChange) {
                onChange(htmlString);
            }
        });
    };

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <div className="editor-container" style={{ border: '1px solid #ccc', borderRadius: '4px' }}>
                <ToolbarPlugin />
                <div className="editor-inner" style={{ position: 'relative', minHeight: height }}>
                    <RichTextPlugin
                        contentEditable={
                            <ContentEditable
                                className="editor-input"
                                style={{
                                    minHeight: height,
                                    padding: '15px',
                                    outline: 'none',
                                    fontSize: '14px',
                                    lineHeight: '1.5',
                                }}
                            />
                        }
                        placeholder={
                            <div
                                className="editor-placeholder"
                                style={{
                                    position: 'absolute',
                                    top: '15px',
                                    left: '15px',
                                    color: '#999',
                                    pointerEvents: 'none',
                                }}
                            >
                                Enter your content...
                            </div>
                        }
                        ErrorBoundary={LexicalErrorBoundary}
                    />
                    <HistoryPlugin />
                    <AutoFocusPlugin />
                    <ListPlugin />
                    <LinkPlugin />
                    <OnChangePlugin onChange={handleChange} />
                    <InitialContentPlugin initialHtml={value} />
                </div>
            </div>
        </LexicalComposer>
    );
}
