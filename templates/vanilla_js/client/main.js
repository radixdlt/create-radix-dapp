import './style.css'
import scryptoLogo from './scryptoLogo.png'
import { RadixDappToolkit, DataRequestBuilder, RadixNetwork } from '@radixdlt/radix-dapp-toolkit'


document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://docs.radixdlt.com" target="_blank">
      <img src="${scryptoLogo}" class="logo vanilla" alt="Scrypto logo" />
    </a>
    <h1>Hello Scrypto!</h1>  
    <p class="read-the-docs">
      Click on the Scrypto logo to learn more
    </p>
    <div class="card">
      <radix-connect-button />
    </ div>  
  </div>
`

// You can create a dApp definition in the dev console at https://stokenet-console.radixdlt.com/dapp-metadata 
// then use that account for your dAppId
const dAppId = 'account_tdx_2_12yea7979c8e87zwsnx2pu53g67qruemy7ur2vsg8445l3fwgxly78q'
// Instantiate DappToolkit
const rdt = RadixDappToolkit({
  dAppDefinitionAddress: dAppId,
  networkId: RadixNetwork.Stokenet, // network ID 2 is for the stokenet test network, network ID 1 is for mainnet
  applicationName: 'Hello Scrypto dApp',
  applicationVersion: '1.0.0',
})
console.log("dApp Toolkit: ", rdt)

// ************ Fetch the user's account address ************
rdt.walletApi.setRequestData(DataRequestBuilder.accounts().atLeast(1))
// Subscribe to updates to the user's shared wallet data
rdt.walletApi.walletData$.subscribe((walletData) => {
  console.log("subscription wallet data: ", walletData)
})
