import type { FC } from 'react';
import type { SvgProps } from 'react-native-svg';

import type { HomeParamList } from '~/navigation';

import Credit from './credit.svg';
import DebitCard from './debit-card.svg';
import Home from './home.svg';
import Payments from './payments.svg';
import Profile from './profile.svg';

type ScreenNames = keyof HomeParamList;

const BottomTabSVGs: Record<ScreenNames, FC<SvgProps>> = {
	Home,
	DebitCard,
	Payments,
	Credit,
	Profile,
};

export default BottomTabSVGs;
