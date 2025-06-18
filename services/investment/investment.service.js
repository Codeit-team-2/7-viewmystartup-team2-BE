// services/investment/investment.service.js
import { getAllInvestmentsFromDB } from "../../repositories/investment/investment.repository.js";

export const fetchAllInvestments = async () => {
  return await getAllInvestmentsFromDB();
};
