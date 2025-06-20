// services/myCompanySelection/myCompanySelection.service.js
import {
  getAllMyCompanySelectionsFromDB,
  getMyCompanySelectionCountByCompany,
  postMyCompanySelection,
} from "../../repositories/myCompanySelection/myCompanySelection.repository.js";

export const fetchAllMyCompanySelections = async () => {
  return await getAllMyCompanySelectionsFromDB();
};

export const fetchMyCompanySelectionCounts = async () => {
  return await getMyCompanySelectionCountByCompany();
};

export const createMyCompanySelection = async (userId, companyId) => {
  return await postMyCompanySelection(userId, companyId);
};
