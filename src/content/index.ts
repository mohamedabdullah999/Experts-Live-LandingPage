import 'server-only';
import type { Content, Locale } from './types';
import en from './en';
import ar from './ar';

const dictionaries: Record<Locale, Content> = { en, ar };

export function getContent(locale: Locale): Content {
  return dictionaries[locale];
}
