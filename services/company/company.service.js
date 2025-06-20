// services/company/company.service.js
import {
  getAllCompaniesFromDB,
  getInvestmentOverviewCompaniesFromDB,
  getSelectedOverviewCompaniesFromDB,
  getCompaniesFilteredFromDB,
  getCompanyByIdFromDB,
} from "../../repositories/company/company.repository.js";
import { getMyCompanySelectionByIdFromDB } from "../../repositories/myCompanySelection/myCompanySelection.repository.js";
import {
  companyToLandingPageDTO,
  companyToInvestmentOverviewPageDTO,
  companyToSelectedOverviewPageDTO,
} from "../../utils/company.mapper.js";

//LandingPage용 dto
export const fetchAllCompanies = async ({ keyword, sortBy, order }) => {
  // 비즈니스 로직 추가 가능 (ex. 필터, 정렬, 계산 등)
  const companies = await getAllCompaniesFromDB({ keyword, sortBy, order });
  return companies.map(companyToLandingPageDTO); // ✅ dto 변환
};

// const asdf = new companyToLandingPageDTO('asdf ', asdf)
//prisma 의존성이 있는 상태임
//원래는 dto class해서 인스턴스화해서

//투자현황용 dto
export const fetchInvestmentOverviewCompanies = async ({
  keyword,
  sortBy,
  order,
}) => {
  const companies = await getInvestmentOverviewCompaniesFromDB({
    keyword,
    sortBy,
    order,
  });
  return companies.map(companyToInvestmentOverviewPageDTO);
};

export const fetchSelectedOverviewCompanies = async ({
  keyword,
  sortBy,
  order,
}) => {
  const companies = await getSelectedOverviewCompaniesFromDB({
    keyword,
    sortBy,
    order,
  });

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

export const fetchCompaniesFiltered = async (keyword) => {
  return await getCompaniesFilteredFromDB(keyword);
};

// getMyCompanySelectionByIdFromDB로, MyCompanySelection에서 해당하는 기업 id 목록 가져옴
// 그리고 그 목록에 있는 id에 getCompanyByIdFromDB 적용해서 데이터 가져옴
export const fetchRecentMyCompanies = async (userId) => {
  const companiesId = await getMyCompanySelectionByIdFromDB(userId);
  console.log(companiesId);
  const companiesIdList = companiesId.map((c) => c.companyId);
  console.log(companiesIdList);
  return await Promise.all(
    companiesIdList.map((id) => getCompanyByIdFromDB(id))
  );
};
