import { CommandHandler, InputCommandTree } from './types';
import { CommandTree } from './CommandNode';

export function isCommandHandler(
	x: CommandTree | CommandHandler | InputCommandTree
): x is CommandHandler {
	return typeof x === 'function';
}

export function isCommandTree(
	x: CommandTree | CommandHandler | InputCommandTree
): x is CommandHandler {
	return x instanceof CommandTree;
}

export function isInputCommandTree(
	x: CommandTree | CommandHandler | InputCommandTree
): x is CommandHandler {
	return !isCommandTree(x) && !isCommandHandler(x);
}
