<p align="right">
    <a href="https://badge.fury.io/gh/algenty%2Fgrafana-flowcharting"><img src="https://badge.fury.io/gh/algenty%2Fgrafana-flowcharting.svg" alt="GitHub version" height="18"></a>
</p>
<br><br>
<p align="center">
    <h1 align="center">Grafana FlowCharting Plugin</h1>
    <p align="center">Build your artwork and monitor it.<br>.</p>
    <p align="center"><strong><a href="https://algenty.github.io/grafana-flowcharting/">See it in action!</a></strong></p>
    <br><br><br>
</p>

![GF](https://github.com/algenty/flowcharting-repository/blob/master/images/fc_archi_example.png?raw=true)

## Installation

1. Add the plugin to grafana:

```sh
$ grafana-cli plugins install agenty-flowcharting-panel
```

2. or manually:

Go to https://github.com/algenty/flowcharting-repository/tree/master/archives and download the lastest zip file.  

```sh
$ cd $grafana_home/data/plugin
$ unzip <file>
```

3. Restart grafana

## Usage

[View the documentation](https://algenty.github.io/grafana-flowcharting/) for usage information.

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/algenty/grafana-flowcharting. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

### Submitting code changes:

- Open a [Pull Request](https://github.com/algenty/grafana-flowcharting/pulls)
- Ensure all CI tests pass
- Await code review
- Bump the version number in `plugin.js` and `package.json` according to [semantic versioning](https://semver.org/).

### Design and development principles of this theme:

1. As few dependencies as possible
2. Don't modify grunt file
3. First class mobile experience
4. Make the content shine

## Development

To set up your environment to develop this theme, run :

```sh
$ git clone https://github.com/algenty/grafana-flowcharting
$ yarn install --dev
$ yarn build init
$ yarn build
$ # Make zip file plugin in archives dir
$ yarn build archive
$ # for dev watching
$ yarn build dev
```


## License

The theme is available as open source under the terms of the [Apache 2.0](https://opensource.org/licenses/Apache-2.0).
