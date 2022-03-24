import formatNumber from './formatNumber';

describe('formatNumber', () => {
	test.each([
		[345, '345'],
		[3000, '3,000'],
		[5000, '5,000'],
		[10000, '10,000'],
		[20000, '20,000'],
	])('should format %i to %s)', (input, expected) => {
		expect(formatNumber(input)).toBe(expected);
	});
});
