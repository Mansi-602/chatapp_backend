const SibApiV3Sdk = require('@sendinblue/client');
const dotenv = require('dotenv');
dotenv.config({ path: '../config.env' });

const brevoClient = new SibApiV3Sdk.TransactionalEmailsApi();
brevoClient.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

const sendBrevoMail = async ({
    recipient,
    sender,
    subject,
    html,
    text,
    attachment,
}) => {
    try {
        const from = sender || '30358csdsa@gmail.com';
        
        const msg = {
            to: [{ email: recipient }],
            sender: { email: from },
            subject: subject,
            htmlContent: html || text,
        };

        // Add attachments if provided
        if (attachment) {
            msg.attachment = [
                {
                    content: attachment.content, // Base64 encoded content
                    name: attachment.name, // Name of the attachment file
                },
            ];
        }

        return brevoClient.sendTransacEmail(msg);
    } catch (error) {
        console.error(error);
    }
};

exports.sendEmail = async (args) => {
    if (process.env.NODE_ENV === 'development') {
        return Promise.resolve();
    } else {
        return sendBrevoMail(args);
    }
};
