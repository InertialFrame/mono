import { Descendant } from 'slate';

export type CustomElement = {
	type: string;
	children: Descendant[];
};

export type CustomText = {
	type: undefined;
	text: string;
};

export type CustomDescendant = CustomElement | CustomText;

declare module 'slate' {
	interface CustomTypes {
		Element: CustomElement;
	}
}
