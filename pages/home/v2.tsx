import { SecondJumbotron } from "../../modules/homePage/component/v2/SecondJumbotron/SecondJumbotron";
import Navigation from "../../modules/homePage/component/v2/Navigation";
import Footer from "../../modules/homePage/component/v2/Footer";

export default function HomeV2() {
    return (
        <div className="h-full w-full overflow-clip bg-dark-background-default font-inter ">
            <Navigation />
            <SecondJumbotron />
            <Footer />
        </div>
    );
}