// Authored brand geometry: many interruptions gather into one deliberate line.
// Decorative only; this is neither a measurement nor a simulation of the visitor.
export function signalArt() {
  const paths = Array.from({length:17}, (_, row) => {
    const offset = row - 8;
    const points = Array.from({length:81}, (_, i) => {
      const x = i * 7.5;
      const fade = Math.pow(1 - i / 80, 1.7);
      const noise = Math.sin(i * 1.9 + row * .7) * 15 + Math.sin(i * .48 + row) * 20;
      const y = 190 + offset * (3 + 15 * fade) + noise * fade;
      return `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(' ');
    return `<path class="${row===8?'signal-thread':'signal-strand'}" d="${points}"/>`;
  }).join('');
  return `<svg class="signal-field" viewBox="0 0 600 380" fill="none" aria-hidden="true">${paths}<rect class="signal-end" x="585" y="182" width="16" height="16"/></svg>`;
}
