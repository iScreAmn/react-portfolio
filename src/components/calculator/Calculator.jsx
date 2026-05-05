import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FaTelegramPlane, FaWhatsapp, FaPhone } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { getApiBase } from "../../utils/apiBase";
import "./Calculator.css";

const Calculator = () => {
  const totalSteps = 9;
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    projectType: "",
    goals: [],
    scope: "",
    designApproach: "",
    features: [],
    content: "",
    timeline: "",
    support: "",
    contactMethod: "",
    name: "",
    contact: "",
    message: "",
  });

  const steps = [
    {
      id: 1,
      question: "Тип проекта",
      field: "projectType",
      options: [
        { value: "landing", label: "Лендинг" },
        { value: "corporate", label: "Корпоративный сайт" },
        { value: "ecommerce", label: "Интернет-магазин" },
        { value: "webapp", label: "Веб-приложение" },
      ],
      multiSelect: false,
    },
    {
      id: 2,
      question: "Цель проекта",
      field: "goals",
      options: [
        { value: "leads", label: "Лиды/заявки" },
        { value: "sales", label: "Онлайн-продажи" },
        { value: "branding", label: "Презентация бренда" },
        { value: "automation", label: "Автоматизация процессов" },
      ],
      multiSelect: true,
    },
    {
      id: 3,
      question: "Объём работы",
      field: "scope",
      options: [
        { value: "mvp", label: "MVP (до 5 страниц)" },
        { value: "medium", label: "Средний (6-10)" },
        { value: "large", label: "Большой (15+)" },
      ],
      multiSelect: false,
    },
    {
      id: 4,
      question: "Дизайн-подход",
      field: "designApproach",
      options: [
        { value: "hasDesign", label: "Есть референс/дизайн" },
        { value: "needDesign", label: "Нужна разработка дизайна" },
      ],
      multiSelect: false,
    },
    {
      id: 5,
      question: "Функционал",
      field: "features",
      options: [
        { value: "admin", label: "Админ-панель" },
        { value: "cabinet", label: "Личный кабинет" },
        { value: "filters", label: "Фильтры/поиск" },
        { value: "multilang", label: "Мультиязычность" },
        { value: "blog", label: "Блог/CMS" },
        { value: "payment", label: "Online Оплата" },
        { value: "notifications", label: "Telegram/email уведомления" },
        { value: "seo", label: "SEO" },
      ],
      multiSelect: true,
    },
    {
      id: 6,
      question: "Контент",
      field: "content",
      options: [
        { value: "ready", label: "Контент готов" },
        { value: "needText", label: "Нужна помощь с текстами" },
        { value: "needVisual", label: "Нужна помощь с визуалом" },
      ],
      multiSelect: false,
    },
    {
      id: 7,
      question: "Сроки",
      field: "timeline",
      options: [
        { value: "standard", label: "Стандарт" },
        { value: "fast", label: "Ускоренно" },
        { value: "urgent", label: "Срочно" },
      ],
      multiSelect: false,
    },
    {
      id: 8,
      question: "Поддержка после запуска",
      field: "support",
      options: [
        { value: "none", label: "Не нужна" },
        { value: "1month", label: "1 месяц" },
        { value: "3months", label: "3 месяца" },
        { value: "partnership", label: "Партнерство" },
      ],
      multiSelect: false,
    },
  ];

  const contactMethods = [
    {
      id: "telegram",
      label: "Telegram",
      placeholder: "@username или телефон",
      icon: FaTelegramPlane,
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      placeholder: "Номер телефона",
      icon: FaWhatsapp,
    },
    {
      id: "email",
      label: "Email",
      placeholder: "your@email.com",
      icon: MdOutlineEmail,
    },
    {
      id: "phone",
      label: "Телефон",
      placeholder: "+995 XXX XXX XXX",
      icon: FaPhone,
    },
  ];

  const currentStepData = steps[currentStep - 1];

  const handleOptionSelect = (value) => {
    if (currentStep === 9) return;
    
    const { field, multiSelect } = currentStepData;

    if (multiSelect) {
      setFormData((prev) => {
        const current = prev[field] || [];
        const updated = current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value];
        return { ...prev, [field]: updated };
      });
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const isOptionSelected = (value) => {
    if (currentStep === 9) return false;
    
    const { field, multiSelect } = currentStepData;
    if (multiSelect) {
      return formData[field]?.includes(value);
    }
    return formData[field] === value;
  };

  const canProceed = () => {
    if (currentStep === 9) {
      return formData.contactMethod && formData.name.trim() && formData.contact.trim();
    }
    
    const { field, multiSelect } = currentStepData;
    if (multiSelect) {
      return formData[field]?.length > 0;
    }
    return formData[field] !== "";
  };

  const handleNext = async () => {
    if (!canProceed()) return;
    
    setDirection(1);
    
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      await handleSubmit();
    }
  };

  const handleBack = () => {
    setDirection(-1);
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const apiBase = getApiBase();
      const response = await fetch(`${apiBase}/api/calculator`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setIsCompleted(true);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <section className="calculator-section section">
      <div className="container">
        <div className="calculator-wrapper">
          <motion.div 
            className="calculator-card"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {isCompleted ? (
              <motion.div
                className="calculator-completion"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <motion.div
                  className="calculator-checkmark-circle"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
                >
                  <motion.svg
                    className="calculator-checkmark"
                    viewBox="0 0 52 52"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                  >
                    <motion.path
                      fill="none"
                      strokeWidth="4"
                      strokeLinecap="round"
                      d="M14 27l7 7 16-16"
                    />
                  </motion.svg>
                </motion.div>
                <motion.h2
                  className="calculator-completion-title"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                >
                  Спасибо!
                </motion.h2>
                <motion.p
                  className="calculator-completion-message"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                >
                  Мы получили вашу заявку и скоро свяжемся с вами для обсуждения деталей проекта.
                </motion.p>
              </motion.div>
            ) : (
              <>
                <div className="calculator-progress-container">
                  <motion.div
                    className="calculator-progress-bar"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>

                <div className="calculator-step-indicator">
                  ШАГ {currentStep} ИЗ {totalSteps}
                </div>

                <div className="calculator-content-wrapper">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={currentStep}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="calculator-step-content"
                    >
                      {currentStep <= 8 ? (
                        <div className="calculator-step">
                          <h3 className="calculator-question">
                            {currentStepData.question}
                          </h3>
                          <div className={`calculator-options ${currentStepData.options.length > 4 ? 'calculator-options--grid' : ''}`}>
                            {currentStepData.options.map((option) => (
                              <button
                                key={option.value}
                                className={`calculator-option ${isOptionSelected(option.value) ? 'selected' : ''}`}
                                onClick={() => handleOptionSelect(option.value)}
                              >
                                {option.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="calculator-step">
                          <h3 className="calculator-question">
                            Выберите удобный способ связи
                          </h3>
                          <div className="calculator-contact-methods">
                            {contactMethods.map((method) => {
                              const Icon = method.icon;
                              return (
                                <button
                                  key={method.id}
                                  className={`calculator-contact-method ${formData.contactMethod === method.id ? 'selected' : ''}`}
                                  onClick={() => setFormData({ ...formData, contactMethod: method.id })}
                                >
                                  <Icon className="calculator-contact-icon" />
                                  <span>{method.label}</span>
                                </button>
                              );
                            })}
                          </div>
                          {formData.contactMethod && (
                            <>
                              <motion.input
                                type="text"
                                className="calculator-contact-input"
                                placeholder="Ваше имя"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                              />
                              <motion.input
                                type="text"
                                className="calculator-contact-input"
                                placeholder={contactMethods.find((m) => m.id === formData.contactMethod)?.placeholder}
                                value={formData.contact}
                                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                              />
                              <motion.textarea
                                className="calculator-contact-textarea"
                                placeholder="Сообщение (необязательно)"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                rows={4}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.2 }}
                              />
                            </>
                          )}
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="calculator-actions">
                  {currentStep > 1 && (
                    <button
                      className="calculator-btn calculator-btn--back"
                      onClick={handleBack}
                      disabled={isSubmitting}
                    >
                      Назад
                    </button>
                  )}
                  <button
                    className={`calculator-btn calculator-btn--next ${!canProceed() || isSubmitting ? 'disabled' : ''}`}
                    onClick={handleNext}
                    disabled={!canProceed() || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <FaPhone className="spinner" /> Отправка...
                      </>
                    ) : currentStep === totalSteps ? (
                      "Отправить"
                    ) : (
                      "Далее"
                    )}
                  </button>
                </div>
              </>
            )}
          </motion.div>

          <motion.div 
            className="cta-card"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="cta-content">
              <h3 className="cta-title">Нужна консультация?</h3>
              <p className="cta-text">
                Свяжемся с вами, ответим на все вопросы и предложим решение под ваш бюджет и задачи.
              </p>
              <a href="tel:+995571040626" className="cta-btn">
                Позвонить: +995 571 040 626
              </a>
            </div>
            <div className="cta-decoration">
              <svg viewBox="0 0 200 200" className="cta-svg">
                <path
                  d="M50,100 Q80,50 110,80 T170,100"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  opacity="0.3"
                />
                <circle cx="150" cy="80" r="8" fill="currentColor" opacity="0.4" />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
