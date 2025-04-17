import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { Spinner } from "flowbite-react";

export const Signin = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSignin = async () => {
		setLoading(true);
		try {
			const response = await api.user.signin(username, password);
			localStorage.setItem("token", response.data);
			navigate("/listFile");
		} catch (error) {
			//console.error("Error signing in:", error);
			setError(error.response.data.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="bg-slate-300 flex justify-center h-screen">
			<div className="flex flex-col justify-center">
				<div className="bg-white rounded-lg w-80 p-2 px-4 h-max text-center">
					<Heading label={"Sign In"} />
					<SubHeading
						label={"Enter your credentials to access your account"}
					/>
					{/* {error != "" ? (
              <div className="text-red-500">
                {error}
              </div>
            ) : (
                  <div> </div>
          )} */}
					{error != "" ? (
						<div className="text-red-500">{error}</div>
					) : (
						<div> </div>
					)}
					<InputBox
						onChange={(e) => {
							setUsername(e.target.value);
						}}
						label={"Email"}
						placeholder={"vaibhav@gmail.com"}
					/>
					<InputBox
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						label={"Password"}
						placeholder={"12345678"}
					/>
					<div>
						{loading ? (
							<Spinner aria-label="Default status example" />
						) : (
							<div className="pt-4">
								<Button
									className="cursor-pointer"
									onClick={handleSignin}
									label={"Sign in"}
								/>
							</div>
						)}
					</div>
					<BottomWarning
						label={"Don't have an account?"}
						buttonText={"Sign Up"}
						to={"/signup"}
					/>
				</div>
			</div>
		</div>
	);
};
