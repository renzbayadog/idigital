using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;

using idigital.ViewModels; 
using idigital.Data.Entities; 
using idigital.Data; 
using idigital.Data.Repositories; 
using codegen.Helpers; 


namespace idigital.Controllers.Sales_view
{
    public class SalesController : Controller
	{
		private readonly AppDB1Context _context;

		public SalesController(AppDB1Context context)
		{
			_context = context;
		}

        // GET: Sales
        public ActionResult Index()
        {
            return View();
        }

        // GET: Sales/Details/5
        public async Task<ActionResult> Details(int id)
        {
            if (id == null || id == 0)
			{
                return RedirectToAction(nameof(Index));
			}

			var sale = await _context.Sales
							
							.AsNoTracking()
							.FirstOrDefaultAsync(m => m.SalesId == id);

			if (sale == null)
			{
				
                return RedirectToAction(nameof(Index));
			}
			
			var Sale = new SalesVM()
			{
				SalesId = sale.SalesId,
				SalesName = sale.SalesName,
				SalesDescription = sale.SalesDescription,
				SalesDate = sale.SalesDate,
				BusinessValue = sale.BusinessValue,
				ReceiptImage = sale.ReceiptImage
			};

            return View(Sale);
        }

        // GET: Sales/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Sales/Create
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

        // GET: Sales/Update/5
        public async Task<ActionResult> Update(int id)
        {
             if (id == null || id == 0)
		     {
                return RedirectToAction(nameof(Index));
		     }
             
		     Sales sale = await _context.Sales
		     				
		     				.AsNoTracking()
		     				.FirstOrDefaultAsync(m => m.SalesId == id);
             
		     if (sale == null)
		     {
                return RedirectToAction(nameof(Index));
		     }
		     
		     var Sale = new SalesVM()
		     {
		     	SalesId = sale.SalesId,
				SalesName = sale.SalesName,
				SalesDescription = sale.SalesDescription,
				SalesDate = sale.SalesDate,
				BusinessValue = sale.BusinessValue,
				ReceiptImage = sale.ReceiptImage
		     };

		     

             return View(Sale);
        }

        // POST: Sales/Update/5
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

        // GET: Sales
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
