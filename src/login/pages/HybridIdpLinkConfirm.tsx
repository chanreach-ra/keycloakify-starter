import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button, Typography } from "@mui/material";
import { PersonAdd, AccountCircle } from "@mui/icons-material";

export default function HybridIdpLinkConfirm(props: PageProps<Extract<KcContext, { pageId: "login-idp-link-confirm.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { msg } = i18n;
    const { idpAlias, url } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={msg("confirmLinkIdpTitle")}
        >
            <div className="space-y-6">
                {/* Warning Message */}
                <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
                    <Typography className="text-red-800" variant="body2">
                        {msg("confirmLinkIdpReviewProfile", idpAlias)}
                    </Typography>
                </div>

                {/* Options */}
                <div className="space-y-3">
                    <div className="flex gap-4 flex-col">
                        {/* Review Profile Option */}
                        <form action={url.loginAction} method="post">
                            <input type="hidden" name="submitAction" value="updateProfile" />
                            <Button type="submit" variant="outlined" fullWidth size="large" startIcon={<AccountCircle />}>
                                <div className="text-left">
                                    <div className="font-semibold">{msg("confirmLinkIdpReviewProfile", idpAlias)}</div>
                                </div>
                            </Button>
                        </form>

                        {/* Add to Existing Account Option */}
                        <form action={url.loginAction} method="post">
                            <input type="hidden" name="submitAction" value="linkAccount" />
                            <Button type="submit" variant="contained" fullWidth size="large" startIcon={<PersonAdd />}>
                                <div className="text-left">
                                    <div className="font-semibold">{msg("confirmLinkIdpContinue")}</div>
                                </div>
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </Template>
    );
}
