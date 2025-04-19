"use client";
import React from "react";
import { SystemRequirementItemProps } from "./types";

const SystemRequirementItem: React.FC<SystemRequirementItemProps> = ({ icon, title, value }) => {
  return (
    <div className="flex items-start gap-3">
      <div className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0 mt-1">
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-semibold text-gray-400">{title}</h4>
        <p className="text-white">{value}</p>
      </div>
    </div>
  );
};

export default SystemRequirementItem;