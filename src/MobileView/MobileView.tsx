import "./MobileView.css";

const MobileView = () => {
  return (
    <div className="mobile-container">
      <div className="emoji">
        <div className="face">
          <div className="eyebrow">
            <span></span>
            <span></span>
          </div>
          <div className="eye">
            <span></span>
            <span></span>
          </div>
          <div className="mouth"></div>
        </div>
      </div>
      <p className="mobile-text">
        Woah! This isn't a mobile app. View it on a bigger screen..
      </p>
    </div>
  );
};

export default MobileView;
