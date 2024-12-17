import btnSingStyles from '../css/btnSing.module.css'
import singIcon from '../img/singIcon.svg'
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';

function BtnSing() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const authClick = () => {
    navigate('/Auth');
  };

  return (
    <div className={btnSingStyles.btnSing} onClick={authClick}>
        <div className={btnSingStyles.btnSing__container}>
            <img src={singIcon} alt="" />
            <p className={btnSingStyles.text}>
              {language == 'ru' ? 'Вход' : 'Кіру'}
            </p>
        </div>
    </div>
  )
}

export default BtnSing
