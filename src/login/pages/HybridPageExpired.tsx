import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@mui/material";
import { AccessTime } from "@mui/icons-material";

export default function HybridPageExpired(
    props: PageProps<Extract<KcContext, { pageId: "login-page-expired.ftl" }>, I18n>
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { msg } = i18n;
    const { url } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("pageExpiredTitle")}
        >
            <div className="space-y-6 text-center">
                <div className="flex justify-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-700 rounded-full flex items-center justify-center">
                        <AccessTime sx={{ fontSize: 40, color: 'white' }} />
                    </div>
                </div>

                <p className="text-gray-600">
                    {msg("pageExpiredMsg1")}
                </p>

                <p className="text-sm text-gray-500">
                    {msg("pageExpiredMsg2")}
                </p>

                <div className="pt-4 space-y-3">
                    <a href={url.loginRestartFlowUrl} className="block">
                        <Button
                            variant="contained"
                            fullWidth
                            size="large"
                            sx={{ textTransform: 'none', py: 1.5 }}
                        >
                            {msg("doClickHere")} {msg("restartLoginTooltip")}
                        </Button>
                    </a>

                    <a href={url.loginAction} className="block">
                        <Button
                            variant="outlined"
                            fullWidth
                            size="large"
                            sx={{ textTransform: 'none', py: 1.5 }}
                        >
                            {msg("doContinue")}
                        </Button>
                    </a>
                </div>
            </div>
        </Template>
    );
}
