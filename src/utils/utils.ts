export function convertPrice(amount: number): string {
    return amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
}

export function convertISOToDate(isoDate: string): string {
    const date = new Date(isoDate);
    return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

export function finalPriceProduct (price : number, qty : number): number {
    return price * qty
}
