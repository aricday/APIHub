export DEPLOY_ENV ?= dev

.PHONY: build help

help:
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'


#### Install ####

install: package.json ## Install dependencies
	@yarn

copy-config-example: ## Copy config of the example. Usage DEPLOY_ENV=[dev|integration|staging] make copy-config-example.
	cp packages/example/config/config-${DEPLOY_ENV}.js packages/example/public/config.js

#### Build ####

build: ## Build the library
	@yarn build

build-example: ## Build the example
	@yarn build-example

build-storybook: ## Build the storybook
	@yarn build-storybook


#### Run ####

start: copy-config-example build ## Starts the application in development mode
	@yarn start

watch-lib: ## Starts the library in development mode
	@yarn start-lib

storybook: ## Starts storybook
	@yarn storybook


#### Tests ####

test-unit: ## Runs the unit tests
	@yarn test

test: test-unit ## Runs the tests


#### Code Formatting ####

lint: ## Runs linting tools
	@yarn lint


#### Deployment ####

copy-deploy-config-example: ## Copy config of the example. Usage DEPLOY_ENV=[dev|integration|staging] make copy-deploy-config-example.
	cp packages/example/config/config-${DEPLOY_ENV}.js packages/example/build/config.js

deploy-example: copy-deploy-config-example ## Deploy the example on AWS S3. Usage DEPLOY_ENV=[dev|integration|staging] make deploy-example.
	aws s3 rm s3://broadcom-apihub.marmelab.com/example --recursive
	aws s3 sync packages/example/build/ s3://broadcom-apihub.marmelab.com/example
	aws s3 cp packages/example/build/index.html s3://broadcom-apihub.marmelab.com/example/index.html --cache-control="max-age=120"
	aws cloudfront create-invalidation --distribution-id E1AOZQ3R1CQ7R6 --paths "/*"

deploy-storybook: ## Deploy the storybook on AWS S3
	aws s3 rm s3://broadcom-apihub.marmelab.com/storybook --recursive
	aws s3 sync packages/layer7-apihub/build/ s3://broadcom-apihub.marmelab.com/storybook
	aws s3 cp packages/layer7-apihub/build/index.html s3://broadcom-apihub.marmelab.com/storybook/index.html --cache-control="max-age=120"
	aws cloudfront create-invalidation --distribution-id E2FPXJCTZKPDO0 --paths "/*"

deploy: build build-example build-storybook ## Deploy all on AWS S3. Usage DEPLOY_ENV=[dev|integration|staging] make deploy.
	make deploy-example
	make deploy-storybook
