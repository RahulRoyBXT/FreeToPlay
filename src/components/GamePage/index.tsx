"use client";
import { GamePageProps } from "./types";
import MainGamePage from "./MainGamePage";

const GamePage: React.FC<GamePageProps> = ({ gameData }) => {
  return <MainGamePage data={gameData} />;
};

export default GamePage;