export default function timeout(ms: number): Promise<void> {
    return new Promise((resolve, _) => {
        setTimeout(() => {
            resolve();
        }, ms);
    })
}