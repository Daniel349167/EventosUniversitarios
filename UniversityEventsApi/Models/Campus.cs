using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace UniversityEventsApi.Models
{
    [Table("Campus")]
    public class Campus
    {
        public int CampusId { get; set; }
        public string? Nombre { get; set; }

        // Puedes añadir más propiedades según sea necesario
    }
}
