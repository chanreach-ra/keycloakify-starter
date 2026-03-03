import { useState } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button, Radio } from "@mui/material";

export default function HybridSelectOrganization(
    props: PageProps<Extract<KcContext, { pageId: "select-organization.ftl" }>, I18n>
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { url, user } = kcContext;

    const [selectedOrg, setSelectedOrg] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        (e.target as HTMLFormElement).submit();
    };

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode="Select Organization"
        >
            <form action={url.loginAction} method="post" className="space-y-6" onSubmit={handleSubmit}>
                {/* Intro */}
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                    <p className="text-sm text-blue-900 font-medium">
                        Select an Organization
                    </p>
                    <p className="text-sm text-blue-800 mt-1">
                        Choose the organization you want to access:
                    </p>
                </div>

                {/* Organization List */}
                <div className="space-y-3">
                    {user?.organizations && user.organizations.length > 0 ? (
                        user.organizations.map((org) => (
                            <label key={org.alias} className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-blue-400"
                                style={{
                                    borderColor: selectedOrg === org.alias ? "#3b82f6" : "#e5e7eb",
                                    backgroundColor: selectedOrg === org.alias ? "#eff6ff" : "transparent"
                                }}
                            >
                                <Radio
                                    checked={selectedOrg === org.alias}
                                    onChange={() => setSelectedOrg(org.alias)}
                                    name="organization"
                                    value={org.alias}
                                    inputProps={{
                                        required: true
                                    }}
                                />
                                <div className="ml-3">
                                    <p className="font-semibold text-gray-900">
                                        {org.name || org.alias}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {org.alias}
                                    </p>
                                </div>
                            </label>
                        ))
                    ) : (
                        <div className="p-4 text-center border border-gray-200 rounded-lg bg-gray-50">
                            <p className="text-gray-600 text-sm">No organizations available</p>
                        </div>
                    )}
                </div>

                {/* Hidden input for form submission */}
                {selectedOrg && (
                    <input type="hidden" name="organization" value={selectedOrg} />
                )}

                {/* Submit Button */}
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    className="bg-linear-to-r from-primary to-primary-dark hover:shadow-xl transform hover:-translate-y-0.5 transition-all normal-case font-semibold py-3"
                    disabled={!selectedOrg || isSubmitting}
                    sx={{ textTransform: "none", py: 1.5 }}
                >
                    {isSubmitting ? "Continuing..." : "Continue"}
                </Button>
            </form>
        </Template>
    );
}
