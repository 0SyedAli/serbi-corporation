export default function MessagesSection() {
  const messages = [
    {
      name: "Mrs. Allen",
      role: "Teacher",
      preview: "Your son has shown great improvement in...",
      time: "2:00 PM",
    },
    {
      name: "Tim Lee",
      role: "Teacher",
      preview: "Could we schedule a meeting soon? I would...",
      time: "12:00PM",
    },
    {
      name: "Principal Johnson",
      role: "Principal",
      preview: "Your daughter has been selected for...",
      time: "10:30 PM",
    },
    {
      name: "Tim Lee",
      role: "Teacher",
      preview: "Could we schedule a meeting soon? I would...",
      time: "12:30 PM",
    },
    {
      name: "Tim Lee",
      role: "Teacher",
      preview: "Could we schedule a meeting soon? I would...",
      time: "12:30 PM",
    },
  ]

  return (
    <div className="section-card">
      <div className="section-card-header">
        <h6 className="section-card-title">Messages</h6>
        <a href="#" className="view-all-link">
          View all
        </a>
      </div>
      {messages.map((msg, index) => (
        <div key={index} className="message-item">
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.name}`}
            alt={msg.name}
            className="message-avatar"
          />
          <div className="message-content">
            <div className="message-header">
              <div>
                <div className="message-name">{msg.name}</div>
                {/* <div className="message-role">{msg.role}</div> */}
              </div>
              <div className="message-time">{msg.time}</div>
            </div>
            <div className="message-text">{msg.preview}</div>
          </div>
          {/* <div className="message-notification-dot"></div> */}
        </div>
      ))}
    </div>
  )
}
