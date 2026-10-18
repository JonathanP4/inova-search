"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { collection, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { toast } from "@/components/ui/toast";
import { useAuth } from "@/store/AuthProvider";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";

const formSchema = z.object({
	title: z.string().min(5, "Título deve ter no mínimo 5 caracteres"),
	description: z.string().min(20, "Descrição deve ter no mínimo 20 caracteres"),
	sector: z.string().min(1, "Setor é obrigatório"),
	authors: z.string().min(1, "Autor é obrigatório"),
	contact: z.string().min(1, "Contato é obrigatório"),
	business_name: z.string().optional(),
});

export default function CadastroPage() {
	const router = useRouter();
	const user = useAuth();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			description: "",
			sector: "",
			authors: "",
			contact: "",
			business_name: "",
		},
	});

	const submitHandler = (data: z.infer<typeof formSchema>) => {
		if (!user) return;

		submitIdeaFirestore(data);
	};

	const submitIdeaFirestore = async (data: z.infer<typeof formSchema>) => {
		try {
			const collectionRef = collection(db, "ideas");
			const id = doc(collectionRef).id;

			await setDoc(doc(db, "ideas", id), {
				...data,
				id,
				authors: data["authors"].replaceAll(", ", ",").split(","),
				date: new Date(),
				likedBy: [],
				dislikedBy: [],
				postedBy: user!.email,
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
				onSubmit={form.handleSubmit(submitHandler)}
				className="bg-card rounded-md p-6 min-w-sm max-w-2xl w-full space-y-6"
			>
				<FieldGroup>
					<Controller
						name="title"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field>
								<FieldLabel htmlFor="title">Título*</FieldLabel>
								<Input {...field} />
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>

					<Controller
						name="description"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field>
								<FieldLabel htmlFor="description">Descrição*</FieldLabel>
								<Input {...field} />
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>

					<Controller
						name="sector"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field>
								<FieldLabel htmlFor="sector">Setor*</FieldLabel>
								<Input {...field} placeholder="Ex.: Hospital, restaurante" />
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>

					<Controller
						name="authors"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field>
								<FieldLabel htmlFor="authors">Autor*</FieldLabel>
								<Input
									{...field}
									placeholder="Caso haja mais de um, separar por vírgula"
								/>
								<FieldDescription>
									Caso haja mais de um, separar por vírgula
								</FieldDescription>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>

					<Controller
						name="business_name"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field>
								<FieldLabel htmlFor="business_name">
									Nome da sua empresa
								</FieldLabel>
								<Input {...field} />
								<FieldDescription>Opcional</FieldDescription>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>

					<Controller
						name="contact"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field>
								<FieldLabel htmlFor="contact">Contato*</FieldLabel>
								<Input {...field} />

								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>

					<Button type="submit" className={"cursor-pointer w-full py-6"}>
						Cadastrar
					</Button>
				</FieldGroup>
			</form>
		</main>
	);
}
