import React, { useEffect, useState } from 'react';
import { CommandDialogProps, CommandHandlers } from './types';
import { SetState } from '../../types/react';
import TextFieldDialog from './TextFieldDialog';

export function CommandDialog<T extends CommandHandlers>(
	props: CommandDialogProps<T>
) {
	const [open, setOpen] = useState(false);
	useOpenOnKeyPress('/', setOpen);

	const onClose = () => setOpen(false);
	const onSubmit = (command: string) => {
		const handler = props.commands[command];
		if (!handler) {
			return console.warn(`[IF] Command not found: '${command}'`);
		}
		handler();
	};

	if (!open) return null;
	return <TextFieldDialog open={open} onSubmit={onSubmit} onClose={onClose} />;
}

function useOpenOnKeyPress(key: string, setOpen: SetState<boolean>) {
	useEffect(() => {
		const handler = (event: KeyboardEvent) => {
			if (event.key === key) {
				setOpen(true);
				event.preventDefault();
			}
		};
		window.addEventListener('keypress', handler);
		return () => window.removeEventListener('keypress', handler);
	}, [key]);
}
