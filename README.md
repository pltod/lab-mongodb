lab-mongodb
===========

* experiments with mongodb node.js driver, async and tape


## Scripts Info

#### 01-startdb.js

```node 01-startdb.js```

> run mongodb in automatically created temp folder in the current directory

```node 01-startdb.js 'dbpath'```

> run mongodb in the specified db path if it exists



#### 02_start-sharded-cluster.js

> works but require some paths to be changed inside the script

> created processes must be killed manually after that

> ```ps -Aef | grep mongo``` could be used to see process numbers


#### 03-mdb

* The idea of this module is to make more convenient different db operations. For example to start mongodb, reinit collections with fresh data, show collection content, show running mongodb processes etc. If the module is published mdb command will be available in shell which means all operations will be started with ```mdb 'operation'``` without the need to remeber the coresponding mongodb commands.

* Module is working extensively with hardcoded paths. More work is needed to make all paths configurable.

* See 03-mdb/README for usage or run ```mdb.js``` to print available operations.


## More Info

See comments in each file for more info
