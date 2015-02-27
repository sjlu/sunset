"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    // add altering commands here, calling 'done' when finished
    migration.createTable(
      'users',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        createdAt: {
          type: DataTypes.DATE
        },
        updatedAt: {
          type: DataTypes.DATE
        },
        email: {
          type: DataTypes.STRING
        },
        password: {
          type: DataTypes.STRING
        }
      },
      {
        engine: 'MYISAM', // default: 'InnoDB'
        charset: 'latin1' // default: null
      }
    )
    done();
  },

  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    migration.dropTable('users')
    done();
  }
};
