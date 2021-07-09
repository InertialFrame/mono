import { CommandHandler, InputCommandTree } from './types';
import { isCommandHandler } from './guards';
import { Maybe } from '@inertial-frame/common';

interface Nodes {
	[word: string]: Maybe<CommandTree | CommandHandler>;
}

export class CommandTree {
	private readonly nodes: Nodes;

	constructor(inputCommands: InputCommandTree) {
		function createCommandTreeOrCommandHandler(
			input: InputCommandTree | CommandHandler
		): CommandTree | CommandHandler {
			if (isCommandHandler(input)) return input;
			return new CommandTree(input);
		}

		this.nodes = Object.keys(inputCommands).reduce<Nodes>(
			(acc: Nodes, key: string & keyof Nodes): Nodes => {
				const currentNode = inputCommands[key];
				return {
					...acc,
					[key]: createCommandTreeOrCommandHandler(currentNode),
				};
			},
			{}
		);
	}

	call(command: string): boolean {
		return this.innerCall(command.split(' '), 0);
	}

	private innerCall(words: string[], currentPosition: number): boolean {
		if (currentPosition === words.length) {
			return false;
		}

		const currentWord = words[currentPosition];
		const maybeCommand = this.nodes[currentWord];
		if (!maybeCommand) {
			return false;
		}

		if (isCommandHandler(maybeCommand)) {
			maybeCommand();
			return true;
		} else {
			return maybeCommand.innerCall(words, currentPosition + 1);
		}
	}
}
