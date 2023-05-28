import { makeObservable, observable, action } from "mobx";
import * as api from "../api/auth";
import { createIncidentFlow } from "../utils/incident";

interface User {
    id: number;
    name: string;
}

interface Credential {
    name: string;
    password: string;
}

// TODO
const getErrorMessage = (error: unknown): string => "Error";

const { Incident, expireLatestIncident } = createIncidentFlow();

class AuthModel {
    user?: User;
    errorMessage?: string;
    isLoading: boolean = false;

    constructor() {
        makeObservable(this, {
            user: observable,
            errorMessage: observable,
            isLoading: observable,
            setStart: action,
            setEnd: action,
            setSuccess: action,
            setFail: action,
            reset: action,
        });
    }

    setStart() {
        this.isLoading = true;
    }
    setEnd() {
        this.isLoading = false;
    }

    setSuccess(user: User) {
        this.user = user;
        this.errorMessage = undefined;
    }
    setFail(errorMessage: string) {
        this.user = undefined;
        this.errorMessage = errorMessage;
    }

    reset() {
        this.user = undefined;
        this.errorMessage = undefined;
        this.isLoading = false;
    }

    async sign(signOptions: api.SignOptions) {
        const incident = new Incident();

        this.setStart();

        try {
            const user = await api.sign(signOptions);

            if (incident.isLatest) {
                this.setSuccess(user);
            }
        } catch (error) {
            if (incident.isLatest) {
                this.setFail(getErrorMessage(error));
            }
        } finally {
            if (incident.isLatest) {
                this.setEnd();
            }
        }
    }

    signIn(credential: Credential) {
        this.sign({
            credential,
            mode: "in",
        });
    }

    signUp(credential: Credential) {
        this.sign({
            credential,
            mode: "up",
        });
    }

    signOut() {
        expireLatestIncident();

        this.reset();
    }
}

const authModel = new AuthModel();

export type { User, Credential };
export { authModel };
