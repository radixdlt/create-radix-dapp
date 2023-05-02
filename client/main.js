// import './style.css'
import scryptoLogo from './scryptoLogo.png'
import { 
  RadixDappToolkit, 
  // ManifestBuilder,
  Decimal,
  Bucket,
  Expression,
  Address,
  ongoingAccounts
 } from "@radixdlt/radix-dapp-toolkit";
import { 
  RadixEngineToolkit,
  NetworkId,
  NotarizedTransaction,
  PublicKey,
  PrivateKey,
  Signature,
  SignatureWithPublicKey, 
  ManifestBuilder, 
  ManifestAstValue, 
  ManifestSborValue, 
  TransactionBuilder, 
  TransactionHeader,
  TransactionManifest,
  ValidationConfig,
  generateRandomNonce,
  InstructionList, 
} from '@radixdlt/radix-engine-toolkit'


// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="/vite.svg" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${scryptoLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Scrypto!</h1>
//     <div class="card">
//       <radix-connect-button />
//     </div>
//     <p class="read-the-docs">
//       Click on the Scrypto logo to learn more
//     </p>
//   </div>
// `

const dAppId = 'account_tdx_c_1pyu3svm9a63wlv6qyjuns98qjsnus0pzan68mjq2hatqejq9fr'

const rdt = RadixDappToolkit(
  { dAppDefinitionAddress: dAppId, dAppName: 'GumballMachine' },
  (requestData) => {
    requestData({
      accounts: { quantifier: 'atLeast', quantity: 1 },
    }).map(({ data: { accounts } }) => {
      // add accounts to dApp application state
      console.log("account data: ", accounts)
      document.getElementById('accountName').innerText = accounts[0].label
      document.getElementById('accountAddress').innerText = accounts[0].address
      accountAddress = accounts[0].address
    })
  },
  {
    networkId: 12, // 12 is for RCnet 01 for Mainnet
    onDisconnect: () => {
      // clear your application state
    },
    onInit: ({ accounts }) => {
      // set your initial application state
      console.log("onInit accounts: ", accounts)
      if (accounts.length > 0) {
        document.getElementById('accountName').innerText = accounts[0].label
        document.getElementById('accountAddress').innerText = accounts[0].address
        accountAddress = accounts[0].address
      }
    },
  }
)

console.log("dApp Toolkit: ", rdt)

import { TransactionApi, StateApi, StatusApi, StreamApi } from "@radixdlt/babylon-gateway-api-sdk";


const transactionApi = new TransactionApi();
const stateApi = new StateApi();
const statusApi = new StatusApi();
const streamApi = new StreamApi();

let accountAddress // User account address
let componentAddress = "component_tdx_c_1qdqsjrkdklx0a880vjf3q4n3cvf2x2nhgdjguk8cg42s34477x" 
let resourceAddress // GUM resource address
let packageAddress = "package_tdx_c_1qqfz89uh504w4ua0nvgx8ewel5jrp05glmdsggmyng5sldy63w"
let tokenAAddress = "resource_tdx_c_1q8hgm0gdvrmffxytefwkm4ruarmjczp3syhuukc3n5tq32jlpq"
let tokenBAddress = "resource_tdx_c_1qyqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq40v2wv"
let tokenAAmount = "10"
let tokenBAmount = "10"
let swapFee = "0.02"
let xrdAddress = "resource_tdx_c_1qyqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq40v2wv"
let poolunitsAddress = "resource_tdx_c_1q83fknuu5g60rmu95xchgwzn7yaexexq5kclkqeesk3s3v2a6d"


// document.getElementById('testTransaction').onclick = async function () {
//   let test_manifest = new ManifestBuilder()
//   .callMethod(
//     accountAddress,
//     "withdraw",
//     [
//       new ManifestAstValue.Address(
//         xrdAddress
//       ),
//       new ManifestAstValue.Decimal(10),
//     ]
//   )
//   .takeFromWorktop(
//     xrdAddress,
//     (builder, bucket) =>
//       builder.callMethod(
//         accountAddress,
//         "deposit",
//         [bucket]
//       )
//   )
//   .build();

//   console.log((
//     await test_manifest.convert(
//       InstructionList.Kind.String,
//       NetworkId.RCnetV1
//     )
//   ).instructions.value)

//   let converted_manifest = await test_manifest.convert(
//     InstructionList.Kind.String,
//     NetworkId.RCnetV1
//   )

//   let string_converted_manifest = converted_manifest.instructions.value;

//   // let converted_manifest = await test_manifest.convert(
//   //   InstructionList.Kind.String,
//   //   NetworkId.RCnetV1
//   // );

//   console.log("Converted Manifest: ", string_converted_manifest)




  // let formatted = test_convert.split('\n')
  //   .map(line => '  ' + line.trim())
  //   .join('\n');

  // console.log("formatted: ", formatted)

  // Send manifest to extension for signing
//   const result = await rdt
//     .sendTransaction({
//       transactionManifest: string_converted_manifest,
//       version: 1,
//     })

// if (result.isErr()) throw result.error

// }

document.getElementById('createToken').onclick = async function () {
  
  let manifest = new ManifestBuilder()
  .createFungibleResourceWithInitialSupply(
    new ManifestAstValue.U8(18),
    new ManifestAstValue.Map(
      ManifestAstValue.Kind.String,
      ManifestAstValue.Kind.String,
      []
    ),
    new ManifestAstValue.Map(
      ManifestAstValue.Kind.Enum,
      ManifestAstValue.Kind.Tuple,
      []
    ),
    new ManifestAstValue.Decimal(1000)
  )
  .callMethod(accountAddress, "deposit_batch", [
    ManifestAstValue.Expression.entireWorktop()
  ])
  .build();

let converted_manifest = await manifest.convert(
  InstructionList.Kind.String,
  NetworkId.RCnetV1
);

console.log("Conversion: ", converted_manifest)

let string_converted_manifest = converted_manifest.instructions.value;

console.log("Create Token Manifest: ", string_converted_manifest)

// Send manifest to extension for signing
const result = await rdt
  .sendTransaction({
    transactionManifest: string_converted_manifest,
    version: 1,
  })

if (result.isErr()) throw result.error

console.log("Intantiate WalletSDK Result: ", result.value)

// // ************ Fetch the transaction status from the Gateway API ************
// let status = await transactionApi.transactionStatus({
//   transactionStatusRequest: {
//     intent_hash_hex: result.value.transactionIntentHash
//   }
// });
// console.log('Instantiate TransactionApi transaction/status:', status)

// // ************ Fetch component address from gateway api and set componentAddress variable **************
// let commitReceipt = await transactionApi.transactionCommittedDetails({
//   transactionCommittedDetailsRequest: {
//     intent_hash_hex: result.value.transactionIntentHash
//   }
// })
// console.log('Instantiate Committed Details Receipt', commitReceipt)
// new_token = commitReceipt.details.referenced_global_entities[0];
//   document.getElementById('newTokenAddress').innerText = new_token;

}

// document.getElementById('submit').onclick = async function () {
//   // let fungibles: FungibleResourcesCollectionItem[] = []
//   let accountState = await stateApi.stateEntityDetails({
//     stateEntityDetailsRequest: {
//       addresses: [accountAddress]
//     }
//   })

//   // accountState.items[0].fungible_resources?.items.forEach(item => fungibles.push(item))
//   // console.log(accountState.items[0].fungible_resources?.items[0].resource_address)
//   console.log(accountState.items[0].fungible_resources?.items.forEach(item => fungibles.push(item)))
// }



window.onload = async function fetchData() {
  var fungibles = [];

  let accountState = await stateApi.stateEntityDetails({
    stateEntityDetailsRequest: {
      addresses: [accountAddress]
    }
  })
  
  accountState.items[0].fungible_resources?.items.forEach(item => fungibles.push(item))

  // console.log(fungibles)

  const fungibles_string = [];

  let i = 0;

  while (i < fungibles.length) {
    let fungible_string = fungibles[i].resource_address;
    fungibles_string.push(fungible_string);
    i++;
  }

  console.log("Array of Fungibles in a String: ", fungibles_string)

  var select = document.createElement("select");

  var selectTokenA = document.getElementById("selectTokenA");
  var selectTokenB = document.getElementById("selectTokenB");

  for (const val of fungibles_string)
  {
      var option = document.createElement("option");
      option.value = val;
      option.text = val.charAt(0).toUpperCase() + val.slice(1);
      select.appendChild(option);
      selectTokenA.appendChild(option.cloneNode(true));
      selectTokenB.appendChild(option.cloneNode(true));
  }

}

let tokenAMetadata = await stateApi.entityMetadataPage({
  stateEntityMetadataPageRequest: {
    address: tokenAAddress
  }
})



console.log("Token A Metadata: ", tokenAMetadata)

let metadata = tokenAMetadata.items[2].value.as_string;

console.log("Metadata: ", metadata)

// Retrieves TokenPair
async function loadTokenPair() {

  let tokenAMetadata = await stateApi.entityMetadataPage({
    stateEntityMetadataPageRequest: {
      address: [tokenAAddress]
    }
  })

  console.log("Token A Metadata: ", tokenAMetadata)

  let token_pair = []

  token_pair.push(tokenAAddress);
  token_pair.push(tokenBAddress);
  
  var select = document.createElement("select");

  var swapDropDown = document.getElementById("swapDropDown");
  var exactSwapDropDown = document.getElementById("exactSwapDropDown");
  
  for (const val of token_pair)
  {
      var option = document.createElement("option");
      option.value = val;
      option.text = val.charAt(0) + val.slice(1);
      select.appendChild(option);
      swapDropDown.appendChild(option.cloneNode(true));
      exactSwapDropDown.appendChild(option.cloneNode(true));
  }
  
}

let token_pair = []

token_pair.push(tokenAAddress);
token_pair.push(tokenBAddress);

var select = document.createElement("select");

var swapDropDown = document.getElementById("swapDropDown");
var exactSwapDropDown = document.getElementById("exactSwapDropDown");

for (const val of token_pair)
{
    var option = document.createElement("option");
    option.value = val;
    option.text = val.charAt(0) + val.slice(1);
    select.appendChild(option);
    swapDropDown.appendChild(option.cloneNode(true));
    exactSwapDropDown.appendChild(option.cloneNode(true));
}


// ************ Instantiate component and fetch component and resource addresses *************
document.getElementById('instantiateComponent').onclick = async function () {
  // let packageAddress = document.getElementById("packageAddress").value;
  // let tokenAAddress = document.getElementById("selectTokenA").value;
  // let tokenAAmount = document.getElementById("amountA").value;
  // let tokenBAddress = document.getElementById("selectTokenB").value;
  // let tokenBAmount = document.getElementById("amountB").value;
  // let swapFee = document.getElementById("swapFee").value;

  console.log("Package Address - Instantiate: ", packageAddress)
  console.log("Token A - Instantiate: ", tokenAAddress)
  console.log("Token B - Instantiate: ", tokenBAddress)
  console.log("Token A Amount - Instantiate: ", tokenAAmount)
  console.log("Token B Amount - Instantiate: ", tokenBAmount)
  console.log("Swap Fee - Instantiate: ", swapFee)

  let manifest = new ManifestBuilder()
    .callMethod(
      accountAddress,
      "withdraw",
      [
        new ManifestAstValue.Address(tokenAAddress),
        new ManifestAstValue.Decimal(tokenBAmount),
      ]
    )    
    .callMethod(
      accountAddress,
      "withdraw", 
      [
      new ManifestAstValue.Address(tokenBAddress),
      new ManifestAstValue.Decimal(tokenBAmount)
      ]
    )
    .takeFromWorktop(
      tokenAAddress,
      (builder, tokenABucket) =>
      builder.takeFromWorktop(
        tokenBAddress,
        (builder, tokenBBucket) =>
        builder.callFunction(
          packageAddress,
          "Radiswap",
          "instantiate_radiswap",
          [
            tokenABucket,
            tokenBBucket,
            new ManifestAstValue.Decimal("0.02")
          ]
        )
      )
    )
    .callMethod(
      accountAddress,
      "deposit_batch",[
      ManifestAstValue.Expression.entireWorktop()
      ]
    )
    .build();

  console.log("Manifest ", manifest)

  let test_manifest = manifest.instructions.value;

  console.log("Instantiate Manifest: ", test_manifest)

  let converted_manifest = await manifest.convert(
    InstructionList.Kind.String,
    NetworkId.RCnetV1
  );
  
  console.log("Conversion: ", converted_manifest)
  
  let string_converted_manifest = converted_manifest.instructions.value;
          
  console.log("Instantiate Manifest: ", string_converted_manifest)
  // Send manifest to extension for signing
  const result = await rdt
    .sendTransaction({
      transactionManifest: string_converted_manifest,
      version: 1,
    })

  if (result.isErr()) throw result.error

  // console.log("Intantiate WalletSDK Result: ", result.value)

  // // ************ Fetch the transaction status from the Gateway API ************
  // let status = await transactionApi.transactionStatus({
  //   transactionStatusRequest: {
  //     intent_hash_hex: result.value.transactionIntentHash
  //   }
  // });
  // console.log('Instantiate TransactionApi transaction/status:', status)

  // // ************ Fetch component address from gateway api and set componentAddress variable **************
  // let commitReceipt = await transactionApi.transactionCommittedDetails({
  //   transactionCommittedDetailsRequest: {
  //     intent_hash_hex: result.value.transactionIntentHash
  //   }
  // })
  // console.log('Instantiate Committed Details Receipt', commitReceipt)

  // // ****** Set componentAddress variable with gateway api commitReciept payload ******
  // // componentAddress = commitReceipt.details.referenced_global_entities[0]
  // document.getElementById('componentAddress').innerText = componentAddress;
  // // ****** Set resourceAddress variable with gateway api commitReciept payload ******
  // poolunitsAddress = commitReceipt.details.referenced_global_entities[1]
  // document.getElementById('poolunitsAddress').innerText = poolunitsAddress;

  loadTokenPair();
}





document.getElementById('swapToken').onclick = async function () {
  let tokenAddress = document.getElementById("tokenResource").value;
  let amount = document.getElementById("amount").value;

  let manifest = new ManifestBuilder()
  .callMethod(
    accountAddress,
    "withdraw",
    [
      new ManifestAstValue.Address(
        tokenAAddress
      ),
      new ManifestAstValue.Decimal(amount),
    ]
  )
  .takeFromWorktop(
    tokenAAddress,
    (builder, token_bucket) => 
    builder.callMethod(
      componentAddress,
      "swap",
      [
        new ManifestAstValue.Bucket(token_bucket)
      ]
    )
  )
  .callMethod(
    accountAddress,
    "deposit_batch",
    new ManifestAstValue.Expression.entireWorktop()
  )
  .build()

  let converted_manifest = await manifest.convert(
    InstructionList.Kind.String,
    NetworkId.RCnetV1
  );

  let string_converted_manifest = converted_manifest.instructions.value;

  console.log("Create Token Manifest: ", string_converted_manifest)

  // Send manifest to extension for signing
  const result = await rdt
    .sendTransaction({
      transactionManifest: string_converted_manifest,
      version: 1,
    })

  if (result.isErr()) throw result.error

  console.log("Intantiate WalletSDK Result: ", result.value)
  
}

document.getElementById('getAmount').onchange = async function () {
  let inputToken = document.getElementById("tokenPairDropDown").value;
  let outputAmount = document.getElementById("outputAmount").value;

  // Making request to gateway
  let tokenArequest = await stateApi.entityFungibleResourceVaultPage(
    {
      stateEntityFungibleResourceVaultsPageRequest: {
        address: componentAddress,
        resource_address: tokenAAddress,
      }
    });
  
  console.log("Token A Request: ", tokenArequest);

  let tokenBrequest = await stateApi.entityFungibleResourceVaultPage(
    {
      stateEntityFungibleResourceVaultsPageRequest: {
        address: componentAddress,
        resource_address: tokenBAddress,
      }
    });

  console.log("Token B Request: ", tokenBrequest);

  let componentStateRequest = await stateApi.stateEntityDetails(
    {
      stateEntityDetailsRequest: {
        addresses: [componentAddress]
      }
    }
  )

  console.log("Component Request: ", componentStateRequest);

  let component_data = componentStateRequest.items[0].details;
  
  console.log("Component Details: ", component_data);


  // Sorting logic
  let inputTokenReserves, outputTokenReserves;
  if (inputToken === tokenArequest.address ) {
    inputTokenReserves = tokenArequest.items[0].amount; 
    outputTokenReserves = tokenBrequest.items[0].amount;
  } else {
    inputTokenReserves = tokenBrequest.items[0].amount;
    outputTokenReserves = tokenArequest.items[0].amount; 
  };

  // Retrieiving pool liquidity
  // let token_a_amount = tokenArequest.items[0].amount;
  // let token_b_amount = tokenBrequest.items[0].amount;

  let x = inputTokenReserves;
  let y = outputTokenReserves;
  // let x = self.vaults[&self.other_resource_address(output_resource_address)].amount();
  // let y = self.vaults[&output_resource_address].amount();
  let dy = outputAmount;
  
  let r = (100 - swapFee) / 100;

  let dx = (dy * x) / (r * (y - dy));

  document.getElementById('requiredAmount').innerText = dx;
}

document.getElementById('exactSwapToken').onclick = async function () {
  let requestedAmount = document.getElementById("outputAmount");

  let manifest = new ManifestBuilder()
  .callMethod(
    accountAddress,
    "withdraw",
    [
      new ManifestAstValue.Address(
        inputToken
      ),
      new ManifestAstValue.Decimal(dx),
    ]
  )
  .takeFromWorktop(
    inputToken,
    (builder, input_bucket) => 
    builder.callMethod(
      componentAddress,
      "swap",
      [
        new ManifestAstValue.Bucket(input_bucket)
      ]
    )
  )
  .assertWorktopContainsByAmount(
    inputToken,
    requestedAmount
  )
  .callMethod(
    accountAddress,
    "deposit_batch",
    new ManifestAstValue.Expression.entireWorktop()
  )
  .build();

  let converted_manifest = await manifest.convert(
    InstructionList.Kind.String,
    NetworkId.RCnetV1
  )

  

  // let string_converted_manifest = converted_manifest.instructions.value;
  

  console.log("Create Token Manifest: ", string_converted_manifest)

  // Send manifest to extension for signing
  const result = await rdt
    .sendTransaction({
      transactionManifest: string_converted_manifest,
      version: 1,
    })

  if (result.isErr()) throw result.error

  console.log("Intantiate WalletSDK Result: ", result.value)
  
}




document.getElementById('getLiquidity').onclick = async function () {
//   let manifest = new ManifestBuilder()
//     .callMethod(
//       componentAddress,
//       "get_liquidity"
//     )
//     .build()
//     .toString();

//     const result = await rdt.sendTransaction({
//       transactionManifest: manifest,
//       version: 1,
//     })

// if (result.isErr()) throw result.error

let tokenArequest = await stateApi.entityFungibleResourceVaultPage(
  {
    stateEntityFungibleResourceVaultsPageRequest: {
      address: componentAddress,
      resource_address: tokenAAddress,
    }
  });

  console.log("Token A Request: ", tokenArequest)

  let tokenBrequest = await stateApi.entityFungibleResourceVaultPage(
    {
      stateEntityFungibleResourceVaultsPageRequest: {
        address: componentAddress,
        resource_address: tokenBAddress,
      }
    });

  
  console.log("Token B Request: ", tokenBrequest)

  let token_a_amount = tokenArequest.items[0].amount;
  console.log("Token A Request: ", token_a_amount)
  let token_b_amount = tokenBrequest.items[0].amount;

  document.getElementById('tokenALiquidity').innerText = token_a_amount;
  document.getElementById('tokenBLiquidity').innerText = token_b_amount;


}





// document.getElementById('getLiquidity').onclick = async function () {

// }

// document.getElementById('getLiquidity').onclick = async function () {

// }

// document.getElementById('getLiquidity').onclick = async function () {

// }

// document.getElementById('getLiquidity').onclick = async function () {

// }
