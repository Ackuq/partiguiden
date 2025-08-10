import { classicBlocks, newBlocks } from "@lib/utils/blocks";
import type { Blocks } from "@lib/utils/blocks";

import type { AveragePoll } from "./types";
import type { BlockAverage, BlocksAverage } from "./types";

/**
 * Helper function to categorize the poll data into blocks
 * @param average Poll statistics for each party
 * @returns Function that categorize the data into a specific block
 */
function generateBlockAverage(average: AveragePoll) {
  return function (blocks: Blocks): BlockAverage {
    return average.reduce(
      (prev, { party, value }) => {
        const blockIndex = blocks.values.findIndex((block) =>
          block.parties.includes(party),
        );
        const newAverage = prev;
        newAverage[blockIndex].data += value;
        return newAverage;
      },
      blocks.values.map((block: Blocks["values"][number]) => ({
        name: block.name,
        data: 0,
      })) as BlockAverage,
    );
  };
}

/**
 * Categorize the party poll data into blocks
 * @param average Poll statistics for each party
 * @returns A tuple with the data categorized using the old blocks and the new blocks, read [oldBlocks, newBlocks]
 */
export const getBlockAverage = (average: AveragePoll): BlocksAverage => {
  const getBlockAverage = generateBlockAverage(average);
  return [getBlockAverage(newBlocks), getBlockAverage(classicBlocks)];
};
