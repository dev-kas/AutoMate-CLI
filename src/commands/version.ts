import cli from '../cli';

declare const __version__: string;

cli.version('v' + __version__, '-v, --version', 'Display version information');
