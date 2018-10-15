let path = require('path')
let seedFile = require('knex-seed-file')
 
exports.seed = function(knex, Promise) {
   return Promise.all(seedFile(knex, path.resolve('./seeds/profissoes.csv'), 'professions', [
          'profession'
        ], {
          columnSeparator: ',',
          ignoreFirstLine: false
        }
      )
   )
}