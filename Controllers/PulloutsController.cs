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


namespace idigital.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class PulloutsController : ControllerBase
	{
		private readonly IPulloutRepository _pulloutRepository;

		public PulloutsController(IRepositoryWrapper repoWrapper)
		{
			_pulloutRepository = repoWrapper.Pullout_Repository;
		}

		[HttpGet]
        [Route("List/Page{currPage:int}/PageSize{pageSize:int}")]
        [Route("List")]
		public async Task<IActionResult> GetAllPullout([FromQuery] PulloutSearch searchInfo,int currPage = 1, int pageSize = 10)
		{
			if(!ModelState.IsValid) return BadRequest();

			List<Pullout> pullouts = await _pulloutRepository.GetAllPulloutQry(searchInfo);

			// Map entity model to view model
			List<PulloutVM> pulloutsVM = new List<PulloutVM>();
			
			foreach(Pullout pullout in pullouts)
			{
				pulloutsVM.Add(new PulloutVM()
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
				});
			}

			Pagination<PulloutVM> pagination = new Pagination<PulloutVM>(pulloutsVM, currPage, pageSize);

			return Ok(pagination);
		}

		[HttpPost("Add")]
		public async Task<IActionResult> PostPullout(PulloutVM pullout)
		{
			if (!ModelState.IsValid)
            {
                return BadRequest();
            }

			

			Pullout pulloutToAdd = new Pullout()
			{
				PulloutName = pullout.PulloutName,
				PulloutDescription = pullout.PulloutDescription,
				PulloutDate = pullout.PulloutDate,
				SalesId = pullout.SalesId,
				ReceiptImage = pullout.ReceiptImage,
				DeliveryId = pullout.DeliveryId
			};

            _pulloutRepository.Add(pulloutToAdd);

            try
            {
                await _pulloutRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
				return BadRequest(ex.Message.ToString());
            }

            return Ok();
		}

		[HttpPost("Update")]
		public async Task<IActionResult> PutPullout(PulloutVM pullout)
		{
			if (!ModelState.IsValid)
            {
                return BadRequest();
            }

			

			Pullout pulloutToUpdate = new Pullout()
			{
				PulloutId = pullout.PulloutId,
				PulloutName = pullout.PulloutName,
				PulloutDescription = pullout.PulloutDescription,
				PulloutDate = pullout.PulloutDate,
				SalesId = pullout.SalesId,
				ReceiptImage = pullout.ReceiptImage,
				DeliveryId = pullout.DeliveryId
			};

            _pulloutRepository.Update(pulloutToUpdate);

			try
            {
                await _pulloutRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
				return BadRequest(ex.Message.ToString());
            }
            return Ok();
		}

		[HttpDelete("{id}/Delete")]
        public async Task<IActionResult> DeletePullout(int id)
		{
			Pullout pulloutToDelete = await _pulloutRepository.FindFirstAsync(m => m.PulloutId == id);
			
			if(pulloutToDelete == null)
				return BadRequest("Not Found");
			
            _pulloutRepository.Delete(pulloutToDelete);

			try
			{
                await _pulloutRepository.SaveChangesAsync();
			}
			catch (Exception ex)
            {
				return BadRequest(ex.Message.ToString());
            }
            
			return Ok();
		}

		[HttpPost("delete/bulk")]
        public async Task<IActionResult> DeleteBulk([FromBody]List<int> pullouts)
        {
            if (pullouts.Count > 0)
            {
                foreach (int pullout in pullouts)
                {
					Pullout pulloutToDelete = await _pulloutRepository.FindFirstAsync(m => m.PulloutId == pullout);
					_pulloutRepository.Delete(pulloutToDelete);
                }
				try
				{
					await _pulloutRepository.SaveChangesAsync();
				}
				catch (Exception ex)
				{
					return BadRequest(ex.Message.ToString());
				}
            }
            return Ok();
        }

		#region EXPORT TO EXCEL

        [HttpGet("export/report")]
        public async Task<IActionResult> ExportPullout([FromQuery] PulloutSearch searchInfo)
        {
			List<Pullout> pullouts = await _pulloutRepository.GetAllPulloutQry(searchInfo);

			// Map entity model to view model
			List<PulloutVM> pulloutsVM = new List<PulloutVM>();
			
			foreach(Pullout pullout in pullouts)
			{
				pulloutsVM.Add(new PulloutVM()
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
				});
			}
 
            DataTable dt = new DataTable("Pullout");
            dt.Columns.Add("PulloutId", typeof(string));
						dt.Columns.Add("PulloutName", typeof(string));
						dt.Columns.Add("PulloutDescription", typeof(string));
						dt.Columns.Add("PulloutDate", typeof(string));
						dt.Columns.Add("SalesId", typeof(string));
						dt.Columns.Add("ReceiptImage", typeof(string));
						dt.Columns.Add("DeliveryId", typeof(string));
						dt.Columns.Add("SalesName", typeof(string));
						dt.Columns.Add("SalesDescription", typeof(string));
						dt.Columns.Add("DeliveryName", typeof(string));
						dt.Columns.Add("DeliveryAddress", typeof(string));

            DataRow dr;

            foreach (var item in pulloutsVM)
            {
                dr = dt.NewRow();

                dr[0] = item.PulloutId;
						dr[1] = item.PulloutName;
						dr[2] = item.PulloutDescription;
						dr[3] = item.PulloutDate;
						dr[4] = item.SalesId;
						dr[5] = item.ReceiptImage;
						dr[6] = item.DeliveryId;
						dr[7] = item.SalesName;
						dr[8] = item.SalesDescription;
						dr[9] = item.DeliveryName;
						dr[10] = item.DeliveryAddress;

                dt.Rows.Add(dr);
            }

            var exportExcelHelperService = new ExportExcelHelper();

            var bytes = exportExcelHelperService.CreateExcelWorkBook(dt);

            var data = new ExcelData();
            data.File = bytes;

            var result = Convert.ToBase64String(data.File);

            return Ok(result);
        }
        #endregion

	}
}