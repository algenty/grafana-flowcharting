# Grafana Plugin Flowcharting

![Banner](https://github.com/algenty/flowcharting-repository/blob/master/images/banner_large.png?raw=true)

Flowcharting is a Grafana plugin. Use it to display complexe diagrams using the online graphing library [draw.io](https://draw.io/) 
Draw.io can create many types of diagrams :
  * Technical architecture schema (Legacy, Cloud, Azure, AWS, GCP, Kubernetes, Terraform)
  * Diagrams (network, electric, flows, ...)
  * Industrial processes
  * Organic plans
  * Floorplans
  * UML plan 
  * Workflows (Jenkins, Ansible Tower, OpenShift, ...)  

Draw your artwork, feed it live data and define in flowcharting how the data will interact with the diagram.
  * Monitor state and performance  
  * Interact with the diagram  
  * Change the displayed objects based on data or state  
  * Add links to objects  
  * Make full use of variables to modify shapes, colours, links, download paths and more.  
  * Support for regular expressions for matching and substitutions  

## Use cases
  - Technical schema example  
![example 1](https://github.com/algenty/flowcharting-repository/blob/master/images/fc_archi_example.png?raw=true)
 
See more example at draw.io  

# Demo site
<https://play.grafana.org/d/Unu5JcjWk/flowcharting-index?orgId=1>

# Getting started
<https://algenty.github.io/flowcharting-repository/STARTED.html>

# Documentation
<https://algenty.github.io/flowcharting-repository/>

# Project site
<https://github.com/algenty/grafana-flowcharting>

# Sponsors and Funding
Click on the Sponsor button to help finance the project with the link below.  
[https://paypal.me/grafanaflowcharting](https://paypal.me/grafanaflowcharting)  

Thanks a lot
Arnaud

# Sponsors
Special thanks to
## Gold
  * Jeroen Coussement

## Silver
  * Ian Jones, Tobias Dorn, Matti Orrberg

## Bronze
  * Christopher Piggott, Tamer Salem, Gavin Smith, Roman Dodin


# Changelog
## [[1.0.0d (Last build 2022-06-06)]](./built/)

### Known issues
  - Shared cross on grafana 8.x (minor)
  - Flow animation on arrows (minor)
  - External image from diagrams.net not displayed (minor)
### Added
  - Convert sync method to async : render graph before update states (speed x2) 
  - clean dirty code
  - Support last version of grafana (8.5.x)
  - New initialization engine for drawio libs
  - New draw.io libs (17.x 2022-04-23)
  - New notifier handler in panel.
  - Change default url draw.io with https://embed.diagrams.net
  - New edit design for grafana v7-8 ([See example](https://algenty.github.io/flowcharting-repository/images/rulesv7_ani.png?raw=true))
  - New UX design and new concept "fast edit" :
    - Can edit without expand rules and flowcharts with icons
    - Advanced/detail mode on expand.
    - Fast edit mode
  - Add shape name and properties in inspect console ([See example](https://algenty.github.io/flowcharting-repository/images/inspectv7_ani.png?raw=true))  
  - Add gaugePos property in Event Mapping for the gauge draw.io models [See example](https://algenty.github.io/flowcharting-repository/images/gaugePos_ani.png?raw=true))  
  - Plugin is signed
  - Add Light theme support
  - New thresholds type : dates (accept units like d, w, m, y, h, s or a date)
  - New event mapping operators
  - Enable/Disable rule/state/mapping independently.
  - Colors (threshold and background) can be empty.
  
  
### Fixed
  - Fixed : Inspect mode [(issue #209)](https://github.com/algenty/grafana-flowcharting/issues/209) ([See example](https://algenty.github.io/flowcharting-repository/images/inspectv7_ani.png?raw=true))  
  - Fixed : Label position in shape [(issue #147)](https://github.com/algenty/grafana-flowcharting/issues/147)   
  - Fixed : Initialization of first model
  - Fixed : Display refresh between "edit mode" and "dashboard mode" in grafana v7 [(issue #205)](https://github.com/algenty/grafana-flowcharting/issues/205)  
  - Fixed : zoom on text without witdth and height
  - Fixed : Disable select text when double click for zoom
  - Fixed : retro compatibility with grafana 6.x [(issue #218)](https://github.com/algenty/grafana-flowcharting/issues/218)  
  - Fixed : Zoom with 2 or more FlowCharting [(issue #214)](https://github.com/algenty/grafana-flowcharting/issues/214)  
  - Fixed : Background color edition in flowchart tab

See [Changelog file](CHANGELOG.md) for history
  
# Annex
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

# Roadmap
  - Upgrading Flowcharting to react components => 2022-08-31
  - Supporting Multi-graph in one panel => 2022-10-31

## 1.0 Next/Requested enhancements
  - [X] Internat draw.io website [(issue #43)](https://github.com/algenty/grafana-flowcharting/issues/43)  
  - [X] Display tooltip (0.4.0)
  - [ ] Export SVG, png,  options
  - [X] Google font
  - [X] Add data in tooltip (0.4.0)
  - [X] Use variables/templates in graph (0.4.0)
  - [X] Add custom stencils/libs from draw.io (0.4.0)
  - [X] Progressive change color like gauge
  - [X] Support light theme
  - [ ] Annotation
  - [X] Tooltips on text and arrow/line
  - [X] Url source download (0.4.0)
  - [X] Special rule according level (hide, show, change form, move, infront, in back, attributes,  ...)
  - [X] Custom variables like ${_label},${_value}, ${_alias}, ${_rule}, ${_level} ... (0.8.0)
  - [X] Variable support in link (0.5.0)
  - [X] Zoom/Unzoom (0.4.0)
  - [X] Shared graph crosshair
  - [X] CSV source (0.9.0)
  - [X] Map/search shape by value (0.8.0)
  - [X] Variables support for downloaded source and compressed source
  - [ ] Multi graph with auto link when errors
  - [X] Gradient Mode for color (0.7.0)
  - [X] More than 3 colors (0.7.0)
  - [X] Graph in tooltip (0.6.0)
  - [X] Histogram
  - [X] carriage return after new rule in tooltips option
  - [X] Filter for null values in graph
  - [X] New style for image : imageBackground, imageBorder
  - [X] Support cloud images from draw.io
  - [X] Support images from draw.io (0.5.0)
  - [X] Add append mode on text with CR or space (0.5.0)

# Support or Contact

  - Having troubles with flowcharting ? Check out [issues](https://github.com/algenty/grafana-flowcharting/issues)
  - Email : <grafana.flowcharting@gmail.com>
  - Twitter : https://twitter.com/gf_flowcharting
  - RSS feed news : http://algenty.github.io/flowcharting-repository/news.xml

# Dependencies

## Grafane flowcharting plugin dependencies

* [AngularJS] - HTML enhanced for web apps!
* [lodash] - awesome web-based text editor
* [jquery] - Markdown parser done right. Fast and easy to extend.
* [mxGraph] - great UI boilerplate for modern web apps
* [pako] - Zlib port to javascript (used by diagrams.net)
* [vkbeautify] - Pretty prints and minifies XML/JSON/SQL/CSV
* [sanitizer] - Caja's HTML Sanitizer
* [chartist] - Graph for tooltip
* [chroma-js] - Calculate interpolate colors

## Build dependencies

* [jest] - Delightful JavaScript Testing
* [babel] - Soft cushion between you all the cool new file formats being developed for node.js such as CoffeeScript, SASS, and Jade.
* [gulp] - The JavaScript Task Runner
* [webpack] - Packs CommonJs/AMD modules for the browser. Allows to split your codebase into multiple bundles, which can be loaded on demand. Support loaders to preprocess files, i.e. json, jsx, es7, css, less, ... and your custom stuff.

# Installation

Flowcharting requires [Grafana](https://www.grafana.com/) v5+ to run (not tested older versions)
Download and install it 

## Manualy (deprecated)
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
$ yarn build
$ # Make zip file plugin in archives dir
$ yarn archive
$ # for dev watching
$ yarn dev
```

## Class diagram
https://www.draw.io/?chrome=0&lightbox=1&url=https%3A%2F%2Fraw.githubusercontent.com%2Falgenty%2Fflowcharting-repository%2Fmaster%2Fgraphs%2FFlowcharting_carto.drawio

## Event diagram (In progress)
https://www.draw.io/?chrome=0&lightbox=1&url=https%3A%2F%2Fraw.githubusercontent.com%2Falgenty%2Fflowcharting-repository%2Fmaster%2Fgraphs%2FFlowcharting_Events.drawio

