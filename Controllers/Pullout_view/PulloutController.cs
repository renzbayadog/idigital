using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Data;

using idigital.ViewModels; 
using idigital.Data.Entities; 
using idigital.Data; 
using idigital.Data.Repositories; 
using codegen.Helpers; 


namespace idigital.Controllers.Pullout_view
{
    public class PulloutController : Controller
	{
		private readonly AppDB1Context _context;

		public PulloutController(AppDB1Context context)
		{
			_context = context;
		}

        // GET: Pullout
        public ActionResult Index()
        {
            return View();
        }

        // GET: Pullout/Details/5
        public async Task<ActionResult> Details(int id)
        {
            if (id == null || id == 0)
			{
                return RedirectToAction(nameof(Index));
			}

			var pullout = await _context.Pullouts
							.Include(sales => sales.Sales)
							.Include(delivery => delivery.Delivery)
							.AsNoTracking()
							.FirstOrDefaultAsync(m => m.PulloutId == id);

			if (pullout == null)
			{
				
                return RedirectToAction(nameof(Index));
			}
			
			var Pullout = new PulloutVM()
			{
				PulloutId = pullout.PulloutId,
				PulloutName = pullout.PulloutName,
				PulloutDescription = pullout.PulloutDescription,
				PulloutDate = pullout.PulloutDate,
				SalesId = pullout.Sales?.SalesId,
				ReceiptImage = pullout.ReceiptImage,
				DeliveryId = pullout.Delivery?.DeliveryId,
				SalesName = pullout.Sales?.SalesName,
				SalesDescription = pullout.Sales?.SalesDescription,
				DeliveryName = pullout.Delivery?.DeliveryName,
				DeliveryAddress = pullout.Delivery?.DeliveryAddress
			};

            return View(Pullout);
        }

        // GET: Pullout/Create
        public ActionResult Create()
        {
            ViewData["SalesName"] = new SelectList(_context.Sales, "SalesId", "SalesName");
			ViewData["SalesId"] = new SelectList(_context.Sales, "SalesId", "SalesName");
			ViewData["DeliveryName"] = new SelectList(_context.Deliveries, "DeliveryId", "DeliveryName");
			ViewData["DeliveryId"] = new SelectList(_context.Deliveries, "DeliveryId", "DeliveryName");
            return View();
        }

        // POST: Pullout/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: Pullout/Update/5
        public async Task<ActionResult> Update(int id)
        {
             if (id == null || id == 0)
		     {
                return RedirectToAction(nameof(Index));
		     }
             
		     Pullout pullout = await _context.Pullouts
		     				.Include(sales => sales.Sales)
							.Include(delivery => delivery.Delivery)
		     				.AsNoTracking()
		     				.FirstOrDefaultAsync(m => m.PulloutId == id);
             
		     if (pullout == null)
		     {
                return RedirectToAction(nameof(Index));
		     }
		     
		     var Pullout = new PulloutVM()
		     {
		     	PulloutId = pullout.PulloutId,
				PulloutName = pullout.PulloutName,
				PulloutDescription = pullout.PulloutDescription,
				PulloutDate = pullout.PulloutDate,
				SalesId = pullout.Sales?.SalesId,
				ReceiptImage = pullout.ReceiptImage,
				DeliveryId = pullout.Delivery?.DeliveryId,
				SalesName = pullout.Sales?.SalesName,
				SalesDescription = pullout.Sales?.SalesDescription,
				DeliveryName = pullout.Delivery?.DeliveryName,
				DeliveryAddress = pullout.Delivery?.DeliveryAddress
		     };

		     ViewData["SalesName"] = new SelectList(_context.Sales, "SalesId", "SalesName");
			ViewData["SalesId"] = new SelectList(_context.Sales, "SalesId", "SalesName");
			ViewData["DeliveryName"] = new SelectList(_context.Deliveries, "DeliveryId", "DeliveryName");
			ViewData["DeliveryId"] = new SelectList(_context.Deliveries, "DeliveryId", "DeliveryName");

             return View(Pullout);
        }

        // POST: Pullout/Update/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Update(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: Pullout
        //Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: GradeLevel/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
