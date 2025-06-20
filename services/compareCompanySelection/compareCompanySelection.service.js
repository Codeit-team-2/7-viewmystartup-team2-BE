// services/compareCompanySelection/compareCompanySelection.service.js
import {
  getAllCompareCompanySelectionsFromDB,
  getCompareCompanySelectionCountByCompany,
  postCompareCompanySelection,
} from "../../repositories/compareCompanySelection/compareCompanySelection.repository.js";

export const fetchAllCompareCompanySelections = async () => {
  return await getAllCompareCompanySelectionsFromDB();
};

export const fetchCompareCompanySelectionCounts = async () => {
  return await getCompareCompanySelectionCountByCompany();
};

export const createCompareCompanySelection = async (userId, companyIds) => {
  return await Promise.all(
    companyIds.map((companyId) =>
      postCompareCompanySelection(userId, companyId)
    )
  );
};
