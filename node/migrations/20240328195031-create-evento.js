'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Eventos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      detalle: {
        type: Sequelize.STRING(400),
        allowNull: false
      },
      tipoEvento: {
        type: Sequelize.STRING,
        allowNull: false
      },
      subtipoEvento: {
        type: Sequelize.STRING,
        allowNull: true // Hacerlo nullable ya que depende del tipo de evento
      },
      organizadoPor: {
        type: Sequelize.STRING,
        allowNull: false
      },
      docenteId: {
        type: Sequelize.TEXT,
        references: {
          model: 'Docentes', // Asume que este es el nombre de tu tabla de docentes
          key: 'ID', 
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      dirigidoA: {
        type: Sequelize.ARRAY(Sequelize.INTEGER), // O considera una tabla de relación si es muchos a muchos
        allowNull: false
      },
      capacidad: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 1 // Asegura que no se inserten valores menores a 1
        }
      },
      ubicacion: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fechaInicio: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      horaInicio: {
        type: Sequelize.TIME,
        allowNull: false
      },
      horaFin: {
        type: Sequelize.TIME,
        allowNull: false
      },
      espacioFisico: {
        type: Sequelize.STRING,
        allowNull: true // Nullable, ya que aplica solo para eventos presenciales
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Eventos');
  }
};
