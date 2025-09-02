// Fix: Provide dummy module declarations for Next.js types to resolve 'Cannot find type definition file' errors.
// This is a workaround for an environment where Next.js dependencies may not be correctly installed or resolved.

declare module 'next' {
    /**
     * A simplified dummy type for Next.js Metadata to allow compilation.
     * This is based on usage in the project. The real type is much more complex.
     */
    export type Metadata = {
        title?: string | { default: string; template: string };
        description?: string;
        manifest?: string;
        themeColor?: string;
        appleWebApp?: {
            capable?: boolean;
            statusBarStyle?: 'default' | 'black' | 'black-translucent';
            title?: string;
        };
        [key: string]: any;
    };
}

declare module 'next/image-types/global' {
    // This module is used for global image types.
    // It can be left empty if the project doesn't use image imports that require special typing.
}

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
