import {  EmailTemplateContextType } from '@/types/types';
import { createContext } from "react";





export const EmailTemplateContext = createContext<EmailTemplateContextType>({
    emailTemplate : [],
    setEmailTemplate : () => {}
});