# Grafana Plugin Flowcharting

Complexe Diagram and flowchart for grafana based on mxGraph librairies, see draw.io to discover functionalities :

  - Flowcharts 
  - Diagrams ( Uml, gant ..)
  - Floorplans
  - Maps
  - Organigrams
  - And more ... (Edit through draw.io)
 
 ## examples
  - Technical schema example
 <img src="src/img/archi_example.png?raw=true" width="800">
 
  - workflows or subways example
 <img src="src/img/subway_example.png?raw=true" width="800">
 
See more example at draw.io

# Features

# unstables versions for beta tester
[REPO](https://github.com/algenty/flowcharting-repository/tree/master/archives)

# Stable version
## 0.2.5 (03/04/19)
  - Bugs fix.
  - Compress and uncompress button under xml source to optimize space in db
  - Prettyfier and minifier of xml source
  - Mapping Helper (chain icon)


### Not work
  - Only dark theme suported
  - Url Source for graph definition
  - Invert stroke color of arrow options
  - Coloring Gradient is used on shape

## 0.2 (18/03/19)
### Works
  - Display graph through xml definition
  - Calibrate display (scale, center, background)
  - Inspect tab to test states and shape from graph.
  - Mapping values and colors (use stroke in color options for arrows instead fill)
  - String type added with range or value mapping.
  - Date type added
  - multi rules with expand/collapes for better display, possibility to reorg rules

## 0.1
  - Display Graph
  - inspect tab

# Cooming soon

## 1.0 Pull request
  - Link on shape/text
  - Import Libs shapes from draw.io or custom libs. 
  - Inverse stroke color for connector/edge to see it according theme.
  - Export SVG options.
  - Tooltips on error.
  - Mapping on variables/templates.
  - Add custom stencils.
  - Best manuals/docs when i would find contributors better than me in english.
  - Set visible or not according to state.
  - Only dark theme is supported at this time
  - Url source not implemented
  - SVG export not implemented

## Pull request for version 2.0
  - Multi graph with auto link when errors
  - Gradien Mode for color

# issues

Bugs and issues on https://github.com/algenty/grafana-flowcharting/issues

# Tech

Grafan flowcharting use libs :

* [AngularJS] - HTML enhanced for web apps!
* [lodash] - awesome web-based text editor
* [jquery] - Markdown parser done right. Fast and easy to extend.
* [mxGraph] - great UI boilerplate for modern web apps


And of course Flowcharting plugin itself is open source with a [public repository][algenty]
 on GitHub.

# Installation

Flowcharting requires [Grafana](https://www.grafana.com/) v5+ to run (not tested lower version)
Download and install it 

## Manualy
```sh
$ cd $grafana_home/data/plugin
$ wget --no-check-certificate https://github.com/algenty/grafana-flowcharting/archive/master.zip
$ unzip master.zip
```

## grafana-cli

```sh
grafana-cli plugins install agenty-flowcharting-panel
```
## Build

```sh
$ git clone https://github.com/algenty/grafana-flowcharting
$ npm install --save-dev
$ ./node_modules/.bin/grunt
$ # Make zip file plugin in archives dir
$ ./node_modules/.bin/grunt archive
$ # for dev watching
$ ./node_modules/.bin/grunt dev
```
