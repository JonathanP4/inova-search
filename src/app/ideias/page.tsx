"use client";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

import { IdeaCard } from "@/components/IdeaCard";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function IdeasPage() {
	const [ideas, setIdeas] = useState<Idea[]>([]);
	const [searchQuery, setSearchQuery] = useState("");

	const filterFn = (idea: Idea) => {
		if (searchQuery.trim() === "") return true;

		return (
			idea.title.toUpperCase().includes(searchQuery.toUpperCase()) ||
			idea.sector.toUpperCase().includes(searchQuery.toUpperCase()) ||
			idea.authors
				.map((a) => a.toUpperCase())
				.join(" ")
				.includes(searchQuery.toUpperCase())
		);
	};

	useEffect(() => {
		const unsub = onSnapshot(collection(db, "ideas"), (doc) => {
			const docs = doc.docs.map((d) => d.data()) as Idea[];
			setIdeas(docs);
		});

		return () => {
			unsub();
		};
	}, []);

	return (
		<main className="p-12">
			<div className="mb-8">
				<div className="flex items-center justify-between gap-6">
					<h1 className="mb-1 text-3xl font-bold">Ideias</h1>
					<div className="flex items-center gap-2 min-w-sm max-w-lg w-full">
						<Input
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder="Buscar"
							type="text"
						/>
						<Button>
							<Search />
						</Button>
					</div>
				</div>
				<Link className="text-sm underline" href={"ideias/perfil/salvas"}>
					Ideias salvas
				</Link>
			</div>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
				{ideas.length > 0 &&
					ideas
						.filter(filterFn)
						.map((idea) => <IdeaCard key={idea.id} idea={idea} />)}
				{ideas.length <= 0 && (
					<p>Não há ideias cadastradas, seja o primeiro!</p>
				)}
			</div>
		</main>
	);
}
