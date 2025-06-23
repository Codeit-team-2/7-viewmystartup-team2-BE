import { v4 as uuidv4 } from "uuid";
import { faker } from "@faker-js/faker";

const clean = (str) => str?.replace(/\u0000/g, "") || "";

/***********
 * faker 데이터 설정
 * 아래에서 숫자만 바꾸세요
 * *********/
const USER_NUM = 10;
const COMPANY_NUM = 85;
const INVESTMENT_LOG_NUM = 100;
const MY_SELECTION_NUM = 50; // 내가 선택한 기업 수
const COMPARE_SELECTION_NUM = 100; // 비교 기업 수

// 유저 10명 생성
export const userData = Array.from({ length: USER_NUM }).map(() => ({
  id: uuidv4(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  nickname: faker.person.firstName(),
  balance: faker.number.int({ min: 1000, max: 10000 }),
}));

// 회사 5개 생성
export const companyData = Array.from({ length: COMPANY_NUM }).map(() => ({
  id: uuidv4(),
  companyName: clean(faker.company.name().replace(/\u0000/g, "")),
  description: clean(faker.company.catchPhrase().replace(/\u0000/g, "")),
  category: clean(faker.company.buzzAdjective().replace(/\u0000/g, "")),
  revenue: faker.number.float({ min: 50, max: 500, precision: 0.1 }),
  employees: faker.number.int({ min: 10, max: 1000 }),
  totalInvestment: faker.number.float({ min: 10, max: 100, precision: 0.1 }),
  investmentStage: faker.helpers.arrayElement([
    "Pre-A",
    "Series A",
    "Series B",
    "Series C",
  ]),
  investors: `${faker.company.name()}, ${faker.company.name()}`.replace(
    /\u0000/g,
    ""
  ),
  vmsInvestment: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
}));

// 가짜 투자 내역 (10개)
export const investmentData = Array.from({ length: INVESTMENT_LOG_NUM }).map(
  () => ({
    id: uuidv4(),
    userId: faker.helpers.arrayElement(userData).id,
    companyId: faker.helpers.arrayElement(companyData).id,
    howMuch: faker.number.int({ min: 500, max: 5000 }),
    comment: faker.lorem.sentence(),
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  })
);

export const myCompanySelectionData = Array.from({
  length: MY_SELECTION_NUM,
}).map(() => ({
  id: uuidv4(),
  userId: faker.helpers.arrayElement(userData).id,
  companyId: faker.helpers.arrayElement(companyData).id,
  createdAt: new Date(),
}));

export const compareCompanySelectionData = Array.from({
  length: COMPARE_SELECTION_NUM,
}).map(() => ({
  id: uuidv4(),
  userId: faker.helpers.arrayElement(userData).id,
  companyId: faker.helpers.arrayElement(companyData).id,
  createdAt: new Date(),
}));
