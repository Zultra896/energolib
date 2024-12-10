import styles from '../css/sponsor.module.css'

const sponsors = [
  { src: {}, description: 'Kairat FC' },
  { src: 'photos/thibault-penin-SwKf1x2_hRo-unsplash.jpg', description: 'Spotify Premium' },
  { src: 'photos/darren-halstead-B_vXFdzvw3g-unsplash.jpg', description: 'D. Trump' },
];

const Sponsor = () => {
  return (
    <section className={styles.sponsor}>
      <div className={styles.container}>
        <div className={styles.sponsorTitle}>Sponsors</div>
        <div className={styles.sponsors}>
          {sponsors.map((sponsor, index) => (
            <div key={index} className={styles.sponsorCard}>
              <img src={sponsor.src} alt="" />
              <div className={styles.sponsorDescription}>{sponsor.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sponsor;
