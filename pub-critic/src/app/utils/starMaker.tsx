import Image from "next/image";
import star from "assets/star.svg";
import lackOfStar from "assets/lackOfStar.svg";
export const starMaker = (score: number) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < score) {
      stars.push(<Image src={star} alt="star" layout="fill" />);
    } else {
      stars.push(<Image src={lackOfStar} alt="lackOfStar" layout="fill" />);
    }
  }
  return stars;
};
