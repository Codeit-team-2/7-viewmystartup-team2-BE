//utils/company.mapper.js
export const companyToLandingPageDTO = (company) => ({
  companyName: company.companyName,
  description: company.description,
  category: company.category,
  revenue: company.revenue,
  totalInvestment: company.totalInvestment,
  employees: company.employees,
});

export const companyToInvestmentOverviewPageDTO = (company) => ({
  companyName: company.companyName,
  description: company.description,
  category: company.category,
  vmsInvestment: company.vmsInvestment,
  totalInvestment: company.totalInvestment,
});

export const companyToSelectedOverviewPageDTO = (company) => ({
  companyName: company.companyName,
  description: company.description,
  category: company.category,
  myCompanySelectedCount: company._count?.myCompanySelections ?? 0,
  compareSelectedCount: company._count?.compareCompanySelections ?? 0,
});
