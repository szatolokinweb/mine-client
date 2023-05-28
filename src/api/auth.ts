import type { User, Credential } from "../models/auth";

type SignMode = "in" | "up";

interface SignOptions {
    credential: Credential;
    mode: SignMode;
}

const getRandomCondition = (): boolean => Math.random() >= 0.5;

const getRandomId = (): number => Math.floor(Math.random() * 100);

const getMockUser = (name: string) => ({
    id: getRandomId(),
    name,
});

const delay = (durationInMs: number) =>
    new Promise((resolve) => setTimeout(resolve, durationInMs));

// TODO
const sign = async (signOptions: SignOptions): Promise<User> => {
    await delay(1000);

    if (getRandomCondition()) {
        return Promise.resolve(getMockUser(signOptions.credential.name));
    }

    return Promise.reject();
};

export type { SignOptions };
export { sign };
