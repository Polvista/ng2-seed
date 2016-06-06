// See also: https://angular.io/docs/ts/latest/quickstart.html
(function(global) {
    // map tells the System loader where to look for things
    var map = {
        'app':                        'dist',
        'rxjs':                       'node_modules/rxjs',
        '@angular':                   'node_modules/@angular',
        'redux':                      'node_modules/redux/dist',
        'ng2-redux':                  'node_modules/ng2-redux/lib',
        'lodash':                     'node_modules/lodash',
        'traceur':                    'node_modules/traceur/dist/commonjs'
    };

    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': {main: 'main.js', defaultExtension: 'js'},
        'rxjs': { main: 'Rx.js', defaultExtension: 'js' },  //TODO is main correct?
        'redux': {main: 'redux.js', defaultExtension: 'js'}, //TODO min version?
        'ng2-redux': {main: 'index.js', defaultExtension: 'js'},
        'lodash': {main: 'index.js', defaultExtension: 'js'},
        'traceur': {main: 'traceur.js', defaultExtension: 'js'}
    };

    var packageNames = [
        '@angular/common',
        '@angular/compiler',
        '@angular/core',
        '@angular/http',
        '@angular/platform-browser',
        '@angular/platform-browser-dynamic',
        '@angular/router',
        '@angular/router-deprecated',
        '@angular/testing',
        '@angular/upgrade'
    ];

    // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
    packageNames.forEach(function(pkgName) {
        packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
    });

    var config = {
        map: map,
        packages: packages
    }

    // filterSystemConfig - index.html's chance to modify config before we register it.
    if (global.filterSystemConfig) { global.filterSystemConfig(config); }

    System.config(config);

})(this);
