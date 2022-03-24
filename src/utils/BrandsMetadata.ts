import ComponentSVGs from '~/svg/components';

const BrandsMetadata = {
	VISA: {
		SVGComponent: ComponentSVGs.VisaLogo,
		cardValidationCodeTerm: 'CVV',
	},
	// more brand metadata...
} as const;

export default BrandsMetadata;
