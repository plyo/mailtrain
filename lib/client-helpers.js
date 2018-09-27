'use strict';

const passport = require('./passport');
const config = require('config');
const forms = require('../models/forms');
const shares = require('../models/shares');
const urls = require('./urls');
const { AppType } = require('../shared/app');


async function getAnonymousConfig(context, appType) {
    return {
        authMethod: passport.authMethod,
        isAuthMethodLocal: passport.isAuthMethodLocal,
        externalPasswordResetLink: config.ldap.passwordresetlink,
        language: config.language || 'en',
        isAuthenticated: !!context.user,
        trustedUrlBase: urls.getTrustedUrlBase(),
        trustedUrlBaseDir: urls.getTrustedUrlBaseDir(),
        sandboxUrlBase: urls.getSandboxUrlBase(),
        sandboxUrlBaseDir: urls.getSandboxUrlBaseDir(),
        publicUrlBase: urls.getPublicUrlBase(),
        publicUrlBaseDir: urls.getPublicUrlBaseDir(),
        appType
    }
}

async function getAuthenticatedConfig(context) {
    return {
        defaultCustomFormValues: await forms.getDefaultCustomFormValues(),
        user: {
            id: context.user.id,
            username: context.user.username,
            namespace: context.user.namespace
        },
        globalPermissions: shares.getGlobalPermissions(context),
        editors: config.editors,
        mosaico: config.mosaico,
        verpEnabled: config.verp.enabled
    }
}


module.exports.getAuthenticatedConfig = getAuthenticatedConfig;
module.exports.getAnonymousConfig = getAnonymousConfig;
