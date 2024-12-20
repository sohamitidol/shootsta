"use client";

import { ChevronsDownUp, ChevronsUpDown } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type LimitDropdownProps = {
  currentLimit: number;
  setLimit: (limit: number) => void;
};

const LIMIT_OPTIONS = [5, 10, 20, 25, 50];

export default function LimitDropdown({
  currentLimit,
  setLimit,
}: LimitDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="mx-2" asChild>
        <Button variant="outline">
          Limit: {currentLimit} <ChevronsUpDown size={12} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        {LIMIT_OPTIONS.map((limit) => (
          <DropdownMenuItem
            key={limit}
            onClick={() => setLimit(limit)}
            className={`cursor-pointer ${
              currentLimit === limit ? "font-bold text-blue-500" : ""
            }`}
          >
            {limit}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
