export type CommandHandler = () => unknown;

export type InputCommandTree = {
	[word: string]: InputCommandTree | CommandHandler;
};

export interface CommandDialogProps<T extends InputCommandTree> {
	commands: T;
}
