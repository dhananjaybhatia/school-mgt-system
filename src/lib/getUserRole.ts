import { auth } from "@clerk/nextjs/server";

export const getUserInfo = async (): Promise<{ role: string | null; userId: string | null }> => {
    const { sessionClaims, userId } = await auth();
    const role = (sessionClaims?.metadata as { role?: string })?.role ?? null;
    return { role, userId: userId ?? null };
};
