import { createNavigationContainerRef } from '@react-navigation/native';
import type { ComponentProps, FC } from 'react';
import React from 'react';

import { ScreenWrap } from './ScreenWrap/ScreenWrap';
import type { HomeParamList, RootParamList, ScreenName, ScreenProps } from './types';

/**
 * For navigating from non-UI context
 * https://reactnavigation.org/docs/navigating-without-navigation-prop/
 */
const navigationRef = createNavigationContainerRef<RootParamList>();

/**
 * Utility function to help create screen component by strong type screen props
 *
 * @param name The name of the screen, excludes the navigator(s)
 * @param FC
 * @returns
 */
function createScreen<T extends ScreenName, P = ScreenProps<T>>(
	name: T,
	FC: FC<P>,
	options: ComponentProps<typeof ScreenWrap> = {},
): FC<P> & { displayName: T } {
	const HOC = (props: P) => (
		<ScreenWrap {...options}>
			<FC {...props} />
		</ScreenWrap>
	);
	HOC.displayName = name;
	return HOC;
}

export { navigationRef, createScreen };
export type { HomeParamList, RootParamList };
