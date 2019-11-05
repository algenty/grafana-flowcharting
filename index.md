---
layout: default
title: Home
nav_order: 1
description: "FlowCharting is a responsive Jekyll theme with built-in search that is easily customizable and hosted on GitHub Pages."
permalink: /
---

# What is Grafana Flowcharting
{: .fs-9 }

Flowcharting is a plugin for grafana. It aims to display and monitor complexe diagrams and draws with the tool [draw.io](https://draw.io/). 
{: .fs-6 .fw-300 }
  * Technical architecture schema
  * Diagrams
  * Organic plans
  * Floorplans
  * UML plan 
  * ...  


[Get started now](#getting-started){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 } [View it on GitHub](https://github.com/algenty/grafana-flowcharting){: .btn .fs-5 .mb-4 .mb-md-0 }

---

## Getting started

### Dependencies

Grafana Flowcharting is a plugin for [Grafana](https://grafana.com), to draw  and monitor your artwork.  
You can change colors ,labels and links of each object in mapping sections with the rules.
The draw and the javascripts use [draw.io](https://github.com/jgraph/drawio) for editor and [mxgraph](https://github.com/jgraph/mxgraph) for librairies


### Quick start: Install and use GF (Grafana Flowcharting)

1. Install GF with grafana-cli
```sh
grafana-cli plugins install agenty-flowcharting-panel
```


### Manuel or custom installation


### Configure FlowCharting

- [See configuration options]({{ site.baseurl }}{% link docs/configuration.md %})

---

## About the project

FlowCharting is &copy; 2017-2019 by [Arnaud GENTY](grafana.flowcharting@gmail.com).

### License

FlowCharting is distributed by an [Apache 2.0](https://github.com/algenty/grafana-flowcharting/tree/master/LICENSE.txt).

### Contributing

When contributing to this repository, please first discuss the change you wish to make via issue,
email, or any other method with the owners of this repository before making a change. Read more about becoming a contributor in [our GitHub repo](https://github.com/algenty/grafana-flowcharting#contributing).

#### Thank you to the contributors of FlowCharting!

<ul class="list-style-none">
{% for contributor in site.github.contributors %}
  <li class="d-inline-block mr-1">
     <a href="{{ contributor.html_url }}"><img src="{{ contributor.avatar_url }}" width="32" height="32" alt="{{ contributor.login }}"/></a>
  </li>
{% endfor %}
</ul>

### Code of Conduct

FlowCharting is committed to fostering a welcoming community.

[View our Code of Conduct](https://github.com/algenty/grafana-flowcharting/tree/master/CODE_OF_CONDUCT.md) on our GitHub repository.
