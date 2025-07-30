import { useState } from "react";
import { FaPaperPlane, FaCheck, FaExclamationTriangle, FaSpinner } from "react-icons/fa";
import { motion, AnimatePresence } from "motion/react";
import { slideInVariants } from "../../utils/animation";
import "./ContactsForm.css";

const ContactsForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    captcha: ""
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [captchaValue, setCaptchaValue] = useState("portfolio2024");

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required";
        if (value.length < 2) return "Name must be at least 2 characters";
        if (!/^[a-zA-Z\s]+$/.test(value)) return "Name can only contain letters and spaces";
        return "";
      case "email":
        if (!value.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email";
        return "";
      case "subject":
        if (!value.trim()) return "Subject is required";
        if (value.length < 5) return "Subject must be at least 5 characters";
        return "";
      case "message":
        if (!value.trim()) return "Message is required";
        if (value.length < 10) return "Message must be at least 10 characters";
        return "";
      case "captcha":
        if (!value.trim()) return "Please complete the CAPTCHA";
        if (value !== captchaValue) return "CAPTCHA verification failed";
        return "";
      default:
        return "";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSubmitStatus('success');
        setFormData({ name: "", email: "", subject: "", message: "", captcha: "" });
        setCaptchaValue("portfolio" + Math.floor(Math.random() * 1000));
      } else {
        setSubmitStatus('error');
        if (data.errors) {
          const serverErrors = {};
          data.errors.forEach(error => {
            serverErrors[error.path] = error.msg;
          });
          setErrors(serverErrors);
        }
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateCaptcha = () => {
    const newValue = "portfolio" + Math.floor(Math.random() * 1000);
    setCaptchaValue(newValue);
    setFormData(prev => ({ ...prev, captcha: "" }));
  };

  return (
    <div className="contact-form-container">
      <AnimatePresence>
        {submitStatus && (
          <motion.div
            className={`submit-notification ${submitStatus}`}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            {submitStatus === 'success' ? (
              <>
                <FaCheck />
                <span>Message sent successfully!</span>
              </>
            ) : (
              <>
                <FaExclamationTriangle />
                <span>Failed to send message. Please try again.</span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <form className="contact-form" onSubmit={handleSubmit}>
        <motion.div
          className="first-row"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          custom={1}
          variants={slideInVariants("top", 0.7, 50, true)}
        >
          <div className="input-group">
            <input
              placeholder="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={errors.name ? "error" : ""}
            />
            {errors.name && (
              <motion.span
                className="error-message"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {errors.name}
              </motion.span>
            )}
          </div>
        </motion.div>

        <motion.div
          className="second-row"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          custom={2}
          variants={slideInVariants("top", 0.7, 50, true)}
        >
          <div className="input-group">
            <input
              placeholder="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? "error" : ""}
            />
            {errors.email && (
              <motion.span
                className="error-message"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {errors.email}
              </motion.span>
            )}
          </div>
          <div className="input-group">
            <input
              placeholder="Subject"
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className={errors.subject ? "error" : ""}
            />
            {errors.subject && (
              <motion.span
                className="error-message"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {errors.subject}
              </motion.span>
            )}
          </div>
        </motion.div>

        <div className="third-row">
          <motion.div
            className="input-group"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            custom={3}
            variants={slideInVariants("top", 0.7, 50, true)}
          >
            <textarea
              placeholder="Message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className={errors.message ? "error" : ""}
            />
            {errors.message && (
              <motion.span
                className="error-message"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {errors.message}
              </motion.span>
            )}
          </motion.div>
        </div>

        <motion.div
          className="captcha-row"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          custom={4}
          variants={slideInVariants("top", 0.7, 50, true)}
        >
          <div className="captcha-container">
            <div className="captcha-display">
              <span>{captchaValue}</span>
              <button
                type="button"
                className="refresh-captcha"
                onClick={generateCaptcha}
                title="Refresh CAPTCHA"
              >
                ↻
              </button>
            </div>
            <input
              placeholder="Enter CAPTCHA"
              type="text"
              name="captcha"
              value={formData.captcha}
              onChange={handleInputChange}
              className={errors.captcha ? "error" : ""}
            />
            {errors.captcha && (
              <motion.span
                className="error-message"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {errors.captcha}
              </motion.span>
            )}
          </div>
        </motion.div>

        <motion.button
          className={`contact-btn inner-info-link ${isSubmitting ? "submitting" : ""}`}
          type="submit"
          disabled={isSubmitting}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          custom={5}
          variants={slideInVariants("top", 0.7, 50, true)}
          whileHover={!isSubmitting ? { scale: 1.05 } : {}}
          whileTap={!isSubmitting ? { scale: 0.95 } : {}}
        >
          {isSubmitting ? (
            <>
              <FaSpinner className="spinner" />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <FaPaperPlane />
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
};

export default ContactsForm;
