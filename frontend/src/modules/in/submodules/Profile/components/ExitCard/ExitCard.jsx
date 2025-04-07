import useLogout from "@/core/hooks/useLogout";
import BaseCard from "@/shared/components/BaseCard/BaseCard";

function ExitCard() {
  const logout = useLogout();

  return (
    <BaseCard
      title="Log out"
      subtitle="It means that you will have to log in again to use the application."
    >
      <div className="btn btn-danger" onClick={logout}>
        Log out
      </div>
    </BaseCard>
  );
}

export default ExitCard;
