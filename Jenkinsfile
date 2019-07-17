pipeline {
	environment {
		CHANNEL_ACCESS_TOKEN = credentials('line-channel-access-token')
		CHANNEL_SECRET = credentials('line-channel-secret')
		TARGET_GROUP_ID = credentials('line-target-group-id-deepra-ui')
		SkipRemainingSteps = 'false'
	}
	agent {
		docker {
			image '172.18.0.5:5000/nodejs10_ui:10.15.3'
			registryUrl 'http://172.18.0.5:5000'
			args '-u root:root'
		}
	}
	stages {
		stage('Prebuild') {
			steps {
				script {
					try {
						sh 'rm -rf .git'
						sh 'cp -r ./. ~/project/app'
						sh 'echo $DISPLAY'
						sh 'yarn install'
						sh 'yarn run electron:build'
					}
					catch (ex) {
						SkipRemainingSteps = 'true'
						currentBuild.result = 'FAILURE'
					}
				}
			}
		}
		stage('Unit test') {
			when {
				expression { return SkipRemainingSteps == 'false'; }
			}
			steps {
				script {
					try {
						sh """echo ${currentBuild.result}"""
						sh """yarn run test:unit -u """
					}
					catch (ex) {
						SkipRemainingSteps = 'true'
						currentBuild.result = 'FAILURE'
					}
				}
			}
		}
		stage('Integration test') {
			when {
				expression { return SkipRemainingSteps == 'false'; }
			}
			steps {
				script {
					try {
						sh 'python -m pytest ./tests --headless'
					}
					catch (ex) {
						SkipRemainingSteps = 'true'
						currentBuild.result = 'FAILURE'
					}
				}
			}
		}
		stage('Generate report') {
			steps {
				// publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: 'report_cov/html', reportFiles: 'index.html', reportName: 'code-coverage-report', reportTitles: ''])
				script {
					sh """echo ${currentBuild.result}"""
					cleanWs notFailBuild: true
				}
			}
			post {
				always {
					sh """
					docker run -p 3050:5000 --rm \
					-e CHANNEL_ACCESS_TOKEN=$CHANNEL_ACCESS_TOKEN \
					-e CHANNEL_SECRET=$CHANNEL_SECRET \
					-e TARGET_GROUP_ID=$TARGET_GROUP_ID \
					-e ONE_SHOT_MESSAGE="Job Name: ${JOB_NAME}
					Build number: ${BUILD_NUMBER}
					Build status: ${currentBuild.result}
					URL: ${env.RUN_DISPLAY_URL}" \
					--name linemsg_service linemsg
					"""
				}
			}
		}
	}
}