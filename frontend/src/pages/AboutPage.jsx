import { useLanguage } from '../context/LanguageContext'

const AboutPage = () => {
  const { t } = useLanguage()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-coffee-brown dark:text-coffee-cream">
        {t('aboutTitle')}
      </h1>

      <div className="max-w-3xl space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('ourStory')}</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {t('ourStoryText')}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('ourMission')}</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {t('ourMissionText')}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('ourValues')}</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>{t('value1')}</li>
            <li>{t('value2')}</li>
            <li>{t('value3')}</li>
            <li>{t('value4')}</li>
            <li>{t('value5')}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('visitUs')}</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {t('visitUsText')}
          </p>
        </section>
      </div>
    </div>
  )
}

export default AboutPage
