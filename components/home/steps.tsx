import {
  faBook,
  faComment,
  faGraduationCap,
  faSearch,
  faSignIn,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import StepsCard from "./step-card";

const Steps = () => {
  return (
    <div className="steps-container">
      <StepsCard
        title="Browse Courses"
        description={
          "Explore our diverse catalog of courses tailored to your interests and skill levels"
        }
      >
        <FontAwesomeIcon icon={faSearch} className="icon" />
      </StepsCard>
      <StepsCard
        title="Enroll"
        description={
          "Enroll in your chosen course with just a few clicks to gain instant access to high-quality learning materials"
        }
      >
        <FontAwesomeIcon icon={faSignIn} className="icon" />
      </StepsCard>
      <StepsCard
        title="Learn at Your Own Pace"
        description={
          "Enjoy the flexibility of self-paced learning, accessing course materials anytime, anywhere."
        }
      >
        <FontAwesomeIcon icon={faBook} className="icon" />
      </StepsCard>
      <StepsCard
        title="Engage with Content"
        description={
          "Immerse yourself in engaging content including video lectures, quizzes, and hands-on projects."
        }
      >
        <FontAwesomeIcon icon={faComment} className="icon" />
      </StepsCard>

      <StepsCard
        title="Achieve Your Goals"
        description={
          "Put your new skills into practice, earn certificates of completion, and advance your personal or professional goals"
        }
      >
        <FontAwesomeIcon icon={faGraduationCap} className="icon" />
      </StepsCard>
    </div>
  );
};

export default Steps;
