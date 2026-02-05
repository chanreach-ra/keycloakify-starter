import { TextField, Button, Typography, Link } from "@mui/material";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function HybridRegister(props: PageProps<Extract<KcContext, { pageId: "register.ftl" }>, I18n>) {
    const { kcContext, i18n, Template } = props;
    const { url, profile, realm, passwordRequired, recaptchaRequired, recaptchaSiteKey } = kcContext;
    const { msg } = i18n;

    return (
        <Template {...props} headerNode={undefined}>
            <form action={url.registrationAction} method="post" className="space-y-5">
                <Typography variant="h5" component="h2" className="font-semibold mb-6">
                    {msg("registerTitle")}
                </Typography>

                <div className="flex flex-row gap-2 pt-4">
                    {/* First Name */}
                    <TextField
                        name="firstName"
                        label={msg("firstName")}
                        autoComplete="given-name"
                        defaultValue={profile.attributesByName.firstName?.value ?? ""}
                        fullWidth
                        variant="outlined"
                    />

                    {/* Last Name */}
                    <TextField
                        name="lastName"
                        label={msg("lastName")}
                        autoComplete="family-name"
                        defaultValue={profile.attributesByName.lastName?.value ?? ""}
                        fullWidth
                        variant="outlined"
                    />
                </div>

                <div className="flex flex-col gap-4">
                    {/* Email */}
                    <TextField
                        name="email"
                        label={msg("email")}
                        type="email"
                        autoComplete="email"
                        defaultValue={profile.attributesByName.email?.value ?? ""}
                        fullWidth
                        variant="outlined"
                    />

                    {/* Username */}
                    {!realm.registrationEmailAsUsername && (
                        <TextField
                            name="username"
                            label={msg("username")}
                            autoComplete="username"
                            defaultValue={profile.attributesByName.username?.value ?? ""}
                            fullWidth
                            variant="outlined"
                        />
                    )}

                    {/* Password */}
                    {passwordRequired && (
                        <>
                            <TextField
                                name="password"
                                label={msg("password")}
                                type="password"
                                autoComplete="new-password"
                                fullWidth
                                variant="outlined"
                            />

                            <TextField
                                name="password-confirm"
                                label={msg("passwordConfirm")}
                                type="password"
                                autoComplete="new-password"
                                fullWidth
                                variant="outlined"
                            />
                        </>
                    )}
                </div>

                {/* Recaptcha */}
                {recaptchaRequired && (
                    <div className="flex justify-center pt-4">
                        <div className="g-recaptcha" data-size="compact" data-sitekey={recaptchaSiteKey} />
                    </div>
                )}

                {/* Register Button */}
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    className="bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:shadow-xl transform hover:-translate-y-0.5 transition-all normal-case font-semibold py-3"
                >
                    {msg("doRegister")}
                </Button>

                {/* Back to Login */}
                <div className="text-center pt-4">
                    <Link href={url.loginUrl} underline="hover">
                        {msg("backToLogin")}
                    </Link>
                </div>
            </form>
        </Template>
    );
}
