# Grafana Plugin Flowcharting

Complexe Diagram and flowchart for grafana based on mxGraph librairies, see draw.io to discover functionalities :

  - Flowchart 
  - Diagram ( Uml, gant ..)
  - Plan
  - Maps
  -  ...
 
Be carefull, it is an alpha version, mapping and chaging state not implemented

# Features

  - Display graph throw xml definition
  - Calibrate display
  - inspect graph to test state

# Not work now

  - Mapping shape with threshold
  - many functions

its an alpha

## Tech

Grafan flowcharting use libs :

* [AngularJS] - HTML enhanced for web apps!
* [lodash] - awesome web-based text editor
* [jquery] - Markdown parser done right. Fast and easy to extend.
* [mxGraph] - great UI boilerplate for modern web apps

![Diagram](https://raw.githubusercontent.com/algenty/grafana-flowcharting/master/src/img/example.png?raw=true)

And of course Flowcharting plugin itself is open source with a [public repository][algenty]
 on GitHub.

### Installation

Flowcharting requires [Grafana](https://www.grafana.com/) v5+ to run (not tested lower version)
Download and install it 

#### Manualy
```sh
$ cd $grafana_home/data/plugin
$ wget --no-check-certificate https://github.com/algenty/grafana-flowcharting/archive/master.zip
$ unzip master.zip
```

#### grafana-cli

```sh
$ TODO
```
