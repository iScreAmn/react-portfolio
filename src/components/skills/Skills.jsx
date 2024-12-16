import "./Skills.css"

const Skills = () => {
  return (
    <section className="skills section" id="skills">
        <div className="container flex-center">
            <h2 className="inner-title">Skills</h2>
            <h3 className="inner-subtitle">Skills</h3>
            <div className="inner__content">
                <div className="skills-description">
                    <h3>Education & Skills</h3>
                    <p>For more than 5 years our experts have been accomplishing enough with modern Web Development, new generation web and app programming language.</p>
                </div>
                <div className="skills-info education-all">
                    <div className="education">
                        <h4 className="label">Education</h4>
                        <ul className="education-list">
                            <li className="item">
                                <span className="year">2020-2021</span>
                                <p>
                                    Ph.D in Horriblensess - Harvard University, 
                                    Cambridge, MA
                                </p>
                            </li>
                            <li className="item">
                                <span className="year">2018-2019</span>
                                <p>Computer Science - Imperialize Technical Institute</p>
                            </li>
                            <li className="item">
                                <span className="year">2016-2018</span>
                                <p>Graphic Designer - Web Graphy, Los Angeles, CA</p>
                            </li>
                        </ul>
                    </div>
                    <div className="education">
                        <h4 className="label">Skills</h4>
                        <ul className="bars">
                            <li className="bar">
                                <div className="info">
                                    <span>html</span>
                                    <span>95%</span>
                                </div>
                                <div className="line html"></div>
                            </li>
                            <li className="bar">
                                <div className="info">
                                    <span>css</span>
                                    <span>85%</span>
                                </div>
                                <div className="line css"></div>
                            </li>
                            <li className="bar">
                                <div className="info">
                                    <span>javascript</span>
                                    <span>85%</span>
                                </div>
                                <div className="line javascript"></div>
                            </li>
                            <li className="bar">
                                <div className="info">
                                    <span>react</span>
                                    <span>80%</span>
                                </div>
                                <div className="line react"></div>
                            </li>
                            <li className="bar">
                                <div className="info">
                                    <span>python</span>
                                    <span>55%</span>
                                </div>
                                <div className="line python"></div>
                            </li>
                        </ul>
                    </div>
                    <div className="education">
                        <h4 className="label">Awards</h4>
                        <ul className="education-list">
                            <li className="item">
                                <span>2021</span>
                                <p><span>Best Developer - University Of Melbourne, NA</span></p>
                            </li>
                            <li className="item">
                                <span>2020</span>
                                <p><span>Best Writter - Online Typodev Soluation Ltd.</span></p>
                            </li>
                            <li className="item">
                                <span>2019</span>
                                <p><span>Best Freelancer - Fiver & Upwork Level 2 & Top Rated</span></p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="education work-exp">
                    <h3 className="work-exp-title">Work & Experience</h3>
                    <div className="skills-info">
                        <div className="expirience-card">
                            <div className="upper">
                                <h3>Sr. Graphic Designer</h3>
                                <h5>Part Time | Office</h5>
                                <span>2020 - 2021</span>
                                <div className="hr"></div>
                            </div>
                            <h4 className="label">Avada Theme.</h4>
                            <p>I design and develop services for customers of all sizes, specializing in creating stylish, modern websites</p>
                        </div>
                        <div className="expirience-card">
                            <div className="upper">
                                <h3>Cr. Web Developer</h3>
                                <h5>Full Time | InHouse</h5>
                                <span>2019 - 2020</span>
                                <div className="hr"></div>
                            </div>
                            <h4 className="label">ib-themes ltd.</h4>
                            <p>I design and develop services for customers of all sizes, specializing in creating stylish, modern websites</p>
                        </div>
                        <div className="expirience-card">
                            <div className="upper">
                                <h3>Jr. Web Developer</h3>
                                <h5>Full Time | Remote</h5>
                                <span>2018 - 2019</span>
                                <div className="hr"></div>
                            </div>
                            <h4 className="label">Creative Gigs.</h4>
                            <p>I design and develop services for customers of all sizes, specializing in creating stylish, modern websites</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
     </section>
  )
}

export default Skills