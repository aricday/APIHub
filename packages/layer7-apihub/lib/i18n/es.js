"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_admin_1 = require("react-admin");
const ra_language_spanish_1 = __importDefault(require("@blackbox-vision/ra-language-spanish"));
const apiHubMessages = {
    ra: Object.assign(Object.assign({}, ra_language_spanish_1.default), { page: {
            dashboard: 'Inicio',
        }, actions: Object.assign(Object.assign({}, ra_language_spanish_1.default.actions), { open_sidebar: 'Abrir el menú', close_sidebar: 'Cerrar el menú' }), navigation: Object.assign(Object.assign({}, ra_language_spanish_1.default.navigation), { page_rows_per_page: 'Elementos por página:' }) }),
    apihub: {
        login: {
            title: 'Iniciar Sesión En API Hub',
            fields: {
                username: 'Nombre de usuario',
                password: 'Contraseña',
            },
            actions: {
                sign_in: 'Iniciar sesión',
                sign_up_title: '¿Primera vez en API Hub?',
                sign_up: 'Crear una cuenta de API Hub',
                forgot_password: '¿Has olvidado la contraseña?',
            },
            notifications: {
                invalid_credentials: 'Credenciales no válidas',
            },
        },
        account_setup: {
            title: 'Completar Y Activar La Cuenta',
            fields: {
                firstname: 'Nombre',
                lastname: 'Apellido',
                email: 'Correo electrónico',
                username: 'Nombre de usuario',
                password: 'Contraseña',
                confirm_password: 'Confirmar contraseña',
            },
            actions: {
                submit: 'Activar cuenta',
                open_login_page: 'Vaya a Iniciar sesión',
            },
            validation: {
                error_password_match: 'Las contraseñas no coinciden.',
                error_username_not_unique: 'Este nombre de usuario no es único.',
                tooltip_username: '6 caracteres como mínimo\n60 caracteres como máximo',
                tooltip_password: 'Requisitos de la contraseña:\n- 8 caracteres como mínimo\n- 60 caracteres como máximo\n- Al menos un carácter en minúscula\n- Al menos un carácter en mayúscula\n- Al menos un número\n- Al menos un carácter especial, se admiten los siguientes: !@#$%^&*',
                tooltip_password_confirm: 'Repita la contraseña',
            },
            notifications: {
                prepare: 'Preparando formulario...',
                invalid_request: 'No se puede configurar la cuenta.',
                success: 'La cuenta se ha configurado correctamente.',
            },
            terms_of_use: {
                terms_of_use_acknowledgement: 'He leído y acepto los ',
                terms_of_use: 'Términos de uso',
                terms_of_use_validation: 'Acepto nuestros términos y condiciones',
                terms_of_use_dialog: {
                    title: 'Términos de uso',
                    close: 'Cerrar',
                },
            },
        },
        reset_password: {
            title: 'Restablecer contraseña',
            fields: {
                username: 'Nombre de usuario',
            },
            actions: {
                submit: 'Enviar',
            },
            form_details: {
                instructions: 'Introduzca el nombre de usuario',
                description: 'Le enviaremos un vínculo para restablecer la contraseña.',
            },
        },
        reset_password_confirm: {
            title: 'Solicitud de restablecimiento de la contraseña enviada',
            actions: {
                open_login_page: 'Vaya a Iniciar Sesión',
            },
            form_details: {
                instructions: 'Compruebe el correo electrónico.',
                description: 'Haga clic en el vínculo del correo electrónico para restablecer la contraseña.',
            },
        },
        new_password: {
            title: 'Crear nueva contraseña',
            fields: {
                current_password: 'Contraseña actual',
                password: 'Contraseña',
                confirm_password: 'Confirmar contraseña',
            },
            actions: {
                change_password: 'Cambiar la contraseña',
                open_login_page: 'Vaya a Iniciar sesión',
            },
            validation: {
                error_password_match: 'Las contraseñas no coinciden.',
                tooltip_password: 'Requisitos de la contraseña:\n- 8 caracteres como mínimo\n- 60 caracteres como máximo\n- Al menos un carácter en minúscula\n- Al menos un carácter en mayúscula\n- Al menos un número\n- Al menos un carácter especial, se admiten los siguientes: !@#$%^&*',
                tooltip_password_confirm: 'Repita la contraseña',
            },
            notifications: {
                confirmation: 'Se ha restablecido la contraseña. Utilice la nueva contraseña para iniciar sesión.',
                verifying_token: 'Se está verificando la solicitud de restablecimiento de la contraseña...',
                invalid_token: 'No se puede crear una nueva contraseña: el token no es válido.',
            },
        },
        menu: {
            user_details: {
                full_name: '%{last_name} %{first_name}',
            },
        },
        homepage: {
            placeholder_empty_content: 'El contenido de la página de inicio no se ha proporcionado todavía. Por favor, utilice el botón de edición para crearlo si usted es un administrador del portal.',
        },
        actions: {
            view_as_cards: 'Mostrar como tarjetas',
            view_as_list: 'Mostrar como lista',
        },
        validation: {
            password: {
                at_least_one_lowercase_character: 'Al menos un carácter en minúscula',
                at_least_one_uppercase_character: 'Al menos un carácter en mayúscula',
                at_least_one_number: 'Al menos un número',
                at_least_one_special_character: 'Al menos un carácter especial. Se admiten los siguientes: !@#$%^&*',
            },
        },
    },
    resources: {
        apis: {
            name: 'API |||| Las API',
            fields: {
                name: 'Nombre',
                portalStatus: 'Estado',
                accessStatus: 'Visibilidad',
                apiServiceType: 'Tipo',
                ssgServiceType: 'Tipo',
                createTs: 'Creada',
                modifyTs: 'Modificado',
                version: 'Versión',
                versionShort: 'V',
                description: 'Descripción',
                privateDescription: 'Descripción privada',
                tags: 'Etiquetas',
                applicationUsage: 'Aplicaciones',
                assets: 'Activos',
                apiLocation: 'Ubicación de la API',
            },
            portalStatus: {
                enabled: 'Activado',
                disabled: 'Desactivado',
                deprecated: 'Obsoleto',
                unpublished: 'Sin publicar',
            },
            accessStatus: {
                public: 'Público',
                private: 'Privada',
            },
            last_update: {
                fields: {
                    updated: 'Modificada el %{date}',
                },
            },
            list: {
                cards: {
                    fields: {
                        updated: 'Modificada el %{date}',
                        version: 'v%{version}',
                        applications: '%{smart_count} app(s)',
                        applications_long: '1 aplicación que utiliza esta API |||| %{smart_count} aplicaciones que utilizan esta API',
                        averageLatency: '%{ms} ms',
                        averageLatency_long: 'Latencia media en los últimos 7 días',
                    },
                },
                sort: {
                    name: {
                        asc: 'Nombre de la API: A-Z',
                        desc: 'Nombre de la API: Z-A',
                    },
                    createTs: {
                        asc: 'Fecha de creación: de la más anterior a la más nueva',
                        desc: 'Fecha de creación: de la más nueva a la más anterior',
                    },
                    modifyTs: {
                        asc: 'Fecha de modificación: de la más anterior a la más nueva',
                        desc: 'Fecha de modificación: de la más nueva a la más anterior',
                    },
                },
                filters: {
                    search: 'Buscar por nombre o descripción',
                },
            },
            overview: {
                title: 'Descripción general',
                fields: {
                    version: 'v%{version}',
                },
                actions: {
                    download_assets: 'Descargar Activos',
                },
                notifications: {
                    no_assets: 'No hay ningún activo asociado a la API.',
                },
            },
            specification: {
                title: 'Especificaciones',
                fields: {
                    select_application_label: 'Aplicaciones en uso',
                },
                actions: {
                    select_application: 'Seleccione una aplicación para obtener la clave',
                },
            },
            documentation: {
                title: 'Documentación',
                fields: {
                    new_document: 'Nuevo documento',
                    select_documentation_locale: 'Idioma seleccionado',
                },
                actions: {
                    new_document_button: 'Nuevo',
                    new_child_document_button: 'Nuevo niño',
                    edit_document_button: 'Editar',
                    delete_document_button: 'Suprimir',
                },
                validation: {
                    error_no_special_characters: 'La URI debe contener sólo caracteres no codificados. Letras de apoyo de la a a la z, y los separadores - y _.',
                    error_navtitle_not_unique: 'Esta URI ya existe.',
                },
                confirm_delete_document_without_children: 'Está a punto de borrar este documento. ¿Está seguro?',
                confirm_delete_document_with_children: 'Está a punto de borrar este documento y sus documentos infantiles. ¿Está seguro?',
            },
        },
        applications: {
            name: 'Aplicación |||| Aplicaciones',
            fields: {
                apiKey: 'Clave de la API:',
                keySecret: 'Secreto compartido:',
                apiKeyClientID: 'API Key / Client ID',
                apisIncluded: 'APIs Included',
                authentication: 'Authentication',
                description: 'Description',
                encrypted: 'Encrypted',
                SharedSecretClientSecret: 'Shared Secret / Client Secret',
                oauthType: 'OAuth Type',
                oauthCallbackURL: 'OAuth Callback URL',
                oauthScope: 'OAuth Scope',
                overview: 'Overview',
                status: 'State',
            },
            actions: {
                generateSecret: 'Generate New Secret',
            },
            status: {
                enabled: 'Activado',
                disabled: 'Desactivado',
                deprecated: 'Obsoleto',
                application_pending_approval: 'Pendiente de Aprobación',
            },
            list: {
                sort: {
                    name: {
                        asc: 'Nombre de la Aplicación: A-Z',
                        desc: 'Nombre de la Aplicación: Z-A',
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
            name: 'Documento |||| Documentos',
            fields: {
                title: 'Título',
                navtitle: 'URI',
                markdown: 'Contenido',
                modifyTs: 'Última modificación',
                ordinal: 'Posición',
            },
            actions: {
                change_document_parent_button: 'Cambiar padre',
                move_as_first_child: 'Primer documento',
                move_after_document: 'Después de %{title}',
                move_as_root_item: 'Selecciona para moverte a la raíz',
                save: 'Publicar',
                cancel: 'Cancelar',
            },
            notifications: {
                tree_updated_success: 'Árbol de documentación actualizado con éxito',
                tree_updated_error: 'La actualización del árbol de documentación ha fallado',
                create_success: 'El documento se ha creado correctamente.',
                create_error: 'Se ha producido un error al crear el documento.',
                edit_success: 'Documento actualizado con éxito.',
                edit_error: 'Se produjo un error al actualizar el documento.',
                delete_success: 'El documento se ha sido borrado correctamente.',
                delete_error: 'Se ha producido un error al borrar el documento.',
                unsaved_changes: 'Si dejas esta página, tus cambios se perderán. ¿Quieres cancelar la edición de este documento?',
            },
        },
        userContexts: {
            title: 'Mi Perfil',
            fields: {
                userDetails: {
                    username: 'Nombre de usuario',
                    lastName: 'Apellido',
                    firstName: 'Nombre',
                    email: 'Correo electrónico',
                    current_password: 'Contraseña actual',
                    password: 'Contraseña',
                    confirm_password: 'Confirmar contraseña',
                },
            },
            actions: {
                edit_profile: 'Mi Perfil',
                change_password: 'Cambiar la contraseña',
            },
            notifications: {
                update_success: 'Perfil actualizado',
                update_error: 'La actualización del perfil ha fallado',
                invalid_password: 'La contraseña actual es inválida',
                confirm_password_change: 'Se ha restablecido la contraseña. Utilice la nueva contraseña para iniciar sesión.',
            },
            validation: {
                error_password_match: 'Las contraseñas no coinciden.',
                tooltip_password: 'Requisitos de la contraseña:\n- 8 caracteres como mínimo\n- 60 caracteres como máximo\n- Al menos un carácter en minúscula\n- Al menos un carácter en mayúscula\n- Al menos un número\n- Al menos un carácter especial, se admiten los siguientes: !@#$%^&*',
                tooltip_password_confirm: 'Repita la contraseña',
            },
            accessibleOrgs: {
                title: 'Mi Organización |||| Mi Organizaciones',
            },
            activeOrgUuid: {
                status: {
                    active: 'Organización seleccionada',
                    not_active: 'Organización no seleccionada',
                },
                notifications: {
                    update_success: 'Su organización con éxito',
                    update_error: 'La actualización de su organización ha fallado',
                },
            },
        },
    },
};
exports.default = react_admin_1.mergeTranslations(ra_language_spanish_1.default, apiHubMessages);
//# sourceMappingURL=es.js.map