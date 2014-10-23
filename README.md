<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](http://doctoc.herokuapp.com/)*

- [Purpose](#purpose)
- [Desired Workflow](#desired-workflow)
- [How To Use The Tools](#how-to-use-the-tools)
  - [mdb command line utility](#mdb-command-line-utility)
  - [dev utilities](#dev-utilities)
  - [mongodb and servers](#mongodb-and-servers)
- [Compatibility](#compatibility)
- [Licence](#licence)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Purpose

* Enhance the mongodb development workflow.

* Educational value touching three different approaches for async control flow when using mongo

> classic callback approach

> promises

> generators


# Desired Workflow

* do not mess with mongodb commands...run some simple commands via node command line utility

* put some data in json files

* init/reinit collection/db

> all of the db folder, db name, collection name have default values

* have an easy entry point of start writing queries against the data


# How To Use The Tools

## mdb command line utility

In mdb folder

* dependencies with ```npm i``` 

* register the module with ```npm link``` 

* put the default values in config.json

* use commands like ```mdb start```, ```mdb init db```, ```mdb init collection```

* see mdb help for tool phylosophy and all commands

## dev utilities

In utils folder

* dependencies with ```npm i```

* start the server with ```mdb start``` (see the command line utility)

* run test suite with ```npm test```

See the test suite for example usage. Three control flow approaches are covered:

> classic callback approach

> promises

> generators


**NOTES:**

* one must run these with node 0.11.x and harmony flags (because Promises and Generators are used)

* the version 2.0.x of mongodb nodejs driver is used which has some API changes from the 1.4.x versions

## mongodb and servers

See server folder for preconfigured express, koa, and hapi servers.


# Compatibility

The command line tool is tested only on Mac OS X

# Licence

MIT @pltod