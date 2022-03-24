type Options = { locales?: string | string[] } & Intl.NumberFormatOptions;

/**
 *
 * @param value number you want to format. Ex: 2500
 * @returns formatted string of said number. Ex: 2,500
 */
export default function formatNumber(value: number, options: Options = {}): string {
	// It'll be even better if we use device locale
	const {
		locales = 'en-SG',
		minimumFractionDigits = 0,
		maximumFractionDigits = 0,
		...otherOptions
	} = options;

	const formatter = new Intl.NumberFormat(locales, {
		maximumFractionDigits,
		minimumFractionDigits,
		...otherOptions,
	});
	return formatter.format(value);
}
