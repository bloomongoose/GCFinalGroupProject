using GCFinalGroupProject.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GCFinalGroupProject.Models;
using System.Security.Claims;

namespace GCFinalGroupProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        public ApplicationDbContext context;
        public ItemController(ApplicationDbContext _context)
        {
            context = _context;
        }


        [HttpGet("AllItems")]
        public ItemShop[] GetAllItems()
        {
            return context.itemShop.ToArray();

        }

        [HttpPatch("Buy")]
        public UserInventory BuyItem(int id, int price)
        {
            ClaimsPrincipal currentUser = this.User;
            string currentUserID = currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;

            UserInventory Myinv = new UserInventory();
            //List<UserInventory> invList = context.userInventories.ToList();

            foreach (UserInventory inv in context.userInventories)
            {
                if (inv.UserID == currentUserID)
                {
                    if (inv.Money >= price)
                    {
                        //checks if inventory slot 1 then 2 is empty
                        if (inv.ItemOne == 0)
                        {
                            inv.Money = inv.Money - price;
                            inv.ItemOne = id;
                            Myinv = inv;
                            break;
                        }
                        inv.Money = inv.Money - price;
                        inv.ItemTwo = id;
                        Myinv = inv;
                        break;
                    }
                    break;
                }
            }
            context.SaveChanges();
            return Myinv;
        }

        //PATCH for item use. Changing item slots to zero. 
    }
}
