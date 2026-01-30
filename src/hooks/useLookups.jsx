import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { apiClient, getApiErrorMessage } from "@/lib/apiClient";
import { useRouter } from "next/navigation";

const getAuth = () => {
  if (typeof window === "undefined") return {};
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return { adminId: user?.id };
};

export function useLookups() {
  const [parents, setParents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loadingLookups, setLoadingLookups] = useState(false);
  const router = useRouter();
  const fetchParents = useCallback(async () => {
    try {
      const { adminId } = getAuth();
      if (!adminId) {
        router.push("/admin/auth/login");
        toast.error("adminId missing");
        return;
      }
      setLoadingLookups(true);

      const res = await apiClient.get(`/getAllParents?adminId=${adminId}`);
      if (!res?.data?.success) return toast.error(res?.data?.message || "Failed to load parents");

      setParents(res.data.data || []);
    } catch (e) {
      toast.error(getApiErrorMessage(e));
    } finally {
      setLoadingLookups(false);
    }
  }, []);

  const fetchClasses = useCallback(async () => {
    try {
      const { adminId } = getAuth();
      if (!adminId) return toast.error("adminId missing");
      setLoadingLookups(true);

      const res = await apiClient.get(`/getAllClasses?adminId=${adminId}`);
      if (!res?.data?.success) return toast.error(res?.data?.message || "Failed to load classes");

      setClasses(res.data.data || []);
    } catch (e) {
      toast.error(getApiErrorMessage(e));
    } finally {
      setLoadingLookups(false);
    }
  }, []);

  return { parents, classes, loadingLookups, fetchParents, fetchClasses };
}
