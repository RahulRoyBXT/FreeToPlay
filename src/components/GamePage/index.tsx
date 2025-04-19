"use client";
import { GamePageProps } from "./types";
import { useRouter } from "next/navigation";
import MainGamePage from "./MainGamePage";

const GamePage: React.FC<GamePageProps> = ({ id, gameData }) => {
  const router = useRouter();
  return <MainGamePage data={gameData} />;
};

export default GamePage;