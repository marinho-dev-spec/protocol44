// Authored brand geometry: many interruptions gather into one deliberate line.
// Decorative only; this is neither a measurement nor a simulation of the visitor.
export function signalArt(clarity=0,compact=false) {
  const progress=Math.max(0,Math.min(1,clarity));
  const height=compact?64:380;
  const count=compact?7:17;
  const centre=(count-1)/2;
  const paths = Array.from({length:count}, (_, row) => {
    const offset = row-centre;
    const points = Array.from({length:101}, (_, i) => {
      const x = i*6;
      const noise=(Math.sin(i*1.71+row)*19+Math.sin(i*.47-row)*14)*(compact?.25:1);
      const wave=Math.sin(i*.085)*(compact?7:31);
      const y=height/2+offset*(compact?2.2:13)*(1-progress*.93)+wave+noise*(1-progress);
      if(progress<.55&&i>44&&i<51)return '';
      return `${i===0||(progress<.55&&i===51)?'M':'L'}${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(' ');
    return `<path class="${row===centre?'signal-thread':'signal-strand'}" style="opacity:${row===centre?1:(.5-progress*.36).toFixed(2)}" d="${points}"/>`;
  }).join('');
  const fragments=progress<.6?`<g class="signal-fragments" opacity="${(1-progress/.6).toFixed(2)}"><path d="M236 ${height/2-11}h36m7 21h29m-96 8h35M302 ${height/2-32}h39m-13 61h50"/></g>`:'';
  return `<svg class="signal-field${compact?' signal-compact':''}" viewBox="0 0 600 ${height}" fill="none" aria-hidden="true">${paths}${fragments}</svg>`;
}
