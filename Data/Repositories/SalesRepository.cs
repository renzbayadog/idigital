using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using idigital.ViewModels; 
using idigital.Data.Entities; 
using idigital.Data; 
using idigital.Data.Repositories; 
using codegen.Helpers; 


namespace idigital.Data.Repositories
{
    internal class SalesRepository : RepositoryBase<Sales>, ISalesRepository
    {
        private readonly AppDB1Context _context;

        public SalesRepository(AppDB1Context context) : base(context)
        {
            _context = context;
        }
  
        public async Task<List<Sales>> GetAllSaleQry(SalesSearch searchInfo)
        {
            List<Sales> sales = await _context.Sales
						
						.AsNoTracking().ToListAsync();
			if (!String.IsNullOrEmpty(searchInfo.Keyword))
			{
				
				sales = sales.Where(s => 
									s.SalesName.ToString().ToUpper().Contains(searchInfo.Keyword.ToUpper())
									|| s.SalesDescription.ToString().ToUpper().Contains(searchInfo.Keyword.ToUpper())
									|| s.SalesDate.ToString().ToUpper().Contains(searchInfo.Keyword.ToUpper())
									|| s.BusinessValue.ToString().ToUpper().Contains(searchInfo.Keyword.ToUpper())
									|| s.ReceiptImage.ToString().ToUpper().Contains(searchInfo.Keyword.ToUpper())
									)
								.ToList();
			}

				//.Where(f => searchInfo.DateFrom == null || f.CreateDate >= searchInfo.DateFrom)
				//.Where(f => searchInfo.DateTo == null || f.CreateDate <= searchInfo.DateTo)
				//.OrderByDescending(s => s.CreateDate).ToList();

				//if (!String.IsNullOrEmpty(searchInfo.SortOrder))
				//{
				//	var sortCurrent = searchInfo.SortOrder.Split("_").Last();
				//	var sortCurrent = searchInfo.SortOrder.Split("_").First();
				//	if (sortCurrent.Equals("DESC"))
				//	{
				//		products.OrderByDescending(a=>a.)
				//	}
				//}
            
            return sales;
        }

    }
}