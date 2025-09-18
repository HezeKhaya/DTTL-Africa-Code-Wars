export function getEnvironmentVariable(name: string) {
	const value = process.env[name];
	if (!value) {
		throw new Error(`The environment variable '${name}' is not set.`);
	}

	return value;
}
