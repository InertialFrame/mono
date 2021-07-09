import React from 'react';

export function createContext<State>(
	contextName: string,
	defaultValue: State | null = null
) {
	const context = React.createContext<State | null>(defaultValue);

	return {
		ContextProvider: context.Provider,
		useContext: (): State => {
			const value = React.useContext(context);
			if (!value) {
				throw new Error(
					`use${contextName} can only be called in descendant of ${contextName}.Provider`
				);
			}
			return value;
		},
	};
}
