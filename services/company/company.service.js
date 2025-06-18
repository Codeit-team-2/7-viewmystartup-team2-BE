// services/company/company.service.js
import {
  getAllCompaniesFromDB,
  getCompanyByIdFromDB,
} from "../../repositories/company/company.repository.js";

export const fetchAllCompanies = async ({ sortBy, order }) => {
  // 비즈니스 로직 추가 가능 (ex. 필터, 정렬, 계산 등)
  return await getAllCompaniesFromDB({ sortBy, order });
};

export const fetchCompanyById = async (id) => {
  return await getCompanyByIdFromDB(id);
};
