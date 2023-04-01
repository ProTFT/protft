import {
  CountryIndicator,
  RegionsIndicator,
} from "../../../../components/RegionIndicator/RegionIndicator";
import { Stream } from "../../../../design/icons/Stream";
import { Twitch } from "../../../../design/icons/Twitch";
import { ClickableIconProps } from "../../../../design/icons/types";
import { Youtube } from "../../../../design/icons/Youtube";
import { RegionCode } from "../../../../formatter/Region";

export enum SupportedPlatforms {
  TWITCH = "twitch",
  YOUTUBE = "youtube",
}

export const getStreamLogo = (platform: string) =>
  streamIconMap[platform] ?? fallbackStreamLogo;

export const getStreamLanguage = (language: string) =>
  language === RegionCode.WO ? (
    <RegionsIndicator regionCodes={[RegionCode.WO]} showName={false} />
  ) : (
    <CountryIndicator countryCode={language} />
  );

const streamIconMap: {
  [key: string]: (props: ClickableIconProps) => JSX.Element;
} = {
  [SupportedPlatforms.TWITCH]: (props: ClickableIconProps) => (
    <Twitch size={24} {...props} />
  ),
  [SupportedPlatforms.YOUTUBE]: (props: ClickableIconProps) => (
    <Youtube size={32} {...props} />
  ),
};

const fallbackStreamLogo = (props: ClickableIconProps) => (
  <Stream size={32} {...props} />
);
