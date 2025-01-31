import { FaPaperPlane } from "react-icons/fa6";
import { motion } from "motion/react";
import { slideInVariants } from "../../utils/animation";

const ContactsForm = () => {
  return (
    <form className="contact-form">
      <motion.div
        className="first-row"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        custom={1}
        variants={slideInVariants("top", 0.7, 50, true)}
      >
        <input placeholder="Name" type="text" />
      </motion.div>
      <motion.div
        className="second-row"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        custom={2}
        variants={slideInVariants("top", 0.7, 50, true)}
      >
        <input placeholder="Email" type="email" />
        <input placeholder="Subject" type="text" />
      </motion.div>
      <div className="third-row">
        <motion.textarea
          placeholder="Message"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          custom={3}
          variants={slideInVariants("top", 0.7, 50, true)}
        ></motion.textarea>
      </div>
      <motion.button
        className="contact-btn inner-info-link"
        type="submit"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        custom={4}
        variants={slideInVariants("top", 0.7, 50, true)}
      >
        Send Message
        <FaPaperPlane />
      </motion.button>
    </form>
  );
};

export default ContactsForm;
