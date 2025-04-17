import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className=" items-center  font-bold text-6xl">Quick Share</div>
        <div className=" flex fex-col justify-between mt-6">
          <Button
            onClick={() => {
              navigate("signup");
            }}
            label={"Sign up"}
          />
          <Button
            onClick={() => {
              navigate("signin");
            }}
            label={"Sign In"}
          />
        </div>
      </div>
    </div>
  );
};
