import "./Home.css";
import DecryptedText from "../widgets/decryptedText/DecryptedText";
import { aboutImg2 } from "../../assets/images";
import { homeData as fallbackData, socialLinks } from "../../data/aboutPageData";
import { motion } from "motion/react";
import { iconVariants, slideInVariants } from "../../utils/animation";
import { useState, useEffect } from "react";
import { fetchHomeSection } from "../../services/strapi";

const icons = socialLinks.map((link, index) => {
  const Icon = link.icon;
  return {
    id: index + 1,
    href: link.href,
    icon: <Icon />,
  };
});

const Home = () => {
  const [homeData, setHomeData] = useState(fallbackData);

  // Загружаем данные из Strapi при монтировании компонента
  useEffect(() => {
    const loadData = async () => {
      console.log('🔵 Loading home data from Strapi...');
      console.log('🔵 Strapi URL:', import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337');
      const data = await fetchHomeSection();
      console.log('🔵 Received data:', data);
      if (data?.greeting) {
        console.log('✅ Using Strapi data');
        // Обновляем state данными из Strapi
        setHomeData({
          greeting: data.greeting,
          role: data.role,
          description: data.description,
          contactButton: {
            text: data.contactButtonText,
            href: data.contactButtonHref,
            icon: fallbackData.contactButton.icon,
          },
          scrollDown: {
            text: data.scrollDownText,
            href: data.scrollDownHref,
            icon: fallbackData.scrollDown.icon,
          },
        });
      } else {
        console.log('❌ Using fallback data');
      }
      // Если данные не загрузились, используется fallback из aboutPageData.js
    };

    loadData();
  }, []);

  const ContactIcon = homeData.contactButton.icon;
  const ScrollIcon = homeData.scrollDown.icon;

  return (
    <section className="home" id="home">
      <div className="container home__wrapper">
        <div className="media-icons">
          {icons.map((item, index) => (
            <motion.a
              href={item.href}
              key={item.id}
              target="_blank"
              custom={index}
              variants={iconVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.5 }}
            >
              {item.icon}
            </motion.a>
          ))}
        </div>

        <div className="home-info">
          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            custom={0}
            variants={slideInVariants("left", 0.5, 100, true)}
          >
            {homeData.greeting}
          </motion.h1>
          <motion.h3
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            custom={1}
            variants={slideInVariants("left", 0.7, 100, true)}
          >
            {homeData.role}
          </motion.h3>


          <div className="decrypted-text-stable-container">
            <DecryptedText
              text={homeData.description}
              animateOn="view"
              revealDirection="center"
              speed={20}
              maxIterations={10}
              sequential={true}
              className="home-info-text"
            />
          </div>

          <motion.a
            href={homeData.contactButton.href}
            target="_blank"
            className="home-info-link inner-info-link"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            custom={2}
            variants={slideInVariants("left", 0.9, 100, true)}
          >
            {homeData.contactButton.text}
            <ContactIcon />
          </motion.a>
        </div>
        <div className="circle">
          <img src={aboutImg2} alt="Profile" className="circle__img" />
        </div>
        <motion.div
          className="home-img"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={slideInVariants("right", 0.9, 100, true)}
        >
          {/* <img src={lightImg} alt="Profile Photo" /> */}
        </motion.div>
      </div>
      <a href={homeData.scrollDown.href} className="scroll-down">
        {homeData.scrollDown.text}
        <ScrollIcon className="arrow-icon" />
      </a>
    </section>
  );
};

export default Home;
