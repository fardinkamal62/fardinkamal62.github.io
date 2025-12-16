'use client';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useCallback, useEffect, useState } from 'react';
import {
    SELECTION_CHANGE_COMMAND,
    FORMAT_TEXT_COMMAND,
    FORMAT_ELEMENT_COMMAND,
    $getSelection,
    $isRangeSelection,
} from 'lexical';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import {
    INSERT_ORDERED_LIST_COMMAND,
    INSERT_UNORDERED_LIST_COMMAND,
    REMOVE_LIST_COMMAND,
    $isListNode,
    ListNode,
} from '@lexical/list';
import { $isHeadingNode } from '@lexical/rich-text';
import { $getNearestNodeOfType, mergeRegister } from '@lexical/utils';

const LowPriority = 1;

export default function ToolbarPlugin() {
    const [editor] = useLexicalComposerContext();
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isStrikethrough, setIsStrikethrough] = useState(false);
    const [isLink, setIsLink] = useState(false);
    const [blockType, setBlockType] = useState('paragraph');

    const updateToolbar = useCallback(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
            // Update text format
            setIsBold(selection.hasFormat('bold'));
            setIsItalic(selection.hasFormat('italic'));
            setIsUnderline(selection.hasFormat('underline'));
            setIsStrikethrough(selection.hasFormat('strikethrough'));

            // Update link
            const node = selection.anchor.getNode();
            const parent = node.getParent();
            if ($isLinkNode(parent) || $isLinkNode(node)) {
                setIsLink(true);
            } else {
                setIsLink(false);
            }

            // Update block type
            const anchorNode = selection.anchor.getNode();
            const element =
                anchorNode.getKey() === 'root'
                    ? anchorNode
                    : anchorNode.getTopLevelElementOrThrow();
            const elementKey = element.getKey();
            const elementDOM = editor.getElementByKey(elementKey);

            if (elementDOM !== null) {
                if ($isListNode(element)) {
                    const parentList = $getNearestNodeOfType(anchorNode, ListNode);
                    const type = parentList ? parentList.getTag() : element.getTag();
                    setBlockType(type);
                } else {
                    const type = $isHeadingNode(element)
                        ? element.getTag()
                        : element.getType();
                    setBlockType(type);
                }
            }
        }
    }, [editor]);

    useEffect(() => {
        return mergeRegister(
            editor.registerUpdateListener(({ editorState }) => {
                editorState.read(() => {
                    updateToolbar();
                });
            }),
            editor.registerCommand(
                SELECTION_CHANGE_COMMAND,
                () => {
                    updateToolbar();
                    return false;
                },
                LowPriority
            )
        );
    }, [editor, updateToolbar]);

    const formatBold = () => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
    };

    const formatItalic = () => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
    };

    const formatUnderline = () => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
    };

    const formatStrikethrough = () => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
    };

    const insertLink = useCallback(() => {
        if (!isLink) {
            const url = prompt('Enter URL:');
            if (url) {
                editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
            }
        } else {
            editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
        }
    }, [editor, isLink]);

    const formatBulletList = () => {
        if (blockType !== 'ul') {
            editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
        } else {
            editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
        }
    };

    const formatNumberedList = () => {
        if (blockType !== 'ol') {
            editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
        } else {
            editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
        }
    };

    const formatHeading = (headingSize) => {
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, headingSize);
            }
        });
    };

    const buttonClass = (isActive) =>
        `px-3 py-2 text-sm font-medium rounded ${
            isActive
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
        }`;

    return (
        <div className="toolbar flex flex-wrap gap-2 p-3 border-b border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800">
            <select
                className="px-2 py-1 text-sm rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600"
                value={blockType}
                onChange={(e) => {
                    const value = e.target.value;
                    if (value === 'paragraph') {
                        formatHeading('paragraph');
                    } else if (value.startsWith('h')) {
                        formatHeading(value);
                    }
                }}
            >
                <option value="paragraph">Paragraph</option>
                <option value="h1">Heading 1</option>
                <option value="h2">Heading 2</option>
                <option value="h3">Heading 3</option>
                <option value="h4">Heading 4</option>
                <option value="h5">Heading 5</option>
            </select>

            <button
                type="button"
                onClick={formatBold}
                className={buttonClass(isBold)}
                aria-label="Format Bold"
            >
                <strong>B</strong>
            </button>

            <button
                type="button"
                onClick={formatItalic}
                className={buttonClass(isItalic)}
                aria-label="Format Italic"
            >
                <em>I</em>
            </button>

            <button
                type="button"
                onClick={formatUnderline}
                className={buttonClass(isUnderline)}
                aria-label="Format Underline"
            >
                <u>U</u>
            </button>

            <button
                type="button"
                onClick={formatStrikethrough}
                className={buttonClass(isStrikethrough)}
                aria-label="Format Strikethrough"
            >
                <s>S</s>
            </button>

            <div className="w-px bg-gray-300 dark:bg-gray-600 mx-1" />

            <button
                type="button"
                onClick={insertLink}
                className={buttonClass(isLink)}
                aria-label="Insert Link"
            >
                🔗
            </button>

            <div className="w-px bg-gray-300 dark:bg-gray-600 mx-1" />

            <button
                type="button"
                onClick={formatBulletList}
                className={buttonClass(blockType === 'ul')}
                aria-label="Bullet List"
            >
                • List
            </button>

            <button
                type="button"
                onClick={formatNumberedList}
                className={buttonClass(blockType === 'ol')}
                aria-label="Numbered List"
            >
                1. List
            </button>
        </div>
    );
}
