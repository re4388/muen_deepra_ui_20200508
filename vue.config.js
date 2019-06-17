const path = require('path');

module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
    runtimeCompiler: true,
    configureWebpack: {
        resolve: {
            alias: {
                "~api": path.resolve(__dirname, 'src', 'api')
            }
        }
    },
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                files: [
                    {
                        "filter": ["**/*"]
                    },
                    {
                        "from": ".",
                        "to": "./src/foo/",
                        "filter": ["**/*"]
                    }
                ],
                extraFiles: [
                    './src/api/protos/*',
                    {
                        "from": "./node_modules/@grpc/proto-loader/node_modules/protobufjs/google/protobuf",
                        "to": "./google/protobuf",
                        "filter": ["*.proto"]
                    }
                ],
                asar: true
            }
        }
    }
}