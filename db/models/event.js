'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  event.init({
    name: DataTypes.STRING,
    title: DataTypes.STRING,
    createTime: DataTypes.DATE,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    imgUrl: DataTypes.STRING,
    category: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  }, {

    sequelize,
    modelName: 'event',
  });
  return event;
};