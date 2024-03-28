'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Docente extends Model {
    static associate(models) {
      // Aquí van las asociaciones para Docente, si es que tiene alguna.
      // Por ejemplo:
      // Docente.hasMany(models.Evento, { foreignKey: 'docenteId', as: 'eventos' });
    }
  }
  Docente.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    nombre: DataTypes.STRING
    // ... otros campos que necesites ...
  }, {
    sequelize,
    modelName: 'Docente',
  });
  Docente.associate = function(models) {
    Docente.hasMany(models.Evento, { foreignKey: 'docenteId', as: 'eventos' });
  };
  return Docente;
};
