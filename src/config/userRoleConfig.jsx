export const ROLE_CONFIG = {
  parent: {
    label: "Parent",
    listUrl: (adminId) => `/getAllParents?adminId=${adminId}`,
    createUrl: () => `/createParent`,
    normalizeRow: (p) => ({
      _id: p._id,
      fullName: p.fullName,
      email: p.email,
      role: p.role || "Parent",
      isActive: p.isActive ?? true,
      createdAt: p.createdAt,
    }),
    buildPayload: (v, adminId) => ({
      adminId,
      fullName: v("fullName"),
      email: v("email"),
      password: v("password"),
      phoneNumber: v("phoneNumber"),
      address: v("address"),
      city: v("city"),
      zipCode: v("zipCode"),
      occupation: v("occupation"),
      // relationToStudent: v("relationToStudent"),
      emergencyContact: {
        name: v("ecName"),
        phoneNumber: v("ecPhone"),
        relation: v("ecRelation"),
      },
    }),
  },

  teacher: {
    label: "Teacher",
    listUrl: (adminId) => `/getAllTeachers?adminId=${adminId}`,
    createUrl: () => `/createTeacher`,
    normalizeRow: (t) => ({
      _id: t._id,
      fullName: t.fullName,
      email: t.email,
      role: t.role || "Teacher",
      isActive: t.isActive ?? true,
      createdAt: t.createdAt,
    }),
    buildPayload: (v, adminId) => ({
      adminId,
      fullName: v("fullName"),
      email: v("email"),
      password: v("password"),
      phoneNumber: v("phoneNumber"),
      classes: [
        {
          class: v("classId"),     // ✅ selected class
          subject: v("subjectId"), // ✅ selected subject from class.subjects
        },
      ],
      specialization: v("specialization"),
      qualification: v("qualification"),
      experience: Number(v("experience", "0")) || 0,
      address: v("address"),
      city: v("city"),
      zipCode: v("zipCode"),
      emergencyContact: {
        name: v("ecName"),
        phoneNumber: v("ecPhone"),
        relation: v("ecRelation"),
      },
    }),
  },

  student: {
    label: "Student",
    listUrl: (adminId) => `/getAllStudents?adminId=${adminId}`,
    createUrl: () => `/createStudent`,
    normalizeRow: (s) => ({
      _id: s._id,
      fullName: s.fullName,
      email: s.email,
      role: s.role || "Student",
      isActive: s.isActive ?? true,
      createdAt: s.createdAt,
    }),
    buildPayload: (v, adminId) => {
      const allergies = v("allergies", "")
        ? v("allergies").split(",").map((x) => x.trim()).filter(Boolean)
        : [];
      const medications = v("medications", "")
        ? v("medications").split(",").map((x) => x.trim()).filter(Boolean)
        : [];

      return {
        adminId,
        fullName: v("fullName"),
        email: v("email"),
        password: v("password"),
        phoneNumber: v("phoneNumber"),
        parentId: v("parentId"), // ✅ selected parent
        dateOfBirth: v("dateOfBirth"),
        grade: v("grade"),
        classId: v("classId"),   // ✅ selected class
        rollNumber: v("rollNumber"),
        gender: v("gender"),
        address: v("address"),
        city: v("city"),
        zipCode: v("zipCode"),
        medicalInfo: {
          bloodType: v("bloodType"),
          allergies,
          medications,
          specialNeeds: v("specialNeeds", ""),
        },
      };
    },
  },
};
