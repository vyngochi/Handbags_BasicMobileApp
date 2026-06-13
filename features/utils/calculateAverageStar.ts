type feedback = {
  user: string;
  rating: number;
  comment: string;
}[];
export const calculateAverageStar = (feedbacks: feedback) => {
  const starArr = feedbacks.map((item) => item.rating);
  const sum = starArr.reduce((total, current) => total + current, 0);
  return (sum / starArr.length).toFixed(1);
};
