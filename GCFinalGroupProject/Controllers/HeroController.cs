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

        //[Authorize]
        [HttpPost("newAccount")]
        public UserInventory newAccount (string _HeroID, int _ItemOne,int _ItemTwo,int _Money)
        {
            ClaimsPrincipal currentUser = this.User;
            string currentUserID = currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;
            UserInventory result = new UserInventory() { UserID = currentUserID, HeroID = _HeroID, ItemOne = _ItemOne, ItemTwo = _ItemTwo, Money = _Money };
            context.userInventories.Add(result);
            context.SaveChanges();
            return result;
        }


    }
}
