
import AboutUs from '../components/AboutUs'
import styles from '../css/mainAbout.module.css'


const MainAbout = () => {
  return (
    <div className={styles.mainAbout}>
      <div className={styles.container}>
        <div className={styles.aboutTitle}>
          <h1 className={styles.aboutTtl}>ЭнергоЛиб</h1>
        </div>
        <div className={styles.aboutDescription}>
          <div style={{ borderTop: '1px solid #ffffff', width: '1320px', marginTop: '60px' }}></div>
          <p className={styles.description}>
            Онлайн-библиотека нашего колледжа — это уникальное пространство, где каждый студент и преподаватель может найти необходимые знания и материалы для учебы, научной работы и саморазвития. Мы стремимся создать условия, в которых информация становится доступной для всех, независимо от времени или местоположения. Наша библиотека открыта 24/7, что позволяет вам изучать материалы, делать заметки и готовиться к экзаменам в любое удобное время.
          </p>
        </div>

        <div className={styles.aboutTitle}>
          <h1 className={styles.aboutTtl}>Наша Миссия</h1>
        </div>
        <div className={styles.aboutDescription}>
          <div style={{ borderTop: '1px solid #ffffff', width: '1320px', marginTop: '60px' }}></div>
          <p className={styles.description}>
            Наша библиотека убеждена, что знания — это ключ к будущему. Мы стремимся создать доступное пространство для студентов и преподавателей, обеспечивая легкий доступ к ресурсам для обучения и саморазвития. <br /><br />
            Мы нацелены на вдохновение пользователей к новым открытиям и поддерживаем их в обучении. Мы создаем комфортные условия для раскрытия потенциала каждого и стремимся быть надежным партнером на вашем образовательном пути, улучшая наши услуги и расширяя коллекцию. Наша миссия — помогать вам достигать целей и расти как личность.
          </p>
        </div>

        <div className={styles.aboutTitle}>
          <h1 className={styles.aboutTtl}>Наша Команда</h1>
        </div>
        <div className={styles.aboutDescription}>
          <div style={{ borderTop: '1px solid #ffffff', width: '1320px', marginTop: '60px' }}></div>
          <p className={styles.description}>
            Команда нашей библиотеки — это специалисты, которые поддерживают работу системы, обновляют коллекцию книг и помогают пользователям решать технические вопросы. Мы всегда готовы ответить на ваши вопросы и помочь в использовании платформы.
          </p>
        </div>
        <AboutUs />
      </div>
    </div>
  );
};

export default MainAbout;
