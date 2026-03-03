import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button, Typography, Card, CardContent } from "@mui/material";
import { CheckCircle, Block } from "@mui/icons-material";

export default function HybridLoginOauthGrant(props: PageProps<Extract<KcContext, { pageId: "login-oauth-grant.ftl" }>, I18n>) {
    const { kcContext, i18n, Template } = props;
    const { oauth, url } = kcContext;
    const { msg } = i18n;

    return (
        <Template {...props} headerNode="Grant Access" socialProvidersNode={undefined}>
            <form action={url.oauthAction} method="post" className="space-y-6">
                {/* Intro */}
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                    <p className="text-sm text-blue-800">
                        This application is requesting access to your account. Review the permissions below before granting access.
                    </p>
                </div>

                {/* Application Info */}
                <Card className="border border-gray-200">
                    <CardContent className="space-y-3">
                        <Typography variant="subtitle1" className="font-semibold">
                            Application Requesting Access
                        </Typography>
                        <Typography variant="body2" className="text-gray-700">
                            <strong>{oauth.client}</strong>
                        </Typography>
                    </CardContent>
                </Card>

                {/* Scopes Section */}
                <div className="space-y-3">
                    <Typography variant="subtitle2" className="font-semibold">
                        Will Have Access To
                    </Typography>
                    <div className="space-y-2">
                        {oauth.clientScopesRequested.map((scope, index) => (
                            <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200">
                                <CheckCircle className="text-green-600 mt-0.5" sx={{ fontSize: 20 }} />
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">
                                        {scope.consentScreenText}
                                    </p>
                                    {scope.dynamicScopeParameter && (
                                        <p className="text-xs text-gray-500 mt-1">
                                            {scope.dynamicScopeParameter}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-6 border-t border-gray-200">
                    <Button
                        type="submit"
                        name="accept"
                        value="true"
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        className="bg-linear-to-r from-primary to-primary-dark hover:shadow-xl transform hover:-translate-y-0.5 transition-all normal-case font-semibold py-3"
                        startIcon={<CheckCircle />}
                        sx={{ textTransform: "none", py: 1.5 }}
                    >
                        {msg("doYes")}
                    </Button>
                    <Button
                        type="submit"
                        name="accept"
                        value="false"
                        variant="outlined"
                        color="error"
                        fullWidth
                        size="large"
                        startIcon={<Block />}
                        sx={{ textTransform: "none", py: 1.5 }}
                    >
                        {msg("doNo")}
                    </Button>
                </div>
            </form>
        </Template>
    );
}
