import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { Spinner } from "flowbite-react";

export const Signup = () => {
	const [firstname, setFirstName] = useState("");
	const [lastname, setLastName] = useState("");
	const [username, setusername] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const [error, setError] = useState("");

	const handleSignup = async () => {
		setLoading(true);
		try {
			const response = await api.user.signup(
				username,
				password,
				firstname,
				lastname
			);
			navigate("/signin");
		} catch (error) {
			//console.error("Signup failed:", error.response?.data || error.message);
			//alert(error.response?.data?.message || "Signup failed. Please try again.");
			setError(error.response.data.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="bg-slate-300 h-screen flex justify-center">
			<div className="flex flex-col justify-center">
				<div className="bg-white w-80 rounded-lg p-2 h-max px-4 text-center">
					<Heading label={"Sign up"} />
					<SubHeading
						label={"Enter your information to create an account"}
					/>
					{error != "" ? (
						<div className="text-red-500">{error}</div>
					) : (
						<div> </div>
					)}
					<InputBox
						onChange={(e) => {
							setFirstName(e.target.value);
						}}
						label={"First Name"}
						placeholder={"John"}
					/>
					<InputBox
						onChange={(e) => {
							setLastName(e.target.value);
						}}
						label={"Last Name"}
						placeholder={"Doe"}
					/>
					<InputBox
						onChange={(e) => {
							setusername(e.target.value);
						}}
						label={"Email"}
						placeholder={"johndoe@gmail.com"}
					/>
					<InputBox
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						label={"Password"}
						placeholder={"John@3483"}
					/>
					<div>
						{loading ? (
							<Spinner aria-label="Default status example" />
						) : (
							<div className="pt-4">
								<Button
									onClick={handleSignup}
									label={"Sign up"}
								/>
							</div>
						)}
					</div>
					<BottomWarning
						label={"Already have an account?"}
						buttonText={"Sign in"}
						to={"/signin"}
					/>
				</div>
			</div>
		</div>
	);
};
