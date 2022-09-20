def getSlackChannel(env) {
    if (env == 'production') {
        return '#download-apps-ng-production'
    } else if (env == 'demo') {
        return '#download-apps-ng-demo'
    } else if(env == 'sandbox') {
        return '#download-apps-ng-sandbox'
    } else if(env == 'staging') {
        return '#download-apps-ng-staging'
    } else {
        return '#download-apps-ng-development'
    }
}

pipeline {
    agent {
        node {
            label 'worker-node14-ng'
        }
    }
    options {
        timestamps()
    }
    parameters {
        choice(
            name: 'CI_GIT_TYPE',
            choices: ['', 'branch', 'commit', 'tag'],
            description: 'Which Environment?'
        )
        string(
            name: 'CI_GIT_SOURCE',
            defaultValue: '',
            description: 'Which git source?'
        )
        choice(
            name: 'CI_IS_PLAYSTORE',
            choices: ['No', 'Yes'],
            description: 'Deployment To Google Play Store?'
        )
        string(
            name: 'GIT_TAG',
            defaultValue: '',
            description: 'TAG number'
        )
        string(
            name: 'GIT_TAG_TITLE',
            defaultValue: '',
            description: 'Release TAG Title'
        )
        string(
            name: 'GIT_TAG_MESSAGE',
            defaultValue: '',
            description: 'Release TAG Messages'
        )
    }
    environment {
        // FOR ENV
        SINBAD_REPO = 'sinbad-red'
        AWS_CREDENTIAL = 'automation_aws'
        SINBAD_ENV = "${env.JOB_BASE_NAME}"
        WOKRSPACE = "${env.WORKSPACE}"
        SINBAD_URI_DOWNLOAD = "http://app-download.sinbad.web.id"
        SLACK_CHANNEL = getSlackChannel(SINBAD_ENV)
        // FOR ANDROID
        SDK_URL = "https://dl.google.com/android/repository/commandlinetools-linux-6609375_latest.zip"
        ANDROID_HOME = "${WORKSPACE}/android-sdk"
        ANDROID_VERSION = "30"
        ANDROID_BUILD_TOOLS_VERSION = "30.0.2"
        GRADLE_HOME = "${WORKSPACE}/android-gradle"
        GRADLE_VERSION = "6.7.1"
        MAVEN_HOME = "${WORKSPACE}/android-maven"
        MAVEN_VERSION = "3.8.6"
    }
    stages {
        stage('Checkout') {
            steps {
                script {
                    if(params.CI_GIT_TYPE != '' || params.CI_GIT_SOURCE != '') {
                        if(params.CI_GIT_TYPE == 'branch' || params.CI_GIT_TYPE == ''){
                            checkout([
                                $class: 'GitSCM',
                                branches: [[name: "refs/remotes/origin/${params.CI_GIT_SOURCE}"]],
                                doGenerateSubmoduleConfigurations: scm.doGenerateSubmoduleConfigurations,
                                extensions: scm.extensions,
                                userRemoteConfigs: scm.userRemoteConfigs
                            ])
                        } else if(params.CI_GIT_TYPE == 'commit') {
                            checkout([
                                $class: 'GitSCM',
                                branches: [[name: "${params.CI_GIT_SOURCE}"]],
                                doGenerateSubmoduleConfigurations: scm.doGenerateSubmoduleConfigurations,
                                extensions: scm.extensions,
                                userRemoteConfigs: scm.userRemoteConfigs
                            ])
                        } else if(params.CI_GIT_TYPE == 'tag') {
                            checkout([
                                $class: 'GitSCM',
                                branches: [[name: "refs/tags/${params.CI_GIT_SOURCE}"]],
                                doGenerateSubmoduleConfigurations: scm.doGenerateSubmoduleConfigurations,
                                extensions: scm.extensions,
                                userRemoteConfigs: scm.userRemoteConfigs
                            ])
                        }
                    }

                    env.GIT_MESSAGE = sh(returnStdout: true, script: 'git log -1 --pretty=%B').trim()
                    env.GIT_COMMIT = sh(returnStdout: true, script: 'git rev-parse HEAD').trim()
                    env.GIT_COMMIT_SHORT = sh(returnStdout: true, script: "git rev-parse --short=8 ${env.GIT_COMMIT}").trim()
                    env.GIT_AUTHOR = sh(returnStdout: true, script: "git --no-pager show -s --format='%an' ${env.GIT_COMMIT}").trim()
                    env.GIT_TAG = sh(returnStdout: true, script: "git tag --sort version:refname | tail -1").trim()
                }
            }
        }
        stage('Download ENV') {
            when { expression { params.CI_IS_PLAYSTORE == "No" } }
            steps {
                script{
                    withAWS(credentials: "${AWS_CREDENTIAL}") {
                        s3Download(file: 'android/app/google-services.json', bucket: 'sinbad-env', path: "${SINBAD_ENV}/${SINBAD_REPO}/google-services.json", force: true)
                        s3Download(file: 'android/app/sinbad-app.jks', bucket: 'sinbad-env', path: "${SINBAD_ENV}/${SINBAD_REPO}/sinbad-app.jks", force: true)
                        s3Download(file: '.env', bucket: 'sinbad-env', path: "${SINBAD_ENV}/${SINBAD_REPO}/.env", force: true)
                        s3Download(file: 'android/app/proguard-rules.pro', bucket: 'sinbad-env', path: "${SINBAD_ENV}/${SINBAD_REPO}/proguard-rules.pro", force: true)
                    }
                }
            }
        }
        stage('Install Dependency') {
            when { expression { params.CI_IS_PLAYSTORE == "No" } }
            parallel {
                stage('Install Android SDK') {
                    steps {
                        sh "if [ -d ${ANDROID_HOME} ]; then rm -rf ${ANDROID_HOME}; fi && mkdir ${ANDROID_HOME}"
                        sh '''
                            cd $ANDROID_HOME && \
                            curl -sL -o android.zip $SDK_URL && unzip android.zip && rm android.zip && \
                            mkdir -p cmdline-tools ; mv tools cmdline-tools && \
                            yes | $ANDROID_HOME/cmdline-tools/tools/bin/sdkmanager --licenses
                        '''
                        sh '''
                            $ANDROID_HOME/cmdline-tools/tools/bin/sdkmanager "build-tools;$ANDROID_BUILD_TOOLS_VERSION" \
                            "platforms;android-$ANDROID_VERSION" \
                            "platform-tools"
                        '''
                    }
                }
                stage('Install Gradle & Maven') {
                    steps {
                        sh "if [ -d ${GRADLE_HOME} ]; then rm -rf ${GRADLE_HOME}; fi && mkdir ${GRADLE_HOME}"
                        sh '''
                            cd $GRADLE_HOME && \
                            curl -sL -o gradle.zip https://services.gradle.org/distributions/gradle-$GRADLE_VERSION-bin.zip && \
                            unzip -d $GRADLE_HOME gradle.zip && rm gradle.zip
                        '''

                        sh "if [ -d ${MAVEN_HOME} ]; then rm -rf ${MAVEN_HOME}; fi && mkdir ${MAVEN_HOME}"
                        sh '''
                            cd $MAVEN_HOME && \
                            curl -sL -o maven.zip https://archive.apache.org/dist/maven/maven-3/$MAVEN_VERSION/binaries/apache-maven-$MAVEN_VERSION-bin.zip && \
                            unzip -d $MAVEN_HOME maven.zip && rm maven.zip
                        '''
                    }
                }
                stage('Install Yarn & React') {
                    steps {
                        sshagent(credentials : ['ssh-sinbad']) {
                            sh "yarn global add react-native-cli create-react-native-app"
                            sh "yarn install --frozen-lockfile"
                        }
                    }
                }
                stage('Change Environment') {
                    steps {
                        script {
                            if(SINBAD_ENV == 'production') {
                                sh '''
                                    find android/ -type f |
                                    while read file
                                    do
                                        sed -i 's/sinbad.app.sandbox/sinbad.app/g' $file
                                        sed -i 's/ic_sandbox/ic_live/g' $file
                                        sed -i 's/ic_sandbox_round/ic_live_round/g' $file
                                    done
                                '''
                            } else if (SINBAD_ENV == 'sandbox') {
                                sh '''
                                    find android/ -type f |
                                    while read file
                                    do
                                        sed -i 's/sinbad.app.sandbox/sinbad.app.sandbox/g' $file
                                        sed -i 's/ic_sandbox/ic_sandbox/g' $file
                                        sed -i 's/ic_sandbox_round/ic_sandbox_round/g' $file
                                    done
                                '''
                            } else if (SINBAD_ENV == 'staging') {
                                sh '''
                                    find android/ -type f |
                                    while read file
                                    do
                                        sed -i 's/sinbad.app.sandbox/sinbad.app.staging/g' $file
                                        sed -i 's/ic_sandbox/ic_staging/g' $file
                                        sed -i 's/ic_sandbox_round/ic_staging_round/g' $file
                                    done
                                '''
                            }
                            sh "find android -type f -name '.!*!*' -delete"
                        }
                    }
                }
            }

        }
        stage('Export Path') {
            when { expression { params.CI_IS_PLAYSTORE == "No" } }
            steps {
                sh "export PATH=$PATH:${ANDROID_HOME}/emulator"
                sh "export PATH=$PATH:${ANDROID_HOME}/tools"
                sh "export PATH=$PATH:${ANDROID_HOME}/tools/bin"
                sh "export PATH=$PATH:${GRADLE_HOME}/gradle-${GRADLE_VERSION}/bin"
                sh "export PATH=$PATH:${MAVEN_HOME}/apache-maven-${MAVEN_VERSION}/bin"
                sh "echo PATH=$PATH:${ANDROID_HOME}/platform-tools>>/home/ubuntu/bash.bashrc"
            }
        }
        stage("Build") {
            when { expression { params.CI_IS_PLAYSTORE == "No" } }
            steps {
                script {
                    if(SINBAD_ENV == 'production') {
                        sh '''
                            cd android && \
                            fastlane both
                        '''
                    } else {
                        sh '''
                            cd android && \
                            fastlane apk
                        '''
                    }
                }
            }
        }
        stage('Upload Source Map') {
            when { expression { params.CI_IS_PLAYSTORE == "No" && SINBAD_ENV != 'sandbox'} }
            steps {
                script{
                    // GET VERSION NAME
                    dir("android") {
                        sh "rm -f -- gradleInfo.txt"
                        sh "./gradlew -q printVersionName > gradleInfo.txt"
                        env.APP_VERSION_NAME = sh(returnStdout: true, script: 'tail -n 1 gradleInfo.txt').trim()
                    }

                    // GET VERSION CODE
                    dir("android") {
                        sh "rm -f -- gradleInfo.txt"
                        sh "./gradlew -q printVersionCode > gradleInfo.txt"
                        env.APP_VERSION_CODE = sh(returnStdout: true, script: 'tail -n 1 gradleInfo.txt').trim()
                    }

                    // GET APP ID
                    dir("android") {
                        sh "rm -f -- gradleInfo.txt"
                        sh "./gradlew -q printApplicationId > gradleInfo.txt"
                        env.APP_ID = sh(returnStdout: true, script: 'tail -n 1 gradleInfo.txt').trim()
                    }
                    withCredentials([string(credentialsId: 'sentry-sinbad', variable: 'SENTRYTOKEN')]) {
                        sh "node_modules/@sentry/cli/sentry-cli --auth-token ${SENTRYTOKEN} releases --org sinbad-id --project sinbad-red-ng-${SINBAD_ENV} files ${env.APP_ID}@${env.APP_VERSION_NAME}+${env.APP_VERSION_CODE} upload-sourcemaps --dist ${env.APP_VERSION_CODE} --strip-prefix . --rewrite android/app/build/generated/assets/react/release/index.android.bundle android/app/build/generated/sourcemaps/react/release/index.android.bundle.map"
                    }
                }
            }
        }
        stage('Upload to S3') {
            when { expression { params.CI_IS_PLAYSTORE == "No" } }
            steps {
                script {
                    // GET VERSION NAME
                    dir("android") {
                        sh "rm -f -- gradleInfo.txt"
                        sh "./gradlew -q printVersionName > gradleInfo.txt"
                        env.APP_VERSION_NAME = sh(returnStdout: true, script: 'tail -n 1 gradleInfo.txt').trim()
                    }

                    // GET VERSION CODE
                    dir("android") {
                        sh "rm -f -- gradleInfo.txt"
                        sh "./gradlew -q printVersionCode > gradleInfo.txt"
                        env.APP_VERSION_CODE = sh(returnStdout: true, script: 'tail -n 1 gradleInfo.txt').trim()
                    }

                    // GET APP ID
                    dir("android") {
                        sh "rm -f -- gradleInfo.txt"
                        sh "./gradlew -q printApplicationId > gradleInfo.txt"
                        env.APP_ID = sh(returnStdout: true, script: 'tail -n 1 gradleInfo.txt').trim()
                    }
                    if(SINBAD_ENV == 'production') {
                        withAWS(credentials: "${AWS_CREDENTIAL}") {
                            s3Upload(file: "${WORKSPACE}/android/app/build/outputs/bundle/release/app-release.aab", bucket: 'app-download.sinbad.web.id', path: "${SINBAD_ENV}/aab-${SINBAD_REPO}/app-release.aab")
                            s3Upload(file: "${WORKSPACE}/android/app/build/outputs/apk/release/app-release.apk", bucket: 'app-download.sinbad.web.id', path: "${SINBAD_ENV}/apk/${SINBAD_REPO}-${env.APP_VERSION_NAME}-${env.APP_VERSION_CODE}-${currentBuild.number}.apk")
                            s3Upload(file: "${WORKSPACE}/android/app/build/outputs/apk/release/app-release.apk", bucket: 'app-download.sinbad.web.id', path: "${SINBAD_ENV}/apk/${SINBAD_REPO}-latest.apk")
                        }
                        
                    } else {
                        withAWS(credentials: "${AWS_CREDENTIAL}") {
                            s3Upload(file: "${WORKSPACE}/android/app/build/outputs/apk/release/app-release.apk", bucket: 'app-download.sinbad.web.id', path: "${SINBAD_ENV}/apk/${SINBAD_REPO}-${env.APP_VERSION_NAME}-${env.APP_VERSION_CODE}-${currentBuild.number}.apk")
                            s3Upload(file: "${WORKSPACE}/android/app/build/outputs/apk/release/app-release.apk", bucket: 'app-download.sinbad.web.id', path: "${SINBAD_ENV}/apk/${SINBAD_REPO}-latest.apk")
                        }
                    }
                }
                slackSend color: '#ff0000', channel: "${SLACK_CHANNEL}", message: """
Hi Sailors
We have new APK Version
Application: ${SINBAD_REPO}
Environment: ${SINBAD_ENV}
Commit ID: ${env.GIT_COMMIT}
Changes Message: ${env.GIT_MESSAGE}
You can download this application in here
${SINBAD_URI_DOWNLOAD}/${SINBAD_ENV}/apk/${SINBAD_REPO}-${env.APP_VERSION_NAME}-${env.APP_VERSION_CODE}-${currentBuild.number}.apk
Or latest application for environment ${SINBAD_ENV} in here
${SINBAD_URI_DOWNLOAD}/${SINBAD_ENV}/apk/${SINBAD_REPO}-latest.apk"""
            }
        }
        stage('Play Store') {
            when { expression { params.CI_IS_PLAYSTORE == "Yes" && SINBAD_ENV == 'production' } }
            steps {
                script {
                    withAWS(credentials: "${AWS_CREDENTIAL}") {
                        s3Download(file: 'android/fastlane/config/sinbad.json', bucket: 'sinbad-env', path: "${SINBAD_ENV}/${SINBAD_REPO}/sinbad.json", force: true)
                        s3Download(file: 'android/app/build/outputs/bundle/release/app-release.aab', bucket: 'app-download.sinbad.web.id', path: "${SINBAD_ENV}/aab-${SINBAD_REPO}/app-release.aab", force: true)
                    }
                    sh '''
                            cd android && \
                            fastlane beta
                    '''
                }
            }
        }
        stage('Tagging') {
            when { expression { params.CI_IS_PLAYSTORE == "Yes" && SINBAD_ENV == "production" } }
                steps {
                script {
                    sh "gh release create ${params.GIT_TAG} --notes '${params.GIT_TAG_MESSAGE}' --title '${params.GIT_TAG_TITLE}'"
				}	
			}
		}
    }

    post {
        success {
            script{
                if(params.CI_IS_PLAYSTORE == "No") {
                    slackSend color: '#8cff00', message:  """
Status : Deployment Success! :jkndance:
Application : ${SINBAD_REPO}
Version : ${env.GIT_TAG}
Commit ID : ${env.GIT_COMMIT}
Changes Message : ${env.GIT_MESSAGE}""", channel: "${SLACK_CHANNEL}"
                }
            }
        }
        failure {
            script{
                if(params.CI_IS_PLAYSTORE == "No") {
                    slackSend color: '#ff0000', message:  """
Status : Deployment Failed!!! :alertsirene:
Application : ${SINBAD_REPO}
Version : ${env.GIT_TAG}
Commit ID : ${env.GIT_COMMIT}
Changes Message : ${env.GIT_MESSAGE}""", channel: "${SLACK_CHANNEL}"
                }
            }
        }
    }
}