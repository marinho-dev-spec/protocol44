/** Enable only after the actual assets and commercial terms have been approved. */
export const funnelConfig = {
  videoUrl: '', // Direct MP4/WebM URL or /media/file.mp4. An embed needs its provider component.
  captionsUrl: '', // English WebVTT URL, paired with the final video.
  transcript: '', // Plain-text transcript paired with the final video.
  checkoutUrl: '', // Full https:// URL of the external checkout. No checkout is built here.
  salesOpen: false,
};
export function safeWebUrl(value: string): string {
  if (value.startsWith('/') && !value.startsWith('//') && !value.includes('\\')) return value;
  try { return new URL(value).protocol === 'https:' ? value : ''; } catch { return ''; }
}
