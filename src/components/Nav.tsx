"use client";

import { useAuth } from "@/store/AuthProvider";
import { Button } from "./ui/button";
import { auth } from "@/lib/firebase";

export function Navbar() {
	const user = useAuth();

	return (
		<nav className="flex items-center sticky top-0  backdrop-blur-sm p-4 border border-transparent border-b-border  text-neutral-800">
			<div className="flex w-full items-center justify-around">
				<a href="/">
					<div className="flex items-center gap-1">
						<img src="icon.png" alt="" width={50} height={50} />
						<img src="name.png" alt="" width={100} />
					</div>
				</a>
				<div>
					<ul className="flex items-center justify-between gap-8">
						<li>
							<a href="/#como_funciona">Como funciona</a>
						</li>

						<li>
							<a href="/#vantagens">Vantagens</a>
						</li>
						{user && (
							<li>
								<a href="/ideias">Ideias</a>
							</li>
						)}

						<li>
							{user && (
								<a href="/cadastro">
									<Button
										className={"p-5 rounded-full cursor-pointer text-popover"}
									>
										Cadastrar ideia
									</Button>
								</a>
							)}
							{!user && (
								<a href="/auth">
									<Button
										className={"p-5 rounded-full cursor-pointer text-popover"}
									>
										Entrar
									</Button>
								</a>
							)}
						</li>
					</ul>
				</div>
			</div>

			{user && (
				<Button
					onClick={() => auth.signOut()}
					variant={"outline"}
					className={"text-foreground"}
				>
					Sair
				</Button>
			)}
		</nav>
	);
}
