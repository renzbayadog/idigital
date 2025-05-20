using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using idigital.ViewModels; 
using idigital.Data.Entities; 
using idigital.Data; 
using idigital.Data.Repositories; 
using codegen.Helpers; 


namespace idigital.ViewModels
{
   public class SalesVM
   {
		[Display(Name = "Sales Id")]
		/*[Required(ErrorMessage = "Sales Id is required")]*/
		public int SalesId { get; set; }

		[Display(Name = "Sales Name")]
		/*[Required(ErrorMessage = "Sales Name is required")]*/
		[MaxLength(25)]
		public string SalesName { get; set; }

		[Display(Name = "Sales Description")]
		/*[Required(ErrorMessage = "Sales Description is required")]*/
		[MaxLength(25)]
		public string SalesDescription { get; set; }

		[Display(Name = "Sales Date")]
		/*[Required(ErrorMessage = "Sales Date is required")]*/
		public DateTime? SalesDate { get; set; }

		[Display(Name = "Business Value")]
		/*[Required(ErrorMessage = "Business Value is required")]*/
		public decimal BusinessValue { get; set; }

		[Display(Name = "Receipt Image")]
		/*[Required(ErrorMessage = "Receipt Image is required")]*/
		[MaxLength(255)]
		public string ReceiptImage { get; set; }
   }

   public class SalesSearch
   {
        public string Keyword { get; set; }
		public string SortOrder { get; set; }
		public string SalesName { get; set; }
		public string SalesDescription { get; set; }
		public DateTime SalesDate { get; set; }
		public decimal BusinessValue { get; set; }
		public string ReceiptImage { get; set; }
   }
}