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
    public interface IPulloutRepository : IRepositoryBase<Pullout>
    {
        Task<List<Pullout>> GetAllPulloutQry(PulloutSearch searchInfo);
    }
}