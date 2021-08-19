import { useEffect } from 'react';

export interface UseScriptOptions {
	onLoad?: (ev: Event) => void;
}

export default function useScript(src: string, options?: UseScriptOptions) {
	useEffect(() => {
		const script = document.createElement('script');
		script.src = src;
		script.async = true;
		script.onload = options?.onLoad ?? null;
		document.body.appendChild(script);
		return () => {
			document.body.removeChild(script);
		};
	}, []);
}
