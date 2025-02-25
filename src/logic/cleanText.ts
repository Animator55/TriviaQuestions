export default function cleanText(str: string) {
    return str.replace(/&[^;]+;/g, '');
}