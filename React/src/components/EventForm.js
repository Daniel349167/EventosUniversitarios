import React, { useState, useEffect } from 'react';
import './EventForm.css';

function EventForm() {



  const [formData, setFormData] = useState({
    nombre: '',
    detalle: '',
    tipoEvento: '',
    subtipoEvento: '',
    organizadoPor: '',
    docente: '',
    dirigidoA: [],
    capacidad: '',
    ubicacion: 'presencial',
    fechaInicio: '',
    horaInicio: '',
    horaFin: '',
    espacioFisico: ''
  });

  // Opciones de los dropdowns
  const opcionesTipoEvento = [
    { value: 'talleres1dia', label: 'Talleres de un día' },
    { value: 'talleresConProgramacion', label: 'Talleres con programación' },
    { value: 'conferencias', label: 'Conferencias' },
    { value: 'concursos', label: 'Concursos' },
    { value: 'activaciones', label: 'Activaciones' },
    { value: 'otros', label: 'Otros' },
  ];

  const opcionesSubtipoEvento = {
    talleres1dia: ['Culturales', 'Deportivos'],
    talleresConProgramacion: ['Culturales', 'Deportivos'],
    conferencias: ['Culturales', 'Deportivos', 'Académico', 'Salud', 'Consejería', 'Responsabilidad Social'],
    concursos: ['Culturales', 'Deportivos', 'Académico', 'Salud', 'Consejería', 'Responsabilidad Social'],
    activaciones: ['Culturales', 'Deportivos', 'Académico', 'Salud', 'Consejería', 'Responsabilidad Social'],
    otros: ['Culturales', 'Deportivos', 'Académico', 'Salud', 'Consejería', 'Responsabilidad Social'],
  };

  const opcionesOrganizadoPor = [
    'Vida universitaria', 'Empleabilidad', 'Internacional', 'Consejería', 'Salud', 'Responsabilidad Social', 'Académico'
  ];

  const [docentes, setDocentes] = useState([]);
  const [campusOptions, setCampusOptions] = useState([]);
  const [espaciosFisicos, setEspaciosFisicos] = useState([]);

  useEffect(() => {
    // Asegúrate de que la URL sea la correcta para tu API local
    const apiUrl = 'http://localhost:5189/api';

    // Cargar Docentes
    fetch(`${apiUrl}/Docentes`)
      .then(response => response.json())
      .then(data => setDocentes(data.map(docente => ({ value: docente.id, label: docente.nombre }))))
      .catch(error => console.error('Error al cargar docentes:', error));

    // Cargar Campus
    fetch(`${apiUrl}/Campus`)
      .then(response => response.json())
      .then(data => setCampusOptions(data.map(campus => ({ value: campus.campusId, label: campus.nombre }))))
      .catch(error => console.error('Error al cargar campus:', error));

    // Cargar Espacios Físicos
    // Asegúrate de que la URL a continuación sea correcta para la API de ubicaciones
    fetch(`${apiUrl}/Ubicacion`)
      .then(response => response.json())
      .then(data => {
        const ubicacionesList = data.map(ubicacion => ({
          value: ubicacion.ubicacionId, // Asegúrate de usar el nombre de la propiedad correcto
          label: ubicacion.espacio      // Asegúrate de usar el nombre de la propiedad correcto
        }));
        setEspaciosFisicos(ubicacionesList);
      })
      .catch(error => console.error('Error al cargar ubicaciones:', error));
  }, []);


  const handleRadioChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handler para el submit del formulario
  const handleSubmit = async (event) => {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario

    // Preparar los datos para enviar
    const datosEvento = {
      nombre: formData.nombre,
      detalle: formData.detalle,
      tipoEvento: formData.tipoEvento,
      subtipoEvento: formData.subtipoEvento,
      organizadoPor: formData.organizadoPor,
      docente: formData.docente,
      dirigidoA: formData.dirigidoA,
      capacidad: formData.capacidad,
      ubicacion: formData.ubicacion,
      fechaInicio: formData.fechaInicio,
      horaInicio: formData.horaInicio,
      horaFin: formData.horaFin,
      espacioFisico: formData.espacioFisico
    };

    try {
      // URL de tu API
      const apiUrl = 'http://localhost:3001/api/eventos';

      // Hacer la solicitud POST
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosEvento), // Convertir los datos del evento a JSON
      });

      if (response.ok) {
        const resultado = await response.json();
        alert('Evento guardado con éxito'); // Usar alert para informar al usuario
        console.log('Evento guardado:', resultado);
        // Aquí puedes hacer algo tras guardar el evento, como redirigir
      } else {
        // Manejar respuestas de error de la API
        const errorText = await response.text();
        alert('Error al guardar el evento: ' + errorText); // Mostrar el error en un alert
        console.error('Error al guardar el evento:', errorText);
      }
    } catch (error) {
      alert('Error al hacer la solicitud: ' + error.message); // Mostrar el error de la solicitud en un alert
      console.error('Error al hacer la solicitud:', error);
    }
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setFormData(prevState => {
      // Convertimos el value a un número, ya que los IDs suelen ser numéricos
      const valorNumerico = Number(value);
      const yaEstaSeleccionado = prevState.dirigidoA.includes(valorNumerico);
  
      if (checked && !yaEstaSeleccionado) {
        // Si el checkbox está marcado y el valor aún no está en el arreglo, lo añadimos
        return {
          ...prevState,
          dirigidoA: [...prevState.dirigidoA, valorNumerico]
        };
      } else if (!checked && yaEstaSeleccionado) {
        // Si el checkbox no está marcado y el valor está en el arreglo, lo eliminamos
        return {
          ...prevState,
          dirigidoA: prevState.dirigidoA.filter(item => item !== valorNumerico)
        };
      }
  
      return prevState; // Si no hay cambios, retornamos el estado anterior
    });
  };
  


  // Actualiza el subtipo de evento basado en el tipo de evento seleccionado
  const subtipoEventoOpciones = formData.tipoEvento ? opcionesSubtipoEvento[formData.tipoEvento] || [] : [];

  return (
    <div className="event-form">
      <form onSubmit={handleSubmit}>

        <div className="input-group">
          <label htmlFor="nombre">Nombre de Evento</label>
          <input
            id="nombre"
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            maxLength="100"
          />
        </div>

        <div className="input-group">
          <label htmlFor="detalle">Descripción del Evento</label>
          <textarea
            id="detalle"
            name="detalle"
            value={formData.detalle}
            onChange={handleInputChange}
            maxLength="400"
          />
        </div>
        {/* Campos del formulario aquí */}
        <div className="input-group">
          <label htmlFor="tipoEvento">Tipo de Evento</label>
          <select id="tipoEvento" name="tipoEvento" value={formData.tipoEvento} onChange={handleInputChange}>
            <option value="">Seleccione un tipo de evento</option>
            {opcionesTipoEvento.map((opcion) => (
              <option key={opcion.value} value={opcion.value}>{opcion.label}</option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="subtipoEvento">Subtipo de Evento</label>
          <select id="subtipoEvento" name="subtipoEvento" value={formData.subtipoEvento} onChange={handleInputChange}>
            <option value="">Seleccione un subtipo de evento</option>
            {subtipoEventoOpciones.map((opcion, index) => (
              <option key={index} value={opcion}>{opcion}</option>
            ))}
          </select>
        </div>

        {/* Organizado por */}
        <div className="input-group radio-group">
          <label>Organizado por:</label>
          <div className="radio-options">
            {opcionesOrganizadoPor.map((opcion) => (
              <label key={opcion} className="radio-label">
                <input
                  type="radio"
                  name="organizadoPor"
                  value={opcion}
                  checked={formData.organizadoPor === opcion}
                  onChange={handleRadioChange}
                />
                {opcion}
              </label>
            ))}
          </div>
        </div>

        {/* Docente - Se muestra solo si organizadoPor es 'Académico' */}
        {formData.organizadoPor === 'Académico' && (
          <div className="input-group">
            <label htmlFor="docente">Docente</label>
            <select
              id="docente"
              name="docente"
              value={formData.docente}
              onChange={handleInputChange}
              disabled={formData.organizadoPor !== 'Académico'}
            >
              <option value="">Seleccione un docente</option>
              {docentes.map((docente) => (
                <option key={docente.value} value={docente.value}>{docente.label}</option>
              ))}
            </select>
          </div>
        )}


        {/* Dirigido a */}
        <div className="input-group checkbox-group">
          <label>Dirigido a:</label>
          <div className="checkbox-options">
            {campusOptions.map((campus) => (
              <label key={campus.value} className="checkbox-label">
                <input
                  type="checkbox"
                  name="dirigidoA"
                  value={campus.value}
                  checked={formData.dirigidoA.includes(campus.value)}
                  onChange={handleCheckboxChange}
                />
                {campus.label}
              </label>
            ))}
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="capacidad">Capacidad - Vacantes</label>
          <input
            id="capacidad"
            type="number"
            name="capacidad"
            value={formData.capacidad}
            onChange={handleInputChange}
          />
        </div>
        {/* Ubicación */}
        <div className="input-group">
          <label className="label-ubicacion">Ubicación</label>
          <div className="radio-ubicacion">
            <label>
              <input
                type="radio"
                name="ubicacion"
                value="presencial"
                checked={formData.ubicacion === 'presencial'}
                onChange={handleInputChange}
              />
              Presencial
            </label>
            <label>
              <input
                type="radio"
                name="ubicacion"
                value="virtual"
                checked={formData.ubicacion === 'virtual'}
                onChange={handleInputChange}
              />
              Virtual
            </label>
          </div>
        </div>
        {/* Ubicación - Si 'Presencial' es seleccionado, mostrar select con espacios físicos */}
        {formData.ubicacion === 'presencial' && (
          <div className="input-group">
            <label htmlFor="espacioFisico">Espacio Físico</label>
            <select
              id="espacioFisico"
              name="espacioFisico"
              value={formData.espacioFisico || ''}
              onChange={handleInputChange}
            >
              <option value="">Seleccione un espacio</option>
              {espaciosFisicos.map((espacio) => (
                <option key={espacio.value} value={espacio.value}>{espacio.label}</option>
              ))}
            </select>
          </div>
        )}

        {/* Fecha y Hora */}
        <div className="datetime-group">
          {/* Fecha Inicio */}
          <div className="input-group">
            <label htmlFor="fechaInicio">Fecha Inicio</label>
            <input
              id="fechaInicio"
              type="date"
              name="fechaInicio"
              value={formData.fechaInicio}
              onChange={handleInputChange}
            />
          </div>

          {/* Hora Inicio */}
          <div className="input-group">
            <label htmlFor="horaInicio">Hora Inicio</label>
            <input
              id="horaInicio"
              type="time"
              name="horaInicio"
              min="06:00"
              max="22:00"
              value={formData.horaInicio}
              onChange={handleInputChange}
            />
          </div>

          {/* Hora Fin */}
          <div className="input-group">
            <label htmlFor="horaFin">Hora Fin</label>
            <input
              id="horaFin"
              type="time"
              name="horaFin"
              min="07:00"
              max="23:00"
              value={formData.horaFin}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="button-group">
          <button type="button" className="cancel-button">Cancelar</button>
          <button type="submit" className="submit-button">Programar</button>
        </div>
      </form>
    </div>
  );
}

export default EventForm;
