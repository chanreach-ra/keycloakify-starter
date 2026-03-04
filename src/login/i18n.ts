/* eslint-disable @typescript-eslint/no-unused-vars */
import { i18nBuilder } from "keycloakify/login";
import type { ThemeName } from "../kc.gen";

/** @see: https://docs.keycloakify.dev/features/i18n */
const { useI18n, ofTypeI18n } = i18nBuilder
    .withThemeName<ThemeName>()
    .withExtraLanguages({
        km: {
            label: "ភាសាខ្មែរ", // Khmer
            getMessages: async () => ({
                default: {
                    // Login page
                    "loginAccountTitle": "ចូលគណនី",
                    "doLogIn": "ចូល",
                    "username": "ឈ្មោះអ្នកប្រើ",
                    "usernameOrEmail": "ឈ្មោះអ្នកប្រើឬអ៊ីមែល",
                    "email": "អ៊ីមែល",
                    "password": "ពាក្យសម្ងាត់",
                    "rememberMe": "ចងចាំខ្ញុំ",
                    "doForgotPassword": "ភ្លេចពាក្យសម្ងាត់?",
                    "noAccount": "មិនទាន់មានគណនី?",
                    
                    // Register page
                    "doRegister": "ចុះឈ្មោះ",
                    "registerTitle": "ចុះឈ្មោះ",
                    "firstName": "នាមត្រកូល",
                    "lastName": "នាមខ្លួន",
                    "passwordConfirm": "បញ្ជាក់ពាក្យសម្ងាត់",
                    "backToLogin": "ត្រឡប់ទៅការចូល",
                    
                    // Forgot password
                    "emailForgotTitle": "ភ្លេចពាក្យសម្ងាត់?",
                    "emailInstruction": "បញ្ចូលឈ្មោះអ្នកប្រើរបស់អ្នក ហើយយើងនឹងផ្ញើអ៊ីមែលមួយដើម្បីកំណត់ពាក្យសម្ងាត់ឡើងវិញ។",
                    
                    // Update password
                    "updatePasswordTitle": "ធ្វើបច្ចុប្បន្នភាពពាក្យសម្ងាត់",
                    "passwordNew": "ពាក្យសម្ងាត់ថ្មី",
                    
                    // OTP
                    "loginOtpOneTime": "លេខកូដសុវត្ថិភាព",
                    
                    // Email verification
                    "emailVerifyTitle": "ផ្ទៀងផ្ទាត់អ៊ីមែល",
                    "emailVerifyInstruction1": "អ៊ីមែលមួយបានផ្ញើទៅ {0}",
                    "emailVerifyInstruction2": "សូមពិនិត្យអ៊ីមែលរបស់អ្នកដើម្បីបញ្ជាក់គណនីរបស់អ្នក។",
                    "emailVerifyInstruction3": "ដើម្បីផ្ញើអ៊ីមែលឡើងវិញ",
                    
                    // Info & Error pages
                    "actionSuccessful": "ជោគជ័យ",
                    "errorTitle": "កំហុស",
                    "backToApplication": "ត្រឡប់ទៅកម្មវិធី",
                    "proceedWithAction": "បន្ត",
                    "requiredAction": "សកម្មភាពទាមទារ",
                    
                    // Terms
                    "termsTitle": "លក្ខខណ្ឌ និង គោលការណ៍",
                    "termsText": "សូមអាន និងយល់ព្រមតាមលក្ខខណ្ឌ និងគោលការណ៍របស់យើង។",
                    "doAccept": "យល់ព្រម",
                    "doDecline": "មិនយល់ព្រម",
                    
                    // Update profile
                    "loginProfileTitle": "ធ្វើបច្ចុប្បន្នភាពព័ត៌មាន",
                    
                    // Page expired
                    "pageExpiredTitle": "ផុតកំណត់",
                    "pageExpiredMsg1": "សម័យចូលរបស់អ្នកបានផុតកំណត់។",
                    "pageExpiredMsg2": "សូមចាប់ផ្តើមដំណើរការចូលឡើងវិញ។",
                    "restartLoginTooltip": "ចាប់ផ្តើមឡើងវិញ",
                    
                    // IDP Link Confirm
                    "confirmLinkIdpTitle": "គណនីមានរួចហើយ",
                    "confirmLinkIdpReviewProfile": "អ្នកប្រើប្រាស់ដែលមានអ៊ីមែល {0} មានរួចហើយ។ តើអ្នកចង់បន្តដោយរបៀបណា?",
                    
                    // Common actions
                    "doSubmit": "ដាក់ស្នើ",
                    "doCancel": "បោះបង់",
                    "doContinue": "បន្ត",
                    "doClickHere": "ចុចទីនេះ",
                    "identity-provider-login-label": "ចូលដោយប្រើ"
                } as never
            })
        }
    })
    .build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };
