import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@mui/material";
import { Email } from "@mui/icons-material";

export default function HybridVerifyEmail(
    props: PageProps<Extract<KcContext, { pageId: "login-verify-email.ftl" }>, I18n>
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { msg } = i18n;
    const { url, user } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("emailVerifyTitle")}
        >
            <div className="space-y-6 text-center">
                <div className="flex justify-center">
                    <div className="w-20 h-20 bg-linear-to-br from-primary to-primary-dark rounded-full flex items-center justify-center">
                        <Email sx={{ fontSize: 40, color: 'white' }} />
                    </div>
                </div>

                <p className="text-gray-600">
                    {msg("emailVerifyInstruction1", user?.email ?? "")}
                </p>

                <p className="text-sm text-gray-500">
                    {msg("emailVerifyInstruction2")}
                </p>

                <div className="pt-4">
                    <a href={url.loginAction} className="block">
                        <Button
                            variant="text"
                            fullWidth
                            sx={{ textTransform: 'none' }}
                        >
                            {msg("doClickHere")} {msg("emailVerifyInstruction3")}
                        </Button>
                    </a>
                </div>
            </div>
        </Template>
    );
}
