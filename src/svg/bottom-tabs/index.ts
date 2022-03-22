import { SvgProps } from 'react-native-svg';
import { FC } from 'react';

import { HomeParamList } from '~/navigation';

import Home from './home.svg';
import DebitCard from './debit-card.svg';
import Payments from './payments.svg';
import Credit from './credit.svg';
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
