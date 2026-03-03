import { useState } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { TextField, Button, Typography, Link, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function HybridLoginPassword(props: PageProps<Extract<KcContext, { pageId: "login-password.ftl" }>, I18n>) {
    const { kcContext, i18n, Template } = props;
    const { auth, url, realm } = kcContext;
    const { msg } = i18n;

    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <Template {...props} headerNode={msg("doLogIn")} socialProvidersNode={undefined}>
            <form action={url.loginAction} method="post" className="space-y-5">
                <div className="flex flex-col gap-2 pt-4">
                    {/* Intro */}
                    <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                        <p className="text-sm text-blue-800">Enter your password to continue</p>
                    </div>

                    {/* Show Username if enabled */}
                    {auth?.showUsername && auth.attemptedUsername && (
                        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                            <Typography variant="body2" className="text-gray-700">
                                <span className="text-xs text-gray-600 block">Logging in as:</span>
                                <span className="font-semibold">{auth.attemptedUsername}</span>
                            </Typography>
                        </div>
                    )}

                    {/* Password Input */}
                    <TextField
                        id="password"
                        name="password"
                        label={msg("password")}
                        type={showPassword ? "text" : "password"}
                        fullWidth
                        variant="outlined"
                        autoFocus
                        autoComplete="current-password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <IconButton size="small" onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ mr: 1 }}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            )
                        }}
                    />
                </div>
                {/* Submit Button */}
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    className="bg-linear-to-r from-primary to-primary-dark hover:shadow-xl transform hover:-translate-y-0.5 transition-all normal-case font-semibold py-3"
                    disabled={isSubmitting}
                    onClick={() => setIsSubmitting(true)}
                    sx={{ textTransform: "none", py: 1.5 }}
                >
                    {msg("doLogIn")}
                </Button>

                {/* Links */}
                <div className="space-y-3 pt-4 border-t border-gray-200">
                    {realm.resetPasswordAllowed && (
                        <Typography variant="body2" className="text-center">
                            <Link href={url.loginResetCredentialsUrl} underline="hover" sx={{ cursor: "pointer" }}>
                                {msg("doForgotPassword")}
                            </Link>
                        </Typography>
                    )}

                    {auth?.showTryAnotherWayLink && (
                        <Typography variant="body2" className="text-center">
                            <Link href={url.loginRestartFlowUrl} underline="hover" sx={{ cursor: "pointer" }}>
                                {msg("doTryAnotherWay")}
                            </Link>
                        </Typography>
                    )}
                </div>
            </form>
        </Template>
    );
}
