import { TRANSLATION_DICTIONARY, SUPPORTED_LOCALES, SupportedLocale } from '../constants/localizationData';

export function translate(key: string, locale: SupportedLocale = 'en'): string {
  const dict = TRANSLATION_DICTIONARY[locale] || TRANSLATION_DICTIONARY['en'];
  return dict[key] || TRANSLATION_DICTIONARY['en'][key] || key;
}

export function formatIndianCurrency(amountINR: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amountINR);
}

export function getAvailableLocales() {
  return Object.values(SUPPORTED_LOCALES);
}
