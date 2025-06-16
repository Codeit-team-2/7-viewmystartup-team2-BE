import { v4 as uuidv4 } from "uuid";

export const userData = [
  {
    id: uuidv4(),
    email: "alice@example.com",
    password: "hashedpassword1",
    nickname: "Alice",
    balance: 10000,
  },
  {
    id: uuidv4(),
    email: "bob@example.com",
    password: "hashedpassword2",
    nickname: "Bob",
    balance: 15000,
  },
];

export const companyData = [
  {
    id: uuidv4(),
    companyName: "Tech Corp",
    description: "A leading tech company",
    category: "Technology",
    revenue: "500M",
    employees: "2000",
    totalInvestment: "100M",
    investmentStage: "Series C",
    investors: "Investor A, Investor B",
    vmsInvestment: "Yes",
  },
  {
    id: uuidv4(),
    companyName: "Health Inc",
    description: "Healthcare solutions provider",
    category: "Healthcare",
    revenue: "300M",
    employees: "1500",
    totalInvestment: "50M",
    investmentStage: "Series B",
    investors: "Investor C",
    vmsInvestment: "No",
  },
];

// myCompanySelection은 userId, companyId가 반드시 userData, companyData와 연결되어야 함
export const myCompanySelectionData = [
  {
    id: uuidv4(),
    userId: userData[0].id,
    companyId: companyData[0].id,
    createdAt: new Date(),
  },
  {
    id: uuidv4(),
    userId: userData[1].id,
    companyId: companyData[1].id,
    createdAt: new Date(),
  },
];

export const compareCompanySelectionData = [
  {
    id: uuidv4(),
    userId: userData[0].id,
    companyId: companyData[1].id,
    createdAt: new Date(),
  },
  {
    id: uuidv4(),
    userId: userData[1].id,
    companyId: companyData[0].id,
    createdAt: new Date(),
  },
];

