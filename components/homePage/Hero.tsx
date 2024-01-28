import Image from 'next/image';

import styles from './Hero.module.scss';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.image}>
        <Image
          src="/images/site/avatar.jpg"
          width={300}
          height={300}
          alt="An image of myself"
        />
      </div>
      <h2>Hello I&apos;m Wolfito</h2>
      <p>
        I blog about web development - especially Front End frameworks like
        VueJs or ReactJS.
      </p>
    </section>
  );
};

export default Hero;
