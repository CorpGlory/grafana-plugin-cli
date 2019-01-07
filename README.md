# Grafana-plugin-cli

[![Build Status](https://travis-ci.org/CorpGlory/grafana-plugin-cli.svg?branch=master)](https://travis-ci.org/CorpGlory/grafana-plugin-cli)

Create Grafana plugins that suit your needs.

No build configuration needed. 
Just run CLI commands and choose wether your plugin will be:
- Panel / Datasource
- TypeScript / JavaScript
- ... etc

Based upon grafana template webpack plugin https://github.com/CorpGlory/grafana-plugin-template-webpack.


## Usage

```
git clone https://github.com/CorpGlory/grafana-plugin-cli.git
cd grafana-plugin-cli
npm install
npm run build
npm start
```

# How it works

There are two main pieces:
1. [options](/src/template_options.ts) - options for project: language / type / ...
2. [schema](/src/project_schema/index.ts) - rules for generation project