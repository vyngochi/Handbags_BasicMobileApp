import { HandbagResponse } from "../handbags/types/handbag.type";

export const calculateAverageStar = (item: HandbagResponse) => {
  const starArr = item.feedbacks.map((item) => item.rating);
  const sum = starArr.reduce((total, current) => total + current, 0);
  return (sum / starArr.length).toFixed(1);
};
