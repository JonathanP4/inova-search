import Link from "next/link";
import { Button } from "./ui/button";
import { Edit, Heart, MoreHorizontal, Trash } from "lucide-react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from "@/components/ui/dialog";
import {
	arrayRemove,
	arrayUnion,
	deleteDoc,
	doc,
	increment,
	updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/store/AuthProvider";
import { useRef } from "react";
import { DialogRootActions } from "@base-ui/react";
import { toast } from "./ui/toast";

export function IdeaCard({ idea }: { idea: Idea }) {
	const user = useAuth();
	const likedByUser = user ? idea.likedBy?.includes(user.uid) === true : false;

	const dialogActions = useRef<DialogRootActions>(null);

	const deleteIdea = async () => {
		await deleteDoc(doc(db, "ideas", idea.id));

		dialogActions.current?.close();

		toast.add({ title: "Ideia deletada", type: "success" });
	};

	const likeIdea = async () => {
		if (!user) return;

		await updateDoc(doc(db, "ideas", idea.id), {
			likes: increment(1),
			likedBy: arrayUnion(user.uid),
		});
	};

	const unlikeIdea = async () => {
		if (!user) return;

		await updateDoc(doc(db, "ideas", idea.id), {
			likes: increment(-1),
			likedBy: arrayRemove(user.uid),
		});
	};

	return (
		<div className="flex flex-col bg-card border rounded-md p-4 relative">
			{idea.postedBy === user?.email && (
				<div className="absolute right-2 top-2">
					<Popover modal={true}>
						<PopoverTrigger render={<Button variant="ghost" />}>
							<MoreHorizontal />
						</PopoverTrigger>
						<PopoverContent className={"w-fit"}>
							<Button
								className={
									"text-blue-600 hover:text-blue-600 hover:bg-blue-600/15"
								}
								variant={"ghost"}
							>
								<Edit />
								<span>Editar</span>
							</Button>
							<Dialog actionsRef={dialogActions}>
								<DialogTrigger
									render={
										<Button
											className={
												"text-destructive hover:text-destructive hover:bg-red-600/15"
											}
											variant={"ghost"}
										>
											<Trash />
											<span>Deletar</span>
										</Button>
									}
								/>
								<DialogContent>
									<DialogHeader>
										<DialogTitle>Tem certeza?</DialogTitle>
										<DialogDescription>
											Essa ação não pode ser desfeita e irá deletar a ideia de
											forma permanente
										</DialogDescription>
									</DialogHeader>
									<div className="flex items-center gap-2 justify-end">
										<Button onClick={deleteIdea} variant={"destructive"}>
											Deletar
										</Button>
										<DialogClose
											render={<Button variant={"outline"}>Cancelar</Button>}
										/>
									</div>
								</DialogContent>
							</Dialog>
						</PopoverContent>
					</Popover>
				</div>
			)}
			<Link className="flex-1 flex-col" href={`/ideias/${idea.id}`}>
				<h2 className="text-lg font-semibold">{idea.title}</h2>
				<p className="text-foreground/80 my-6">{idea.description}</p>
			</Link>
			<div className="flex items-center justify-between mt-auto mb-4">
				<div>
					{idea?.business_name && (
						<p className="text-sm">@{idea.business_name}</p>
					)}
					<span className="text-xs text-muted-foreground line-clamp-1">
						{idea.authors.join(", ")}
					</span>
				</div>
				<span className="text-xs text-foreground/70 ">
					{idea.date.toDate().toLocaleDateString("pt-BR")}
				</span>
			</div>
			<div className="flex items-center justify-between text-xs text-center">
				<div className="rounded-full px-2 py-1 bg-primary w-fit">
					<span className="text-xs">{idea.sector}</span>
				</div>
				<div className="flex items-center">
					<Button
						title="Salvar ideia"
						onClick={() => (likedByUser ? unlikeIdea() : likeIdea())}
						variant={"ghost"}
					>
						<Heart
							color={likedByUser ? "red" : ""}
							fill={likedByUser ? "red" : "transparent"}
							size={18}
						/>
					</Button>
					<span>{idea.likes || 0}</span>
				</div>
			</div>
		</div>
	);
}
