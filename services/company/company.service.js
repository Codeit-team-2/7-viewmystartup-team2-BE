// services/company/company.service.js
import {
  getAllCompaniesFromDB,
  getInvestmentOverviewCompaniesFromDB,
  getSelectedOverviewCompaniesFromDB,
  getCompanyByIdFromDB,
} from "../../repositories/company/company.repository.js";
import {
  companyToLandingPageDTO,
  companyToInvestmentOverviewPageDTO,
  companyToSelectedOverviewPageDTO,
} from "../../utils/company.mapper.js";

//LandingPage용 dto
export const fetchAllCompanies = async ({ sortBy, order }) => {
  // 비즈니스 로직 추가 가능 (ex. 필터, 정렬, 계산 등)
  const companies = await getAllCompaniesFromDB({ sortBy, order });
  return companies.map(companyToLandingPageDTO); // ✅ dto 변환
};

//투자현황용 dto
export const fetchInvestmentOverviewCompanies = async ({ sortBy, order }) => {
  const companies = await getInvestmentOverviewCompaniesFromDB({
    sortBy,
    order,
  });
  return companies.map(companyToInvestmentOverviewPageDTO);
};

export const fetchSelectedOverviewCompanies = async ({ sortBy, order }) => {
  const companies = await getSelectedOverviewCompaniesFromDB({ sortBy, order });

  // _count 값으로 가공
  const mapped = companies.map((company) =>
    companyToSelectedOverviewPageDTO({
      ...company,
      myCompanySelectedCount: company._count.myCompanySelections,
      compareCompanySelectedCount: company._count.compareCompanySelections,
    })
  );

  // 정렬 필드 확인
  const allowedFields = [
    "myCompanySelectedCount",
    "compareCompanySelectedCount",
  ];
  const allowedOrders = ["asc", "desc"];
  const sortField = allowedFields.includes(sortBy)
    ? sortBy
    : "myCompanySelectedCount";
  const sortOrder = allowedOrders.includes(order) ? order : "desc";

  // 정렬
  mapped.sort((a, b) =>
    sortOrder === "asc"
      ? a[sortField] - b[sortField]
      : b[sortField] - a[sortField]
  );

  return mapped;
};

//dto를 클래스로 만들어서
// 응답할때 클래스 인스턴스로 응답하게
/**
 * 필요한것만 나오게끔 할 수 있다
 */
export const fetchCompanyById = async (id) => {
  return await getCompanyByIdFromDB(id);
};
