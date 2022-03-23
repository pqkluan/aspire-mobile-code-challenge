import { Text } from 'native-base';
import type { FC } from 'react';
import React from 'react';

type Props = React.ComponentProps<typeof Text>;

const Title: FC<Props> = (props) => {
	const { children, ...otherProps } = props;

	return (
		<Text color={'white'} fontSize={'2xl'} fontWeight={'bold'} marginLeft={'2'} {...otherProps}>
			{children}
		</Text>
	);
};

export default Title;
