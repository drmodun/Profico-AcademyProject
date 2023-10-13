import Image, { StaticImageData } from "next/image";
import classes from "./Backdrop.module.scss";

interface Props {
  image: StaticImageData | string;
}

export const Backdrop = ({ image }: Props) => {
  return (
    <div className={classes.container}>
      <Image src={image} alt="backdrop" layout="fill" objectFit="cover" />
      <div className={classes.backdrop}></div>
    </div>
  );
};
