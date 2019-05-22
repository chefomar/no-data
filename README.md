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
    "no-data-in-variable": true,
    "no-data-in-class": true
  }
}
```

## Available Rules
### `no-data-in-variable`
The word data is not allowed when declaring variable via `const` `let` or `var`

### `no-data-in-class`
The word data is not allowed in class names and class properties.
#### Options
- `allow-class-name`: allow the word data in class names.
- `allow-class-properties`: allow the word data in class properties.
#### Example Usage
- This will show warning when `data` appear in class name or property name.
```json
{
  "rules": {
    "no-data-in-class": true
  }
}
```
- This will show warning when `data` appear in property name only.
```json
{
  "rules": {
    "no-data-in-class": [true, "allow-class-name"]
  }
}
```


## Future work
- [ ] Disallow in function arguments.
