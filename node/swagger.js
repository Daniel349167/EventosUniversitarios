const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Eventos Universitarios',
      version: '1.0.0',
      description: 'Esta es una API diseñada para gestionar eventos universitarios',
    },
    servers: [
      {
        url: 'http://localhost:3001', // Cambia esto por la URL de producción si es necesario
      },
    ],
  },
  apis: ['./app.js'], // Ubicación de tus archivos de rutas para leer las definiciones de los endpoints
};

const specs = swaggerJsdoc(options);

module.exports = specs;
