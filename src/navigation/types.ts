/**
 * This file contains types for navigation.
 *
 * The technique used in this file is based on instruction at:
 * https://reactnavigation.org/docs/typescript/
 */

import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NavigatorScreenParams, CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

//#region Declare screens params

type HomeParamList = {
	Home: undefined;
	DebitCard: undefined;
	Payments: undefined;
	Credit: undefined;
	Profile: undefined;
};

type RootParamList = {
	HomeRoot: NavigatorScreenParams<HomeParamList>;
	DebitSpendingLimit?: { defaultAmount?: number };
	// More screens at root navigator
};

type HomeStackKeys = keyof HomeParamList;
type RootStackKeys = keyof RootParamList;

/**
 * Union type of all screen names but navigators
 */
type ScreenName = Exclude<HomeStackKeys | RootStackKeys, 'HomeRoot'>;

//#endregion

//#region Declare navigators hierarchy

type PropsOfRootNavigatorRoute<T extends RootStackKeys> = NativeStackScreenProps<RootParamList, T>;

type PropsOfHomeRoute<T extends keyof HomeParamList> = CompositeScreenProps<
	NativeStackScreenProps<RootParamList>,
	BottomTabScreenProps<HomeParamList, T>
>;

//#endregion

/**
 * Extract screen props by screen name
 */
type ScreenProps<T extends ScreenName> = T extends RootStackKeys
	? PropsOfRootNavigatorRoute<T>
	: T extends HomeStackKeys
	? PropsOfHomeRoute<T>
	: never;

export type { HomeParamList, RootParamList, ScreenName, ScreenProps };
