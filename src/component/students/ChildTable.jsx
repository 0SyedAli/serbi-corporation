import { FiEdit2, FiTrash2, FiMoreHorizontal } from "react-icons/fi";

export default function ChildTable() {
    const children = [
        {
            name: "Cindy",
            email: "smiller@eduprohig.edu",
            studentId: "2016-01-001",
            className: "10A",
            dob: "04/18/2008",
            phone: "(555) 101-0101",
            address: "101 High St, Springfield, IL",
            avatar: "/images/profile-avatar.png",
            rowClass: "",
            checked: false,
        },
        {
            name: "David",
            email: "ebrown@eduprohig.edu",
            studentId: "2014-02-002",
            className: "12",
            dob: "07/22/2006",
            phone: "(555) 101-0101",
            address: "202 Lake Ave, Springfield, IL",
            avatar: "/images/profile-avatar.png",
            rowClass: "row-green",
            checked: true,
        },
        {
            name: "Emma",
            email: "osmith@eduprohig.edu",
            studentId: "2017-03-003",
            className: "9B",
            dob: "09/29/2010",
            phone: "(555) 101-0101",
            address: "303 River Rd, Springfield, IL",
            avatar: "/images/profile-avatar.png",
            rowClass: "row-purple",
            checked: true,
        },
    ];

    return (
        <div className="section-card">
            <div className="table-responsive">
                <table className="child-table">
                    <thead>
                        <tr>
                            <th style={{ width: 36 }}>
                                <input type="checkbox" />
                            </th>
                            <th>Child Name</th>
                            <th>Student ID</th>
                            <th>Class</th>
                            <th>DOB</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {children.map((child, i) => (
                            <tr key={i} className={child.rowClass}>
                                <td>
                                    <input type="checkbox" defaultChecked={child.checked} />
                                </td>

                                <td>
                                    <div className="child-info">
                                        <img src={child.avatar} alt={child.name} />
                                        <div>
                                            <strong>{child.name}</strong> <br />
                                            <span>{child.email}</span>
                                        </div>
                                    </div>
                                </td>

                                <td>{child.studentId}</td>
                                <td>{child.className}</td>

                                <td>
                                    <span className="dob-pill">{child.dob}</span>
                                </td>

                                <td>{child.phone}</td>
                                <td>{child.address}</td>

                                <td>
                                    <div className="table-actions">
                                        <FiEdit2 />
                                        <FiTrash2 />
                                        <FiMoreHorizontal />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
