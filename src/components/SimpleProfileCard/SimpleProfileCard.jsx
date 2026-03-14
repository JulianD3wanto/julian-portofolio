import "./SimpleProfileCard.css";

export default function SimpleProfileCard() {
  return (
    <div className="simple-profile-card">
      <div className="simple-profile-image">
        <img src="/assets/Julian.jpeg" alt="Julian Dewanto" />
      </div>

      <div className="simple-profile-content">
        <h3>Julian Dewanto</h3>
        <p>Web Developer</p>

        <div className="simple-profile-meta">
          <span>@julian_dewanto</span>
          <span className="online">Online</span>
        </div>

        <button type="button">Contact Me</button>
      </div>
    </div>
  );
}