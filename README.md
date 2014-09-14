lab-mongodb
===========

* experiments with mongodb node.js driver, async and tape


## Labs Info

#### 01-startdb.js

```node 01-startdb.js```

> run mongodb in automatically created data folder -> folder named 'temp' in the current directory

```node 01-startdb.js 'data_folder_path'```

> run mongodb in the specified data folder. If folder does not exists nothing happens.



#### 02-start-sharded-cluster.js


> works but require some paths to be changed inside the script

> created processes must be killed manually after that

> ```ps -Aef | grep mongo``` could be used to see process numbers

! Note that this script requires node version 0.11.x because it is using Promise function.

#### 03-mdb

NOTE: This is on idea level only. Contains hardcoded paths and there is no error management (it could leaves unclosed db connections if there is error during execution). In ideal case with well configured paths it is working.

* The idea of this module is to invoke db operations in node way. 

> See avalable commands - **mdb**

> Start mongodb with - **mdb start**

> Show running mongodb processes - **mdb show**

> Drop all collections and reinit with fresh data - **mdb reinit**

> See all data in collection - mdb collection_name 

* Module is working extensively with hardcoded paths. More work is needed to make all paths configurable.

* See 03-mdb/README for usage or run ```mdb.js``` to print available operations.

! Note that this script requires node version 0.11.x because it is using Promise function.


#### 04-async

* Experiment to weave several async operations in a process with async library.

* Currently the operations included are db connection, running a test suite with tape, and db disconnection.

* Additional operations like data re-initialization could be added to the process.


#### 05-thunky

* Connect to mongodb with thunkifying the connect function. Make the code looks a little bit more synchronous.

! Note that this script requires node version 0.11.x


## More Info

See comments in each file for more info
