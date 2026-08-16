'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-cyan-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-white text-sm">
            &copy; {new Date().getFullYear()} {t('footer_rights')}
          </p>
          <p className="text-white text-xs mt-2">
            {t('footer_tagline')}
          </p>
        </div>
      </div>
    </footer>
  );
}
