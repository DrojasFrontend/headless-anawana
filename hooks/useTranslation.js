import { useRouter } from 'next/router';
import { useLanguage } from '../context/LanguageContext';
import translations from '../public/translations.json';

const useTranslation = (pageId) => {
  const router = useRouter();
  const languageContext = useLanguage();
  const language = languageContext?.language || 'en';
  const currentPage = pageId || router.pathname.replace('/', '');
  const translationsForPage = translations?.[language]?.[currentPage] || {};
  return { translations: translationsForPage };
};

export default useTranslation;