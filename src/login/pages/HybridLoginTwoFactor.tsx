import { useState } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { TextField, Button, Tabs, Tab } from "@mui/material";
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";

export default function HybridLoginTwoFactor(props: PageProps<Extract<KcContext, { pageId: "login-config-totp.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { msg } = i18n;
    const { url, totp } = kcContext;

    const [tabValue, setTabValue] = useState(0);
    const [showSecret, setShowSecret] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("doLogIn")}
        >
            <form action={url.loginAction} method="post" className="space-y-6" onSubmit={() => setIsSubmitting(true)}>
                {/* Intro */}
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                    <h3 className="font-semibold text-blue-900 mb-1">Set Up Two-Factor Authentication</h3>
                    <p className="text-sm text-blue-800">
                        Secure your account by adding a time-based one-time password (TOTP) authenticator app.
                    </p>
                </div>

                {/* Setup Instructions */}
                <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-semibold text-gray-800">Setup Instructions</h4>

                    <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)} sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <Tab label="Scan QR Code" value={0} />
                        <Tab label="Manual Entry" value={1} />
                    </Tabs>

                    {/* QR Tab */}
                    {tabValue === 0 && (
                        <div className="flex flex-col items-center gap-4">
                            <p className="text-sm text-gray-600">Scan this QR code with your authenticator app:</p>
                            {totp?.qrUrl && (
                                <img src={totp.qrUrl} alt="QR" className="w-40 h-40 border border-gray-200 rounded" />
                            )}
                        </div>
                    )}

                    {/* Manual Entry Tab */}
                    {tabValue === 1 && (
                        <div className="space-y-3">
                            <p className="text-sm text-gray-600">Enter this key manually in your authenticator app:</p>
                            <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded">
                                <div>
                                    <p className="text-xs text-gray-600">Secret Key</p>
                                    <p className="font-mono font-bold tracking-widest text-gray-700">
                                        {showSecret ? (totp?.totpSecret || totp?.totpSecretEncoded || "••••••••••••••••") : "••••••••••••••••"}
                                    </p>
                                </div>
                                <Button
                                    size="small"
                                    variant="outlined"
                                    onClick={() => setShowSecret(!showSecret)}
                                >
                                    {showSecret ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                                </Button>
                            </div>

                            {totp?.supportedApplications && totp.supportedApplications.length > 0 && (
                                <div>
                                    <p className="text-sm font-semibold text-gray-700 mb-2">Recommended Authenticator Apps</p>
                                    <div className="grid grid-cols-2 gap-2">
                                        {totp.supportedApplications.map((app, i) => (
                                            <div key={i} className="p-2 border border-gray-200 rounded text-center text-sm">
                                                {app}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Device Label */}
                <div className="space-y-1">
                    <label className="block text-sm font-semibold text-gray-700">Device Label (Optional)</label>
                    <TextField
                        fullWidth
                        name="deviceLabel"
                        placeholder="e.g., My iPhone"
                        variant="outlined"
                        size="small"
                        helperText="Helps you identify this device later"
                    />
                </div>

                {/* Submit */}
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    className="bg-linear-to-r from-primary to-primary-dark hover:shadow-xl transform hover:-translate-y-0.5 transition-all normal-case font-semibold py-3"
                    disabled={isSubmitting}
                    sx={{ textTransform: "none", py: 1.5 }}
                >
                    {isSubmitting ? "Setting up..." : "Setup Complete"}
                </Button>

                {/* Skip */}
                <div className="text-center">
                    <Button
                        variant="text"
                        size="small"
                        href={window.location.pathname}
                        sx={{ textTransform: "none" }}
                    >
                        Skip for now
                    </Button>
                </div>
            </form>
        </Template>
    );
}
