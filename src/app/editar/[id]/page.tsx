"use client";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { SubmitEvent, use, useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
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

export default function EditPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = use(params);

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

		updateIdeaFirestore(data);
	};

	const updateIdeaFirestore = async (data: z.infer<typeof formSchema>) => {
		try {
			await updateDoc(doc(db, "ideas", id), {
				...data,
				authors: data["authors"].split(","),
			});

			toast.add({
				type: "success",
				description: "Ideia editada!",
				priority: "high",
			});

			router.replace("/ideias");
		} catch (error: any) {
			toast.add({
				type: "error",
				title: "Ocorreu um erro",
				description: "Sua ideia não foi editada, tente novamente",
				priority: "high",
			});
		}
	};

	const fetchIdea = async () => {
		const docSnap = await getDoc(doc(db, "ideas", id));

		if (docSnap.exists()) {
			const data = docSnap.data() as Idea;
			form.reset({
				title: data.title ?? "",
				description: data.description ?? "",
				sector: data.sector ?? "",
				authors: data.authors?.join(", ") ?? "",
				business_name: data.business_name ?? "",
				contact: data.contact ?? "",
			});
		}
	};

	useEffect(() => {
		fetchIdea();
	}, [id]);

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
					<div className="flex items-center gap-6">
						<Button
							onClick={() => router.back()}
							className={"flex-1 py-5"}
							type="button"
							variant={"secondary"}
						>
							Cancelar
						</Button>
						<Button className={"flex-1 py-5"} type="submit">
							Salvar alterações
						</Button>
					</div>
				</FieldGroup>
			</form>
		</main>
	);
}
