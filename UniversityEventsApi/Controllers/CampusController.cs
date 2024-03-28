// CampusController.cs
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
    public class CampusController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CampusController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Campus
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Campus>>> GetCampuses()
        {
            return await _context.Campuses.ToListAsync();
        }
    }
}
