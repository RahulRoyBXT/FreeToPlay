import { Dispatch, SetStateAction } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export interface GameIdTypes {
  id:                          number;
  title:                       string;
  thumbnail:                   string;
  status:                      string;
  short_description:           string;
  description:                 string;
  game_url:                    string;
  genre:                       string;
  platform:                    string;
  publisher:                   string;
  developer:                   string;
  release_date:                string;
  freetogame_profile_url:      string;
  minimum_system_requirements: MinimumSystemRequirements;
  screenshots:                 Screenshot[];
}

export interface MinimumSystemRequirements {
  os:        string;
  processor: string;
  memory:    string;
  graphics:  string;
  storage:   string;
}

export interface Screenshot {
  id:    number;
  image: string;
}

export interface GamePageProps {
  id: string;
  gameData: GameIdTypes;
}

export interface MainGameType {
  data: GameIdTypes;
}

export interface GameHeaderProps {
  title: string;
  gameUrl: string;
  linkInfo: boolean;
  setLinkInfo: Dispatch<SetStateAction<boolean>>;
  router: AppRouterInstance;
}

export interface ScreenshotShowcaseProps {
  screenshots: Screenshot[];
  thumbnail: string;
  title: string;
  activeScreenshot: number;
  setActiveScreenshot: Dispatch<SetStateAction<number>>;
}

export interface GameInformationProps {
  data: GameIdTypes;
}

export interface GameStatsProps {
  data: GameIdTypes;
}

export interface SystemRequirementsProps {
  requirements: MinimumSystemRequirements;
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