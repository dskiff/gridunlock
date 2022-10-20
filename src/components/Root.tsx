import { Spinner } from "@blueprintjs/core";
import { format } from "date-fns";
import { StrictMode, useEffect, useMemo, useState } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";
import { parseXWord } from "../parsers/parseXWord";
import { PuzzleDefinition } from "../state/Puzzle";
import { generateMemorableToken } from "../utils/generateMemorableToken";
import { RoomSyncService } from "../web-rtc/RoomSyncService";
import { PuzzleView } from "./PuzzleView";

import "@fontsource/libre-franklin";

const ROOM_PATH_PREFIX = "/r/";

export function Root() {
  const { updateServiceWorker } = useRegisterSW({
    onNeedRefresh() {
      console.info("upgrading service worker in the background");
      updateServiceWorker(false);
    },
  });

  const roomName = useMemo(() => {
    const path = window.location.pathname;
    const hasRoom = path.startsWith(ROOM_PATH_PREFIX);
    const roomName = hasRoom && path.substring(ROOM_PATH_PREFIX.length);

    return !hasRoom || !roomName ? undefined : roomName;
  }, []);

  useEffect(() => {
    if (roomName != null) {
      return;
    }

    // Initialize Puzzle
    (async () => {
      const roomName = generateMemorableToken(32);
      const syncService = new RoomSyncService(roomName);

      const today = format(new Date(), "M-d-yyyy");
      const req = await fetch(`/api/puzzle/xword/${today}`);

      // const puzzleId = btoa("http://www.nytimes.com/specials/puzzles/classic.puz");
      // const req = await fetch(`/api/puzzle/puz/${puzzleId}`);

      await syncService.initPuzzle(parseXWord(await req.json()));

      window.location.pathname = ROOM_PATH_PREFIX + roomName;
    })();
  }, [roomName]);

  const syncService = useMemo(() => {
    if (roomName == null) {
      return;
    }

    return new RoomSyncService(roomName);
  }, [roomName]);

  const [puzzle, setPuzzle] = useState<PuzzleDefinition | undefined>(undefined);
  useEffect(() => {
    if (syncService == null) {
      return;
    }

    syncService.addEventListener("loaded", setPuzzle);

    return () => syncService.removeEventListener("loaded", setPuzzle);
  }, [syncService, setPuzzle]);

  const isLoading = puzzle === undefined;
  return (
    <StrictMode>
      <div className="root">
        {!isLoading && <PuzzleView puzzle={puzzle} syncService={syncService!}></PuzzleView>}
        <div className={"loading-overlay " + (isLoading ? "loading" : "")}>
          <Spinner />
        </div>
      </div>
    </StrictMode>
  );
}
