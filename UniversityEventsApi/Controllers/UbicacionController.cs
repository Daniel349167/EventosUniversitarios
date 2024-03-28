
// UbicacionController.cs
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using UniversityEventsApi.Models;
using UniversityEventsApi.Data;
using Microsoft.EntityFrameworkCore;


namespace UniversityEventsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UbicacionController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UbicacionController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Ubicacion
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ubicacion>>> GetUbicaciones()
        {
            return await _context.Ubicaciones.ToListAsync();
        }
    }
}