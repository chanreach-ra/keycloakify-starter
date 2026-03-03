import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@mui/material";
import { Error as ErrorIcon } from "@mui/icons-material";

export default function HybridError(
    props: PageProps<Extract<KcContext, { pageId: "error.ftl" }>, I18n>
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { msg } = i18n;
    const { message, client, skipLink } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("errorTitle")}
        >
            <div className="space-y-6 text-center">
                <div className="flex justify-center">
                    <div className="w-20 h-20 bg-linear-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center">
                        <ErrorIcon sx={{ fontSize: 40, color: 'white' }} />
                    </div>
                </div>

                {message && message.summary && (
                    <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
                        <p
                            className="text-red-800"
                            dangerouslySetInnerHTML={{ __html: message.summary }}
                        />
                    </div>
                )}

                {!skipLink && client?.baseUrl && (
                    <div className="pt-4">
                        <a href={client.baseUrl} className="block">
                            <Button
                                variant="contained"
                                fullWidth
                                size="large"
                                sx={{ textTransform: 'none', py: 1.5 }}
                            >
                                {msg("backToApplication")}
                            </Button>
                        </a>
                    </div>
                )}
            </div>
        </Template>
    );
}
