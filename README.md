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

* have an easy entry point to start writing queries against the db


# How To Use The Tools

## mdb command line utility

In mdb folder

* dependencies with ```npm i``` 

* register the module with ```npm link``` 

* put the default values in config.json

* use commands like ```mdb start```, ```mdb init db```, ```mdb init collection```

* see mdb help for tool phylosophy and all commands


## mongodb and control flow

In test folder.

Demonstrates connect-insert-close flow with callbacks, promises, and generators.

How to start it:

* dependencies with ```npm i```

* start the server with ```mdb start``` (see the command line utility)

* run test suite with ```npm test```

> The actual test suite code where the three approaches are used is in test.js.

* to use the db put some db queries in index.js and run it with ```npm start```


**NOTES:**

* one must run these with node 0.11.x and harmony flags (because Promises and Generators are used)

* the version 2.0.x of mongodb nodejs driver is used which has some API changes from the 1.4.x versions

## mongodb and servers

See server folder for preconfigured express, koa, and hapi servers with native mongodb nodejs driver. There are huge list of abstractions but one must be careful how to choose particular considering tree main aspects:

* app server used

* control-flow approach

* application needs


# Compatibility

The command line tool is tested only on Mac OS X

# Licence

MIT @pltod