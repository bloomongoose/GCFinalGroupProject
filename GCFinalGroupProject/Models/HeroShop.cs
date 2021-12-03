using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GCFinalGroupProject.Models
{
    public class HeroShop
    {

        [Key]
        public int ID { get; set; }

        public string HeroID { get; set; }
        public string HeroName { get; set; }
        public int? HeroPrice { get; set; }

    }
}
