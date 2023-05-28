import "./index.css";

import ReactDOM from "react-dom/client";
import { observer } from "mobx-react";
import { authModel } from "./models/auth";

const User: React.FC = observer(() => {
    if (authModel.isLoading) {
        return <div>Loading...</div>;
    }

    if (authModel.errorMessage) {
        return <div>{authModel.errorMessage}</div>;
    }

    const user = authModel.user;

    if (user === undefined) {
        return <div>Initial state</div>;
    }

    return (
        <div>
            {user.id} {user.name}
        </div>
    );
});

const App: React.FC = () => {
    return (
        <>
            <div>
                <button
                    onClick={() =>
                        authModel.signIn({
                            name: "signIn",
                            password: "signIn",
                        })
                    }
                >
                    sign in
                </button>
                <button
                    onClick={() =>
                        authModel.signUp({
                            name: "signUp",
                            password: "signUp",
                        })
                    }
                >
                    sign up
                </button>
                <button onClick={() => authModel.signOut()}>sign out</button>
            </div>
            <User />
        </>
    );
};

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(<App />);
