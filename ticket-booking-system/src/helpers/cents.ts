export function toCents(amount: number): number {
    if (!Number.isFinite(amount)) {
        throw new Error("PLEASE ENTER A VALID NUMBER")
    }
    return Math.round(amount*100);
}
export function fromCents(amount: number): number {
    return amount/100;
}