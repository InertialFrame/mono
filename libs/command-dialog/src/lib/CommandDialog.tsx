import React, { useEffect, useState } from 'react';
import { CommandDialogProps, InputCommandTree } from './types';
import TextFieldDialog from './components/TextFieldDialog';
import { CommandTree } from './command-tree';
import { SetState } from '@inertial-frame/common';

export function CommandDialog<T extends InputCommandTree>(
	props: CommandDialogProps<T>
) {
	const [open, setOpen] = useState(false);
	const [commandTree] = useState(() => new CommandTree(props.commands));

	useOpenOnKeyPress('/', open, setOpen);

	const onClose = () => setOpen(false);

	const onSubmit = (command: string) => {
		const ok = commandTree.call(command);
		if (!ok) {
			return console.warn(`[IF] Command not found: '${command}'`);
			// todo: display graphical alert https://material-ui.com/components/alert/
		}
	};

	if (!open) return null;
	return <TextFieldDialog open={open} onSubmit={onSubmit} onClose={onClose} />;
}

function useOpenOnKeyPress(
	key: string,
	open: boolean,
	setOpen: SetState<boolean>
) {
	useEffect(() => {
		if (open) return;
		const handler = (event: KeyboardEvent) => {
			if (event.key === key) {
				setOpen(true);
				event.preventDefault();
			}
		};
		window.addEventListener('keypress', handler);
		return () => window.removeEventListener('keypress', handler);
	}, [key, open, setOpen]);
}
