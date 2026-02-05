import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { TextField, Button } from "@mui/material";

export default function HybridUpdateProfile(
    props: PageProps<Extract<KcContext, { pageId: "login-update-profile.ftl" }>, I18n>
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { msg } = i18n;
    const { url, profile, messagesPerField, isAppInitiatedAction } = kcContext;

    // Access profile attributes by name
    const { attributesByName } = profile;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("loginProfileTitle")}
        >
            <form action={url.loginAction} method="post" className="space-y-6">
                <div className="space-y-4">
                    {attributesByName.username && !attributesByName.username.readOnly && (
                        <TextField
                            fullWidth
                            type="text"
                            name="username"
                            label={msg("username")}
                            defaultValue={attributesByName.username.value ?? ""}
                            required
                            variant="outlined"
                            error={messagesPerField.existsError("username")}
                            helperText={messagesPerField.get("username")}
                        />
                    )}

                    <TextField
                        fullWidth
                        type="email"
                        name="email"
                        label={msg("email")}
                        defaultValue={attributesByName.email?.value ?? ""}
                        required
                        variant="outlined"
                        error={messagesPerField.existsError("email")}
                        helperText={messagesPerField.get("email")}
                    />

                    <TextField
                        fullWidth
                        type="text"
                        name="firstName"
                        label={msg("firstName")}
                        defaultValue={attributesByName.firstName?.value ?? ""}
                        required
                        variant="outlined"
                        error={messagesPerField.existsError("firstName")}
                        helperText={messagesPerField.get("firstName")}
                    />

                    <TextField
                        fullWidth
                        type="text"
                        name="lastName"
                        label={msg("lastName")}
                        defaultValue={attributesByName.lastName?.value ?? ""}
                        required
                        variant="outlined"
                        error={messagesPerField.existsError("lastName")}
                        helperText={messagesPerField.get("lastName")}
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
