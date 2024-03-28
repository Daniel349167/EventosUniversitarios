using Microsoft.EntityFrameworkCore;
using UniversityEventsApi.Models;
using UniversityEventsApi.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("http://localhost:3000") // Permite la URL de tu aplicación React
                          .AllowAnyHeader()
                          .AllowAnyMethod());
});

// Agregar servicios al contenedor.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors("AllowSpecificOrigin"); // Asegúrate de usar la política CORS aquí
}


// Configurar la canalización de solicitudes HTTP.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Crear los endpoints de la API

// Endpoint para obtener todos los campus
app.MapGet("/api/Campus", async (AppDbContext context) =>
{
    return await context.Campuses.ToListAsync();
})
.WithName("GetCampuses")
.WithOpenApi();

// Endpoint para obtener todas las ubicaciones
app.MapGet("/api/Ubicacion", async (AppDbContext context) =>
{
    return await context.Ubicaciones.ToListAsync();
})
.WithName("GetUbicaciones")
.WithOpenApi();

// Endpoint para obtener todos los docentes
app.MapGet("/api/Docentes", async (AppDbContext context) =>
{
    return await context.Docentes.ToListAsync();
})
.WithName("GetDocentes")
.WithOpenApi();

// Correr la aplicación
app.Run();
