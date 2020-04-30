import { mergeTranslations } from 'react-admin';
import raMessages from 'ra-language-french';
const apiHubMessages = {
    ra: Object.assign(Object.assign({}, raMessages), { page: {
            dashboard: 'Accueil',
        }, actions: Object.assign(Object.assign({}, raMessages.actions), { open_sidebar: 'Ouvrir le menu', close_sidebar: 'Fermer le menu' }), navigation: Object.assign(Object.assign({}, raMessages.navigation), { page_rows_per_page: 'Eléments par page :' }) }),
    apihub: {
        login: {
            title: 'Se connecter à API Hub',
            fields: {
                username: "Nom d'utilisateur",
                password: 'Mot de passe',
            },
            actions: {
                sign_in: 'Connexion',
                sign_up_title: "Nouvel utilisateur d'API Hub ?",
                sign_up: 'Créer un compte API Hub',
                forgot_password: 'Mot de passe oublié ?',
            },
            notifications: {
                invalid_credentials: "Informations d'identification non valides",
            },
        },
        account_setup: {
            title: 'Terminer et activer votre compte',
            fields: {
                firstname: 'Prénom',
                lastname: 'Nom',
                email: 'Courriel',
                username: "Nom d'utilisateur",
                password: 'Mot de passe',
                confirm_password: 'Confirmer le mot de passe',
            },
            actions: {
                submit: 'Activer votre compte',
                open_login_page: 'Accéder à la page de connexion',
            },
            validation: {
                error_password_match: 'Les deux mots de passes ne sont pas identiques',
                error_username_not_unique: "Ce nom d'utilisateur n'est pas unique.",
                tooltip_username: '6 caractères minimum\n60 caractères maximum',
                tooltip_password: 'Exigences relatives au mot de passe : \n- 8 caractères minimum\n- 60 caractères maximum\n- Au moins une minuscule\n- Au moins une majuscule\n- Au moins un chiffre\n- Au moins un caractère spécial parmi ceux ci-après : !@#$%^&*',
                tooltip_password_confirm: 'Resaisissez votre mot de passe',
            },
            notifications: {
                prepare: 'Préparation du formulaire..',
                invalid_request: 'Impossible de configurer votre compte',
                success: 'Votre compte a été configuré.',
            },
            terms_of_use: {
                terms_of_use_acknowledgement: "J’ai lu et j'accepte les ",
                terms_of_use: "Conditions d'utilisation",
                terms_of_use_validation: 'Veuillez accepter nos termes et conditions',
                terms_of_use_dialog: {
                    title: "Conditions d'utilisation",
                    close: 'Fermer',
                },
            },
        },
        reset_password: {
            title: 'Réinitialiser le mot de passe',
            fields: {
                username: "Nom d'utilisateur",
            },
            actions: {
                submit: 'Soumettre',
            },
            form_details: {
                instructions: "Entrez votre nom d'utilisateur.",
                description: 'Un lien de réinitialisation de votre mot de passe vous sera envoyé par courriel.',
            },
        },
        reset_password_confirm: {
            title: 'Demande de réinitialisation du mot de passe envoyée',
            actions: {
                open_login_page: 'Accéder à la page de connexion',
            },
            form_details: {
                instructions: 'Consultez votre boîte de réception.',
                description: 'Pour réinitialiser votre mot de passe, cliquez sur le lien inclus dans votre courriel.',
            },
        },
        new_password: {
            title: 'Créer un mot de passe',
            fields: {
                current_password: 'Mot de passe actuel',
                password: 'Mot de passe',
                confirm_password: 'Confirmer le mot de passe',
            },
            actions: {
                change_password: 'Changer le mot de passe',
                open_login_page: 'Accéder à la page de connexion',
            },
            validation: {
                error_password_match: 'Les deux mots de passes ne sont pas identiques',
                tooltip_password: 'Exigences relatives au mot de passe : \n- 8 caractères minimum\n- 60 caractères maximum\n- Au moins une minuscule\n- Au moins une majuscule\n- Au moins un chiffre\n- Au moins un caractère spécial parmi ceux ci-après : !@#$%^&*',
                tooltip_password_confirm: 'Resaisissez votre mot de passe',
            },
            notifications: {
                confirmation: 'Votre mot de passe a été réinitialisé. Utilisez votre nouveau mot de passe pour vous connecter.',
                verifying_token: 'Vérification de votre demande de réinitialisation du mot de passe...',
                invalid_token: "Impossible de créer un mot de passe : votre jeton n'est pas valide.",
            },
        },
        menu: {
            user_details: {
                full_name: '%{last_name} %{first_name}',
            },
        },
        homepage: {
            placeholder_empty_content: "Le contenu de la page d'accueil n'a pas encore été défini. Merci d'utiliser le bouton d'édition pour en créer un si vous êtes un administrateur du portail.",
        },
        actions: {
            view_as_cards: 'Afficher sous forme de cartes',
            view_as_list: 'Afficher sous forme de liste',
        },
        validation: {
            password: {
                at_least_one_lowercase_character: 'Au moins une minuscule',
                at_least_one_uppercase_character: 'Au moins une majuscule',
                at_least_one_number: 'Au moins un chiffre',
                at_least_one_special_character: 'Au moins un caractère spécial parmi ceux ci-après : !@#$%^&*',
            },
        },
    },
    resources: {
        apis: {
            name: 'API |||| API',
            fields: {
                name: 'Nom ',
                portalStatus: 'État',
                accessStatus: 'Visibilité',
                apiServiceType: 'Type',
                ssgServiceType: 'Type',
                createTs: 'Créé',
                modifyTs: 'Modifié',
                version: 'Version',
                versionShort: 'VS.',
                description: 'Description',
                privateDescription: 'Description privée',
                tags: 'Balises',
                applicationUsage: 'Applications',
                assets: 'Actifs',
                apiLocation: "Emplacement de l'API",
            },
            portalStatus: {
                enabled: 'Activé',
                disabled: 'Désactivé',
                deprecated: 'Désapprouvé',
                unpublished: 'Non publié',
            },
            accessStatus: {
                public: 'Public',
                private: 'Privée',
            },
            last_update: {
                fields: {
                    updated: 'Modification %{date}',
                },
            },
            list: {
                cards: {
                    fields: {
                        updated: 'Modification %{date}',
                        version: 'v%{version}',
                        applications: '%{smart_count} app(s)',
                        applications_long: '1 application utilisant cette API |||| %{smart_count} applications utilisant cette API',
                        averageLatency: '%{ms} ms',
                        averageLatency_long: 'Latence moyenne au cours des 7 derniers jours',
                    },
                },
                sort: {
                    name: {
                        asc: "Nom de l'API : A-Z",
                        desc: "Nom de l'API : Z-A",
                    },
                    createTs: {
                        asc: 'Date de création : du plus ancien au plus ancien récent',
                        desc: 'Date de création : du plus récent au plus ancien',
                    },
                    modifyTs: {
                        asc: 'Date de modification : du plus ancien au plus ancien récent',
                        desc: 'Date de modification : du plus récent au plus ancien',
                    },
                },
                filters: {
                    search: 'Rechercher par nom ou par description',
                },
            },
            overview: {
                title: 'Présentation',
                fields: {
                    version: 'v%{version}',
                },
                actions: {
                    download_assets: 'Télécharger les actifs',
                },
                notifications: {
                    no_assets: "Aucun actif n'est associé à l'API",
                },
            },
            specification: {
                title: 'Spécifications',
                fields: {
                    select_application_label: 'Applications utilisées',
                },
                actions: {
                    select_application: 'Sélectionnez une application pour obtenir la clé',
                },
            },
            documentation: {
                title: 'Documentation',
                fields: {
                    new_document: 'Nouveau document',
                    select_documentation_locale: 'Langue sélectionnée',
                },
                actions: {
                    new_document_button: 'Nouveau',
                    new_child_document_button: 'Nouveau sous-document',
                    edit_document_button: 'Modifier',
                    delete_document_button: 'Supprimer',
                },
                validation: {
                    error_no_special_characters: "L'URI doit contenir uniquement des caractères non codés, supporte les lettres de a à z, et les séparateurs - et _",
                    error_navtitle_not_unique: 'Cette URI existe déjà',
                },
                confirm_delete_document_without_children: 'Vous êtes sur le point de supprimer ce document. Êtes-vous sûr ?',
                confirm_delete_document_with_children: 'Vous êtes sur le point de supprimer ce document et tous ses documents enfants. Êtes-vous sûr ?',
            },
        },
        applications: {
            name: 'Application |||| Applications',
            fields: {
                apiKey: "Clé d'API :",
                keySecret: 'Secret partagé :',
                apiKeyClientID: 'API Key / Client ID',
                apisIncluded: 'APIs Incluses',
                authentication: 'Authentification',
                description: 'Description',
                encrypted: 'Chiffré',
                SharedSecretClientSecret: 'Secret partagé / Secret du client',
                oauthType: "Type d'OAuth",
                oauthCallbackURL: 'URL de rappel OAuth',
                oauthScope: 'Portée OAuth',
                overview: "Vue d'ensemble",
                status: 'État',
            },
            actions: {
                generateSecret: 'Generate New Secret',
            },
            status: {
                enabled: 'Activé',
                disabled: 'Désactivé',
                deprecated: 'Désapprouvé',
                application_pending_approval: "En attente d'approbation",
            },
            list: {
                sort: {
                    name: {
                        asc: "Nom de l'Application : A-Z",
                        desc: "Nom de l'Application : Z-A",
                    },
                },
            },
            notifications: {
                configuration: 'Configuration',
                copy_success: 'Copied to Clipboard successfully',
                copy_error: 'Copy to Clipboard failed',
            },
        },
        documents: {
            name: 'Document |||| Documents',
            fields: {
                title: 'Titre',
                navtitle: 'URI',
                markdown: 'Contenu',
                modifyTs: 'Dernière modification',
                ordinal: 'Position',
            },
            actions: {
                change_document_parent_button: 'Changer le parent',
                move_as_first_child: 'Premier document',
                move_after_document: 'Après %{title}',
                move_as_root_item: 'Sélectionner pour transformer en document racine',
                save: 'Publier',
                cancel: 'Annuler',
            },
            notifications: {
                tree_updated_success: 'La hierarchie de la documentation a été mise à jour',
                tree_updated_error: 'La mise à jour de la hierarchie de la documentation a échoué',
                create_success: 'Le document a été créé.',
                create_error: "Une erreur s'est produite lors de la création du document.",
                edit_success: 'Le document a été mis à jour.',
                edit_error: "Une erreur s'est produite lors de la mise à jour du document.",
                delete_success: 'Le document a été supprimé.',
                delete_error: "Une erreur s'est produite lors de la suppression du document.",
                unsaved_changes: "Vos changements seront perdus si vous quittez cette page. Voulez-vous arrêter d'éditer ce document ?",
            },
        },
        userContexts: {
            title: 'Mon Profil',
            fields: {
                userDetails: {
                    username: "Nom d'utilisateur",
                    lastName: 'Nom',
                    firstName: 'Prénom',
                    email: 'Courriel',
                    current_password: 'Mot de passe actuel',
                    password: 'Mot de passe',
                    confirm_password: 'Confirmer le mot de passe',
                },
            },
            actions: {
                edit_profile: 'Mon Profil',
                change_password: 'Changer le mot de passe',
            },
            notifications: {
                update_success: 'Profil mis à jour',
                update_error: 'La mise à jour de votre profil a échoué',
                invalid_password: 'Le mot de passe actuel est incorrect',
                confirm_password_change: 'Votre mot de passe a été réinitialisé. Utilisez votre nouveau mot de passe pour vous connecter.',
            },
            validation: {
                error_password_match: 'Les deux mots de passes ne sont pas identiques',
                tooltip_password: 'Exigences relatives au mot de passe : \n- 8 caractères minimum\n- 60 caractères maximum\n- Au moins une minuscule\n- Au moins une majuscule\n- Au moins un chiffre\n- Au moins un caractère spécial parmi ceux ci-après : !@#$%^&*',
                tooltip_password_confirm: 'Resaisissez votre mot de passe',
            },
            accessibleOrgs: {
                title: 'Mon Organisation |||| Mes Organisations',
            },
            activeOrgUuid: {
                status: {
                    active: 'Organisation sélectionnée',
                    not_active: 'Organisation non sélectionnée',
                },
                notifications: {
                    update_success: 'Votre organisation a été mise à jour',
                    update_error: 'La mise à jour de votre organisation a échoué',
                },
            },
        },
    },
};
export default mergeTranslations(raMessages, apiHubMessages);
//# sourceMappingURL=fr.js.map