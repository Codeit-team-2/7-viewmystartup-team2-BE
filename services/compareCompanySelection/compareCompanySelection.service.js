// services/compareCompanySelection/compareCompanySelection.service.js
import {
  getAllCompareCompanySelectionsFromDB,
  getCompareCompanySelectionCountByCompany,
} from "../../repositories/compareCompanySelection/compareCompanySelection.repository.js";

export const fetchAllCompareCompanySelections = async () => {
  return await getAllCompareCompanySelectionsFromDB();
};

export const fetchCompareCompanySelectionCounts = async () => {
  return await getCompareCompanySelectionCountByCompany();
};
