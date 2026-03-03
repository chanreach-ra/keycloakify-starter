import { useState } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { TextField, Button } from "@mui/material";

export default function HybridLoginOtp(props: PageProps<Extract<KcContext, { pageId: "login-otp.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { msg } = i18n;
    const { url } = kcContext;
    const [otp, setOtp] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "");
        setOtp(value);
    };

    const handleSubmit = () => {
        setIsSubmitting(true);
    };

    return (
        <Template kcContext={kcContext} i18n={i18n} doUseDefaultCss={doUseDefaultCss} classes={classes} headerNode={msg("doLogIn")}>
            <form action={url.loginAction} method="post" className="space-y-6" onSubmit={handleSubmit}>
                <div className="mb-6 p-4 rounded-lg bg-blue-50 border border-blue-200">
                    <p className="text-sm text-blue-900">Enter the 6-digit code sent to your email or phone number to complete your login.</p>
                </div>

                <div className="space-y-4">
                    <TextField
                        fullWidth
                        inputMode="numeric"
                        name="otp"
                        label={msg("loginOtpOneTime")}
                        placeholder="000000"
                        autoFocus
                        autoComplete="one-time-code"
                        required
                        variant="outlined"
                        value={otp}
                        onChange={handleOtpChange}
                        inputProps={{
                            pattern: "[0-9]*",
                            maxLength: 6,
                            "aria-label": "One-time password"
                        }}
                    />
                </div>

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    className="bg-linear-to-r from-primary to-primary-dark hover:shadow-xl transform hover:-translate-y-0.5 transition-all normal-case font-semibold py-3"
                    disabled={otp.length === 0 || isSubmitting}
                    sx={{ textTransform: "none", py: 1.5 }}
                >
                    {isSubmitting ? msg("doSubmit") : msg("doSubmit")}
                </Button>
            </form>
        </Template>
    );
}
