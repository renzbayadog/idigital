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
   public class PulloutVM
   {
		[Display(Name = "Pullout Id")]
		/*[Required(ErrorMessage = "Pullout Id is required")]*/
		public int PulloutId { get; set; }

		[Display(Name = "Pullout Name")]
		/*[Required(ErrorMessage = "Pullout Name is required")]*/
		[MaxLength(25)]
		public string PulloutName { get; set; }

		[Display(Name = "Pullout Description")]
		/*[Required(ErrorMessage = "Pullout Description is required")]*/
		[MaxLength(25)]
		public string PulloutDescription { get; set; }

		[Display(Name = "Pullout Date")]
		/*[Required(ErrorMessage = "Pullout Date is required")]*/
		public DateTime? PulloutDate { get; set; }

		[Display(Name = "Sales Id")]
		/*[Required(ErrorMessage = "Sales Id is required")]*/
		public int? SalesId { get; set; }

		[Display(Name = "Receipt Image")]
		/*[Required(ErrorMessage = "Receipt Image is required")]*/
		[MaxLength(255)]
		public string ReceiptImage { get; set; }

		[Display(Name = "Delivery Id")]
		/*[Required(ErrorMessage = "Delivery Id is required")]*/
		public int? DeliveryId { get; set; }

		[Display(Name = "Sales Name")]
		/*[Required(ErrorMessage = "Sales Name is required")]*/
		[MaxLength(25)]
		public string SalesName { get; set; }

		[Display(Name = "Sales Description")]
		/*[Required(ErrorMessage = "Sales Description is required")]*/
		[MaxLength(25)]
		public string SalesDescription { get; set; }

		[Display(Name = "Delivery Name")]
		/*[Required(ErrorMessage = "Delivery Name is required")]*/
		[MaxLength(25)]
		public string DeliveryName { get; set; }

		[Display(Name = "Delivery Address")]
		/*[Required(ErrorMessage = "Delivery Address is required")]*/
		[MaxLength(25)]
		public string DeliveryAddress { get; set; }
   }

   public class PulloutSearch
   {
        public string Keyword { get; set; }
		public string SortOrder { get; set; }
		public string PulloutName { get; set; }
		public string PulloutDescription { get; set; }
		public DateTime PulloutDate { get; set; }
   }
}