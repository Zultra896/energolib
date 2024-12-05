import styles from '../css/aboutUs.module.css'

const photos = [
  {
    src: 'photos/896-8969558_meme-sticker-jerry-mouse-high-meme.png',
    name: 'Nursultan Bakytbek',
    email: 'nursultan@bakytbek.kz',
  },
 
];

const ContainerPhoto = () => {
  return (
    <div className={styles.containerPhoto}>
      {photos.map((photo, index) => (
        <div key={index} className={styles.photoCard}>
          <img src={photo.src} alt="" />
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
