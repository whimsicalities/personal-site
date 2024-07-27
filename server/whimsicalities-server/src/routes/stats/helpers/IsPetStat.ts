import { PetStat } from "../../../PetStat";

/**
 * Checks whether the given stat value (eg '1') is a part of
 * the PetStat enum when converted to a number.
 */
export default function IsPetStat(stat: string): boolean {
    if (Object.values(PetStat).includes(parseInt(stat))) {
      return true;
    }
    return false;
}