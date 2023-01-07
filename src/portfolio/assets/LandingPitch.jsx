import myStrings from "../../myStrings";
import { Card } from "react-bootstrap";
import "../landingPage.css";

export default function LandingPitch() {
  return (
    <Card className="landing-card p-2 w-75">
      <Card.Body>
        <h4>{myStrings.landingPitch}</h4>
        <h4>
          Check me out on{" "}
          <a className="light-blue" href={myStrings.linkedin}>
            Linkden
          </a>
        </h4>
        <h4>
          Or my{" "}
          <a className="light-blue" href={myStrings.github}>
            Github
          </a>
        </h4>
      </Card.Body>
    </Card>
  );
}
