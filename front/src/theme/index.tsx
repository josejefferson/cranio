import React from "react";
import {
	ChakraProvider,
	cookieStorageManager,
	localStorageManager,
} from '@chakra-ui/react'
import theme from '../styles/theme'
// import { ChakraProps } from '@/utils/types'
type ChakraProps = {
	children?: React.ReactNode;
	cookies?: string;
}
export function Chakra({ cookies, children }: ChakraProps) {
	const colorModeManager =
		typeof cookies === 'string'
			? cookieStorageManager(cookies)
			: localStorageManager
	return (
		<ChakraProvider colorModeManager={colorModeManager} resetCSS theme={theme}>
			{children}
		</ChakraProvider>
	)
}

export function getServerSideProps({ req }: any) {
	return {
		props: {
			cookies: req.headers.cookie ?? '',
		},
	}
}