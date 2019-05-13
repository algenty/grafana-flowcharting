# Grafana Plugin Flowcharting

![Banner](https://github.com/algenty/flowcharting-repository/blob/master/images/banner_large.png?raw=true)

Flowcharting is a plugin for grafana. It aims to display complexe diagram draws with [draw.io](https://draw.io/). Few examples :
  * Technical architecture schema
  * Diagrams
  * Organic plans
  * Floorplans
  * UML plan 
  * ...  

Draw your artwork and monitor it.

 ## example
  - Technical schema example  
![example 1](https://github.com/algenty/flowcharting-repository/blob/master/images/fc_archi_example.png?raw=true)
 
See more example at draw.io  

# Getting started
https://algenty.github.io/flowcharting-repository/STARTED.html

# Documentation
https://algenty.github.io/flowcharting-repository/

# Project site
https://github.com/algenty/grafana-flowcharting

# Features

## 0.3.0 - 2019-05-07
### Added
  /!\ Possible breaking change with 0.2.0 and 0.2.5 but it will compatible with next release.  
    
  - Migration process for next release.
  - Dynamic documentation/Examples on popover (thx SCHKN)
  - Params link option, add params of dashboard to link.
  - Full review of code (ES6 Class mode)
  - Unit test with jest to increase quality
  - Fill/text/stoke rules on the same object is possible.
  - Mapping selector helper (chain in mapping)
  - Icon overlay state (display icon warning when NOK)
  - Implemented the conditions to display text according to the states.
  - new inspect Tab with :
    - Renamer ID (double click on ID)
    - State status
    - Debug mode
  - Custom Link Mapping overrite.  
  
### Fixed
  - Substring replace on text (Issue #8)
  - Editor object not found Exception (Issue #1)
  - Original Link (Issue #9)
  - Fixed Change the colors (Issue #14)
  - Fixed Unit (Issue #12)

## [0.2.5] - 2019-04-19
### Added
  - Mapping Helper for select object with mouse  
  
### Fixed
  - Substring replace on text (Issue #8)
  - Editor object not found Exception (Issue #1)

## [0.2.0] - 2019-03-18
### Added
  - Display graph through xml definition
  - Calibrate display (scale, center, background)
  - Inspect tab to test states and shape from graph.
  - Mapping values and colors (use stroke in color options for arrows instead fill)
  - String type added with range or value mapping.
  - Date type added
  - multi rules with expand/collapes for better display, possibility to reorg rules

## [0.1.0] - 2019-09-02
### Added
  - Display graph with mxgraph libs
  - Inspect tab to explore object in graph and preview colors

# Cooming soon/Roadmap

## 1.0 Pull request
  - Import Libs shapes from draw.io or custom libs. 
  - Display tooltip
  - Inverse stroke color for connector/edge to see it according theme.
  - Export SVG options.
  - Add data to tooltip (TooltipOn & mapping).
  - Use variables/templates in graph.
  - Add custom stencils/libs from draw.io
  - Only dark theme is supported at this time
  - Url source not implemented
  - SVG export not implemented

## Pull request for version 2.0
  - Multi graph with auto link when errors
  - Gradien Mode for color

# Support or Contact

  - Having troubles with flowcharting ? Check out [issues](https://github.com/algenty/grafana-flowcharting/issues)
  - Email : <grafana.flowcharting@gmail.com>
  - Twitter : https://twitter.com/gf_flowcharting

# Tech

Grafan flowcharting use libs :

* [AngularJS] - HTML enhanced for web apps!
* [lodash] - awesome web-based text editor
* [jquery] - Markdown parser done right. Fast and easy to extend.
* [mxGraph] - great UI boilerplate for modern web apps

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
