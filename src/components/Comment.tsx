import { ThumbsDown, ThumbsUp } from "lucide-react";
import { Button } from "./ui/button";

import {
	arrayRemove,
	arrayUnion,
	doc,
	increment,
	updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/store/AuthProvider";

export function Comment({
	comment,
	ideaId,
}: {
	comment: IdeaComment;
	ideaId: string;
}) {
	const user = useAuth();
	const likedByUser = user ? comment.likedBy?.includes(user.uid) === true : false;
	const dislikedByUser = user
		? comment.dislikedBy?.includes(user.uid) === true
		: false;

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
				<p className="text-xs mb-1">@{comment.from}</p>
				<p className="mb-1">{comment.text}</p>
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
