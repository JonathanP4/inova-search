"use client";

import { useAuth } from "@/store/AuthProvider";
import { Button } from "./ui/button";
import { auth } from "@/lib/firebase";

import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Menu, X } from "lucide-react";

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
				<div className="hidden md:block">
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
					className={"text-foreground hidden md:block"}
				>
					Sair
				</Button>
			)}
			<div className="md:hidden">
				<Drawer swipeDirection="left">
					<DrawerTrigger render={<Button variant="outline" />}>
						<Menu />
					</DrawerTrigger>
					<DrawerContent>
						<DrawerHeader className="flex flex-row justify-between">
							<DrawerTitle>Menu</DrawerTitle>
							<DrawerClose render={<Button variant="outline" />}>
								<X />
							</DrawerClose>
						</DrawerHeader>
						<div className="p-4">
							<ul className="space-y-4">
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
										<Button
											onClick={() => auth.signOut()}
											variant={"link"}
											className={"text-foreground p-0 m-0"}
										>
											Sair
										</Button>
									)}
								</li>

								<li>
									{user && (
										<a href="/cadastro">
											<Button
												className={
													"p-5 rounded-full cursor-pointer text-popover"
												}
											>
												Cadastrar ideia
											</Button>
										</a>
									)}
									{!user && (
										<a href="/auth">
											<Button
												className={
													"p-5 rounded-full cursor-pointer text-popover"
												}
											>
												Entrar
											</Button>
										</a>
									)}
								</li>
							</ul>
						</div>
						<DrawerFooter></DrawerFooter>
					</DrawerContent>
				</Drawer>
			</div>
		</nav>
	);
}
