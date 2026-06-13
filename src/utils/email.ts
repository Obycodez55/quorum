import ejs from 'ejs';
import path from 'path';
import { InternalServerException } from './exceptions';
import { BrevoClient } from '@getbrevo/brevo';
import config from '../config/config';


interface SendEmailOptions {
    to: string;
    subject: string;
    template: string;
    data: any;
}


const brevo = new BrevoClient({
    apiKey: config.brevoApiKey
})


export class EmailService {


    private renderTemplate(template: string, data: any): string {
        try {
            const templatePath = path.join(__dirname, 'templates', template);
            return ejs.renderFile(templatePath, data);
        } catch (error) {
            throw new InternalServerException('Failed to render template');
        }
    }


    async sendEmail(options: SendEmailOptions) {
        try {
            const { to, subject, template, data } = options;
            const html = this.renderTemplate(template, data);
            const response = await brevo.transactionalEmails.sendTransacEmail({
                to: [{ email: to }],
                subject: subject,
                sender: {
                    name: 'Quorum',
                    email: config.brevoSenderEmail,
                },
                htmlContent: html,
            });
            return response;
        } catch (error) {
            throw new InternalServerException('Failed to send email');
        }
    }

    async sendMany(options: SendEmailOptions[]): Promise<any[]> {
        try {
            const responses = await Promise.all(options.map(option => this.sendEmail(option)));
            return responses;
        } catch (error) {
            throw new InternalServerException('Failed to send emails');
        }
    }
}