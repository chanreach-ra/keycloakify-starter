import { TextField, Button, Link } from "@mui/material";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function HybridForgotPassword(props: PageProps<Extract<KcContext, { pageId: "login-reset-password.ftl" }>, I18n>) {
    const { kcContext, i18n, Template } = props;
    const { url, realm, auth } = kcContext;
    const { msg } = i18n;

    return (
        <Template {...props} headerNode={msg("emailForgotTitle")}>
            <form action={url.loginAction} method="post" className="space-y-5">
                {/* Intro */}
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200">
                    <p className="text-sm text-blue-800">{msg("emailInstruction")}</p>
                </div>

                {/* Username/Email Field */}
                <div className="py-4 m-0">
                    <TextField
                        id="username"
                        name="username"
                        label={
                            !realm.loginWithEmailAllowed
                                ? msg("username")
                                : !realm.registrationEmailAsUsername
                                  ? msg("usernameOrEmail")
                                  : msg("email")
                        }
                        autoFocus
                        autoComplete="username"
                        defaultValue={auth?.attemptedUsername ?? ""}
                        fullWidth
                        variant="outlined"
                    />
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    className="bg-linear-to-r from-primary to-primary-dark hover:shadow-xl transform hover:-translate-y-0.5 transition-all normal-case font-semibold py-3"
                >
                    {msg("doSubmit")}
                </Button>

                {/* Back to Login */}
                <div className="text-center pt-4">
                    <Link href={url.loginUrl} underline="hover">
                        {msg("backToLogin")}
                    </Link>
                </div>
            </form>
        </Template>
    );
}
