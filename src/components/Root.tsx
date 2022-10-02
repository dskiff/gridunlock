import type { PuzzleGameCell } from "../state/State";
import { PuzzleView } from "./PuzzleView";

const testPuzzleData: PuzzleGameCell[][] = [
  [
    { author: null, filledValue: "T" },
    { author: null, filledValue: "O" },
    { author: null, filledValue: "" },
    { author: null, filledValue: "Z" },
  ],
  [
    { author: null, filledValue: "" },
    { author: null, filledValue: "N" },
    { author: null, filledValue: "O" },
    { author: null, filledValue: "Z" },
  ],
  [
    { author: null, filledValue: "" },
    { author: null, filledValue: "" },
    { author: null, filledValue: "F" },
    { author: null, filledValue: "Z" },
  ],
  [
    { author: null, filledValue: "" },
    { author: null, filledValue: "" },
    { author: null, filledValue: "F" },
    { author: null, filledValue: "Z" },
  ],
];
export function Root() {
  return (
    <div className="root">
      <PuzzleView filledCellsByRow={testPuzzleData}></PuzzleView>
    </div>
  );
}
