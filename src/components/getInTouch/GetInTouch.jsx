import { motion } from "motion/react";
import "./GetInTouch.css";
import { FaPaperPlane } from "react-icons/fa";
import { slideInVariants } from "../../utils/animation";

const GetInTouch = () => {
  return (
    <div className="get-in-touch sub-section">
      <div className="container flex-center">
        <motion.div
          className="contact-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          custom={2}
          variants={slideInVariants("left", 0.7, 50, true)}
        >
          <div className="title">
            <h4>Let`s talk</h4>
            <h3>About your</h3>
            <h2>Next project</h2>
          </div>
          <motion.a
            href="https://t.me/iscreamn"
            target="_blank"
            rel="noopener noreferrer"
            className="get-in-touch-link inner-info-link"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            custom={2}
            variants={slideInVariants("right", 0.7, 50, true)}
          >
            Contact me
            <FaPaperPlane />
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default GetInTouch;
