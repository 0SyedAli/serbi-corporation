import { useEffect, useMemo, useState } from "react";
import { useLookups } from "@/hooks/useLookups";

export default function CreateUserModal({
  showModal,
  setShowModal,
  activeTab,
  creating,
  onSubmit,
}) {
  const { parents, classes, fetchParents, fetchClasses } = useLookups();

  const [selectedClassId, setSelectedClassId] = useState("");
  const selectedClass = useMemo(
    () => classes.find((c) => c._id === selectedClassId),
    [classes, selectedClassId]
  );

  const subjects = selectedClass?.subjects || [];

  useEffect(() => {
    if (!showModal) return;

    // reset when modal opens
    setSelectedClassId("");

    // load lookups based on role
    if (activeTab === "student") {
      fetchParents();
      fetchClasses();
    } else if (activeTab === "teacher") {
      fetchClasses();
    }
  }, [showModal, activeTab, fetchParents, fetchClasses]);

  if (!showModal) return null;

  return (
    <div className="modal-backdrop-lite" onClick={() => setShowModal(false)}>
      <div className="modal-sheet modal-sheet2" onClick={(e) => e.stopPropagation()}>
        <div className="form-container">
          <h5 className="mb-3">Create {activeTab}</h5>

          <form onSubmit={onSubmit}>
            {/* COMMON REQUIRED */}
            <input name="fullName" className="auth-input mb-2" placeholder="Full Name" required />
            <input name="email" type="email" className="auth-input mb-2" placeholder="Email" required />
            <input name="password" type="password" className="auth-input mb-2" placeholder="Password" required />
            <input name="phoneNumber" className="auth-input mb-2" placeholder="Phone Number" required />
            <input name="address" className="auth-input mb-2" placeholder="Address" required />
            <input name="city" className="auth-input mb-2" placeholder="City" required />
            <input name="zipCode" className="auth-input mb-2" placeholder="Zip Code" required />

            {/* STUDENT: Parent + Class */}
            {activeTab === "student" && (
              <>
                <select name="parentId" className="auth-input mb-2" required>
                  <option value="">Select Parent</option>
                  {parents.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.fullName} ({p.email})
                    </option>
                  ))}
                </select>

                <select name="classId" className="auth-input mb-2" required>
                  <option value="">Select Class</option>
                  {classes.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.className} (Grade {c.grade}-{c.section})
                    </option>
                  ))}
                </select>
              </>
            )}

            {/* TEACHER: Class + Subject (subject from class.subjects) */}
            {activeTab === "teacher" && (
              <>
                <select
                  name="classId"
                  className="auth-input mb-2"
                  required
                  value={selectedClassId}
                  onChange={(e) => setSelectedClassId(e.target.value)}
                >
                  <option value="">Select Class</option>
                  {classes.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.className} (Grade {c.grade}-{c.section})
                    </option>
                  ))}
                </select>

                <select
                  name="subjectId"
                  className="auth-input mb-2"
                  required
                  disabled={!selectedClassId}
                >
                  <option value="">
                    {!selectedClassId ? "Select Class First" : "Select Subject"}
                  </option>
                  {subjects.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.subjectName} ({s.subjectCode})
                    </option>
                  ))}
                </select>

                <input name="specialization" className="auth-input mb-2" placeholder="Specialization" required />
                <input name="qualification" className="auth-input mb-2" placeholder="Qualification" required />
                <input name="experience" type="number" className="auth-input mb-2" placeholder="Experience (years)" required />

                <div className="mt-2 mb-1" style={{ fontWeight: 600, fontSize: 13 }}>
                  Emergency Contact
                </div>
                <input name="ecName" className="auth-input mb-2" placeholder="Name" required />
                <input name="ecPhone" className="auth-input mb-2" placeholder="Phone Number" required />
                <input name="ecRelation" className="auth-input mb-2" placeholder="Relation (e.g., Spouse)" required />
              </>
            )}

            {/* PARENT FIELDS */}
            {activeTab === "parent" && (
              <>
                <input name="occupation" className="auth-input mb-2" placeholder="Occupation" required />
                <input
                  name="relationToStudent"
                  className="auth-input mb-2"
                  placeholder="Relation To Student (e.g., Father)"
                  required
                />

                <div className="mt-2 mb-1" style={{ fontWeight: 600, fontSize: 13 }}>
                  Emergency Contact
                </div>
                <input name="ecName" className="auth-input mb-2" placeholder="Name" required />
                <input name="ecPhone" className="auth-input mb-2" placeholder="Phone Number" required />
                <input name="ecRelation" className="auth-input mb-2" placeholder="Relation (e.g., Spouse)" required />
              </>
            )}

            {/* STUDENT EXTRA FIELDS */}
            {activeTab === "student" && (
              <>
                <input name="dateOfBirth" type="date" className="auth-input mb-2" required />
                <input name="grade" className="auth-input mb-2" placeholder="Grade (e.g., 9)" required />
                <input name="rollNumber" className="auth-input mb-2" placeholder="Roll Number" required />

                <select name="gender" className="auth-input mb-2" required>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>

                <div className="mt-2 mb-1" style={{ fontWeight: 600, fontSize: 13 }}>
                  Medical Info
                </div>
                <input name="bloodType" className="auth-input mb-2" placeholder="Blood Type (e.g., A+)" required />
                <input name="allergies" className="auth-input mb-2" placeholder="Allergies (comma separated)" />
                <input name="medications" className="auth-input mb-2" placeholder="Medications (comma separated)" />
                <input name="specialNeeds" className="auth-input mb-2" placeholder="Special Needs (optional)" />
              </>
            )}

            <div className="d-flex justify-content-end gap-2 mt-3">
              <button
                type="button"
                className="btn btn-outline-secondary"
                disabled={creating}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button type="submit" className="btn auth-primary-btn" disabled={creating}>
                {creating ? "Creating..." : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
