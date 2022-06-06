import React from "react";
import { SecondJumbotron } from "../../../modules/homePage/component/v2/SecondJumbotron/SecondJumbotron";

const StoriesObject = {
    component: SecondJumbotron,
    title: "Risedle V2/Home Page/Jumbotron 2",
};

export default StoriesObject;

export const Jumbotron2 = () => (
    <div className="bg-dark-background-default">
        <SecondJumbotron />
    </div>
);