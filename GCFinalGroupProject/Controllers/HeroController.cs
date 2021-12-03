using GCFinalGroupProject.Data;
using GCFinalGroupProject.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace GCFinalGroupProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HeroController : ControllerBase
    {

        public ApplicationDbContext context;
        public HeroController(ApplicationDbContext _context)
        {
            context = _context;
        }

        [Authorize]
        [HttpPost("newAccount")]
        public UserInventory NewAccount (string heroID)
        {
            ClaimsPrincipal currentUser = this.User;
            string currentUserID = currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;
            UserInventory result = new UserInventory() { UserID = currentUserID, HeroID = heroID, ItemOne = 0, ItemTwo = 0, Money = 300 };
            this.context.userInventories.Add(result);
            this.context.SaveChanges();
            return result;
        }


    }
}
