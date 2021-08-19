import React, { useCallback, useMemo, useState } from 'react';
import { createEditor, BaseEditor, Editor, Transforms, Element } from 'slate';
import { withReact, Slate, Editable, ReactEditor } from 'slate-react';
import './types';
import { CustomDescendant, CustomElement, CustomText } from './types';

declare module 'slate-react' {
	export function withReact<T extends BaseEditor>(editor: T): T & ReactEditor;
}

const initialValue: (CustomElement | CustomText)[] = [
	{
		type: 'paragraph',
		children: [{ text: 'A line of text in a paragraph.' }],
	},
];

export default function () {
	const editor = useMemo(
		() => (withReact as <T extends BaseEditor>(editor: T) => T & ReactEditor)(createEditor()),
		[]
	);
	const [value, setValue] = useState<CustomDescendant[]>(initialValue);

	const renderElement = useCallback(({ attributes, children, element }) => {
		switch (element.type) {
			case 'code':
				return <code {...attributes}>{children}</code>;
			case 'quote':
				return <blockquote {...attributes}>{children}</blockquote>;
			case 'link':
				return (
					<a {...attributes} href={element.url}>
						{children}
					</a>
				);
			default:
				return <p {...attributes}>{children}</p>;
		}
	}, []);

	return (
		<Slate
			editor={editor}
			value={value}
			onChange={(value) => {
				console.log(value);
				setValue(value as CustomDescendant[]);
			}}
		>
			<Editable
				renderElement={renderElement}
				onKeyDown={(event) => {
					if (event.key === '`' && event.ctrlKey) {
						event.preventDefault();
						// const { selection } = editor;
						const [match] = Editor.nodes(editor, {
							match: (n) => Element.isElement(n) && n.type === 'code',
						});
						Transforms.setNodes(
							editor,
							{ type: match ? 'paragraph' : 'code' },
							{ match: (n) => Editor.isBlock(editor, n) }
						);
					}
				}}
			/>
		</Slate>
	);
}
