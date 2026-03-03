import { Suspense, lazy } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import HybridTemplate from "./HybridTemplate";
import HybridLogin from "./pages/HybridLogin";
import HybridRegister from "./pages/HybridRegister";
import HybridForgotPassword from "./pages/HybridForgotPassword";
import HybridUpdatePassword from "./pages/HybridUpdatePassword";
import HybridLoginOtp from "./pages/HybridLoginOtp";
import HybridVerifyEmail from "./pages/HybridVerifyEmail";
import HybridInfo from "./pages/HybridInfo";
import HybridError from "./pages/HybridError";
import HybridTerms from "./pages/HybridTerms";
import HybridUpdateProfile from "./pages/HybridUpdateProfile";
import HybridPageExpired from "./pages/HybridPageExpired";
import HybridLoginTwoFactor from "./pages/HybridLoginTwoFactor";
import HybridSelectOrganization from "./pages/HybridSelectOrganization";
import HybridLoginUsername from "./pages/HybridLoginUsername";
import HybridLoginPassword from "./pages/HybridLoginPassword";
import HybridLoginOauthGrant from "./pages/HybridLoginOauthGrant";
import HybridSelectAuthenticator from "./pages/HybridSelectAuthenticator";

const UserProfileFormFields = lazy(
    () => import("keycloakify/login/UserProfileFormFields")
);

const doMakeUserConfirmPassword = true;

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { i18n } = useI18n({ kcContext });

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    case "login.ftl":
                        return (
                            <HybridLogin
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={HybridTemplate}
                                doUseDefaultCss={false}
                            />
                        );
                    case "login-username.ftl":
                        return (
                            <HybridLoginUsername
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={HybridTemplate}
                                doUseDefaultCss={false}
                            />
                        );
                    case "register.ftl":
                        return (
                            <HybridRegister
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={HybridTemplate}
                                doUseDefaultCss={false}
                            />
                        );
                    case "login-reset-password.ftl":
                        return (
                            <HybridForgotPassword
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={HybridTemplate}
                                doUseDefaultCss={false}
                            />
                        );
                    case "login-password.ftl":
                        return (
                            <HybridLoginPassword
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={HybridTemplate}
                                doUseDefaultCss={false}
                            />
                        );
                    case "login-update-password.ftl":
                        return (
                            <HybridUpdatePassword
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={HybridTemplate}
                                doUseDefaultCss={false}
                            />
                        );
                    case "login-otp.ftl":
                        return (
                            <HybridLoginOtp
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={HybridTemplate}
                                doUseDefaultCss={false}
                            />
                        );
                    case "login-config-totp.ftl":
                        return (
                            <HybridLoginTwoFactor
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={HybridTemplate}
                                doUseDefaultCss={false}
                            />
                        );
                    case "login-verify-email.ftl":
                        return (
                            <HybridVerifyEmail
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={HybridTemplate}
                                doUseDefaultCss={false}
                            />
                        );
                    case "info.ftl":
                        return (
                            <HybridInfo
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={HybridTemplate}
                                doUseDefaultCss={false}
                            />
                        );
                    case "error.ftl":
                        return (
                            <HybridError
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={HybridTemplate}
                                doUseDefaultCss={false}
                            />
                        );
                    case "terms.ftl":
                        return (
                            <HybridTerms
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={HybridTemplate}
                                doUseDefaultCss={false}
                            />
                        );
                    case "login-update-profile.ftl":
                        return (
                            <HybridUpdateProfile
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={HybridTemplate}
                                doUseDefaultCss={false}
                            />
                        );
                    case "login-page-expired.ftl":
                        return (
                            <HybridPageExpired
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={HybridTemplate}
                                doUseDefaultCss={false}
                            />
                        );
                    case "select-organization.ftl":
                        return (
                            <HybridSelectOrganization
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={HybridTemplate}
                                doUseDefaultCss={false}
                            />
                        );
                    case "login-oauth-grant.ftl":
                        return (
                            <HybridLoginOauthGrant
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={HybridTemplate}
                                doUseDefaultCss={false}
                            />
                        );
                    case "select-authenticator.ftl":
                        return (
                            <HybridSelectAuthenticator
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={HybridTemplate}
                                doUseDefaultCss={false}
                            />
                        );
                    default:
                        return (
                            <DefaultPage
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={HybridTemplate}
                                doUseDefaultCss={false}
                                UserProfileFormFields={UserProfileFormFields}
                                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                            />
                        );
                }
            })()}
        </Suspense>
    );
}

const classes = {} satisfies { [key in ClassKey]?: string };
