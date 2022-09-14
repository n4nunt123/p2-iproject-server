'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bookmark.belongsTo(models.User, { foreignKey: 'UserId' })

      Bookmark.hasMany(models.Favorite, { foreignKey: 'BookmarkId' })
    }
  }
  Bookmark.init({
    title: DataTypes.STRING,
    rightHand: DataTypes.STRING,
    leftHand: DataTypes.STRING,
    helmet: DataTypes.STRING,
    chestArmor: DataTypes.STRING,
    gauntlet: DataTypes.STRING,
    legArmor: DataTypes.STRING,
    talisman1: DataTypes.STRING,
    talisman2: DataTypes.STRING,
    talisman3: DataTypes.STRING,
    talisman4: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bookmark',
  });
  return Bookmark;
};