import { Maybe } from '../../utils/maybe';

export type CommandHandler = () => unknown;

export type InputCommandTree = {
	[word: string]: InputCommandTree | CommandHandler;
};

export interface CommandDialogProps<T extends InputCommandTree> {
	commands: T;
}

export interface TextFieldDialogProps {
	open: boolean;
	onClose: () => void;
	onSubmit: (value: string) => void;
}
