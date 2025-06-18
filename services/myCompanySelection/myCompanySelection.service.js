// services/myCompanySelection/myCompanySelection.service.js
import {
  getAllMyCompanySelectionsFromDB,
  getMyCompanySelectionCountByCompany,
} from "../../repositories/myCompanySelection/myCompanySelection.repository.js";

export const fetchAllMyCompanySelections = async () => {
  return await getAllMyCompanySelectionsFromDB();
};

export const fetchMyCompanySelectionCounts = async () => {
  return await getMyCompanySelectionCountByCompany();
};
