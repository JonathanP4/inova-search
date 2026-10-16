"use client";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

import { IdeaCard } from "@/components/IdeaCard";
import { useAuth } from "@/store/AuthProvider";

export default function SavedIdeasPage() {
	const [ideas, setIdeas] = useState<Idea[]>([]);
	const user = useAuth();

	useEffect(() => {
		if (!user) {
			setIdeas([]);
			return;
		}

		const q = query(
			collection(db, "ideas"),
			where("likedBy", "array-contains", user.uid),
		);
		const unsub = onSnapshot(q, (doc) => {
			const docs = doc.docs.map((d) => d.data()) as Idea[];
			setIdeas(docs);
		});

		return () => {
			unsub();
		};
	}, [user]);

	return (
		<main className="p-12">
			<h1 className="mb-8 text-3xl font-bold">Salvas</h1>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
				{ideas.length > 0 &&
					ideas.map((idea) => <IdeaCard key={idea.id} idea={idea} />)}
				{ideas.length <= 0 && <p>As ideias que você salvar aparecerão aqui</p>}
			</div>
		</main>
	);
}
