## Testing Locally
Clone this repository and run the following command to link the package to your local NPM registry:
`npm link`

You can then run the following command anywhere on your system to test the application:
`npx create-radix-dapp@latest` and follow the prompts to scaffold a new dApp project.

Once deployed to NPM there is no need to install the package globally, you can simply run:
`npx create-radix-dapp@latest` and follow the prompts to scaffold a new Radix dApp project.

## Contributing
To create a new template create a new folder in the `templates` directory. The folder name will be the name of the template. The folder should contain a `template` folder which is named to represent the template it contains. Each template should contain the appropriate License. The template should also contain a `README.md` file explaining how to use the template.

