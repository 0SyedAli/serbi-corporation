export default function RecentActivity() {
  const activities = [
    {
      icon: "📋",
      title: "Curriculum Update Submitted",
      description: "You have successfully submitted curriculum updates...",
      time: "5:30 PM",
    },
    {
      icon: "📊",
      title: "Student Grade Posted",
      description: "Grades for the Class 9 Assessment were posted...",
      time: "3:32 PM",
    },
    {
      icon: "📅",
      title: "Department Meeting Reminder",
      description: "Don't forget department meeting on 3:15 today...",
      time: "2:10 PM",
    },
    {
      icon: "📅",
      title: "Department Meeting Reminder",
      description: "Don't forget department meeting on 3:15 today...",
      time: "1:00 PM",
    },
    {
      icon: "📅",
      title: "Department Meeting Reminder",
      description: "Don't forget department meeting on 3:15 today...",
      time: "8:00 AM",
    },
  ]

  return (
    <div className="section-card">
      <div className="section-card-header">
        <h6 className="section-card-title">Recent Activity</h6>
        <a href="#" className="view-all-link">
          View all
        </a>
      </div>
      {activities.map((activity, index) => (
        <div key={index} className="activity-item">
          <div className="activity-icon">{activity.icon}</div>
          <div className="activity-content">
            <div className="activity-title">{activity.title}</div>
            <div className="activity-description">{activity.description}</div>
            <div className="activity-time">{activity.time}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
