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
        public UserInventory newAccount(string _HeroID, int _ItemOne, int _ItemTwo, int _Money)
        {
            ClaimsPrincipal currentUser = this.User;
            string currentUserID = currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;
            UserInventory result = new UserInventory() { UserID = currentUserID, HeroID = _HeroID, ItemOne = _ItemOne, ItemTwo = _ItemTwo, Money = _Money };
            context.userInventories.Add(result);
            context.SaveChanges();
            return result;
        }

        [Authorize]
        [HttpGet("CheckHeroExists")]
        public bool CheckHeroExists()
        {
            bool exists = false;
            ClaimsPrincipal currentUser = this.User;
            string currentUserID = currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;

            UserInventory[] result = context.userInventories.Where(x => x.UserID == currentUserID).ToArray();
            if (result.Length > 0)
            {
                exists = true;
            }
            return exists;
        }



        [Authorize]
        [HttpGet("GetInv")]
        public UserInventory GetInv()
        {
            ClaimsPrincipal currentUser = this.User;
            string currentUserID = currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;
            UserInventory Myinv = new UserInventory();
            List<UserInventory> invList = context.userInventories.ToList();

            foreach (UserInventory inv in invList)
            {
                if (inv.UserID == currentUserID)
                {
                    Myinv = inv;
                    break;
                }
            }
            return Myinv;
        }
        //DEBUG
        //put to change HeroId in userInventory table. 
        [Authorize]
        [HttpPut("AfterDeath")]
        public UserInventory AfterDeath(string heroID)
        {
            ClaimsPrincipal currentUser = this.User;
            string currentUserID = currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;
            UserInventory currentInv = context.userInventories.Where(x => x.UserID == currentUserID).First();
            currentInv.HeroID = heroID;
            context.userInventories.Update(currentInv);
            context.SaveChanges();
            return currentInv;
        }
    }
}
