import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@mui/material";
import { CheckCircle, Info as InfoIcon } from "@mui/icons-material";

export default function HybridInfo(props: PageProps<Extract<KcContext, { pageId: "info.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { msg } = i18n;
    const { messageHeader, message, requiredActions, skipLink, pageRedirectUri, actionUri, client } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={messageHeader ?? "Success"}
        >
            <div className="space-y-6 text-center">
                <div className="flex justify-center">
                    <div className="w-20 h-20 bg-linear-to-br from-primary to-primary-dark rounded-full flex items-center justify-center">
                        <CheckCircle sx={{ fontSize: 40, color: "white" }} />
                    </div>
                </div>

                {message && (
                    <div className="text-gray-700">
                        <p dangerouslySetInnerHTML={{ __html: message.summary }} />
                    </div>
                )}

                {requiredActions && (
                    <div className="text-left bg-blue-50 rounded-lg p-4 space-y-2">
                        <p className="font-semibold text-blue-900 flex items-center gap-2">
                            <InfoIcon fontSize="small" />
                            Required Actions
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-sm text-blue-800">
                            {requiredActions.map((action, index) => (
                                <li key={index}>{action}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="space-y-3 pt-4">
                    {!skipLink && pageRedirectUri && (
                        <a href={pageRedirectUri} className="block">
                            <Button variant="contained" fullWidth size="large" sx={{ textTransform: "none", py: 1.5 }}>
                                {msg("backToApplication")}
                            </Button>
                        </a>
                    )}

                    {!skipLink && actionUri && (
                        <a href={actionUri} className="block">
                            <Button variant="contained" fullWidth size="large" sx={{ textTransform: "none", py: 1.5 }}>
                                {msg("proceedWithAction")}
                            </Button>
                        </a>
                    )}

                    {skipLink && client?.baseUrl && (
                        <a href={client.baseUrl} className="block">
                            <Button variant="outlined" fullWidth size="large" sx={{ textTransform: "none", py: 1.5 }}>
                                {msg("backToApplication")}
                            </Button>
                        </a>
                    )}
                </div>
            </div>
        </Template>
    );
}
