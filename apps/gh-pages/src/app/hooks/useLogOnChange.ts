import { DependencyList, useEffect } from 'react';

export default function useLogOnChange(
	deps: DependencyList,
	...args: unknown[]
) {
	useEffect(() => {
		console.log(...args);
	}, deps);
}
