import education from "../../data/education";


const Education = () => {
  return (
    <div className="education">
      <h4 className="label">Education</h4>
      <ul className="education-list">
        {education.map((item, index) => (
          <li className="item" key={index}>
            <span className="year">{item.year}</span>
            <p>{item.degree} - {item.institution}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Education;
