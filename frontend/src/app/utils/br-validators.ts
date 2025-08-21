export const onlyDigits = (v: string) => (v || '').replace(/\D/g, '');

export function isValidCPF(raw: string): boolean {
    const cpf = onlyDigits(raw);
    if (!cpf || cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    let sum = 0; for (let i=0;i<9;i++) sum += +cpf[i]*(10-i);
    let d1 = (sum*10)%11; if (d1 === 10) d1 = 0; if (d1 !== +cpf[9]) return false;
    sum = 0; for (let i=0;i<10;i++) sum += +cpf[i]*(11-i);
    let d2 = (sum*10)%11; if (d2 === 10) d2 = 0; return d2 === +cpf[10];
}

export function isValidCNPJ(raw: string): boolean {
    const cnpj = onlyDigits(raw);
    if (!cnpj || cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;
    const calc = (len: number) => {
        const pesos = len === 12 ? [5,4,3,2,9,8,7,6,5,4,3,2] : [6,5,4,3,2,9,8,7,6,5,4,3,2];
        const s = cnpj.slice(0, len).split('').reduce((a, d, i) => a + (+d)*pesos[i], 0);
        const r = s % 11; return r < 2 ? 0 : 11 - r;
    };
    const d1 = calc(12); if (d1 !== +cnpj[12]) return false;
    const d2 = calc(13); return d2 === +cnpj[13];
}

export function normalizeDecimal(v: string): string {
    const n = (v || '').replace(/[^\d.,]/g, '').replace(',', '.');
    const m = n.match(/^\d+(\.\d{0,2})?/); return m ? m[0] : '';
}
export function keepDigits(e: Event) {
    const i = e.target as HTMLInputElement;
    i.value = onlyDigits(i.value);
}
