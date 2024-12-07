import { PET_STATS } from "../../../PET_STATS";

/**
 * Checks if the stat is a valid, existing stat
 */
export default function IsPetStat(stat: string): boolean {
    return PET_STATS.includes(stat);
}