import { useNavigate } from "react-router-dom";

function SignOutButton() {
  const navigate = useNavigate();
  const handleSignOut = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <button
      onClick={handleSignOut}
      className="absolute top-4 right-6 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
    >
      Sign Out
    </button>
  );
}
export default SignOutButton;