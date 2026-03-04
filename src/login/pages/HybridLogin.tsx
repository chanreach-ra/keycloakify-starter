import { useState } from "react";
import { TextField, Button, Checkbox, FormControlLabel, Link, InputAdornment, IconButton, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function HybridLogin(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, Template } = props;
    const { social, realm, url, usernameHidden, login, registrationDisabled } = kcContext;
    const { msg } = i18n;

    const [showPassword, setShowPassword] = useState(false);

    return (
        <Template
            {...props}
            headerNode={msg("loginTitle")}
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
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                    <p className="text-sm text-blue-800">{msg("loginAccountTitle")}</p>
                </div>

                {/* Username/Email Field */}
                {!usernameHidden && (
                    <div className="pt-4 m-0">
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
                        />
                    </div>
                )}
                {/* Password Field */}
                <div className="m-0 pt-4">
                    <TextField
                        id="password"
                        name="password"
                        label={msg("password")}
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        fullWidth
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword(!showPassword)} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between pt-4">
                    {realm.rememberMe && !usernameHidden && (
                        <FormControlLabel
                            control={<Checkbox id="rememberMe" name="rememberMe" defaultChecked={!!login.rememberMe} size="small" />}
                            label={<span className="text-sm">{msg("rememberMe")}</span>}
                        />
                    )}
                    {realm.resetPasswordAllowed && (
                        <Link href={url.loginResetCredentialsUrl} className="text-sm ml-auto" underline="hover">
                            {msg("doForgotPassword")}
                        </Link>
                    )}
                </div>

                {/* Login Button */}
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={kcContext.isAppInitiatedAction}
                    className="bg-linear-to-r from-primary to-primary-dark hover:shadow-xl transform hover:-translate-y-0.5 transition-all normal-case font-semibold py-3"
                >
                    {msg("doLogIn")}
                </Button>

                {/* Registration Link */}
                {realm.password && realm.registrationAllowed && !registrationDisabled && (
                    <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                        <Typography variant="body2" component="span" className="text-gray-600">
                            {msg("noAccount")}{" "}
                        </Typography>
                        <Link href={url.registrationUrl} underline="hover">
                            {msg("doRegister")}
                        </Link>
                    </div>
                )}
            </form>
        </Template>
    );
}
