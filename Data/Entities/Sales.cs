using System;
using System.Collections.Generic;

namespace idigital.Data.Entities;

public partial class Sales
{
    public int SalesId { get; set; }

    public string SalesName { get; set; }

    public string SalesDescription { get; set; }

    public DateTime? SalesDate { get; set; }

    public decimal BusinessValue { get; set; }

    public bool IsDeleted { get; set; }

    public int? CreatedById { get; set; }

    public DateOnly? CreateDate { get; set; }

    public int? UpdatedById { get; set; }

    public DateOnly? UpdateDate { get; set; }

    public int? DeletedById { get; set; }

    public DateOnly? DeleteDate { get; set; }

    public string ReceiptImage { get; set; }
}
