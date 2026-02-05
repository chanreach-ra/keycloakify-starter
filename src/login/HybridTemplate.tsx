import { useEffect } from "react";
import { ThemeProvider, createTheme, Select, MenuItem, FormControl } from "@mui/material";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import type { KcContext } from "./KcContext";
import type { I18n } from "./i18n";

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#667eea',
            dark: '#764ba2',
        },
    },
    typography: {
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    shape: {
        borderRadius: 12,
    },
});

export default function HybridTemplate(props: TemplateProps<KcContext, I18n>) {
    const {
        displayInfo = false,
        displayMessage = true,
        headerNode,
        socialProvidersNode = null,
        infoNode = null,
        documentTitle,
        kcContext,
        i18n,
        children
    } = props;

    useEffect(() => {
        document.title = documentTitle ?? "";
    }, [documentTitle]);

    return (
        <ThemeProvider theme={theme}>
            <div className="min-h-screen bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center p-4 relative overflow-hidden">
                {/* Animated background dots */}
                <div 
                    className="fixed inset-0 w-[200%] h-[200%] pointer-events-none animate-background"
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
                        backgroundSize: '50px 50px'
                    }}
                />

                {/* Language Selector */}
                <div className="absolute top-4 right-4 z-20">
                    <FormControl size="small">
                        <Select
                            value={kcContext.locale?.currentLanguageTag ?? "en"}
                            onChange={(e) => {
                                const newLocale = e.target.value;
                                window.location.href = `${window.location.pathname}${window.location.search ? window.location.search + '&' : '?'}kc_locale=${newLocale}`;
                            }}
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                borderRadius: '8px',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgba(255, 255, 255, 0.5)',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'white',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'white',
                                }
                            }}
                        >
                            {i18n.enabledLanguages.map(({ languageTag, label }) => (
                                <MenuItem key={languageTag} value={languageTag}>
                                    {label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                {/* Content */}
                <div className="w-full max-w-md relative z-10">
                    {/* Header */}
                    {headerNode && (
                        <div className="text-center mb-8 text-white">
                            <div className="text-4xl font-bold drop-shadow-lg">
                                {headerNode}
                            </div>
                        </div>
                    )}

                    {/* Main Card */}
                    <div className="bg-white rounded-2xl shadow-2xl p-8">
                        {/* Messages */}
                        {displayMessage && kcContext.message !== undefined && (
                            <div
                                className={`mb-6 p-4 rounded-lg border-l-4 ${
                                    kcContext.message.type === 'success'
                                        ? 'bg-green-50 text-green-800 border-green-500'
                                        : kcContext.message.type === 'warning'
                                        ? 'bg-yellow-50 text-yellow-800 border-yellow-500'
                                        : kcContext.message.type === 'error'
                                        ? 'bg-red-50 text-red-800 border-red-500'
                                        : 'bg-blue-50 text-blue-800 border-blue-500'
                                }`}
                                dangerouslySetInnerHTML={{
                                    __html: kcContext.message.summary
                                }}
                            />
                        )}

                        {/* Form Content */}
                        {children}

                        {/* Social Providers */}
                        {socialProvidersNode}

                        {/* Info */}
                        {displayInfo && infoNode && (
                            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                                {infoNode}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
}
