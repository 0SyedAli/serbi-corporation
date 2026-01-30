import { FaStar } from "react-icons/fa";

export default function RecognitionHighlights() {
  const achievements = [
    "Sarah – Math Olympiad Winner",
    "Sarah – Math Olympiad Winner",
    "Sarah – Math Olympiad Winner",
  ];

  return (
    <div className="recognition-card">
      <h5 className="fw-bold mb-3">Recognition Highlights</h5>

      <div className="d-flex flex-column gap-3">
        {achievements.map((item, index) => (
          <div key={index} className="recognition-item">
            <FaStar className="star-icon" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
