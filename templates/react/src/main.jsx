import { RadixDappToolkit, RadixNetwork } from '@radixdlt/radix-dapp-toolkit'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RdtProvider } from './RdtProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RdtProvider value={
      RadixDappToolkit({
        dAppDefinitionAddress: 'account_tdx_2_12yea7979c8e87zwsnx2pu53g67qruemy7ur2vsg8445l3fwgxly78q',
        networkId: RadixNetwork.Stokenet, // network ID 2 is for the stokenet test network, network ID 1 is for mainnet
        applicationName: 'Hello Scrypto dApp',
        applicationVersion: '1.0.0',
      })
    }>
      <App />
    </RdtProvider>
  </React.StrictMode>,
)
