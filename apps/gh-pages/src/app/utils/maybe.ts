export type Maybe<T> = T | null | undefined;

export function isDefined<T>(input: Maybe<T>): input is T {
	return input !== null && input !== undefined;
}
