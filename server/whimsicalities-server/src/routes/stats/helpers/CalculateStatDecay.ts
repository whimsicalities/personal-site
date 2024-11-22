/**
 * Calculate the integer amount of decay that should have
 * happened on a stat since the last recorded interaction.
 * @param lastInteractionTime Unix milliseconds timestamp
 * @param decaySpeedSeconds The amount of time before a stat decays by one point
 * @returns Amount of decay
 */
export default function CalculateStatDecay(lastInteractionTime: number, decaySpeedSeconds: number): number {
    const nowMs = Date.now();
    const timePassed = nowMs - lastInteractionTime;
    return Math.floor(timePassed / (1000 * decaySpeedSeconds));
}