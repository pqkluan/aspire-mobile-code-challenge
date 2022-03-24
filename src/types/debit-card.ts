type SupportCurrency = 'SGD';
type SupportBrand = 'VISA';

type CardholderData = {
	brand: SupportBrand;
	cardholderName: string;
	cardValidationCode: string;
	PAN: string;
	expirationDate: string;
};

export type { SupportCurrency, SupportBrand, CardholderData };
