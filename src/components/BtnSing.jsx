import btnSingStyles from '../css/btnSing.module.css'
import singIcon from '../img/singIcon.svg'
import { useNavigate } from 'react-router-dom';

function BtnSing() {
  const navigate = useNavigate();

  const authClick = () => {
    navigate('/Auth');
  };

  return (
    <div className={btnSingStyles.btnSing} onClick={authClick}>
        <div className={btnSingStyles.btnSing__container}>
            <img src={singIcon} alt="" />
            <p className={btnSingStyles.text}>Вход | Регистрация</p>
        </div>
    </div>
  )
}

export default BtnSing
