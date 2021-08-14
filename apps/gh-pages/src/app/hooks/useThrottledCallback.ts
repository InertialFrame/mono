import { useCallback, useEffect, useState } from 'react';
import { BehaviorSubject } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

type Callback<T> = (v: T) => void;

/**
 * Return a function that will be a no-op until some duration after the previous call.
 * @param fn The function to be throttled.
 * @param duration The length of time the callback will be a no-op
 */
export default function useThrottledCallback<T>(fn: Callback<T>, duration: number): Callback<T> {
	const [subject] = useState(() => new BehaviorSubject<T | null>(null));

	const [subscription] = useState(() => {
		return subject.pipe(throttleTime(duration)).subscribe((v) => v && fn(v));
	});

	useEffect(() => subscription.unsubscribe, []);

	return useCallback((v: T) => {
		subject.next(v);
	}, []);
}
