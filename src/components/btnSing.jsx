import btnSingStyles from '../css/btnSing.module.css'
import singIcon from '../img/singIcon.svg'

function BtnSing() {
  return (
    <div className={btnSingStyles.btnSing}>
        <div className={btnSingStyles.btnSing__container}>
            <img src={singIcon} alt="" />
            <p className={btnSingStyles.text}>Вход | Регистрация</p>
        </div>
    </div>
  )
}

export default BtnSing