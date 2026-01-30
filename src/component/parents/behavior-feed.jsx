export default function BehaviorFeed() {
    const behaviors = [
        { name: "John Doe", time: "2h ago", message: "Disruption in class..." },
        { name: "Emily Carter", time: "2h ago", message: "Disruption in class..." },
        { name: "John Doe", time: "2h ago", message: "Disruption in class..." },
    ]

    return (
        <div className="section-card">
            <div className="section-card-header">
                <h6 className="section-card-title">Behavior Notification Feed</h6>
            </div>
            {behaviors.map((behavior, index) => (
                <div key={index} className="behavior-item align-items-center">
                    <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${behavior.name}`}
                        alt={behavior.name}
                        className="behavior-avatar"
                    />
                    <div className="behavior-content">
                        <div className="behavior-header">
                            <div className="d-flex align-items-center gap-3">
                                <div className="behavior-name">{behavior.name}</div>
                                <div className="behavior-role">{behavior.time}</div>
                            </div>
                        </div>
                        <div className="behavior-message mb-0">{behavior.message}</div>

                    </div>
                    <div className="behavior-actions">
                        <button className="btn-acknowledge">Acknowledge</button>
                        <button className="btn-reply">Reply</button>
                    </div>
                </div>
            ))}
            <div className="action-buttons">
                <button className="btn-cancel">Cancel</button>
                <button className="btn-submit">Submit</button>
            </div>
        </div>
    )
}
