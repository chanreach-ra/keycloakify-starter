import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button, Typography } from "@mui/material";
import { Email, Refresh } from "@mui/icons-material";

export default function HybridIdpLinkEmail(props: PageProps<Extract<KcContext, { pageId: "login-idp-link-email.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { idpAlias, brokerContext, url } = kcContext;
    const { msg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={msg("emailLinkIdpTitle", idpAlias)}
        >
            <div className="space-y-6">
                {/* Icon */}
                <div className="flex justify-center">
                    <div className="w-20 h-20 bg-linear-to-br from-primary to-primary-dark rounded-full flex items-center justify-center">
                        <Email sx={{ fontSize: 40, color: "white" }} />
                    </div>
                </div>

                {/* Warning Message */}
                <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-4">
                    <Typography className="text-yellow-800" variant="body2">
                        {msg("emailLinkIdp1", idpAlias, brokerContext.username)}
                    </Typography>
                </div>

                {/* Instructions */}
                <div className="space-y-4 text-gray-700">
                    <Typography variant="body2">
                        {msg("emailLinkIdp2")} {brokerContext.username}.
                    </Typography>

                    <Typography variant="body2">{msg("emailLinkIdp3")}</Typography>

                    <Typography variant="body2">{msg("emailLinkIdp4")}</Typography>
                </div>

                {/* Actions */}
                <div className="space-y-3 pt-4">
                    {/* Resend Email */}
                    <form action={url.loginAction} method="post">
                        <input type="hidden" name="submitAction" value="SEND_EMAIL" />
                        <Button
                            type="submit"
                            variant="outlined"
                            fullWidth
                            size="large"
                            startIcon={<Refresh />}
                            sx={{ textTransform: "none", py: 1.5 }}
                        >
                            <span>{msg("doClickHere")} {msg("emailVerifyInstruction3")}</span>
                        </Button>
                    </form>

                    {/* Continue if already verified */}
                    <form action={url.loginAction} method="post">
                        <Button type="submit" variant="contained" fullWidth size="large" sx={{ textTransform: "none", py: 1.5 }}>
                            <span>{msg("doClickHere")} {msg("emailLinkIdp5")}</span>
                        </Button>
                    </form>
                </div>
            </div>
        </Template>
    );
}
