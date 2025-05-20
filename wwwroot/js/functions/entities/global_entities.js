var Pagination = {
    List: [],
    CurrentPage: null,
    PageIndeces: [],
    PageSummary: null
};

var ModelFilterUser = {
    RoleId: null,
    UserName: null
};

var TitleSearch = {
    ProductLineId: null,
    ProductId: null,
    Products: [],
    ProductLines: [],
    Keyword: null
};

var SchoolSearch = {
    SortOrder: null,
    PhilRegionId: null,
    ProvinceId: null,
    DivisionId: null,
    DistrictId: null,
    LGUId: null,
    Keyword: null
};

var ContactPersonSearch = {
    Position: null,
    SchoolId: null,
    Keyword: null
};

var SalesApprovalSearch = {
    Keyword: null,
    PhilRegionId: null,
    AgentId: null,
    ProvinceId: null,
    DivisionId: null,
    DistrictId: null,
    SchoolTypeId: null,
    TransactionStatusId: null,
    SellingCycleId: null,
    TerritoryId: null,
    RegionId: null,
    AgentId: null,
    ParticularId: null,
    DocumentFlag: false,
    FinanceFlag: false,
    DateFrom: null,
    DateTo: null
};

var DeliverSearch = {
    Keyword: null,
    PhilRegionId: null,
    AgentId: null,
    ProvinceId: null,
    DivisionId: null,
    DistrictId: null,
    SchoolTypeId: null,
    TransactionStatusId: null,
    SellingCycleId: null,
    TerritoryId: null,
    RegionId: null,
    AgentId: null,
    ParticularId: null,
    DocumentFlag: false,
    FinanceFlag: false,
    DateFrom: null,
    DateTo: null
};

var ForecastApprovalSearch = {
    Keyword: null,
    Status: null,
    AgentId: null,
    PhilRegionId: null,
    ProvinceId: null,
    DivisionId: null,
    DistrictId: null,
    SchoolType: null,
    SellingCycleId: null,
    TerritoryId: null,
    DateFrom: null,
    DateTo: null
};

var UserRole = {
    ADMIN: "ADMIN",
    CC: "CC",
    RBM: "RBM",
    ADMIN_CUSTOMER_OPERATION: "CO",
    ADMIN_CUSTOMER_FULLFILLMENT: "CFS",
    ADMIN_MARKETING: "SMD",
    ADMIN_FINANCE: "FINANCE",
    ADMIN_WAREHOUSE: "WH",
    ADMIN_HR: "HR",
    ADMIN_TECH_TEACH: "TTA",
    ADMIN_INTERNAL_OPERATION: "ISO",
    ADMIN_MARKETING_MANAGER: "MM",
    ADMIN_EXECUTIVE: "EXECUTIVE",
    ADMIN_LMSTECHSUPPORT: "LMSTECHSUPPORT",
    ADMIN_BUSINESSSOLUTION: "BS"
};

var ParticularType = {
    Book: 1,
    EBook: 2,
    Robotics: 4,
    Interactive: 5,
    LMS_type_1: 6,
    LMS_type_2: 7,
    LMS_type_3: 8,
    Workbook: 9,
    Book_Complimentary_Copy: 10,
    Book_Teachers_Copy: 11,
    Book_Demo_Copy: 12,
    Book_Marketing_Copy: 13,
    Teachers_Guide: 14,
    LMS: 15,
    Eval_Book_Copy: 16,
    Eval_EBook_Copy: 17
}

var SalesTransactionStatus = {
    Pending: 1,
    Approved: 2,
    Rejected: 3,
    Allocated: 4,
    Packed: 5,
    Dispatched: 6,
    Delivered: 7,
    Updated_Pending: 8,
    Approved_With_Update: 9,
    Ongoing_Picklist: 10,
    Request_To_Cancel: 11,
    Cancelled: 12,
    Cleared: 13
};

var PicklistTransactionStatus = {
    On_Going_Picklist: 0,
    Final_Picklist: 1,
    Packed: 2,
    Converted_To_Delivery: 3,
}

var DeliveryTransactionStatus = {
    Packed: 0,
    Dispatched: 1,
    Completely_delivered: 2,
    Partially_delivered: 3
}

var ForecastCollectionTransactionStatus = {
    Pending: 0,
    Approved: 1,
}
var ActualCollectionTransactionStatus = {
    Pending: 0,
    Approved: 1,
    Validated: 2,
}

var PulloutTransactionStatus = {
    Requested: 0,
    Approved: 1,
    Actual: 2,
}

var AdjustmentTransactionStatus = {
    Requested: 0,
    Approved: 1,
    Validated: 2,
}

var globalUploadedDocs = [];