import { useState } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { TextField, Button, Checkbox, FormControlLabel, Typography, Link } from "@mui/material";

export default function HybridLoginUsername(
    props: PageProps<Extract<KcContext, { pageId: "login-username.ftl" }>, I18n>
) {
    const { kcContext, i18n, Template } = props;
    const { social, realm, url, usernameHidden, login, registrationDisabled } = kcContext;
    const { msg } = i18n;

    const [username, setUsername] = useState(login.username ?? "");
    const [rememberMe, setRememberMe] = useState(login.rememberMe === "on");

    return (
        <Template
            {...props}
            headerNode={msg("loginTitle", realm.displayName ?? realm.name)}
            socialProvidersNode={
                social?.providers !== undefined &&
                social.providers.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <Typography variant="body2" className="text-center text-gray-600 mb-4">
                            {msg("identity-provider-login-label")}
                        </Typography>
                        <div className="space-y-3">
                            {social.providers.map(p => (
                                <Button
                                    key={p.alias}
                                    variant="outlined"
                                    fullWidth
                                    href={p.loginUrl}
                                    startIcon={p.iconClasses && <i className={p.iconClasses} aria-hidden="true" />}
                                    className="capitalize"
                                >
                                    {p.displayName}
                                </Button>
                            ))}
                        </div>
                    </div>
                )
            }
        >
            <form action={url.loginAction} method="post" className="space-y-5">
                {/* Intro */}
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200">
                    <p className="text-sm text-blue-800">
                        {msg("loginAccountTitle")}
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
