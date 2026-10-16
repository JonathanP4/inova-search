type Idea = {
	authors: string[];
	contact: string;
	date: import("firebase/firestore").Timestamp;
	description: string;
	sector: string;
	title: string;
	business_name?: string;
	id: string;
	likes: number;
	dislikes: number;
	likedBy?: string[];
	dislikedBy?: string[];
	postedBy: string;
};

type IdeaComment = {
	id?: string;
	pfp: string;
	from: string;
	date: import("firebase/firestore").Timestamp | any;
	text: string;
	likes: number;
	dislikes: number;
	likedBy?: string[];
	dislikedBy?: string[];
};
