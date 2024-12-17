import styles from '../css/admin.module.css'

function Admin() {
    return (
        <div className={styles.main}>
            <h1>Административная панель</h1>
            <p>Здесь вы можете управлять содержимым сайта</p>
            <div>
                <button>Новости</button>
                <button>Создать новост</button>
            </div>
            <div>
                Контент
            </div>
        </div>
    )
}

export default Admin;