import { addImage } from "@/assets/Images";
import Header from "../designConstants/Header";
import Navigation from "../designConstants/Navigation";
import TeamComponent from "./TeamComponent";

const TeamsWrapper = () => {
  return (
    <div className="page-wrapper">
      <Navigation />
      <div className="inner-wrapper">
        {" "}
        <Header />
        <section className="team-section pt-4 pl-4">
          <header className="section-header">Teams</header>
          <div className="team-wrapper">
            <TeamComponent />
            <TeamComponent />
            <div className="team-add">{addImage()}</div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TeamsWrapper;
