import React from 'react';

export function isKeyPress(
	event: Event | React.SyntheticEvent
): event is KeyboardEvent {
	const nativeEvent = 'nativeEvent' in event ? event.nativeEvent : event;
	return (
		nativeEvent instanceof KeyboardEvent && nativeEvent.type === 'keypress'
	);
}
