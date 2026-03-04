import { useState } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { TextField, Button, RadioGroup, FormControlLabel, Radio } from "@mui/material";

export default function HybridLoginOtp(props: PageProps<Extract<KcContext, { pageId: "login-otp.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { msg } = i18n;
    const { url, otpLogin } = kcContext;
    const [otp, setOtp] = useState("");
    const [selectedCredentialId, setSelectedCredentialId] = useState(otpLogin.selectedCredentialId ?? otpLogin.userOtpCredentials?.[0]?.id ?? "");
    const [isResending, setIsResending] = useState(false);

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "");
        setOtp(value);
    };

    return (
        <Template kcContext={kcContext} i18n={i18n} doUseDefaultCss={doUseDefaultCss} classes={classes} headerNode={msg("doLogIn")}>
            <form action={url.loginAction} method="post" className="space-y-6">
                {/* Device Selection */}
                {otpLogin.userOtpCredentials && otpLogin.userOtpCredentials.length > 1 && (
                    <div className="space-y-2">
                        <RadioGroup value={selectedCredentialId} onChange={e => setSelectedCredentialId(e.target.value)}>
                            {otpLogin.userOtpCredentials.map(credential => (
                                <FormControlLabel
                                    key={credential.id}
                                    value={credential.id}
                                    control={<Radio name="selectedCredentialId" />}
                                    label={credential.userLabel || msg("loginCredential")}
                                />
                            ))}
                        </RadioGroup>
                    </div>
                )}

                {/* Hidden input for device selection */}
                {selectedCredentialId && <input type="hidden" name="selectedCredentialId" value={selectedCredentialId} />}

                {/* OTP Input */}
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
                    disabled={otp.length === 0}
                    sx={{ textTransform: "none", py: 1.5 }}
                >
                    {msg("doSubmit")}
                </Button>

                {/* Resend Code Link */}
                <div className="text-center pt-2">
                    <form action={url.loginAction} method="post">
                        {selectedCredentialId && <input type="hidden" name="selectedCredentialId" value={selectedCredentialId} />}
                        <input type="hidden" name="resendCode" value="true" />
                        <Button
                            type="submit"
                            variant="text"
                            size="small"
                            disabled={isResending}
                            onClick={() => setIsResending(true)}
                            sx={{ textTransform: "none" }}
                        >
                            {isResending ? "Sending..." : "Resend Code"}
                        </Button>
                    </form>
                </div>
            </form>
        </Template>
    );
}
