## Using this template to scaffold a new project
You will need to have degit installed globally, to do this run `npm install -g degit`
For more info on degit you can check the project's github [here](https://github.com/Rich-Harris/degit)

Once you have degit installed you can simply run `degit radixdlt/create-scrypto-dapp` to scaffold a new project.

You may also pass a name argument if you would like a parent directory to be created such as `degit radixdlt/create-scrypto-dapp my-dapp`

You should now have inside your project directory two folders client & scrypto.

Within you project workspace directory to install dependencies and start the dev server:
``` 
cd client
npm install
npm run dev
```

From your project workspace directory navigate a terminal to the scrypto project and build the scrypto project:
```
cd scrypto
scrypto build
```

> This Template Was Created By Following The Steps Outlined Below

## Generate a Vite client project for the frontend

`npm create vite@latest client`

Following the prompts:

Choose a framework > Vanilla

> You can of course choose another option at this point to use your favorite framework

Select a variant > Javascript

> Again choose your preference

Now you can run the commands below to start your frontend with a dev server

`cd client`

`npm install`

`npm run dev`

#### Install the Radix dApp Toolkit

In the client directory (or whatever you named your front end project in the vite command)

`npm install @radixdlt/radix-dapp-toolkit`

Add the `<radix-connect-button />` element in your HTML code and instantiate `RadixDappToolkit`.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script type="module" src="/bundle.js"></script>
  </head>
  <body>
    <radix-connect-button />
  </body>
</html>
```

In your javascript instantiate `RadixDappToolkit`

```javascript
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
```

## Generate a scrypto package

`scrypto new-package hello_scrypto`

> You can name your package whatever you like I have chosen to pass scrypto which will result in a folder named "scrypto" to be created at the root of my workspace folder.

You should now have inside your project directory two folders client & hello_scrypto.

`cd hello_scrypto` then run `scrypto build` this will build out your blueprint package

`cd client` then run `npm i` to install dependencies `npm run dev` to start the development server.
