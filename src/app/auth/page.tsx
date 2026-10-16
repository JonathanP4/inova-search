"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { auth, provider } from "@/lib/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";
export default function AuthPage() {
	const router = useRouter();

	const googleSignin = async () => {
		try {
			await signInWithPopup(auth, provider);

			router.replace("/ideias");
		} catch (error: any) {
			const errorCode = error.code;
			const errorMessage = error.message;

			toast.add({
				title: "Algo deu errado",
				description: errorCode + ": " + errorMessage,
				type: "error",
			});
		}
	};
	return (
		<main className="flex flex-col justify-center items-center flex-1">
			<div className="shadow-md p-6 rounded-2xl border border-border max-w-lg space-y-4">
				<h1 className="text-2xl font-semibold">
					Cadastre-se e começe a inovar!
				</h1>
				<p>
					É simples e rápido, basta clicar no botão abaixo para entrar com sua
					conta Google
				</p>
				<Button
					onClick={googleSignin}
					className={"mt-6 border-primary w-full py-6 "}
				>
					<img
						src={"google-logo.png"}
						width={20}
						height={20}
						alt="google logo"
					/>
					<span>Entrar com Google</span>
				</Button>
			</div>
		</main>
	);
}
