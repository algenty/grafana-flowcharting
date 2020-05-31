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
Since version 0.7.0 was released and after a years worth of work, I activated the sponsor button.    
Why? Flowcharting is free and open-source, it has become successful but it does require effort to develop and maintain.   
I am spending a lot of personal time and money (computer, Azure account ...).  
Also i donated money to projects used by FlowCharting like chartist.  
So if you like Grafana-FlowCharting and use it for your enterprise, professionally or personally.    
Click on the Sponsor button to help finance the project with the link below.  
[https://paypal.me/grafanaflowcharting](https://paypal.me/grafanaflowcharting)  

Thanks a lot   
Arnaud

# Changelog

## [[0.9.0]](https://algenty.github.io/flowcharting-repository/archives/agenty-flowcharting-panel-0.9.0.zip) - 2020-05-31  
### Added
  - CSV Format support for flowchart source (https://drawio-app.com/import-from-csv-to-drawio/)
  - New aggregation : Time of last point  
  - New fill Method : Gradient ([See example](https://algenty.github.io/flowcharting-repository/images/gradients_color_ani2.gif?raw=true))  
  - Graph hover support ([See example](https://algenty.github.io/flowcharting-repository/images/floorplan_graphhover.gif?raw=true))  
  - Better rendering of color animation with chroma-js
  - New Events/Animations Mapping :  
    * Modify Gradient direction  
    * Modify Arrow start and end connectors ([See example](https://algenty.github.io/flowcharting-repository/images/connectors_color_ani2.gif?raw=true))  
    * Flip shape horizontally or vertically  
    * Resize shape in percent ([See example](https://algenty.github.io/flowcharting-repository/images/resize_ani.gif?raw=true))  
    * Flow animation (experimental, not work with a shadow on arrow)  
  - New homepage schema
  - Support external fonts like google fonts ([See example](https://algenty.github.io/flowcharting-repository/images/google_fonts.png?raw=true))  
  - New anonymizer feature in inspect section to share the diagrams without sensible data ([See example](https://algenty.github.io/flowcharting-repository/images/anonymize_ani.gif?raw=true))  
  
### Fixed
  - Fixed : Flowchart grid display  
  - Fixed : background color field in edit mode  
  - Fixed : Blink event  
  - Fixed : Overflow on grafana v7 [(issue #172)](https://github.com/algenty/grafana-flowcharting/issues/172)   
  
## [[0.8.1]](https://algenty.github.io/flowcharting-repository/archives/agenty-flowcharting-panel-0.8.1.zip) - 2020-05-11  
### Added
  - New plugin logo for Grafana V7 ([See example](https://github.com/algenty/grafana-flowcharting/blob/master/src/img/agenty-flowcharting.png?raw=true))  
  
### Fixed
  - Fixed : Dashboard variables.  
  - Optimize performance and size (7 Mo instead 15 Mo).  
  
## [[0.8.0]](https://algenty.github.io/flowcharting-repository/archives/agenty-flowcharting-panel-0.8.0.zip) - 2020-05-02  
  
### Added
  - Add Identification by Value/lable in field 'what' in rules (experimental)  
  - Upgrade Draw.io libs (13.0.1)
  - Add option to disable regex/eval for a small performance gain.  
  - Add 2 new color modes in Color mapping section :  
    - "Label background"  
    - "Label borber"  
  - Add Execution times stats to optimize rules.  
  - Foldable container without disable lock.  
  - Add New custom variables for supported fields (Text Mapping 'with', Link Mapping 'Url' and Event Mapping 'Value'):  
    - ${_value} : raw value  
    - ${_formatted} : formatted value  
    - ${_level} : current level  
    - ${_rule} : name of current rule  
  - Add New Feature :  Events / Animations Mapping, according the level ([See example](https://algenty.github.io/flowcharting-repository/images/all_events_ani.png))  
    - Change shapes form  
    - Change size, opacity, rotation, ...   
    - Hide/Blink shapes  
    - And [more...](https://algenty.github.io/flowcharting-repository/EVENTS)  
  
### Fixed
  - Log scale, thanks Dennis [(issue #68)](https://github.com/algenty/grafana-flowcharting/issues/68)  
  - Shape still selected when deleting map.
  - Select list (typeahead) in fields 'whats' and map values for string type in rules
  - Level State with range or value mapping.
  - Lock always true in flowchart option [(issue #138)](https://github.com/algenty/grafana-flowcharting/issues/138) 
  - Fix Remove link
  - Fix range value Min and Max range when 'from' or 'to' is empty
  - Fix 'With' field in text mapping, empty after clone or save/reload
  
## [[0.7.0]](https://algenty.github.io/flowcharting-repository/archives/agenty-flowcharting-panel-0.7.0.zip) - 2020-03-25  
  
### Added  
  - New conditions and design in rule for each mapping instead one per rule ([See example](https://algenty.github.io/flowcharting-repository/images/what_when_how.png))  
    - when : When condition applied  
    - what : which shape  
    - how : how to colorize shape 
    - and more ...  
  - Multiple colors for thresholds with type number and string ([See example](https://algenty.github.io/flowcharting-repository/images/multicolor_ani.png))
  - Gradient color mode ([See example](https://algenty.github.io/flowcharting-repository/images/floorplan_gradient_gradient.gif))
  - Enable/disable animation like fade color for best performance or best render in 'Direct link rendered image'  
  - Update libs :
    - draw.io : 12.8.6 (Kubernetes shapes and more)  
    - mxgraph : 4.1.0  
  
### Fixed  
  - Fix getNames for series [(issue #100)](https://github.com/algenty/grafana-flowcharting/issues/100)  
  - Fix colors when cloned rules [(issue #124)](https://github.com/algenty/grafana-flowcharting/issues/124)  
  - Fix shapes with last versions of draw.io [(issue #125)](https://github.com/algenty/grafana-flowcharting/issues/125)  
  - Fix 'Direct link rendered image' [(issue #114)](https://github.com/algenty/grafana-flowcharting/issues/114)  

## [[0.6.1]](https://algenty.github.io/flowcharting-repository/archives/agenty-flowcharting-panel-0.6.1.zip) - 2020-01-15  
### Fixed
  - Fix endless loading when edit graph [(issue #102)](https://github.com/algenty/grafana-flowcharting/issues/102)
  - Fix error on edit mode for timeserie [(issue #100)](https://github.com/algenty/grafana-flowcharting/issues/100)
  - Fix "Apply button" in inspect mode [(issue #104)](https://github.com/algenty/grafana-flowcharting/issues/104)
  
## [[0.6.0]](https://algenty.github.io/flowcharting-repository/archives/agenty-flowcharting-panel-0.6.0.zip) - 2019-12-21  
  
### Added  
  - Experimental implementation for table type data (Mysql, Postgres, Zabbix, Streaming, loki and other ...)
  - Some optimization on : 
    - tooltips
    - States
  - Tooltip Graph :
    - Histogram ([See example](https://algenty.github.io/flowcharting-repository/images/histogram_ani.png))
  - Variables support in download input url ([See example](https://algenty.github.io/flowcharting-repository/images/url_download_variable_ani.png))
  - Add gradual effect when color changed ([See example](https://video.twimg.com/tweet_video/EISkJwdWwAAi5Qh.mp4))
  - New rule design in editor ([See example](https://algenty.github.io/flowcharting-repository/images/rule_design.png))
  - Typescript migration for best quality.
  - Build migration to grafana-toolkit (thanks Dominik and Ryan).
  - New engine graph for better draw.io compatibility
  - Better Zoom for firefox and IE/edge.
  - Add controls on edit mode for XML and URL.
  - Regular expression for String type value implemented to define level state.
  
### Fixed
  - Fix download url on first load.
  - Fix value null for string [(issue #65)](https://github.com/algenty/grafana-flowcharting/issues/65)
  - Fix bug "subways" Editor [(issue #73)](https://github.com/algenty/grafana-flowcharting/issues/73)
  - Fix date on 2 digit in tooltip [(issue #77)](https://github.com/algenty/grafana-flowcharting/issues/73)
  - Fix minors bug.
  
## [[0.5.0]](https://algenty.github.io/flowcharting-repository/archives/agenty-flowcharting-panel-0.5.0.zip) - 2019-10-17
  
### Added  
  - 2 new modes for "Update text value" ([See example](https://algenty.github.io/flowcharting-repository/images/append_mode_ani.png))
    - Append (Space) : Concat metrics with a space as a separator
    - Append (New line) : Concat metrics with a line break
  - Variabilization in "Url" for link mapping ([See example](https://algenty.github.io/flowcharting-repository/images/variable_link_ani.png))
  - New check box to allow download images from draw.io ([See example](https://algenty.github.io/flowcharting-repository/images/drawio_source_ani.png))
  - New editor option :
    - Choose other editor draw.io like internal website
    - Choose the theme of editor
  - New identification mode for shapes when mouse cursor is over the rules or the mapping ([See example](https://algenty.github.io/flowcharting-repository/images/identification_mode_ani.png))
  - Support Dynamic shapes like Floorplan, isometric plans and more ([See example](https://algenty.github.io/flowcharting-repository/images/dynamic_shapes_ani.png))
  - New color mode for no SVG object like pictures/cliparts/images ([See example](https://algenty.github.io/flowcharting-repository/images/colormode_ani.png))
  - Graphs in tooltip ([See example](https://algenty.github.io/flowcharting-repository/images/tooltip_graph.png))
    - Color graph with defined colors in threshold
    - Size of graph ([See example](https://algenty.github.io/flowcharting-repository/images/graph_size.png))
  - Define the orientation in  tooltip for each metrics/graph in tooltips : horizontal or vertical ([See example](https://algenty.github.io/flowcharting-repository/images/tooltip_direction_ani.png))
  - Some optimizations, Display is twice as fast on load.  
  
### Fixed  
  - Fix color to reset when "Color on" is "Always/Critical" and metric is OK  
  - Fix border to empty instead black when "color mode" is "Fill" [(issue #24)](https://github.com/algenty/grafana-flowcharting/issues/24)  
  - Fix error when "Value On" is not "When metric displayed"
  - Fix Link [(issue #37)](https://github.com/algenty/grafana-flowcharting/issues/37)  
  - Fix hyperlink text appears in white over flowchart [(issue #45)](https://github.com/algenty/grafana-flowcharting/issues/45)
  - Fix "Multiple FlowCharts On a Dashboard", when edit, both are the same draw [(issue #48)](https://github.com/algenty/grafana-flowcharting/issues/48)
  - Fix options after reload or variable changed [(issue #44)](https://github.com/algenty/grafana-flowcharting/issues/48)
  - Fix auto reset zoom/unzoom when data refreshed, only ESC or change options on flowchart reset zoom now [(issue #38)](https://github.com/algenty/grafana-flowcharting/issues/38)
  - Fix error for BPNM shapes [(Issue #51)](https://github.com/algenty/grafana-flowcharting/issues/51)
  - Fix display when center and scale are checked on flowchart options.
  - Fix Zoom with mouse wheel for firefox and Edge.

# Annex
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

# Cooming soon/Roadmap

## 1.0 Next/Requested enhancements
  - [X] Internat draw.io website [(issue #43)](https://github.com/algenty/grafana-flowcharting/issues/43)  
  - [X] Display tooltip (0.4.0)
  - [ ] Export SVG, png,  options
  - [X] Google font
  - [X] Add data in tooltip (0.4.0)
  - [X] Use variables/templates in graph (0.4.0)
  - [X] Add custom stencils/libs from draw.io (0.4.0)
  - [X] Progressive change color like gauge
  - [ ] Support light theme
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
* [pako] - Zlib port to javascript
* [vkbeautify] - Pretty prints and minifies XML/JSON/SQL/CSV
* [sanitizer] - Caja's HTML Sanitizer
* [chartist] - Graph for tooltip
* [chroma-js] - Calculate interpolate colors

## Build dependencies

* [jest] - Delightful JavaScript Testing
* [express] - Fast, unopinionated, minimalist web framework
* [babel] - Soft cushion between you all the cool new file formats being developed for node.js such as CoffeeScript, SASS, and Jade.
* [grunt] - The JavaScript Task Runner
* [webpack] - Packs CommonJs/AMD modules for the browser. Allows to split your codebase into multiple bundles, which can be loaded on demand. Support loaders to preprocess files, i.e. json, jsx, es7, css, less, ... and your custom stuff.

# Installation

Flowcharting requires [Grafana](https://www.grafana.com/) v5+ to run (not tested older versions)
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
