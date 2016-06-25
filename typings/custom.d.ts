declare const Proxy;
declare const module;
declare const process: NodeJSProcess;

interface DevToolsExtension {
    devToolsExtension?: () => void;
}

interface NodeJSProcess {
    env: NodeJSEnvironment;
}

interface NodeJSEnvironment {
    ENV: 'development' | 'production';
}
