import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@mui/material";
import { Email } from "@mui/icons-material";

export default function HybridVerifyEmail(props: PageProps<Extract<KcContext, { pageId: "login-verify-email.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { msg } = i18n;
    const { url, user } = kcContext;

    return (
        <Template kcContext={kcContext} i18n={i18n} doUseDefaultCss={doUseDefaultCss} classes={classes} headerNode={msg("emailVerifyTitle")}>
            <div className="space-y-6 text-center">
                <div className="flex justify-center">
                    <div className="w-20 h-20 bg-linear-to-br from-primary to-primary-dark rounded-full flex items-center justify-center">
                        <Email sx={{ fontSize: 40, color: "white" }} />
                    </div>
                </div>

                <p className="text-gray-600">{msg("emailVerifyInstruction1", user?.email ?? "")}</p>

                <p className="text-sm text-gray-500">{msg("emailVerifyInstruction2")}</p>

                <div className="pt-4">
                    <a href={url.loginAction} className="block">
                        <Button
                            variant="contained"
                            fullWidth
                            size="large"
                            sx={{ textTransform: "none", py: 1.5 }}
                            className="bg-linear-to-r from-primary to-primary-dark hover:shadow-xl transform hover:-translate-y-0.5 transition-all normal-case font-semibold py-3"
                        >
                            <span>
                                {msg("doClickHere")} {msg("emailVerifyInstruction3")}
                            </span>
                        </Button>
                    </a>
                </div>
            </div>
        </Template>
    );
}
