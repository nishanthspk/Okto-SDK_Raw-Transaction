import { useState} from "react";
import { ethers } from "ethers";
import { useOkto} from "@okto_web3/react-sdk";
import { GoogleLogin } from "@react-oauth/google";
import { UserDashboard } from "./UserDashboard";
import { TokenTransfer } from "./TokenTransfer";
import RawTransaction from './RawTransaction';
import AddComment from './AddComment';
import GetNews from './GetNews';
import GetComments from "./GetComments";

declare global {
	interface Window {
		ethereum?: any;
	}
}


const App = () => {
	const oktoClient = useOkto();
	const [account, setAccount] = useState<string | null>(null);


	async function handleGoogleLogin(credentialResponse: any) {
		try {
			await oktoClient.loginUsingOAuth({
				idToken: credentialResponse.credential,
				provider: "google",
			});
		} catch (error) {
			console.error("Authentication error:", error);
		}
	}

	


	const connectWallet = async () => {
		try {
			if (!window.ethereum) {
				alert("MetaMask is not installed. Please install MetaMask.");
				return;
			}

			const web3Provider = new ethers.BrowserProvider(window.ethereum);
			await window.ethereum.request({ method: "eth_requestAccounts" });

			const signer = await web3Provider.getSigner();
			const userAddress = await signer.getAddress();
			setAccount(userAddress);

		
		
		} catch (error) {
			console.error("Error connecting wallet:", error);
		}
	};



	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-700 to-blue-200 p-6 text-black">
			<h1 className="font-extrabold text-3xl">Raw Transaction</h1>
			<div className="flex justify-between items-center w-full">
				<div className="mr-[100px]">
					{oktoClient.userSWA ? (
						<UserDashboard />
					) : (
						<GoogleLogin onSuccess={handleGoogleLogin} />
					)}
				</div>

				<div>
					{!account ? (
						<button
							onClick={connectWallet}
							className="w-full py-3 my-3 px-15 bg-gradient-to-r from-blue-400 to-blue-700 text-white rounded-full hover:from-blue-600 hover:to-blue-800 transition font-bold shadow-md"
						>
							Connect Wallet
						</button>
					) : (
						<p className="text-blue-700 font-bold text-center mt-2">Wallet Connected</p>
					)}
				</div>
			</div>

			<TokenTransfer />
			<RawTransaction />
			<AddComment />
			<GetNews />
			<GetComments />

		</div>
	);
};

export default App;

