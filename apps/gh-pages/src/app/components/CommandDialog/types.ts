export type CommandHandler = () => void;
export type CommandHandlers = Record<string, CommandHandler>;

export interface CommandDialogProps<T extends CommandHandlers> {
	commands: T;
}

export interface TextFieldDialogProps {
	open: boolean;
	onClose: () => void;
	onSubmit: (value: string) => void;
}
