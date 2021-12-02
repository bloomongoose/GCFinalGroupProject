using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GCFinalGroupProject.Models
{
    public class ItemShop
    {
        [Key]
        public int ID { get; set; }

        public string ItemName { get; set; } 
        public string ItemDescription { get; set; }
        public int? ItemPrice { get; set; }

 
    }
}
