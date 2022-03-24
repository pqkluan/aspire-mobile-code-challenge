import type { Server } from 'miragejs';
import { Response, createServer } from 'miragejs';

const server: Server = (window as any).server;
if (server) server.shutdown();

let cache = {
	spendingLimitAmount: 0,
	spendingLimitEnabled: false,
};

(window as any).server = createServer({
	routes() {
		this.get(
			'/api/debit',
			() => {
				return {
					balanceAmount: 3000,
					currency: 'SGD',
					cardData: {
						brand: 'VISA',
						cardholderName: 'Mark Henry',
						expirationDate: '12/20',
						cardValidationCode: '456',
						PAN: '5647 3411 2413 2020',
					},
					spentAmount: 345,
					spendingLimitAmount: cache.spendingLimitAmount,
					spendingLimitEnabled: cache.spendingLimitEnabled,
				};
			},
			{ timing: 1000 },
		);

		this.post('/api/spending-limit', (_, request) => {
			const data = JSON.parse(request.requestBody);

			if (typeof data.spendingLimitAmount !== 'number') {
				return new Response(
					400,
					{ some: 'header' },
					{ errors: ['spendingLimitAmount is missing'] },
				);
			}

			cache.spendingLimitAmount = data.spendingLimitAmount;
			cache.spendingLimitEnabled = true;
			return new Response(200);
		});

		this.delete('/api/spending-limit', () => {
			cache.spendingLimitEnabled = false;
			return new Response(200);
		});
	},
});
