import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from "react";

const AuthContext = createContext<User | undefined | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
	const [user, setUser] = useState<User | null>();

	useEffect(() => {
		const observer = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
			} else {
				setUser(null);
			}
		});

		return () => {
			observer();
		};
	}, []);

	return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
