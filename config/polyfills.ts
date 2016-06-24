import 'core-js/es6';
import 'reflect-metadata';

declare var require;
declare var process;

require('zone.js/dist/zone');

if (process.env.ENV === 'production') {
    // Production
} else {
    // Development
    Error['stackTraceLimit'] = Infinity;
    require('zone.js/dist/long-stack-trace-zone');
}