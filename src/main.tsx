import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { ChakraProvider } from '@chakra-ui/react'
import { ApolloProvider } from '@apollo/client'
import { ApolloServer } from './lib/apollo'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={ApolloServer}>
    <ChakraProvider>
    <App />
    </ChakraProvider>
    </ApolloProvider>
  </React.StrictMode>
)
