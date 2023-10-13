import Image from "next/image";
import star from "assets/star.svg";
import lackOfStar from "assets/lackOfStar.svg";
export const starMaker = (score: number) => {
  const stars = [];
  const scoreList = [1, 2, 3, 4, 5];
  scoreList.map((s) => {
    if (s <= score) {
      stars.push(<Image src={star} alt="star" layout="fill" key={s} />);
    } else {
      stars.push(<Image src={lackOfStar} alt="star" layout="fill" key={s} />);
    }
  });
  return stars;
};
