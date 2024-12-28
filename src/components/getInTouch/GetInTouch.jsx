import "./GetInTouch.css"
import { FaPaperPlane } from "react-icons/fa";

const GetInTouch = () => {
  return (
    <div className="get-in-touch sub-section">
      <div className="container flex-center">
        <div className="contact-card">
          <div className="title">
            <h4>Let`s talk</h4>
            <h3>About your</h3>
            <h2>Next project</h2>
          </div>
          <a
            href="https://t.me/iscreamn"
            target="_blank"
            rel="noopener noreferrer"
            className="get-in-touch-link inner-info-link"
          >
            Contact me
            <FaPaperPlane />
          </a>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
