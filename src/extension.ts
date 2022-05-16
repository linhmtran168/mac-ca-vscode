function initialize() {
	if (process.platform !== 'darwin') { 
		return;
	}

	const splitPattern = /(?=-----BEGIN\sCERTIFICATE-----)/g;
	const systemRootCertsPath = '/System/Library/Keychains/SystemRootCertificates.keychain';
	const args = [ 'find-certificate', '-a', '-p' ];

	const childProcess = require('child_process');
	const allTrusted = childProcess.spawnSync('/usr/bin/security', args)
		.stdout.toString().split(splitPattern);

	const allRoot = childProcess.spawnSync('/usr/bin/security', args.concat(systemRootCertsPath))
		.stdout.toString().split(splitPattern);
	const all = allTrusted.concat(allRoot);

	const tls = require('tls');
	const origCreateSecureContext = tls.createSecureContext;

	tls.createSecureContext = (options: any) => {
		const ctx = origCreateSecureContext(options);
		all.filter(duplicated).forEach((cert: string) => {
			ctx.context.addCACert(cert.trim());
		});
		return ctx;
	};
}

function duplicated(cert: string, index: number, arr: string[]) {
	return arr.indexOf(cert) === index;
}

initialize();

export function activate() {
	console.log('Congratulations, your extension "mac-ca-vscode" is now active!');
}

// this method is called when your extension is deactivated
export function deactivate() {}
