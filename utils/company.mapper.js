//utils/company.mapper.js

class CompanyToLandingPageDTO {
  //이 프로퍼티 가지고 있는애들로
  // companyName=com,
  // description,
  // category,
  // revenue,
  // totalInvestment,
  // employees,
}

export const companyToLandingPageDTO = (company) => ({
  companyName: company.companyName,
  description: company.description,
  category: company.category,
  revenue: company.revenue,
  totalInvestment: company.totalInvestment,
  employees: company.employees,
  imgUrl: company.imgUrl,
});

export const companyToInvestmentOverviewPageDTO = (company) => ({
  companyName: company.companyName,
  description: company.description,
  category: company.category,
  vmsInvestment: company.vmsInvestment,
  totalInvestment: company.totalInvestment,
  imgUrl: company.imgUrl,
});

export const companyToSelectedOverviewPageDTO = (company) => ({
  companyName: company.companyName,
  description: company.description,
  category: company.category,
  myCompanySelectedCount: company._count?.myCompanySelections ?? 0,
  compareSelectedCount: company._count?.compareCompanySelections ?? 0,
  imgUrl: company.imgUrl,
});
