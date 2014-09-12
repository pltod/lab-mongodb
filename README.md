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


* see comments in each file for more info
