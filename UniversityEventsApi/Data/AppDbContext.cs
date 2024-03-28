using Microsoft.EntityFrameworkCore;
using UniversityEventsApi.Models; 

namespace UniversityEventsApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
         protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Usa el nombre de tabla singular 'Campus'
            modelBuilder.Entity<Campus>().ToTable("Campus");

        }

        public DbSet<Campus> Campuses { get; set; }
        public DbSet<Ubicacion> Ubicaciones { get; set; }
        public DbSet<Docente> Docentes { get; set; }

    }
}
