import { useState } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { TextField, Button, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function HybridUpdatePassword(
    props: PageProps<Extract<KcContext, { pageId: "login-update-password.ftl" }>, I18n>
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { msg } = i18n;
    const { url, isAppInitiatedAction } = kcContext;

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordNew, setShowPasswordNew] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("updatePasswordTitle")}
        >
            <form action={url.loginAction} method="post" className="space-y-6">
                <div className="space-y-4">
                    <TextField
                        fullWidth
                        type={showPassword ? "text" : "password"}
                        name="password"
                        label={msg("password")}
                        autoFocus
                        autoComplete="current-password"
                        required
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        fullWidth
                        type={showPasswordNew ? "text" : "password"}
                        name="password-new"
                        label={msg("passwordNew")}
                        autoComplete="new-password"
                        required
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPasswordNew(!showPasswordNew)}
                                        edge="end"
                                    >
                                        {showPasswordNew ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        fullWidth
                        type={showPasswordNew ? "text" : "password"}
                        name="password-confirm"
                        label={msg("passwordConfirm")}
                        autoComplete="new-password"
                        required
                        variant="outlined"
                    />
                </div>

                <div className="flex gap-4">
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="large"
                        sx={{ textTransform: 'none', py: 1.5 }}
                    >
                        {msg("doSubmit")}
                    </Button>
                    {isAppInitiatedAction && (
                        <Button
                            type="submit"
                            name="cancel-aia"
                            value="true"
                            variant="outlined"
                            fullWidth
                            size="large"
                            sx={{ textTransform: 'none', py: 1.5 }}
                        >
                            {msg("doCancel")}
                        </Button>
                    )}
                </div>
            </form>
        </Template>
    );
}
