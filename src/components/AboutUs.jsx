import styles from '../css/aboutUs.module.css'
import user from '../img/user.png'

const photos = [
  {
    src: user,
    name: 'Askarov Aibek',
    email: 'askarov@aibek.kz',
  },
  {
    src: user,
    name: 'Abdiev Daniyar',
    email: 'abdiev@daniyar.kz',
  },
  {
    src: user,
    name: 'Kurbanbekov oljas',
    email: 'kurbanbekov@oljas.kz',
  },
  {
    src: user,
    name: 'Nursultan Bakytbek',
    email: 'nursultan@bakytbek.kz',
  },
  {
    src: user,
    name: 'Zhymangaly Zhandos',
    email: 'zhymangaly@zhandos.kz',
  },
  {
    src: user,
    name: 'Kenesh Nuradil',
    email: 'kenesh@nuradil.kz',
  },
 
];

const ContainerPhoto = () => {
  return (
    <div className={styles.containerPhoto}>
      {photos.map((photo, index) => (
        <div key={index} className={styles.photoCard}>
          <img className={styles.img} src={photo.src} alt="" />
          <div className={styles.photoInfo}>
            <div className={styles.name}>{photo.name}</div>
            <div className={styles.email}>{photo.email}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContainerPhoto;
