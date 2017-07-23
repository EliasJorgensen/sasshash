# Sasshash

Sasshash is a simple CLI tool to quickly compile SASS into a browser-caching friendly CSS file, adding a SHA1 hash of the compiled data to the filename.

## Dependencies
* [Ruby SASS](http://sass-lang.com/install) (node-sass version in the works)
* [Node](https://nodejs.org/en/download/) LTS (v6.11.1) or newer

## Installation
1. Clone repo into a directory of your choice
2. Add the following to your `.bashrc` or equivalent:
```bash
alias sasshash='node /path/to/sasshash/sasshash.js'
```

## Usage 
```bash
sasshash foo.scss bar[.css]
// => foo.cebf23e3a06fc8356bbc994c478947d2ad9d5bf8.css
```