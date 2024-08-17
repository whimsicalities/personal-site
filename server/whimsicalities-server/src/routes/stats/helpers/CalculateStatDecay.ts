/**
 * Calculate the integer amount of decay that should have
 * happened on a stat since the last recorded interaction.
 * @param lastInteractionTime Unix milliseconds timestamp
 * @returns Amount of decay
 */
export default function CalculateStatDecay(lastInteractionTime: number): number {
    const nowMs = Date.now();
    const timePassed = nowMs - lastInteractionTime;
    return Math.floor(timePassed / 10000);
}