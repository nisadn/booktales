import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import customTheme from '../styles/theme'
import { useRef } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { store } from '../redux/store'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

let persistor = persistStore(store);

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = useRef(new QueryClient());

  return <Provider store={store}>
    <PersistGate persistor={persistor}>
      <QueryClientProvider client={queryClient.current}>
          <ChakraProvider theme={customTheme}>
            <Component {...pageProps} />
          </ChakraProvider>
      </QueryClientProvider>
    </PersistGate>
  </Provider>
}

export default MyApp
