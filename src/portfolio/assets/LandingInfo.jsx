import myStrings from "../../myStrings";
import { Card } from "react-bootstrap";
import "../landingPage.css";

export default function LandingPitch(props) {
  return (
    <Card
      onClick={props.changeArt}
      className="landing-card landing-large-text p-2 w-50"
    >
      <Card.Body id="landingPitch">
        <span>I'm Michael Prewitt. I love </span>
        <span>art, </span>
        <span>technology, and doing interesting work.</span>
        <br />
        <span>
          Check me out on{" "}
          <a className="light-blue" href={myStrings.linkedin}>
            Linkden
          </a>
        </span>
        <br />
        <span>
          Or my{" "}
          <a className="light-blue" href={myStrings.github}>
            Github
          </a>
        </span>
      </Card.Body>
    </Card>
  );
}
