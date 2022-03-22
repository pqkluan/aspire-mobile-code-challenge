import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';

type Props = React.PropsWithChildren<{}>;
type State = { hasError: boolean };

export class ErrorBoundary extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch(error: any, errorInfo: any): void {
		console.error(error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return <Status500 />;
		}
		return this.props.children;
	}
}

function Status500(): JSX.Element {
	return (
		<>
			<StatusBar backgroundColor={'#FFFFFF'} barStyle={'dark-content'} />

			<View style={styles.container}>
				<Text style={styles.title}>{'Something went wrong'}</Text>
				<Text style={styles.desc}>{'An unexpected issue has occurred.'}</Text>
				<Text style={styles.desc}>{'Please try to restart the application'}</Text>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		paddingHorizontal: 24,
	},
	title: {
		fontSize: 18,
		fontWeight: '700',
		textAlign: 'center',
	},
	desc: {
		fontSize: 13,
		marginTop: 8,
		textAlign: 'center',
	},
});
