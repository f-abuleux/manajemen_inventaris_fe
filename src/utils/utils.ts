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

export function convertISOToDateToNormal(isoDate: string): string {
    const date = new Date(isoDate);
    return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

export function finalPriceProduct (price : number, qty : number): number {
    return price * qty
}
