import { Game, SingleGame, SystemReq } from "@/lib/types";
import { Dispatch, SetStateAction } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export interface GamePageProps {
  id: string;
  gameData: Game & SystemReq & SingleGame & {description: string};
}

export interface MainGameType {
  data: Game & SystemReq & SingleGame & {description: string};
}

export interface GameHeaderProps {
  title: string;
  gameUrl: string;
  linkInfo: boolean;
  setLinkInfo: Dispatch<SetStateAction<boolean>>;
  router: AppRouterInstance;
}

export interface Screenshot {
  id: number;
  image: string;
}

export interface ScreenshotShowcaseProps {
  screenshots: Screenshot[];
  thumbnail: string;
  title: string;
  activeScreenshot: number;
  setActiveScreenshot: Dispatch<SetStateAction<number>>;
}

export interface GameInformationProps {
  data: Game & SystemReq & SingleGame & {description: string};
}

export interface GameStatsProps {
  data: Game & SystemReq & SingleGame;
}

export interface SystemRequirementsProps {
  requirements: SystemReq;
}

export interface SystemRequirementItemProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

export interface ScreenshotGridProps {
  screenshots: Screenshot[];
  title: string;
  activeScreenshot: number;
  setActiveScreenshot: Dispatch<SetStateAction<number>>;
}