import { ChangeEvent, Dispatch, EventHandler, SetStateAction } from 'react';

export type SetState<T> = Dispatch<SetStateAction<T>>;

export type TextFieldChangeEvent = ChangeEvent<
	HTMLTextAreaElement | HTMLInputElement
>;
export type OnTextFieldChange = EventHandler<
	ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
>;
