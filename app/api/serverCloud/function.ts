import BigNumber from "bignumber.js";

export const processQuery = (data: any[], query: any) => {
  const page = Number(query?.page ?? 1);
  const limit = Number(query?.limit ?? 20);

  const amountQuery = page * limit;
  const arr: any[] = [];
  let totalPage = BigNumber(data.length)
    .dividedBy(Number(limit))
    .toNumber();

  if (totalPage <= 1) {
    totalPage = 1;
  }
  data.forEach((item, index) => {
    if (page === 1) {
      if (index < limit) {
        arr.push(item);
      }
    } else {
      if (index >= limit * (page - 1) && index <= amountQuery) {
        arr.push(item);
      }
    }
  });

  return {
    data: arr,
    totalPage,
    page,
  };
};