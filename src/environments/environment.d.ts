interface FirebaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
}

interface Environment {
    production: boolean;
    version: string | null;
    serverUrl: string;
    defaultLanguage: string;
    supportedLanguages: string[];
    firebaseConfig: FirebaseConfig;
}

declare const environment: Environment;

export { environment };
