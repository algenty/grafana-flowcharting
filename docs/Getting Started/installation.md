---
layout: default
title: Search
nav_order: 1
---

# Installation
{: .no_toc }

## Fron Grafana.com
{: .no_toc }

GF Plugin are available at [](https://grafana.com/grafana/plugins/agenty-flowcharting-panel)


Install GF with grafana-cli
```sh
$ grafana-cli plugins install agenty-flowcharting-panel
```

## Manuel or custom installation
{: .no_toc }

Repository section

1. Download last version from download section and unzip file in data/plugin directory
 
```sh
$ cd ${grafana_home}/data/plugin
$ wget https://algenty.github.io/grafana-flowcharting/archives/<lastest>.zip
$ unzip <lastest>.zip
```
2. Restart Grafana