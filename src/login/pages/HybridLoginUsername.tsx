import { useState } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { TextField, Button, Checkbox, FormControlLabel, Typography, Link } from "@mui/material";

export default function HybridLoginUsername(
    props: PageProps<Extract<KcContext, { pageId: "login-username.ftl" }>, I18n>
) {
    const { kcContext, i18n, Template } = props;
    const { realm, url, usernameHidden, login, registrationDisabled } = kcContext;
    const { msg } = i18n;

    const [username, setUsername] = useState(login.username ?? "");
    const [rememberMe, setRememberMe] = useState(login.rememberMe === "on");
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <Template
            {...props}
            headerNode={msg("doLogIn")}
            socialProvidersNode={undefined}
        >
            <form action={url.loginAction} method="post" className="space-y-5">
                {/* Intro */}
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                    <p className="text-sm text-blue-800">
                        Enter your username or email to continue
                    </p>
                </div>

                {/* Username Field */}
                {!usernameHidden && (
                    <div>
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
                            defaultValue={login.username ?? ""}
                            fullWidth
                            variant="outlined"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                )}

                {/* Remember Me */}
                {realm.rememberMe && (
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="rememberMe"
                                color="primary"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                        }
                        label={msg("rememberMe")}
                    />
                )}

                {/* Submit Button */}
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={isSubmitting}
                    onClick={() => setIsSubmitting(true)}
                    sx={{ textTransform: "none", py: 1.5 }}
                >
                    {msg("doLogIn")}
                </Button>

                {/* Links */}
                <div className="space-y-3 pt-4 border-t border-gray-200">
                    {!registrationDisabled && (
                        <Typography variant="body2" className="text-center">
                            {msg("noAccount")}{" "}
                            <Link
                                href={url.registrationUrl}
                                underline="hover"
                                sx={{ cursor: "pointer" }}
                            >
                                {msg("doRegister")}
                            </Link>
                        </Typography>
                    )}

                    {realm.resetPasswordAllowed && (
                        <Typography variant="body2" className="text-center">
                            <Link
                                href={url.loginResetCredentialsUrl}
                                underline="hover"
                                sx={{ cursor: "pointer" }}
                            >
                                {msg("doForgotPassword")}
                            </Link>
                        </Typography>
                    )}
                </div>
            </form>
        </Template>
    );
}
