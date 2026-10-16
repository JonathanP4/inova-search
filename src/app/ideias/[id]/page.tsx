"use client";

import { use, useEffect, useState } from "react";

import {
	addDoc,
	collection,
	doc,
	getDoc,
	onSnapshot,
	orderBy,
	query,
	serverTimestamp,
	updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "@/components/ui/toast";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Comment } from "@/components/Comment";
import { useAuth } from "@/store/AuthProvider";

export default function IdeaDetailsPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const [idea, setIdea] = useState<Idea | undefined>();
	const [comments, setComments] = useState<IdeaComment[] | undefined>();
	const [comment, setComment] = useState("");

	const user = useAuth();
	const { id } = use(params);

	const postComment = async () => {
		if (!user) return;

		const newComment: IdeaComment = {
			pfp: user.photoURL || "",
			text: comment,
			from: user.displayName || "anônimo",
			likes: 0,
			dislikes: 0,
			likedBy: [],
			dislikedBy: [],
			date: serverTimestamp(),
		};

		await addDoc(collection(db, "ideas", id, "comments"), newComment);

		setComment("");
	};

	useEffect(() => {
		const unsub = onSnapshot(doc(db, "ideas", id), (doc) => {
			if (doc.exists()) {
				setIdea(doc.data() as Idea);
			} else {
				toast.add({
					type: "error",
					title: "Ocorreu um erro",
					description: "Não foi possível carregar a ideia, recarregue a página",
					priority: "high",
				});
			}
		});

		return () => {
			unsub();
		};
	}, [id]);

	useEffect(() => {
		const q = query(
			collection(db, "ideas", id, "comments"),
			orderBy("likes", "desc"),
		);
		const unsub = onSnapshot(q, (col) => {
			const comments = col.docs.map((d) => ({
				id: d.id,
				...d.data(),
			}));

			setComments(comments as IdeaComment[]);
		});

		return () => {
			unsub();
		};
	}, [id]);

	if (!idea)
		return (
			<div className="flex items-center justify-center flex-1">
				<Spinner className="size-10" />
			</div>
		);

	return (
		<main className="p-12 flex flex-col items-center">
			<div className="flex flex-col min-h-75 w-full max-w-5xl mb-6">
				<h1 className="text-2xl font-semibold mb-4">{idea.title}</h1>
				<p>{idea.description}</p>

				<a
					className="text-sm mt-6 text-blue-500"
					href={`mailto:${idea.contact}`}
				>
					{idea.contact}
				</a>

				<div className="mt-auto flex self-end gap-12 mb-4">
					<span className="text-xs italic text-muted-foreground">
						{idea.authors.join(", ")}{" "}
						{idea.business_name ? `@${idea.business_name}` : ""}
					</span>
					<span className="text-xs text-muted-foreground">
						{idea.date.toDate().toLocaleDateString("pt-BR", {
							hour: "2-digit",
							minute: "2-digit",
						})}
					</span>
				</div>

				<div className="w-full">
					<form className="flex items-stretch gap-3">
						<Textarea
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							className="resize-none min-h-10 max-h-20 rounded-full px-7"
							placeholder="Escreva seu comentário"
						/>

						<Button
							onClick={postComment}
							className={"cursor-pointer rounded-full p-3 h-full"}
						>
							<Send />
						</Button>
					</form>
				</div>
			</div>

			<div className="w-full max-w-5xl space-y-6">
				<h3 className="font-semibold">Comentários</h3>
				{comments?.length ? (
					comments
						.sort((a, b) => a.likes - b.likes)
						.map((c) => <Comment key={c.id!} ideaId={idea.id} comment={c} />)
				) : (
					<p className="text-muted-foreground text-sm">
						Ainda não há comentários...
					</p>
				)}
			</div>
		</main>
	);
}
