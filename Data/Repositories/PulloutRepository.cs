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
    internal class PulloutRepository : RepositoryBase<Pullout>, IPulloutRepository
    {
        private readonly AppDB1Context _context;

        public PulloutRepository(AppDB1Context context) : base(context)
        {
            _context = context;
        }
  
        public async Task<List<Pullout>> GetAllPulloutQry(PulloutSearch searchInfo)
        {
            List<Pullout> pullouts = await _context.Pullouts
						.Include(sales => sales.Sales)
						.Include(delivery => delivery.Delivery)
						.AsNoTracking().ToListAsync();
			if (!String.IsNullOrEmpty(searchInfo.Keyword))
			{
				
				pullouts = pullouts.Where(p => 
									p.PulloutName.ToString().ToUpper().Contains(searchInfo.Keyword.ToUpper())
									|| p.PulloutDescription.ToString().ToUpper().Contains(searchInfo.Keyword.ToUpper())
									|| p.PulloutDate.ToString().ToUpper().Contains(searchInfo.Keyword.ToUpper())
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
            
            return pullouts;
        }

    }
}