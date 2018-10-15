# the-generics-crud-api
A simple API to help developers to load data into their databases during development

##### Make sure you have nodejs installed and running
```
$ brew install node
```
##### Installing node dependencies
```
$ cd api_root_folder/
$ yarn install
```

##### Get the database ready to play
##### Make sure you have knex installed globally then run:
```
$ cd knex
$ knex migrate:latest
$ knex seed:run
```

##### You're ready to go
###### Go to the project's root folder then run:
```
$ yarn start-dev
```