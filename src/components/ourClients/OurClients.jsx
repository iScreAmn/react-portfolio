import "./OurClients.css";
import clientsData from "../../data/clientsData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SectionTitle from "../section-title/SectionTitle";
import { motion } from "motion/react";
import { slideInVariants } from "../../utils/animation";

const OurClients = () => {
  return (
    <section className="section our-client" id="clients">
      <div className="container flex-center">
        <SectionTitle title="Our clients" subtitle="Our clients" />
        <motion.div
          className="our-client-wrapper"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={slideInVariants("bottom", 0.7, 70, false)}
        >
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesperView={1}
            navigation
            pagination={{ clickable: true }}
            loop={true}
            className="client-swiper"
          >
            {clientsData.map((client) => (
              <SwiperSlide key={client.id}>
                <div className="swiper-slide swiper-client-block">
                  <div className="client-img">
                    <img src={client.imgSrc} alt={client.name} />
                  </div>
                  <div className="client-details">
                    <p>{client.description}</p>
                    <h3>{client.name}</h3>
                    <span>{client.position}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default OurClients;
