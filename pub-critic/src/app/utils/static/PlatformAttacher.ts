import { FullParentPlatform, ParentPlatform } from "common/interfaces";
import pc from "assets/steam.svg";
import playstation from "assets/playstation.svg";
import xbox from "assets/xbox.svg";
import ios from "assets/ios.svg";
import nintendo from "assets/nintendo.svg";
import android from "assets/android.svg";
import web from "assets/web.svg";

export const platformImageDictionary = {
  pc,
  playstation,
  xbox,
  ios,
  android,
  web,
  nintendo,
};

const attachPlatformImage = (platforms: FullParentPlatform[]) => {
  const images: string[] = [];
  platforms.forEach((platform) => {
    const image =
      platformImageDictionary[
        platform.platform.slug as keyof typeof platformImageDictionary
      ];
    if (image) {
      images.push(image);
    }
  });
  return images;
};

export default attachPlatformImage;
