import { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { apiClient, getApiErrorMessage } from "@/lib/apiClient";
import { ROLE_CONFIG } from "@/config/userRoleConfig";
import { useRouter } from "next/navigation";

const getAuth = () => {
  if (typeof window === "undefined") return {};
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return { adminId: user?.id, token: user?.token };
};

export function useUserManagement(activeTab) {
  const [users, setUsers] = useState({ parent: [], teacher: [], student: [] });
  const [loadingList, setLoadingList] = useState(false);
  const [creating, setCreating] = useState(false);
  const router = useRouter()
  const config = useMemo(() => ROLE_CONFIG[activeTab], [activeTab]);

  const fetchUsers = useCallback(async () => {
    try {
      const { adminId } = getAuth();
      if (!adminId) {
        // toast.error("adminId missing in localStorage user");
        router.push("/admin/auth/login");
        return;
      }

      setLoadingList(true);
      const url = config.listUrl(adminId);

      const res = await apiClient.get(url);

      if (!res?.data?.success) {
        toast.error(res?.data?.message || "Failed to fetch users");
        return;
      }

      const list = Array.isArray(res.data.data) ? res.data.data : [];
      const normalized = list.map(config.normalizeRow);

      setUsers((prev) => ({ ...prev, [activeTab]: normalized }));
    } catch (err) {
      toast.error(getApiErrorMessage(err));
    } finally {
      setLoadingList(false);
    }
  }, [activeTab, config]);

  const createUser = useCallback(
    async (formEl, onDone) => {
      if (creating) return;

      try {
        const { adminId } = getAuth();
        if (!adminId) {
          toast.error("adminId missing in localStorage user");
          return;
        }

        setCreating(true);

        const fd = new FormData(formEl);
        const v = (name, def = "") => (fd.get(name)?.toString().trim() || def);

        const payload = config.buildPayload(v, adminId);

        const res = await apiClient.post(config.createUrl(), payload);

        if (!res?.data?.success) {
          toast.error(res?.data?.message || "Create failed");
          return;
        }

        toast.success(`${config.label} created successfully`);

        // Refresh list from server (best practice)
        await fetchUsers();

        onDone?.();
      } catch (err) {
        toast.error(getApiErrorMessage(err));
      } finally {
        setCreating(false);
      }
    },
    [creating, config, fetchUsers]
  );

  return { users, setUsers, fetchUsers, loadingList, creating, createUser };
}
