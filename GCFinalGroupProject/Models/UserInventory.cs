using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GCFinalGroupProject.Models
{
    public class UserInventory
    {
        [Key]
        public int ID { get; set; }

        public string UserID { get; set; }

        [ForeignKey("UserID")] //talks to aspnet user
        public ApplicationUser ApplicationUser { get; set; }

        public string HeroID { get; set; } //first hero generated
        public int? ItemOne { get; set; } //null to begin
        public int? ItemTwo { get; set; } //null to begin
        public int? Money { get; set; } //possibly starting money

    }
}
