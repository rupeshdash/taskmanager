import { addImage } from "@/assets/Images";
import { useAppDispatch } from "@/Redux/store";
import { getAllTeams } from "@/Redux/TeamsDetails/TeamDetailsActions";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../designConstants/Header";
import Loader from "../designConstants/Loader";
import Navigation from "../designConstants/Navigation";
import { CreateTeamComponent } from "./CreateTeamComponent";
import TeamComponent from "./TeamComponent";

const TeamsWrapper = () => {
  const authData = useSelector((state: any) => state.authData);
  const teamData = useSelector((state: any) => state.teamData);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const requestHeader = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const requestBody = {
      adminEmail: authData?.userEmail,
    };

    dispatch(getAllTeams(requestBody, { headers: requestHeader }));
  }, []);


  return (
    <div className="page-wrapper">
      <Navigation />
      <div className="inner-wrapper">
        {" "}
        <Header />
        <section className="team-section pt-4 pl-4">
          <header className="section-header my-7 px-5 flex flex-row-reverse justify-between">
            <CreateTeamComponent source="create" />
            <span>Teams</span>{" "}
          </header>
          {teamData?.getAllTeamsLoading ? (
            <Loader />
          ) : (
            <div className="team-wrapper">
              <>
                {teamData?.allTeams.map((team: any) => {
                  return (
                    <TeamComponent
                      key={team._id}
                      team={{
                        ...team,
                        isAdmin:
                          team?.admin?.email ===
                          localStorage.getItem("userEmail"),
                      }}
                    />
                  );
                })}
              </>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default TeamsWrapper;
