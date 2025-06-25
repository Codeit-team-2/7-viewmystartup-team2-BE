// repositories/investment/investment.repository.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// 기업 정보 조회
export const getCompanyFromDB = async (companyId) => {
  return await prisma.company.findUnique({
    where: { id: companyId },
  });
};

export const getAllInvestmentsFromDB = async (companyId) => {
  return await prisma.investment.findMany({
    //id랑 닉네임만 가져오기 아래처럼 필요한 필드만 가져올수있음
    where: {
      companyId,
      deletedAt: null,
    },
    select: {
      id: true,
      user: {
        select: {
          id: true,
          nickname: true,
        },
      },
      howMuch: true,
      comment: true,
    },
    orderBy: {
      howMuch: "desc",
    },
  });
};
// 유저 조회
export const getUser = async (userId) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, password: true },
  });
};
// 유저 투자 정보 수정
export const updateInvestmentRepo = async (investmentId, updateData) => {
  return await prisma.investment.update({
    where: { id: investmentId },
    data: updateData,
  });
};

// 투자 정보 삭제
export const deleteInvestmentRepo = async (investmentId) => {
  return await prisma.investment.update({
    where: { id: investmentId },
    data: { deletedAt: new Date() },
  });
};

// 유저 정보 가져오기
export const findUserById = async (userId) => {
  return await prisma.user.findUnique({
    where: { id: userId },
  });
};

// 유저 잔액 차감
export const decrementUserBalance = (prisma, userId, howMuch) => {
  return prisma.user.update({
    where: { id: userId },
    data: {
      balance: {
        decrement: howMuch,
      },
    },
  });
};
// 투자 생성
export const createInvestment = (
  prisma,
  { userId, companyId, howMuch, comment }
) => {
  return prisma.investment.create({
    data: {
      user: { connect: { id: userId } },
      company: { connect: { id: companyId } },
      howMuch,
      comment,
    },
  });
};

//우진수정 createInvestment, findUserById, decrementUserBalance로 리팩토링
// export const postInvestmentsFromDB = async (form) => {
//   const { userId, companyId, howMuch, comment, password } = form;
//   const user = await prisma.user.findUnique({
//     where: { id: userId },
//   });

//   return await prisma.investment.create({
//     data: {
//       user: {
//         connect: { id: form.userId }, // User 테이블에 있는 유저 ID
//       },
//       company: {
//         connect: { id: form.companyId }, // Company 테이블의 ID
//       },
//       howMuch: form.howMuch, // 필수
//       comment: form.comment, // 선택
//     },
//   });
// };

//추후 createInvestment, getInvestmentsByUserId 같은 것 예정

const sortFieldMap = {
  vmsInvestment: "howMuch",
  totalInvestment: "company.totalInvestment", // 예시, 관계 필드 정렬 시 이렇게
  // 필요하면 다른 매핑도 추가
};

export const getInvestmentUserListByDB = async ({
  userId,
  nickname,
  sortBy = "howMuch",
  order = "desc",
  keyword = "",
}) => {
  // 서버에서는 실제 DB 컬럼명으로 매핑
  let prismaSortField = sortFieldMap[sortBy] || sortBy;

  let orderByOption;

  if (prismaSortField.includes(".")) {
    // 관계 필드 정렬 처리
    const [relation, field] = prismaSortField.split(".");
    orderByOption = { [relation]: { [field]: order } };
  } else {
    // 직접 필드 정렬 처리
    orderByOption = { [prismaSortField]: order };
  }

  return await prisma.investment.findMany({
    where: {
      AND: [
        {
          OR: [
            userId ? { userId } : undefined,
            nickname ? { user: { nickname } } : undefined,
          ].filter(Boolean),
        },
        keyword
          ? {
              OR: [
                {
                  company: {
                    companyName: {
                      contains: keyword,
                      mode: "insensitive",
                    },
                  },
                },
                {
                  company: {
                    category: {
                      contains: keyword,
                      mode: "insensitive",
                    },
                  },
                },
                {
                  comment: {
                    contains: keyword,
                    mode: "insensitive",
                  },
                },
              ],
            }
          : {},
        { deletedAt: null },
      ],
    },
    select: {
      company: {
        select: {
          companyName: true,
          category: true,
          totalInvestment: true,
          imgUrl: true,
        },
      },
      comment: true,
      howMuch: true,
    },
    orderBy: orderByOption,
  });
};
