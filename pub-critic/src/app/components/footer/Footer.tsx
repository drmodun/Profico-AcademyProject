import classes from "./Footer.module.scss";
import instagram from "assets/instagram.svg";
import facebook from "assets/fb.svg";
import twitter from "assets/x.svg";
import youtube from "assets/youtube.svg";
import Image from "next/image";
import Link from "next/link";
export const Footer = () => {
  return (
    <div className={classes.Footer}>
      <div className={classes.FooterContent}>
        <div className={classes.SocialRow}>
          <Image src={facebook} alt="facebook"/>
          <Image src={instagram} alt="instagram"/>
          <Image src={twitter} alt="twitter" />
          <Image src={youtube} alt="youtube"/>
        </div>
        <div className={classes.Links}>
          <Link className={classes.Link} href="/">Home</Link>
          <Link className={classes.Link} href="/me">User Page</Link>
          <Link className={classes.Link} href="/">Games Page</Link>
        </div>
        <div className={classes.Copyright}>© 2023 PubCritic by Jan Modun</div>
      </div>
    </div>
  );
};
