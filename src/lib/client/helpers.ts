export function copyToClipboard(text: string) {
    window.navigator.clipboard.writeText(text);
}
