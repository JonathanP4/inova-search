import {
	Edit,
	MoreHorizontal,
	ThumbsDown,
	ThumbsUp,
	Trash,
} from "lucide-react";
import { Button } from "./ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "./ui/textarea";

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
import { toast } from "./ui/toast";
import { useRef, useState } from "react";
import { DialogRootActions } from "@base-ui/react";

export function Comment({
	comment,
	ideaId,
}: {
	comment: IdeaComment;
	ideaId: string;
}) {
	const user = useAuth();
	const likedByUser = user
		? comment.likedBy?.includes(user.uid) === true
		: false;
	const dislikedByUser = user
		? comment.dislikedBy?.includes(user.uid) === true
		: false;
	const [isEditing, setIsEditing] = useState(false);
	const [editedText, setEditedText] = useState(comment.text);
	const dialogActions = useRef<DialogRootActions>(null);

	const updateLikes = async () => {
		if (!user || likedByUser) return;

		await updateDoc(doc(db, "ideas", ideaId, "comments", comment.id!), {
			likes: increment(1),
			dislikes: dislikedByUser ? increment(-1) : increment(0),
			likedBy: arrayUnion(user.uid),
			dislikedBy: arrayRemove(user.uid),
		});
	};

	const updateDislikes = async () => {
		if (!user || dislikedByUser) return;

		await updateDoc(doc(db, "ideas", ideaId, "comments", comment.id!), {
			dislikes: increment(1),
			likes: likedByUser ? increment(-1) : increment(0),
			dislikedBy: arrayUnion(user.uid),
			likedBy: arrayRemove(user.uid),
		});
	};

	const editComment = async () => {
		if (!user || comment.authorId !== user.uid || !comment.id) return;

		const text = editedText.trim();
		if (!text) {
			toast.add({
				title: "O comentário não pode estar vazio",
				type: "error",
			});
			return;
		}

		try {
			await updateDoc(doc(db, "ideas", ideaId, "comments", comment.id), {
				text,
			});
			setIsEditing(false);
			toast.add({ title: "Comentário editado", type: "success" });
		} catch {
			toast.add({
				title: "Não foi possível editar o comentário",
				type: "error",
			});
		}
	};

	const deleteComment = async () => {
		if (!user || comment.authorId !== user.uid || !comment.id) return;

		try {
			await deleteDoc(doc(db, "ideas", ideaId, "comments", comment.id));
			dialogActions.current?.close();
			toast.add({ title: "Comentário excluído", type: "success" });
		} catch {
			toast.add({
				title: "Não foi possível excluir o comentário",
				type: "error",
			});
		}
	};

	return (
		<div className="flex items-start text-sm gap-3 w-full">
			<div className="rounded-full border border-border">
				<img
					width={40}
					className="rounded-full max-w-full min-w-10 min-h-10"
					src={comment.pfp}
					alt={"foto de " + comment.from}
				/>
			</div>
			<div>
				<div className="flex items-center justify-between gap-4">
					<p className="text-xs mb-1">@{comment.from}</p>
					{comment.authorId === user?.uid && (
						<Popover modal={true}>
							<PopoverTrigger
								render={<Button variant="ghost" size="icon-sm" />}
							>
								<MoreHorizontal />
								<span className="sr-only">Ações do comentário</span>
							</PopoverTrigger>
							<PopoverContent className="w-fit">
								<Button
									className="flex justify-between w-full text-blue-600 hover:text-blue-600 hover:bg-blue-600/15"
									variant="ghost"
									onClick={() => {
										setEditedText(comment.text);
										setIsEditing(true);
									}}
								>
									<Edit />
									<span>Editar</span>
								</Button>
								<Dialog actionsRef={dialogActions}>
									<DialogTrigger
										render={
											<Button
												className="text-destructive hover:text-destructive hover:bg-red-600/15"
												variant="ghost"
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
												Essa ação não pode ser desfeita e irá deletar o
												comentário de forma permanente
											</DialogDescription>
										</DialogHeader>
										<div className="flex items-center gap-2 justify-end">
											<Button onClick={deleteComment} variant="destructive">
												Deletar
											</Button>
											<DialogClose
												render={<Button variant="outline">Cancelar</Button>}
											/>
										</div>
									</DialogContent>
								</Dialog>
							</PopoverContent>
						</Popover>
					)}
				</div>
				{isEditing ? (
					<div className="space-y-2 mb-2">
						<Textarea
							value={editedText}
							onChange={(event) => setEditedText(event.target.value)}
							aria-label="Editar comentário"
							autoFocus
						/>
						<div className="flex gap-2 justify-end">
							<Button
								variant="outline"
								onClick={() => {
									setEditedText(comment.text);
									setIsEditing(false);
								}}
							>
								Cancelar
							</Button>
							<Button onClick={editComment}>Salvar</Button>
						</div>
					</div>
				) : (
					<p className="mb-1">{comment.text}</p>
				)}
				<div className="flex items-center gap-4 text-xs text-center">
					<div className="flex items-center">
						<Button
							onClick={updateLikes}
							variant={"outline"}
							className={"border-0"}
						>
							<ThumbsUp
								fill={likedByUser ? "#9ae600" : "transparent"}
								size={18}
							/>
						</Button>
						<span>{comment.likes}</span>
					</div>
					<div className="flex items-center">
						<Button
							onClick={updateDislikes}
							variant={"outline"}
							className={"border-0"}
						>
							<ThumbsDown
								fill={dislikedByUser ? "red" : "transparent"}
								size={18}
							/>
						</Button>
						<span>{comment.dislikes}</span>
					</div>
				</div>
			</div>
		</div>
	);
}
