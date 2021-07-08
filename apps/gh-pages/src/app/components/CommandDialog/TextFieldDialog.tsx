import { TextFieldDialogProps } from './types';
import React, { useState, KeyboardEvent } from 'react';
import { TextFieldChangeEvent } from '../../types/react';
import isKeyPress from '../../guards/isKeyPress';
import { Box, Dialog, makeStyles, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	container: {},
	textField: {
		'& input': {
			padding: theme.spacing(1),
		},
	},
}));

export default function TextFieldDialog(props: TextFieldDialogProps) {
	const classes = useStyles();
	const [value, setValue] = useState('');

	const onChange = (event: TextFieldChangeEvent) =>
		setValue(event.target.value);

	const onKeyPress = (event: KeyboardEvent) => {
		if (isKeyPress(event)) {
			switch (event.key) {
				case 'Enter':
					props.onSubmit(value);
					props.onClose();
					break;
				case 'Esc':
				case 'Escape':
					props.onClose();
			}
		}
	};

	return (
		<Dialog
			onClose={props.onClose}
			aria-labelledby="simple-dialog-title"
			open={props.open}
		>
			<Box className={classes.container}>
				<TextField
					value={value}
					onKeyPress={onKeyPress}
					onChange={onChange}
					className={classes.textField}
					variant={'outlined'}
					autoFocus
					onBlur={props.onClose}
				/>
			</Box>
		</Dialog>
	);
}
