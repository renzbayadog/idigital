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
    public class SalesController : ControllerBase
    {
        private readonly ISalesRepository _saleRepository;

        public SalesController(IRepositoryWrapper repoWrapper)
        {
            _saleRepository = repoWrapper.Sales_Repository;
        }

        [HttpGet]
        [Route("List/Page{currPage:int}/PageSize{pageSize:int}")]
        [Route("List")]
        public async Task<IActionResult> GetAllSale([FromQuery] SalesSearch searchInfo, int currPage = 1, int pageSize = 10)
        {
            if (!ModelState.IsValid) return BadRequest();

            List<Sales> sales = await _saleRepository.GetAllSaleQry(searchInfo);

            // Map entity model to view model
            List<SalesVM> salesVM = new List<SalesVM>();

            foreach (Sales sale in sales)
            {
                salesVM.Add(new SalesVM()
                {
                    SalesId = sale.SalesId,
                    SalesName = sale.SalesName,
                    SalesDescription = sale.SalesDescription,
                    SalesDate = sale.SalesDate,
                    BusinessValue = sale.BusinessValue,
                    ReceiptImage = sale.ReceiptImage
                });
            }

            Pagination<SalesVM> pagination = new Pagination<SalesVM>(salesVM, currPage, pageSize);

            return Ok(pagination);
        }

        [HttpPost("Add")]
        public async Task<IActionResult> PostSale(SalesVM sale)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }



            Sales saleToAdd = new Sales()
            {
                SalesName = sale.SalesName,
                SalesDescription = sale.SalesDescription,
                SalesDate = sale.SalesDate,
                BusinessValue = sale.BusinessValue,
                ReceiptImage = sale.ReceiptImage
            };

            _saleRepository.Add(saleToAdd);

            try
            {
                await _saleRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }

            return Ok();
        }

        [HttpPost("Update")]
        public async Task<IActionResult> PutSale(SalesVM sale)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }



            Sales saleToUpdate = new Sales()
            {
                SalesId = sale.SalesId,
                SalesName = sale.SalesName,
                SalesDescription = sale.SalesDescription,
                SalesDate = sale.SalesDate,
                BusinessValue = sale.BusinessValue,
                ReceiptImage = sale.ReceiptImage
            };

            _saleRepository.Update(saleToUpdate);

            try
            {
                await _saleRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
            return Ok();
        }

        [HttpDelete("{id}/Delete")]
        public async Task<IActionResult> DeleteSale(int id)
        {
            Sales saleToDelete = await _saleRepository.FindFirstAsync(m => m.SalesId == id);

            if (saleToDelete == null)
                return BadRequest("Not Found");

            _saleRepository.Delete(saleToDelete);

            try
            {
                await _saleRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }

            return Ok();
        }

        [HttpPost("delete/bulk")]
        public async Task<IActionResult> DeleteBulk([FromBody] List<int> sales)
        {
            if (sales.Count > 0)
            {
                foreach (int sale in sales)
                {
                    Sales saleToDelete = await _saleRepository.FindFirstAsync(m => m.SalesId == sale);
                    _saleRepository.Delete(saleToDelete);
                }
                try
                {
                    await _saleRepository.SaveChangesAsync();
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
        public async Task<IActionResult> ExportSale([FromQuery] SalesSearch searchInfo)
        {
            List<Sales> sales = await _saleRepository.GetAllSaleQry(searchInfo);

            // Map entity model to view model
            List<SalesVM> salesVM = new List<SalesVM>();

            foreach (Sales sale in sales)
            {
                salesVM.Add(new SalesVM()
                {
                    SalesId = sale.SalesId,
                    SalesName = sale.SalesName,
                    SalesDescription = sale.SalesDescription,
                    SalesDate = sale.SalesDate,
                    BusinessValue = sale.BusinessValue,
                    ReceiptImage = sale.ReceiptImage
                });
            }

            DataTable dt = new DataTable("Sale");
            dt.Columns.Add("SalesId", typeof(string));
            dt.Columns.Add("SalesName", typeof(string));
            dt.Columns.Add("SalesDescription", typeof(string));
            dt.Columns.Add("SalesDate", typeof(string));
            dt.Columns.Add("BusinessValue", typeof(string));
            dt.Columns.Add("ReceiptImage", typeof(string));

            DataRow dr;

            foreach (var item in salesVM)
            {
                dr = dt.NewRow();

                dr[0] = item.SalesId;
                dr[1] = item.SalesName;
                dr[2] = item.SalesDescription;
                dr[3] = item.SalesDate;
                dr[4] = item.BusinessValue;
                dr[5] = item.ReceiptImage;

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