const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express'); 
const swaggerDocument = require('./swagger');
const { Evento } = require('./models'); 

const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(bodyParser.json());
/**
 * @swagger
 * /api/eventos:
 *   post:
 *     summary: Crea un nuevo evento
 *     tags: [Eventos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Conferencia sobre React
 *               detalle:
 *                 type: string
 *                 example: Una conferencia sobre el uso de React en proyectos modernos
 *               tipoEvento:
 *                 type: string
 *                 example: conferencias
 *               subtipoEvento:
 *                 type: string
 *                 example: Culturales
 *               organizadoPor:
 *                 type: string
 *                 example: Académico
 *               dirigidoA:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 4, 7]
 *               capacidad:
 *                 type: integer
 *                 example: 400
 *               ubicacion:
 *                 type: string
 *                 example: presencial
 *               fechaInicio:
 *                 type: string
 *                 format: date
 *                 example: "2024-03-29"
 *               horaInicio:
 *                 type: string
 *                 format: time
 *                 example: "11:54:00"
 *               horaFin:
 *                 type: string
 *                 format: time
 *                 example: "18:57:00"
 *               espacioFisico:
 *                 type: string
 *                 example: "6"
 *               docenteId:
 *                 type: string
 *                 example: "9000010984"
 *     responses:
 *       201:
 *         description: Evento creado exitosamente
 *       500:
 *         description: Error en el servidor
 */


app.post('/api/eventos', async (req, res) => {
  try {

    const { docente: docenteId, ...datosEvento } = req.body;
    // Crear un nuevo evento utilizando el modelo Sequelize
    const nuevoEvento = await Evento.create({ ...datosEvento, docenteId });

    res.status(201).json(nuevoEvento);
  } catch (error) {
    console.error('Error al guardar el evento:', error);
    res.status(500).send({ error: error.message });
  }
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
