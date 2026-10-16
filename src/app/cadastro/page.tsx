"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SubmitEvent, useState } from "react";
import { collection, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { toast } from "@/components/ui/toast";
import { useAuth } from "@/store/AuthProvider";

export default function CadastroPage() {
	const router = useRouter();
	const user = useAuth();

	const [errors, setErrors] = useState({
		title: "",
		description: "",
		sector: "",
		authors: "",
		contact: "",
	});

	const submitHandler = (e: SubmitEvent) => {
		e.preventDefault();

		if (!user) return;

		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData.entries()) as {
			[k: string]: string;
		};

		let valid = true;

		Object.keys(data).map((k) => {
			const val = data[k] as string;

			if (k === "business_name") return;

			if (val.trim() === "") {
				valid = false;

				setErrors((prev) => ({
					...prev,
					[k]: "Campo obrigatório",
				}));
			} else {
				setErrors((prev) => ({
					...prev,
					[k]: "",
				}));
			}
		});

		if (valid) {
			submitIdeaFirestore({ ...data, postedBy: user.email! });
		}
	};

	const submitIdeaFirestore = async (data: { [k: string]: string }) => {
		try {
			const collectionRef = collection(db, "ideas");
			const id = doc(collectionRef).id;

			await setDoc(doc(db, "ideas", id), {
				...data,
				id,
				authors: data["authors"].split(","),
				date: new Date(),
				likedBy: [],
				dislikedBy: [],
				likes: 0,
				dislikes: 0,
			});

			toast.add({
				type: "success",
				description: "Ideia cadastrada!",
				priority: "high",
			});

			router.replace("/ideias");
		} catch (error: any) {
			toast.add({
				type: "error",
				title: "Ocorreu um erro",
				description: "Sua ideia não foi cadastrada, tente novamente",
				priority: "high",
			});
		}
	};

	return (
		<main className="flex flex-col flex-1 justify-center items-center bg-background p-6">
			<form
				onSubmit={submitHandler}
				className="bg-card rounded-md p-6 min-w-sm max-w-2xl w-full space-y-6"
			>
				<div>
					<Label htmlFor="title">Título*</Label>
					<Input id="title" name="title" />
					<p className="text-destructive text-sm">{errors.title}</p>
				</div>

				<div>
					<Label htmlFor="description">Descrição*</Label>
					<Textarea id="description" name="description" />
					<p className="text-destructive text-sm">{errors.description}</p>
				</div>

				<div>
					<Label htmlFor="sector">Setor*</Label>
					<Input
						id="sector"
						name="sector"
						placeholder="Ex.: Hospital, restaurante"
					/>
					<p className="text-destructive text-sm">{errors.sector}</p>
					<span className="text-muted-foreground text-xs">
						Caso aplicável em mais de um, separar por vírgula
					</span>
				</div>

				<div>
					<Label htmlFor="business_name">Nome da sua empresa</Label>
					<Input id="business_name" name="business_name" />
					<span className="text-muted-foreground text-xs">Opcional</span>
				</div>

				<div>
					<Label htmlFor="authors">Autor*</Label>
					<Input id="authors" name="authors" />
					<p className="text-destructive text-sm">{errors.authors}</p>
					<span className="text-muted-foreground text-xs">
						Caso haja mais de um, separar por vírgula
					</span>
				</div>

				<div>
					<Label htmlFor="contact">Contato*</Label>
					<Input placeholder="Insira seu email" id="contact" name="contact" />
					<p className="text-destructive text-sm">{errors.contact}</p>
				</div>

				<Button type="submit" className={"cursor-pointer w-full py-6"}>
					Cadastrar
				</Button>
			</form>
		</main>
	);
}
