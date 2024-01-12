## Testing Locally
Clone this repository and run the following command to link the package to your local NPM registry:
`npm link`

You can then run the following command anywhere on your system to test the application:
`npx create-radix-dapp@latest` and follow the prompts to scaffold a new dApp project.

Once deployed to NPM there is no need to install the package globally, you can simply run:
`npx create-radix-dapp@latest` and follow the prompts to scaffold a new Radix dApp project.

## Contributing
To create a new template create a new folder in the `templates` directory. The folder name will be the name of the template. The folder should contain a `template` folder which is named to represent the template it contains. Each template should contain the appropriate License. The template should also contain a `README.md` file explaining how to use the template.


# License

The Create Radix dApp binaries licensed under the [Radix Generic EULA](https://www.radixdlt.com/terms/genericEULA).

The Create Radix dApp code is released under the [Apache 2.0 license](./LICENSE).

```
Copyright 2023 Radix Publishing Ltd

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at: http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

See the License for the specific language governing permissions and limitations under the License.
```