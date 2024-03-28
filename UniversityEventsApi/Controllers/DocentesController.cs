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
    public class DocentesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DocentesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Docentes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Docente>>> GetDocentes()
        {
            return await _context.Docentes.ToListAsync();
        }

        // Más métodos de API...
    }
}
