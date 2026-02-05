import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { TextField, Button } from "@mui/material";

export default function HybridLoginOtp(
    props: PageProps<Extract<KcContext, { pageId: "login-otp.ftl" }>, I18n>
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
            headerNode={msg("doLogIn")}
        >
            <form action={url.loginAction} method="post" className="space-y-6">
                <div className="space-y-4">
                    <TextField
                        fullWidth
                        type="text"
                        name="otp"
                        label={msg("loginOtpOneTime")}
                        autoFocus
                        autoComplete="off"
                        required
                        variant="outlined"
                    />
                </div>

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{ textTransform: 'none', py: 1.5 }}
                >
                    {msg("doSubmit")}
                </Button>
            </form>
        </Template>
    );
}
