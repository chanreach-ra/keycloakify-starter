import { useState } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button, Typography, RadioGroup, FormControlLabel, Radio, CardContent } from "@mui/material";

export default function HybridSelectAuthenticator(props: PageProps<Extract<KcContext, { pageId: "select-authenticator.ftl" }>, I18n>) {
    const { kcContext, i18n, Template } = props;
    const { auth, url } = kcContext;
    const { msg } = i18n;

    const [selectedAuthExecId, setSelectedAuthExecId] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const authenticationSelections = auth.authenticationSelections || [];

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedAuthExecId) {
            setIsSubmitting(true);
            (e.target as HTMLFormElement).submit();
        }
    };

    return (
        <Template {...props} headerNode="Choose Authentication Method" socialProvidersNode={undefined}>
            <form action={url.loginAction} method="post" className="space-y-6" onSubmit={handleSubmit}>
                {/* Intro */}
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                    <p className="text-sm text-blue-800">Select an authentication method to proceed</p>
                </div>

                {/* Authentication Methods */}
                <div className="flex flex-col space-y-3">
                    <RadioGroup value={selectedAuthExecId} onChange={e => setSelectedAuthExecId(e.target.value)}>
                        {authenticationSelections.map(auth => (
                            <div
                                key={auth.authExecId}
                                className="cursor-pointer transition-all mt-2 border border-gray-200 rounded-lg hover:shadow-lg"
                            >
                                <CardContent className="p-4">
                                    <FormControlLabel
                                        control={
                                            <Radio
                                                value={auth.authExecId}
                                                checked={selectedAuthExecId === auth.authExecId}
                                                onChange={() => setSelectedAuthExecId(auth.authExecId)}
                                            />
                                        }
                                        label={
                                            <div className="flex-1 ml-2">
                                                <Typography variant="subtitle2" className="font-semibold text-gray-900">
                                                    {auth.displayName}
                                                </Typography>
                                                <Typography variant="body2" className="text-gray-600 mt-1">
                                                    {auth.helpText}
                                                </Typography>
                                            </div>
                                        }
                                        slotProps={{
                                            typography: {
                                                sx: { display: "flex", alignItems: "flex-start", width: "100%" }
                                            }
                                        }}
                                    />
                                </CardContent>
                            </div>
                        ))}
                    </RadioGroup>
                </div>

                {/* Hidden input for selected auth exec ID */}
                <input type="hidden" name="authExecId" value={selectedAuthExecId} />

                {/* Submit Button */}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    className="bg-linear-to-r from-primary to-primary-dark hover:shadow-xl transform hover:-translate-y-0.5 transition-all normal-case font-semibold py-3"
                    disabled={!selectedAuthExecId || isSubmitting}
                    sx={{ textTransform: "none", py: 1.5 }}
                >
                    {msg("doContinue")}
                </Button>
            </form>
        </Template>
    );
}
