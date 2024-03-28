'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Evento extends Model {
    static associate(models) {
      Evento.belongsTo(models.Docente, { foreignKey: 'docenteId', as: 'docente' });
    }
  }
  Evento.init({
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    detalle: {
      type: DataTypes.STRING(400),
      allowNull: false
    },
    tipoEvento: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subtipoEvento: {
      type: DataTypes.STRING,
      allowNull: true
    },
    organizadoPor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    docenteId: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'Docente', // Nombre del modelo referenciado
        key: 'id', // Clave en el modelo referenciado
      }
    },    
    dirigidoA: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false
    },
    capacidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ubicacion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fechaInicio: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    horaInicio: {
      type: DataTypes.TIME,
      allowNull: false
    },
    horaFin: {
      type: DataTypes.TIME,
      allowNull: false
    },
    espacioFisico: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Evento',
  });
  return Evento;
};
