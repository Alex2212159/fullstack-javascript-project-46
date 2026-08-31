install:
	npm ci
publish:
	npm publish --dry-run
lint:
	npx eslint .
lint-fix:
	npx eslint . --fix
test:
	npx vitest run
test-coverage:
	npx vitest run --coverage