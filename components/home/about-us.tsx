import React from "react";
import Container from "@/components/ui/container";
import Banner from "@/components/ui/banner";
import StepsImage from "@/components/home/steps-image";
import Steps from "@/components/home/steps";

const AboutUs = () => {
  return (
    <section>
      <div
        className="courses-banner"
        style={{
          width: "100%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(images/about-us.jpg)`,
          backgroundPosition: "center",
        }}
      >
        <Container>
          <div className="heading">
            <h3>Learn About Us</h3>
          </div>
        </Container>
      </div>

      <div className="steps-section">
        <Container>
          <div className="heading">
            <h3>
              How It<span> Works</span>
            </h3>
            <p>
              Embark on Your Learning Journey, Sign Up for Online Courses Today!
            </p>
          </div>
          {/**How it works */}
          <div className="wrapper">
            <StepsImage />
            <Steps />
          </div>
        </Container>
      </div>

      <Banner
        action={"Browse Our Courses"}
        link="/courses"
        title={"Start your learning journey today"}
        image={"images/banner.jpg"}
        slogan={
          "Start your learning journey with our expert online courses! Dive into a world of knowledge from home and elevate your skills. Join us today!"
        }
      />
    </section>
  );
};

export default AboutUs;
