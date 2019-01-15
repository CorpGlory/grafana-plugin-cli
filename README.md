# Grafana-plugin-cli

[![Build Status](https://travis-ci.org/CorpGlory/grafana-plugin-cli.svg?branch=master)](https://travis-ci.org/CorpGlory/grafana-plugin-cli)

Create Grafana plugins that suit your needs.

No build configuration needed. 
Just run CLI commands and choose whether your plugin will be:
- Panel / Datasource
- TypeScript / JavaScript
- AngularJS / React
- CSS / SASS / No styles
- ... etc

Based upon grafana template webpack plugin https://github.com/CorpGlory/grafana-plugin-template-webpack.

In future following options are going to be supported:
* SASS
* React
* MetricPanel
* Application.

## Usage

```bash
git clone https://github.com/CorpGlory/grafana-plugin-cli.git
cd grafana-plugin-cli
npm install
npm run build
npm start
```

## Options description
```
-----------------------------
Welcome to Grafana-plugin-cli
? Plugin name: choose your plugin name. This name will be displayed in 'Plugins' tab in Grafana
? Plugin type: choose Datasource or Panel plugin type
? Plugin Id: ID for plugin, by default will be <name>-<plugin type>
? Language: choose TypeScript or JavaScript. Types for TypeScript are included
? Styles type: choose CSS or No style. If CSS is selected, directory with base, light and dark stylesheets will be created
```

You can build plugin after creation using:
```bash
npm install
npm run build
```

# How it works

There are two main pieces:
1. [options](/src/template_options.ts) - options for project: language / type / ...
2. [schema](/src/project_schema/index.ts) - rules for generation project
