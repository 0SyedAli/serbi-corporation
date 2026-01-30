import { FiEdit2, FiTrash2 } from "react-icons/fi";

export default function UsersTable({ activeTab, list, loadingList }) {
  return (
    <div className="table-box">
      <table className="sos-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {loadingList ? (
            <tr>
              <td colSpan="4" className="text-center text-muted">
                Loading...
              </td>
            </tr>
          ) : list.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center text-muted">
                No {activeTab} users found
              </td>
            </tr>
          ) : (
            list.map((u) => (
              <tr key={u._id}>
                <td className="user-cell">
                  <span className="avatar">{(u.fullName || "?").charAt(0)}</span>
                  {u.fullName}
                </td>
                <td>{u.email}</td>
                <td>
                  <span className={`role ${activeTab}`}>{u.role}</span>
                </td>
                <td className="actions">
                  <FiEdit2 />
                  <FiTrash2 className="danger" />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
