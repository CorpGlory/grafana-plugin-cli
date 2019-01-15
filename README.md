# Grafana-plugin-cli

[![Build Status](https://travis-ci.org/CorpGlory/grafana-plugin-cli.svg?branch=master)](https://travis-ci.org/CorpGlory/grafana-plugin-cli)

Create Grafana plugins that suit your needs.

No build configuration needed. 
Just run CLI commands and choose wether your plugin will be:
- Panel / Datasource
- TypeScript / JavaScript
- ... etc

Based upon grafana template webpack plugin https://github.com/CorpGlory/grafana-plugin-template-webpack.

In future follow plugins and templates will be supported:
* SASS
* React
* MetricPanel
* Application.

## Usage

```
git clone https://github.com/CorpGlory/grafana-plugin-cli.git
cd grafana-plugin-cli
npm install
npm run build
npm start
```

Use follow interface for project creating:
```
-----------------------------
Welcome to Grafana-plugin-cli
? Plugin name: choose name for your plugin. this name will be displayed on 'Plugins' tab in Grafana
? Plugin type: choose Datasource or Panel plugin type
? Plugin Id: ID for plugin, by default will be <name>-<plugin type>
? Language: choose TypeScript or JavaScript language. For TypeScript types will be added
? Styles type: choose CSS or No-style. If CSS selected, directory with base, light, dark themes will be created
```

# How it works

There are two main pieces:
1. [options](/src/template_options.ts) - options for project: language / type / ...
2. [schema](/src/project_schema/index.ts) - rules for generation project
