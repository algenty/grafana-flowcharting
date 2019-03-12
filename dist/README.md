# Grafana Plugin Flowcharting

Complexe Diagram and flowchart for grafana based on mxGraph librairies, see draw.io to discover functionalities :

  - Flowcharts 
  - Diagrams ( Uml, gant ..)
  - Floorplans
  - Maps
  - Organigrams
  - And more ... (Edit through draw.io)
 
 ## example
 ![Diagram](https://raw.githubusercontent.com/algenty/grafana-flowcharting/master/src/img/example.png?raw=true)
 
See more example at draw.io

 ## in grafana
 ![editor](https://raw.githubusercontent.com/algenty/grafana-flowcharting/master/src/img/editor_example.png?raw=true)
 ![tab2](https://raw.githubusercontent.com/algenty/grafana-flowcharting/master/src/img/editor_tab2.png?raw=true)
 ![tab2](https://raw.githubusercontent.com/algenty/grafana-flowcharting/master/src/img/editor_tab3.png?raw=true)
 

# Features

##0.1
  - Display Graph
  - inspect tab

##0.2
  - Display graph through xml definition
  - Calibrate display (scale, center,background)
  - inspect graph to test states and shape
  - Mapping values and colors (use stroke in color options for arrows instead fill)
  - String type added with range or value mapping.
  - Date type added
  - multi rules with expand/collapes for better displa, possibility to reorg rules

  /!\ Only dark theme is supported at this time

# Cooming soon

###0.3
  - Clean code and optimize display

##1.0 TODO
  - Link on shape/text
  - Tooltips on error
  - Mapping on variables/templates
  - Best manuals/docs when i would find contributors better than me in english

##2.0 :
  -multi graph with auto link when errors

# issues

Pull bugs and issues on https://github.com/algenty/grafana-flowcharting/issues

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

### Manualy
```sh
$ cd $grafana_home/data/plugin
$ wget --no-check-certificate https://github.com/algenty/grafana-flowcharting/archive/master.zip
$ unzip master.zip
```

### grafana-cli

```sh
$ TODO
```
### Build

```sh
$ git clone https://github.com/algenty/grafana-flowcharting
$ npm install --save-dev
$ ./node_modules/.bin/grunt
$ # Make zip file plugin
$ ./node_modules/.bin/grunt archive
```