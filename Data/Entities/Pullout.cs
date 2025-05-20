using System;
using System.Collections.Generic;

namespace idigital.Data.Entities;

public partial class Pullout
{
    public int PulloutId { get; set; }

    public string PulloutName { get; set; }

    public string PulloutDescription { get; set; }

    public DateTime? PulloutDate { get; set; }

    public bool IsDeleted { get; set; }

    public int? CreatedById { get; set; }

    public DateOnly? CreateDate { get; set; }

    public int? UpdatedById { get; set; }

    public DateOnly? UpdateDate { get; set; }

    public int? DeletedById { get; set; }

    public DateOnly? DeleteDate { get; set; }

    public int? SalesId { get; set; }
    public Sales Sales { get; set; }


	public int? DeliveryId { get; set; }
	public Delivery Delivery { get; set; }


	public string ReceiptImage { get; set; }
}
