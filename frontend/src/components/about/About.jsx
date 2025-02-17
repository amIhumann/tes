import React from "react";
import "./about.css";
import ME from "../../assets/hanipan1.jpg";
import { FaAward } from "react-icons/fa";
import { BiBuildingHouse } from "react-icons/bi";
import { VscFolderLibrary } from "react-icons/vsc";

const About = ({about, project}) => {
  let totalProject = project && Object.values(project).flat().length;

  return (
    <section id="about" className="section">
      <h5 data-aos="fade">Get to Know</h5>
      <h2 data-aos="fade">About Me</h2>
      <div className="container about__container">
        <div className="about__me">
          <div className="about__me-image">
            <img src={ME} alt="About Me" />
          </div>
        </div>
        <div className="about__content">
          <div className="about__cards">
            <article className="about__card" data-aos="fade-down">
              <FaAward className="about__icon" />
              <h5>Experience</h5>
              <small>{about?.year}+ Years Working as Software Developer</small>
            </article>
            <article className="about__card" data-aos="fade-up">
              <VscFolderLibrary className="about__icon" />
              <h5>Projects</h5>
              <small>Completed {totalProject}+ <br/> (Games, Website, Mobile, etc)</small>
            </article>
            <article className="about__card" data-aos="fade-down">
              <BiBuildingHouse className="about__icon" />
              <h5>Education</h5>
              <small>High School - {about?.education}</small>
            </article>
          </div>
          <p data-aos="fade">
            "IT oriented with 3 years experience as a software developer.
            Skilled in team collaboration, problem solving, multi-platform
            project management, good verbal communication skills, and able to
            explain complex software problems in easy to understand terms."
          </p>
          <a data-aos="fade" href="#contact" className="btn btn-primary">
            Let's Talk
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
