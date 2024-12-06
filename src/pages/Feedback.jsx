import feedbackStyles from '../css/feedback.module.css'

function Feedback() {
  return (
    <div className={feedbackStyles.feedback}>
    <section className={feedbackStyles.section}>
        <div className={feedbackStyles.section__contact}>
            <h1 className={feedbackStyles.section__title}>Свяжитесь с нами</h1>
            <p className={feedbackStyles.section__description}>По поводу трудности раблокировки аккаунта или в случаях каких-то проблем вам сюда <b>energolib@gmail.com</b></p>
        </div>
    </section>
    </div>
  )
}

export default Feedback