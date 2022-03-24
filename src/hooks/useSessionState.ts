import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectors } from '~/redux';

export default function useSessionState(...params: string[]): { loading: boolean; error?: string } {
	const actualKey = useMemo<string>(() => params.filter((e) => !!e).join('/'), [params]);
	const selectLoading = useMemo(() => selectors.session.loading(actualKey), [actualKey]);
	const selectError = useMemo(() => selectors.session.error(actualKey), [actualKey]);

	return {
		loading: !!useSelector(selectLoading),
		error: useSelector(selectError),
	};
}
