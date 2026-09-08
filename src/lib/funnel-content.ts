import data from '../content/funnel-content.json';
export const content = data;
export function copy(value: string, values: Record<string,string|number> = {}): string {
  const tokens: Record<string,string|number> = {...content.tokens, ...values};
  return value.replace(/\{\{(\w+)\}\}/g, (match, key: string) => tokens[key] === undefined ? match : String(tokens[key]));
}
