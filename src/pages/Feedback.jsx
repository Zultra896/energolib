import feedbackStyles from '../css/feedback.module.css'
import { useLanguage } from '../components/LanguageContext'

function Feedback() {
  const { language } = useLanguage();

  return (
    <div className={feedbackStyles.feedback}>
    <section className={feedbackStyles.section}>
        <div className={feedbackStyles.section__contact}>
            <h1 className={feedbackStyles.section__title}>
              {language === 'ru' ? 'Свяжитесь с нами' : 'Бізге хабарласыңыз'}
            </h1>
            <p className={feedbackStyles.section__description}>
            {language === 'ru' 
            ? 'По поводу трудности раблокировки аккаунта или в случаях каких-то проблем вам сюда ' 
            : 'Тіркелгіңізді бұғаттаудан шығару қиындығына қатысты немесе қандай да бір мәселелер туындаған жағдайда, осында бізге хабарласыңыз '}
              <b>energolibrary@gmail.com</b></p>
        </div>
    </section>
    </div>
  )
}

export default Feedback