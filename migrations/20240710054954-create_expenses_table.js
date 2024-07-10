'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('expenses', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'users', // name of the target model
          key: 'id' // key in the target model that the foreign key references
        }
      },
      amount: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      isDelete:{
        type: Sequelize.BOOLEAN,
        defaultValue:false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('expenses');
  }
};
