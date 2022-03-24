import * as R from 'ramda';

export function createSelectorCache<S, R>(selector: (state: S, id: string) => R) {
	const _cache: Record<string, (state: S) => R> = {} as any;
	const noop = (): R => undefined as unknown as R;

	return (id?: string) => {
		if (typeof id !== 'string') return noop;
		if (typeof _cache[id] !== 'function') _cache[id] = R.partialRight(selector, [id]);
		return _cache[id];
	};
}
