# no-data
TSLint rules to prevent usage of the word "data" in variables and function names

## Usage
Install:
`npm install --save-dev no-data`

In your `tslint.json`:
```json
{
  "rulesDirectory": [
    "node_modules/no-data/dist"
  ],
  "rules": {
    "no-data-in-variable": true
  }
}
```

## Available Rules
### `no-data-in-variable`
The word data is not allowed when declaring variable via `const` `let` or `var`

## Future work
- [ ] Disallow in function arguments.
- [ ] Disallow in class names.
- [ ] Disallow in class properties.
