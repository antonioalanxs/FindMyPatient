import useLogout from "@/core/hooks/useLogout";
import BaseCard from "@/shared/components/BaseCard/BaseCard";

function ExitCard() {
  const logout = useLogout();

  return (
    <BaseCard
      title="Log out"
      subtitle="You will have to log in again to use the application."
    >
      <button className="btn btn-danger" onClick={logout}>
        <i className="me-2 bi bi-box-arrow-right"></i>
        <span>Log out</span>
      </button>
    </BaseCard>
  );
}

export default ExitCard;
