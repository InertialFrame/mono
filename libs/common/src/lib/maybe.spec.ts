import { isDefined } from '@inertial-frame/common';

describe('type-guard: isDefined', () => {
	test('null->false', () => {
		expect(isDefined(null)).toBeFalsy();
	});
	test('undefined->false', () => {
		expect(isDefined(null)).toBeFalsy();
	});
	test('""->true', () => {
		expect(isDefined('')).toBeTruthy();
	});
	test('[]->true', () => {
		expect(isDefined([])).toBeTruthy();
	});
	test('{}->true', () => {
		expect(isDefined({})).toBeTruthy();
	});
	test('0->true', () => {
		expect(isDefined(0)).toBeTruthy();
	});
	test('(()=>void)->true', () => {
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		expect(isDefined(() => {})).toBeTruthy();
	});
});
