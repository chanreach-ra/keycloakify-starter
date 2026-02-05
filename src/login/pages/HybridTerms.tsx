import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@mui/material";

export default function HybridTerms(props: PageProps<Extract<KcContext, { pageId: "terms.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { msg } = i18n;
    const { url } = kcContext;

    return (
        <Template kcContext={kcContext} i18n={i18n} doUseDefaultCss={doUseDefaultCss} classes={classes} headerNode={msg("termsTitle")}>
            <form action={url.loginAction} method="post" className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6 max-h-96 overflow-y-auto border border-gray-200">
                    <div className="prose prose-sm max-w-none text-gray-700">
                        <h3 className="text-lg font-semibold mb-4">{msg("termsTitle")}</h3>
                        <p className="mb-4">{msg("termsText")}</p>

                        {/* You can customize the terms content here */}
                        <p className="text-sm leading-relaxed">
                            By clicking &apos;Accept&apos;, you agree to our terms and conditions. Please read carefully before accepting.
                        </p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <Button
                        type="submit"
                        name="accept"
                        value="Yes"
                        variant="contained"
                        fullWidth
                        size="large"
                        sx={{ textTransform: "none", py: 1.5 }}
                    >
                        {msg("doAccept")}
                    </Button>
                    <Button type="submit" name="cancel" value="No" variant="outlined" fullWidth size="large" sx={{ textTransform: "none", py: 1.5 }}>
                        {msg("doDecline")}
                    </Button>
                </div>
            </form>
        </Template>
    );
}
