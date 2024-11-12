import btnSingStyles from '../css/btnSing.module.css'
import singIcon from '../img/singIcon.svg'

function BtnSing() {
  return (
    <div className={btnSingStyles.btnSing}>
        <div className={searchStyles.btnSing__container}>
            <img src={singIcon} alt="" />
            <p className={searchStyles.text}>Поиск</p>
        </div>
    </div>
  )
}

export default BtnSing