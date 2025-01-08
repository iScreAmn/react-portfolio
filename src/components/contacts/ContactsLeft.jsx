import contactsData from "../../data/contactsData";

const ContactsLeft = () => {
  return (
    <div className="contact-left">
      <h2>Let`s discuss your project</h2>
      <ul className="contact-list">
        {contactsData.map((item) => (
          <li key={item.id}>
            <h3>
              <item.icon /> {item.title}
            </h3>
            <span>
              <a href={item.link}>{item.value}</a>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactsLeft;
